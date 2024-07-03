import { Group, Avatar, Text } from '@mantine/core'
import { FunctionComponent } from 'react'
import { Wrapper } from './UserAvatar.css'
import { IconUser } from '@tabler/icons-react'

const UserAvatar: FunctionComponent = () => {
  return (
    <Group gap={6} align="end" className={Wrapper}>
      <Avatar size="sm" color="white" radius="xl" bg="lightgray">
        <IconUser size={20} />
      </Avatar>
      <Group gap="xs">
        <Text>오들오딜</Text>
        <Text>362퐄</Text>
      </Group>
    </Group>
  )
}

export default UserAvatar
