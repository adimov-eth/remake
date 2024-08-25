import { FC, useEffect, useMemo } from 'react'
import { useIntegration } from '@telegram-apps/react-router-integration';
import {
  initNavigator,
  useLaunchParams,
} from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { Router, Route, Routes, Navigate } from 'react-router-dom'

import Home from '@/pages/Home'

import { useConnection } from "@/providers/connectionProvider"


import { FixedLayout } from '@telegram-apps/telegram-ui'

import { Header } from '@/components/Header/Header'

export const App: FC = () => {
  const lp = useLaunchParams()

  // Connection layer
  const { connectionStatus } = useConnection()
  useEffect(() => {
    console.log('App: Connection status changed to', connectionStatus)
  }, [connectionStatus])

  // Navigator layer
  const navigator = useMemo(() => initNavigator('app-navigation-state'), [])
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    navigator.attach()
    return () => navigator.detach()
  }, [navigator])


  return (

    <AppRoot
      appearance={'dark'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}>
      <Router location={location} navigator={reactNavigator}>
       <FixedLayout vertical="top" >
         <Header />
      </FixedLayout>
          <main style={{height: '300vh'}}>
            
            
              <Routes>
                <Route path={"/"} Component={Home} />
                <Route path={"*"} element={<Navigate to="/" replace />} />
               
              </Routes>
            
          </main>
          <FixedLayout vertical="bottom" style={{
          background: '#fffffff'
            }}>
          </FixedLayout>
        </Router>
    </AppRoot>
  )
}