import { styled } from '@app/stitches.config';

export const Root = styled('div', {
});

export const Input = styled('input', {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',

  '&:checked + *': {
    background: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
  },

  '&:checked + *:before': {
    transform: 'translateX(calc(100% - 0.25rem))',
  },
});

export const Label = styled('label', {
  display: 'inline-block',
  cursor: 'pointer',
  width: '3.25rem',
  height: '2rem',
  backgroundColor: 'rgba(37, 39, 56, 1)',
  borderRadius: '1rem',
  position: 'relative',
  transition: 'background-color 0.2s',

  '&:before': {
    content: '""',
    position: 'absolute',
    width: '1.5rem',
    height: '1.5rem',
    left: '0.25rem',
    bottom: '0.25rem',
    backgroundColor: 'white',
    borderRadius: '9999px',
    transition: 'transform 0.2s',
  },
});
