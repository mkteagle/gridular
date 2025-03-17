"use client";

import React, { createContext, useState, useContext } from "react";
import { ThemeProviderContext } from "./types"; // Make sure this import is correct

const defaultTheme: ThemeProviderContext = {
  container: "",
  header: "",
  headerCell: "",
  row: "",
  cell: "",
  pagination: "",
  filterMenu: "bg-popover border shadow-md",
};

const ThemeContext = createContext<{
  theme: ThemeProviderContext;
  setTheme: (theme: Partial<ThemeProviderContext>) => void;
}>({
  theme: defaultTheme,
  setTheme: () => null,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Partial<ThemeProviderContext>;
}

export const ThemeProvider = ({
  children,
  theme: initialTheme,
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<ThemeProviderContext>({
    ...defaultTheme,
    ...initialTheme,
  });

  const setTheme = (newTheme: Partial<ThemeProviderContext>) =>
    setThemeState((prev) => ({ ...prev, ...newTheme }));

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
