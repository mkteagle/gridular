import React from "react";
import { ThemeProvider } from "../components/data-grid/theme-provider";

interface StoryWrapperProps {
  children: React.ReactNode;
}

export const StoryWrapper: React.FC<StoryWrapperProps> = ({ children }) => {
  const theme = {
    container: "bg-background border-border",
    header: "bg-muted/50",
    headerCell: "font-medium text-muted-foreground",
    row: "border-b border-border hover:bg-muted/50",
    cell: "p-2",
    pagination: "bg-background border-t border-border",
    filterMenu: "bg-background border border-border shadow-md",
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={`p-6 min-h-screen bg-background text-foreground`}>
        {children}
      </div>
    </ThemeProvider>
  );
};
