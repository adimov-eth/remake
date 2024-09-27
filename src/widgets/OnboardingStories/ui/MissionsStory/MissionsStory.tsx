import { useTranslation } from 'react-i18next';
import { StoryHeader, StorySeeMore } from '../Story';

import bg3 from '@shared/assets/stories/bg3.jpg';

const Header: React.FC = () => {
  const { t } = useTranslation('stories');

  return (
    <StoryHeader title={t('missions.title')} description={t('missions.description')}/>
  );
};

const SeeMore: React.FC = () => {
  const { t } = useTranslation('stories');

  return (
    <StorySeeMore>{t('button.next')}</StorySeeMore>
  );
};

export const missionsStoryConfig = {
  url: bg3,
  type: 'image',
  header: Header,
  seeMore: SeeMore,
};