import React from "react";
import { ThemeProvider } from "../../components/theme-provider/theme-provider";
import { useDarkMode } from "storybook-dark-mode";

interface ThemeWrapperProps {
  children: React.ReactNode;
  customTheme?: Record<string, any>;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({
  children,
  customTheme,
}) => {
  const isDarkMode = useDarkMode();

  return (
    <ThemeProvider
      initialTssTheme={{
        ...(isDarkMode
          ? {
              colors: {
                background: "#121314",
                foreground: "#f8fafc",
                muted: "#1e293b",
                mutedForeground: "#94a3b8",
                border: "#334155",
              },
            }
          : {}),
        ...(customTheme || {}),
      }}
    >
      <div className={isDarkMode ? "dark" : ""}>{children}</div>
    </ThemeProvider>
  );
};
