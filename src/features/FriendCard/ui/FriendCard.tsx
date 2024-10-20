import React from 'react';

import { Avatar } from '@shared/ui/Avatar';
import { BalanceDisplay } from '@features/BalanceDisplay';

import * as S from './FriendCard.styles';

export interface FriendCardProps {
  username: string;
  rank: string;
  rewardQuarks: number;
  points: number;
  profileImage: string;
}

export const FriendCard: React.FC<FriendCardProps> = ({
  username,
  rank,
  rewardQuarks,
  points,
  profileImage,
}: FriendCardProps) => {
  return (
    <S.Root>
      <S.Info>
        <Avatar src={profileImage} size={48} />
        <S.Content>
          <S.Name>{username}</S.Name>
          <S.Rank>{rank} ({points ? points.toLocaleString('en-US') : ''} Q)</S.Rank>
        </S.Content>
      </S.Info>
      <BalanceDisplay
        variant="ghost"
        size="small"
        quarks={rewardQuarks || 0} 
        showStars={false} 
      />
    </S.Root>
  );
};