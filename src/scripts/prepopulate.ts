import { MongoClient } from 'mongodb'
import fs from 'fs'
import { randomUUID } from 'crypto'
import { AzureOpenAI } from 'openai'

import { convertImageToBase64 } from '~/utils/convert-image-to-base64'
import { ChatCompletion } from 'openai/resources/index.mjs'
import { getGeneralMsgs, getTagsMsgs, sanitizeResponse } from '~/llm-helpers'
import { Product } from '../utils/pickle'

type Criteria = {
  regionName: string
  regionId: string
}

type ProductImage = {
  regionName: string
  url: string
  poiType: string
}

type LLMImage = {
  locationName: string // should be precise name for the location. (e.g. 'Eiffel Tower' instead of 'tower'). should be in korean
  region: string // if region is not one of '제주', '오사카', '바르셀로나', '다낭', '파리' it should be 'etc'
  locationSummary: string // location summary should provide brief description of the location in korean language only. Must be always full sentence.
  tags: string[] // Tags should include keywords for location. Later used for image similarity search. Tags must be provided in Korean.
  objects: {
    name: string // should provide the name of noticeable object in the image as precise as possible. (e.g. 'Eiffel Tower' instead of 'tower'). Provide specific name if it seems to be lodge, restaurant, or attraction. (e.g. 'Hotel ABC' instead of 'hotel').

    type: 'activity' | 'accomodation' | 'restaurant' | 'attraction' // type of the object. If it is not one of 'activity', 'accomodation', 'restaurant', 'attraction', otherwise the object should not be included in 'objects' array.

    tags: string[] // Tags for the object that includes keywords for the object. Later used for image similarity search. Tags must be provided in Korean

    position: {
      x: number // x-axis coordinate of the object in the image. (0 <= x <= 1)
      y: number // y-axis coordinate of the object in the image. (0 <= y <= 1)
    }
  }[]
  data: string
}

type ImageEntity = {
  id: string
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

    fs.writeFileSync(
      './response.json',
      JSON.stringify(imageEntities, null, 2),
      'utf-8',
    )

    // db insert
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

run().catch(console.dir)

function mapToImageEntity(image: LLMImage): ImageEntity {
  return {
    id: randomUUID() as string,
    uploadedAt: new Date(),
    ...image,
  }
}

async function fetchFromLLMModel(
  poiImages: ProductImage[],
): Promise<LLMImage[]> {
  const client = new AzureOpenAI({
    endpoint: AZURE_OPENAI_ENDPOINT,
    apiKey: AZURE_OPENAI_API_KEY,
    apiVersion: AZURE_OPENAI_API_VERSION,
    deployment: AZURE_OPENAPI_DEPLOYMENT,
  })

  const responses: LLMImage[] = []

  try {
    for (const poiImage of poiImages) {
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
          messages: getGeneralMsgs(base64ImageFormatted),
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
        })
        try {
          responses.push({
            ...(cleanedGeneral as unknown as LLMImage),
            tags: cleanedTags.split(',').map((tag) => tag.trim()),
            data: base64ImageString,
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
    ...products.flatMap((p) => {
      return {
        url: p.image.sizes.large.url,
        regionName: regionName,
        poiName: p.name,
        poiType: 'attraction',
      }
    }),
  )
  return imageUrls
}
