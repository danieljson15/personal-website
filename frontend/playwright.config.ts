import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  timeout: 45000,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:3100/personal-website',
    channel: 'chrome',
    viewport: { width: 1440, height: 1000 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://127.0.0.1:3100/personal-website',
    reuseExistingServer: !process.env.CI,
  },
})
