import { MongoClient } from 'mongodb'
import { MONGODB_URL } from '~/utils/config'

import {
  AggregateOptions,
  AnyBulkWriteOperation,
  BulkWriteOptions,
  CreateIndexesOptions,
  Db,
  DeleteOptions,
  Document,
  Filter,
  FindOneAndUpdateOptions,
  FindOptions,
  IndexSpecification,
  InsertOneOptions,
  OptionalUnlessRequiredId,
  UpdateFilter,
  UpdateOptions,
  WithId,
} from 'mongodb'

export const client = new MongoClient(MONGODB_URL, { ignoreUndefined: true })
export const db = client.db(new URL(MONGODB_URL).pathname.replace(/^\//, ''))

export class BaseMongoRepository<T extends Document & { _id: string }> {
  private db: Db
  private collection: string

  public constructor(
    { database, collection }: { database?: string; collection: string },
    private model: { ofNew(obj: WithId<T>): T },
  ) {
    this.db = client.db(
      database ?? new URL(MONGODB_URL).pathname.replace(/^\//, ''),
    )
    this.collection = collection
  }

  public async insertOne(entity: T, options: InsertOneOptions = {}) {
    return this.db
      .collection<T>(this.collection)
      .insertOne(entity as OptionalUnlessRequiredId<T>, options)
  }

  public async insertMany(entities: T[], options: InsertOneOptions = {}) {
    return this.db.collection<T>(this.collection).insertMany(
      entities.map(
        (entity) =>
          ({
            ...entity,
          }) as OptionalUnlessRequiredId<T>,
      ),
      options,
    )
  }

  public async updateOne(
    filter: Filter<T>,
    update: UpdateFilter<T> | Partial<T>,
    options: UpdateOptions = {},
  ) {
    const { $set: setAttributes } = update

    return this.db.collection<T>(this.collection).updateOne(
      filter,
      {
        ...update,
        $set: { ...setAttributes },
        $setOnInsert: { ...update.$setOnInsert },
      } as unknown as UpdateFilter<T>,
      options,
    )
  }

  public async findOneAndUpdate(
    filter: Filter<T>,
    update: UpdateFilter<T> | T,
    options: FindOneAndUpdateOptions = {},
  ) {
    const { $set: setAttributes } = update

    return this.db.collection<T>(this.collection).findOneAndUpdate(
      filter,
      {
        ...update,
        $set: { ...setAttributes },
        $setOnInsert: { ...update.$setOnInsert, createdAt: new Date() },
      },
      options,
    )
  }

  public async updateMany(
    filter: Filter<T>,
    update: UpdateFilter<T>,
    options: UpdateOptions = {},
  ) {
    const { $set: setAttributes } = update

    return this.db.collection<T>(this.collection).updateMany(
      filter,
      {
        ...update,
        $set: { ...setAttributes },
        $setOnInsert: { ...update.$setOnInsert },
      } as unknown as UpdateFilter<T>,
      options,
    )
  }

  public async findOne(
    filter: Filter<T>,
    options: FindOptions = {},
  ): Promise<T | null> {
    const result = await this.db
      .collection<T>(this.collection)
      .findOne(filter, options)
    console.log(result, filter)
    return result ? this.model.ofNew(result) : null
  }

  public async find(
    filter: Filter<T>,
    options: FindOptions = {},
  ): Promise<T[]> {
    const result = await this.db
      .collection<T>(this.collection)
      .find(filter, options)
      .toArray()

    return result.map((item) => this.model.ofNew(item))
  }

  public findCursor(filter: Filter<T>, options?: FindOptions) {
    return this.db.collection<T>(this.collection).find(filter, options)
  }

  public async deleteOne(filter: Filter<T>, options: DeleteOptions = {}) {
    return this.db.collection<T>(this.collection).deleteOne(filter, options)
  }

  public async deleteMany(filter: Filter<T>, options: DeleteOptions = {}) {
    return this.db.collection<T>(this.collection).deleteMany(filter, options)
  }

  public async aggregate<Projection>(
    pipeline: object[],
    options: AggregateOptions = {},
  ): Promise<Projection[]> {
    return (await this.db
      .collection<T>(this.collection)
      .aggregate(pipeline, options)
      .toArray()) as unknown as Promise<Projection[]>
  }

  public async count(filter: Filter<T>, options: AggregateOptions = {}) {
    return this.db
      .collection<T>(this.collection)
      .countDocuments(filter, options)
  }

  public async bulkWrite(
    operations: AnyBulkWriteOperation<T>[],
    options: BulkWriteOptions = {},
  ) {
    return this.db.collection<T>(this.collection).bulkWrite(operations, options)
  }

  public async createIndex(
    indexSpec: IndexSpecification,
    options?: CreateIndexesOptions,
  ) {
    return options
      ? this.db.collection<T>(this.collection).createIndex(indexSpec, options)
      : this.db.collection<T>(this.collection).createIndex(indexSpec)
  }
}
