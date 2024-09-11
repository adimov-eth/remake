import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stories from './stories-react/index';
import './stories-react/styles.module.css';
import { useTranslation } from 'react-i18next';
import {
  $storieIndex,
  $subscribeButton,
  $subscribed,
  $isNew,
  TSubscribeButtonState,
} from '@/stores/state';

import { queryClient } from '@/services/api/queryClient';

import { useStore } from '@nanostores/react';
import { createStory } from './BaseStory';
import { JoinCommunityStory, Join } from './JoinCommunity';
import { getStories } from './storyData';
import { Root } from './StyledComponents';
import { initUtils } from '@telegram-apps/sdk-react';

import bg6 from '@/assets/stories/bg6.jpg';
import { useGetUserData } from '@/services/api/user/model';
import { initDataRaw } from '@/stores/telegram';

const OnboardingStories: React.FC = () => {
  const navigate = useNavigate();

  const index = useStore($storieIndex);
  const rawData = initDataRaw || '';
  const { data: userResponseData } = useGetUserData({
    enabled: !!rawData,
    variables: { rawData },
  });

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


  useEffect(() => {
    if (buttonState === 'loading') {
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ['get/userData'] }, { cancelRefetch: false }).then(() => {
          console.log('refetch done');
          if (userResponseData && userResponseData.user && userResponseData.user.can_play) {
            $subscribeButton.set('clicked');
            $subscribed.set(true);
            $isNew.set(false);
            navigate('/');
          } else {
            if ($isNew.get()) {
              $subscribeButton.set('button');
            } else {
              $subscribeButton.set('button');
              $subscribeButton.set('loading');
            }
            $subscribed.set(false);
          }
        })
      }, 8000);
    }
  }, [buttonState]);

  const handleSubscribeButton = async () => {
    if (buttonState === 'button') {
      utils.openTelegramLink('https://t.me/tonstarsdao');
      $subscribeButton.set('loading');
    } else {
      if ($subscribed.get()) {
        console.log('loading click', $subscribed.get());
        navigate('/');
      } else {
        $subscribeButton.set('button');
      }
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
