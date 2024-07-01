'use client'

import { dummyImages } from '~/ui/detail/DefaultPage'
import { ImageListing } from '~/ui/detail/ImageListing'
import { IconSearch } from '@tabler/icons-react'

export function RecommendPage() {
  return (
    <div>
      {/*
        TODO: 서치버튼 css 제대로 맞춰두기
         */}
      <IconSearch
        color="grey"
        style={{ display: 'inline-block', float: 'right' }}
      />
      <div style={{ paddingTop: '20px' }}>
        <ImageListing images={dummyImages} showAddButton={false} />
      </div>
    </div>
  )
}
