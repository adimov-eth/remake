import { ClickerState } from '@/services/websocket/clicker'

export const persistState = (state: ClickerState) => {
  localStorage.setItem('appState', JSON.stringify(state))
}

export const loadPersistedState = (): ClickerState | null => {
  const persistedState = localStorage.getItem('appState')
  return persistedState ? JSON.parse(persistedState) : null
}