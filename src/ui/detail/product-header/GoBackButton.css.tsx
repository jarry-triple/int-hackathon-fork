import { style } from '@vanilla-extract/css'
import { vars } from '~/ui/theme'

export const goBackButton = style({
  position: 'absolute',
  top: '24px',
  left: '16px',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
})
