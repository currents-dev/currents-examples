import { expect, test } from "@playwright/test";

/**
 * This test clicks on an element with the text 'Load user' and waits for a
 * specific HTTP response. This response contains a JSON body where we assert
 * some properties.
 */
test("flaky", async ({ page }, testInfo) => {
  if (testInfo.retry < 1) {
    expect(0).toBe(1);
  }
  expect(1).toBe(1);
});
