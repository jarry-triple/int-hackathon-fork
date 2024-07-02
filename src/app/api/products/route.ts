import { NextRequest, NextResponse } from 'next/server'
import { client } from '~/clients/mongo.client'
import { productRepository } from '~/product/product.repository'
import { ResourceType, isResourceType } from '~/utils/resource-types'

export async function GET(req: NextRequest) {
  try {
    await client.connect()

    const queries = req.nextUrl.searchParams
    const from = queries.get('from')
    const size = queries.get('size')
    const geotagName = queries.get('geotag_name')
    const type = queries.get('type')
    const onlyPoiType = queries.get('only_poi_type')

    const productList = await productRepository.findProducts({
      from: from ? parseInt(from as string, 10) : 0,
      size: size ? parseInt(size as string, 10) : 5,
      geotagName: (geotagName as string) ?? undefined,
      type:
        type && isResourceType(type as string)
          ? (type as ResourceType)
          : undefined,
      onlyPoiType: onlyPoiType === 'true',
    })

    return NextResponse.json(
      productList.map((product) => product.toView()),
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Error processing the image:', error)
    return NextResponse.json('Error processing the image', { status: 500 })
  }
}
