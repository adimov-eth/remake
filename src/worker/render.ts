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