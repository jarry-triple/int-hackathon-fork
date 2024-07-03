'use client'
import { Flex, Image, Text } from '@mantine/core'

import { useHover } from '@mantine/hooks'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useEffect } from 'react'
import { ProductView } from '~/product/product.entity'
import { ResourceType, toReadableResourceType } from '~/utils/resource-types'

interface ProductItemProps {
  id: string
  image: string
  name: string
  type: ResourceType
  isAd?: boolean
}

/** 이 근처 */
export function ProductListing({ geotagName }: { geotagName: string }) {
  const [products, setProducts] = useState<ProductView[]>()

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(
        `/api/products?geotag_name=${geotagName}&only_poi_type=true`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      const tnaRes = await axios.get(
        `/api/products?geotag_name=${geotagName}&type=tna`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const productList = response.data
      const productListWithTnaThird = [
        ...productList.slice(0, 1),
        tnaRes.data[0],
        ...productList.slice(1),
      ]
      setProducts(productListWithTnaThird)
    })()
  }, [])

  return (
    <div>
      <Text
        lineClamp={1}
        color="#2A2A2A"
        fz={20}
        fw="bold"
        mb={0}
        style={{ marginTop: '20px' }}
      >
        이 근처의 즐길 거리
      </Text>
      <Flex
        style={{
          marginTop: '5px',
          gap: '2px',
          overflowX: 'auto',
          padding: '5px 0',
          whiteSpace: 'nowrap',
        }}
      >
        {products?.map((product, index) => (
          <ProductItem
            key={index}
            id={product._id}
            name={product.name}
            image={product.image.sizes.small_square.url ?? ''}
            type={product.type}
            isAd={index === 1}
          />
        ))}
      </Flex>
    </div>
  )
}

function ProductItem({ id, image, name, type, isAd }: ProductItemProps) {
  const router = useRouter()
  const { hovered, ref } = useHover<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '8px',
        backgroundColor: hovered ? '#f0f0f0' : '#ffffff', // placeholder background color
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '4px',
      }}
      onClick={() => router.push(`/${id}`)} // TODO: link to product detail page
    >
      {isAd && (
        <div
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            marginRight: '3px',
            marginTop: '3px',
            color: '#FFFFFF',
            padding: '0px 3px',
            borderRadius: '4px 4px 4px 4px',
            border: '1px solid #FFFFFF',
            fontSize: '8px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          Ad
        </div>
      )}
      <div>
        <Image alt="product image" radius="md" src={image} h={126} w={126} />
      </div>
      <Text lineClamp={1} color="#2A2A2A" fz={14} fw="bold" mb={0} mt={4}>
        {name.length > 10 ? `${name.slice(0, 10)}...` : name}
      </Text>
      <Text lineClamp={1} color="#8C8C8C" fz={10} mb={0} mt={2}>
        {toReadableResourceType(type)}
      </Text>
    </div>
  )
}
