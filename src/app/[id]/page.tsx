'use client'
import { Button, Container, Flex, Image, Space, Text } from '@mantine/core'

import { ResourceType, toReadableResourceType } from '~/utils/resource-types'
import { toDotSeparatedString } from '~/utils/string-utils'
import ProductHeader from '~/ui/detail/product-header/ProductHeader'
import { useHover } from '@mantine/hooks'
import { useRouter } from 'next/navigation'
import MoreImages from '~/ui/detail/more-images/MoreImages'
import LocalItems from '~/ui/detail/local-items/LocalItems'

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
    id: '1',
    image: 'https://via.placeholder.com/150',
    title: '제목1',
    type: '맛집',
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/150',
    title: '제목2',
    type: '숙소',
  },
  {
    id: '3',
    image: 'https://via.placeholder.com/150',
    title: '제목3',
    type: '액티비티',
  },
  {
    id: '4',
    image: 'https://via.placeholder.com/150',
    title: '제목4',
    type: '놀이공원',
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
  image?: string
  title: string
  type: string
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
          gap: '10px',
          overflowX: 'auto',
          padding: '5px 0',
          whiteSpace: 'nowrap',
        }}
      >
        {productList.map((product, index) => (
          <ProductItem
            key={index}
            id={product.id}
            image={product.image}
            title={product.title}
            type={product.type}
          />
        ))}
      </Flex>
    </div>
  )
}

function ProductItem({ id, image, title, type }: ProductItemProps) {
  const router = useRouter()
  const { hovered, ref } = useHover<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100px',
        height: '100%',
        cursor: 'pointer',
        borderRadius: '8px',
        backgroundColor: hovered ? '#f0f0f0' : '#ffffff', // placeholder background color
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onClick={() => router.push(`/${id}`)} // TODO: link to product detail page
    >
      <Image
        onClick={() => router.push(`/${id}`)}
        alt="product image"
        radius="md"
        src={image}
        height={90}
        width={90}
        fallbackSrc="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
      />
      <Text lineClamp={1} color="#2A2A2A" fz={12} fw="bold" mb={0}>
        {title}
      </Text>
      <Text lineClamp={1} color="#8C8C8C" fz={10}>
        {type}
      </Text>
    </div>
  )
}
