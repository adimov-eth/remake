import '@/utils/mockEnv'

import { retrieveLaunchParams} from '@telegram-apps/sdk-react'

export const launchParams = retrieveLaunchParams();

export const { initDataRaw, initData, platform } = launchParams;

if (!initData) throw new Error('No user provided');

export const { user } = initData;

export const isDesktop = platform === 'desktop';

