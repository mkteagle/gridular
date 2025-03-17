import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  ThemeProvider,
  useTheme,
  useTailwindTheme,
  useTssTheme,
  makeStyles,
  useStyles,
} from "../components/theme-provider/theme-provider";
import { Button } from "../components/ui/button";

// Define meta information for the story
const meta: Meta<typeof ThemeProvider> = {
  title: "Components/Theme/ThemeProvider",
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
      padding: theme.spacing(2), // 8px padding
      backgroundColor: theme.colors.muted,
      borderRadius: "8px",
      marginBottom: theme.spacing(4), // 16px margin
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
      padding: theme.spacing(2, 4), // 8px vertical, 16px horizontal
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
  }))();

  // Access the theme directly to show spacing function
  const { theme } = useTheme();

  return (
    <div className={classes.container}>
      <h3 className={classes.heading}>TSS-React Styling</h3>
      <p className={classes.text}>
        This component uses TSS-React for CSS-in-JS styling, accessing theme
        values like colors and spacing.
      </p>

      <div className={classes.spacingDemo}>
        <h4 style={{ marginBottom: theme.spacing(2) }}>
          Material-UI Style Spacing
        </h4>
        <p style={{ marginBottom: theme.spacing(2) }}>
          Use the spacing function with 1-4 arguments similar to Material-UI:
        </p>

        <code
          style={{
            display: "block",
            marginBottom: theme.spacing(2),
            padding: theme.spacing(1),
            backgroundColor: theme.colors.muted,
          }}
        >
          padding: theme.spacing(2, 4, 2, 4) → padding: 8px 16px 8px 16px
        </code>

        <div className={classes.spacingBox}>
          <div className={classes.box}>
            theme.spacing(1) = {theme.spacing(1)}
          </div>
          <div className={classes.box}>
            theme.spacing(2) = {theme.spacing(2)}
          </div>
          <div className={classes.box}>
            baseSpacing = {theme.spacing.baseSpacing}px
          </div>
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
      <h3 className="text-primary font-bold text-lg mb-2">Tailwind Styling</h3>
      <p className="text-foreground text-sm">
        This component uses Tailwind utility classes.
      </p>
      <div className="mt-4">
        <div className={tailwind.container}>
          <p className="p-2">Using Tailwind classes from theme</p>
        </div>
      </div>
    </div>
  );
};

// Example component using both TSS and Tailwind
const CombinedExample = () => {
  // TSS styling approach using the spacing function
  const { styles, cx } = useStyles((theme) => ({
    container: {
      borderLeft: `4px solid ${theme.colors.primary}`,
      paddingLeft: theme.spacing(4),
      marginTop: theme.spacing(4),
    },
    highlight: {
      backgroundColor: theme.colors.primary,
      color: "white",
      padding: theme.spacing(1, 2), // 4px vertical, 8px horizontal
      borderRadius: "4px",
      display: "inline-block",
    },
    spacingExample: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
      gap: theme.spacing(2),
      marginTop: theme.spacing(3),
      padding: theme.spacing(2),
      backgroundColor: theme.colors.muted + "20", // with transparency
      borderRadius: "4px",
    },
    spacingItem: {
      padding: theme.spacing(2),
      backgroundColor: theme.colors.background,
      border: `1px solid ${theme.colors.border}`,
      textAlign: "center",
      borderRadius: "4px",
      fontSize: "0.875rem",
    },
  }));

  // Access Tailwind classes
  const tailwind = useTailwindTheme();
  const tss = useTssTheme();

  return (
    <div className={cx("bg-muted/50 p-4 rounded-lg", styles.container)}>
      <h3 className="text-lg font-bold mb-2">Combined Styling</h3>
      <p className="text-sm mb-3">
        This component uses both Tailwind utility classes and TSS-React styles
        together.
      </p>

      <div className={styles.highlight}>TSS-React highlight</div>

      <div className="mt-4">
        <div className={tailwind.cell}>Tailwind cell styling from theme</div>
      </div>

      <div className={styles.spacingExample}>
        <div className={styles.spacingItem}>
          spacing(1)
          <br />
          {tss.spacing(1)}
        </div>
        <div className={styles.spacingItem}>
          spacing(1,2)
          <br />
          {tss.spacing(1, 2)}
        </div>
        <div className={styles.spacingItem}>
          spacing(1,2,3)
          <br />
          {tss.spacing(1, 2, 3)}
        </div>
        <div className={styles.spacingItem}>
          spacing(1,2,3,4)
          <br />
          {tss.spacing(1, 2, 3, 4)}
        </div>
      </div>
    </div>
  );
};

// Theme control component
const ThemeControls = () => {
  const { setTailwindTheme, setTssTheme, resetTheme } = useTheme();

  const applyDarkTheme = () => {
    setTailwindTheme({
      container: "bg-slate-800 border-slate-700 text-white",
      cell: "text-slate-200 px-4 py-2",
    });

    setTssTheme({
      colors: {
        primary: "#60a5fa", // lighter blue for dark mode
        background: "#1e293b",
        foreground: "#f1f5f9",
        muted: "#334155",
        border: "#475569",
      },
    });
  };

  const applyCustomSpacing = () => {
    // Simply set a number for the baseSpacing
    setTssTheme({
      spacing: 8, // 8px base unit instead of 4px
    });
  };

  const applyColorfulTheme = () => {
    setTailwindTheme({
      container: "bg-purple-100 border-purple-300 rounded-xl shadow-lg",
      cell: "text-purple-800 font-medium",
    });

    setTssTheme({
      colors: {
        primary: "#8b5cf6", // purple-500
        background: "#f5f3ff", // purple-50
        muted: "#ddd6fe", // purple-200
      },
    });
  };

  return (
    <div className="mb-6 p-4 border rounded-md">
      <h3 className="text-lg font-semibold mb-3">Theme Controls</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Click the buttons below to dynamically change the theme.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={applyDarkTheme}>Dark Theme</Button>
        <Button onClick={applyColorfulTheme}>Purple Theme</Button>
        <Button onClick={applyCustomSpacing} variant="secondary">
          Custom Spacing (8px base)
        </Button>
        <Button variant="outline" onClick={resetTheme}>
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
      <div className="w-[600px] max-w-full">
        <h2 className="text-xl font-bold mb-4">ThemeProvider Demo</h2>
        <p className="text-muted-foreground mb-6">
          This demonstrates the ThemeProvider component supporting both Tailwind
          and TSS-React styling.
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
        colors: {
          primary: "#0891b2", // cyan-600
        },
        // Just provide a number for baseSpacing
        spacing: 8, // 8px base unit instead of 4px
      }}
    >
      <div className="max-w-md">
        <h2 className="text-xl font-bold mb-4">Custom Spacing Configuration</h2>
        <p className="text-muted-foreground mb-6">
          This example configures the spacing function with a base of 8px
          instead of 4px.
        </p>
        <TssStylesExample />
        <CombinedExample />
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
          // You can provide just the colors you want to override
          primary: "#0ea5e9", // sky-500
          success: "#22c55e", // green-500
          warning: "#f59e0b", // amber-500
          error: "#ef4444", // red-500
        },
      }}
    >
      <div className="max-w-md">
        <h2 className="text-xl font-bold mb-4">Custom Colors</h2>
        <p className="text-muted-foreground mb-6">
          This example shows you can provide just the colors you want to
          customize, including custom named colors.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {["primary", "success", "warning", "error"].map((color) => (
            <div
              key={color}
              className="p-4 rounded-md text-white font-medium text-center"
              style={{
                backgroundColor: useTheme().theme.colors[color] || "#cccccc",
              }}
            >
              {color}
            </div>
          ))}
        </div>

        <TssStylesExample />
      </div>
    </ThemeProvider>
  ),
};

// Example showing theme switching
export const ThemeSwitching: Story = {
  render: () => {
    const [isDark, setIsDark] = useState(false);

    // Define light and dark themes
    const darkTheme = {
      tailwind: {
        container: "bg-slate-800 border-slate-700 text-white",
        cell: "text-slate-300 border-slate-700",
      },
      tss: {
        colors: {
          primary: "#60a5fa", // blue-400
          background: "#1e293b", // slate-800
          foreground: "#f1f5f9", // slate-100
          muted: "#334155", // slate-700
          mutedForeground: "#94a3b8", // slate-400
          border: "#475569", // slate-600
        },
        // Keep default spacing (4px)
      },
    };

    return (
      <ThemeProvider
        initialTailwindTheme={isDark ? darkTheme.tailwind : {}}
        initialTssTheme={isDark ? darkTheme.tss : {}}
      >
        <div className="w-[600px] max-w-full">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Theme Switching</h2>
            <Button
              onClick={() => setIsDark(!isDark)}
              variant={isDark ? "outline" : "default"}
            >
              {isDark ? "Switch to Light" : "Switch to Dark"}
            </Button>
          </div>

          <div className="space-y-6">
            <TssStylesExample />
            <TailwindExample />
            <CombinedExample />
          </div>
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
          // Just override primary color
          primary: "#14b8a6", // teal-500
        },
      }}
    >
      <div className="max-w-md">
        <h2 className="text-xl font-bold mb-4">Minimal Theme Customization</h2>
        <p className="text-muted-foreground mb-6">
          You can provide just the properties you want to customize. Here we're
          only changing the primary color.
        </p>

        <TssStylesExample />
        <CombinedExample />
      </div>
    </ThemeProvider>
  ),
};
