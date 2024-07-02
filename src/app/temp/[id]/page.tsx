'use client'

import { useCallback, useEffect, useState } from 'react'
import { Grid, Image } from '@mantine/core'

type Props = {
  params: {
    id: string
  }
}

export default function Home({ params: { id } }: Props) {
  const [images, setImages] = useState<string[]>([])

  const fetchImages = useCallback(async () => {
    const response = await fetch(
      `/recommendations-api/recommendations/images`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          geotag: {
            id: id,
            type: 'triple-region',
          },
          poiType: 'attraction',
          resourceType: 'poi',
        }),
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch images')
    }

    const data = await response.json()

    const { images } = data as unknown as {
      images: { imageUrl: string; resourceId: string }[]
    }

    setImages(images.map(({ imageUrl }) => imageUrl))
  }, [id])

  useEffect(() => {
    if (images.length === 0) {
      fetchImages()
    }
  })

  return (
    <div>
      <Grid>
        {images.map((imageUrl) => (
          <Grid.Col key={imageUrl} span={6}>
            <Image
              src={imageUrl}
              alt=""
              style={{ width: '200px', height: '200px', margin: '10px' }}
            />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  )
}
