import { FC, ReactNode } from 'react'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { useTelegramApp } from '@/providers/SDKProvider'
import { useTheme } from '@/providers/themeProvider'
import { useAuth } from '@/providers/authProvider'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import WebBlocker from '@/components/WebBlocker'

interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { lp } = useTelegramApp()
  const { isDark } = useTheme()
  const { isWebTelegram } = useAuth()

  if (isWebTelegram) {
    return <WebBlocker />
  }

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <Header />
      <main>{children}</main>
      <Navigation />
    </AppRoot>
  )
}