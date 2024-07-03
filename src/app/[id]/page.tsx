'use client'
import { Button, Container, Flex, Image, Space, Text } from '@mantine/core'

import { ResourceType, toReadableResourceType } from '~/utils/resource-types'
import { toDotSeparatedString } from '~/utils/string-utils'
import ProductHeader from '~/ui/detail/product-header/ProductHeader'
import MoreImages from '~/ui/detail/more-images/MoreImages'
import { ProductListing } from '~/ui/detail/product-listing'

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

      <Text lineClamp={2} color="#2A2A2A" fz={18} fw={400}>
        {`"${dummyResource.info}"`}
      </Text>
      <Space h={6} />
      <ProductListing />
      <FlightList regionName={dummyResource.region.name} />
      <MoreImages images={dummyImages} />
      <Space h={28} />
    </>
  )
}

function FlightList({ regionName }: { regionName: string }) {
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
        {regionName} 최저가 항공권
      </Text>
      <Flex
        style={{
          marginTop: '5px',
          gap: '1rem',
          overflowX: 'auto',
          padding: '5px 0',
          whiteSpace: 'nowrap',
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <FlightItem key={index} />
        ))}
      </Flex>
    </div>
  )
}

function FlightItem() {
  return (
    <div
      style={{
        border: '1px solid #EBEBEB',
        borderRadius: '8px',
        padding: '1.2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '280px',
      }}
    >
      <Text lineClamp={1} fz={16} c="#2A2A2A">
        7월 11일(목) - 7월 16일(화), 5박
      </Text>
      <Flex justify="space-between" align="center">
        <Image
          w={24}
          h={24}
          alt="대한항공 로고"
          src="https://i.namu.wiki/i/ohrnViDOm6XmRP0itB8kb_StEPqqBund8PuWfRBl2fpUor-ImK0vE_cVStXQN04bezUdam_4vqKpBtqoA61nrg.webp"
        />

        <Flex justify="end" align="center" gap={6}>
          <Text fz={12} c="#8C8C8C">
            직항
          </Text>
          <Text fz={16} fw="bold" c="#2A2A2A">
            107,800원
          </Text>
        </Flex>
      </Flex>
    </div>
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
    <Flex justify="center" align="center" py={10} px={10} mb={16}>
      {/* 1st column - Image */}
      <Container flex={1} w={64} h={64} miw={64} mih={64} p={0}>
        <Image
          w={64}
          h={64}
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
