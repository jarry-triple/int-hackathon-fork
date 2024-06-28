import { Container, Title, Text, TypographyStylesProvider } from '@mantine/core'
import { FunctionComponent } from 'react'
import ProductHeader from '~/ui/detail/ProductHeader'

type Props = {
	params: {
		id: string
	}
}

export default function ImageDetailPage(props: Props) {
	return (
		<TypographyStylesProvider>
			<Container>
				<Title>ImageDetail</Title>
				<ProductHeader />
			</Container>
		</TypographyStylesProvider>
	)
}
