import { styled } from '@stitches/react';

export const ButtonsContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  });
  
export const ButtonWrapper = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '16px',
    backgroundColor: '#1C1F30',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    cursor: 'pointer',
  });

export const Icon = styled('svg', {
    width: '24px',
    height: '24px',
    '& path': {
      fill: '#fff',
    },
});