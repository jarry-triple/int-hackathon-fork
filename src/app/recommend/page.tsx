import { Container } from '@mantine/core'
import { DefaultPage, dummyImages } from '~/ui/detail/DefaultPage'
import { ImageListing } from '~/ui/detail/ImageListing'
import { RecommendPage } from '~/ui/detail/RecommendPage'

export default function Home() {
  return (
    <Container>
      <RecommendPage />
    </Container>
  )
}
