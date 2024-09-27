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
    border: 'none',
    width: '100%',
    minWidth: '2.5rem',
    minHeight: '2.5rem',
    borderRadius: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    '&:disabled': {
      opacity: 0.8,
      cursor: 'not-allowed',
    },
    '&:active': {
      opacity: 0.9,
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
      variant: {
        gradientOutline: {
          color: '#1CE7FD',
          background: 'transparent',
          fontFamily: 'var(--font-pro-display)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '14px',
            padding: '3px',
            background: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          },
        },
        gradientFilled: {
          background: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
          color: 'white',
          fontFamily: 'var(--font-pro)',
        },
        purpleGradient: {
          background: 'linear-gradient(88.72deg, #264DD0 0%, #5931AE 102.05%)',
          color: 'white',
          fontFamily: 'var(--font-pro-display)',
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
        variant: 'gradientFilled',
        shine: true,
        css: {
          boxShadow: '0px 0px 15px 0px rgba(42, 158, 241, 1)',
        },
      },
    ],
  })
