import { styled } from '@app/stitches.config';

export const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: '1.875rem',
  height: '100%',
  maxWidth: '18.75rem',
  margin: '0 auto',
});

export const TopArea = styled('div', {
  width: '100%',
  marginBottom: '1.25rem',
});

export const MiddleArea = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  maxHeight: '18.75rem',
  width: '100%',
  // backgroundColor: 'green',
});

export const BottomArea = styled('div', {
  marginTop: '1.25rem',
});

export const TouchArea = styled('div', {
  height: '100%',
  aspectRatio: '1/1',
  cursor: 'pointer',
  // backgroundColor: 'blue',
});