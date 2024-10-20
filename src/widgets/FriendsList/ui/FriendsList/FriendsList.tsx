import React from 'react';
import { useTranslation } from 'react-i18next';

import { LEVELS } from '@shared/services/websocket/clicker';


import { useGetUserData } from '@shared/services/api/user/model';
import { initDataRaw } from '@app/stores/telegram';
import { FriendCard } from '@features/FriendCard';
import { Loader } from '@shared/ui/Loader';

import * as S from './FriendsList.styles';


export const FriendsList: React.FC = () => {
  const { t } = useTranslation('global');
  const rawData = initDataRaw;
  if (!rawData) return <div>{t('loading')}</div>;
  const { data: userData, isLoading } = useGetUserData({ enabled: !!rawData, variables: { rawData } });

  const getCurrentRank = (level: number) => {
    const lvl = Math.min(Math.max(level - 1, 0), LEVELS.length - 1);
    const rankName = LEVELS[lvl].name;
    return t(`levels.${rankName}`);
  };

  if (isLoading) return <Loader speed="slow" />;

  if (!userData) return <div>{t('no_user_data')}</div>;

  const {
    user: { referrals = [], total_reward_quarks: quarksReward = 0, total_reward_stars: starsReward = 0 },
    meta: { referrals_pagination: { count: joined_count = 0 } = {} } = {},
  } = userData ?? {};

  return (
    <S.Root>
      <S.Title>{t('friends_joined', { count: joined_count })}</S.Title>
      <S.Description>
        {t('earned', {
          quarks: Number(quarksReward || 0).toLocaleString('en-US'),
          stars: Number(starsReward || 0).toLocaleString('en-US')
        })}
      </S.Description>
      <S.List>
        {referrals?.map((referral) => (
          <S.ListItem key={referral.tg_uid}>
            <FriendCard
              username={referral.tg_username || referral.tg_fullname || referral.tg_uid}
              rank={getCurrentRank(referral.level)}
              rewardQuarks={referral.reward_quarks}
              points={referral.quarks}
              profileImage={referral.tg_profile_image}
            />
          </S.ListItem>
        ))}
      </S.List>
    </S.Root>
  );
};
