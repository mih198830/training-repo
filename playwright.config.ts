import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests', // keep provided
    fullyParallel: true, // keep provided
    timeout: 30000, // keep provided
  expect: {
    timeout: 5000, // keep provided
  },
  reporter: 'html', // keep provided
  
  // New requirements
  forbidOnly: !!(globalThis as typeof globalThis & { process?: { env?: { CI?: string } } }).process?.env?.CI,
  retries: 0,
  workers: 1,

  use: {
    locale: 'en-US', // keep provided
    baseURL: 'https://demo-core-react.casino.p6m.tech',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
});