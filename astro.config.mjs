import { defineConfig } from "astro/config";

const pagesMode = process.env.TEST_PAGES === "1";

export default defineConfig({
  site: "https://kevinastuhuaman.github.io",
  base: "/enterprise-ai-interface-kit",
  output: "static",
  trailingSlash: "always",
  outDir: pagesMode ? ".pages-preview/enterprise-ai-interface-kit" : "dist",
});
