import {
  Flex,
  Container,
  Button,
  Image,
  Text,
  Rating,
  Stack,
} from '@mantine/core'
import Link from 'next/link'

import { FunctionComponent } from 'react'
import { ResourceType, toReadableResourceType } from '~/utils/resource-types'
import { toDotSeparatedString } from '~/utils/string-utils'

type Props = {
  imageUrl: string
  title: string
  region: { name: string }
  resourceId: string
  resourceType: ResourceType
  rating: number
}

export const ProductCard: FunctionComponent<Props> = (props: Props) => {
  return (
    <Stack>
      <Flex justify="center" align="center" py={5} px={10}>
        {/* 1st column - Image */}
        <Container flex={1} w={80} h={80} miw={80} mih={80} p={0}>
          <Image
            w={80}
            h={80}
            alt="이미지"
            radius="md"
            fit="cover"
            src={props.imageUrl}
          />
        </Container>

        <Stack flex={3} px={10} gap={2}>
          <Link
            href={`https://triple-dev.titicaca-corp.com/${props.resourceType}s/${
              props.resourceId
            }`}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <Text lineClamp={1} color="#2A2A2A" fz={16} fw="bold">
              {props.title}
            </Text>
          </Link>

          <Rating value={props.rating} fractions={10} readOnly />

          <Text lineClamp={1} color="#8C8C8C" fz={12}>
            {toDotSeparatedString([
              props.region.name,
              toReadableResourceType(props.resourceType),
            ])}
          </Text>
        </Stack>
      </Flex>
      <Stack gap="0">
        <Flex justify="flex-end">
          <Text size="sm" color="#B4B4B4" td="line-through">
            100,000원
          </Text>
        </Flex>
        <Flex justify="flex-end" gap="6px">
          <Text color="#FF2876">20%</Text>
          <Text fw="bolder">80,000원</Text>
        </Flex>
      </Stack>
    </Stack>
  )
}

export default ProductCard
