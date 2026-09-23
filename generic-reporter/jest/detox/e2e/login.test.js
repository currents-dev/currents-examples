const { device, element, by, expect } = require("detox");
const { signIn } = require("./signIn");

describe("Sign in", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("signs in with the right password", async () => {
    await signIn("demo@currents.dev", "currents");
    await expect(element(by.id("welcome"))).toHaveText("Hi, demo@currents.dev");
  });

  it("shows an error for a wrong password", async () => {
    await signIn("demo@currents.dev", "wrong");
    await expect(element(by.id("login-error"))).toBeVisible();
  });
});
