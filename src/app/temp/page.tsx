'use client'
import { Container, List, NavLink } from '@mantine/core'
import { REGIONS } from '~/scripts/generate-poi-data'

type Props = {}

const REGIONS_MAP: Record<string, string> = {
  'c883cd34-f5c2-4f0a-9960-5f963f9b2dbb': '바르셀로나',
  '3fc342f5-1900-4352-a35c-91080632dbe7': '파리',
  '759174cc-0814-4400-a420-5668a0517edd': '제주',
  '23c5965b-01ad-486b-a694-a2ced15f245c': '도쿄',
  '22b60e7e-afc7-40e1-9237-8f31ed8a842d': '다낭',
}

export default function Home(props: Props) {
  // const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  return (
    <Container>
      <div>
        <List>
          {REGIONS.map((region) => (
            <NavLink
              key={region}
              href={`/temp/${region}`}
              label={REGIONS_MAP[region]}
            />
          ))}
        </List>
      </div>
    </Container>
  )
}
