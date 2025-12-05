// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: FlatCompat.recommendedConfig,
  allConfig: FlatCompat.allConfig,
});

const eslintConfig = [// Add language options for parsing modern JavaScript
{
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
}, // Include Next.js configs
...compat.extends("next/core-web-vitals", "next/typescript"), // Add custom rules
{
  files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "import/no-anonymous-default-export": "off",
    // Add any other rules you want to customize
  },
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
