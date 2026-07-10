import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base: './' penting untuk GitHub Pages agar asset path tidak 404
export default defineConfig({
  plugins: [vue()],
  base: './'
})
