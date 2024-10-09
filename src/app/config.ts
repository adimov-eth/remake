export const CONFIG = {
  APP_URL: import.meta.env.VITE_APP_URL || 'https://t.me/clicker_development_bot/app',
  API_URL: import.meta.env.VITE_API_URL || 'https://api.example.com',
  WEBSOCKET_URL: import.meta.env.VITE_WS_URL || 'wss://ws.example.com',
  TON_CONNECT_MANIFEST_URL: new URL('tonconnect-manifest.json', window.location.href).toString(),
};

// TODO: refactor this

// import on1mp4 from '@shared/assets/stories/on1.mp4';
// import on1webm from '@shared/assets/stories/on1.webm';

// import on4mp4 from '@shared/assets/stories/on4.mp4';
// import on4webm from '@shared/assets/stories/on4.webm';

// import on5mp4 from '@shared/assets/stories/on5.mp4';
// import on5webm from '@shared/assets/stories/on5.webm';

// export const preloadAssetURLs = [on1mp4, on1webm, bg2, bg3, on4mp4, on4webm, on5mp4, on5webm, bg6];

import welcomeVideo from '@shared/assets/stories/welcome.webm';
import earnImage from '@shared/assets/stories/bg2.jpg';
import missionsImage from '@shared/assets/stories/bg3.jpg';
import enhanceVideo from '@shared/assets/stories/enhance.webm';
import swapVideo from '@shared/assets/stories/swap.webm';
import joinImage from '@shared/assets/stories/bg6.jpg';

export const preloadAssetURLs = [welcomeVideo, earnImage, missionsImage, enhanceVideo, swapVideo, joinImage];
