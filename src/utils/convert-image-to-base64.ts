import axios from 'axios'
import sharp from 'sharp'

export async function convertImageToBase64(
  src:
    | {
        type: 'file'
        value: Buffer
      }
    | {
        type: 'url'
        value: string
      },
  png: boolean = false,
): Promise<string> {
  let base64Image = ''
  try {
    if (src.type === 'url') {
      const response = await axios.get(src.value, {
        responseType: 'arraybuffer',
      })
      let imageBuffer = Buffer.from(response.data, 'binary')
      if (png) {
        imageBuffer = await sharp(imageBuffer).png().toBuffer()
      }

      base64Image = imageBuffer.toString('base64')
    } else {
      let imageBuffer = src.value
      if (png) {
        imageBuffer = await sharp(src.value).png().toBuffer()
      }

      base64Image = imageBuffer.toString('base64')
    }

    return base64Image
  } catch (error) {
    console.error('Error processing the image:', error)
    throw error
  }
}
