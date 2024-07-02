import { Document as MongoDocument } from 'mongodb'
import { v4 as uuid } from 'uuid'

export class ForkEntity implements MongoDocument {
  public _id: string
  public userId: string
  public productId: string
  public createdAt?: Date
  public updatedAt?: Date

  public constructor(input: ForkInput) {
    this._id = input._id!
    this.userId = input.userId
    this.productId = input.productId
    this.createdAt = input.createdAt
    this.updatedAt = input.updatedAt
  }

  public static ofNew(input: ForkInput): ForkEntity {
    return new ForkEntity({
      ...input,
      _id: input._id || uuid(),
      createdAt: input.createdAt!,
      updatedAt: input.updatedAt!,
    })
  }
}

export interface ForkInput {
  _id?: string
  userId: string
  productId: string
  createdAt?: Date
  updatedAt?: Date
}
