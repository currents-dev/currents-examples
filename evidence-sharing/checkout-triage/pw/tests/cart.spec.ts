import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("cart badge updates after adding gift wrap", async ({ page }) => {
  await expect(page.locator("#cart-badge")).toHaveText("3");
  await page.getByRole("button", { name: "Add gift wrap" }).click();
  await expect(page.locator("#cart-badge")).toHaveText("4", { timeout: 600 });
});
