// import { getConnectOptions } from "@azure/microsoft-playwright-testing";
import playwright, { BrowserType, expect, test } from "@playwright/test";

// test.skip("basic test @basic", async ({ page }, testInfo) => {
//   testInfo.annotations.push({
//     type: "testInfo",
//     description: "This is a test info",
//   });
//   await page.goto("https://todomvc.com/examples/backbone/dist/");

//   // Use locators to represent a selector and re-use them
//   const inputBox = page.locator("input.new-todo");
//   const todoList = page.locator(".todo-list");

//   await inputBox.fill("Learn Playwright");
//   await inputBox.press("Enter");
//   await expect(todoList).toHaveText("Learn Playwright");
// });

test("failing test @tag", async ({ page }) => {
  await page.goto("https://todomvc.com/examples/backbone/dist/");

  // Use locators to represent a selector and re-use them
  const inputBox = page.locator("input.new-todo");
  const todoList = page.locator(".todo-list");

  await inputBox.fill("Learn Playwright");
  await inputBox.press("Enter");

  await inputBox.fill("Buy milk");
  await inputBox.press("Enter");

  await inputBox.fill("Do Homework");
  await inputBox.press("Enter");

  await expect(todoList).toHaveText("Non existing text");

  await page.close();
});
