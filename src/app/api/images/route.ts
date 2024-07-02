import { NextResponse } from 'next/server'
import { extractDataFromImageLLM } from '~/clients/image.client'
import { imageRepository } from '~/image/image.repository'
import { ImageEntity } from '~/image/image.entity'
import { client } from '~/clients/mongo.client'

export async function POST(req: Request) {
  const formData = req.formData()

  try {
    await client.connect()
    const file = (await formData).get('file') as File | undefined
    if (!file) {
      return new NextResponse('No file found', { status: 400 })
    }

    const imageFromLLM = await extractDataFromImageLLM(file)
    if (!imageFromLLM) {
      return new NextResponse('Error processing the image', { status: 500 })
    }

    const imageEntity = ImageEntity.ofNew(imageFromLLM)
    await imageRepository.insertOne(imageEntity)

    return NextResponse.json(JSON.stringify(imageFromLLM), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error processing the image:', error)
    return NextResponse.json('Error processing the image', { status: 500 })
  } finally {
    await client.close()
  }
}
