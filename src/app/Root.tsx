import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import { useStore } from '@nanostores/react';
import { QueryClientProvider } from '@tanstack/react-query';
import '../shared/locale/index.ts';

import { App } from './App.tsx';
import { ErrorBoundary } from './ErrorBoundary';
import { CONFIG } from './config';

import { queryClient } from '@shared/services/api/queryClient';

import { $assetsLoaded } from './stores/preload';
import { isDesktop } from './stores/telegram';
import { $initializationStep, $initializationError } from './stores/state';
import { initializeApp } from './stores/initialization';

// import { Loader } from '@/components/Loader/Loader';
import { ErrorDisplay } from '@shared/ui/ErrorDisplay';
import { WebBlocker } from '@shared/ui/WebBlocker';

const Inner: FC = () => {
  const debug = useLaunchParams().startParam === 'debug';
  const initializationStep = useStore($initializationStep);
  const initializationError = useStore($initializationError);
  const imagesLoaded = useStore($assetsLoaded);

  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV && debug) {
      import('eruda').then(lib => lib.default.init());
    }
  }, [debug]);
  if (initializationError) {
    return <ErrorDisplay error={initializationError} />;
  }
  console.log(
    'Initialization Step: ',
    initializationStep,
    ', imagesLoaded: ',
    imagesLoaded,
    ', hasError: ',
    initializationError
  );

  if (initializationStep < 3 || !imagesLoaded) {
    return; //<Loader speed={'slow'} />; // Add the speed prop
  }
  return (
    <TonConnectUIProvider manifestUrl={CONFIG.TON_CONNECT_MANIFEST_URL}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <QueryClientProvider client={queryClient}>
          {isDesktop ? <WebBlocker /> : <App />}
        </QueryClientProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner />
  </ErrorBoundary>
);

const ErrorBoundaryError: FC<{ error: Error | string | unknown }> = ({ error }) => {
  const { t } = useTranslation('global')

  return (
    <div>
      <p>{t('unhandled_error')}:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}
