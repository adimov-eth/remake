import { persistentAtom } from '@nanostores/persistent'

export const CONFIG = {
  API_URL: import.meta.env.VITE_API_URL || 'https://api.example.com',
  WEBSOCKET_URL: import.meta.env.VITE_WEBSOCKET_URL || 'wss://ws.example.com',
  TON_CONNECT_MANIFEST_URL: new URL('tonconnect-manifest.json', window.location.href).toString()
}

export const appState = persistentAtom('appState', {
  example: 'example' 
}, {
  encode: JSON.stringify,
  decode: JSON.parse,
})



export const preloadImageURLs = [
    'https://bot-assets.fra1.cdn.digitaloceanspaces.com/messages/onboarding-1.webp',
    'https://bot-assets.fra1.cdn.digitaloceanspaces.com/messages/onboarding-2.webp',
    'https://bot-assets.fra1.cdn.digitaloceanspaces.com/messages/onboarding-3.webp',
    'https://bot-assets.fra1.cdn.digitaloceanspaces.com/messages/onboarding-4.webp',
    'https://bot-assets.fra1.cdn.digitaloceanspaces.com/messages/onboarding-5.webp',
    'https://bot-assets.fra1.cdn.digitaloceanspaces.com/messages/onboarding-6.webp',
    'https://bot-assets.fra1.cdn.digitaloceanspaces.com/messages/onboarding-7.webp',
]