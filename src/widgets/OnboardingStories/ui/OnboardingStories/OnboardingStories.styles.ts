import { styled } from '@/app/stitches.config';

export const Root = styled('div', {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  '& video': {
    width: '100%',
    height: '100%',
  },
});
