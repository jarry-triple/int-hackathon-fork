'use client'
import { useRouter } from 'next/navigation'
import { Image } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import ForkButton from './product-header/ForkButton'

interface ImageItemProps {
  id: string
  image?: string
  showForkButton: boolean
}

export function ImageItem({ id, image, showForkButton }: ImageItemProps) {
  const router = useRouter()
  const { hovered, ref } = useHover<HTMLImageElement>()

  return (
    <div
      ref={ref}
      style={{ position: 'relative', width: '153px', height: '217px' }}
    >
      <Image
        style={{
          cursor: 'pointer',
          filter: hovered ? 'brightness(0.8)' : 'brightness(1)',
          position: 'relative',
        }}
        onClick={() => router.push(`/${id}`)}
        alt="image"
        radius="lg"
        src={image}
        height={217}
        width={153}
        fallbackSrc="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
      />
      {showForkButton && hovered && (
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            zIndex: 1,
          }}
        >
          <ForkButton />
        </div>
      )}
    </div>
  )
}
