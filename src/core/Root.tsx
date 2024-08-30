import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { type FC, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { App } from '@/core/App.tsx';
import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from '@/core/ErrorBoundary';
import { $imagesLoaded } from "@/stores/preload";
import { isDesktop } from "@/stores/telegram";
import { CONFIG } from './config';
import WebBlocker from '@/components/WebBlocker'
import '@/locale/i18n';
import { queryClient } from '@/services/api/queryClient'
import { $initializationStep, $initializationError } from '@/stores/state';
import { initializeApp } from '@/stores/initialization';
import { Loader } from '@/components/Loader/Loader';
import { ErrorDisplay } from '@/components/ErrorDisplay';

const Inner: FC = () => {
  const debug = useLaunchParams().startParam === 'debug';
  const initializationStep = useStore($initializationStep);
  const initializationError = useStore($initializationError);
  const imagesLoaded = useStore($imagesLoaded);

  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV && debug) {
      import('eruda').then((lib) => lib.default.init())
    }
  }, [debug])
  if (initializationError) {
    return <ErrorDisplay error={initializationError} />;
  }
  console.log('Initialization Step: ', initializationStep, imagesLoaded, initializationError)

  if (initializationStep < 3 || !imagesLoaded) {
    return <Loader speed={'slow'} />; // Add the speed prop
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
    <Inner/>
  </ErrorBoundary>
);

const ErrorBoundaryError: FC<{ error: Error | string | unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
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