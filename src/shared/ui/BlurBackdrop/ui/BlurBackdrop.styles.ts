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
          backgroundColor: 'rgba(193, 69, 152, 1)',
        },
      },
      purple: {
        '&::before': {
          backgroundColor: 'rgba(101, 86, 208, 1)',
        },
      },
      brown: {
        '&::before': {
          backgroundColor: 'rgba(159, 33, 0, 1)',
        },
      },
      red: {
        '&::before': {
          backgroundColor: 'rgba(210, 49, 40, 1)',
        },
      },
      white: {
        '&::before': {
          backgroundColor: 'rgba(255, 255, 255, 1)',
        },
      },
      blue: {
        '&::before': {
          backgroundColor: 'rgba(73, 114, 226, 1)',
        },
      },
      orange: {
        '&::before': {
          backgroundColor: 'rgba(205, 125, 207, 1)',
        },
      },
      black: {
        '&::before': {
          backgroundColor: 'rgba(0, 0, 0, 1)',
        },
      },
    },
  }
});

export const BlurBackdropContent = styled('div', {
  position: 'relative',
  zIndex: 1,
});
