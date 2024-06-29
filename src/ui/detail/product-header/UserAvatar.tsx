import { Group, Avatar, Text } from '@mantine/core'
import { FunctionComponent } from 'react'
import { Wrapper } from './UserAvatar.css'

const UserAvatar: FunctionComponent = () => {
  return (
    <Group gap="0" className={Wrapper}>
      <Avatar size="sm" color="white" radius="xl" />
      <Group gap="xs">
        <Text>오들오딜</Text>
        <Text>362픽</Text>
      </Group>
    </Group>
  )
}

export default UserAvatar
