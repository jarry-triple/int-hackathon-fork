'use client'
import { Button, FileButton, Flex, Grid, Image } from '@mantine/core'
import { ImageItem } from '~/ui/detail/ImageItem'
import { useEffect, useMemo, useState } from 'react'
import { useImagesContext } from '~/contexts/images-context'
import { useRouter } from 'next/navigation'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { ImageModel } from '../../types'

// TODO: 이미지 사이 gap 좀 줄이기..
export function ImageListing({
  images,
  showAddButton,
}: {
  images: (string | undefined)[]
  showAddButton: boolean
}) {
  const { selectedImages } = useImagesContext()
  const router = useRouter()

  if (selectedImages.length === 3) {
    router.push('/recommend')
  }

  return showAddButton ? (
    <ImageListingWithAddButton images={images} />
  ) : (
    <Grid gutter="xs">
      {images.map((image, index) => (
        <Grid.Col key={index} span={6}>
          <ImageItem id={uuid()} image={image} />
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

  const [file, setFile] = useState<File | null>()
  const [similarImages, setSimilarImages] = useState<ImageModel[]>([])

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

    fetchLLMImage()
  }, [file])

  return (
    <Flex>
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
              width: '100%',
            }}
            radius="md"
          >
            + 직접 등록
          </Button>
        )}
      </FileButton>
      {/* <Grid style={{ paddingRight: '15px' }}>
        {leftImages.map((image, index) => (
          <Grid.Col key={index} span={12}>
            <ImageItem id={uuid()} image={image} showForkButton={true} />
          </Grid.Col>
        ))}
      </Grid> */}

      {similarImages.map((image) => (
        <Image key={image._id} src={image.imageUrl} />
      ))}
      {/* <Grid>
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
                  width: '100%',
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
              key={index}
              id={uuid()}
              image={image}
              showForkButton={true}
            />
          </Grid.Col>
        ))}
      </Grid> */}
    </Flex>
  )
}
