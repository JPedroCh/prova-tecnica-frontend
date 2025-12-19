/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  test: {
    globals: true,        // describe, it, expect globais
    environment: 'jsdom', // necessário para testes React
    setupFiles: './tests/setupTests.ts', // opcional
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:8080',
  },
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
