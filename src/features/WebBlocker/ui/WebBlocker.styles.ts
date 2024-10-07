import { styled } from '@stitches/react';

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
});
  
export const Text = styled('div', {
    margin: '20px 0',
    fontSize: '18px',
    color: '#333',
});
  
export const QRCodeLink = styled('a', {
    textDecoration: 'none',
  });
  
export const QRCode = styled('div', {
    width: '200px',
    height: '200px',
});