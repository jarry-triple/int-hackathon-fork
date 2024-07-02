import { ResourceType } from './resource-types'

export interface PickleImage {
  id: string
  imageUrl: string
  title: string
  info: string
  region: { name: string }
  resourceType: ResourceType
}
