import { styled } from '@app/stitches.config';

export const Root = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0.5rem 1rem',
  border: '2px solid rgba(43, 19, 65, 1)',
  borderRadius: '1rem',
  dropShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  zIndex: 1,

  '& > * + *': {
    marginLeft: '0.75rem',
  },
});

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  '& > * + *': {
    marginTop: '0.5rem',
  },
});

export const Title = styled('h3', {
  fontSize: '0.75rem',
  fontWeight: '600',
  lineHeight: '1rem',
  color: 'rgba(223, 23, 167, 1)',
  textTransform: 'uppercase',
});

export const Description = styled('p', {
  fontSize: '1.125rem',
  fontWeight: '600',
  color: 'rgba(255, 255, 255, 1)',
});
