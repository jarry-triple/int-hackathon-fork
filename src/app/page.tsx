import {
  Container,
  ScrollArea,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core'
import { ImageListing } from '~/ui/detail/ImageListing'
import { DefaultPage } from '~/ui/detail/DefaultPage'

type Props = {}
export default function Home(props: Props) {
  return (
    <Container>
      <DefaultPage />
    </Container>
  )
}
