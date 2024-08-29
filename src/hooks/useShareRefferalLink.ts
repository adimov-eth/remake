import { useCallback } from 'react'

import { useStore } from '@nanostores/react'
import { useUtils } from '@telegram-apps/sdk-react'

import { user } from '@/stores/state'

const APP_URL = import.meta.env.VITE_APP_URL

const useShareRefferalLink = (
  text = 'Join me in this awesome clicker game!'
) => {
  const utils = useUtils()
  const telegramUser = useStore(user)
  const buildShareUrl = useCallback(() => {
    if (!telegramUser) return
    return `${APP_URL}?startapp=refid${telegramUser.id}`
  }, [telegramUser])

  const handleShare = useCallback(() => {
    const botStartUrlWithRefId = buildShareUrl()
    const shareUrl = `https://t.me/share/url?url=${botStartUrlWithRefId}&text=${text}`
    utils.openTelegramLink(shareUrl)
  }, [telegramUser, utils])

  return {
    handleShare,
    buildShareUrl,
  }
}

export default useShareRefferalLink
