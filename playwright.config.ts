import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: true,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4321/enterprise-ai-interface-kit/",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "cross-env TEST_PAGES=1 astro build && http-server .pages-preview -p 4321 -c-1",
    url: "http://127.0.0.1:4321/enterprise-ai-interface-kit/",
    reuseExistingServer: false,
  },
});
