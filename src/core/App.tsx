import { createRouterConfig } from 'tma-wouter-integration'
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
} from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { FC, useEffect, useMemo } from 'react'
import { Router, Route, Switch, Redirect } from 'wouter'

import { routes } from '@/navigation/routes'

export const App: FC = () => {
  const lp = useLaunchParams()
  const miniApp = useMiniApp()
  const themeParams = useThemeParams()
  const viewport = useViewport()

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams)
  }, [miniApp, themeParams])

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams)
  }, [themeParams])

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport)
  }, [viewport])

  const navigator = useMemo(() => initNavigator('app-navigation-state'), [])
  const routerConfig = useMemo(() => createRouterConfig(navigator), [navigator])

  useEffect(() => {
    navigator.attach()
    return () => navigator.detach()
  }, [navigator])

  return (
    <AppRoot
      appearance={miniApp.isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
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
    </AppRoot>
  )
}