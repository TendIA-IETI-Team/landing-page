import { defineConfig, devices } from '@playwright/test';

const PORT = 3100;

// Runs against the production build (`pnpm build` first). Acceptance criteria 2–5 of
// docs/design-system/landing-spec.md.
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: process.env.LANDING_URL ?? `http://localhost:${PORT}`,
    locale: 'es-CO',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
    },
  ],
  webServer: process.env.LANDING_URL
    ? undefined
    : { command: 'pnpm start', port: PORT, reuseExistingServer: !process.env.CI, timeout: 60_000 },
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
});
