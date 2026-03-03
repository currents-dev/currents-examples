import { expect } from "@playwright/test";
import { test } from "./test.ts";

test.describe("Home Page", () => {
  test("should display header", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toHaveText("Portfolio, made simple!");
  });

  test("should display alert when clicking the button", async ({ page }) => {
    const retryCount = test.info().retry;

    await page.goto("/");

    if (retryCount === 0) {
      console.log("Simulating failure on the first attempt.", retryCount);
      await expect(page.locator("#fake-id")).toBeVisible();
    } else {
      console.log("Test is passing on the second attempt.");
      await page.click("#theme-toggle");
      await page.waitForTimeout(2000);
      await expect(page.locator("html")).toHaveClass(/dark/);
    }
  });
});
