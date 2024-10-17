import { styled } from '@/app/stitches.config';

export const InputRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgba(43, 46, 69, 0.5)',
  padding: '1rem',
  borderRadius: '0.5rem',
  width: '100%',
  marginBottom: '0.625rem',
});

export const Label = styled('span', {
  color: '#9ca3af',
  fontSize: '1rem',
  marginBottom: '0.5rem',
});

export const InputContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const Input = styled('input', {
  width: '60%',
  textAlign: 'left',
  background: 'none',
  border: 'none',
  color: '#fff',
  fontSize: '1.5rem',
  marginRight: '0.5rem',

  '&::placeholder': {
    color: '#9ca3af',
  },

  '&:focus': {
    outline: 'none',
  },
});

export const CurrencyBlock = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});
