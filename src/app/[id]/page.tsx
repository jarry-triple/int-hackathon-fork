import { Container, Title,  TypographyStylesProvider } from '@mantine/core'

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
