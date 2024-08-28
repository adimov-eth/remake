import React from 'react';
import { useTranslation } from 'react-i18next';
import { StarIcon } from '@/assets/icons';
// import { styled } from '@/core/stitches.config';
import { StoryContainer, Content, Title, Description, Button, StoryContentProps } from './BaseStory';

type EarnQuarksStoryProps = Omit<StoryContentProps, 'story'>;

export const EarnQuarksStory: React.FC<EarnQuarksStoryProps> = ({ action, languageCode }) => {
  const { t } = useTranslation('onboarding', { useSuspense: false, lng: languageCode });

  const title = t('earnQuarks.title', 'Earn Quarks by Tapping');
  const description = t('earnQuarks.description', 'Tap to earn Quarks effortlessly. Keep tapping regularly to earn Quarks faster. Make it a fun routine and watch your Quarks turn into valuable Stars!');
  const buttonText = t('earnQuarks.nextButton', 'Next');

  return (
    <StoryContainer>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <StarIcons>
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </StarIcons>
        <Button onClick={() => action('next')}>
          {buttonText}
        </Button>
      </Content>
    </StoryContainer>
  );
};


import { styled } from '@/core/stitches.config';

const StarIcons = styled('div', {
  position: 'relative',
  width: '100%',
  height: '200px',
  marginTop: '2rem',

  '& > *': {
    position: 'absolute',
    width: '27px',
    height: '27px',
    borderRadius: '4px',
  },

  '& > :nth-child(1)': {
    left: '15%',
    top: '40%',
  },

  '& > :nth-child(2)': {
    right: '10%',
    top: '10%',
  },

  '& > :nth-child(3)': {
    left: '50%',
    bottom: '30%',
  },
});