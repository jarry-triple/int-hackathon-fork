'use client'

import { BackgroundImage, Box, Group, Stack } from '@mantine/core'
import { FunctionComponent, useState } from 'react'

import UserAvatar from './UserAvatar'
import GoBackButton from './GoBackButton'
import ForkButton from './ForkButton'
import { wrapper } from './ProductHeader.css'
import ProductBadge from './ProductBadge'
import { ImageModel } from '~/types'

type Props = {
  image: ImageModel
}

const ProdutHeader: FunctionComponent<Props> = (props) => {
  const [forks, setForks] = useState(55)
  const handleFork = (forked: boolean) => {
    if (forked) {
      setForks(forks + 1)
    } else {
      setForks(forks - 1)
    }
  }

  return (
    <BackgroundImage
      src={props.image.imageUrl}
      h={480}
      w={375}
      className={wrapper}
    >
      <ProductBadge
        coordinates={{
          x: 100,
          y: 100,
        }}
      />
      <Stack h="100%" justify="space-between">
        <Box pt="1rem" pl="1.4rem">
          <GoBackButton />
        </Box>
        <Group pb="1.5rem" px="1.5rem" justify="space-between" align="flex-end">
          <UserAvatar forks={forks} />
          <ForkButton forkCallback={handleFork} />
        </Group>
      </Stack>
    </BackgroundImage>
  )
}

export default ProdutHeader
