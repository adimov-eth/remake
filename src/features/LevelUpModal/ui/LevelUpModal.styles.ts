import { styled } from '@app/stitches.config';

export const ConfirmContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

export const ConfirmImgWrapper = styled('div', {
  position: 'relative',
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  width: '10rem',
  height: '10rem',
});

export const ConfirmImg = styled('img', {
  display: 'block',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
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