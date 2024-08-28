import { validate } from './auth';

export interface Env {
  NOT_STATE: KVNamespace;
  BOT_TOKEN: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const initData = url.searchParams.get('initData');

    // If there's no initData, let Cloudflare Pages handle serving static assets
    if (!initData) {
      return fetch(request);
    }

    if (!await validate(initData, env)) {
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

    // Fetch the index.html file
    const response = await fetch(request);
    const text = await response.text();

    // Modify the HTML to include our initial data
    const modifiedHtml = text.replace(
      '<div id="root"></div>',
      `<div id="root"></div>
       <script>
         window.INITIAL_DATA = {
           initData: ${JSON.stringify(initData)},
           userData: ${JSON.stringify(userData)}
         };
       </script>`
    );

    return new Response(modifiedHtml, {
      headers: response.headers,
    });
  },
};