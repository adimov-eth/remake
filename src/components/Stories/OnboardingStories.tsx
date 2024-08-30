import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stories from 'stories-react';
import 'stories-react/dist/index.css';
import { useTranslation } from 'react-i18next';
// import { $isNew, $subscribed } from '@/stores/state';
// import { useStore } from '@nanostores/react';
import { createStory } from './BaseStory';
import { JoinCommunityStory, Join } from "./JoinCommunity";
import { getStories } from './storyData';
import { Root } from './StyledComponents';

import bg6 from '@/assets/stories/bg6.jpg';

const OnboardingStories: React.FC = () => {
  const navigate = useNavigate();
  // const isNew = useStore($isNew);
  // const subscribed = useStore($subscribed);
  // const startIndex = (!isNew && !subscribed) ? 5 : 0;
  const startIndex = 0;
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const { t } = useTranslation('stories');

  const handleNext = () => {
    if (currentIndex === stories.length - 1) {
      return
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }
  };

  const handleAllStoriesEnd = () => {
    // $isNew.set(false);
    navigate('/');
  };

  const handleStoryChange = (index: number) => {
    setCurrentIndex(index);
  };

  const stories = getStories();

  const storyComponents = stories.map((story) => 
    createStory({
      ...story,
      next: handleNext,
      children: story.childrenComponent,
    })
  );

  // Add the join community story
  storyComponents.push({
    url: bg6,
    type: 'image',
    duration: 5000,
    header: <JoinCommunityStory title={t('join.title')} description={t('join.description')} />,
    seeMore: <Join buttonText={t('join.button')} />,
    onSeeMoreClick: handleNext
  });

  return (
    <Root>
      <Stories
        currentIndex={currentIndex}
        width="100%"
        height="100%"
        stories={storyComponents}
        onStoryChange={handleStoryChange}
        onAllStoriesEnd={handleAllStoriesEnd}
        storyStyles={{
          objectFit: 'cover'
        }}
      />
    </Root>
  );
};


export default OnboardingStories;