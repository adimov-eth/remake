import ReactDOM from 'react-dom/client';
import { postEvent } from '@telegram-apps/sdk';


import { Root } from '@/core/Root';

// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
import './utils/mockEnv.ts';

import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.css';

postEvent('web_app_expand');

ReactDOM.createRoot(document.getElementById('root')!).render(<Root/>);
