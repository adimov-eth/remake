import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';

import { DayRewardsModal } from '@/shared/ui/DayRewardsModal/DayRewardsModal'

import { LevelsSlider } from '@/shared/ui/Profile/LevelsSlider/LevelsSlider'
import { UserLogo } from '@/shared/ui/Profile/UserLogo/UserLogo'
import { UserValues } from '@/shared/ui/Profile/UserValues/UserValues'

import FriendsList from '@/shared/ui/FriendsList'

import { Page, Content, Header } from '@/shared/ui/Page'

import { Button } from '@/shared/ui/Button'

import { styled } from '@/app/stitches.config'

const Wrapper = styled('div',{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '16px',
})

export const Profile: React.FC = () => {
  const [dailyOpen, setDailyOpen] = useState(false)
  const { t } = useTranslation('pages')
  
  return (
    <Page>
      <Content>
        <Header></Header>
        <Wrapper>
          <UserLogo />
          <LevelsSlider />
          <UserValues />
          <Button variant="purpleGradient" onClick={() => setDailyOpen(true)}>
            {t('profile.daily_rewards')}
          </Button>
          <DayRewardsModal open={dailyOpen} onClose={() => setDailyOpen(false)} />

          <FriendsList />
          </Wrapper>
        </Content>
    </Page>
  )
}