import { Button, Container, Flex, Image, Space, Text } from '@mantine/core'

import { ResourceType, toReadableResourceType } from '~/utils/resource-types'
import { toDotSeparatedString } from '~/utils/string-utils'
import ProductHeader from '~/ui/detail/product-header/ProductHeader'
import MoreImages from '~/ui/detail/more-images/MoreImages'
import { ProductListing } from '~/ui/detail/product-listing'
import { fetchImageById } from '~/utils/fetch-user-by-id'

type Props = {
  params: {
    id: string
  }
}

export default async function ImageDetailPage({ params: { id } }: Props) {
  const image = await fetchImageById(id)

  if (!image) {
    return (
      <div>
        <Text>Loading...</Text>
      </div>
    )
  }

  return (
    <div>
      <ProductHeader image={image} />
      <ResourceInfoCard
        imageUrl={image.imageUrl}
        title={image.locationName}
        info={image.locationSummary}
        region={{ name: image.region }}
        resourceType={image.productType as ResourceType}
      />

      <Text color="#2A2A2A" fz={18} fw={400}>
        {`"${image.locationSummary}"`}
      </Text>
      <Space h={6} />
      <ProductListing geotagName={image.region} />
      <FlightList regionName={image.region} />
      <MoreImages image={image} />
      <Space h={28} />
    </div>
  )
}

function FlightList({ regionName }: { regionName: string }) {
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
