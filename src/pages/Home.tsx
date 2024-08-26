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

const Content = styled('p', {
  color: '#FFFFFF',
  fontSize: '16px',
  lineHeight: '1.5',
});

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Title>Welcome Home</Title>
      <Content>
        This is the home page of our application. Here you can find an overview of your account and quick access to other features.
      </Content>
    </HomeContainer>
  );
};

export default Home;