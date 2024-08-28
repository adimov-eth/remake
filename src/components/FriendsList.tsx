//@ts-ingnore

 

import React, { useRef } from 'react';
import { styled } from '@stitches/react';
import { useCopyToClipboard } from 'usehooks-ts';

import FriendCard from "@/components/FriendCard";

import { LEVELS } from '@/services/websocket/clicker'
import CopyIconSVG from '@/assets/copy.svg?react'

import { useShareRefferalLink, useClickNotification } from '@/hooks'
import { useGetUserData } from '@/services/api/user/model'
import { initDataRaw } from '@/stores/telegram'



const getCurrentRank = (level: number) => {
  const lvl = Math.min(Math.max(level - 1, 0), LEVELS.length - 1)
  return LEVELS[lvl].name
}

const FriendsList: React.FC = () => {
  const rawData = initDataRaw
  if (!rawData) return <div>Loading...</div>
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
    return <div>Loading...</div>
  }

  if (!userData) {
    return <div>No user data available</div>
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
        <FriendsContainer>
          <FriendsTitle>
            Friends ({joined_count} joined)
          </FriendsTitle>
          <FriendsDesc>
            Earned: +{quarksReward.toLocaleString('en-US')} Quarks, +{starsReward} Stars
          </FriendsDesc>
          <ReferralLink>
            <div style={{ flex: 1 }} onClick={handleShare}>
              <ReferralLinkTitle>Invite friends</ReferralLinkTitle>
              <ReferralLinkInput
                readOnly
                ref={referralInputRef}
                value={refUrl}
              />
            </div>
            <CopyButton onClick={handleCopy(refUrl)}>
              <CopyIcon />
            </CopyButton>
          </ReferralLink>
          <MembersContainer>
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
          </MembersContainer>
        </FriendsContainer>
  );
};

export default FriendsList;






// Updated Stitches components
const FriendsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const FriendsTitle = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '16px',
  fontWeight: 600,
  color: 'white',
  marginBottom: '5px',
});

const FriendsDesc = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '10px',
  fontWeight: 400,
  color: 'white',
  marginBottom: '10px',
});

const ReferralLink = styled('div', {
  background: '#14151E',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  gap: '10px',
  marginBottom: '12px',
});

const ReferralLinkTitle = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '16px',
  color: '#67718C',
  marginBottom: '12px',
});

const ReferralLinkInput = styled('input', {
  background: 'transparent',
  border: 'none',
  fontFamily: 'var(--font-pro-display)',
  fontSize: '16px',
  fontWeight: 500,
  color: 'white',
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  pointerEvents: 'none',
});

const CopyButton = styled('div', {
  padding: '10px',
  background: '#1C1F30',
  borderRadius: '16px',
});

const MembersContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const CopyIcon = styled(CopyIconSVG, {
  width: '28px',
  height: '28px',
  '& path': {
    fill: '#333D5B',
  },
});

// ... rest of the component code ...
