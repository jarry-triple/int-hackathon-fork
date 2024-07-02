type Sizes = {
  full: { url: string }
  large: { url: string }
  small_square: { url: string }
}
type Quality =
  | 'default'
  | 'original'
  | 'size-optimized-v0'
  | 'quality-optimized-v0'
  | 'high-v0'
  | 'high-v1'
  | 'high-v2'
export type ImageFrames =
  | 'original'
  | 'mini'
  | 'small'
  | 'medium'
  | 'large'
  | 'big'
  | 'huge'
export type Image = {
  id: string
  type?: 'image' | 'video'
  cloudinaryId?: string
  cloudinaryBucket?: string
  sizes: Sizes
  video?: Sizes
  sourceUrl?: string
  title?: string
  description?: string
  link?: {
    href: string
    id?: string
  }
  frame?: ImageFrames
  quality?: Quality
  width?: number
  height?: number
}

export type GeotagType =
  | 'triple-region'
  | 'triple-area'
  | 'triple-zone'
  | 'korea-sido'
  | 'korea-sgg'
  | 'korea-emd'
  | 'iso-3166-1'
  | 'iso-3166-2'
  | 'triple-city'
  | 'triple-continent'
  | 'triple-geounit'

export type Geotag = {
  type: string | GeotagType
  id: string
}
