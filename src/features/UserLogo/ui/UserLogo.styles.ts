import { styled } from '@stitches/react';

export const UserLogoRoot = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '8.25rem',
  height: '8.25rem',
  background: '#1C1F30',
  borderRadius: '2rem',
});

export const UserLogoWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const UserLogoIcon = styled('div', {
  width: '4rem',
  height: '4rem',
});

export const UserLogoUsername = styled('span', {
  fontWeight: 500,
  textAlign: 'center',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  display: 'inline-block',
  width: 'fit-content',
  textOverflow: 'ellipsis',
  fontSize: '0.875rem',
  color: 'white',
  marginTop: '0.75rem',
});
