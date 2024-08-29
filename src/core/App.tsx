import { FC, useEffect, useMemo } from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import { styled } from '@/core/stitches.config'

import { platform } from '@/stores/telegram'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import { useIntegration } from '@telegram-apps/react-router-integration'
import { initNavigator } from '@telegram-apps/sdk-react'
import { AppRoot, FixedLayout } from '@telegram-apps/telegram-ui'

import { Header } from '@/components/Header/Header'
import { Navigation } from "@/components/Navigation" 

import { routes } from '@/core/Router'


export const App: FC = () => {

  // Navigator layer
  const navigator = useMemo(() => initNavigator('app-navigation-state'), [])
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    navigator.attach()
    return () => navigator.detach()
  }, [navigator])

  const Top = styled(FixedLayout, {
    zIndex: 100,
  })
  const Bottom = styled(FixedLayout, {
    zIndex: 100,
  })

  const ui = ['macos', 'ios'].includes(platform) ? 'ios' : 'base'


  return (
    <AppRoot
      appearance={'dark'}
      platform={ui}>
      <Router location={location} navigator={reactNavigator}>
       <Top vertical="top" >
         <Header />
        </Top>
        <Main>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      
        </Main>
        <Bottom vertical="bottom">
          <Navigation />
        </Bottom>
        <ToastContainer
            toastStyle={{
              backgroundColor: 'transparent',
              width: 'fit-content',
              margin: 'auto',
            }}
          />
      </Router>
    </AppRoot>
  )
}


const Main = styled('main', {
  padding: '110px 16px 114px',
  overflowY: 'auto',
});