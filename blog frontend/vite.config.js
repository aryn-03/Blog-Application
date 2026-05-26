import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    // Proxy configuration to avoid CORS issues in development
    proxy: {
      '/common-api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/user-api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/author-api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})
