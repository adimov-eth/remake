import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import WebApp from '@twa-dev/sdk';
import { useStore } from '@nanostores/react';
import { QueryClientProvider } from '@tanstack/react-query';
import '@shared/locale/index.ts';
import * as Sentry from "@sentry/react";

import { AppRouter } from '@app/router';
import { ErrorProvider } from './providers/ErrorProvider';
import { CONFIG } from './config';

import { queryClient } from '@shared/services/api/queryClient';

import { $assetsLoaded } from './stores/preload';
import { isDesktop } from './stores/telegram';
import { $initializationStep, $initializationError } from './stores/state';
import { initializeApp } from './stores/initialization';

import { ErrorDisplay } from '@shared/ui/ErrorDisplay';
import { WebBlocker } from '@features/WebBlocker/index.ts';

const ErrorBoundary: FC<{ error: Error | string | unknown }> = ({ error }) => {
  const { t } = useTranslation('global');

  const title = t('unhandled_error');

  return <ErrorDisplay title={title} error={error} />;
};

const Inner: FC = () => {
  const debug = useLaunchParams().startParam === 'debug';
  const initializationStep = useStore($initializationStep);
  const initializationError = useStore($initializationError);
  const imagesLoaded = useStore($assetsLoaded);

  useEffect(() => {
    initializeApp();
    WebApp.disableVerticalSwipes();
    WebApp.setHeaderColor('#0B0C14');
    WebApp.setBackgroundColor('#0B0C14');
    WebApp.setBottomBarColor('#0B0C14');
    WebApp.enableClosingConfirmation();
    // WebApp.BackButton.show();
    // WebApp.BackButton.onClick(() => WebApp.close());
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV && debug) {
      import('eruda').then(lib => lib.default.init());
    }
  }, [debug]);

  if (initializationError) return <ErrorDisplay error={initializationError} />;

  console.table({
    initializationStep,
    imagesLoaded,
    initializationError,
  });

  return (
    <TonConnectUIProvider manifestUrl={CONFIG.TON_CONNECT_MANIFEST_URL}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <QueryClientProvider client={queryClient}>
          {isDesktop ? <WebBlocker /> : <AppRouter />}
        </QueryClientProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export const App: FC = Sentry.withProfiler(() => {
  return (
    <ErrorProvider fallback={ErrorBoundary}>
      <Inner />
    </ErrorProvider>
  );
});