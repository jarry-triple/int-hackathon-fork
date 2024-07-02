'use client'

import { IconSearch } from '@tabler/icons-react'
import {
  ActionIcon,
  Container,
  Group,
  Text,
  rem,
  Modal,
  Center,
  LoadingOverlay,
  Box,
  Grid,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import axios from 'axios'
import { ImageModel } from '../../types'
import { ImageItem } from './ImageItem'

export function RecommendPage() {
  const [opened, { open, close }] = useDisclosure()
  const [file, setFile] = useState<File | null>()
  const [similarImages, setSimilarImages] = useState<ImageModel[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchLLMImage = async () => {
      if (!file) {
        return
      }

      const formData = new FormData()
      formData.append('file', file)

      try {
        setLoading(true)
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
      } finally {
        setLoading(false)
      }
    }

    fetchLLMImage()
  }, [file])

  return (
    <Container>
      <Modal opened={opened} onClose={close} title="이미지 검색">
        <Dropzone
          onDrop={(files) => {
            if (files.length === 0) return
            setFile(files[0])
            close()
          }}
          maxSize={5 * 1024 ** 2}
          maxFiles={1}
          accept={IMAGE_MIME_TYPE}
        >
          <Group
            justify="center"
            gap="lg"
            mih={220}
            style={{ pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-blue-6)',
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-red-6)',
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-dimmed)',
                }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="lg" inline>
                이미지를 드래그하거나 클릭해서 업로드하세요.
              </Text>
              <Center>
                <Text size="xs" c="dimmed" inline mt={7}>
                  (최대 5MB)
                </Text>
              </Center>
            </div>
          </Group>
        </Dropzone>
      </Modal>
      <ActionIcon
        variant="transparent"
        style={{ position: 'absolute', top: '28px', right: '32px' }}
        onClick={open}
      >
        <IconSearch color="grey" />
      </ActionIcon>

      <div style={{ paddingTop: '20px' }}>
        {loading ? (
          <Box pt={740}>
            <Center>
              <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars' }}
              />
            </Center>
          </Box>
        ) : (
          <Grid gutter="xs">
            {similarImages.map((image, index) => (
              <Grid.Col key={index} span={6}>
                <ImageItem id={image._id} url={image.imageUrl} />
              </Grid.Col>
            ))}
          </Grid>
        )}
      </div>
    </Container>
  )
}
