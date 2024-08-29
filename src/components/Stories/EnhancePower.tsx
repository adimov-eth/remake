import React from 'react';
import { useTranslation } from 'react-i18next';
import { $locale } from '@/stores/state';
type EnhancePowerStoryProps = Omit<StoryContentProps, 'story'>;
import { styled } from '@/core/stitches.config';
import { StoryContainer, Content, Title, Description, Button, AdditionalDescription, StoryContentProps } from './BaseStory';

export const EnhancePowerStory: React.FC<EnhancePowerStoryProps> = ({ action }) => {
  const { t } = useTranslation('onboarding', { useSuspense: false, lng: $locale.get() });

  const title = t('enhancePower.title', 'Enhance Your Power with Boosters');
  const description = t('enhancePower.description', 'Boost your gameplay by spending Quarks on upgrades that enhance your click power, energy capacity, and more. Choose wisely, as not all boosters will benefit you equally.');
  const additionalDescription = t('enhancePower.additionalDescription', 'These enhancements will help you earn more Quarks in the long run, allowing you to progress faster and achieve greater rewards in TON Stars.');
  const buttonText = t('enhancePower.nextButton', 'Next');

  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <AdditionalDescription>{additionalDescription}</AdditionalDescription>
        <Button onClick={() => action('next')}>
          {buttonText}
        </Button>
      </Content>
    </Container>
  );
};

const Container = styled(StoryContainer, {
  backgroundColor: 'rgba(11, 12, 20, 0.25)',
})
