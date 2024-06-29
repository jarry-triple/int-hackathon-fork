import { style } from '@vanilla-extract/css'
import { vars } from '~/ui/theme'

export const goBackButton = style({
  ':hover': {
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
})
