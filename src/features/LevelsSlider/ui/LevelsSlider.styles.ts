import { styled } from '@app/stitches.config';
import ArrowIcon from '@shared/assets/arrow.svg?react';

export const Root = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '0.5rem',
});

export const LevelsSlider = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    width: '100%',
});

export const LevelsSliderNavButtonIcon = styled(ArrowIcon, {
    width: '1.5rem',
    height: '1.5rem',
});

export const LevelsSliderNavButton = styled('button', {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.5,
    },
    variants: {
        variant: {
            prev: {
                [`& ${LevelsSliderNavButtonIcon}`]: {
                    transform: 'rotate(180deg)',
                },
            },
            next: {
                [`& ${LevelsSliderNavButtonIcon}`]: {
                    transform: 'rotate(0deg)',
                },
            },
        },
    },
});

export const Level = styled('div', {
    textAlign: 'center',
    margin: '0 1rem',
});

export const Title = styled('div', {
    fontFamily: 'var(--font-pro-display)',
    fontSize: '1.5rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '0.75rem',
    color: 'white',
});

export const Description = styled('div', {
    fontFamily: 'var(--font-pro-display)',
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '1rem',
    textAlign: 'center',
    color: '#67718C',
});