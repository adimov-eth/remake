import { styled, keyframes } from '@/app/stitches.config'

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
  width: '100%',
  minWidth: '2.5rem',
  minHeight: '2.5rem',
  borderRadius: '0.875rem',
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    padding: '0.125rem',
    borderRadius: '0.875rem',
    background: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    zIndex: 0,
  },
  '&:disabled': {
    opacity: 0.8,
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
    variant: {
      primary: {
        background: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
        color: 'white',
        fontFamily: 'var(--font-pro)',
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
  ],
})

export const ButtonContent = styled('span', {
  position: 'relative',
  zIndex: 1,
})
