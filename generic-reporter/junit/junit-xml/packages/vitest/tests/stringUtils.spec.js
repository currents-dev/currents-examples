import { describe, it, expect } from "vitest";
import { capitalizeWords } from "../stringUtils";

describe("capitalizeWords", () => {
  it("capitalizes first letter of each word", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
  });

  it("handles already capitalized words", () => {
    expect(capitalizeWords("HELLO WORLD")).toBe("Hello World");
  });

  it("handles empty string", () => {
    expect(capitalizeWords("")).toBe("");
  });

  it("handles single word", () => {
    expect(capitalizeWords("javascript")).toBe("Javascript");
  });

  it("handles mixed case input", () => {
    expect(capitalizeWords("hElLo wOrLd")).toBe("Hello World!");
  });

  it("errors on number received", () => {
    expect(capitalizeWords(1)).toBe("Hello World!");
  });
});
