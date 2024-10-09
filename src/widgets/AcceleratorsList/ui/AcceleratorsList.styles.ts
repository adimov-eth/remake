import { styled } from '@app/stitches.config';

export const AcceleratorsList = styled('ul', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  columnGap: '0.75rem',
  rowGap: '1rem',
});

export const AcceleratorsListItem = styled('li', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});
