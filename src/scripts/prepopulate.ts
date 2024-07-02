import { MongoClient } from 'mongodb'
import fs from 'fs'
import { randomUUID } from 'crypto'
import { AzureOpenAI } from 'openai'

import { convertImageToBase64 } from '~/utils/convert-image-to-base64'
import { ChatCompletion } from 'openai/resources/index.mjs'
import {
  getGeneralSeedMsgs,
  getTagsMsgs,
  sanitizeResponse,
} from '~/llm-helpers'
import { Product } from '../utils/pickle'
import { LLMImage } from '../types'

type Criteria = {
  regionName: string
  regionId: string
}

type ProductImage = {
  id: string
  url: string
  productName: string
  productType: string
  productRegion: string
  productId: string // only for SEED DATA
}

type ImageModel = {
  _id: string
  uploadedAt: Date
} & LLMImage

const client = new MongoClient(
  'mongodb+srv://kage:knk%231234@knkcluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000',
)

const AZURE_OPENAI_ENDPOINT = 'https://202407-ac-pt-3-3.openai.azure.com'
const AZURE_OPENAI_API_KEY = '5e50bf6ae8e342cd8f90fc00b2a70d4a'
const AZURE_OPENAI_API_VERSION = '2024-05-01-preview'
const AZURE_OPENAPI_DEPLOYMENT = 'gpt-4o'

const criterion: Criteria[] = [
  { regionName: '제주', regionId: '759174cc-0814-4400-a420-5668a0517ed' },
  { regionName: '오사카', regionId: '71476976-cf9a-4ae8-a60f-76e6fb26900d' },
  {
    regionName: '바르셀로나',
    regionId: 'c883cd34-f5c2-4f0a-9960-5f963f9b2dbb',
  },
  { regionName: '다낭', regionId: '22b60e7e-afc7-40e1-9237-8f31ed8a842d' },
  { regionName: '파리', regionId: '3fc342f5-1900-4352-a35c-91080632dbe7' },
]

async function run() {
  const [regionName] = process.argv.slice(2)
  if (!regionName || criterion.every((c) => c.regionName !== regionName)) {
    console.log('Invalid region name')
    return
  }

  try {
    await client.connect()
    let poiImages: ProductImage[] = []

    if (!fs.existsSync(`./image-urls-${regionName}.json`)) {
      const imageUrls = await fetchFromProducts(regionName)
      poiImages = imageUrls
      fs.writeFileSync(
        `./image-urls-${regionName}.json`,
        JSON.stringify(imageUrls, null, 2),
        'utf-8',
      )
    } else {
      poiImages = JSON.parse(
        fs.readFileSync(`./image-urls-${regionName}.json`, 'utf-8'),
      ) as ProductImage[]
    }

    if (poiImages.length === 0) {
      console.log('No images to fetch')
      return
    }

    // create llm pipeline
    const llmImages = await fetchFromLLMModel(poiImages)
    const imageEntities = llmImages.map(mapToImageEntity).filter((image) => {
      if (!image.locationName || !image.locationSummary) {
        return false
      }

      if (image.region === 'etc') {
        return false
      }

      if (image.locationName === '' || image.locationSummary === '') {
        return false
      }

      if (image.locationName.includes('카페')) {
        return false
      }

      return true
    })

    const database = client.db('knk')
    const imageCollection = database.collection('images')
    await imageCollection.insertMany(imageEntities as any)

    // db insert
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

run().catch(console.dir)

function mapToImageEntity(image: LLMImage): ImageModel {
  const _id = randomUUID()
  console.log('id', _id)
  return {
    _id,
    uploadedAt: new Date(),
    ...image,
  }
}

async function fetchFromLLMModel(
  productImages: ProductImage[],
): Promise<LLMImage[]> {
  const client = new AzureOpenAI({
    endpoint: AZURE_OPENAI_ENDPOINT,
    apiKey: AZURE_OPENAI_API_KEY,
    apiVersion: AZURE_OPENAI_API_VERSION,
    deployment: AZURE_OPENAPI_DEPLOYMENT,
  })

  const responses: LLMImage[] = []

  try {
    for (const poiImage of productImages) {
      const base64ImageString = await convertImageToBase64({
        type: 'url',
        value: poiImage.url,
      })
      const base64ImageFormatted = `data:image/jpeg;base64,${base64ImageString}`

      const configs = {
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 2500,
      }

      const [result, tagsResult] = (await Promise.all([
        client.chat.completions.create({
          // @ts-ignore
          messages: getGeneralSeedMsgs(base64ImageFormatted),
          ...configs,
        }),
        client.chat.completions.create({
          // @ts-ignore
          messages: getTagsMsgs(base64ImageFormatted),
          ...configs,
        }),
      ])) as ChatCompletion[]

      const content = result.choices[0].message.content
      const tags = tagsResult.choices[0].message.content

      if (typeof content === 'string' && typeof tags === 'string') {
        const cleanedTags = sanitizeResponse<string>(tags)
        const cleanedGeneral = sanitizeResponse<Omit<LLMImage, 'tags'>>(
          content,
          true,
        )

        if (cleanedTags === undefined || cleanedGeneral === undefined) {
          continue
        }

        console.log('item', {
          ...(cleanedGeneral as unknown as LLMImage),
          tags: cleanedTags.split(',').map((tag) => tag.trim()),
          productId: poiImage.productId,
          productName: poiImage.productName,
          productRegion: poiImage.productRegion,
          productType: poiImage.productType,
          imageId: poiImage.id,
          imageUrl: poiImage.url,
        })

        try {
          responses.push({
            ...(cleanedGeneral as unknown as LLMImage),
            tags: cleanedTags.split(',').map((tag) => tag.trim()),
            data: base64ImageString,
            productId: poiImage.productId,
            productName: poiImage.productName,
            productRegion: poiImage.productRegion,
            productType: poiImage.productType,
            imageId: poiImage.id,
            imageUrl: poiImage.url,
          })
        } catch (e) {
          console.error('Error parsing response:', e)
          console.error('Response:', cleanedGeneral)
          console.error('Tags:', cleanedTags)
        }
      }
    }

    return responses
  } catch (error) {
    // @ts-ignore
    console.error('Error processing the image:', error)
    throw error
  }
}

async function fetchFromProducts(regionName: string): Promise<ProductImage[]> {
  const imageUrls: ProductImage[] = []
  const database = client.db('knk')
  const collection = database.collection<Product>('products')

  const products = await collection
    .find({ 'geotag.name': regionName })
    .toArray()

  imageUrls.push(
    ...products.map<ProductImage>((p) => {
      return {
        id: p.image.id,
        url: p.image.sizes.large.url,

        productType: p.type,
        productName: p.name,
        productRegion: regionName,
        // @ts-ignore
        productId: p._id as string,
      }
    }),
  )
  return imageUrls
}
