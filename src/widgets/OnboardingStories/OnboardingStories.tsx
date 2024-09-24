import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stories from './stories-react/index';
import './stories-react/styles.module.css';
import { useTranslation } from 'react-i18next';
import {
  $storieIndex,
  $subscribeButton,
  $subscribed,
  TSubscribeButtonState,
  $subCheckRetry,
} from '@app/stores/state';

import { queryClient } from '@shared/services/api/queryClient';

import { useStore } from '@nanostores/react';
import { createStory } from './BaseStory';
import { JoinCommunityStory, Join } from './JoinCommunity';
import { getStories } from './storyData';
import { Root } from './StyledComponents';
import { initUtils } from '@telegram-apps/sdk-react';

import bg6 from '@shared/assets/stories/bg6.jpg';
import { useGetUserData } from '@shared/services/api/user/model';
import { initDataRaw } from '@app/stores/telegram';

export const OnboardingStories: React.FC = () => {
  const navigate = useNavigate();

  const index = useStore($storieIndex);
  const subCheckRetry = useStore($subCheckRetry);
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
            navigate('/');
          } else {
            $subscribeButton.set('button');
            $subscribed.set(false);
            if (subCheckRetry < 3) {
              $subCheckRetry.set(subCheckRetry + 1);
              setTimeout(() => {
                $subscribeButton.set('loading');
              }, 1000);
            }
          }
        })
      }, 3000);
    }
  }, [buttonState]);

  const handleSubscribeButton = async () => {
    if (buttonState === 'button') {
      utils.openTelegramLink('https://t.me/tonstarsdao');
      $subCheckRetry.set(0);
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