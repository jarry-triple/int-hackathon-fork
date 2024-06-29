'use client'

import { BackgroundImage, Group, Stack } from '@mantine/core'
import { FunctionComponent } from 'react'

import UserAvatar from './UserAvatar'
import GoBackButton from './GoBackButton'
import ForkButton from './ForkButton'
import { wrapper } from './ProductHeader.css'
import ProductBadge from './ProductBadge'

type Props = {}

const ProdutHeader: FunctionComponent = (props: Props) => {
  return (
    <BackgroundImage
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
      h={480}
      w={375}
      className={wrapper}
    >
      <ProductBadge />
      <Stack>
        <GoBackButton />
        <Group justify="flex-end">
          <ForkButton />
          <UserAvatar />
        </Group>
      </Stack>
    </BackgroundImage>
  )
}

export default ProdutHeader
