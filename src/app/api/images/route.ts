import { NextRequest, NextResponse } from 'next/server'
import { extractDataFromImageLLM } from '~/clients/image.client'
import { imageRepository } from '~/image/image.repository'
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

    const agg = await imageRepository.aggregate([
      {
        $addFields: {
          intersection: {
            $size: {
              $setIntersection: ['$tags', imageFromLLM.tags],
            },
          },
        },
      },
      {
        $match: {
          intersection: { $gte: 3 },
        },
      },
      {
        $sort: {
          intersection: -1,
        },
      },
    ])

    return NextResponse.json(agg, {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error processing the image:', error)
    return NextResponse.json('Error processing the image', { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    await client.connect()

    const queries = req.nextUrl.searchParams
    const idsQuery = queries.get('ids')

    const ids = idsQuery ? idsQuery.split(',') : []

    const result = await imageRepository.find({
      _id: { $in: ids },
    })

    return NextResponse.json(result, {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json('Error fetching images', { status: 500 })
  }
}
