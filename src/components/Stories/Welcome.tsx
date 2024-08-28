import React from 'react';
import { useTranslation } from 'react-i18next';
// import { styled } from '@/core/stitches.config';
import { StoryContainer, Content, Title, Description, CTA, Button, StoryContentProps } from './BaseStory';

type WelcomeStoryProps = Omit<StoryContentProps, 'story'>;

export const WelcomeStory: React.FC<WelcomeStoryProps> = ({ action, languageCode }) => {
  const { t } = useTranslation('onboarding', { useSuspense: false, lng: languageCode });

  const title = t('welcome.title', 'Welcome to TON Stars');
  const description = t('welcome.description', 'Our game is built on Telegram and combines strategy with community gameplay. Earn rewards by making smart decisions and completing missions.');
  const buttonText = t('welcome.startButton', 'Start now!');
  const cta = 'Are you ready to get on the board?'
  return (
    <StoryContainer>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <CTA>{cta}</CTA>
        <Button onClick={() => action('next')}>
          {buttonText}
        </Button>
      </Content>
    </StoryContainer>
  );
};
