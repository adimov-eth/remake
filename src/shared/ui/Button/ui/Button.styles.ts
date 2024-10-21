import { styled, keyframes } from '@/app/stitches.config';

const pulse = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});

export const Button = styled('button', {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '2.5rem',
  minHeight: '2.5rem',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '0.875rem',
  '&:active': { filter: 'brightness(0.9)' },
  '&:disabled': {
    background: 'rgba(68, 79, 106, 1)',
    color: 'rgba(138, 150, 180, 1)',
    cursor: 'not-allowed',
    '&::before': {
      background: 'none',
    }
  },
  variants: {
    loading: { true: { animation: `${pulse} 1.5s ease-in-out infinite` } },
    shine: { true: {} },
    wide: { true: { width: '100%' } },
    outline: {
      true: { 
        background: 'transparent',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          borderRadius: 'inherit',
          padding: '0.125rem',
          zIndex: 0,
        },
      } 
    },
    rounded: {
      sm: { borderRadius: '0.5rem' },
      md: { borderRadius: '0.875rem' },
      lg: { borderRadius: '1.25rem' },
      full: { borderRadius: '9999px' },
    },
    variant: {
      primary: {
        background: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
        color: '#fff',
      },
      secondary: {
        background: '#282A3A',
        color: '#fff',
      },
      danger: {
        background: 'linear-gradient(88.7deg, #E76464 0%, #DD2E2E 100%)',
        color: '#fff',
      },
      ghost: {
        background: 'transparent',
        color: '#fff',
        borderColor: '#4E567E'
      },
    },
    size: {
      small: {
        fontSize: '0.875rem',
        fontWeight: 500,
        padding: '0.5rem',
      },
      medium: {
        fontSize: '0.875rem',
        fontWeight: 500,
        padding: '0.625rem',
      },
      large: {
        fontSize: '1rem',
        fontWeight: 600,
        padding: '0.75rem',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      shine: true,
      css: {
        boxShadow: '0px 0px 15px 0px rgba(42, 158, 241, 1)',
      },
    },
    {
      variant: 'primary',
      outline: true,
      css: {
        color: '#1CE7FD',
        background: 'transparent',
        '&::before': {
          background: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%) padding-box',
          mask: 'conic-gradient(#000 0 0) content-box exclude,conic-gradient(#000 0 0)',
          WebkitMask: 'conic-gradient(#000 0 0) content-box exclude,conic-gradient(#000 0 0)',
        },
      },
    },
    {
      variant: 'secondary',
      outline: true,
      css: {
        color: '#fff',
        background: 'transparent',
        '&:before': {
          background: '#282A3A',
          WebkitMask: 'none',
          maskComposite: 'exclude',
        }
      },
    },
  ],
});

export const ButtonContent = styled('span', {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
});
