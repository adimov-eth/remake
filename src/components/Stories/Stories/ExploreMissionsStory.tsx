import React from 'react';
import { useTranslation } from 'react-i18next';

import { StoryContentProps } from '../StoryTypes';

// import { styled } from '@/core/stitches.config';
import { StoryContainer, Content, Title, Description, Button } from './BaseStory';

type ExploreMissionsStoryProps = Omit<StoryContentProps, 'story'>;

export const ExploreMissionsStory: React.FC<ExploreMissionsStoryProps> = ({ action, languageCode }) => {
  const { t } = useTranslation('onboarding', { useSuspense: false, lng: languageCode });

  const title = t('exploreMissions.title', 'Explore Missions');
  const description = t('exploreMissions.description', 'Complete missions and discover exciting new ways to earn Quarks. Each mission brings you closer to finding the universe\'s greatest secret!');
  const buttonText = t('exploreMissions.nextButton', 'Next');

  return (
    <StoryContainer>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Button onClick={() => action('next')}>
          {buttonText}
        </Button>
      </Content>
    </StoryContainer>
  );
};