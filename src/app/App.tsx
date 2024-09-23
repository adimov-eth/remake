import { FC, useEffect } from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useIntegration } from '@telegram-apps/react-router-integration';
import { initNavigator } from '@telegram-apps/sdk-react';
import { useStore } from '@nanostores/react';
import 'react-toastify/dist/ReactToastify.css';

import { styled } from './stitches.config';
import { platform } from './stores/telegram';

import Onboarding from '@/shared/ui/Stories/OnboardingStories';
import { AppRoot, FixedLayout } from '@telegram-apps/telegram-ui';
import { UserStatusBar } from '@widgets/UserStatusBar';
import { Header } from '@shared/ui/Header';
import { Navigation } from '@/shared/ui/Navigation';

import {
  Accelerators,
  Friends,
  Home,
  Missions,
  Profile,
  Settings,
  Swap
} from '@pages'

import {
  $isNew,
  $subscribed,
  $initializationStep,
  $isInitialized,
  $gameState,
  $connectionStatus,
  $currentNotification,
} from './stores/state';

import {
  AchievementNotification,
  ErrorNotification,
  InformationNotification,
  SuccessNotification,
} from '@shared/ui/Notification'

export const App: FC = () => {
  const navigator = initNavigator('app-navigation-state');
  const [location, reactNavigator] = useIntegration(navigator);
  const isNew = useStore($isNew);
  const subscribed = useStore($subscribed);
  const initializationStep = useStore($initializationStep);
  const isInitialized = useStore($isInitialized);
  const connectionStatus = useStore($connectionStatus);
  const currentNotification = useStore($currentNotification)

  //TODO: check why this cause redirect
  useEffect(() => {
    // navigator.attach();
    // return () => navigator.detach();
  }, [navigator]);

  const Top = styled(FixedLayout, { zIndex: 100 });
  const Bottom = styled(FixedLayout, { zIndex: 100 });
  const ui = ['macos', 'ios'].includes(platform) ? 'ios' : 'base';

  const debugInfo = {
    initialized: isInitialized,
    subscribed,
    isNew,
    initializationStep,
    gameState: JSON.stringify($gameState.get()),
    connectionStatus,
  };

  console.table(debugInfo);

  useEffect(() => {
    if (currentNotification && !currentNotification.read) {
      switch (currentNotification.type) {
        case 'success':
          SuccessNotification(currentNotification.message)
          break
        case 'error':
          ErrorNotification(currentNotification.message)
          break
        case 'info':
          InformationNotification(currentNotification.message)
          break
        default:
          AchievementNotification(currentNotification.message)
          break
      }

      $currentNotification.set({ ...currentNotification, read: true })
    }
  }, [currentNotification])

  return (
    <AppRoot appearance={'dark'} platform={ui}>
      <Router location={location} navigator={reactNavigator}>
        {isNew && initializationStep >= 3 ? (
          <Onboarding />
        ) : (
          <>
            <Top vertical="top">
              <UserStatusBar />
            </Top>
            <Main>
              <Routes>
                <Route path="/" Component={Home} />
                <Route path="friends" Component={Friends} />
                <Route path="/accelerators" Component={Accelerators} />
                <Route path="/missions" Component={Missions} />
                <Route path="/swap" Component={Swap} />
                <Route path="/profile" Component={Profile} />
                <Route path="/settings" Component={Settings} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Main>
            <Bottom vertical="bottom">
              <Header>
                <Navigation />
              </Header>
            </Bottom>
            <ToastContainer
              toastStyle={{
                backgroundColor: 'transparent',
                width: 'fit-content',
                margin: 'auto',
              }}
            />
          </>
        )}
      </Router>
    </AppRoot>
  );
};

const Main = styled('main', {
  padding: '110px 16px 114px',
  overflowY: 'auto',
});
