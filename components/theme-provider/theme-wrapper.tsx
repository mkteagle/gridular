import React from "react";
import { ThemeProvider } from "../../components/theme-provider/theme-provider";

interface ThemeWrapperProps {
  children: React.ReactNode;
  customTheme?: Record<string, any>;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({
  children,
  customTheme,
}) => {
  return (
    <ThemeProvider
      initialTssTheme={{
        ...(customTheme || {}),
      }}
    >
      <div>{children}</div>
    </ThemeProvider>
  );
};
