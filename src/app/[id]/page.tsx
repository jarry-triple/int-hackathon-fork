'use client'
import { Button, Container, Flex, Image, Space, Text } from '@mantine/core'

import { ResourceType, toReadableResourceType } from '~/utils/resource-types'
import { toDotSeparatedString } from '~/utils/string-utils'
import ProductHeader from '~/ui/detail/product-header/ProductHeader'
import { useHover } from '@mantine/hooks'
import { useRouter } from 'next/navigation'
import MoreImages from '~/ui/detail/more-images/MoreImages'
import LocalItems from '~/ui/detail/local-items/LocalItems'
import { v4 as uuid } from 'uuid'

type Props = {
  params: {
    id: string
  }
}

const dummyResource = {
  imageUrl:
    'https://images.pexels.com/photos/3667564/pexels-photo-3667564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  title: '금문교',
  info: '금문교는 샌프란시스코의 아이콘적인 관광지로, 두 개의 거대한 붉은 금문을 가진 아름다운 다리입니다.',
  region: {
    name: '샌프란시스코',
  },
  resourceType: 'attraction' as const,
}

const dummyProductList: ProductItemProps[] = [
  {
    id: uuid(),
    image:
      'https://images.pexels.com/photos/3667564/pexels-photo-3667564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: '제목1',
    type: '맛집',
  },
  {
    id: uuid(),
    image:
      'https://images.pexels.com/photos/3667564/pexels-photo-3667564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: '제목2',
    type: '숙소',
  },
  {
    id: uuid(),
    image:
      'https://images.pexels.com/photos/3667564/pexels-photo-3667564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: '제목3',
    type: '액티비티',
  },
  {
    id: uuid(),
    image:
      'https://images.pexels.com/photos/3667564/pexels-photo-3667564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: '제목4',
    type: '놀이공원',
  },
  {
    id: uuid(),
    image:
      'https://images.pexels.com/photos/3667564/pexels-photo-3667564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: '제목5',
    type: '액티비티',
  },
]

const dummyImages = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
]

export default function ImageDetailPage(props: Props) {
  return (
    <>
      <ProductHeader />

      <ResourceInfoCard
        imageUrl={dummyResource.imageUrl}
        title={dummyResource.title}
        info={dummyResource.info}
        region={dummyResource.region}
        resourceType={dummyResource.resourceType}
      />
      <ProductListing productList={dummyProductList}></ProductListing>
      <MoreImages images={dummyImages} />
      <Space h={28} />
      <LocalItems products={dummyProductList as any} />
    </>
  )
}

interface ResourceInfoCardProps {
  imageUrl: string
  title: string
  info: string
  region: { name: string }
  resourceType: ResourceType
}

/** Informational card area */
function ResourceInfoCard({
  imageUrl,
  title,
  info,
  region,
  resourceType,
}: ResourceInfoCardProps) {
  return (
    <Flex justify="center" align="center" py={5} px={10}>
      {/* 1st column - Image */}
      <Container flex={1} w={80} h={80} miw={80} mih={80} p={0}>
        <Image
          w={80}
          h={80}
          alt="이미지"
          radius="md"
          fit="cover"
          src={imageUrl}
        />
      </Container>

      {/* 2st column - Resource Information */}
      <Flex flex={3} direction="column" p={10}>
        <Text lineClamp={1} color="#2A2A2A" fz={16} fw="bold" mb={0}>
          {title}
        </Text>
        <Text lineClamp={1} color="#2A2A2A" fz={12} mb={0}>
          {info}
        </Text>
        <Text lineClamp={1} color="#8C8C8C" fz={12}>
          {toDotSeparatedString([
            region.name,
            toReadableResourceType(resourceType),
          ])}
        </Text>
      </Flex>

      {/* 3st column - Button */}
      <Button
        flex={1}
        variant="filled"
        color="#D9D9D9"
        radius="lg"
        py={1}
        px={2}
      >
        <Text fz={12} color="black">
          여행 홈
        </Text>
      </Button>
    </Flex>
  )
}

interface ProductItemProps {
  id: string
  image: string
  name: string
  type: string
  isAd?: boolean
}

interface ProductListingProps {
  productList: ProductItemProps[]
}

/** 이 근처 */
function ProductListing({ productList }: ProductListingProps) {
  return (
    <div>
      <Text
        lineClamp={1}
        color="#2A2A2A"
        fz={16}
        fw="bold"
        mb={0}
        style={{ marginTop: '20px' }}
      >
        이 근처
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
        {productList.map((product, index) => (
          <ProductItem
            key={index}
            id={product.id}
            name={product.name}
            image={product.image}
            type={product.type}
            isAd={index === 2}
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
      <Image alt="product image" radius="md" src={image} h={100} w={100} />
      <Text lineClamp={1} color="#2A2A2A" fz={14} fw="bold" mb={0} mt={-4}>
        {name}
      </Text>
      <Text lineClamp={1} color="#8C8C8C" fz={10} mb={0} mt={-8}>
        {type}
      </Text>
    </div>
  )
}
