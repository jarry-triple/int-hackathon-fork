'use client'
import { useRouter } from 'next/navigation'
import { Image } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import ForkButton from './product-header/ForkButton'
import { useState } from 'react'
import { IconFork } from '../icons/fork'

interface ImageItemProps {
  id: string
  url?: string
  showForkButton?: boolean
}

export function ImageItem({ id, url, showForkButton }: ImageItemProps) {
  const router = useRouter()
  const { hovered, ref } = useHover<HTMLImageElement>()
  const [forked, setForked] = useState(false)

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
          border: forked ? '5px solid #3DF110' : 'none',
        }}
        onClick={() => router.push(`/${id}`)}
        alt="image"
        radius="lg"
        src={url}
        height={217}
        width={153}
        fallbackSrc="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
      />
      {forked && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          <IconFork color="#3DF110" />
        </div>
      )}
      {showForkButton && hovered && (
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            zIndex: 1,
          }}
        >
          <ForkButton id={id} forkCallback={setForked} />
        </div>
      )}
    </div>
  )
}
