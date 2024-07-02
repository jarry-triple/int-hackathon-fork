import { client } from '~/clients/mongo.client'
import { productRepository } from '~/product/product.repository'
import { DUMMY_PRODUCTS } from '~/utils/fixtures'

async function run() {
  await client.connect()

  await productRepository.insertMany(DUMMY_PRODUCTS)

  await client.close()
}

run()
