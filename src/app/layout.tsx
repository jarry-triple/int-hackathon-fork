import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import '~/ui/styles/global.css'

import {
  ColorSchemeScript,
  Container,
  MantineProvider,
  createTheme,
} from '@mantine/core'

import type { Metadata } from 'next'
import { theme } from '~/ui/theme'
import { ServiceNameHeader } from '~/ui/detail/ServiceNameHeader'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next ap',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>

      <body>
        <MantineProvider theme={theme}>
          <Container maw={385} size="responsive">
            <Container>
              <ServiceNameHeader />
            </Container>
            {children}
          </Container>
        </MantineProvider>
      </body>
    </html>
  )
}
