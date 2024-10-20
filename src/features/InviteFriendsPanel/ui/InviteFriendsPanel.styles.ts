import { styled } from '@app/stitches.config';

export const Root = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr min-content',
  gap: '1rem',
});

export const ButtonIcon = styled('div', {
  width: '1.25rem',
  height: '1.25rem',
  marginRight: '0.25rem',
});

export const Icon = styled('div', {
  width: '1.5rem',
  height: '1.5rem',
});
