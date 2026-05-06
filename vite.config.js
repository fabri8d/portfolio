import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    ...(mode !== 'test' ? [vuetify({ autoImport: true })] : []),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    globals: true,
    css: false,
    deps: {
      inline: ['vuetify', '@vueuse/motion'],
    },
  },
}))
