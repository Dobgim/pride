import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The root postcss.config.mjs belongs to the unused Next.js scaffold; this
  // app's CSS is plain CSS, so disable PostCSS config discovery.
  css: { postcss: {} },
})
