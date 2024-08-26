import React from 'react'
import { useLocation } from 'react-router-dom'
import { useStore } from '@nanostores/react'
import { styled } from '@stitches/react'
import { UserInfo } from './UserInfo'
import { ValueDisplay } from './ValueDisplay'
import { SettingsButtons } from './SettingsButtons'
import { ValueTooltip } from './ValueTooltip'
import { $connectionStatus, $gameState } from '@/stores/state'

import { user } from '@/stores/telegram'


const HeaderRoot = styled('div', {
  width: '100%',
  background: 'rgba(43, 46, 69, 0.3)',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
})

const HeaderWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
})

export const Header: React.FC = () => {
  const location = useLocation()
  const connectionStatus = useStore($connectionStatus)
  const gameState = useStore($gameState)

  const isProfilePage = location.pathname === '/profile'
  const showQuarks = location.pathname !== '/'

  if (connectionStatus !== 'online') {
    return (
      <HeaderRoot>
        <HeaderWrapper>
          <div>Loading... (Status: {connectionStatus})</div>
        </HeaderWrapper>
      </HeaderRoot>
    )
  }
  const { quarks, stars } = gameState
  const currentRank = gameState.levelDef.get()
  const telegramUser = user


  return (
    <HeaderRoot>
      <HeaderWrapper>
        <UserInfo
          user={telegramUser}
          rank={currentRank.name}
          avatar={telegramUser?.photoUrl as string}
        />
        {isProfilePage ? (
          <SettingsButtons />
        ) : (
          <ValueDisplay
            quarks={quarks.get()}
            stars={stars.get()}
            showQuarks={showQuarks}
          />
        )}
      </HeaderWrapper>
      <ValueTooltip value={quarks.get()} type="quarks" />
      <ValueTooltip value={stars.get()} type="stars" />
    </HeaderRoot>
  )
}