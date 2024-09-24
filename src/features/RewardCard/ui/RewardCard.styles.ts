import { styled } from '@app/stitches.config'

export const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '16px 0px',
  borderRadius: '16px',
  background: '#14151e',
  height: '108px',
  width: '82px',
  textAlign: 'center',
  '&:last-child': {
    background: 'radial-gradient(64.81% 64.81% at 50% 50%, #121e45 0%, #5634cb 100%)',
    boxShadow: '0px 0px 8px 0px #473bbb',
  },
  variants: {
    progressStatus: {
      claimed_reward: {
        opacity: 0.4,
      },
      complete: {
        position: 'relative',
        border: 'none',
        background: '#14151e',
        '&::before': {
          content: '',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '14px',
          padding: '3px',
          background: 'linear-gradient(88.72deg, #264dd0 0%, #5931ae 102.05%)',
          '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          '-webkit-mask-composite': 'xor',
          'mask-composite': 'exclude',
        },
      },
    },
  },
})

export const Title = styled('div', {
  fontFamily: 'var(--font-mono)',
  fontSize: '14px',
  fontWeight: '600',
  color: '#fff',
})

export const Icon = styled('div', {
  svg: {
    width: '24px',
    height: '24px',
  },
})

export const Value = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
  fontFamily: 'var(--font-mono)',
  fontSize: '14px',
  fontWeight: '600',
  color: '#fff',
})

export const BottomQuarkIcon = styled('div', {
  height: '12px',
  width: '12px',
  transform: 'scale(2.5)',
})
