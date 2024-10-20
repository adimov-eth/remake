import '@/shared/utils/mockEnv';
import * as Sentry from "@sentry/react";

import { retrieveLaunchParams, User as $User} from '@telegram-apps/sdk-react';



export type User = $User

export const launchParams = retrieveLaunchParams();

type LaunchParams = typeof launchParams;

if (!launchParams.initDataRaw || !launchParams.initData || !launchParams.platform) {
  throw new Error('Invalid launch parameters. The app must be launched from Telegram.');
}

// Destructure and narrow types
export const initDataRaw: NonNullable<LaunchParams['initDataRaw']> = launchParams.initDataRaw;
export const initData: NonNullable<LaunchParams['initData']> = launchParams.initData;
export const platform: NonNullable<LaunchParams['platform']> = launchParams.platform;


export const isDesktop = platform === 'desktop';

Sentry.setTag("platform", platform);

if (initData.user && initData.user.id) {
  const userData = initData.user;
  Sentry.setUser({ id: userData.id, username: userData.username, ip_address: "{{auto}}"});
  Sentry.setContext("init_tg_data", userData);
}
