import { FC, useEffect } from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { styled } from '@/core/stitches.config';
import { platform } from '@/stores/telegram';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Onboarding from '@/components/Stories/OnboardingStories';
import { useIntegration } from '@telegram-apps/react-router-integration';
import { initNavigator } from '@telegram-apps/sdk-react';
import { AppRoot, FixedLayout } from '@telegram-apps/telegram-ui';
import { Header } from '@/components/Header/Header';
import { Navigation } from '@/components/Navigation';
import Accelerators from '@/pages/Accelerators';
import Friends from '@/pages/Friends';
import Home from '@/pages/Home';
import Missions from '@/pages/Missions';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import SwapPage from '@/pages/Swap';
import { useStore } from '@nanostores/react';
import {
  $isNew,
  $subscribed,
  $initializationStep,
  $isInitialized,
  $gameState,
  $connectionStatus,
} from '@/stores/state';
// import { Loader } from '@/components/Loader/Loader'

export const App: FC = () => {
  const navigator = initNavigator('app-navigation-state');
  const [location, reactNavigator] = useIntegration(navigator);
  const isNew = useStore($isNew);
  const subscribed = useStore($subscribed);
  const initializationStep = useStore($initializationStep);
  const isInitialized = useStore($isInitialized);
  const connectionStatus = useStore($connectionStatus);
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  const Top = styled(FixedLayout, { zIndex: 100 });
  const Bottom = styled(FixedLayout, { zIndex: 100 });
  const ui = ['macos', 'ios'].includes(platform) ? 'ios' : 'base';

  console.log(
    'App render: ',
    'initialized',
    isInitialized,
    ', subscribed',
    subscribed,
    ', new: ',
    isNew,
    ', step: ',
    initializationStep,
    ', gameState: ',
    $gameState.get(),
    ', connectionStatus: ',
    connectionStatus
  );

  return (
    <AppRoot appearance={'dark'} platform={ui}>
      <Router location={location} navigator={reactNavigator}>
        {isNew && initializationStep >= 3 ? (
          <Onboarding />
        ) : (
          <>
            <Top vertical="top">
              <Header />
            </Top>
            <Main>
              <Routes>
                <Route path="/" Component={Home} />
                <Route path="friends" Component={Friends} />
                <Route path="/accelerators" Component={Accelerators} />
                <Route path="/missions" Component={Missions} />
                <Route path="/swap" Component={SwapPage} />
                <Route path="/profile" Component={Profile} />
                <Route path="/settings" Component={Settings} />
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
