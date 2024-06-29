'use client'

import {
  Badge,
  Center,
  HoverCard,
  Overlay,
  Paper,
  Popover,
  Text,
} from '@mantine/core'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import ProductCard from './ProductCard'
import { badge } from './ProductBadge.css'

type Props = {
  coordinates: {
    x: number
    y: number
  }
}

const dummyResource = {
  imageUrl:
    'https://images.pexels.com/photos/3667564/pexels-photo-3667564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  title: '금문교',
  rating: 4.5,
  region: {
    name: '샌프란시스코',
  },
  resourceId: '82e32eb8-2470-4522-b61a-0ca40fd98534',
  resourceType: 'attraction' as const,
}

const ProductBadge: FunctionComponent<Props> = (props: Props) => {
  const [showOverlay, setShowOverlay] = useState(false)

  const handleOverlayOpen = () => {
    setShowOverlay(true)
  }

  const handleOverlayClose = () => {
    setShowOverlay(false)
  }

  return (
    <>
      {showOverlay && <Overlay backgroundOpacity={0.5} color="black" />}
      <HoverCard
        position="bottom"
        withArrow
        arrowSize={16}
        shadow="md"
        width="280px"
        onOpen={handleOverlayOpen}
        onClose={handleOverlayClose}
      >
        <HoverCard.Target>
          <Badge
            component="button"
            size="md"
            circle
            color="#3DF110"
            style={{
              top: props.coordinates.y,
              left: props.coordinates.x,
              zIndex: 201,
              opacity: showOverlay ? 0.25 : 1,
            }}
            className={badge}
          >
            <Center>
              <IconPlus stroke={4} size={16} />
            </Center>
          </Badge>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <ProductCard {...dummyResource} />
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  )
}

export default ProductBadge
