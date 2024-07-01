import { Box, Title, Text } from '@mantine/core'
import { FunctionComponent } from 'react'
import { ResourceType } from '~/utils/resource-types'

type Props = {
  products: {
    resourceId: string
    resourceName: string
    resourceType: ResourceType
    imageUrl: string
  }[]
}

const LocalItems: FunctionComponent<Props> = ({ products }: Props) => {
  return (
    <Box>
      <Title size={20}>이 근처</Title>
      {products.map((product) => {
        return <Text key={product.resourceId}>Placeholder</Text>
      })}
    </Box>
  )
}

export default LocalItems
