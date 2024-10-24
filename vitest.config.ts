import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)", "**/*.[jt]s?(x)"],
    passWithNoTests: true,
    root: "./",
  },
});
