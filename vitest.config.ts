import { defineConfig, defaultExclude } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)", "**/*.[jt]s?(x)"],
    exclude: [...defaultExclude, "playground/**/*", "maests/**/*"],
    passWithNoTests: true,
    root: "./",
  },
});
