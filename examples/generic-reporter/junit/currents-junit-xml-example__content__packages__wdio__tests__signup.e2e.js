const { expect } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/secure.page");

describe("My Login application incorrect", () => {
  it("should not login with invalid credentials", async () => {
    await LoginPage.open();

    await LoginPage.login("tomsmith", "123");
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveText(
      expect.stringContaining("You logged into a secure area!")
    );
  });
});
