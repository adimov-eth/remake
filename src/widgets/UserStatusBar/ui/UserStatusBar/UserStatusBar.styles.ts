import { styled } from '@stitches/react';

export const Root = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  padding: '1rem',
  width: '100%',
  backgroundColor: 'rgba(5, 6, 10, 0.30)',
  backdropFilter: 'blur(10px)',
  maxWidth: '30rem',
  margin: '0 auto',
});