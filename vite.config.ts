import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  // For development mode, always enable proxy
  const isDev = mode === 'development' || command === 'serve'
  const useProxy = isDev || env.VITE_USE_PROXY === 'true'

  // Debug logging (remove in production)
  console.log('Vite configuration:')
  console.log('Mode:', mode)
  console.log('Command:', command)
  console.log('Is Dev:', isDev)
  console.log('Use Proxy:', useProxy)
  console.log('API Base URL:', env.VITE_API_BASE_URL || 'https://user26614.requestly.tech/test')

  return {
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      port: 3000, // Change this to your desired port
      proxy: useProxy ? {
        '/api': {
          target: env.VITE_API_BASE_URL || 'https://user26614.requestly.tech/test',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      } : undefined
    },
  }
})
