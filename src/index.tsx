import ReactDOM from 'react-dom/client';
import { postEvent } from '@telegram-apps/sdk-react';
import * as Sentry from "@sentry/react";

const SENTRY_TARGET_DOMAINS = ["localhost", /^https:\/\/*.tonstarsdao\.xyz\//, /^https:\/\/*.42\.works\//];

import { App } from '@app/App.tsx';

import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";

// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
import '@shared/utils/mockEnv.ts';

import '@telegram-apps/telegram-ui/dist/styles.css';
import '@app/styles/global.css';
import React from 'react';

postEvent('web_app_expand');


Sentry.init({
  dsn: "https://8821629c9179afd7378f0619233850f9@o4507655658602496.ingest.us.sentry.io/4508120836145152",
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration(),
    Sentry.captureConsoleIntegration({levels: ['error']}),
    Sentry.sessionTimingIntegration(),
    Sentry.httpClientIntegration({failedRequestTargets: SENTRY_TARGET_DOMAINS}),
  ],
  sendDefaultPii: true,
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: SENTRY_TARGET_DOMAINS,
  // Set profilesSampleRate to 1.0 to profile every transaction.
  // Since profilesSampleRate is relative to tracesSampleRate
  // the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
  // For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
  // results in 25% of transactions being profiled (0.5*0.5=0.25)
  profilesSampleRate: 1.0,
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


ReactDOM.createRoot(document.getElementById('root')!).render(<App />);