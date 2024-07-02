import { AzureOpenAI } from 'openai'
import { convertImageToBase64 } from '../utils/convert-image-to-base64'
import { ImageModel, LLMImage } from '../types'
import { ChatCompletion } from 'openai/resources/index.mjs'
import {
  getGeneralUploadMsgs,
  getTagsMsgs,
  sanitizeResponse,
} from '../llm-helpers'
import { client as mongoClient } from './mongo.client'

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

  const base64ImageString = await convertImageToBase64(
    { type: 'file', value: (await file.arrayBuffer()) as Buffer },
    true,
  )

  const base64ImageFormatted = `data:image/png;base64,${base64ImageString}`

  const configs = {
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 2500,
  }

  const [result, tagsResult] = (await Promise.all([
    client.chat.completions.create({
      // @ts-ignore
      messages: getGeneralUploadMsgs(base64ImageFormatted),
      ...configs,
    }),
    client.chat.completions.create({
      // @ts-ignore
      messages: getTagsMsgs(base64ImageFormatted),
      ...configs,
    }),
  ])) as ChatCompletion[]

  const content = result.choices[0].message.content
  const tags = tagsResult.choices[0].message.content

  if (typeof content === 'string' && typeof tags === 'string') {
    const cleanedTags = sanitizeResponse<string>(tags)
    const cleanedGeneral = sanitizeResponse<Omit<LLMImage, 'tags'>>(
      content,
      true,
    )

    if (cleanedTags === undefined || cleanedGeneral === undefined) {
      return undefined
    }

    try {
      const data = {
        ...cleanedGeneral,
        tags: cleanedTags.split(',').map((tag) => tag.trim()),
        data: base64ImageString,
      } as ImageModel

      return data
    } catch (e) {
      console.error('Error parsing response:', e)
      return undefined
    }
  }
}
