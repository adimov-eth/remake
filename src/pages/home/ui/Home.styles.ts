import { styled } from '@app/stitches.config';

export const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  '& > * + *': {
    marginTop: '1rem',
  },
});
