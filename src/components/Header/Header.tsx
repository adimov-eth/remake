import React from 'react'
import { useLocation } from 'react-router-dom'
import { styled } from '@stitches/react'
import { UserInfo } from './UserInfo'
import { ValueDisplay } from './ValueDisplay'
import { SettingsButtons } from './SettingsButtons'
import { ValueTooltip } from './ValueTooltip'
import { useUserAndGameState } from '@/hooks/useUserAndGameState'
import { useConnection } from "@/providers/connectionProvider"

const HeaderRoot = styled('div', {
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 2,
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
  const { isLoading, data } = useUserAndGameState()
  const { connectionStatus } = useConnection()

  const isProfilePage = location.pathname === '/profile'
  const showQuarks = location.pathname !== '/'

  if (isLoading || connectionStatus !== 'online') {
    return (
      <HeaderRoot>
        <HeaderWrapper>
          <div>Loading... (Status: {connectionStatus})</div>
        </HeaderWrapper>
      </HeaderRoot>
    )
  }

  const { telegramUser, currentRank, profileImage, quarks, stars } = data || {}

  return (
    <HeaderRoot>
      <HeaderWrapper>
        <UserInfo
          user={telegramUser}
          rank={currentRank || ''}
          avatar={profileImage || ''}
        />
        {isProfilePage ? (
          <SettingsButtons />
        ) : (
          <ValueDisplay
            quarks={quarks || 0}
            stars={stars || 0}
            showQuarks={showQuarks}
          />
        )}
      </HeaderWrapper>
      <ValueTooltip value={quarks || 0} type="quarks" />
      <ValueTooltip value={stars || 0} type="stars" />
    </HeaderRoot>
  )
}