import { expect, test } from "./base";

test("basic C", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  const title = await page.title();
  expect(title).toBe(
    "Fast and reliable end-to-end testing for modern web apps | Playwright"
  );
});
