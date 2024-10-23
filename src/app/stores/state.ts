import { atom, computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

import { User } from './types';
import { initDataRaw } from './telegram';
import {
  ClickerState,
  SerializedState,
  UPGRADES,
  LEVELS,
  initClicker,
  upgradeEffectUser,
} from '@/shared/services/websocket/clicker';
import { ConnectionStatus } from '@/shared/types/connectionStatus';
import { IngameNotification } from '@/shared/services/websocket/protocol';
import Transport from '@shared/services/websocket/transport';

const adapter = {
  encode: JSON.stringify,
  decode: JSON.parse,
};

// Game State
export const $gameState = atom<ClickerState>(initClicker());

export const $localState = persistentAtom<SerializedState | null>('localState', null, adapter);

// User State
export const $isNew = persistentAtom<boolean>('isNew', true, adapter);
export const $user = persistentAtom<User | null>('user', null, adapter);

// Connection State
export const $connectionStatus = atom<ConnectionStatus>('offline');

// Notifications
export const $ingameNotifications = atom({ notifications: [] as IngameNotification[], cursor: 0 });
// export const $currentNotification = atom<IngameNotification | null>(null);

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
  return Math.min(Math.max(currentLevel - 1, 0), LEVELS.length - 1);
});

export const $quarks = computed($gameState, state => state?.quarks.get() ?? 0);
export const $stars = computed($gameState, state => state?.stars.get() ?? 0);

// const upgradeCards: IAcceleratorCard[] = Object.keys(UPGRADES).map(
//   (upgradeSlug) => {
//     const upgradeDef = UPGRADES[upgradeSlug] as UpgradeDefinition
//     const currentUpgrade = currentUpgrades.find(
//       (upgrade) => upgrade.slug === upgradeSlug
//     )
//     const upgradeMeta = {
//       user: {
//         level: clickerState.level.get(),
//         energyLimit: clickerState.energyLimit.get(),
//       },
//       tier: currentUpgrade?.tier || 0,
//     }

//     return {
//       slug: upgradeSlug,
//       title: upgradeDef.name,
//       description: upgradeDef.description,
//       currency: 'quarks',
//       cost: upgradeDef.price(upgradeMeta.user, upgradeMeta.tier + 1),
//       disabled: !upgradeDef.isEnabled(upgradeMeta.user),
//       tier: upgradeMeta.tier,
//     }
//   }
// )

export const $accelerators = computed($gameState, state => {
  console.log('INIT $accelerators state', state);
  if (!state) return [];
  const currentUpgrades = state.upgrades.get();

  const upgradeUserData: upgradeEffectUser = {
    energyLimit: state.energyLimit.get(),
    quarksPerClick: state.quarksPerClick.get(),
    clicksPerTap: state.clicksPerTap.get(),
    quarks: state.quarks.get(),
    level: state.level.get(),
    energy: state.energy.get(),
    lastFreeRechargeAt: state.lastFreeRechargeAt.get(),
    paidRechargesToday: state.paidRechargesToday.get(),
    lastPaidRechargeResetAt: state.lastPaidRechargeResetAt.get(),
    megaClickExpiresAt: state.megaClickExpiresAt.get(),

  };

  return Object.entries(UPGRADES).map(([slug, { name, description, price, isEnabled }]) => {
    const { tier = 0 } = currentUpgrades.find(u => u.slug === slug) || {};
    console.log('Current upgrades', currentUpgrades);
    return {
      slug,
      tier,
      name,
      description,
      price: price(upgradeUserData, tier + 1),
      disabled: !isEnabled(upgradeUserData),
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

export const $subCheckRetry = persistentAtom<number>('subCheckRetry', 0, adapter);

export const $subscribed = persistentAtom<boolean>('subscribed', false, adapter);

export type TSubscribeButtonState = 'button' | 'clicked' | 'loading';

export const $subscribeButton = atom<TSubscribeButtonState>(
  $subscribed.get() ? 'clicked' : 'button'
);

interface ICurrentNotificationType extends IngameNotification {
  read?: boolean;
}

export const $currentNotification = atom<ICurrentNotificationType | null>(null);

export const $lastActiveNavPath = atom<string>('/');

export const $isVibrationEnabled = atom<boolean>(true);