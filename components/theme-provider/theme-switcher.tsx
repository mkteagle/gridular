import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "../ui/button";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, setTssTheme, setTailwindTheme } = useTheme();

  // Detect if we're in dark mode based on background color
  const isDarkMode = theme.colors.background === "#121314";

  const toggleTheme = () => {
    if (isDarkMode) {
      // Switch to light theme
      setTssTheme({
        colors: {
          primary: "#2563eb",
          secondary: "#6b7280",
          background: "#ffffff",
          foreground: "#1e1e21",
          muted: "#f1f5f9",
          mutedForeground: "#64748b",
          border: "#e2e8f0",
          popover: "#ffffff",
        },
      });

      setTailwindTheme({
        container: "bg-background border border-border text-foreground",
        cell: "px-4 py-2 text-sm border-border",
        row: "border-b border-border hover:bg-muted/30",
      });
    } else {
      // Switch to dark theme
      setTssTheme({
        colors: {
          primary: "#3b82f6",
          secondary: "#9ca3af",
          background: "#121314",
          foreground: "#f8fafc",
          muted: "#1e293b",
          mutedForeground: "#94a3b8",
          border: "#334155",
          popover: "#1a1c1e",
        },
      });

      setTailwindTheme({
        container: "bg-muted border border-border text-foreground",
        cell: "px-4 py-2 text-sm border-border",
        row: "border-b border-border hover:bg-muted/50",
      });
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className={className}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};
