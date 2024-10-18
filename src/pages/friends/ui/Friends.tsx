import React from 'react';
import { useTranslation } from 'react-i18next';

import { Banner } from '@shared/ui/Banner';
import { Title } from '@shared/ui/Title';
import { BlurBackdrop } from '@shared/ui/BlurBackdrop';
import { FriendsList } from '@widgets/FriendsList';
import { InviteFriendsCard } from '@features/InviteFriendsCard';
import { InviteFriendsPanel } from '@features/InviteFriendsPanel';

import * as S from './Friends.styles';
import Preview from '@shared/assets/spaceman-friends.png';

export const Friends: React.FC = () => {
  const { t } = useTranslation('pages');

  return (
    <S.Root>
      <S.TopArea>
        <Banner>
          <BlurBackdrop variant="purple">
            <S.Illustration>
              <img src={Preview} width={150} height={160} />
            </S.Illustration>
            <Title>{t('friends.title')}</Title>
          </BlurBackdrop>
        </Banner>
        <InviteFriendsCard />
        <FriendsList />
      </S.TopArea>
      <S.BottomArea>
        <InviteFriendsPanel />
      </S.BottomArea>
    </S.Root>
  );
};