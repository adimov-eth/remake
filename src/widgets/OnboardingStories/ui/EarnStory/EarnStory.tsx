import { useTranslation } from 'react-i18next';
import { StoryHeader, StorySeeMore } from '../Story';

import bg2 from '@shared/assets/stories/bg2.jpg';

const Header: React.FC = () => {
  const { t } = useTranslation('stories');

  return (
    <StoryHeader title={t('earn.title')} description={t('earn.description')}/>
  );
};

const SeeMore: React.FC = () => {
  const { t } = useTranslation('stories');

  return (
    <StorySeeMore>{t('button.next')}</StorySeeMore>
  );
};

export const earnStoryConfig = {
  url: bg2,
  type: 'image',
  header: Header,
  seeMore: SeeMore,
};