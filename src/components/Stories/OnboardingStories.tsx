import bg2 from '@/assets/stories/bg2.jpg';
import bg3 from '@/assets/stories/bg3.jpg';
import bg6 from '@/assets/stories/bg6.jpg';
import { useNavigate } from 'react-router-dom'

import React from 'react';
import { useStore } from '@nanostores/react';
import Stories from 'stories-react';
// import { $onboardingStore, closeOnboarding } from '@/store/onboarding';
import 'stories-react/dist/index.css';

import { styled } from '@/core/stitches.config';


import { WelcomeStory } from './Welcome';
import { EarnQuarksStory } from './EarnQuarks';
import { ExploreMissionsStory } from './ExploreMissions';
import { EnhancePowerStory } from './EnhancePower';
import { SwapAndStakeStory } from './SwapAndStake';
import { JoinCommunityStory } from './JoinCommunity';
import { useGetUserData } from '@/services/api/user/model';

import { initDataRaw,user as $user } from '@/stores/telegram';
import { StoryContentProps } from './BaseStory';



// Import the video files
import videoMp4_1 from '@/assets/stories/on1.mp4';
import videoMp4_4 from '@/assets/stories/on4.mp4';
import videoMp4_5 from '@/assets/stories/on5.mp4';


const OnboardingStories: React.FC = () => {
  // const isShow = useStore($onboardingStore); 
  const navigate = useNavigate()
  const rawData = initDataRaw || ''
  const { data: userData, isLoading } = useGetUserData({
    enabled: !!rawData,
    variables: { rawData },
  })

  const User = useStore($user);

  const languageCode = User?.languageCode || 'en';

  const isShow = true;
  if (!isShow || !User || isLoading) return null;
  
  const { user } = userData || {};
  const stories = [
    {
      url: videoMp4_1,
      type: 'video',
      duration: 5000,
      header: (props: StoryContentProps) => (
        <WelcomeStory
          {...props}
          languageCode={languageCode}
          user={user}
        />
      ),
    },
    {
      type: 'image',
      duration: 5000,
      url: bg2,
      header: (props: StoryContentProps) => (
        <EarnQuarksStory
          {...props}
          languageCode={languageCode}
          user={user}
        />
      ),
    },
    {
      type: 'image',
      duration: 5000,
      url: bg3,
      header: (props: StoryContentProps) => (
        <ExploreMissionsStory
          {...props}
          languageCode={languageCode}
          user={user}
        />
      ),
    },
    {
      url: videoMp4_4,
      type: 'video',
      duration: 5000,
      header: (props: StoryContentProps) => (
        <EnhancePowerStory
          {...props}
          languageCode={languageCode}
          user={user}
        />
      ),
    },
    {
      url: videoMp4_5,
      type: 'video',
      duration: 5000,
      header: (props: StoryContentProps) => (
        <SwapAndStakeStory
          {...props}
          languageCode={languageCode}
          user={user}
        />
      ),
    },
    {
      type: 'image',
      duration: 5000,
      url: bg6,
      header: (props: StoryContentProps) => (
        <JoinCommunityStory
          {...props}
          languageCode={languageCode}
          user={user}
        />
      ),
    },
  ]

  const handleAllStoriesEnd = () => {
    navigate('/');
  };

  return (
    <Root>
      <Stories
        width="100%"
        height="100%"
        stories={stories}
        onAllStoriesEnd={handleAllStoriesEnd}
        storyStyles={{
          objectFit: 'cover'
        }}
      />
    </Root>
  );
};


const Root = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2000,
  backgroundColor: 'rgba(11, 12, 20, 1)',

  '& > div': {
    backgroundColor: 'transparent',
  },

  '& video': {
    height: '100% !important',
  },
});

export default OnboardingStories;