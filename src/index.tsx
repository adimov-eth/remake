import ReactDOM from 'react-dom/client';
import { postEvent } from '@telegram-apps/sdk-react';

import { Root } from '@app/Root.tsx';

// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
import '@shared/utils/mockEnv.ts';

import '@telegram-apps/telegram-ui/dist/styles.css';
import '@app/styles/global.css';

postEvent('web_app_expand');

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
