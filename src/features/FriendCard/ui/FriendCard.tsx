import React from 'react';

import { Avatar } from '@shared/ui/Avatar';

import * as S from './FriendCard.styles';
import QuarksIcon from '@shared/assets/quark.svg?react';

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
        <Avatar src={profileImage} size={40} />
        <S.Content>
          <S.Name>{username}</S.Name>
          <S.Rank>{rank} - {points ? points.toLocaleString('en-US') : ''}</S.Rank>
        </S.Content>
      </S.Info>
      <S.Balance>
        <S.BalanceIcon as={QuarksIcon} />
        <span>{(rewardQuarks || 0).toLocaleString('en-US')}</span>
      </S.Balance>
    </S.Root>
  );
};