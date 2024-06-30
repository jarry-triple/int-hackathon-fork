import { Container } from '@mantine/core'
import { DefaultPage } from '~/ui/detail/DefaultPage'

type Props = {}
export default function Home(props: Props) {
  return (
    <Container>
      <DefaultPage />
    </Container>
  )
}
