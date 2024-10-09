import { styled } from '@app/stitches.config';

export const ErrorDisplay = styled('div', {
  padding: '1rem',
  color: '#fff',
  background: '#971313',
  borderBottomLeftRadius: '0.5rem',
  borderBottomRightRadius: '0.5rem',
  fontSize: '1rem',
  fontWeight: 'bold',
});

export const ErrorDisplayTitle = styled('h2', {
  display: 'inline-block',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  margin: '0 0 0.5rem 0',
});

export const ErrorDisplayMessage = styled('div', {
  fontSize: '1rem',
  fontWeight: 'normal',
});