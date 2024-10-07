import { styled } from '@app/stitches.config';

export const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '32px',
});

export const Title = styled('div', {
  fontFamily: 'var(--font-mono)',
  fontSize: '24px',
  fontWeight: '600',
  color: '#fff',
});
