import { imageRepository } from '../image/image.repository'
import { client } from '../clients/mongo.client'
import { ImageModel } from '../types'

export const fetchImageById = async (
  id: string,
): Promise<ImageModel | undefined> => {
  try {
    await client.connect()
    console.log('id', id)
    const image = await imageRepository.findOne({ _id: id })

    if (!image) {
      return undefined
    }
    return {
      _id: image._id,
      data: image.data,
      imageId: image.imageId,
      imageUrl: image.imageUrl,
      locationName: image.locationName,
      locationSummary: image.locationSummary,
      objects: image.objects,
      region: image.region,
      tags: image.tags,
      productId: image.productId,
      productName: image.productName,
      productRegion: image.productRegion,
      productType: image.productType,
      uploadedAt: image.uploadedAt,
    }
  } catch (error) {
    console.error('Error fetching the image:', error)
    return undefined
  }
}
