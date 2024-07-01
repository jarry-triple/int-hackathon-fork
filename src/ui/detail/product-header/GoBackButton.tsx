import { ActionIcon } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { FunctionComponent } from 'react'
import { goBackButton } from './GoBackButton.css'
import { useRouter } from 'next/navigation'

const GoBackButton: FunctionComponent = () => {
  const router = useRouter()

  return (
    <ActionIcon
      variant="default"
      size="xl"
      radius="xl"
      aria-label="action icon"
      className={goBackButton}
      onClick={() => router.push('/')}
    >
      <IconArrowLeft size="30px" stroke={1} fill="white" color="black" />
    </ActionIcon>
  )
}

export default GoBackButton
