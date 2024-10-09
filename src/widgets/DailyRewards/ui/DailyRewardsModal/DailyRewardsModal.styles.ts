import { styled } from '@app/stitches.config';

export const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

export const Title = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '28px',
  fontWeight: '600',
  textAlign: 'center',
  color: '#fff',
  marginBottom: '30px',
});

export const Description = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '15px',
  textAlign: 'center',
  color: '#95A2C5',
  marginBottom: '32px',
});

export const Rewards = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '0.625rem',
  overflowY: 'auto',
  marginBottom: '1.875rem',
  '& > *:nth-last-child(2)': {
    gridColumnStart: 2,
  },

  '& > *:last-child': {
    gridColumnStart: 3,
  },
});