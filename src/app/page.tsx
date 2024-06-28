import { Container, Title, Text, TypographyStylesProvider } from '@mantine/core'

type Props = {}
export default function Home(props: Props) {
	return (
		<TypographyStylesProvider>
			<Container>
				<Title>Life is sour as pickle</Title>
				<Text>Or Maybe NOT!</Text>
				<Text>케이지 없는 케이지팀</Text>
			</Container>
		</TypographyStylesProvider>
	)
}
