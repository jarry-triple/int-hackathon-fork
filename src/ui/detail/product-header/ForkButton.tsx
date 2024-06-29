import { ActionIcon } from '@mantine/core'
import { FunctionComponent } from 'react'
import { IconFork } from '~/ui/icons/fork'
import { forkButton } from './ForkButton.css'

const ForkButton: FunctionComponent = () => {
  return (
    <ActionIcon
      size="xl"
      aria-label="action icon"
      color="white"
      w={'55px'}
      h={'55px'}
      className={forkButton}
    >
      <IconFork />
    </ActionIcon>
  )
}

export default ForkButton
