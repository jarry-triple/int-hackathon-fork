'use client'

import { Box, Center, Grid, Loader, Text } from '@mantine/core'
import { FunctionComponent, useEffect, useState } from 'react'
import { convertImageToBase64 } from '~/utils/convert-image-to-base64'
import { ImageItem } from '../ImageItem'
import { ImageModel } from '~/types'
import axios from 'axios'
import { ImageListing } from '../ImageListing'
type Props = {
  image?: ImageModel
}

const MoreImages: FunctionComponent<Props> = ({ image }) => {
  const [loading, setLoading] = useState(true)
  const [similarImages, setSimilarImages] = useState<ImageModel[]>([])

  useEffect(() => {
    const fetchLLMImage = async () => {
      if (!image) {
        return
      }

      const resp = await axios.get<Blob>(image.imageUrl, {
        responseType: 'blob',
      })

      const formData = new FormData()
      formData.append('file', resp.data)

      try {
        const response = await axios.post<ImageModel[]>(
          '/api/images',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )

        setSimilarImages(response.data.slice(1, 9))
      } catch (error) {
        console.error('Error uploading the image:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLLMImage()
  }, [image])

  return (
    <div>
      <div>
        <Text
          lineClamp={1}
          color="#2A2A2A"
          fz={20}
          fw="bold"
          mb={0}
          style={{ marginTop: '20px' }}
        >
          이런 곳도 좋아하실 것 같아요!
        </Text>
      </div>
      <Box pt={20} pb={20}>
        {loading ? (
          <Center>
            <Loader size={50} />
          </Center>
        ) : (
          <ImageListing
            images={similarImages.map((image) => image.imageUrl)}
            showAddButton={false}
          />
        )}
      </Box>
    </div>
  )
}

export default MoreImages
