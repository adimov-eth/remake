import { styled } from '@/app/stitches.config';

export const ConfirmContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
});

export const ConfirmTitle = styled('div', {
  textAlign: 'center',
  leadingTrim: 'both',
  textEdge: 'cap',
  fontSize: '1.5rem',
  fontWeight: 700,
  lineHeight: '1.875rem',
  color: '#fff'
});

export const ConfirmDescription = styled('div', {
  color: '#95A2C5',
  textAlign: 'center',
  leadingTrim: 'both',
  textEdge: 'cap',
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  marginTop: '1rem'
});