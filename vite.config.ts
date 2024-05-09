import path from 'path';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@services': path.resolve(__dirname, './src/services'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hocs': path.resolve(__dirname, './src/hocs'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: { ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    }),
    federation({
      name: 'team-poker-app',
      remotes: {
        'ui-kit': 'http://localhost:5000/assets/ui-kit.js',
      },
      shared: ['react', 'styled-components'],
    }),
  ],
});
