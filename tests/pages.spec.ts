import { expect, test } from "@playwright/test";

test("GitHub Pages base path serves the interactive artifact", async ({ page }) => {
  const response = await page.goto("./");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { name: "Account onboarding review" })).toBeVisible();
});

for (const path of ["llms.txt", "patterns.json", "project.json", "sitemap.xml", "social-preview.png"]) {
  test(`${path} is published at the project base path`, async ({ request }) => {
    const response = await request.get(`./${path}`);
    expect(response.status()).toBe(200);
    expect((await response.text()).length).toBeGreaterThan(80);
  });
}

test("machine-readable resources contain the declared public contract", async ({ request }) => {
  const patternsResponse = await request.get("./patterns.json");
  const patterns = await patternsResponse.json();
  expect(patterns.patterns).toHaveLength(7);
  expect(patterns.roles).toHaveLength(4);
  expect(patterns.states).toHaveLength(5);

  const llms = await (await request.get("./llms.txt")).text();
  expect(llms).toContain("Confidence is decision context, not authority.");
  expect(llms).toContain("All companies, people, policies, identifiers, evidence, and events");
});

test("social metadata uses the real interface capture", async ({ page }) => {
  await page.goto("./");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://kevinastuhuaman.github.io/enterprise-ai-interface-kit/social-preview.png",
  );
});
