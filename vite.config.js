import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    hmr: { overlay: false },

    proxy: {
      '/api': {
        target: 'http://185.250.46.144:3000/',
        changeOrigin: true,
      },
    },
  },
})
