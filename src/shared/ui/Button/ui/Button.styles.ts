import { styled, keyframes } from '@/app/stitches.config';

const pulse = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});

export const Button = styled('button', {
  '--before-bg': 'none',
  '--before-mask': 'none',
  '--rounded': '0.875rem',

  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minWidth: '2.5rem',
  minHeight: '2.5rem',
  fontFamily: 'var(--font-pro)',
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  borderRadius: 'var(--rounded)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    padding: '0.125rem',
    borderRadius: 'var(--rounded)',
    background: 'var(--before-bg)',
    WebkitMask: 'var(--before-mask)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    zIndex: 0,
  },
  '&:disabled': {
    '--before-bg': 'none',
    '--before-mask': 'none',
    background: 'rgba(68, 79, 106, 1)',
    color: 'rgba(138, 150, 180, 1)',
    cursor: 'not-allowed',
  },
  '&:active': {
    filter: 'brightness(0.9)',
  },
  variants: {
    loading: {
      true: {
        animation: `${pulse} 1.5s ease-in-out infinite`,
      },
      false: {},
    },
    shine: {
      true: {},
      false: {},
    },
    outline: {
      true: {
        background: 'transparent',
      },
      false: {},
    },
    rounded: {
      sm: {},
      md: {
        '--rounded': '0.875rem',
      },
      lg: {},
      full: {
        '--rounded': '9999px',
      },
    },
    variant: {
      primary: {
        '--before-bg': 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
        '--before-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',

        background: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
        color: '#fff',
      },
      secondary: {
        '--before-bg': '#282A3A',
        '--before-mask': 'none',

        background: '#282A3A',
        color: '#fff',
      },
      danger: {
        background: 'rgba(181, 58, 58, 1)',
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
        fontSize: '1rem',
        padding: '0.5rem',
      },
      medium: {
        fontSize: '1.25rem',
        padding: '0.625rem',
      },
      large: {
        fontSize: '1.5rem',
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
      },
    },
    {
      variant: 'secondary',
      outline: true,
      css: {
        color: '#fff',
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
