import { NextResponse } from 'next/server'
import { client } from '~/clients/mongo.client'
import { productRepository } from '~/product/product.repository'
import { isResourceType } from '~/utils/resource-types'

export async function GET(req: Request) {
  try {
    await client.connect()

    const queries = new URL(req.url).searchParams
    const from = queries.get('from')
    const size = queries.get('size')
    const geotagName = queries.get('geotag_name')
    const type = queries.get('type')
    const onlyPoiType = queries.get('only_poi_type')

    const productList = await productRepository.findProducts({
      from: from ? parseInt(from, 10) : 0,
      size: size ? parseInt(size, 10) : 5,
      geotagName: geotagName ?? undefined,
      type: type && isResourceType(type) ? type : undefined,
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
