'use client'

import { ActionIcon } from '@mantine/core'
import { MouseEventHandler, useEffect, useState } from 'react'
import { IconFork } from '~/ui/icons/fork'
import { forkButton } from './ForkButton.css'
import AnimatedCheckIcon from '~/ui/icons/animted-checkbox'
import { useImagesContext } from '~/contexts/images-context'

type Props = {
  id?: string
  forkCallback?: (forked: boolean) => void
}

const ForkButton = ({ id, forkCallback }: Props) => {
  const [clicked, setClicked] = useState(false)
  const { selectedImages, setSelectedImages } = useImagesContext()

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    setClicked(true)
    forkCallback && forkCallback(true)
    if (id) {
      setSelectedImages(
        Array.from(
          new Set([...selectedImages, id].filter((v) => v !== undefined)),
        ),
      )
    }
  }

  useEffect(() => {
    if (!clicked) return

    const timer = setTimeout(() => setClicked(false), 1000)
    return () => clearTimeout(timer)
  }, [clicked])

  return (
    <ActionIcon
      aria-label="action icon"
      variant="default"
      radius="xl"
      w={'55px'}
      h={'55px'}
      className={forkButton}
      onClick={onButtonClick}
    >
      {clicked ? <AnimatedCheckIcon isVisible={clicked} /> : <IconFork />}
    </ActionIcon>
  )
}

export default ForkButton
