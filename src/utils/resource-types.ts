export type PoiType = 'attraction' | 'restaurant' | 'hotel'
export type ResourceType = PoiType | 'tna'

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
