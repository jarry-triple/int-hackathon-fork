import { client } from '~/clients/mongo.client'
import { NextRequest, NextResponse } from 'next/server'
import { imageRepository } from '~/image/image.repository'

export async function GET(req: NextRequest) {
  try {
    await client.connect()

    const queries = req.nextUrl.searchParams
    const tagsParam = queries.get('tags')

    const tags = tagsParam ? tagsParam.split(',') : []

    const agg = await imageRepository.aggregate([
      {
        $addFields: {
          intersection: {
            $size: {
              $setIntersection: ['$tags', tags],
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
    console.error('Error fetching images:', error)
    return NextResponse.json('Error fetching images', { status: 500 })
  }
}
