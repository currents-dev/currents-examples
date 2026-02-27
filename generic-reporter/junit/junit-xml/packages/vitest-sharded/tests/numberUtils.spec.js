import { describe, it, expect } from "vitest";
import { calculateAverage } from "../numberUtils";

describe("calculateAverage", () => {
  it("calculates average of positive numbers", () => {
    expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3);
  });

  it("handles array with single number", () => {
    expect(calculateAverage([5])).toBe(5);
  });

  it("handles empty array", () => {
    expect(calculateAverage([])).toBe(0);
  });

  it("handles negative numbers", () => {
    expect(calculateAverage([-1, -2, -3])).toBe(-2);
  });

  it("handles decimal numbers", () => {
    expect(calculateAverage([1.5, 2.5])).toBe(2);
  });

  it("returns 0 for invalid input", () => {
    expect(calculateAverage(null)).toBe(0);
    expect(calculateAverage(undefined)).toBe(0);
  });
});
