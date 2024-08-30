import { atom } from 'nanostores';
import { preloadAssetURLs } from '@/core/config';

export const $assetsLoaded = atom(false);

type AssetType = 'image' | 'video';
type VideoFormat = 'webm' | 'mp4';

const getVideoFormat = (): VideoFormat =>
  document.createElement('video').canPlayType('video/webm') !== '' ? 'webm' : 'mp4';

const getAssetType = (url: string): AssetType => {
  const extension = url.split('.').pop()?.toLowerCase() || '';
  return ['mp4', 'webm'].includes(extension) ? 'video' : 'image';
};

const createLoader =
  <T extends HTMLImageElement | HTMLVideoElement>(
    elementType: 'img' | 'video',
    loadEvent: keyof HTMLElementEventMap,
    preloadAttr?: 'preload'
  ) =>
  (url: string): Promise<void> =>
    new Promise<void>(resolve => {
      const element = document.createElement(elementType) as T;
      if (preloadAttr && element instanceof HTMLVideoElement) {
        element.preload = 'auto';
      }
      if (element instanceof HTMLVideoElement) {
        element.muted = true;
      }

      const cleanup = () => {
        element.removeEventListener(loadEvent, handleLoad);
        element.removeEventListener('error', handleError);
        if (element instanceof HTMLVideoElement) {
          element.remove();
        }
      };

      const handleLoad = () => {
        cleanup();
        resolve();
      };

      const handleError = () => {
        console.error(`Failed to load ${elementType}: ${url}`);
        cleanup();
        resolve();
      };

      element.addEventListener(loadEvent, handleLoad);
      element.addEventListener('error', handleError);
      element.src = url;
      if (element instanceof HTMLVideoElement) {
        element.load();
      }
    });

const loadImage = createLoader<HTMLImageElement>('img', 'load');
const loadVideo = createLoader<HTMLVideoElement>('video', 'loadeddata', 'preload');

const loadAsset = (url: string): Promise<void> =>
  getAssetType(url) === 'image' ? loadImage(url) : loadVideo(url);

const checkFontLoaded = (timeout: number = 5000): Promise<void> =>
  new Promise(resolve => {
    if ('fonts' in document) {
      document.fonts.ready.then(() => resolve());
    } else {
      resolve();
    }
    setTimeout(resolve, timeout);
  });

const loadAssets = (supportedVideoFormat: VideoFormat): Promise<void[]> =>
  Promise.all(
    preloadAssetURLs.map(url =>
      getAssetType(url) === 'video' && !url.endsWith(supportedVideoFormat)
        ? Promise.resolve()
        : loadAsset(url)
    )
  );

export const preload = async (shouldPreload: boolean): Promise<void> => {
  if (!shouldPreload) {
    $assetsLoaded.set(true);
    return;
  }

  try {
    await Promise.all([loadAssets(getVideoFormat()), checkFontLoaded()]);
    $assetsLoaded.set(true);
  } catch (err) {
    console.error('Failed to load assets or fonts', err);
    $assetsLoaded.set(true);
  }
};
