import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// API manzili: default — Render'dagi backend.
// Lokal backend bilan ishlamoqchi bo'lsangiz, terminalda:
//   VITE_API_TARGET=http://localhost:3000 npm run dev
const target = process.env.VITE_API_TARGET || 'https://sifat-innvation-technology.onrender.com'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': { target, changeOrigin: true, secure: true },
      '/uploads': { target, changeOrigin: true, secure: true },
    },
  },
})
