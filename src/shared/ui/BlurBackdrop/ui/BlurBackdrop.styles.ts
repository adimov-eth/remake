import { styled } from '@app/stitches.config'

export const BlurBackdrop = styled('div', {
    position: 'relative',

    '&::before': {
        content: '',
        position: 'absolute',
        width: 'calc(100%)',
        height: 'calc(100%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '9999px',
        filter: 'blur(4.625rem)',
        zIndex: 0,
    },
    variants: {
        variant: {
            pink: {
                '&::before': {
                    backgroundColor: '#c13d9d',
                },
            },
            purple: {
                '&::before': {
                    backgroundColor: '#7f4aba',
                },
            },
            blue: {
                '&::before': {
                    backgroundColor: '#6556d0',
                },
            },
        },
    },
    defaultVariants: {
        variant: 'pink',
    },
})

export const BlurBackdropContent = styled('div', {
    position: 'relative',
    zIndex: 1,
})