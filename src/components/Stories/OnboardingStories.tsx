import React from 'react';
import { useNavigate } from 'react-router-dom';
import Stories from './stories-react/index';
import 'stories-react/dist/index.css';
import { useTranslation } from 'react-i18next';
import {
  $storieIndex,
  $subscribeButton,
  $subscribed,
  $isNew,
  TSubscribeButtonState,
} from '@/stores/state';
import { useStore } from '@nanostores/react';
import { createStory } from './BaseStory';
import { JoinCommunityStory, Join } from './JoinCommunity';
import { getStories } from './storyData';
import { Root } from './StyledComponents';
import { initUtils } from '@telegram-apps/sdk-react';

import bg6 from '@/assets/stories/bg6.jpg';

const OnboardingStories: React.FC = () => {
  const navigate = useNavigate();

  const index = useStore($storieIndex);

  const { t } = useTranslation('stories');

  const handleNext = () => {
    if (index === stories.length) {
      return;
    } else {
      $storieIndex.set(index + 1);
    }
  };

  const handleStoryChange = (index: number) => {
    $storieIndex.set(index);
  };

  const stories = getStories();

  const storyComponents = stories.map(story =>
    createStory({
      ...story,
      next: handleNext,
      children: story.childrenComponent,
    })
  );

  const buttonState = useStore($subscribeButton) as TSubscribeButtonState;
  const utils = initUtils();

  const handleSubscribeButton = () => {
    if (buttonState === 'button') {
      utils.openTelegramLink('https://t.me/tonstarsdao');
      $subscribeButton.set('clicked');
    } else if (buttonState === 'clicked') {
      if ($subscribed.get()) {
        $isNew.set(false);
        navigate('/');
        return;
      }

      $subscribeButton.set('loading');
      setTimeout(() => {
        $isNew.set(false);
        $subscribed.set(true);
        setTimeout(() => {
          navigate('/');
        }, 10);
      }, 1000);
    }
  };

  const buttonTexts = ['button', 'clicked', 'loading'].reduce((acc, state) => {
    acc[state as TSubscribeButtonState] = t('join.' + state);
    return acc;
  }, {} as Record<TSubscribeButtonState, string>);
  // Add the join community story
  storyComponents.push({
    url: bg6,
    type: 'image',
    duration: Infinity,
    header: <JoinCommunityStory title={t('join.title')} description={t('join.description')} />,
    seeMore: <Join buttonText={buttonTexts[buttonState as TSubscribeButtonState]} />,
    onSeeMoreClick: handleSubscribeButton,
  });

  return (
    <Root>
      <Stories
        currentIndex={index}
        width="100%"
        height="100%"
        stories={storyComponents}
        onStoryChange={handleStoryChange}
        // onAllStoriesEnd
      />
    </Root>
  );
};

export default OnboardingStories;
