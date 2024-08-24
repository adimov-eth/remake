import { atom } from 'nanostores'

import { IngameNotification } from '@/services/websocket/protocol'

interface currentNotificationType extends IngameNotification {
  read?: boolean
}

export const $currentNotification = atom<currentNotificationType | null>(null)
