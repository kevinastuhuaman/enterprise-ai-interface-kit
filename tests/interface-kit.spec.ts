import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("./");
});

test("renders the decision-first reference workflow", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Enterprise AI needs an interface for uncertainty." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Account onboarding review" })).toBeVisible();
  await expect(page.getByText("Prepare standard onboarding", { exact: true })).toBeVisible();
  await expect(page.getByText("4 required sources", { exact: true })).toBeVisible();
  await expect(page.getByText("Operator", { exact: true }).last()).toBeVisible();
});

test("routes conflicting evidence to review without approval", async ({ page }) => {
  await page.getByRole("button", { name: "Low confidence" }).click();
  await expect(page.getByText("Hold activation and verify the billing entity", { exact: true })).toBeVisible();
  await expect(page.getByText("Unavailable", { exact: true }).last()).toBeVisible();
  await expect(page.getByText("Request billing evidence", { exact: true })).toBeVisible();
  await expect(page.locator('[data-source-status="conflict"]')).toHaveCount(2);
});

test("binds approval to one exact prepared state", async ({ page }) => {
  await page.getByRole("button", { name: "Approval required" }).click();
  await expect(page.getByText("Fresh approval required", { exact: true })).toBeVisible();
  await expect(page.getByText("Bound to state 7D3A", { exact: true })).toBeVisible();
  await expect(page.getByText("15 minutes or any input change", { exact: true })).toBeVisible();
  await expect(page.getByText("Route exact state to approver", { exact: true })).toBeVisible();
});

test("preserves completed work and scopes failure recovery", async ({ page }) => {
  await page.getByRole("button", { name: "Scoped failure" }).click();
  await expect(page.getByRole("heading", { name: "Scoped recovery" })).toBeVisible();
  await expect(page.getByText("Retry only the billing read", { exact: true })).toBeVisible();
  await expect(page.getByText("CRM, order, security review", { exact: true })).toBeVisible();
  await expect(page.getByText("Invalidated", { exact: true })).toBeVisible();
  await expect(page.locator('[data-source-status="preserved"]')).toHaveCount(3);
});

test("shows absence without fabricating a record", async ({ page }) => {
  await page.getByRole("button", { name: "No evidence" }).click();
  await expect(page.getByRole("heading", { name: "No account record found" })).toBeVisible();
  await expect(page.getByText("No source records available", { exact: true })).toBeVisible();
  await expect(page.getByText("Not scored", { exact: true })).toBeVisible();
  await expect(page.getByText("The agent cannot invent or create a record.", { exact: false })).toBeVisible();
});

test("updates explicit role boundaries", async ({ page }) => {
  await page.getByRole("button", { name: "Admin" }).click();
  await expect(page.getByText("Change policy and role assignments", { exact: true })).toBeVisible();
  await expect(page.getByText("Approve a policy change they authored", { exact: true })).toBeVisible();
});

test("provides a working reduced-motion control", async ({ page }) => {
  const toggle = page.getByRole("checkbox", { name: "Reduced motion" });
  await toggle.check();
  await expect(page.locator("[data-interface-kit]")).toHaveClass(/reduced/);
});

test("has no serious accessibility violations or horizontal overflow", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
