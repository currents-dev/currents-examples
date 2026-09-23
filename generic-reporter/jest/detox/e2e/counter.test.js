const { device, element, by, expect } = require("detox");
const { signIn } = require("./signIn");

describe("Counter", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await signIn("demo@currents.dev", "currents");
  });

  it("counts taps", async () => {
    await element(by.id("increment")).multiTap(3);
    await expect(element(by.id("count"))).toHaveText("3");
  });

  it("resets the count", async () => {
    await element(by.id("increment")).multiTap(2);
    await element(by.id("reset")).tap();
    await expect(element(by.id("count"))).toHaveText("0");
  });

  // Fails on every run, to show the screenshot, video and logs of a failure.
  it("counts to ten", async () => {
    await element(by.id("increment")).multiTap(9);
    await expect(element(by.id("count"))).toHaveText("10");
  });
});
