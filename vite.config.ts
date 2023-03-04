import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
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
      splitVendorChunkPlugin(),
      ViteEjsPlugin({
        module: '/src/client/index.tsx',
        title: '買えるオーガニック',
      }),
      process.env.BUNDLE_ANALYZER === 'true' ? visualizer() : null,
    ],
  };
});
