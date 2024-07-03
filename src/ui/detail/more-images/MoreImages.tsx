import { Text } from '@mantine/core'
import { FunctionComponent } from 'react'
import { ImageListing } from '../ImageListing'

type Props = {
  images: (string | undefined)[]
}

const MoreImages: FunctionComponent<Props> = ({ images }) => {
  return (
    <div>
      <div>
        <Text
          lineClamp={1}
          color="#2A2A2A"
          fz={20}
          fw="bold"
          mb={0}
          style={{ marginTop: '20px' }}
        >
          이런 곳도 좋아하실 것 같아요!
        </Text>
      </div>
      <div>
        <ImageListing images={images} showAddButton={false} />
      </div>
    </div>
  )
}

export default MoreImages
