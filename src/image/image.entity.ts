import { ObjectId } from 'mongodb'
import { ImageModel } from '../types'
import { randomUUID } from 'node:crypto'
import { Document as MongoDocument } from 'mongodb'

type ImageInput = Omit<ImageModel, '_id' | 'uploadedAt'>

export class ImageEntity implements MongoDocument {
  public _id: string
  public uploadedAt: Date
  public locationName: string
  public region: string
  public locationSummary: string
  public tags: string[]
  public objects: {
    name: string
    type: 'activity' | 'accomodation' | 'restaurant' | 'attraction'
    tags: string[]
    position: { x: number; y: number }
  }[]
  public data: string
  public productId?: string
  public productType?: string
  public productName?: string
  public productRegion?: string
  public imageId: string
  public imageUrl: string

  constructor(image: ImageModel) {
    this._id = image._id

    this.uploadedAt = image.uploadedAt
    this.locationName = image.locationName
    this.region = image.region
    this.locationSummary = image.locationSummary
    this.tags = image.tags
    this.objects = image.objects
    this.data = image.data

    this.productId = image.productId
    this.productType = image.productType
    this.productName = image.productName
    this.productRegion = image.productRegion
    this.imageId = image.imageId
    this.imageUrl = image.imageUrl
  }

  public static of(image: ImageModel) {
    return new ImageEntity(image)
  }

  public static ofNew(obj: ImageInput): ImageEntity {
    return new ImageEntity({
      _id: randomUUID(),
      uploadedAt: new Date(),
      ...obj,
    })
  }
}
