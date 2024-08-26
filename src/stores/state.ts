import Transport from '@/services/websocket/transport'

import { atom, computed } from "nanostores"

import { initDataRaw } from "./telegram"

import { ClickerState, initClicker, UPGRADES } from '@/services/websocket/clicker'

import { ConnectionStatus } from '@/types/connectionStatus'



export interface NotificationStore {
  cursor: number
  notifications: IngameNotification[]
}

import { IngameNotification } from '@/services/websocket/protocol'

interface currentNotificationType extends IngameNotification {
  read?: boolean
}

export const $currentNotification = atom<currentNotificationType | null>(null)


export const $connectionStatus = atom<ConnectionStatus>('offline')


if (!initDataRaw) throw new Error('No user provided');
const transportUrl = new URL(import.meta.env.VITE_WS_URL);
Object.entries({rawData: initDataRaw}).forEach(([key, value]) => transportUrl.searchParams.set(key, value));

export const transport = new Transport(transportUrl.toString())

const clicker = initClicker()

// Stores

export const $gameState = atom<ClickerState>(clicker)

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
