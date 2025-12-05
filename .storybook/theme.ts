import { create } from "storybook/theming/create";
import pkg from "../package.json";

// Dark theme
export const darkTheme = create({
  base: "dark",
  brandTitle: `Gridular v${pkg.version}`,
  brandTarget: "_self",
  brandImage: "/app/logo.svg",
  brandUrl: "https://github.com/mkteagle/gridular",

  // Color palette
  colorPrimary: "#2563eb",
  colorSecondary: "#60a5fa",

  // UI
  appBg: "#121314",
  appContentBg: "#1a1c1e",
  appBorderColor: "#2e2e2e",
  appBorderRadius: 8,

  // Text colors - ensuring proper contrast
  textColor: "#e6e6e6",
  textInverseColor: "#121314",
  textMutedColor: "#999999",

  // Form colors
  inputBg: "#2e2e2e",
  inputBorder: "#4a4a4a",
  inputTextColor: "#e6e6e6",
  inputBorderRadius: 4,

  // Toolbar colors
  barTextColor: "#999999",
  barSelectedColor: "#60a5fa",
  barBg: "#1a1c1e",

  // Button colors
  buttonBg: "#2563eb",
  buttonBorder: "#2563eb",
  booleanSelectedBg: "#2563eb",
});

// Light theme
export const lightTheme = create({
  base: "light",
  brandImage: "/app/logo.svg",
  brandTitle: `Gridular v${pkg.version}`, // Add version to light theme too
  brandTarget: "_self",
  brandUrl: "https://github.com/mkteagle/gridular",

  // Color palette
  colorPrimary: "#2563eb",
  colorSecondary: "#3b82f6",

  // UI
  appBg: "#f8f9fa",
  appContentBg: "#ffffff",
  appBorderColor: "#e2e8f0",
  appBorderRadius: 8,

  // Text colors
  textColor: "#1e293b",
  textInverseColor: "#ffffff",
  textMutedColor: "#64748b",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#cbd5e1",
  inputTextColor: "#1e293b",
  inputBorderRadius: 4,

  // Toolbar colors
  barTextColor: "#64748b",
  barSelectedColor: "#2563eb",
  barBg: "#f1f5f9",

  // Button colors
  buttonBg: "#2563eb",
  buttonBorder: "transparent",
  booleanSelectedBg: "#2563eb",
});

// Default theme (export dark theme as default)
export default darkTheme;
