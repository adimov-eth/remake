import { styled } from '@app/stitches.config'

export const RadiantGradient = styled('div', {
    position: 'relative',

    '&::before': {
        content: '',
        position: 'absolute',
        width: 'calc(100% + 6.25rem)',
        height: 'calc(100% + 6.25rem)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '9999px',
        filter: 'blur(3.75rem)',
    },
    variants: {
      variant: {
        pink: {
            '&::before': {
                // width: '84px',
                // height: '84px',
                background: 'radial-gradient(circle, rgba(193, 61, 157, 1) 0%, rgba(193, 61, 157, 0) 70%)',
            }
        },
        purple: {
            '&::before': {
                // width: '110px',
                // height: '110px',
                background: 'radial-gradient(circle, rgba(127, 74, 186, 1) 0%, rgba(127, 74, 186, 0) 70%)',
            }
        },
        blue: {
            '&::before': {
                // width: '84px',
                // height: '84px',
                background: 'radial-gradient(circle, rgba(101, 86, 208, 1) 0%, rgba(101, 86, 208, 0) 70%)',
            },
        },
      },
    },
    defaultVariants: {
        variant: 'pink',
    },
  })