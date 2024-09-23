import { styled } from '@app/stitches.config'

export const Root = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
})

export const TouchAreaWrapper = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50vh',
})

export const TouchArea = styled('div', {
    width: '18.75rem',
    height: '18.75rem',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 1,
})