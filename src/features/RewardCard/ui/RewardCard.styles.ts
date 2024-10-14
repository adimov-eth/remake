import { styled } from '@app/stitches.config';
import bg from '@shared/assets/reward-bg.svg';

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 0.5rem',
  borderRadius: '1rem',
  background: 'rgba(20, 21, 30, 1)',
  height: '6.75rem',
});

export const Root = styled('button', {
  position: 'relative',
  padding: '0.1875rem',
  textAlign: 'center',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.875rem',
  fontWeight: '600',
  lineHeight: '1',
  color: '#fff',
  border: 'none',
  borderRadius: '1rem',
  background: 'rgba(20, 21, 30, 1)',
  width: '100%',
  variants: {
    complete: {
      true: {
        background: 'linear-gradient(88.72deg, #264dd0 0%, #5931ae 102.05%)',
      }
    },
    special: {
      true: {
        background: 'radial-gradient(64.81% 64.81% at 50% 50%, #121e45 0%, #5634cb 100%)',
        boxShadow: '0px 0px 8px 0px #473bbb',
        [`& ${Content}`]: {
          background: `url(${bg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'center, cover',
          backgroundPosition: 'center, center',
        }
      }
    },
    disabled: {
      true: {
        opacity: '0.4',
        cursor: 'not-allowed',
      },
    },
  },
});

export const Value = styled('div', {
  textTransform: 'uppercase',
});

export const Icon = styled('div', {
  margin: '0.375rem 0',
  variants: {
    size: {
      small: {
        width: '1rem',
        height: '1rem',
      },
      medium: {
        width: '1.5rem',
        height: '1.5rem',
      },
      large: {
        width: '2.5rem',
        height: '2.5rem',
      },
    },
  },
});
