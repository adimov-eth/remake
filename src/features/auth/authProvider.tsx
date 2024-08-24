import React, { createContext, useContext, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { $telegramUser, setTelegramProvideRawData } from './authStore'
import { useLaunchParams } from '@telegram-apps/sdk-react'

interface AuthContextType {
  user: ReturnType<typeof $telegramUser.get>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const launchParams = useLaunchParams()
  const user = useStore($telegramUser)

  useEffect(() => {
    if (launchParams.initDataRaw) {
      setTelegramProvideRawData(launchParams.initDataRaw)
    }
  }, [launchParams.initDataRaw])

  const value = {
    user,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}