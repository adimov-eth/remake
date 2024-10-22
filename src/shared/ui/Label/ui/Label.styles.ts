import { styled } from '@app/stitches.config';

export const Root = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  borderRadius: '0.75rem',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '#fff',
  whiteSpace: 'nowrap',
  border: 'none',
  variants: {
    variant: {
      primary: {
        background: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
      },
      secondary: {
        backgroundColor: 'rgba(37, 40, 59, 1)',
      },
      ghost: {
        backgroundColor: 'transparent',
      }
    },
    size: {
      small: {
        padding: '0.5rem 0.625rem',
      },
      medium: {
        padding: '0.5rem 0.625rem',
      },
      large: {
        padding: '0.5rem 0.75rem',
      }
    }
  }
});
