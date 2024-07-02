import { AzureOpenAI } from 'openai'
import { ImageEntity } from '~/image/image.entity'
import { imageRepository } from '~/image/image.repository'

const AZURE_OPENAI_ENDPOINT = 'https://202407-ac-pt-3-3.openai.azure.com'
const AZURE_OPENAI_API_KEY = '5e50bf6ae8e342cd8f90fc00b2a70d4a'
const AZURE_OPENAI_API_VERSION = '2024-05-01-preview'
const AZURE_OPENAPI_DEPLOYMENT = 'text-embedding-ada-002'

const fs = require('fs')

async function run() {
  const client = new AzureOpenAI({
    endpoint: AZURE_OPENAI_ENDPOINT,
    apiKey: AZURE_OPENAI_API_KEY,
    apiVersion: AZURE_OPENAI_API_VERSION,
    deployment: AZURE_OPENAPI_DEPLOYMENT,
  })

  const cursor = imageRepository.findCursor(
    {},
    { sort: { _id: -1 }, batchSize: 20 },
  )

  while (await cursor.hasNext()) {
    const document = await cursor.next()
    if (!document) {
      continue
    }

    const { _id: imageId, tags } = document as ImageEntity
    console.log(`Processing image ${imageId}`)

    const result = await client.embeddings.create({
      input: tags,
      model: AZURE_OPENAPI_DEPLOYMENT,
    })

    const fileName = `out/${imageId}.json`
    fs.writeFileSync(fileName, JSON.stringify(result, null, 2))
  }
}

run()
