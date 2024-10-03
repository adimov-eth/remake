import Stories from '../../stories-react/index';
import { $storieIndex } from '@app/stores/state';

import { useStore } from '@nanostores/react';

import { welcomeStoryConfig } from '../WelcomeStory';
import { earnStoryConfig } from '../EarnStory';
import { missionsStoryConfig } from '../MissionsStory';
import { enhanceStoryConfig } from '../EnhanceStory';
import { swapStoryConfig } from '../SwapStory';
import { joinStoryConfig } from '../JoinStory';

import * as S from './OnboardingStories.styles';

const storyConfigs = [
    welcomeStoryConfig,
    earnStoryConfig,
    missionsStoryConfig,
    enhanceStoryConfig,
    swapStoryConfig,
    joinStoryConfig,
];

interface IStoryProps {
    type: string;
    url: string;
    duration: number;
    component?: any;
    header?: any;
    seeMore?: any;
    seeMoreComponent?: any;
    onSeeMoreClick?: any; // TODO: fix any
}

const prepareStories = (): IStoryProps[] => {
    const index = useStore($storieIndex);

    const handleSeeMoreClick = () => {
        if (index === storyConfigs.length) return;
    
        $storieIndex.set(index + 1);
    };

    const defOpts = {
        duration: 5000,
        onSeeMoreClick: handleSeeMoreClick,
    }

    return storyConfigs.map(story => ({
        ...defOpts,
        ...story,
    }));
}

export const OnboardingStories = () => {
    const index = useStore($storieIndex);

    const handleStoryChange = (index: number) => {
        $storieIndex.set(index);
    };

    const stories = prepareStories();

    return (
        <S.Root>
            <Stories
                currentIndex={index}
                stories={stories}
                onStoryChange={handleStoryChange}
            />
        </S.Root>
    );
};