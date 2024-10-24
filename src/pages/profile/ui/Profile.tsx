import React from 'react';

import { DailyRewards } from '@widgets/DailyRewards';

import { LevelsSlider } from '@features/LevelsSlider';
import { UserLogo } from '@features/UserLogo';
import { UserStats } from '@features/UserStats';

import { FriendsList } from '@widgets/FriendsList';

import * as S from './Profile.styles';

export const ProfilePage: React.FC = () => {
  return (
    <S.Root>
      <UserLogo />
      <LevelsSlider />
      <UserStats />
      <DailyRewards />
      <FriendsList />
    </S.Root>
  );
};