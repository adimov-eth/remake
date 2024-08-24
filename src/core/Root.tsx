import { SDKProvider, useLaunchParams, retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { type FC, useEffect, useMemo } from 'react';

import { App } from '@/core/App.tsx';
import { ErrorBoundary } from '@/core/ErrorBoundary';
import { AuthProvider, useAuth } from '@/providers/authProvider';
import { ConnectionProvider } from "@/providers/connectionProvider"
import PreloadProvider, { usePreload } from "@/providers/preloadProvider"
import { $telegramProvideRawData } from "@/stores/telegramAuth";
import { CONFIG } from './config';
import WebBlocker from '@/components/WebBlocker'

const { WEBSOCKET_URL } = CONFIG;

const Inner: FC = () => {
  // SDK layer
  const debug = useLaunchParams().startParam === 'debug';

  // Auth layer
  const { initDataRaw } = retrieveLaunchParams();
  if (initDataRaw) {
    $telegramProvideRawData.set(initDataRaw);
  }

  // Preload layer
  const shouldPreloadImages = useMemo(() => {
    return localStorage.getItem('userShouldSeeStories') !== 'false'
  }, [])

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
          <ConnectionProvider websocketUrl={WEBSOCKET_URL}>
            <PreloadProvider shouldPreload={shouldPreloadImages}>
              <PreloadAwareApp shouldPreloadImages={shouldPreloadImages} />
            </PreloadProvider>
          </ConnectionProvider>
        </AuthProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

const PreloadAwareApp: FC<{ shouldPreloadImages: boolean }> = ({ shouldPreloadImages }) => {
  const { imagesLoaded } = usePreload();
  const { isDesktop } = useAuth();

  useEffect(() => {
    const loader = document.getElementById('initial-loader')
    if (loader && (!shouldPreloadImages || imagesLoaded)) {
      loader.remove()
    }
  }, [shouldPreloadImages, imagesLoaded])

  if (shouldPreloadImages && !imagesLoaded) {
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