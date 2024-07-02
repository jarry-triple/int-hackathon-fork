import { Image } from '~/utils/triple-types'

export function extractCloudinaryId(imageUrl: string) {
  const pattern = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/
  const match = imageUrl.match(pattern)

  if (!match) {
    throw new Error(`Invalid image url: ${imageUrl}`)
  }

  return match[0]
}

export function extractBucket(imageUrl: string) {
  const pattern = /^https:\/\/[^/]+\/([^/]+)/
  const match = imageUrl.match(pattern)

  if (!match) {
    throw new Error(`Invalid image url: ${imageUrl}`)
  }

  return match[1]
}

export function extractExtension(imageUrl: string) {
  const pattern = /(\.\w+)$/
  const match = imageUrl.match(pattern)

  if (!match) {
    throw new Error(`Invalid image url: ${imageUrl}`)
  }

  return match[1]
}

export function convertImageUrlToImage(imageUrl: string): Image {
  const [cloudinaryId, bucket, extension] = [
    extractCloudinaryId(imageUrl),
    extractBucket(imageUrl),
    extractExtension(imageUrl),
  ]

  return {
    id: cloudinaryId,
    cloudinaryId,
    type: 'image',
    sizes: {
      full: {
        url: `https://media.triple.guide/${bucket}/c_limit,f_auto,h_2048,w_2048/${cloudinaryId}${extension}`,
      },
      large: {
        url: `https://media.triple.guide/${bucket}/c_limit,f_auto,h_1024,w_1024/${cloudinaryId}${extension}`,
      },
      small_square: {
        url: `https://media.triple.guide/${bucket}/c_limit,f_auto,h_256,w_256/${cloudinaryId}${extension}`,
      },
    },
  }
}
