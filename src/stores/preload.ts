import { atom } from 'nanostores'
import { preloadImageURLs } from '@/core/config'

export const $imagesLoaded = atom(false)

const loadImage = (url: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => {
      console.error(`Failed to load: ${url}`)
      resolve()
    }
    img.src = url
  })

export const preload = async (shouldPreload: boolean): Promise<void> => {
  if (!shouldPreload) {
    $imagesLoaded.set(true)
    return
  }

  try {
    await Promise.all(preloadImageURLs.map(loadImage))
    $imagesLoaded.set(true)
  } catch (err) {
    $imagesLoaded.set(true)
    console.error('Failed to load images', err)
  }
}