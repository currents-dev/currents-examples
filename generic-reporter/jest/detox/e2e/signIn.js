const { element, by } = require("detox");

async function signIn(email, password) {
  await element(by.id("email")).typeText(email);
  await element(by.id("password")).typeText(password);
  await element(by.id("login")).tap();
}

module.exports = { signIn };
