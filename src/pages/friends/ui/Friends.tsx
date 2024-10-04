import React from 'react';
import { useTranslation } from 'react-i18next';

import { Banner } from '@shared/ui/Banner';
import { Title } from '@shared/ui/Title';
import { BlurBackdrop } from '@shared/ui/BlurBackdrop';
import { FriendsList } from '@widgets/FriendsList';

import * as S from './Friends.styles';
import Preview from '@shared/assets/spaceman-friends.png';

export const Friends: React.FC = () => {
  const { t } = useTranslation('pages');

  return (
    <>
      <Banner>
        <BlurBackdrop variant="blue">
          <S.Illustration>
            <img src={Preview} width={150} height={160} />
          </S.Illustration>
          <Title>{t('friends.title')}</Title>
        </BlurBackdrop>
      </Banner>
      <FriendsList />
    </>
  );
};