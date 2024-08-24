import ReactDOM from 'react-dom/client';

import { Root } from '@/core/Root';

// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
import './mockEnv.ts';

import '@telegram-apps/telegram-ui/dist/styles.css';
import '@/shared/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<Root/>);
