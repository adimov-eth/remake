import { FC, useEffect, useMemo } from 'react'
import { createRouterConfig } from 'tma-wouter-integration'
import {
  initNavigator,
  useLaunchParams,
} from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { Router, Route, Switch, Redirect } from 'wouter'

import { routes } from '@/navigation/routes'
import { useConnection } from "@/providers/connectionProvider"

import Header from '@/components/Header'
import Navigation from '@/components/Navigation'

export const App: FC = () => {
  console.log('app')
  const lp = useLaunchParams()

  // Connection layer
  const { connectionStatus } = useConnection()
  useEffect(() => {
    console.log('App: Connection status changed to', connectionStatus)
  }, [connectionStatus])

  // Navigator layer
  const navigator = useMemo(() => initNavigator('app-navigation-state'), [])
  const routerConfig = createRouterConfig(navigator)

  useEffect(() => {
    navigator.attach()
    return () => navigator.detach()
  }, [navigator])


  return (

    <AppRoot
      appearance={'dark'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}>
      
          <Header />
          <main>
            <Router {...routerConfig}>
              <Switch>
                {routes.map((route) => (
                  <Route key={route.path} path={route.path} component={route.Component} />
                ))}
                <Route path="*">
                <Redirect to="/" />
                </Route>
              </Switch>
            </Router>
          </main>
          <Navigation />
    </AppRoot>
  )
}






  

