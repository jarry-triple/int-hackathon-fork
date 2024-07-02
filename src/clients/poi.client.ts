import { PoiType } from '~/utils/resource-types'
import { Image } from '~/utils/triple-types'
import { fetchGraphQLGatewayApi } from '~/utils/fetch-graphql-gateway-api'

const MGET_POIS = `#graphql
query MGetPois(
    $ids: [ID!]!
) {
    pois: mgetPois(
        ids: $ids
    )
    {
        id
        source {
            grade
            images
            names
            areas
            
        }
        starRating
        categories
        metadata {
            reviewsRating
            reviewsCount
            scrapsCount
        }
    }
}
`

export interface MgetPoiForPoiRecommendation {
  id: string
  source: {
    image?: Image
    names: {
      ko?: string
    }
    areas?: { id: string; name: string }[]
  }
  categories: {
    id: string
    name: string
  }[]
  starRating: number | null
  metadata: {
    reviewsRating: number | null
    reviewsCount: number | null
    scrapsCount: number | null
  }
}

async function mgetPois(ids: string[]) {
  const { pois } = await fetchGraphQLGatewayApi<{
    pois: MgetPoiForPoiRecommendation[]
  }>({
    query: MGET_POIS,
    variables: { ids },
  })

  return pois
}

export const poiClient = {
  mgetPois,
}
