import { fetchRecommendationV2 } from '~/utils/fetch-api'
import { Geotag } from '~/utils/triple-types'

async function findRecommendedTnaProductIds({
  userId,
  longitude,
  geotags,
  latitude,
  from,
  size,
}: {
  userId?: number
  geotags: Geotag[]
  longitude?: number
  latitude?: number
  from: number
  size: number
}): Promise<string[]> {
  const body = {
    userId,
    geocodes: geotags,
    lng: longitude,
    lat: latitude,
    from,
    size,
  }

  const { tnaIds } = await fetchRecommendationV2<{ tnaIds: string[] }>(
    '/recommendations/tnas',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  )

  return tnaIds
}

async function findRecommendedPoiImages(regionId: string) {
  const { images } = await fetchRecommendationV2<{
    images: { imageUrl: string; resourceId: string }[]
  }>(`/recommendations/images`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      geotag: {
        id: regionId,
        type: 'triple-region',
      },
      poiType: 'attraction',
      resourceType: 'poi',
    }),
  })

  return images
}

export const recommendationV2Client = {
  findRecommendedTnaProductIds,
  findRecommendedPoiImages,
}
