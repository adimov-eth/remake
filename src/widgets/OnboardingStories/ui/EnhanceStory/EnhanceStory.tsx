import { useTranslation } from 'react-i18next';
import { StoryHeader, StorySeeMore } from '../Story';

import videoMp4_4 from '@shared/assets/stories/on4.mp4';

const Header: React.FC = () => {
  const { t } = useTranslation('stories');

  const Description = () => {
    return (
      <>
        <p>{t('accelerators.description')}</p>
        <p>{t('accelerators.bottomDescription')}</p>
      </>
    );
  };

  return (
    <StoryHeader title={t('accelerators.title')} description={<Description />}/>
  );
};

const SeeMore: React.FC = () => {
  const { t } = useTranslation('stories');

  return (
    <StorySeeMore>{t('button.next')}</StorySeeMore>
  );
};

export const enhanceStoryConfig = {
  url: videoMp4_4,
  type: 'video',
  header: Header,
  seeMore: SeeMore,
};