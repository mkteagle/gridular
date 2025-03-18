import React from "react";
import {
  darkTheme as appDarkTheme,
  lightTheme as appLightTheme,
  ThemeProvider,
} from "../components/theme-provider/theme-provider";
import { useEffect, useState } from "react";
import { DocsContainer, DocsContainerProps } from "@storybook/blocks";
import { useDarkMode } from "storybook-dark-mode";

// Decorator for wrapping stories with ThemeProvider
export const withThemeProvider = (Story: any, context: any) => {
  // Use useDarkMode() hook to detect Storybook's dark mode
  const isDarkMode = useDarkMode();

  // Use initial theme based on Storybook's dark mode setting
  const [theme, setTheme] = useState(isDarkMode ? appDarkTheme : appLightTheme);

  // Listen for theme changes
  useEffect(() => {
    setTheme(isDarkMode ? appDarkTheme : appLightTheme);
  }, [isDarkMode]);

  return (
    <ThemeProvider
      initialTssTheme={theme}
      darkMode={isDarkMode}
      initialTailwindTheme={
        isDarkMode
          ? {
              container: "bg-muted border border-border text-foreground",
              cell: "px-4 py-2 text-sm border-border",
              row: "border-b border-border hover:bg-muted/50",
            }
          : {
              container: "bg-background border border-border text-foreground",
              cell: "px-4 py-2 text-sm border-border",
              row: "border-b border-border hover:bg-muted/30",
            }
      }
    >
      <div className={isDarkMode ? "dark" : "light"}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

// Fix for ThemedDocsContainer - create a class component instead
class ThemedDocsContainerClass extends React.Component<
  DocsContainerProps & { children?: React.ReactNode }
> {
  render() {
    // We need to use a context consumer instead of hooks
    return (
      <DocsContainer {...this.props}>
        {this.props.children}
      </DocsContainer>
    );
  }
}

// Export the fixed container
export const ThemedDocsContainer = ThemedDocsContainerClass;
