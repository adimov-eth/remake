import React from 'react';
import { useTranslation } from 'react-i18next';

type JoinCommunityStoryProps = Omit<StoryContentProps, 'story'>;

import { StoryContainer, Title, Content, Button, Description,StoryContentProps } from './BaseStory';

export const JoinCommunityStory: React.FC<JoinCommunityStoryProps> = ({ action, languageCode }) => {
  const { t } = useTranslation('onboarding', { useSuspense: false, lng: languageCode });

  const title = t('joinCommunity.title', 'Join the TON Stars Community Now!');
  const description = t('joinCommunity.description', 'Don\'t forget to follow our Telegram Channel and Invite friends to join TON Stars. As more people join, Star values increase, unlocking new partnerships and features');
  const buttonText = t('joinCommunity.buttonText', 'Follow the Telegram Channel');

  return (
    <StoryContainer>
      <Content>
        <JoinTitle>{title}</JoinTitle>
        <Description>{description}</Description >
        <JoinButton onClick={() => action('next')}>
          <ButtonIcon />
          <span>{buttonText}</span>
        </JoinButton>
      </Content>
    </StoryContainer>
  );
};


import { styled } from '@/core/stitches.config';
import telegram from '@/assets/stories/tg.svg';

const JoinTitle = styled(Title, {
  fontSize: '2.2rem',
  lineHeight: 1.2,
});

const JoinButton = styled(Button, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ButtonIcon = styled('div', {
  width: '19px',
  height: '16px',
  backgroundImage: `url(${telegram})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  marginRight: '10px',
});