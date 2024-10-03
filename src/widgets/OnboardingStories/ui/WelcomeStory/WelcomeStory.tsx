import { useTranslation } from 'react-i18next';
import { StoryHeader, StorySeeMore } from '../Story';

import * as S from './WelcomeStory.styles';
import videoMp4_1 from '@shared/assets/stories/on1.mp4';

const Header: React.FC = () => {
  const { t } = useTranslation('stories');

  return (
    <StoryHeader
      title={t('welcome.title')}
      description={t('welcome.description')}
    >
      <S.Subtitle>{t('welcome.cta')}</S.Subtitle>
    </StoryHeader>
  );
};

const SeeMore: React.FC = () => {
  const { t } = useTranslation('stories');

  return (
    <StorySeeMore>{t('welcome.button')}</StorySeeMore>
  );
};

export const welcomeStoryConfig = {
  url: videoMp4_1,
  type: 'video',
  header: Header,
  seeMore: SeeMore,
};