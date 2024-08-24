import { createContext, useContext, FC, ReactNode } from 'react'
import {
  SDKProvider as TelegramSDKProvider,
  useLaunchParams,
  useMiniApp,
  useViewport,
} from '@telegram-apps/sdk-react'

interface SDKContextType {
  lp: ReturnType<typeof useLaunchParams>
  miniApp: ReturnType<typeof useMiniApp>
  viewport: ReturnType<typeof useViewport>
}

const SDKContext = createContext<SDKContextType | undefined>(undefined)

export const SDKProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const lp = useLaunchParams()
  const miniApp = useMiniApp()
  const viewport = useViewport()

  return (
    <TelegramSDKProvider>
      <SDKContext.Provider value={{ lp, miniApp, viewport }}>
        {children}
      </SDKContext.Provider>
    </TelegramSDKProvider>
  )
}

export const useTelegramApp = () => {
  const context = useContext(SDKContext)
  if (context === undefined) {
    throw new Error('useTelegramApp must be used within an SDKProvider')
  }
  return context
}