import { style } from '@vanilla-extract/css'

export const forkButton = style({
  ':hover': {
    transform: 'scale(1.1)',
    transition: 'transform 0.2s ease-in-out',
  },
})
