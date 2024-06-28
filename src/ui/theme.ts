'use client'

import { createTheme } from '@mantine/core'
import { themeToVars } from '@mantine/vanilla-extract'

export const theme = createTheme({
	fontFamily: 'Spoqa Han Sans Neo, sans-serif',
})
export const vars = themeToVars(theme)
