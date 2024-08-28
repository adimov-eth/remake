import '@/utils/mockEnv'
import { atom } from 'nanostores'

import { retrieveLaunchParams} from '@telegram-apps/sdk-react'

export const launchParams = retrieveLaunchParams();

export const { initDataRaw, initData, platform } = launchParams;

if (!initData) throw new Error('No user provided');

export const user = atom(initData.user);


export const isDesktop = platform === 'desktop';

