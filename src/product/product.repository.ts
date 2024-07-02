import { BaseMongoRepository } from '~/clients/mongo.client'
import { ProductEntity, ProductInput } from '~/product/product.entity'

export class ProductRepository extends BaseMongoRepository<ProductEntity> {
  public constructor() {
    super({ collection: 'products' }, ProductEntity)
  }

  public findProducts({
    from,
    size,
  }: {
    from: number
    size: number
  }): Promise<ProductEntity[]> {
    return this.find(
      {},
      { sort: { createdAt: -1 }, skip: from, ...(size > 0 && { limit: size }) },
    )
  }

  public findProduct({ id }: { id: string }): Promise<ProductEntity | null> {
    return this.findOne({ _id: id })
  }

  public async createProduct(input: ProductInput): Promise<ProductEntity> {
    const product = ProductEntity.ofNew(input)
    await this.insertOne(product)
    return product
  }
}

export const productRepository = new ProductRepository()
