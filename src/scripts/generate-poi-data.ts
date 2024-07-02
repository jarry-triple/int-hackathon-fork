import { recommendationV2Client } from '~/clients/recommendation-v2.client'
import { Image } from '~/utils/triple-types'
import { MgetPoiForPoiRecommendation, poiClient } from '~/clients/poi.client'
import { convertImageUrlToImage } from '~/utils/image-utils'
import { TARGET_REGIONS } from '~/utils/fixtures'
import { Product } from '~/utils/pickle'
import { productRepository } from '~/product/product.repository'
import { ProductInput } from '~/product/product.entity'
import { client } from '~/clients/mongo.client'

async function run() {
  await client.connect()

  const data = (
    await Promise.all(
      TARGET_REGIONS.map(({ id: regionId }) =>
        recommendationV2Client.findRecommendedPoiImages(regionId),
      ),
    )
  )
    .flat()
    .map(({ imageUrl, resourceId }) => ({
      image: convertImageUrlToImage(imageUrl),
      id: resourceId,
    }))

  const poisMap = (await poiClient.mgetPois(data.map(({ id }) => id))).reduce<
    Record<string, MgetPoiForPoiRecommendation>
  >((acc, poi) => {
    acc[poi.id] = poi
    return acc
  }, {})

  const imagesMap = data.reduce<Record<string, Image>>((acc, { id, image }) => {
    acc[id] = image
    return acc
  }, {})

  const result: ProductInput[] = Object.values(poisMap)
    .map((poi) => ({
      ...poi,
      reviewImages: imagesMap[poi.id],
    }))
    .map((value) => ({
      _id: value.id,
      type: 'attraction',
      name: value.source.names.ko ?? '',
      geotag: {
        id:
          value.geoMetadata.geotags.find(({ type }) => type === 'triple-region')
            ?.id ?? '',
        type: 'triple-region',
        name:
          TARGET_REGIONS.find(
            ({ id }) =>
              id ===
              value.geoMetadata.geotags.find(
                ({ type }) => type === 'triple-region',
              )?.id,
          )?.name ?? '',
      },
      image: value.reviewImages,
    }))

  await productRepository.insertManyProducts(result)

  console.log('done')

  await client.close()
  process.exit(0)
}

run()
