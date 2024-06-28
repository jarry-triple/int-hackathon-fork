import { Image } from '@mantine/core'

interface ImageItemProps {
  image?: string
}

export function ImageItem({ image }: ImageItemProps) {
  return (
    <Image
      radius="lg"
      src={image}
      h={217}
      w={153}
      fallbackSrc="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
    />
  )
}
