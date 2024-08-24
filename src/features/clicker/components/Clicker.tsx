import React from 'react'
import { useStore } from '@nanostores/react'
import { gameState, incrementScore } from '@/features/clicker/stores/gameState'
import { Button } from '@telegram-apps/telegram-ui'

export const Clicker: React.FC = () => {
  const $gameState = useStore(gameState)

  const handleClick = () => {
    incrementScore()
  }

  return (
    <div>
      <h2>Score: {$gameState.score}</h2>
      <Button onClick={handleClick}>Click Me!</Button>
    </div>
  )
}