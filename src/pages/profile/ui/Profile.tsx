import React from 'react'

import { DailyRewards } from '@widgets/DailyRewards'

import { LevelsSlider } from '@features/LevelsSlider'
import { UserLogo } from '@features/UserLogo'
import { UserStats } from '@features/UserStats'

import { FriendsList } from '@widgets/FriendsList'

import { Page } from '@shared/ui/Page';
import { Content } from '@shared/ui/Content';


import * as S from './Profile.styles'

export const Profile: React.FC = () => {
  return (
    <Page>
      <Content>
        <S.Root>
          <UserLogo />
          <LevelsSlider />
          <UserStats />
          <DailyRewards />
          <FriendsList />
        </S.Root>
      </Content>
    </Page>
  )
}