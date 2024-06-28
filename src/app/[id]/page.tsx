import {
  Button,
  Container,
  Flex,
  Image,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core'

import ProductHeader from '~/ui/detail/ProductHeader'
import { ResourceType, toReadableResourceType } from '~/utils/resource-types'
import { toDotSeparatedString } from '~/utils/string-utils'

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

export default function ImageDetailPage(props: Props) {
  return (
    <TypographyStylesProvider>
      <Container>
        <Title>ImageDetail</Title>
        <ProductHeader />
      </Container>

      <ResourceInfoCard
        imageUrl={dummyResource.imageUrl}
        title={dummyResource.title}
        info={dummyResource.info}
        region={dummyResource.region}
        resourceType={dummyResource.resourceType}
      />
    </TypographyStylesProvider>
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
