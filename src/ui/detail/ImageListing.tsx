'use client'

import { Button, FileButton, Flex, Grid, Image } from '@mantine/core'
import { ImageItem } from '~/ui/detail/ImageItem'
import { useEffect, useMemo, useState } from 'react'
import { useImagesContext } from '~/contexts/images-context'
import { useRouter } from 'next/navigation'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { ImageModel } from '../../types'
import { imageRepository } from '~/image/image.repository'

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
          <ImageItem id={image ?? uuid()} url={image} />
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
  const { selectedImages, setTags } = useImagesContext()
  const router = useRouter()

  useEffect(() => {
    if (selectedImages.length === 3) {
      router.push('/recommend')
    }
  }, [selectedImages, router])

  const [file, setFile] = useState<File | null>()
  const [similarImages, setSimilarImages] = useState<ImageModel[]>([])
  const [leftImages, setLeftImages] = useState<string[]>([])
  const [rightImages, setRightImages] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchLLMImage = async () => {
      if (!file) {
        return
      }

      // Create a new FormData instance
      const formData = new FormData()
      formData.append('file', file)

      try {
        // Send the formData with axios
        const response = await axios.post<ImageModel[]>(
          '/api/images',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )

        setSimilarImages(response.data)
      } catch (error) {
        console.error('Error uploading the image:', error)
      }
    }

    const fetchImages = async (ids: string[]) => {
      const result = await axios.get(`/api/images?ids=${ids.join(',')}`)

      setTags(result.data.map((image: ImageModel) => image.tags).flat())

      const imageUrls = result.data.map(
        (image: ImageModel) => `${image.imageUrl}:::${image.productId}`,
      ) as string[]

      setLeftImages(imageUrls.filter((_, i) => i % 2 === 0))
      setRightImages(imageUrls.filter((_, i) => i % 2 === 1))
      setLoading(false) // Set loading to false after images are fetched
    }

    setLoading(true) // Set loading to true before starting fetch
    fetchImages(images.filter((image) => image !== undefined) as string[])
    fetchLLMImage()
  }, [file, images])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Flex>
      <Grid style={{ paddingRight: '15px' }}>
        {leftImages.map((image, index) => (
          <Grid.Col key={index} span={12}>
            <ImageItem
              id={image.split(':::')[1]}
              url={image.split(':::')[0]}
              showForkButton={true}
              key={index}
            />
          </Grid.Col>
        ))}
      </Grid>

      {similarImages.map((image) => (
        <Image key={image._id} src={image.imageUrl} />
      ))}
      <Grid>
        <Grid.Col>
          <FileButton accept="image/*" onChange={setFile}>
            {(props) => (
              <Button
                {...props}
                size="xl"
                variant="default"
                style={{
                  fontSize: '15px',
                  color: '#8C8C8C',
                  fontWeight: '300',
                  width: '153px',
                }}
                radius="md"
              >
                + 직접 등록
              </Button>
            )}
          </FileButton>
        </Grid.Col>

        {rightImages.map((image, index) => (
          <Grid.Col key={index} span={12}>
            <ImageItem
              id={image.split(':::')[1]}
              url={image.split(':::')[0]}
              showForkButton={true}
              key={image}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Flex>
  )
}
