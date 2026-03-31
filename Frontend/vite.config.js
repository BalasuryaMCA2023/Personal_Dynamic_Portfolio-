import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': 'http://localhost:8080' 
    },
    historyApiFallback: true
  },

  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('@mui') || id.includes('lucide-react') || id.includes('react-icons') || id.includes('bootstrap')) {
              return 'vendor-ui';
            }
            return 'vendor'; // all other node_modules
          }
        }
      }
    }
  }
})
