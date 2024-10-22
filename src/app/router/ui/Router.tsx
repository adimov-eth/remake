import { useEffect } from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useIntegration } from '@telegram-apps/react-router-integration';
import { initNavigator } from '@telegram-apps/sdk-react';
import { useStore } from '@nanostores/react';
import 'react-toastify/dist/ReactToastify.css';
import {
  $isNew,
  $subscribed,
  $initializationStep,
  $isInitialized,
  $gameState,
  $connectionStatus,
  $currentNotification,
} from '@app/stores/state';

import {
  Accelerators,
  Friends,
  Home,
  Missions,
  Profile,
  Settings,
  Swap
} from '@pages';

import { LevelUpModal } from '@features/LevelUpModal';
import { UserStatusBar } from '@widgets/UserStatusBar';
import { Header } from '@widgets/Header';
import { OnboardingStories } from '@widgets/OnboardingStories';

import {
  AchievementNotification,
  ErrorNotification,
  InformationNotification,
  SuccessNotification,
} from '@shared/ui/Notification';

import * as S from './Router.styles';

import * as Sentry from '@sentry/react';

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export const AppRouter = () => {
  const navigator = initNavigator('app-navigation-state');
  const [location, reactNavigator] = useIntegration(navigator);
  const isNew = useStore($isNew);
  const subscribed = useStore($subscribed);
  const initializationStep = useStore($initializationStep);
  const isInitialized = useStore($isInitialized);
  const connectionStatus = useStore($connectionStatus);
  const currentNotification = useStore($currentNotification);

  //TODO: check why this cause redirect
  // useEffect(() => {
  //   navigator.attach();
  //   return () => navigator.detach();
  // }, [navigator]);

  console.table({
    isInitialized,
    subscribed,
    isNew,
    initializationStep,
    gameState: JSON.stringify($gameState.get()),
    connectionStatus,
  });

  useEffect(() => {
    if (currentNotification && !currentNotification.read) {
      switch (currentNotification.type) {
      case 'success':
        SuccessNotification(currentNotification.message);
        break;
      case 'error':
        ErrorNotification(currentNotification.message);
        break;
      case 'info':
        InformationNotification(currentNotification.message);
        break;
      default:
        AchievementNotification(currentNotification.message);
        break;
      }

      $currentNotification.set({ ...currentNotification, read: true });
    }
  }, [currentNotification]);

  return (
    <S.Root>
      <Router location={location} navigator={reactNavigator}>
        {isNew && initializationStep >= 3 ? (
          <OnboardingStories />
        ) : (
          <>
            <S.Top>
              <UserStatusBar />
            </S.Top>
            <S.Main>
              <SentryRoutes>
                <Route path="/" Component={Home} />
                <Route path="friends" Component={Friends} />
                <Route path="/accelerators" Component={Accelerators} />
                <Route path="/missions" Component={Missions} />
                <Route path="/swap" Component={Swap} />
                <Route path="/profile" Component={Profile} />
                <Route path="/settings" Component={Settings} />
                <Route path="*" element={<Navigate to="/" />} />
              </SentryRoutes>
            </S.Main>
            <S.Bottom>
              <Header />
            </S.Bottom>
            <ToastContainer
              toastStyle={{
                backgroundColor: 'transparent',
                width: 'fit-content',
                margin: 'auto',
              }}
            />
            <LevelUpModal />
          </>
        )}
      </Router>
    </S.Root>
  );
};