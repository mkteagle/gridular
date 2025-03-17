import React, { createContext, useContext, useMemo, useState } from "react";
import { createMakeStyles } from "tss-react";
import { cn } from "@/lib/utils";
import { ThemeProviderContext } from "../data-grid/types";

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
});

// Props for the theme provider
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTailwindTheme?: Partial<ThemeProviderContext>;
  initialTssTheme?: TssTheme;
}

export const ThemeProvider = ({
  children,
  initialTailwindTheme = {},
  initialTssTheme = {},
}: ThemeProviderProps) => {
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
      ...rest,
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
        ...rest,
        ...(processedSpacing && { spacing: processedSpacing }),
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
export const { makeStyles } = createMakeStyles({
  useTheme: () => useTssTheme(),
});

// Helper for combining TSS with Tailwind
export const useStyles = (
  stylesFactory: (theme: CompleteTssTheme) => Record<string, any>
) => {
  const tss = useTssTheme() as CompleteTssTheme;
  const styles = useMemo(() => stylesFactory(tss), [tss]);

  return {
    styles,
    cx: (...classNames: (string | undefined | null | false)[]) =>
      cn(...classNames),
  };
};
