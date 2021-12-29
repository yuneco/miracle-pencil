import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import {theme} from './src/consts/theme'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    manifest: {
      name: "Miracle Pencil",
      icons: [{
        src: "favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable"
      }],
      theme_color: theme.themeColor
    },
  })],
  base: './',
  build: {
    outDir: 'build'
  },
  resolve: {
    alias: {
      '@/': path.join(__dirname, './src/')
    }
  },
})
