import React from 'react';
import { Avatar } from '@/shared/ui/Avatar';

import { User } from '@telegram-apps/sdk-react';

import * as S from './UserInfo.styles';

interface UserInfoProps {
  user: User | null | undefined;
  rank: string;
  avatar: string | undefined;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user, rank, avatar }) => (
  <S.Root to="/profile">
    <Avatar src={avatar} size={40} />
    <S.UserInfo>
      <S.UserName>
        {user ? user.username || `${user.firstName} ${user.lastName}` : 'Username'}
      </S.UserName>
      <S.UserRank>{rank}</S.UserRank>
    </S.UserInfo>
  </S.Root>
);
