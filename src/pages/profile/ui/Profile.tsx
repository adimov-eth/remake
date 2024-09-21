import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';

import { DayRewardsModal } from '@shared/ui/DayRewardsModal'

import { LevelsSlider } from '@/shared/ui/ProfileLevelsSlider'
import { UserLogo } from '@shared/ui/UserLogo'
import { UserValues } from '@shared/ui/ProfileUserValues'

import { FriendsList } from '@/shared/ui/FriendsList'

import { Page } from '@shared/ui/Page';
import { Content } from '@shared/ui/Content';

import { Button } from '@/shared/ui/Button'

import * as S from './Profile.styles'

export const Profile: React.FC = () => {
  const [dailyOpen, setDailyOpen] = useState(false)
  const { t } = useTranslation('pages')
  
  return (
    <Page>
      <Content>
        <S.Root>
          <UserLogo />
          <LevelsSlider />
          <UserValues />
          <Button variant="purpleGradient" onClick={() => setDailyOpen(true)}>
            {t('profile.daily_rewards')}
          </Button>
          <DayRewardsModal open={dailyOpen} onClose={() => setDailyOpen(false)} />

          <FriendsList />
        </S.Root>
      </Content>
    </Page>
  )
}