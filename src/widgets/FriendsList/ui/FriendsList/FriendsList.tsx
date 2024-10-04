import React from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';

import { LEVELS } from '@shared/services/websocket/clicker';

import { useShareRefferalLink, useClickNotification } from '@shared/hooks';
import { useGetUserData } from '@shared/services/api/user/model';
import { initDataRaw } from '@app/stores/telegram';
import { FriendCard } from '@features/FriendCard';
import { Button } from '@shared/ui/Button';
import { Loader } from '@shared/ui/Loader';

import * as S from './FriendsList.styles';
import CopyIcon from '@shared/assets/copy.svg?react';


export const FriendsList: React.FC = () => {
  const { t } = useTranslation('global');
  const rawData = initDataRaw;
  if (!rawData) return <div>{t('loading')}</div>;
  const { data: userData, isLoading } = useGetUserData({
    enabled: !!rawData,
    variables: { rawData },
  });


  const getCurrentRank = (level: number) => {
    const lvl = Math.min(Math.max(level - 1, 0), LEVELS.length - 1);
    const rankName = LEVELS[lvl].name;
    return t(`levels.${rankName}`);
  };

  const { handleShare, buildShareUrl } = useShareRefferalLink();
  const { notifyUser } = useClickNotification('');
  const [, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        notifyUser();
        handleShare();
      })
      .catch((error) => {
        console.error('Failed to copy!', error);
      });
  };

  const refUrl = buildShareUrl() || '';

  if (isLoading) return <Loader speed="slow" />;

  if (!userData) return <div>{t('no_user_data')}</div>;

  const {
    user: {
      referrals = [],
      total_reward_quarks: quarksReward = 0,
      total_reward_stars: starsReward = 0,
    },
    meta: {
      referrals_pagination: { count: joined_count },
    },
  } = userData;

  return (
    <S.Root>
      <S.Title>{t('friends_joined', { count: joined_count })}</S.Title>
      <S.Description>{t('earned', { quarks: quarksReward.toLocaleString('en-US'), stars: starsReward })}</S.Description>
      <S.Container>
        <S.Card>
          <S.CardContent onClick={handleShare}>
            <S.CardDescription>{t('invite_friends')}</S.CardDescription>
            <S.CardLabel>{refUrl}</S.CardLabel>
          </S.CardContent>
          <Button size="medium" variant="secondary" onClick={handleCopy(refUrl)}>
            <S.CopyIcon as={CopyIcon} />
          </Button>
        </S.Card>

        {referrals?.map((referral) => (
          <FriendCard
            key={referral.tg_uid}
            username={referral.tg_username || referral.tg_fullname || referral.tg_uid}
            rank={getCurrentRank(referral.level)}
            rewardQuarks={referral.reward_quarks}
            points={referral.quarks}
            profileImage={referral.tg_profile_image}
          />
        ))}
      </S.Container>
    </S.Root>
  );
};