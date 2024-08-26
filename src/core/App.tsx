import { FC, useEffect, useMemo } from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import { styled } from '@stitches/react'

import { useIntegration } from '@telegram-apps/react-router-integration'
import { initNavigator, useLaunchParams } from '@telegram-apps/sdk-react'
import { AppRoot, FixedLayout } from '@telegram-apps/telegram-ui'

import { Header } from '@/components/Header/Header'
import { Navigation } from "@/components/Navigation" 

import * as Pages from '@/pages'

export const App: FC = () => {
  const lp = useLaunchParams()

  // Navigator layer
  const navigator = useMemo(() => initNavigator('app-navigation-state'), [])
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    navigator.attach()
    return () => navigator.detach()
  }, [navigator])

  const Top = styled(FixedLayout, {
    zIndex: 1000,
  })
  const Bottom = styled(FixedLayout, {
    zIndex: 1000,
  })
  const platform = ['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'
  return (
    <AppRoot
      appearance={'dark'}
      platform={platform}>
      <Router location={location} navigator={reactNavigator}>
       <Top vertical="top" >
         <Header />
        </Top>
        <Main>
          <Routes>
            {Object.entries(Pages).map(([key, component]) => (
              <Route key={key} path={key} Component={component} />
            ))}
            <Route path={"*"} element={<Navigate to="/" replace />} />
          </Routes>
      
        </Main>
        <Bottom vertical="bottom">
          <Navigation />
        </Bottom>
      </Router>
    </AppRoot>
  )
}


const Main = styled('main', {
  padding: '110px 16px 114px',
  overflowY: 'auto',
});