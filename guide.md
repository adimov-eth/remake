# Comprehensive Guide: Telegram Mini App with Vite, React, TypeScript, and Cloudflare Workers

This guide will walk you through the process of setting up a Telegram Mini App using Vite, React, and TypeScript, with server-side rendering (SSR) implemented via Cloudflare Workers and KV storage.

## Prerequisites

- Node.js and npm installed
- A Telegram Bot Token
- A Cloudflare account

## 1. Initial Setup

First, create a new Vite project with React and TypeScript:

```bash
npm create vite@latest my-telegram-app -- --template react-ts
cd my-telegram-app
npm install
```

## 2. Install Additional Dependencies

```bash
npm install @twa-dev/sdk
npm install -D wrangler
```

## 3. Cloudflare Worker Setup

### Create a KV Namespace

```bash
npx wrangler kv:namespace create "NOT_STATE"
```

Note the ID returned by this command.

### Create `wrangler.toml`

Create a file named `wrangler.toml` in your project root:

```toml
name = "your-telegram-mini-app"
main = "src/worker/index.ts"
compatibility_date = "2023-06-28"

[site]
bucket = "./dist"

[build]
command = "npm run build"

[build.upload]
format = "service-worker"

[[kv_namespaces]]
binding = "NOT_STATE"
id = "YOUR_KV_NAMESPACE_ID"
```

Replace "YOUR_KV_NAMESPACE_ID" with the ID you received when creating the KV namespace.

### Create Worker Files

Create a new directory for your worker:

```bash
mkdir -p src/worker
```

Create `src/worker/index.ts`:

```typescript
import { validate } from './auth';
import { renderApp } from './render';

export interface Env {
  NOT_STATE: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const initData = url.searchParams.get('initData');

    if (!initData) {
      return new Response('Missing initData', { status: 400 });
    }

    if (!validate(initData)) {
      return new Response('Unauthorized', { status: 401 });
    }

    const parsedInitData = Object.fromEntries(new URLSearchParams(initData));
    const userId = parsedInitData.user ? JSON.parse(parsedInitData.user).id : null;

    let userData = null;
    if (userId) {
      userData = await env.NOT_STATE.get(`user:${userId}`);
      if (userData) {
        userData = JSON.parse(userData);
      }
    }

    const html = await renderApp(initData, userData);
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  },
};
```

Create `src/worker/auth.ts`:

```typescript
import { createHmac } from 'crypto';

export function validate(initData: string): boolean {
  const secret = crypto.subtle.digest('SHA-256', new TextEncoder().encode(process.env.BOT_TOKEN));
  
  const parsed = new URLSearchParams(initData);
  const hash = parsed.get('hash');
  parsed.delete('hash');
  parsed.sort();

  const dataCheckString = Array.from(parsed.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const hmac = createHmac('sha256', secret)
    .update(dataCheckString)
    .digest('hex');

  return hmac === hash;
}
```

Create `src/worker/render.ts`:

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';

export async function renderApp(initData: string, userData: any): Promise<string> {
  const indexHtml = readFileSync(join(__dirname, '../../dist/index.html'), 'utf-8');

  return indexHtml.replace(
    '<div id="root"></div>',
    `<div id="root"></div>
     <script>
       window.INITIAL_DATA = {
         initData: ${JSON.stringify(initData)},
         userData: ${JSON.stringify(userData)}
       };
     </script>`
  );
}
```

## 4. Modify Your React App

Update your main React component (`src/App.tsx`):

```tsx
import React, { useEffect, useState } from 'react';
import { WebApp } from '@twa-dev/sdk';

interface InitialData {
  initData: string;
  userData: any;
}

declare global {
  interface Window {
    INITIAL_DATA?: InitialData;
  }
}

function App() {
  const [initData, setInitData] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (window.INITIAL_DATA) {
      setInitData(window.INITIAL_DATA.initData);
      setUserData(window.INITIAL_DATA.userData);
    } else {
      setInitData(WebApp.initData);
    }
  }, []);

  if (!initData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to Your Telegram Mini App</h1>
      <p>Init Data: {initData}</p>
      {userData && <p>User Data: {JSON.stringify(userData)}</p>}
    </div>
  );
}

export default App;
```

## 5. Update Vite Configuration

Update your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
  ],
  publicDir: './public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // This ensures we generate a single JavaScript file
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    host: true,
  },
});
```

## 6. Update Package Scripts

Update your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "worker:dev": "wrangler dev src/worker/index.ts",
    "worker:deploy": "npm run build && wrangler deploy"
  }
}
```

## 7. Development Workflow

For development:

1. Run your Vite dev server: `npm run dev`
2. In another terminal, run your Worker: `npm run worker:dev`

For production:

1. Build your app: `npm run build`
2. Deploy your Worker: `npm run worker:deploy`

## 8. Environment Variables

Make sure to set your BOT_TOKEN as an environment variable in your Cloudflare Workers settings.

## 9. Testing KV Storage

To test your KV storage, you can add some data:

```bash
npx wrangler kv:key put --binding=NOT_STATE "user:123456" '{"premium": true, "lastVisit": "2023-06-01"}'
```

Replace "123456" with a real Telegram user ID for testing.

## Conclusion

You now have a Telegram Mini App set up with Vite, React, and TypeScript, using Cloudflare Workers for server-side rendering and KV storage. This setup provides a solid foundation for building advanced Telegram Mini Apps with server-side capabilities.

Remember to:
- Replace "your-telegram-mini-app" in `wrangler.toml` with your actual app name.
- Set your BOT_TOKEN in your Cloudflare Workers environment variables.
- Adjust the React component and Worker code as needed for your specific app requirements.

Happy coding!