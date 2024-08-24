import { InitDataParsed } from "@telegram-apps/sdk-react"
import { computed } from 'nanostores'

import Transport from '@/services/websocket/transport'

import { $telegramProvideRawData, $telegramAuthData } from "./telegramAuth"

function constructUrlWithQueryParams(
  baseUrl: string,
  params: { [key: string]: string }
): string {
  const url = new URL(baseUrl)
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  )
  return url.toString()
}

export const $transportStore = computed(
  $telegramAuthData,
  (telegramAuthData: InitDataParsed | undefined) => {
    console.log('Computing $transportStore, telegramAuthData:', telegramAuthData)
    if (telegramAuthData && telegramAuthData.user) {
      const queryParams = {
        rawData: $telegramProvideRawData.get(),
      }
      const transportUrl = constructUrlWithQueryParams(
        import.meta.env.VITE_WS_URL,
        queryParams
      )
      console.log('Creating new Transport instance with URL:', transportUrl)
      return new Transport(transportUrl)
    } else {
      console.log('Creating new Transport instance with empty URL')
      return new Transport('')
    }
  }
)

console.log('$transportStore initialized:', $transportStore.get())