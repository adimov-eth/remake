import { styled } from '@app/stitches.config';

export const TopArea = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

export const BackButton = styled('div', {
  position: 'absolute',
  left: 0,
});

export const BackIcon = styled('div', {
  width: '1.5rem',
  height: '1.5rem',
  color: '#fff',
  transform: 'rotate(180deg)',
});

export const Title = styled('h1', {
  fontWeight: '500',
  fontSize: '1.25rem',
});

export const Root = styled('div', {
  color: '#fff',
  '& > * + *': {
    marginTop: '1rem',
  },
});

export const Card = styled('div', {
  padding: '1.25rem',
  background: 'rgba(20, 21, 30, 1)',
  borderRadius: '1rem',
  '> * + *': {
    marginTop: '1.25rem',
  }
});

export const CardItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const Label = styled('span', {
  fontWeight: '500',
  fontSize: '1rem',
});