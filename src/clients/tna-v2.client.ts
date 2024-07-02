import { fetchTnaV2 } from '~/utils/fetch-api'
import { Image } from '~/utils/triple-types'

export interface TnaV2InternalProductInfoResponse {
  id: string
  title: string
  shortTitle: string
  subtitle: string
  categories: {
    id: number
    name: string
  }[]
  regions: string[]
  areas: {
    id: string
    name: string
    priority: number
  }[]
  basePrice: number
  salePrice: number
  heroImage: string
  image?: Pick<Image, 'id' | 'sizes' | 'width' | 'height' | 'sourceUrl'> & {
    source?: { url?: string }
  }
  saleStatus: 'ON_SALE' | 'STOPPED' | 'STAND_BY'
  isOnSale: boolean
  reviewsRating: number
  reviewsCount: number
  scrapsCount: number
}

export async function mgetProducts(
  productIds: string[],
): Promise<TnaV2InternalProductInfoResponse[]> {
  const result = await fetchTnaV2<TnaV2InternalProductInfoResponse[]>(
    '/internals/products',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productIds }),
    },
  )

  return result
}

export const tnaV2Client = {
  mgetProducts,
}
