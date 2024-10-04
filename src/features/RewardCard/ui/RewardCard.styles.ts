import { styled } from '@app/stitches.config';
import bg from '@shared/assets/reward-bg.svg';

export const Root = styled('button', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem',
  borderRadius: '1rem',
  background: 'rgba(20, 21, 30, 1)',
  textAlign: 'center',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.875rem',
  fontWeight: '600',
  color: '#fff',
  border: 'none',
  height: '6.75rem',
  '&:disabled': {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  '&:last-child': {
    background: 'radial-gradient(64.81% 64.81% at 50% 50%, #121e45 0%, #5634cb 100%)',
    boxShadow: '0px 0px 8px 0px #473bbb',
    '&:before': {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '1rem',
      backgroundImage: `url(${bg})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      pointerEvents: 'none',
    },
  },
  variants: {
    progressStatus: {
      claimed_reward: {
        opacity: 0.4,
      },
      complete: {
        position: 'relative',
        background: '#14151e',
        '&::before': {
          content: '',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '1rem',
          padding: '0.1875rem',
          background: 'linear-gradient(88.72deg, #264dd0 0%, #5931ae 102.05%)',
          '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          '-webkit-mask-composite': 'xor',
          'mask-composite': 'exclude',
        },
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
