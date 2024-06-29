'use client'

import { Badge, Center, Popover, Text } from '@mantine/core'
import { FunctionComponent, useState } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'

type Props = {
  x?: number
  y?: number
}

const ProductBadge: FunctionComponent = (props: Props) => {
  const [opened, { close, open }] = useDisclosure(false)

  return (
    <>
      <Popover opened={opened} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <Badge
            size="md"
            circle
            component="button"
            onMouseEnter={open}
            onMouseLeave={close}
          >
            <Center>
              <IconPlus stroke={2} size={16} />
            </Center>
          </Badge>
        </Popover.Target>
        <Popover.Dropdown style={{ pointerEvents: 'none' }}>
          <Text size="sm">
            This popover is shown when user hovers the target element
          </Text>
        </Popover.Dropdown>
      </Popover>
    </>
  )
}

export default ProductBadge
