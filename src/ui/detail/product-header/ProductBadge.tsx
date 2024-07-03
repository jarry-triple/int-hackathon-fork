import {
  Badge,
  Box,
  Center,
  HoverCard,
  Overlay,
  Paper,
  Popover,
  Text,
} from '@mantine/core'
import { FunctionComponent, useState } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import ProductCard from './ProductCard'
import { badge } from './ProductBadge.css'
import { ImageModel } from '~/types'
import { ResourceType } from '../../../utils/resource-types'

type Props = {
  image: ImageModel
  object: ImageModel['objects'][0]
  handleOverlayOpen: () => void
  handleOverlayClose: () => void
  showOverlay: boolean
}

const ProductBadge: FunctionComponent<Props> = ({
  image,
  object,
  handleOverlayClose,
  handleOverlayOpen,
  showOverlay,
}) => {
  return (
    <>
      <HoverCard
        withArrow
        arrowSize={16}
        shadow="md"
        width="280px"
        onOpen={handleOverlayOpen}
        onClose={handleOverlayClose}
        withinPortal={false}
      >
        <HoverCard.Target>
          <Badge
            component="button"
            size="md"
            circle
            color="#3DF110"
            style={{
              top: object.position.y * 480,
              left: object.position.x * 375,
              zIndex: 201,
              opacity: showOverlay ? 0.6 : 1,
            }}
            className={badge}
          >
            <Center>
              <IconPlus stroke={4} size={16} />
            </Center>
          </Badge>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <ProductCard
            title={object.name}
            rating={object.ratings}
            region={{ name: image.region }}
            resourceId={image.productId!}
            resourceType={image.productType! as ResourceType}
            imageUrl={object.imageUrl}
            originalPrice={object.originalPrice}
            discountedPrice={object.discountedPrice}
          />
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  )
}

export default ProductBadge
