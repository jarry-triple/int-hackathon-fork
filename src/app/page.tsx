import { Container, Title, Text, TypographyStylesProvider } from '@mantine/core'

export default function Home() {
	return (
		<TypographyStylesProvider>
			<main>
				<Container>
					<Title>Life is sour as pickle</Title>
					<Text>Or Maybe NOT!</Text>
				</Container>
			</main>
		</TypographyStylesProvider>
	)
}
