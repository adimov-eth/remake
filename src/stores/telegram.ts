import '@/utils/mockEnv'

import { retrieveLaunchParams, User as $User} from '@telegram-apps/sdk-react'



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
