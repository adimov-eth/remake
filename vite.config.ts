import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
// import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',

  plugins: [
    // Allows using React dev server along with building a React application with Vite.
    // https://npmjs.com/package/@vitejs/plugin-react-swc
    react(),
    // Allows using the compilerOptions.paths property in tsconfig.json.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths(),
    // Allows using self-signed certificates to run the dev server using HTTPS.
    // https://www.npmjs.com/package/@vitejs/plugin-basic-ssl
    // basicSsl(),
    svgr(),
    sentryVitePlugin({
      org: "self-made-6w",
      project: "tonstars"
    })
  ],

  publicDir: './public',

  server: {
    // Exposes your dev server and makes it accessible for the devices in the same network.
    host: true,
  },

  build: {
    sourcemap: true
  }
});