import { AzureOpenAI } from 'openai'
import { convertImageToBase64 } from '../utils/convert-image-to-base64'
import { ImageModel } from '../types'

const AZURE_OPENAI_ENDPOINT = 'https://202407-ac-pt-3-3.openai.azure.com'
const AZURE_OPENAI_API_KEY = '5e50bf6ae8e342cd8f90fc00b2a70d4a'
const AZURE_OPENAI_API_VERSION = '2024-05-01-preview'
const AZURE_OPENAPI_DEPLOYMENT = 'gpt-4o'

export async function extractDataFromImageLLM(file: File) {
  const client = new AzureOpenAI({
    endpoint: AZURE_OPENAI_ENDPOINT,
    apiKey: AZURE_OPENAI_API_KEY,
    apiVersion: AZURE_OPENAI_API_VERSION,
    deployment: AZURE_OPENAPI_DEPLOYMENT,
    dangerouslyAllowBrowser: true,
  })

  const generalMsg = `You're an assistant designed to analyze image data for a travel tech company. Users will upload images of travel related photo. Only the image will be provided for analysis and the user will not provide any additional context.

  The intended use case for the analysis is so that users can upload photos for travel inspiration. Please analyze the uploaded image in the context of travel destinations or related travel business aspects. The main goal is to identify objects in photos that can help us refer customers to our products.

  Even if an object is not directly related to a travel product, try to identify its nuanced behaviors, such as "eating" (suggest a popular nearby restaurant) or "activity" (e.g., kayaking, yachting, surfing).

  If the image is from a location known for activities like kayaking, swimming, surfing, or other leisure activities, identify and include related objects in the "objects" field of the structured response. Also, include objects that could potentially be related to lodging or packaged tour products.


  Provide the response in structured JSON and strictly adhere to the following rules:

  - If the 'name' of the object is the same as the "locationName", the object should not be included in the list of 'objects' field of the 'Image'. Object name should be in korean.
  - If the object type is not 'OneOf('activity', 'accomodation', 'restaurant', 'attraction')', the object should not be included in the list of 'objects' field.
  - Ensure that 'objects' fields are populated with items that can later be easily linked to our company's products (includes tour packages, individual tours, lodging, and restaurants).
  - In case more than few candidates are found for the same object, prefer the activities, accomodation, restaurant over attractions. And if there are multiple preferred objects that has the identical 'objects.objectPosition' field, include one that is most specific such as 'Hotel ABC' instead of 'hotel'.
  - Ensure that 'objects.position' field is located on the object, not outside the object. Be specific to second decimal point.

Format will be as follows, each field followed by type and context (starts with //):

Image = {
  locationName: string // should be the precise name for the location. (e.g. 'Eiffel Tower' instead of 'tower')
  region: string // if the region is not one of '제주', '도쿄', '바르셀로나', '다낭', '파리', '샌프란시스코', it should be 'etc'
  locationSummary: string // a brief description of the location. Make sure its full sentence. Must be in korean. Should be in delightful and engaging tone.

  objects: {
    name: string // should provide the name of a noticeable object in the image as precisely as possible. (e.g. 'Eiffel Tower' instead of 'tower').

    type: string  // type of the object. Prefer and try to look for 'activity' | 'accomodation' | 'restaurant' | 'attraction'. If it is not one of 'activity', 'accomodation', 'restaurant', 'attraction', add the most appropriate object type.

    tags: string[] // Tags should be keywords for the location that might attract travellers to the location as well as physical descriptions of the location. Use adjectives or nouns only and try to be as specific as possible Later used for image similarity search. Tags must be provided in Korean. Do not include the location name in the tags.

    objectPosition: {
      x: number // x-axis coordinate of the object in the image. (0 <= x <= 1)
      y: number // y-axis coordinate of the object in the image. (0 <= y <= 1)
    }
  }[]
}`

  const tagsSystemMsg = `You're an assistant designed to analyze images.
}`

  const tagsUserMessage = `--
- List the characteristics and information of the image as nouns or adjectives.
ex. 도시, 타임스퀘어, 유명한, 사람이 많은, ...
- Think about what characteristics would make a user who sees your photo want to go there.
- Create nouns or adjectives for more attributes, not sentences.
--
How to answer:
- Provide seperated tags by comma with Korean language
ex. 도시, 타임스퀘어, 유명한, 사람이 많은
`

  const base64ImageString = await convertImageToBase64({
    type: 'file',
    value: (await file.arrayBuffer()) as Buffer,
  })

  const base64ImageFormatted = `data:image/jpeg;base64,${base64ImageString}`
  const messages = [
    { role: 'system', content: generalMsg },
    {
      role: 'user',
      content: [
        { type: 'image_url', image_url: { url: base64ImageFormatted } },
      ],
    },
  ]
  const configs = {
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 2500,
  }

  const result = await client.chat.completions.create({
    // @ts-ignore
    messages: messages,
    ...configs,
  })

  const tagsMsgs = [
    { role: 'system', content: tagsSystemMsg },
    { role: 'user', content: tagsUserMessage },
    {
      role: 'user',
      content: [
        { type: 'image_url', image_url: { url: base64ImageFormatted } },
      ],
    },
  ]
  const tagsResult = await client.chat.completions.create({
    // @ts-ignore
    messages: tagsMsgs,
    ...configs,
  })

  const content = result.choices[0].message.content
  const tags = tagsResult.choices[0].message.content

  if (typeof content === 'string' && typeof tags === 'string') {
    const cleanedResponse = content
      .trim()
      .replace(/^```json|```$/g, '')
      .replace(/^\n+|\n+$/g, '')

    const cleanedTags = tags
      .trim()
      .replace(/^```json|```$/g, '')
      .replace(/^\n+|\n+$/g, '')

    if (!cleanedResponse.startsWith('{')) {
      console.error('Error parsing response:', cleanedResponse)
      return
    }

    try {
      const data = {
        ...JSON.parse(cleanedResponse),
        tags: cleanedTags.split(',').map((tag) => tag.trim()),
        data: base64ImageString,
      } as ImageModel

      return data
    } catch (e) {
      console.error('Error parsing response:', e)
      console.error('Response:', cleanedResponse)
    }
  }
}
