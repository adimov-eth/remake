import { useStore } from '@nanostores/react'
import { $telegramUser } from '@/stores/telegramAuth'
import { $transportStore } from '@/stores/sockets'
import { useMemo } from 'react'
import { useConnection } from "@/providers/connectionProvider"

export const useUserAndGameState = () => {
  const telegramUser = useStore($telegramUser)
  const transport = useStore($transportStore)
  const { connectionStatus } = useConnection()

  return useMemo(() => {
    const clickerState = transport?.$state.get()
    const isLoading = connectionStatus !== 'online' || !transport || !clickerState

    if (isLoading) {
      return {
        isLoading: true,
        error: null,
        data: null,
      }
    }

    const currentLevelDef = clickerState.levelDef.get()
    const quarks = clickerState.quarks.get()
    const stars = clickerState.stars.get()
    const currentRank = currentLevelDef.name
    const profileImage = clickerState.profileImage.get()

    return {
      isLoading: false,
      error: null,
      data: {
        telegramUser,
        currentRank,
        profileImage,
        quarks,
        stars,
      },
    }
  }, [telegramUser, transport, connectionStatus])
}