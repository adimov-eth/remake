import { atom } from 'nanostores';

const DEVICE_TIER_KEY = 'device_tier';

export type DeviceTier = 'low' | 'high' | '';

const getInitialTier = (): DeviceTier => {
  if (typeof localStorage !== 'undefined') {
    return (localStorage.getItem(DEVICE_TIER_KEY) as DeviceTier) || '';
  }
  return '';
};

export const $deviceTier = atom<DeviceTier>(getInitialTier());

export const setDeviceTier = (newTier: DeviceTier) => {
  $deviceTier.set(newTier);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(DEVICE_TIER_KEY, newTier);
  }
};

const categorizeDevice = async (): Promise<DeviceTier> => {
  const iterations: number = 1000000;
  let result = 0;

  const startTime = performance.now();

  for (let i = 0; i < iterations; i++) {
    result += Math.sin(i) * Math.cos(i);
  }

  const endTime = performance.now();
  const performanceScore = endTime - startTime;
  console.log(performanceScore, 'performanceScore (ms)');

  if (result === Infinity) console.log('This should never happen');

  return performanceScore < 40 ? 'high' : 'low';
};

export const initializeDeviceTier = async () => {
  if ($deviceTier.get() !== '') return;

  const newTier = await categorizeDevice();
  setDeviceTier(newTier);
};

initializeDeviceTier();
