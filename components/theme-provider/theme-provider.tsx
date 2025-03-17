import React, { createContext, useContext, useMemo } from "react";
import { ThemeProviderContext } from "../data-grid/types";

// Add default theme values
const defaultTheme: ThemeProviderContext = {
  container: "bg-background border border-border rounded-md overflow-hidden",
  header: "bg-muted/50 border-b border-border",
  headerCell: "text-muted-foreground font-medium px-4 py-3",
  row: "border-b border-border hover:bg-muted/30 transition-colors",
  cell: "px-4 py-2 text-sm",
  pagination:
    "bg-background border-t border-border p-2 flex justify-between items-center",
  filterMenu: "bg-popover border border-border shadow-md rounded-md",
  filterMenuContent: "p-3",
  filterMenuHeader: "font-medium mb-2",
  filterMenuInput: "",
  filterMenuClearButton: "",
  filterMenuApplyButton: "",
  columnResizeHandle:
    "w-1 bg-border hover:bg-primary cursor-col-resize h-full absolute right-0 top-0",
  columnResizeHandleActive: "bg-primary",
  sortIcon: "text-muted-foreground",
  sortIconActive: "text-foreground",
};

// Create a typed context
const ThemeContext = createContext<{ theme: ThemeProviderContext }>({
  theme: defaultTheme,
});

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Partial<ThemeProviderContext>;
}

export const ThemeProvider = ({ children, theme = {} }: ThemeProviderProps) => {
  const value = useMemo(
    () => ({
      theme: Object.keys(defaultTheme).reduce((acc, key) => {
        acc[key as keyof ThemeProviderContext] =
          theme[key as keyof ThemeProviderContext] ?? defaultTheme[key as keyof ThemeProviderContext];
        return acc;
      }, {} as ThemeProviderContext),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
