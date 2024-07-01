'use client'

import { Text, Title } from '@mantine/core'
import { ImageListing } from '~/ui/detail/ImageListing'
// TODO: api 연결
export const dummyImages = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
]

export function DefaultPage() {
  return (
    <div>
      <div style={{ paddingBottom: '30px', paddingTop: '25px' }}>
        <Title order={2} style={{ paddingBottom: '5px' }}>
          어떤 느낌의 여행지를
          <br />
          좋아하시나요?
        </Title>
        <Text style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
          선택한 3개 이미지 또는 직접 등록한 이미지로 맞춤 추천됩니다.
        </Text>
      </div>
      <div>
        <ImageListing images={dummyImages} showAddButton={true} />
      </div>
    </div>
  )
}
