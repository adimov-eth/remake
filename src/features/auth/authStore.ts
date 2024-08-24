import { InitDataParsed } from '@telegram-apps/sdk-react'
import { parseInitData } from '@telegram-apps/sdk-react'
import { computed, atom } from 'nanostores'

export const $telegramProvideRawData = atom('')

export const $telegramAuthData = computed(
  $telegramProvideRawData,
  (telegramProvideRawData: string) => {
    console.log('telegramProvideRawData:', telegramProvideRawData)
    if (telegramProvideRawData) {
      return parseInitData(telegramProvideRawData) as InitDataParsed
    }
  }
)

export const $telegramUser = computed(
  $telegramAuthData,
  (telegramAuthData: InitDataParsed | undefined) => {
    console.log('telegramAuthData for computed $telegramUser', telegramAuthData)
    if (telegramAuthData && telegramAuthData.user) {
      return telegramAuthData.user
    }
  }
)

export const setTelegramProvideRawData = (rawData: string) => {
  $telegramProvideRawData.set(rawData)
}