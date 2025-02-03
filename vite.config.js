import { resolve } from 'path'
import { defineConfig } from 'vite'
import 'dotenv/config'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [
    laravel({
      input: ['src/index.tsx'],
      refresh: [
        'site/templates/**',
        'site/snippets/**',
      ],
      publicDirectory: './',
    }),
    react()
  ],
}))
