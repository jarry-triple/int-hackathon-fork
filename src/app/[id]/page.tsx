import { Container, Title, Text, TypographyStylesProvider } from '@mantine/core'
import { FunctionComponent } from 'react'

type Props = {}
const ImageDetail: FunctionComponent = (props: Props) => {
	return (
		<TypographyStylesProvider>
			<Container>
				<Title>ImageDetail</Title>
				<Text>{/* <Image src='https://via.placeholder.com/150' alt='placeholder' /> */}</Text>
			</Container>
		</TypographyStylesProvider>
	)
}

export default ImageDetail
