import { expect } from "@playwright/test";
import { test } from "./test.ts";

test.describe("Projects Page", () => {
  test("should display the correct text", async ({ page }) => {
    await page.goto("/projects");

    await expect(page.locator("h1")).toHaveText("Projects");

    await expect(
      page.locator("xpath=//html/body/main/section/div/a[1]/div/p")
    ).toHaveText(
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam veritatis dolorem rem praesentium dicta labore, at laudantium quisquam."
    );
  });
});
