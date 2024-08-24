import { useState, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { $transportStore } from '@/stores/sockets'
import { loadPersistedState } from '@/utils/persistence'

export const useAppState = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOnboarding, setIsOnboarding] = useState(false)
  const transportStore = useStore($transportStore)

  useEffect(() => {
    const loadInitialState = async () => {
  

      // Load persisted state from local storage
      const persistedState = loadPersistedState()
      if (persistedState) {
        transportStore.$state.set(persistedState)
      } else {
        // Initialize with default state if no persisted state
        // transportStore.$state.set(initClicker())
      }

      // Check if onboarding is needed
      const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted')
      setIsOnboarding(!hasCompletedOnboarding)

      setIsLoaded(true)
    }

    loadInitialState()
  }, [])

  return { isLoaded, isOnboarding }
}