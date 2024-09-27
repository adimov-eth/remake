import { styled } from '@/app/stitches.config';

export const Root = styled('div', {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4.125rem 1rem 0 1rem',
    color: '#fff',
    backdropFilter: 'brightness(75%)',
    variants: {
        justify: {
            center: {
                padding: '0 1rem',
                justifyContent: 'center',
            },
            start: {
                justifyContent: 'start',
            },
        }
    }
})

export const Title = styled('h1', {
    position: 'relative',
    zIndex: 3,
    fontFamily: 'Tektur, sans-serif',
    color: '#FFF',
    textAlign: 'center',
    textShadow: '0px 0px 1.25rem rgba(255, 255, 255, 0.80)',
    fontSize: '2rem',
    fontWeight: 700,
    pointerEvents: 'none',
});

export const Description = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    marginTop: '1.75rem',
    fontFamily: 'SF Pro Display, sans-serif',
    color: '#FFF',
    textAlign: 'center',
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: '1.625rem',
    pointerEvents: 'none',
});

export const Subtitle = styled('h2', {
    marginTop: '1.75rem',
    color: '#FFF',
    textAlign: 'center',
    textShadow: '0px 0px 6.6px rgba(255, 255, 255, 0.49)',
    fontFamily: 'Tektur',
    fontSize: '1.5rem',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '1.875rem',
    pointerEvents: 'none',
})