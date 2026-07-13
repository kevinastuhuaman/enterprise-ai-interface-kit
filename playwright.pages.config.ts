import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  testMatch: "pages.spec.ts",
  use: { baseURL: "http://127.0.0.1:4174/enterprise-ai-interface-kit/" },
  webServer: {
    command: "cross-env TEST_PAGES=1 astro build && http-server .pages-preview -p 4174 -c-1",
    url: "http://127.0.0.1:4174/enterprise-ai-interface-kit/",
    reuseExistingServer: false,
  },
});
