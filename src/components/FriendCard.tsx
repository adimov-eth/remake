import React from 'react';

import {styled} from '@/core/stitches.config'
import { Avatar } from '@/components/Avatar'

export interface FriendCardProps {
    username: string;
    rank: string;
    rewardQuarks: number;
    points: number;
    profileImage: string;
  }


const FriendCard: React.FC<FriendCardProps> = ({
    username,
    rank,
    rewardQuarks,
    points,
    profileImage,
  }: FriendCardProps) => {
   
    return (
      <Root>
        <Info>
          <Avatar src={profileImage} size={40} />
          <Texts>
            <Name>{username}</Name>
            <Rank>{rank} - {points ? points.toLocaleString('en-US') : ''}</Rank>
          </Texts>
        </Info>
        <Balance>{(rewardQuarks ? '+' : '') + rewardQuarks.toLocaleString('en-US')}</Balance>
      </Root>
    );
  }

export default FriendCard;




const Root = styled('div', {
    background: '#14151E',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '32px',
    padding: '16px',
  });

  const Info = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  });

  const Texts = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  });

  const Name = styled('div', {
    fontFamily: 'var(--font-pro-display)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'white',
  });

  const Rank = styled('div', {
    fontFamily: 'var(--font-pro-display)',
    fontSize: '14px',
    fontWeight: 400,
    color: '#67718C',
  });

  const Balance = styled('div', {
    color: 'white',
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    fontWeight: 600,
  });
