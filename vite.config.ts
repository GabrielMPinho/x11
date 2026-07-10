import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // "@" aponta para src/ — imports absolutos e independentes de
      // profundidade (essencial na estrutura multi-página: padrao/ + paginas/).
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
