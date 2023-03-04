import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

export default defineConfig(async () => {
  return {
    build: {
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      minify: 'esbuild',
      target: 'modules',
    },
    plugins: [
      react(),
      ViteEjsPlugin({
        module: '/src/client/index.tsx',
        title: '買えるオーガニック',
      }),
    ],
  };
});
