import { NextResponse } from 'next/server'
import { client } from '~/clients/mongo.client'
import { imageRepository } from '~/image/image.repository'

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await client.connect()
    const id = params.id
    console.log(id, 'id')
    if (!id) {
      return new NextResponse('No id found', { status: 400 })
    }

    const image = await imageRepository.findOne({ _id: id })
    if (!image) {
      return new NextResponse('Image not found', { status: 404 })
    }

    return new NextResponse(JSON.stringify(image), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error processing the image:', error)
    return new NextResponse('Error processing the image', { status: 500 })
  }
}
