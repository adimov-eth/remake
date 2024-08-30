import React from 'react';
import { StoryContainer, Content, Description, Title } from './BaseStory';
import { styled } from '@/core/stitches.config';
import { Button } from './BaseStory';
import telegram from '@/assets/stories/tg.svg';

const JoinTitle = styled(Title, {
  fontFamily: 'Tektur, sans-serif',
  fontWeight: 'bold',
  fontSize: '2rem',
  lineHeight: 1.2,
});


export const JoinButton = styled(Button, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ButtonIcon = styled('div', {
  width: '19px',
  height: '16px',
  backgroundImage: `url(${telegram})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  marginRight: '10px',
});

export const Join = ({buttonText}: {buttonText: string}) => (
  <JoinButton><ButtonIcon />{buttonText}</JoinButton>
)


export const JoinCommunityStory: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  
  return (
    <StoryContainer>
      <Content>
        <JoinTitle>{title}</JoinTitle>
        <Description>{description}</Description>
      </Content>
    </StoryContainer>
  );
};

