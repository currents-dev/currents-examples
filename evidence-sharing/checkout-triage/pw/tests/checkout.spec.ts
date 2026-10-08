import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("cart shows 3 items", async ({ page }) => {
  await expect(page.locator(".item")).toHaveCount(3);
});

test("header shows the signed-in viewer", async ({ page }) => {
  await expect(page.locator("#viewer")).toHaveText("Signed in as Ana");
});

test("an invalid discount code shows an error", async ({ page }) => {
  await page.getByLabel("Discount code").fill("NOPE");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.locator("#discount-status")).toHaveText(
    "NOPE is not a valid code",
  );
});

test("SAVE10 takes 10% off the total", async ({ page }) => {
  await page.getByLabel("Discount code").fill("save10");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.locator("#total")).toHaveText("$206.55");
});
