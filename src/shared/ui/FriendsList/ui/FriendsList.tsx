//@ts-ingnore

 

import React, { useRef } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';

import { FriendCard } from "@shared/ui/FriendCard";

import { LEVELS } from '@shared/services/websocket/clicker'

import { useShareRefferalLink, useClickNotification } from '@shared/hooks'
import { useGetUserData } from '@shared/services/api/user/model'
import { initDataRaw } from '@app/stores/telegram'

import * as S from './FriendsList.styles'


const getCurrentRank = (level: number) => {
  const lvl = Math.min(Math.max(level - 1, 0), LEVELS.length - 1)
  return LEVELS[lvl].name
}

export const FriendsList: React.FC = () => {
  const { t } = useTranslation('global');
  const rawData = initDataRaw
  if (!rawData) return <div>{t('loading')}</div>
  const { data: userData, isLoading } = useGetUserData({
    enabled: !!rawData,
    variables: { rawData },
  })

  const referralInputRef = useRef<HTMLInputElement>(null)
  const { handleShare, buildShareUrl } = useShareRefferalLink()
  const { notifyUser } = useClickNotification('')
  const [, copy] = useCopyToClipboard()

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        notifyUser()
        handleShare()
      })
      .catch((error) => {
        console.error('Failed to copy!', error)
      })
  }

  const refUrl = buildShareUrl() || ''

  if (isLoading) {
    return <div>{t('loading')}</div>
  }

  if (!userData) {
    return <div>{t('no_user_data')}</div>
  }
  
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
        <S.FriendsContainer>
          <S.FriendsTitle>
            {t('friends_joined', { count: joined_count })}
          </S.FriendsTitle>
          <S.FriendsDesc>
            {t('earned', { quarks: quarksReward.toLocaleString('en-US'), stars: starsReward })}
          </S.FriendsDesc>
          <S.ReferralLink>
            <div style={{ flex: 1 }} onClick={handleShare}>
              <S.ReferralLinkTitle>{t('invite_friends')}</S.ReferralLinkTitle>
              <S.ReferralLinkInput
                readOnly
                ref={referralInputRef}
                value={refUrl}
              />
            </div>
            <S.CopyButton onClick={handleCopy(refUrl)}>
              <S.CopyIcon />
            </S.CopyButton>
          </S.ReferralLink>
          <S.MembersContainer>
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
          </S.MembersContainer>
        </S.FriendsContainer>
  );
};