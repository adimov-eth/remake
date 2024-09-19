import React from 'react';
import { styled } from '@stitches/react';
import { Link } from '@/shared/ui/Link/ui/Link';
import { Avatar } from '@/shared/ui/Avatar';
import { AutoSizeText } from './AutoSizeText';
import { User } from '@telegram-apps/sdk-react';

const UserLink = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const UserInfoWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const UserName = styled(AutoSizeText, {
  fontFamily: 'var(--font-pro)',
  fontSize: '12px',
  fontWeight: 590,
  color: 'white',
});

const UserRank = styled('div', {
  fontFamily: 'var(--font-pro)',
  fontSize: '12px',
  fontWeight: 590,
  color: '#3B4660',
});

interface UserInfoProps {
  user: User | null | undefined;
  rank: string;
  avatar: string | undefined;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user, rank, avatar }) => (
  <UserLink to="/profile">
    <Avatar src={avatar} size={40} />
    <UserInfoWrapper>
      <UserName initialFontSize={14}>
        {user ? user.username || `${user.firstName} ${user.lastName}` : 'Username'}
      </UserName>
      <UserRank>{rank}</UserRank>
    </UserInfoWrapper>
  </UserLink>
);
