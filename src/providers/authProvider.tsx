import React, { createContext, useContext } from 'react'
import { useStore } from '@nanostores/react'
import { $telegramUser } from '@/stores/telegramAuth'
import { useLaunchParams } from '@telegram-apps/sdk-react'

interface AuthContextType {
  user: ReturnType<typeof $telegramUser.get>
  isAuthenticated: boolean
  isDesktop: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const launchParams = useLaunchParams()
  const user = useStore($telegramUser)

  const isDesktop = !['android', 'android_x', 'ios'].includes(launchParams.platform)

  const value:AuthContextType = {
    user,
    isAuthenticated: !!user,
    isDesktop,
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