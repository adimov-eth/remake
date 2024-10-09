import { styled } from '@/app/stitches.config';

export const List = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const ListItem = styled('li', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
});