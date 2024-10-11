import { styled } from '@/app/stitches.config';

export const Category = styled('div', {
  '& + &': {
    marginTop: '1rem',
  }
});

export const CategoryTitle = styled('h2', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '1rem',
  fontWeight: '600',
  letterSpacing: '2%',
  color: '#fff',
  paddingBottom: '0.625rem',
});

export const List = styled('ul', {
  display: 'grid',
  width: '100%',
  gap: '0.625rem',
});

export const ListItem = styled('li', {
  display: 'flex',
  flexDirection: 'column',
});