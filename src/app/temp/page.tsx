'use client'
import { Container, List, NavLink } from '@mantine/core'
import { TARGET_REGIONS } from '~/utils/fixtures'

type Props = {}

export default function Home(props: Props) {
  // const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  return (
    <Container>
      <div>
        <List>
          {TARGET_REGIONS.map(({ id: regionId, name: regionName }) => (
            <NavLink
              key={regionId}
              href={`/temp/${regionId}`}
              label={regionName}
            />
          ))}
        </List>
      </div>
    </Container>
  )
}
