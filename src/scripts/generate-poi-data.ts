import { recommendationV2Client } from '~/clients/recommendation-v2.client'
import { Image } from '~/utils/triple-types'
import { MgetPoiForPoiRecommendation, poiClient } from '~/clients/poi.client'

export const REGIONS = [
  // 바르셀로나
  'c883cd34-f5c2-4f0a-9960-5f963f9b2dbb',
  // 파리
  '3fc342f5-1900-4352-a35c-91080632dbe7',
  // 제주
  '759174cc-0814-4400-a420-5668a0517edd',
  // 도쿄
  '23c5965b-01ad-486b-a694-a2ced15f245c',
  // 다낭
  '22b60e7e-afc7-40e1-9237-8f31ed8a842d',
]

export function extractCloudinaryId(imageUrl: string) {
  const pattern = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/
  const match = imageUrl.match(pattern)

  if (!match) {
    throw new Error(`Invalid image url: ${imageUrl}`)
  }

  return match[0]
}

export function extractBucket(imageUrl: string) {
  const pattern = /^https:\/\/[^/]+\/([^/]+)/
  const match = imageUrl.match(pattern)

  if (!match) {
    throw new Error(`Invalid image url: ${imageUrl}`)
  }

  return match[1]
}

export function extractExtension(imageUrl: string) {
  const pattern = /(\.\w+)$/
  const match = imageUrl.match(pattern)

  if (!match) {
    throw new Error(`Invalid image url: ${imageUrl}`)
  }

  return match[1]
}

export function convertImageUrlToImage(imageUrl: string): Image {
  const [cloudinaryId, bucket, extension] = [
    extractCloudinaryId(imageUrl),
    extractBucket(imageUrl),
    extractExtension(imageUrl),
  ]

  return {
    id: cloudinaryId,
    cloudinaryId,
    type: 'image',
    sizes: {
      full: {
        url: `https://media.triple.guide/${bucket}/c_limit,f_auto,h_2048,w_2048/${cloudinaryId}${extension}`,
      },
      large: {
        url: `https://media.triple.guide/${bucket}/c_limit,f_auto,h_1024,w_1024/${cloudinaryId}${extension}`,
      },
      small_square: {
        url: `https://media.triple.guide/${bucket}/c_limit,f_auto,h_256,w_256/${cloudinaryId}${extension}`,
      },
    },
  }
}

async function run() {
  const data = (
    await Promise.all(
      REGIONS.map((regionId) =>
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
