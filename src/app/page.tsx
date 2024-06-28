'use client'

import {
  ScrollArea,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core'
import { ImageListing } from '~/ui/detail/ImageListing'

// TODO: api 연결
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
type Props = {}
export default function Home(props: Props) {
  return (
    <TypographyStylesProvider>
      <div style={{ paddingBottom: '30px' }}>
        <Title order={2}>
          어떤 느낌의 여행지를
          <br />
          좋아하시나요?
        </Title>
        <Text style={{ fontSize: '13px' }}>
          선택한 3개 이미지 또는 직접 등록한 이미지로 맞춤 추천됩니다.
        </Text>
      </div>
      <div>
        <ScrollArea>
          <ImageListing images={dummyImages} showAddButton={true} />
        </ScrollArea>
      </div>
    </TypographyStylesProvider>
  )
}
