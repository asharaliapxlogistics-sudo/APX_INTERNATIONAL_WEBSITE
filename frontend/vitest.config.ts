import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
      include: ['tests/unit/**/*.test.{ts,tsx}'],
      css: false,
      // jsdom is slow to start; a couple of workers is faster and avoids worker start-up timeouts
      maxWorkers: 2,
      testTimeout: 20000,
    },
  }),
)
