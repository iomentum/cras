import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const resolve = require('path').resolve;

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [vue()]
})
