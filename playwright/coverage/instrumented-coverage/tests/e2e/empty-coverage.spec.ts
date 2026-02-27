import { expect } from "@playwright/test";
import { test } from "./test.ts";

test("should produce empty coverage report", async ({ page }) => {
  await page.goto("https://example.com");
  expect(true).toBe(true);
});
