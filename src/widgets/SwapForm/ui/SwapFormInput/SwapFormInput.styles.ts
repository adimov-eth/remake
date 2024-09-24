import { styled } from '@/app/stitches.config';

export const InputRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgba(43, 46, 69, 0.5)',
  padding: '16px',
  borderRadius: '8px',
  width: '100%',
  marginBottom: '10px',
});

export const Label = styled('span', {
  color: '#9ca3af',
  fontSize: '16px',
  marginBottom: '8px',
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
  fontSize: '24px',
  marginRight: '8px',

  '&::placeholder': {
    color: '#9ca3af',
  },

  '&:focus': {
    outline: 'none',
  },
});

export const MaxButton = styled('button', {
  backgroundColor: '#365ae5',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '4px 12px',
  cursor: 'pointer',
  fontSize: '14px',
  marginRight: '8px',
});

export const CurrencyBlock = styled('div', {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(43, 46, 69, 0.7)',
  padding: '4px 14px 4px 8px',
  borderRadius: '9999px',
  maxWidth: '30%',
  width: 'max-content',

  '& span': {
    color: 'white',
  },
});

export const IconWrapper = styled('span', {
  marginRight: '4px',
  width: '24px',
  height: '24px',
});
