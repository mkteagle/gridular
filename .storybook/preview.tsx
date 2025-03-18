import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import { darkTheme, lightTheme } from "./theme";
import "../app/globals.css";
import "./preview.css";
import React from "react";
import { withThemeProvider, ThemedDocsContainer } from "./withThemeProvider";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "auto",
      values: [
        {
          name: "dark",
          value: "#121314",
        },
        {
          name: "light",
          value: "#ffffff",
        },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      container: ThemedDocsContainer,
      theme: darkTheme,
    },
    darkMode: {
      current: "dark",
      light: lightTheme,
      dark: darkTheme,
      darkClass: "dark",
      lightClass: "light",
      stylePreview: true,
    },
  },
  decorators: [
    withThemeProvider,
    (Story, context) => {
      return (
        <div
          className={`storybook-wrapper ${
            context.globals.darkMode ? "dark" : "light"
          }`}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
