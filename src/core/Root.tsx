import { SDKProvider, useLaunchParams, retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { type FC, useEffect } from 'react';

import { App } from '@/core/App.tsx';
import { ErrorBoundary } from '@/core/ErrorBoundary';
import { AuthProvider } from '@/features/auth/authProvider';
import { $telegramProvideRawData } from '@/features/auth/authStore';
import { CONFIG } from './config';

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
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

const Inner: FC = () => {
  const debug = useLaunchParams().startParam === 'debug';

  const { initDataRaw } = retrieveLaunchParams()
  $telegramProvideRawData.set(initDataRaw || '')

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (import.meta.env.DEV && debug) {
      // Enable DEBUG CONSOLE on mobile/webview
      import('eruda').then((lib) => lib.default.init())
    }
  }, [debug])

  return (
    <TonConnectUIProvider manifestUrl={CONFIG.TON_CONNECT_MANIFEST_URL}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <AuthProvider>
          <App/>
        </AuthProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner/>
  </ErrorBoundary>
);
