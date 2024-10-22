import { styled } from '@app/stitches.config';

export const Root = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '0.75rem',
  width: '100%',
});

export const Card = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem',
  borderRadius: '1rem',
  background: 'rgba(20, 21, 30, 0.5)',
  textAlign: 'center',
});

export const CardIcon = styled('img', {
  display: 'inline-block',
  width: '2.5rem',
  height: '2.5rem',
});

export const CardValue = styled('span', {
  display: 'block',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#fff',
  marginTop: '0.625rem',
  marginBottom: '0.75rem',
});

export const CardTitle = styled('span', {
  display: 'inline-block',
  fontSize: '0.875rem',
  color: 'rgba(103, 113, 140, 1)',
});

export const CardLink = styled('a', {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  opacity: 0,
  display: 'block',
  width: '100%',
  height: '100%',
});
