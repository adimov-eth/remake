import React from 'react';

import { Avatar } from '@shared/ui/Avatar'

import * as S from './FriendCard.styles'

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
          <S.Texts>
            <S.Name>{username}</S.Name>
            <S.Rank>{rank} - {points ? points.toLocaleString('en-US') : ''}</S.Rank>
          </S.Texts>
        </S.Info>
        <S.Balance>{(rewardQuarks ? '+' : '') + rewardQuarks.toLocaleString('en-US')}</S.Balance>
      </S.Root>
    );
}