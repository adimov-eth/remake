import { styled } from '@/app/stitches.config';

export const ConfirmContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
});

export const ConfirmTitle = styled('div', {
  fontSize: '1.5rem',
  fontWeight: 700,
  lineHeight: '1.875rem',
  color: '#fff',
  marginTop: '0.625rem'
});

export const ConfirmDescription = styled('div', {
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  marginTop: '1rem',
  color: 'rgba(149, 164, 211, 1)'
});