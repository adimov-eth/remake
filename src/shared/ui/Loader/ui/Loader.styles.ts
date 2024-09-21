import { styled, keyframes } from '@app/stitches.config';

const spin = keyframes({
    '0%, 100%': {
        boxShadow: '.2em 0 0 0px currentcolor',
    },
    '12%': {
        boxShadow: '.2em .2em 0 0 currentcolor',
    },
    '25%': {
        boxShadow: '0 .2em 0 0 currentcolor',
    },
    '37%': {
        boxShadow: '-.2em .2em 0 0 currentcolor',
    },
    '50%': {
        boxShadow: '-.2em 0 0 0 currentcolor',
    },
    '62%': {
        boxShadow: '-.2em -.2em 0 0 currentcolor',
    },
    '75%': {
        boxShadow: '0 -.2em 0 0 currentcolor',
    },
    '87%': {
        boxShadow: '.2em -.2em 0 0 currentcolor',
    }
});

export const Root = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
});

export const Loader = styled('div', {
    transform: 'rotateZ(45deg)',
    perspective: '1000px',
    borderRadius: '50%',
    width: '9.375rem',
    height: '9.375rem',
    color: '#0029FF',
    position: 'relative',
    '&:before, &:after': {
        content: '',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 'inherit',
        height: 'inherit',
        borderRadius: '50%',
        transform: 'rotateX(70deg)',
    },
    '&:after': {
        color: '#6600FF',
        transform: 'rotateY(70deg)',
        animationDelay: '.4s',
    },
    variants: {
        speed: {
            fast: {
                '&:before, &:after': {
                    animation: `${spin} 1s linear infinite`,
                },
            },
            slow: {
                '&:before, &:after': {
                    animation: `${spin} 2s linear infinite`,
                },
            },
        },
    }
});
