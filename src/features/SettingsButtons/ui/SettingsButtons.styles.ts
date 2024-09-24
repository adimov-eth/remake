import { styled } from '@stitches/react';

export const Root = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  });
  
export const Button = styled('button', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '2.5rem',
    minHeight: '2.5rem',
    padding: '0.5rem',
    borderRadius: '1rem',
    backgroundColor: '#1C1F30',
    // backdropFilter: 'blur(1.5rem)',
    // WebkitBackdropFilter: 'blur(1.5rem)',
    cursor: 'pointer',
    border: 'none',
  });

export const Icon = styled('svg', {
    width: '1.5rem',
    height: '1.5rem',
    color: '#fff',
});