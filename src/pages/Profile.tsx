import React from 'react'
import { useState } from 'react'

import { DayRewardsModal } from '@/components/DayRewardsModal/DayRewardsModal'

import { LevelsSlider } from '@/components/Profile/LevelsSlider/LevelsSlider'
import { UserLogo } from '@/components/Profile/UserLogo/UserLogo'
import { UserValues } from '@/components/Profile/UserValues/UserValues'

import FriendsList from '@/components/FriendsList'

import { Page, Content, Header } from '@/components/Page'

import { Button } from '@/components/Button'

import { styled } from '@/core/stitches.config'

const Wrapper = styled('div',{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '16px',
})

const Profile: React.FC = () => {
  const [dailyOpen, setDailyOpen] = useState(false)

  return (
    <Page>
      <Content>
        <Header></Header>
        <Wrapper>
          <UserLogo />
          <LevelsSlider />
          <UserValues />
          <Button variant="purpleGradient" onClick={() => setDailyOpen(true)}>
            Daily Rewards
          </Button>
          <DayRewardsModal open={dailyOpen} onClose={() => setDailyOpen(false)} />

          <FriendsList />
          </Wrapper>
        </Content>
    </Page>
  )
}


export default Profile
