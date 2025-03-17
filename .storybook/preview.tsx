import type { Preview } from "@storybook/react";
import { StoryWrapper } from "./StoryWrapper";
import "../app/globals.css";
import "./storybook.css"; // Import the Storybook-specific CSS
import React from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
};

export default preview;
