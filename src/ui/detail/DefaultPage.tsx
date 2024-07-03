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

const DEFAULT_IMAGE_IDS = [
  '2b451c47-5030-4655-b9c4-a9a5ac440cbc',
  '6e9e0188-a1f2-47f3-ba30-7ef3646e957f',
  '1624b918-dfa5-456a-80db-8f706ac8c3f3',
  'a5e961b9-702b-43be-98b1-42dc4e23cbe4',
  '2b2368cc-a167-4aff-8421-90f5eb602e6b', // 바르셀 임시 1
  '2e6bc2b1-0a90-4b50-9b45-5b0b37c9b006', // 오사카 임시 1
  'd558fc7c-6914-4a78-8367-095739058c1c', // 다낭 임시 1
  '4d0cf015-f9ba-4385-93cd-d2623a9787d5', // 다낭 임시 2
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
        <ImageListing
          images={DEFAULT_IMAGE_IDS}
          showAddButton={true}
          clickable={false}
        />
      </div>
    </div>
  )
}
