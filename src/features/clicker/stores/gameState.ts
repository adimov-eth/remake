import { persistentAtom } from '@nanostores/persistent'

export interface GameState {
  score: number
  clickMultiplier: number
  lastSyncedAt: number
}

const initialState: GameState = {
  score: 0,
  clickMultiplier: 1,
  lastSyncedAt: Date.now()
}

export const gameState = persistentAtom<GameState>('gameState', initialState, {
  encode: JSON.stringify,
  decode: JSON.parse
})

export const incrementScore = () => {
  const currentState = gameState.get()
  gameState.set({
    ...currentState,
    score: currentState.score + currentState.clickMultiplier
  })
}

export const updateMultiplier = (newMultiplier: number) => {
  const currentState = gameState.get()
  gameState.set({
    ...currentState,
    clickMultiplier: newMultiplier
  })
}

export const syncWithServer = (serverState: Partial<GameState>) => {
  const currentState = gameState.get()
  gameState.set({
    ...currentState,
    ...serverState,
    lastSyncedAt: Date.now()
  })
}