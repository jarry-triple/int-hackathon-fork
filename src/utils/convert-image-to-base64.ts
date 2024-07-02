import axios from 'axios'

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
): Promise<string> {
  let base64Image = ''
  try {
    if (src.type === 'url') {
      const response = await axios.get(src.value, {
        responseType: 'arraybuffer',
      })
      const imageBuffer = Buffer.from(response.data, 'binary')
      base64Image = imageBuffer.toString('base64')
    } else {
      base64Image = src.value.toString('base64')
    }

    return base64Image
  } catch (error) {
    console.error('Error processing the image:', error)
    throw error
  }
}
