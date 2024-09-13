// import React from 'react';
import { useTranslation } from 'react-i18next';
import bg2 from '@/assets/stories/bg2.jpg';
import bg3 from '@/assets/stories/bg3.jpg';

import videoMp4_1 from '@/assets/stories/on1.mp4';
import videoMp4_4 from '@/assets/stories/on4.mp4';
import videoMp4_5 from '@/assets/stories/on5.mp4';

import {
  CTA,
  BottomDescription,
  Swap,
  BottomDescriptionBackdrop,
} from './StyledComponents';

export const getStories = () => {
  const { t } = useTranslation('stories');

  return [
    {
      url: videoMp4_1,
      type: 'video',
      title: t('welcome.title'),
      description: t('welcome.description'),
      cta: t('welcome.cta'),
      childrenComponent: <CTA>{t('welcome.cta')}</CTA>,
      actionText: t('welcome.button'),
    },
    {
      url: bg2,
      type: 'image',
      title: t('earn.title'),
      description: t('earn.description'),
      actionText: t('button.next'),
    },
    {
      url: bg3,
      type: 'image',
      title: t('missions.title'),
      description: t('missions.description'),
      actionText: t('button.next'),
    },
    {
      url: videoMp4_4,
      type: 'video',
      title: t('accelerators.title'),
      description: t('accelerators.description'),
      childrenComponent: (
        <>
          <BottomDescription>{t('accelerators.bottomDescription')}</BottomDescription>
          <BottomDescriptionBackdrop />
        </>
      ),
      actionText: t('button.next'),
    },
    {
      url: videoMp4_5,
      type: 'video',
      title: t('swap.title'),
      description: t('swap.description'),
      actionText: t('button.next'),
      childrenComponent: <Swap />,
    },
  ];
};
