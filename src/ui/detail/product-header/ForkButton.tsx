import { ActionIcon } from '@mantine/core'
import { FunctionComponent } from 'react'
import { IconFork } from '~/ui/icons/fork'
import { forkButton } from './ForkButton.css'

const ForkButton: FunctionComponent = () => {
  return (
    <ActionIcon
      aria-label="action icon"
      variant="default"
      w={'55px'}
      h={'55px'}
      className={forkButton}
    >
      <IconFork />
    </ActionIcon>
  )
}

export default ForkButton
