import { validate } from './auth';
import { renderApp } from './render';

export interface Env {
  TELEGRAM_APP_DATA: KVNamespace;
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

    // Parse initData
    const parsedInitData = Object.fromEntries(new URLSearchParams(initData));
    const userId = parsedInitData.user ? JSON.parse(parsedInitData.user).id : null;

    // Fetch data from KV
    let userData = null;
    if (userId) {
      userData = await env.TELEGRAM_APP_DATA.get(`user:${userId}`);
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