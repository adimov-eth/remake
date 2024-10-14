import { styled } from '@app/stitches.config';

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
    size: {
      sm: {
        '&::before': {
          filter: 'blur(1.5rem)',
        },
      },
      md: {
        '&::before': {
          filter: 'blur(2.5rem)',
        },
      },
      lg: {
        '&::before': {
          filter: 'blur(4.625rem)',
        },
      },
    },
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
  }
});

export const BlurBackdropContent = styled('div', {
  position: 'relative',
  zIndex: 1,
});
