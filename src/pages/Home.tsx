import React from 'react';
import { styled } from '@stitches/react';

const HomeContainer = styled('div', {
  padding: '20px',
});

const Title = styled('h1', {
  fontFamily: 'var(--font-pro)',
  fontSize: '24px',
  fontWeight: 590,
  color: '#FFFFFF',
  marginBottom: '20px',
});

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Title>Welcome Home</Title>
      {/* Add more content here */}
    </HomeContainer>
  );
};

export default Home;
