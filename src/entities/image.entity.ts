import { ObjectId, WithId } from 'mongodb'
import { ImageModel } from '../types'
import { randomUUID } from 'node:crypto'
import { Document as MongoDocument } from 'mongodb'

type ImageInput = {
  locationName: string
  region: string
  locationSummary: string
  tags: string[]
  objects: {
    name: string
    type: 'activity' | 'accomodation' | 'restaurant' | 'attraction'
    tags: string[]
    position: { x: number; y: number }
  }[]
  data: string
}

export class ImageEntity implements MongoDocument {
  public _id: string
  public id: string
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

  constructor(image: ImageModel) {
    this._id = image._id
    this.id = image.id
    this.uploadedAt = image.uploadedAt
    this.locationName = image.locationName
    this.region = image.region
    this.locationSummary = image.locationSummary
    this.tags = image.tags
    this.objects = image.objects
    this.data = image.data
  }

  public static of(image: ImageModel) {
    return new ImageEntity(image)
  }

  public static ofNew(obj: ImageInput): ImageEntity {
    return new ImageEntity({
      _id: new ObjectId().toHexString(),
      id: randomUUID(),
      uploadedAt: new Date(),
      ...obj,
    })
  }
}
