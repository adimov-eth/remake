import Transport from '@/services/websocket/transport'

import { atom, computed } from "nanostores"

import { initDataRaw } from "./telegram"

import { ClickerState, initClicker, UPGRADES, LEVELS } from '@/services/websocket/clicker'

import { ConnectionStatus } from '@/types/connectionStatus'
export const $connectionStatus = atom<ConnectionStatus>('offline')



interface CustomWindow extends Window {
  state?: object | Promise<object>;
}
declare let window: CustomWindow;

export interface InitStateData {
  data: {
    profile_image: string;
    quarks: number;
    level: number;
    energyReset: number;
    energyResetAt: number;
    upgrades: Array<{
      slug: string;
      tier: number;
      prices: number[];
    }>;
    joinedAt: string;
    userId: string;
    username: string;
    fullName: string;
    stars: number;
    clicks: number;
    isPremium: boolean;
  }
}

export type InitState = Promise<InitStateData> | InitStateData;
export const $initState = atom<InitState>(window.state as InitState);

const initStateData = await $initState.get();
const { quarks, stars, clicks, level } = initStateData.data
const clicker = initClicker(quarks, stars, clicks, level);



export const $gameState = atom<ClickerState>(clicker)

//TODO fix this
export const $level = computed($gameState, ({ level }) => {
  const currentLevel = level.get();
  
  return currentLevel > LEVELS.length - 1 ? LEVELS.length - 1 : currentLevel;
})

export const $ingameNotifications = atom<NotificationStore>({ notifications: [], cursor: 0 })

export const $isLoaded = atom<boolean>(false)
export const $isOnboarding = atom<boolean>(true)

export const $accelerators = computed(
  $gameState,
  ({ level, energyLimit, upgrades }) => {
    const currentLevel = level.get()
    const currentEnergyLimit = energyLimit.get()
    const currentUpgrades = upgrades.get()

    return Object.entries(UPGRADES).map(([slug, { name, description, price, isEnabled }]) => {
      
      const { tier = 1 } = currentUpgrades.find(u => u.slug === slug) || {}

      return {
        slug,
        tier,
        name,
        description,
        price: price({ level: currentLevel, energyLimit: currentEnergyLimit }, tier),
        disabled: !isEnabled({ level: currentLevel }),
      }
    })
  }
)




const transportUrl = new URL(import.meta.env.VITE_WS_URL);
transportUrl.searchParams.set('rawData', initDataRaw);

export const transport = new Transport(transportUrl.toString())






export interface NotificationStore {
  cursor: number
  notifications: IngameNotification[]
}

import { IngameNotification } from '@/services/websocket/protocol'

interface currentNotificationType extends IngameNotification {
  read?: boolean
}

export const $currentNotification = atom<currentNotificationType | null>(null)



