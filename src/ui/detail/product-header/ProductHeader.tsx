'use client'

import { BackgroundImage, Box, Group, Stack } from '@mantine/core'
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
      <Stack h="100%" justify="space-between">
        <Box pt="1rem" pl="1.4rem">
          <GoBackButton />
        </Box>
        <Group pb="1.5rem" px="1.5rem" justify="space-between" align="flex-end">
          <UserAvatar />
          <ForkButton />
        </Group>
      </Stack>

      {/* <ProductBadge /> */}
    </BackgroundImage>
  )
}

export default ProdutHeader
