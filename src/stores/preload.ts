import { atom } from 'nanostores'
import { preloadImageURLs } from '@/core/config'

export const $assetsLoaded = atom(false)


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

const checkFontLoaded = (timeout: number = 5000): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        resolve();
      });
    } else {
      // Fallback for browsers that don't support document.fonts
      resolve();
    }

    // Fallback timeout
    setTimeout(() => {
      reject(); // Changed from reject to resolve
    }, timeout);
  });
};

export const preload = async (shouldPreload: boolean): Promise<void> => {
  if (!shouldPreload) {
    $assetsLoaded.set(true)
    return
  }

  try {
    await Promise.all([
      Promise.all(preloadImageURLs.map(loadImage)),
      checkFontLoaded()
    ]);

    $assetsLoaded.set(true)
  } catch (err) {
    $assetsLoaded.set(true)
    console.error('Failed to load images or fonts', err)
  }
}