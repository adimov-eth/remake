import { styled } from '@app/stitches.config'

export const Root = styled('div', {
    width: '100%',
    background: '#141622',
    borderRadius: '4px',
    overflow: 'hidden',
    height: '1rem',
})

export const ProgressFill = styled('div', {
    height: '100%',
    background: 'linear-gradient(90deg, #1ce7fd 0%, #365ae5 100%)',
    borderRadius: '4px',
    transition: 'width 0.5s ease-in-out',
})
