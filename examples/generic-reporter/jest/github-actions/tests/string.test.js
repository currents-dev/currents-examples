const { capitalize, reverse } = require("../src/string");

test('capitalizes "hello" to equal "Hello"', () => {
  expect(capitalize("hello")).toBe("Hello");
});

test('reverses "hello" to equal "olleh"', () => {
  expect(reverse("hello")).toBe("olleh");
});

test('capitalizes "world" to equal "World"', () => {
  expect(capitalize("world")).toBe("World");
});

test('reverses "world" to equal "dlrow"', () => {
  expect(reverse("world")).toBe("dlrow");
});

test('capitalizes "jest" to equal "Jest"', () => {
  expect(capitalize("jest")).toBe("Jest");
});
