import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: `https://react-fullstack-api-be-b67713e657b5.herokuapp.com`,
        changeOrigin:true,
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        }
      }
    }
  }
})
