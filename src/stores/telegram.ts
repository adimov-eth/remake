import '@/utils/mockEnv'
import { atom } from 'nanostores'

import { retrieveLaunchParams} from '@telegram-apps/sdk-react'


// export const { initDataRaw, initData, platform } = launchParams;

export const launchParams = retrieveLaunchParams();

type LaunchParams = typeof launchParams;

if (!launchParams.initDataRaw || !launchParams.initData || !launchParams.platform) {
  throw new Error('Invalid launch parameters. The app must be launched from Telegram.');
}

// Destructure and narrow types
export const initDataRaw: NonNullable<LaunchParams['initDataRaw']> = launchParams.initDataRaw;
export const initData: NonNullable<LaunchParams['initData']> = launchParams.initData;
export const platform: NonNullable<LaunchParams['platform']> = launchParams.platform;



export const user = atom(initData.user);


export const isDesktop = platform === 'desktop';

