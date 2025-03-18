import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "dist/**",
        "**/*.d.ts",
        "**/*.test.{js,jsx,ts,tsx}",
        "**/*.spec.{js,jsx,ts,tsx}",
        "**/setupTests.{js,jsx,ts,tsx}",
        "storybook/**",
        ".storybook/**",
        "stories/**",
        "**/index.ts",
        "package.json",
        "vite.config.ts",
        "tsconfig.json",
        "vitest.config.ts",
        "postcss.config.mjs",
        "README.md",
        "LICENSE",
        "eslint.config.mjs",
        "components.json",
        "public/**",
        ".next/**",
        ".swc/**",
        "next.config.ts",
        "**/components/ui/**",
      ],
    },
    setupFiles: "./tests/setup.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
