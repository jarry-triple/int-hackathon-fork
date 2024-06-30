import { Container } from '@mantine/core'
import { WelcomePage } from '~/ui/detail/WelcomePage'

type Props = {}
export default function Home(props: Props) {
  return (
    <Container>
      <WelcomePage />
    </Container>
  )
}
