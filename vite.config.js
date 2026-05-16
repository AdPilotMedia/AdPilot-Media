import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3001 },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'motion'
          }
          if (id.includes('node_modules/react-icons')) {
            return 'icons'
          }
          if (id.includes('node_modules/@tsparticles') || id.includes('node_modules/tsparticles')) {
            return 'particles'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
    target: 'esnext',
    minify: 'oxc',
    cssMinify: true,
    reportCompressedSize: false,
  },
})
