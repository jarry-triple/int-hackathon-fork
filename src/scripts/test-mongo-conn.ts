import { v4 as uuid } from 'uuid'
import { client } from '~/clients/mongo.client'
import { productRepository } from '~/product/product.repository'

async function run() {
  await client.connect()

  await productRepository.createProduct({
    type: 'attraction',
    name: 'Eiffel Tower',
    geotag: { id: uuid(), type: 'triple-region', name: 'Paris' },
    image: {
      id: uuid(),
      sizes: {
        full: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Eiffel_Tower_August_2014.jpg',
        },
        large: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Eiffel_Tower_August_2014.jpg/800px-Eiffel_Tower_August_2014.jpg',
        },
        small_square: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Eiffel_Tower_August_2014.jpg/75px-Eiffel_Tower_August_2014.jpg',
        },
      },
    },
  })

  await client.close()
}

run()
