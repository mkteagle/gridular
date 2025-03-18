import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  ThemeProvider,
  useTheme,
  useTailwindTheme,
  useTssTheme,
  makeStyles,
  lightTheme,
  darkTheme,
} from "../../components/theme-provider/theme-provider";
import { Button } from "../../components/ui/button";
import { Sun, Moon } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-provider/theme-switcher";

// Define meta information for the story
const meta: Meta<typeof ThemeProvider> = {
  title: "Theme/ThemeProvider",
  component: ThemeProvider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `ThemeProvider gives you a unified approach to styling with both 
        Tailwind CSS and TSS-React. You can use either one or both together.`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

// Example component using TSS-React styles with the Material-UI style spacing function
const TssStylesExample = () => {
  const { classes } = makeStyles()((theme) => ({
    container: {
      padding: theme.spacing(2),
      backgroundColor: theme.colors.muted,
      borderRadius: "8px",
      marginBottom: theme.spacing(4),
    },
    heading: {
      color: theme.colors.primary,
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: theme.spacing(2),
    },
    text: {
      color: theme.colors.foreground,
      fontSize: "14px",
    },
    spacingDemo: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(2, 4),
      backgroundColor: theme.colors.background,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: "4px",
    },
    spacingBox: {
      display: "flex",
      flexWrap: "wrap",
      gap: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    box: {
      padding: theme.spacing(1),
      border: `1px solid ${theme.colors.border}`,
      backgroundColor: theme.colors.background,
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    colorSwatch: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
      gap: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    swatch: {
      width: "100%",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "4px",
      position: "relative",
      overflow: "hidden",
    },
    swatchLabel: {
      fontSize: "12px",
      fontWeight: "bold",
      padding: "4px 8px",
      borderRadius: "4px",
      background: "rgba(0,0,0,0.2)",
      color: "white",
      textShadow: "0 1px 2px rgba(0,0,0,0.5)",
    },
  }))();

  const { colors } = useTssTheme();

  return (
    <div className={classes.container}>
      <h3 className={classes.heading}>TSS Styling Example</h3>
      <p className={classes.text}>
        This component uses TSS-React styles with the theme.
      </p>

      <div className={classes.spacingDemo}>
        <h4 className={classes.heading}>Spacing Function Demo</h4>
        <p className={classes.text}>
          Uses theme.spacing(n) similar to Material-UI
        </p>

        <div className={classes.spacingBox}>
          {[1, 2, 4, 8].map((size) => (
            <div key={size} className={classes.box}>
              {size * 4}px
            </div>
          ))}
        </div>
      </div>

      <div className={classes.spacingDemo}>
        <h4 className={classes.heading}>Theme Colors</h4>
        <div className={classes.colorSwatch}>
          {Object.entries(colors).map(([name, value]) => (
            <div
              key={name}
              className={classes.swatch}
              style={{ backgroundColor: value }}
            >
              <span className={classes.swatchLabel}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Example component using Tailwind classes
const TailwindExample = () => {
  const tailwind = useTailwindTheme();

  return (
    <div className="p-4 bg-muted rounded-lg mb-4">
      <h3 className="text-lg font-bold text-primary mb-2">Tailwind Styling</h3>
      <p className="text-sm text-foreground mb-3">
        This component uses Tailwind utility classes with the theme.
      </p>

      <div className="mt-4 space-y-4">
        <div className={tailwind.container}>
          <p className="p-2">Using .container class from tailwind theme</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-primary text-white p-2 rounded">Primary</div>
          <div className="bg-muted text-muted-foreground p-2 rounded">
            Muted
          </div>
          <div className="bg-background border border-border p-2 rounded">
            Background
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Theme-provided classes:</p>
          <div className={tailwind.row}>Row styling</div>
          <div className={tailwind.cell}>Cell styling</div>
          <div className={tailwind.headerCell}>Header cell styling</div>
        </div>
      </div>
    </div>
  );
};

// Example component using both TSS and Tailwind
const CombinedExample = () => {
  // Use useStyles instead of makeStyles directly to get both classes and cx
  const { classes, cx } = makeStyles({ name: "CombinedExample" })((theme) => ({
    container: {
      borderLeft: `4px solid ${theme.colors?.primary || "#000"}`,
      paddingLeft:
        typeof theme.spacing === "function" ? theme.spacing(4) : "16px",
      marginTop:
        typeof theme.spacing === "function" ? theme.spacing(4) : "16px",
    },
    highlight: {
      backgroundColor: theme.colors?.primary || "#000",
      color: "white",
      padding:
        typeof theme.spacing === "function" ? theme.spacing(1, 2) : "4px 8px",
      borderRadius: "4px",
      display: "inline-block",
      marginRight:
        typeof theme.spacing === "function" ? theme.spacing(2) : "8px",
    },
    spacingExample: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
      gap: typeof theme.spacing === "function" ? theme.spacing(2) : "8px",
      marginTop:
        typeof theme.spacing === "function" ? theme.spacing(3) : "12px",
      padding: typeof theme.spacing === "function" ? theme.spacing(2) : "8px",
      backgroundColor: `${theme.colors?.muted || "#f1f5f9"}20`, // with transparency
      borderRadius: "4px",
    },
    spacingItem: {
      padding: typeof theme.spacing === "function" ? theme.spacing(2) : "8px",
      backgroundColor: theme.colors?.background || "#fff",
      border: `1px solid ${theme.colors?.border || "#e2e8f0"}`,
      textAlign: "center",
      borderRadius: "4px",
      fontSize: "0.875rem",
    },
  }))();

  // Access Tailwind classes and TSS theme
  const tailwind = useTailwindTheme();

  // Add fallback for tailwind.cell in case it's undefined
  const cellClass = tailwind?.cell || "p-2 text-sm border border-gray-200";

  return (
    <div className={cx("bg-muted/50 p-4 rounded-lg", classes.container)}>
      <h3 className="text-lg font-bold mb-2">Combined Styling</h3>
      <p className="text-sm mb-3">
        This component uses both Tailwind utility classes and TSS-React styles
        together.
      </p>

      <div className="flex items-center gap-2 mt-4">
        <div className={classes.highlight}>TSS-React</div>
        <span className="text-primary font-bold">+</span>
        <div className="bg-primary text-white px-2 py-1 rounded">Tailwind</div>
      </div>

      <div className="mt-4 p-3 border border-border rounded">
        <div className={cellClass}>Tailwind cell styling from theme</div>
      </div>

      <div className={classes.spacingExample}>
        {[1, 2, 3, 4].map((value) => (
          <div key={value} className={classes.spacingItem}>
            Spacing {value}
          </div>
        ))}
      </div>
    </div>
  );
};

// Theme control component
const ThemeControls = () => {
  const { setTailwindTheme, setTssTheme, resetTheme, theme } = useTheme();

  // Detect if we're already in dark mode
  const isDarkMode = theme.colors.background === darkTheme.colors?.background;

  const applyDarkTheme = () => {
    setTssTheme(darkTheme);

    setTailwindTheme({
      container: "bg-muted border border-border text-foreground",
      cell: "px-4 py-2 text-sm border-border",
      row: "border-b border-border hover:bg-muted/50",
    });
  };

  const applyLightTheme = () => {
    setTssTheme(lightTheme);

    setTailwindTheme({
      container: "bg-background border border-border text-foreground",
      cell: "px-4 py-2 text-sm border-border",
      row: "border-b border-border hover:bg-muted/30",
    });
  };

  const applyCustomSpacing = () => {
    setTssTheme({
      spacing: 8, // Change base spacing to 8px
    });
  };

  const applyPurpleTheme = () => {
    setTssTheme({
      colors: {
        primary: "#8b5cf6", // purple-500
        secondary: "#a78bfa", // purple-400
        background: isDarkMode ? "#2e1065" : "#f5f3ff", // purple-900 or purple-50
        foreground: isDarkMode ? "#f5f3ff" : "#4c1d95", // purple-50 or purple-900
        muted: isDarkMode ? "#4c1d95" : "#ddd6fe", // purple-900 or purple-200
        border: isDarkMode ? "#6d28d9" : "#c4b5fd", // purple-700 or purple-300
      },
    });
  };

  return (
    <div className="mb-6 p-4 border rounded-md bg-background">
      <h3 className="text-lg font-semibold mb-3">Theme Controls</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Click the buttons below to dynamically change the theme.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={isDarkMode ? applyLightTheme : applyDarkTheme}>
          {isDarkMode ? (
            <>
              <Sun className="h-4 w-4 mr-2" /> Light Theme
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 mr-2" /> Dark Theme
            </>
          )}
        </Button>
        <Button onClick={applyPurpleTheme} variant="secondary">
          Purple Theme
        </Button>
        <Button onClick={applyCustomSpacing} variant="outline">
          Custom Spacing (8px base)
        </Button>
        <Button variant="destructive" onClick={resetTheme} className="ml-auto">
          Reset Theme
        </Button>
      </div>
    </div>
  );
};

// Basic story with all examples
export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <div className="w-[700px] max-w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">ThemeProvider Demo</h2>
          <ThemeSwitcher />
        </div>
        <p className="text-muted-foreground mb-6">
          This demonstrates the ThemeProvider component supporting both Tailwind
          and TSS-React styling with automatic dark/light mode support.
        </p>

        <ThemeControls />

        <div className="space-y-6">
          <TssStylesExample />
          <TailwindExample />
          <CombinedExample />
        </div>
      </div>
    </ThemeProvider>
  ),
};

// Example with custom spacing configuration
export const CustomSpacing: Story = {
  render: () => (
    <ThemeProvider
      initialTssTheme={{
        spacing: 8, // Set base spacing to 8px instead of default 4px
      }}
    >
      <div className="w-[700px] max-w-full">
        <h2 className="text-xl font-bold mb-4">Custom Spacing Theme</h2>
        <p className="text-muted-foreground mb-6">
          This example uses a custom base spacing value of 8px instead of the
          default 4px.
        </p>
        <TssStylesExample />
      </div>
    </ThemeProvider>
  ),
};

// Example with custom colors
export const CustomColors: Story = {
  render: () => (
    <ThemeProvider
      initialTssTheme={{
        colors: {
          primary: "#8b5cf6", // purple-500
          secondary: "#a78bfa", // purple-400
          background: "#f5f3ff", // purple-50
          foreground: "#4c1d95", // purple-900
          muted: "#ddd6fe", // purple-200
          border: "#c4b5fd", // purple-300
        },
      }}
      initialTailwindTheme={{
        container: "bg-purple-50 border border-purple-200",
        header: "bg-purple-100 border-b border-purple-200",
        headerCell: "text-purple-700 font-medium px-4 py-3",
        row: "border-b border-purple-100 hover:bg-purple-50/50",
      }}
    >
      <div className="w-[700px] max-w-full">
        <h2 className="text-xl font-bold mb-4 text-purple-700">
          Custom Purple Theme
        </h2>
        <p className="text-purple-800 mb-6">
          This example uses a custom purple color palette for both TSS and
          Tailwind.
        </p>
        <TssStylesExample />
        <TailwindExample />
      </div>
    </ThemeProvider>
  ),
};

// Example showing theme switching
export const ThemeSwitching: Story = {
  render: () => {
    const [isDark, setIsDark] = useState(false);

    return (
      <ThemeProvider initialTssTheme={isDark ? darkTheme : lightTheme}>
        <div className="w-[700px] max-w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Theme Switching Example</h2>
            <Button
              onClick={() => setIsDark(!isDark)}
              variant="outline"
              size="sm"
            >
              {isDark ? (
                <>
                  <Sun className="h-4 w-4 mr-2" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2" /> Dark Mode
                </>
              )}
            </Button>
          </div>
          <p className="text-muted-foreground mb-6">
            This example demonstrates switching between light and dark themes.
          </p>
          <TssStylesExample />
          <TailwindExample />
        </div>
      </ThemeProvider>
    );
  },
};

// Example of minimal theming - showing you only need to provide what you want to change
export const MinimalTheme: Story = {
  render: () => (
    <ThemeProvider
      initialTssTheme={{
        colors: {
          primary: "#059669", // emerald-600
          secondary: "#10b981", // emerald-500
        },
      }}
    >
      <div className="w-[700px] max-w-full">
        <h2 className="text-xl font-bold mb-4">Minimal Theme Customization</h2>
        <p className="text-muted-foreground mb-6">
          This example only changes the primary and secondary colors, inheriting
          all other theme values.
        </p>
        <TssStylesExample />
      </div>
    </ThemeProvider>
  ),
};
