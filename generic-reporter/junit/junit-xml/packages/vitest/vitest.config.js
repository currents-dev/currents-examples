import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: ["default", "junit"],
    testTimeout: 500,
    retry: 3,
  },
});
