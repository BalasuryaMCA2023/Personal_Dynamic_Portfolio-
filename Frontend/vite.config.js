import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': 'https://dynamic-portfolio-backend-gbv9.onrender.com'
    }
  },

  build: {
    chunkSizeWarningLimit: 1000
  }
})
