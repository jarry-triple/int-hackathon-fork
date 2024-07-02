import { Document as MongoDocument } from 'mongodb'
import { v4 as uuid } from 'uuid'
import { ResourceType } from '~/utils/resource-types'
import { Geotag, Image } from '~/utils/triple-types'

export class ProductEntity implements MongoDocument {
  public _id: string
  public type: ResourceType
  public name: string
  public geotag: Geotag & { name?: string }
  public image: Image
  public createdAt?: Date
  public updatedAt?: Date

  public constructor(input: ProductInput) {
    this._id = input._id!
    this.type = input.type
    this.name = input.name
    this.geotag = input.geotag
    this.image = input.image
    this.createdAt = input.createdAt
    this.updatedAt = input.updatedAt
  }

  public static ofNew(input: ProductInput): ProductEntity {
    return new ProductEntity({
      ...input,
      _id: input._id || uuid(),
      createdAt: input.createdAt || new Date(),
      updatedAt: input.updatedAt || new Date(),
    })
  }
}

export interface ProductInput {
  _id?: string
  type: ResourceType
  name: string
  geotag: Geotag & { name?: string }
  image: Image
  createdAt?: Date
  updatedAt?: Date
}
