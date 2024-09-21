import { styled } from '@app/stitches.config';

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const Icon = styled('div', {
  background: '#1C1F30',
  width: '112px',
  height: '112px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '16px',
  marginBottom: '40px',

  '& svg': {
    width: '70px',
    height: '70px',
  },
});

export const Title = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '28px',
  fontWeight: 600,
  textAlign: 'center',
  color: 'white',
  marginBottom: '30px',
});

export const Description = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '15px',
  lineHeight: '20px',
  textAlign: 'center',
  color: '#95A2C5',
  marginBottom: '40px',
});

export const Reward = styled('div', {
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
  marginBottom: '40px',
});

export const Currency = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  '& svg': {
    width: '40px',
    height: '40px',
  },
});

export const Value = styled('div', {
  fontFamily: 'var(--font-mono)',
  fontSize: '28px',
  color: 'white',
  fontWeight: 600,
});

export const Button = styled('button', {
  background: 'linear-gradient(88.72deg, #264DD0 0%, #5931AE 102.05%)',
  height: '54px',
  border: 'none',
  width: '100%',
  borderRadius: '14px',
  fontFamily: 'var(--font-pro-display)',
  fontSize: '14px',
  fontWeight: 600,
  color: 'white',

  '&:disabled': {
    opacity: 0.6,
  },
});