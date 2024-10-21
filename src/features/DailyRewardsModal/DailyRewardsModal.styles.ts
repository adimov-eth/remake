import { styled } from '@app/stitches.config';

export const Root = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

export const Title = styled('div', {
  fontSize: '1.75rem',
  fontWeight: '600',
  textAlign: 'center',
  color: '#fff',
  marginBottom: '1.5rem',
});

export const Description = styled('div', {
  fontSize: '1rem',
  textAlign: 'center',
  color: '#95A2C5',
  marginBottom: '1.875rem',
});

export const List = styled('ul', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '0.625rem',
  overflowY: 'auto',
  marginBottom: '1.875rem',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  '& > *:nth-last-child(2)': {
    gridColumnStart: 2,
  },

  '& > *:last-child': {
    gridColumnStart: 3,
  },
});

export const ListItem = styled('li', {

});

export const BottomArea = styled('div', {
  paddingTop: '1.875rem',
  width: '100%',
  position: 'sticky',
  bottom: 0,
  zIndex: 1,
});