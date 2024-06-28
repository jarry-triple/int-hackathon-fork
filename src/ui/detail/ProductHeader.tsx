'use client'

import { BackgroundImage, Button } from '@mantine/core'
import { FunctionComponent } from 'react'

type Props = {}

const ProdutHeader: FunctionComponent = (props: Props) => {
	return (
		<BackgroundImage
			src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png'
			h={480}
		>
			<Button>Fork</Button>
		</BackgroundImage>
	)
}

export default ProdutHeader
