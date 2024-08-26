import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { type FC, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { App } from '@/core/App.tsx';
import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from '@/core/ErrorBoundary';
import { $imagesLoaded, preload } from "@/stores/preload";
import { isDesktop } from "@/stores/telegram";
import { CONFIG } from './config';
import WebBlocker from '@/components/WebBlocker'

import { queryClient } from '@/services/api/queryClient'

const Inner: FC = () => {
  // SDK layer
  const debug = useLaunchParams().startParam === 'debug';
  

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (import.meta.env.DEV && debug) {
      // Enable DEBUG CONSOLE on mobile/webview
      import('eruda').then((lib) => lib.default.init())
    }
  }, [debug])

  useEffect(() => {
    preload(true)
  }, [])
  
  
  return (
    <TonConnectUIProvider manifestUrl={CONFIG.TON_CONNECT_MANIFEST_URL}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <QueryClientProvider client={queryClient}>
          <PreloadAwareApp />
        </QueryClientProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

const PreloadAwareApp: FC = () => {
  const imagesLoaded = useStore($imagesLoaded);
  console.log('imagesLoaded', imagesLoaded)
  useEffect(() => {
    const loader = document.getElementById('initial-loader')
    if (loader && imagesLoaded) {
      loader.remove()
    }
  }, [imagesLoaded])

  if (!imagesLoaded) {
    return null; // or return a loading indicator
  }

  return isDesktop ? <WebBlocker /> : <App />;
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