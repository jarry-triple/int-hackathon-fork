'use client'
import { useRouter } from 'next/navigation'
import { Image } from '@mantine/core'
import { useHover } from '@mantine/hooks'

interface ImageItemProps {
  id: string
  image?: string
}

export function ImageItem({ id, image }: ImageItemProps) {
  const router = useRouter()
  const { hovered, ref } = useHover<HTMLImageElement>()

  return (
    <Image
      ref={ref}
      style={{
        cursor: 'pointer',
        filter: hovered ? 'brightness(0.8)' : 'brightness(1)',
      }}
      onClick={() => router.push(`/${id}`)}
      alt="image"
      radius="lg"
      src={image}
      h={217}
      w={153}
      fallbackSrc="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
    />
  )
}
