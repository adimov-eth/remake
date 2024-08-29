import bg2 from '@/assets/stories/bg2.jpg';
import bg3 from '@/assets/stories/bg3.jpg';
import bg6 from '@/assets/stories/bg6.jpg';
import { useNavigate } from 'react-router-dom'

import React from 'react';
import Stories from 'stories-react';
import 'stories-react/dist/index.css';

import { styled } from '@/core/stitches.config';


import { WelcomeStory } from './Welcome';
import { EarnQuarksStory } from './EarnQuarks';
import { ExploreMissionsStory } from './ExploreMissions';
import { EnhancePowerStory } from './EnhancePower';
import { SwapAndStakeStory } from './SwapAndStake';
import { JoinCommunityStory } from './JoinCommunity';
import { StoryContentProps } from './BaseStory';



// Import the video files
import videoMp4_1 from '@/assets/stories/on1.mp4';
import videoMp4_4 from '@/assets/stories/on4.mp4';
import videoMp4_5 from '@/assets/stories/on5.mp4';


const OnboardingStories: React.FC = () => {
  const navigate = useNavigate()

  const stories = [
    {
      url: videoMp4_1,
      type: 'video',
      duration: 5000,
      header: (props: StoryContentProps) => (
        <WelcomeStory
          {...props}
          
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