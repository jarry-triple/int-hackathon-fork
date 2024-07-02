import { BaseMongoRepository } from '~/clients/mongo.client'
import { ForkEntity, ForkInput } from '~/fork/fork.entity'

export class ForkRepository extends BaseMongoRepository<ForkEntity> {
  public constructor() {
    super({ collection: 'forks' }, ForkEntity)
  }

  public findForks({
    from,
    size,
    userId,
    productId,
  }: {
    from: number
    size: number
    userId?: string
    productId?: string
  }): Promise<ForkEntity[]> {
    return this.find(
      {
        ...(userId && { userId }),
        ...(productId && { productId }),
      },
      { sort: { createdAt: -1 }, skip: from, ...(size > 0 && { limit: size }) },
    )
  }

  public findFork({
    id,
    userId,
    productId,
  }: {
    id?: string
    userId?: string
    productId?: string
  }): Promise<ForkEntity | null> {
    return this.findOne({
      ...(id && { _id: id }),
      ...(userId && { userId }),
      ...(productId && { productId }),
    })
  }

  public async createFork(input: ForkInput): Promise<ForkEntity> {
    const fork = ForkEntity.ofNew(input)
    await this.insertOne(fork)
    return fork
  }

  public async insertManyForks(forks: ForkInput[]): Promise<ForkEntity[]> {
    const entities = forks.map((fork) => ForkEntity.ofNew(fork))
    await this.insertMany(entities)
    return entities
  }
}

export const forkRepository = new ForkRepository()
