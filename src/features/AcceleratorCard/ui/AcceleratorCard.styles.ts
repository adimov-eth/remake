import { styled } from '@app/stitches.config';

export const Card = styled('button', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '1rem',
  backgroundColor: 'rgba(20, 21, 30, 1)',
  borderRadius: '1rem',
  border: 'none',
  '&:disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },
});

export const Icon = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3rem',
  height: '3rem',
  padding: '0.5rem',
  borderRadius: '1rem',
  background: 'rgba(37, 40, 59, 1)',
  color: '#fff',
});

export const Content = styled('div', {
  display: 'grid',
  marginTop: '0.625rem',
  textAlign: 'center',
});

export const Title = styled('div', {
  fontSize: '1rem',
  fontWeight: 600,
  color: '#fff',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});

export const Description = styled('div', {
  fontSize: '0.875rem',
  fontWeight: 400,
  color: 'rgba(103, 113, 140, 1)',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  marginTop: '0.625rem',
  paddingBottom: '1.25rem',
  marginBottom: '0.5rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.11)',
});

export const Price = styled('div', {
  margin: '0 auto',
});

export const ConfirmContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ConfirmImg = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.625rem',
});

export const ConfirmTitle = styled('span', {
  display: 'inlie-block',
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#fff',
  marginTop: '0.625rem',
  textAlign: 'center',
});

export const ConfirmDescription = styled('span', {
  display: 'inlie-block',
  fontSize: '1rem',
  fontWeight: 400,
  color: 'rgba(149, 162, 197, 1)',
  marginTop: '1rem',
  textAlign: 'center',
});

export const ConfirmFooter = styled('div', {
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  textAlign: 'center',
  paddingTop: '1rem',
  marginTop: '1rem',
  color: '#fff',
  borderTop: '1px solid rgba(255, 255, 255, 0.11)',
});