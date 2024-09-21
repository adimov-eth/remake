import React from 'react'
import { useLocation } from 'react-router-dom'
import { useStore } from '@nanostores/react'
import { $gameState, $pfp, $user } from '@app/stores/state'

import { UserInfo } from '@shared/ui/UserInfo'
import { UserValueDisplay } from '../../UserValueDisplay/ui/UserValueDisplay'
import { SettingsButtons } from '../../SettingsButtons/SettingsButtons'
import { ValueTooltip } from '../../ValueTooltip/ui/ValueTooltip'

import * as S from './UserStatusBar.styles'

export const UserStatusBar: React.FC = () => {
  const gameState = useStore($gameState)
  
  if (!gameState) return null
  
  const location = useLocation()
  const isProfilePage = location.pathname === '/profile'
  const showQuarks = location.pathname !== '/'
  
  const quarks: number = useStore(gameState.quarks) 
  const stars: number = useStore(gameState.stars)
 
  const currentRank = gameState.levelDef.get()
  const telegramUser = useStore($user)
  const pfp = useStore($pfp)

  return (
    <S.Root>
      <UserInfo
        user={telegramUser}
        rank={currentRank.name}
        avatar={pfp}
      />
      {isProfilePage ? (
        <SettingsButtons />
      ) : (
        <UserValueDisplay
          quarks={Number(quarks)}
          stars={Number(stars)}
          showQuarks={showQuarks}
        />
      )}
      <ValueTooltip value={Number(quarks)} type="quarks" />
      <ValueTooltip value={Number(stars)} type="stars" />
    </S.Root>
  )
}