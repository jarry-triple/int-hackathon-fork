import { randomUUID } from 'node:crypto'
import { Document as MongoDocument } from 'mongodb'
import { BaseMongoRepository, client } from '~/clients/mongo.client'

interface TestInput {
  _id?: string
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export class TestEntity implements MongoDocument {
  public _id: string
  public name: string
  public createdAt: Date
  public updatedAt: Date

  public constructor(input: TestInput) {
    this._id = input._id!
    this.name = input.name
    this.createdAt = input.createdAt!
    this.updatedAt = input.updatedAt!
  }

  public static ofNew(input: TestInput): TestEntity {
    return new TestEntity({
      ...input,
      _id: input._id || randomUUID(),
      createdAt: input.createdAt || new Date(),
      updatedAt: input.updatedAt || new Date(),
    })
  }
}

async function run() {
  await client.connect()

  const testRepository = new BaseMongoRepository(
    { collection: 'test_collection' },
    TestEntity,
  )

  await testRepository.insertOne(new TestEntity({ name: 'test' }))

  await client.close()
}

run()
