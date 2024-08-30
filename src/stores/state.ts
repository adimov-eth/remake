import { atom, computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import { ClickerState, SerializedState, UPGRADES, LEVELS } from '@/services/websocket/clicker';
import { ConnectionStatus } from '@/types/connectionStatus';
import { IngameNotification } from '@/services/websocket/protocol';
import Transport from '@/services/websocket/transport';
import { User } from '@/stores/types';
import { initDataRaw } from '@/stores/telegram';

const adapter = {
  encode: JSON.stringify,
  decode: JSON.parse,
};

// Game State
export const $gameState = atom<ClickerState | null>(null);
export const $localState = persistentAtom<SerializedState | null>('localState', null, adapter);

// User State
export const $isNew = persistentAtom<boolean>('isNew', true, adapter);
export const $user = persistentAtom<User | null>('user', null, adapter);

// Connection State
export const $connectionStatus = atom<ConnectionStatus>('offline');

// Notifications
export const $ingameNotifications = atom({ notifications: [] as IngameNotification[], cursor: 0 });
export const $currentNotification = atom<IngameNotification | null>(null);

// Initialization State
export const $initializationStep = atom<number>(0);
export const $initializationError = atom<string | null>(null);
export const $isInitialized = computed($initializationStep, step => step === 5);

// Transport
const transportUrl = new URL(import.meta.env.VITE_WS_URL);
transportUrl.searchParams.set('rawData', initDataRaw);

export const transport = new Transport(transportUrl.toString());

// Computed states
export const $pfp = computed($user, user => user?.photoUrl || '');

export const $level = computed($gameState, state => {
  if (!state) return 0;
  const currentLevel = state.level.get();
  return currentLevel > LEVELS.length - 1 ? LEVELS.length - 1 : currentLevel;
});

export const $accelerators = computed($gameState, state => {
  if (!state) return [];
  const currentLevel = state.level.get();
  const currentEnergyLimit = state.energyLimit.get();
  const currentUpgrades = state.upgrades.get();

  return Object.entries(UPGRADES).map(([slug, { name, description, price, isEnabled }]) => {
    const { tier = 1 } = currentUpgrades.find(u => u.slug === slug) || {};

    return {
      slug,
      tier,
      name,
      description,
      price: price({ level: currentLevel, energyLimit: currentEnergyLimit }, tier),
      disabled: !isEnabled({ level: currentLevel }),
    };
  });
});

// Other game-related states (if any)
// ...

// Export any other necessary states or computed values

// Add this line
export const $prefetchedState = atom<SerializedState | null>(null);

// Language State
export const $locale = persistentAtom<string>('locale', 'en', adapter);

export const $storieIndex = persistentAtom<number>('storieIndex', 0, adapter);

export const $subscribed = persistentAtom<boolean>('subscribed', false, adapter);

export const $subscribeButton = atom<'button' | 'clicked' | 'loading'>(
  $subscribed.get() ? 'clicked' : 'button'
);
