import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/project-manager-hexagonal/',
  server: {
    port: 5173,
    proxy: {
      // Optional: proxy API requests to backend during development
      // '/api': {
      //   target: 'http://localhost:8000',
      //   changeOrigin: true,
      // },
    },
  },
});
