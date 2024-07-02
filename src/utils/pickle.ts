import { ResourceType } from './resource-types'
import { Geotag, Image } from '~/utils/triple-types'

export interface PickleImage {
  id: string
  imageUrl: string
  title: string
  info: string
  region: { name: string }
  resourceType: ResourceType
}

/** (AI 돌리기 전) DB에 들어갈 POI 및 TNA 원천 데이터 */
export interface Product {
  id: string
  type: ResourceType
  name: string
  region: Geotag & { name?: string }
  image: Image
}
