import { BaseMongoRepository } from '~/clients/mongo.client'
import { ProductEntity, ProductInput } from '~/product/product.entity'
import { ResourceType } from '~/utils/resource-types'

export class ProductRepository extends BaseMongoRepository<ProductEntity> {
  public constructor() {
    super({ database: 'knk', collection: 'products' }, ProductEntity)
  }

  public findProducts({
    from,
    size,
    type,
    geotagName,
    onlyPoiType,
  }: {
    from: number
    size: number
    type?: ResourceType
    geotagName?: string
    onlyPoiType?: boolean
  }): Promise<ProductEntity[]> {
    return this.find(
      {
        ...(type && { type }),
        ...(geotagName && { 'geotag.name': geotagName }),
        ...(onlyPoiType && { type: { $ne: 'tna' } }),
      },
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

  public async insertManyProducts(
    products: ProductInput[],
  ): Promise<ProductEntity[]> {
    const entities = products.map((product) => ProductEntity.ofNew(product))
    await this.insertMany(entities)
    return entities
  }
}

export const productRepository = new ProductRepository()
