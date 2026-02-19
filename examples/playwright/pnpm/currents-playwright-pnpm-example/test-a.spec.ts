import { expect, test } from "./base";

test("basic A", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  const title = await page.title();
  // reduce font size
  await page.addStyleTag({ content: "body { font-size: 10px; }" });
  expect(title).toBe("Playwright");
});
