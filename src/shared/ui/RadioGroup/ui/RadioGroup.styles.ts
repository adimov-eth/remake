import { styled } from '@app/stitches.config';

export const RadioGroup = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const RadioGroupOption = styled('div', {
  '&:first-child': {
    borderTopLeftRadius: '0.5rem',
    borderBottomLeftRadius: '0.5rem',
  },
  '&:last-child': {
    borderTopRightRadius: '0.5rem',
    borderBottomRightRadius: '0.5rem',
  },
});

export const RadioInput = styled('input', {
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
});

export const RadioLabel = styled('label', {
  display: 'block',
  fontFamily: 'var(--font-pro-display)',
  fontWeight: '600',
  fontSize: '1rem',
  lineHeight: '1',
  padding: '0.5rem 0.625rem',
  transition: 'all 0.3s',
  cursor: 'pointer',
  background: 'rgba(37, 39, 56, 1)',
  color: '#fff',
  borderRadius: 'inherit',
});
