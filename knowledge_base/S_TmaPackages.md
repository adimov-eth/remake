# Telegram Mini Apps SDK

## Core Packages

1. @telegram-apps/sdk: Main SDK for Mini Apps
2. @telegram-apps/sdk-react: React bindings
3. @telegram-apps/init-data-node: Server-side init data utilities

## Key Concepts

- Launch Parameters: Data passed to Mini App on launch
- Init Data: User and context info for Mini App
- Theme Parameters: Telegram app theme colors
- Navigation: Complex mobile-like navigation in web context

## @telegram-apps/sdk

### Installation
```bash
npm i @telegram-apps/sdk

Key Components

BackButton
MainButton
Viewport
ThemeParams
InitData
MiniApp
HapticFeedback
CloudStorage
QRScanner
Utils

**Usage utils

```
import { 
  initBackButton, 
  initMainButton, 
  initViewport, 
  initThemeParams,
  postEvent,
  parseLaunchParams,
  parseInitData
} from '@telegram-apps/sdk';

// Initialize components
const [backButton] = initBackButton();
const [mainButton] = initMainButton();
const [viewport] = await initViewport();
const [themeParams] = initThemeParams();

// Use components
backButton.show();
mainButton.setText('Submit').show();

// Handle viewport changes
viewport.on('change:height', (height) => {
  console.log('New height:', height);
});

// Use theme colors
const bgColor = themeParams.get('bgColor');

// Parse launch parameters
const launchParams = parseLaunchParams(window.location.search);

// Parse init data
const initData = parseInitData(launchParams.initData);

// Call Mini App method
postEvent('web_app_setup_main_button', { 
  text: 'Click me',
  color: '#ff0000'
});
```

**Navigation
import { BrowserNavigator, createBrowserNavigatorFromLocation } from '@telegram-apps/sdk';

// Create navigator
const navigator = createBrowserNavigatorFromLocation({ hashMode: 'slash' });

// Attach to control browser history
await navigator.attach();

// Navigate
navigator.push('/new-page');
navigator.replace({ pathname: '/update', search: '?id=1' });
navigator.back();

// Listen for changes
navigator.on('change', (ev) => {
  console.log('Navigation changed:', ev.to.pathname);
});


@telegram-apps/sdk-react
Usage
import { 
  SDKProvider, 
  useBackButton, 
  useMainButton, 
  useViewport,
  useMiniApp
} from '@telegram-apps/sdk-react';

function App() {
  return (
    <SDKProvider>
      <MyComponent />
    </SDKProvider>
  );
}

function MyComponent() {
  const backButton = useBackButton();
  const mainButton = useMainButton();
  const viewport = useViewport();
  const miniApp = useMiniApp();

  useEffect(() => {
    backButton.show();
    mainButton.setText('Submit').show();

    miniApp.ready();

    return () => {
      backButton.hide();
      mainButton.hide();
    };
  }, []);

  return (
    <div style={{ height: viewport?.height }}>
      {/* Your app content */}
    </div>
  );
}

@telegram-apps/init-data-node
usage
import { validate, sign } from '@telegram-apps/init-data-node';

// Validate init data
const initData = 'query_id=AAHdF6IQAAAAAN0XohDhrOrc&user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22John%22%2C%22last_name%22%3A%22Doe%22%2C%22username%22%3A%22johndoe%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%7D&auth_date=1662771648&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2';

const botToken = '5768337691:AAH5YkoiEuPk8-FZa32hStHTqXiLPtAEhx8';

try {
  validate(initData, botToken);
  console.log('Init data is valid');
} catch (error) {
  console.error('Invalid init data:', error);
}

// Sign custom init data
const customInitData = {
  user: {
    id: 12345,
    first_name: 'John',
    username: 'johndoe',
  },
  start_param: 'test',
};

const signedInitData = sign(customInitData, botToken);
console.log('Signed init data:', signedInitData);