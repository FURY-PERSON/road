import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr({ exportAsDefault: true }), react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  define: {
    __IS__DEV__: JSON.stringify(true),
    __API__: JSON.stringify('http://localhost:3005/api'),
    __SETTLEMENT_API__: JSON.stringify('http://localhost:80/api'),
    __PROJECT__: JSON.stringify('frontend')
  },
  css: {
    modules: {
      generateScopedName: '[path][name]__[local]--[hash:base64:5]'
    }
  }
});
