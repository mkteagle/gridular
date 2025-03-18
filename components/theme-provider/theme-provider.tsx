import { cn } from "@/lib/utils";
import React, { createContext, useContext, useMemo, useState } from "react";
import { createMakeStyles } from "tss-react";

// Export theme interfaces
export type ThemeProviderContext = Record<string, string>;

// Light theme
export const lightTheme: TssTheme = {
  colors: {
    primary: "#2563eb", // blue-600
    secondary: "#6b7280", // gray-500
    background: "#ffffff",
    foreground: "#1e1e21", // slate-950
    muted: "#f1f5f9", // slate-100
    mutedForeground: "#64748b", // slate-500
    border: "#e2e8f0", // slate-200
    popover: "#ffffff",
  },
};

// Dark theme
export const darkTheme: TssTheme = {
  colors: {
    primary: "#3b82f6", // blue-500
    secondary: "#9ca3af", // gray-400
    background: "#121314",
    foreground: "#f8fafc", // slate-50
    muted: "#1e293b", // slate-800
    mutedForeground: "#94a3b8", // slate-400
    border: "#334155", // slate-700
    popover: "#1a1c1e",
  },
};

// TSS theme interface with all properties optional for easier updates
export interface TssTheme {
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    foreground?: string;
    muted?: string;
    mutedForeground?: string;
    border?: string;
    [key: string]: string | undefined; // Allow additional custom colors
  };
  spacing?: number | SpacingFunction;
  // Add more theme properties as needed
  [key: string]: any; // Allow additional custom theme properties
}

// Type for the spacing function
export type SpacingFunction = {
  (value: number): string;
  (topBottom: number, rightLeft: number): string;
  (top: number, rightLeft: number, bottom: number): string;
  (top: number, right: number, bottom: number, left: number): string;
  baseSpacing: number;
  [key: string]: any; // Allow additional properties
};

// Complete TSS theme interface for internal use
interface CompleteTssTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    [key: string]: string; // Allow additional custom colors
  };
  spacing: SpacingFunction;
  [key: string]: any; // Allow additional custom theme properties
}

// Default Tailwind class-based theme
const defaultTailwindTheme: ThemeProviderContext = {
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

// Create the spacing function with the Material-UI style API
const createSpacingFunction = (baseSpacing = 4): SpacingFunction => {
  const spacingFn = ((...args: number[]): string => {
    // If no arguments, return 0
    if (args.length === 0) return "0";

    // Convert each argument to pixels based on the multiplier
    return args
      .map((factor) => (factor === 0 ? "0" : `${factor * baseSpacing}px`))
      .join(" ");
  }) as SpacingFunction;

  // Store baseSpacing in the function
  spacingFn.baseSpacing = baseSpacing;

  return spacingFn;
};

// Default TSS theme values
const defaultTssTheme: CompleteTssTheme = {
  colors: {
    primary: "#2563eb", // blue-600
    secondary: "#6b7280", // gray-500
    background: "#ffffff",
    foreground: "#020617", // slate-950
    muted: "#f1f5f9", // slate-100
    mutedForeground: "#64748b", // slate-500
    border: "#e2e8f0", // slate-200
  },
  spacing: createSpacingFunction(4),
};

// Unified theme interface
export interface UnifiedTheme {
  // Tailwind classes
  classes: ThemeProviderContext;
  // TSS theme values (using the complete type internally)
  colors: CompleteTssTheme["colors"];
  spacing: SpacingFunction;
  [key: string]: any; // Allow additional custom properties
}

// Combined theme interface
export interface ThemeContext {
  theme: UnifiedTheme;
  setTailwindTheme: (theme: Partial<ThemeProviderContext>) => void;
  setTssTheme: (theme: TssTheme) => void; // Using the optional interface for updates
  resetTheme: () => void;
  toggleThemeMode: () => void; // New function to toggle between light/dark modes
}

// Create a default unified theme for the context
const defaultUnifiedTheme: UnifiedTheme = {
  classes: defaultTailwindTheme,
  colors: defaultTssTheme.colors,
  spacing: defaultTssTheme.spacing,
};

// Create context for the theme
const ThemeContext = createContext<ThemeContext>({
  theme: defaultUnifiedTheme,
  setTailwindTheme: () => {},
  setTssTheme: () => {},
  resetTheme: () => {},
  toggleThemeMode: () => {}, // Add default no-op implementation
});

// Props for the theme provider
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTailwindTheme?: Partial<ThemeProviderContext>;
  initialTssTheme?: TssTheme;
  darkMode?: boolean; // Optional prop to initialize with dark mode
}

export const ThemeProvider = ({
  children,
  initialTailwindTheme = {},
  initialTssTheme = {},
  darkMode = false,
}: ThemeProviderProps) => {
  // Initialize with base theme according to darkMode prop
  const baseTheme = darkMode ? darkTheme : lightTheme;

  // State for storing theme overrides
  const [tailwindTheme, setTailwindThemeState] =
    useState<Partial<ThemeProviderContext>>(initialTailwindTheme);

  const [tssTheme, setTssThemeState] = useState<TssTheme>(() => {
    // Handle spacing config in initial theme
    const { spacing, ...rest } = initialTssTheme;

    // Process the spacing value if it exists
    const processedSpacing =
      spacing !== undefined
        ? typeof spacing === "number"
          ? createSpacingFunction(spacing)
          : spacing
        : undefined;

    return {
      ...baseTheme, // Start with the appropriate base theme
      ...rest, // Apply any customizations
      ...(processedSpacing && { spacing: processedSpacing }),
    };
  });

  // Theme control functions
  const setTailwindTheme = (newTheme: Partial<ThemeProviderContext>) => {
    setTailwindThemeState((prev) => ({
      ...prev,
      ...newTheme,
    }));
  };

  const setTssTheme = (newTheme: TssTheme) => {
    setTssThemeState((prev) => {
      // Make a copy of the previous state
      const updatedTheme: TssTheme = { ...prev };

      // Handle colors separately for deep merging
      if (newTheme.colors) {
        updatedTheme.colors = {
          ...(prev.colors || {}),
          ...newTheme.colors,
        };
      }

      // Handle spacing - could be a number, function, or undefined
      if (newTheme.spacing !== undefined) {
        if (typeof newTheme.spacing === "number") {
          // If it's a number, create a spacing function with that base value
          updatedTheme.spacing = createSpacingFunction(newTheme.spacing);
        } else {
          // Otherwise, use it directly
          updatedTheme.spacing = newTheme.spacing;
        }
      }

      // Copy any other properties
      const otherKeys = Object.keys(newTheme).filter(
        (key) => key !== "colors" && key !== "spacing"
      );

      otherKeys.forEach((key) => {
        (updatedTheme as any)[key] = (newTheme as any)[key];
      });

      return updatedTheme;
    });
  };

  const resetTheme = () => {
    setTailwindThemeState(initialTailwindTheme);
    setTssThemeState(() => {
      // Handle spacing config in initial theme
      const { spacing, ...rest } = initialTssTheme;

      // Process the spacing value if it exists
      const processedSpacing =
        spacing !== undefined
          ? typeof spacing === "number"
            ? createSpacingFunction(spacing)
            : spacing
          : undefined;

      return {
        ...baseTheme, // Reset to the base theme
        ...rest,
        ...(processedSpacing && { spacing: processedSpacing }),
      };
    });
  };

  // New function to toggle between light and dark modes
  const toggleThemeMode = () => {
    setTssThemeState((prev) => {
      // Determine current mode based on background color
      const isDarkMode =
        prev.colors?.background === darkTheme.colors?.background;

      // Select the opposite theme as the base
      const newBaseTheme = isDarkMode ? lightTheme : darkTheme;

      // Apply the new base theme while preserving any custom settings
      return {
        ...prev,
        colors: {
          ...newBaseTheme.colors,
          // Preserve any custom colors that don't exist in base themes
          ...Object.fromEntries(
            Object.entries(prev.colors || {}).filter(
              ([key]) => !(key in newBaseTheme.colors!)
            )
          ),
        },
      };
    });

    // Update Tailwind classes to match the new theme mode
    setTailwindThemeState((prev) => {
      const isDarkMode =
        tssTheme.colors?.background === darkTheme.colors?.background;

      // Apply different hover effects based on theme
      const rowClass = isDarkMode
        ? "border-b border-border hover:bg-muted/30 transition-colors"
        : "border-b border-border hover:bg-muted/50 transition-colors";

      return {
        ...prev,
        row: rowClass,
        // Other class adjustments as needed
      };
    });
  };

  // Merge themes
  const value = useMemo(() => {
    // Merge tailwind theme - safely handle properties
    const mergedTailwindTheme = Object.keys(defaultTailwindTheme).reduce(
      (acc, key) => {
        const k = key as keyof ThemeProviderContext;
        acc[k] =
          tailwindTheme[k] !== undefined
            ? cn(defaultTailwindTheme[k], tailwindTheme[k])
            : defaultTailwindTheme[k];
        return acc;
      },
      {} as ThemeProviderContext
    );

    // Merge TSS theme - safely handle properties
    const mergedTssTheme = {
      colors: {
        ...defaultTssTheme.colors,
        ...(tssTheme.colors || {}),
      },
      spacing: tssTheme.spacing || defaultTssTheme.spacing,
    };

    // Merge any additional custom properties
    const otherKeys = Object.keys(tssTheme).filter(
      (key) => key !== "colors" && key !== "spacing"
    );

    const extraProperties: Record<string, any> = {};
    otherKeys.forEach((key) => {
      extraProperties[key] = tssTheme[key];
    });

    // Create unified theme
    const unifiedTheme: UnifiedTheme = {
      classes: mergedTailwindTheme,
      colors: mergedTssTheme.colors as CompleteTssTheme["colors"],
      spacing: mergedTssTheme.spacing as SpacingFunction,
      ...extraProperties,
    };

    return {
      theme: unifiedTheme,
      setTailwindTheme,
      setTssTheme,
      resetTheme,
      toggleThemeMode, // Include the new toggle function
    };
  }, [tailwindTheme, tssTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Main theme hook - returns the unified theme
export const useTheme = () => useContext(ThemeContext);

// For backward compatibility or when you need to access parts directly
export const useTailwindTheme = () => useTheme().theme.classes;
export const useTssTheme = () => ({
  colors: useTheme().theme.colors,
  spacing: useTheme().theme.spacing,
});

// Create the hook for TSS styles
export const { makeStyles, useStyles: useTssStyles } = createMakeStyles({
  useTheme: () => useTssTheme(),
});

// Better documentation and improved helper for combining TSS with Tailwind
/**
 * Hook for creating styles with TSS.
 * USAGE:
 * const { styles, cx } = useStyles((theme) => ({
 *   container: { borderLeft: `4px solid ${theme.colors?.primary}` },
 * }));
 *
 * return <div className={cx("tailwind-class", styles.container)}>...</div>;
 */
export const useStyles = <T extends Record<string, any>>(
  stylesFn: (theme: ReturnType<typeof useTssTheme>) => T
) => {
  const { css, cx } = useTssStyles();
  const styles: Record<string, string> = {};

  // Get the styles object
  const styleObj = stylesFn(useTssTheme());

  // Convert each style to a className
  Object.entries(styleObj).forEach(([key, value]) => {
    styles[key] = css(value);
  });

  return { styles, cx };
};
