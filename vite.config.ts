import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({})],
  base: './',
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: {
      '@/': path.join(__dirname, './src/')
    }
  }
})
