import { expect, test } from "@playwright/test";

test("vis diff", async ({ page }, testInfo) => {
  testInfo.annotations.push({
    type: "testInfo",
    description: "This is a test info",
  });

  await page.goto("https://example.com");

  if (testInfo.retry > 0) {
    // shift h1 element by 10px
    await page.addStyleTag({
      content: "h1 { margin-top: 30px; }",
    });
  } else {
    await page.addStyleTag({
      content: "h1 { margin-top: 1px; }",
    });
  }

  await expect(page).toHaveScreenshot();
});
