export type PoiType = 'attraction' | 'restaurant' | 'hotel'
export type ResourceType = PoiType | 'tna'
export const RESOURCE_TYPES = ['attraction', 'restaurant', 'hotel', 'tna']

export function isResourceType(type: string): type is ResourceType {
  return RESOURCE_TYPES.includes(type)
}

export function toReadableResourceType(resourceType: ResourceType): string {
  switch (resourceType) {
    case 'attraction':
      return '관광지'
    case 'restaurant':
      return '맛집'
    case 'hotel':
      return '숙소'
    case 'tna':
      return '투어 ・ 티켓'
  }
}
