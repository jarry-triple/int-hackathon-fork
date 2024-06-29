import { ActionIcon } from '@mantine/core'
import { IconCircleArrowLeftFilled } from '@tabler/icons-react'
import { FunctionComponent } from 'react'
import { goBackButton } from './GoBackButton.css'
import { useRouter } from 'next/navigation'

const GoBackButton: FunctionComponent = () => {
  const router = useRouter()

  return (
    <ActionIcon
      size="xl"
      aria-label="action icon"
      color="transparent"
      className={goBackButton}
      onClick={() => router.push('/')}
    >
      <IconCircleArrowLeftFilled size="42px" stroke={0} />
    </ActionIcon>
  )
}

export default GoBackButton
