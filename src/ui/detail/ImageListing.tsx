'use client'
import { Button, Flex, Grid } from '@mantine/core'
import { ImageItem } from '~/ui/detail/ImageItem'
import { useMemo } from 'react'

// TODO: 이미지 사이 gap 좀 줄이기..
export function ImageListing({
  images,
  showAddButton,
}: {
  images: (string | undefined)[]
  showAddButton: boolean
}) {
  return showAddButton ? (
    <ImageListingWithAddButton images={images} />
  ) : (
    <Grid gutter="xs">
      {images.map((image, index) => (
        <Grid.Col key={index} span={6}>
          <ImageItem image={image} />
        </Grid.Col>
      ))}
    </Grid>
  )
}

function ImageListingWithAddButton({
  images,
}: {
  images: (string | undefined)[]
}) {
  const [leftImages, rightImages] = useMemo(
    () => [0, 1].map((v) => images.filter((_, i) => i % 2 === v)),
    [images],
  )

  return (
    <Flex>
      <Grid style={{ paddingRight: '15px' }}>
        {leftImages.map((image, index) => (
          <Grid.Col key={index} span={12}>
            <ImageItem image={image} />
          </Grid.Col>
        ))}
      </Grid>
      <Grid>
        <Grid.Col>
          <Button
            size="xl"
            variant="default"
            style={{
              fontSize: '15px',
              color: '#8C8C8C',
              fontWeight: '300',
            }}
            radius="md"
          >
            + 직접 등록
          </Button>
        </Grid.Col>

        {rightImages.map((image, index) => (
          <Grid.Col key={index} span={12}>
            <ImageItem key={index} image={image} />
          </Grid.Col>
        ))}
      </Grid>
    </Flex>
  )
}
