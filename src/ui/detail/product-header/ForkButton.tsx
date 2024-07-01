'use client'

import { ActionIcon } from '@mantine/core'
import {
  FunctionComponent,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react'
import { IconFork } from '~/ui/icons/fork'
import { forkButton } from './ForkButton.css'
import AnimatedCheckIcon from '~/ui/icons/animted-checkbox'

const ForkButton: FunctionComponent = () => {
  const [clicked, setClicked] = useState(false)

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    setClicked(true)
  }

  useEffect(() => {
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
