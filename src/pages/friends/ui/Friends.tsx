import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@shared/ui/Page';
import { Banner } from '@shared/ui/Banner';
import { Content } from '@shared/ui/Content';
import { Title } from '@shared/ui/Title';
import { RadiantBackdrop } from '@shared/ui/RadiantBackdrop';
import { FriendsList } from '@shared/ui/FriendsList';
import { friends1, friends2 } from '@shared/assets';

import * as S from './Friends.styles';

export const Friends: React.FC = () => {
  const { t } = useTranslation('pages');

  return (
    <Page>
    <Banner>
        <RadiantBackdrop variant="blue">
          <S.Illustration>
            <S.FriendImage src={friends2} alt={t('friends.title')} position="close" />
            <S.FriendImage src={friends1} alt={t('friends.title')} position="far" />
          </S.Illustration>
          <Title>{t('friends.title')}</Title>
        </RadiantBackdrop>
      </Banner>
      <Content>
        <FriendsList />
      </Content>
    </Page>
  );
};