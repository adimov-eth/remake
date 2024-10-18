import { styled } from '@app/stitches.config';

export const Content = styled('div', {
  width: '100%',
  // maxWidth: '15.625rem',
});

export const ButtonsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: '1.875rem',
  '& > * + *': {
    marginLeft: '1rem',
  },
});
