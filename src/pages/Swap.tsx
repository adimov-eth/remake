import React from 'react';
import { styled } from '@stitches/react';

const SwapContainer = styled('div', {
  padding: '20px',
});

const Title = styled('h1', {
  fontFamily: 'var(--font-pro)',
  fontSize: '24px',
  fontWeight: 590,
  color: '#FFFFFF',
  marginBottom: '20px',
});

const SwapForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const Input = styled('input', {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #FFFFFF',
  background: 'transparent',
  color: '#FFFFFF',
});

const Button = styled('button', {
  padding: '10px',
  borderRadius: '4px',
  border: 'none',
  background: '#4CAF50',
  color: '#FFFFFF',
  cursor: 'pointer',
  '&:hover': {
    background: '#45a049',
  },
});

const Swap: React.FC = () => {
  return (
    <SwapContainer>
      <Title>Swap Tokens</Title>
      <SwapForm>
        <Input type="text" placeholder="From Token" />
        <Input type="text" placeholder="To Token" />
        <Input type="number" placeholder="Amount" />
        <Button type="submit">Swap</Button>
      </SwapForm>
    </SwapContainer>
  );
};

export default Swap;
