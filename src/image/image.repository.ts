import { BaseMongoRepository } from '~/clients/mongo.client'
import { ImageEntity } from '~/image/image.entity'

class ImageRepository extends BaseMongoRepository<ImageEntity> {
  constructor() {
    super({ database: 'knk', collection: 'images' }, ImageEntity)
  }
}

export const imageRepository = new ImageRepository()
