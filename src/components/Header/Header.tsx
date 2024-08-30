import React from 'react'
import { useLocation } from 'react-router-dom'
import { useStore } from '@nanostores/react'
import { styled } from '@stitches/react'
import { UserInfo } from './UserInfo'
import { ValueDisplay } from './ValueDisplay'
import { SettingsButtons } from './SettingsButtons'
import { ValueTooltip } from './ValueTooltip'
import { $gameState, $pfp, $user } from '@/stores/state'



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
  const gameState = useStore($gameState)
  if (!gameState) return null
  const isProfilePage = location.pathname === '/profile'
  const showQuarks = location.pathname !== '/'
  const quarks: number = useStore(gameState.quarks) 
  const stars: number = useStore(gameState.stars)
 
  const currentRank = gameState.levelDef.get()
  const telegramUser = useStore($user)
  const pfp = useStore($pfp)
  return (
    <HeaderRoot>
      <HeaderWrapper>
        <UserInfo
          user={telegramUser}
          rank={currentRank.name}
          avatar={pfp}
        />
        {isProfilePage ? (
          <SettingsButtons />
        ) : (
          <ValueDisplay
            quarks={Number(quarks)}
            stars={Number(stars)}
            showQuarks={showQuarks}
          />
        )}
      </HeaderWrapper>
      <ValueTooltip value={Number(quarks)} type="quarks" />
      <ValueTooltip value={Number(stars)} type="stars" />
    </HeaderRoot>
  )
}