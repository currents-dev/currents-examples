const { device, element, by, expect } = require("detox");
const { session } = require("detox/internals");
const { signIn } = require("./signIn");

describe("Sign out", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  // Fails on the first run and passes on the rerun of `detox test --retries`,
  // to show a flaky test.
  it("returns to the sign in screen", async () => {
    await signIn("demo@currents.dev", "currents");
    await element(by.id("logout")).tap();
    const title = session.testSessionIndex === 0 ? "Welcome back" : "Sign in";
    await expect(element(by.text(title))).toBeVisible();
  });
});
