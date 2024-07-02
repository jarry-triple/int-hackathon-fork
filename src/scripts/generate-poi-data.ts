import { recommendationV2Client } from '~/clients/recommendation-v2.client'
import { Image } from '~/utils/triple-types'
import { MgetPoiForPoiRecommendation, poiClient } from '~/clients/poi.client'
import { convertImageUrlToImage } from '~/utils/image-utils'
import { TARGET_REGIONS } from '~/utils/fixtures'

async function run() {
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

  // TODO: mongodb insert
  return Object.values(poisMap).map((poi) => ({
    ...poi,
    reviewImages: imagesMap[poi.id],
  }))
}

run()
