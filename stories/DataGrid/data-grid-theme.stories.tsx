import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  columns,
  sampleData,
  ControlledDataGridWrapper,
  ThemeWrapper,
} from "../utils/data-grid-helpers";

const meta: Meta<typeof ControlledDataGridWrapper> = {
  title: "Data Grid/Main/Themes",
  component: ControlledDataGridWrapper,
  decorators: [
    (Story, context) => (
      <ThemeWrapper customTheme={context.args.customTheme}>
        <Story />
      </ThemeWrapper>
    ),
  ],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ControlledDataGridWrapper>;

export const DefaultTheme: Story = {
  args: {
    columns,
    data: sampleData,
    enablePagination: true,
    enableSorting: true,
    enableRowSelection: true,
  },
};

export const DarkThemeGrid: Story = {
  args: {
    columns,
    data: sampleData,
    enablePagination: true,
    enableSorting: true,
    enableRowSelection: true,
    customTheme: {
      tailwindTheme: {
        container:
          "bg-gray-900 border border-gray-700 rounded-md overflow-hidden shadow-lg",
        header: "bg-gray-800 border-b border-gray-700",
        headerCell: "text-gray-300 font-medium px-4 py-3",
        row: "border-b border-gray-700 hover:bg-gray-800 transition-colors",
        cell: "px-4 py-2 text-sm text-gray-300",
        pagination:
          "bg-gray-800 border-t border-gray-700 p-2 flex justify-between items-center text-gray-300",
        filterMenu: "bg-gray-800 border border-gray-700 shadow-xl rounded-md",
        filterMenuContent: "p-3 text-gray-300",
        filterMenuHeader: "font-medium mb-2 text-gray-200",
        filterMenuInput: "bg-gray-700 border-gray-600 text-gray-200",
        filterMenuClearButton: "bg-gray-700 hover:bg-gray-600 text-gray-200",
        filterMenuApplyButton: "bg-blue-600 hover:bg-blue-700 text-white",
        columnResizeHandle:
          "w-1 bg-gray-700 hover:bg-blue-400 cursor-col-resize h-full absolute right-0 top-0",
        columnResizeHandleActive: "bg-blue-400",
        sortIcon: "text-gray-500",
        sortIconActive: "text-blue-400",
        selectedRowClassName: "bg-blue-900/30 border-l-2 border-blue-400",
      },
      tssTheme: {
        colors: {
          primary: "#3b82f6", // blue-500
          secondary: "#9ca3af", // gray-400
          background: "#111827", // gray-900
          foreground: "#f9fafb", // gray-50
          muted: "#1f2937", // gray-800
          mutedForeground: "#d1d5db", // gray-300
          border: "#374151", // gray-700
          accent: "#2563eb", // blue-600
          accentForeground: "#bfdbfe", // blue-100
          destructive: "#ef4444", // red-500
          destructiveForeground: "#fca5a5", // red-300
        },
        spacing: 4,
      },
    },
  },
};

export const WithCleanClassesAPI: Story = {
  args: {
    columns,
    data: sampleData,
    enablePagination: true,
    enableSorting: true,
    enableRowSelection: true,
    classes: {
      root: "shadow-lg",
      header: "bg-gray-100 text-gray-800",
      row: "hover:bg-blue-50 transition-colors",
      cell: "px-4 py-2",
      selectedRow: "bg-blue-100 border-l-2 border-blue-500",
      pagination: "bg-gray-50 border-t",
    },
  },
};

export const MinimalTheme: Story = {
  args: {
    columns,
    data: sampleData,
    enablePagination: true,
    enableSorting: true,
    enableRowSelection: true,
    customTheme: {
      tailwindTheme: {
        container: "border-none shadow-none",
        header: "bg-transparent border-b border-gray-200",
        headerCell: "font-normal text-sm text-gray-500 px-3 py-2",
        row: "border-b border-gray-100 hover:bg-gray-50",
        cell: "px-3 py-2 text-sm",
        pagination: "py-1 px-2 flex justify-between items-center text-sm",
        filterMenu: "bg-white border shadow-sm rounded-sm",
        filterMenuContent: "p-2",
        filterMenuHeader: "text-sm mb-1",
        filterMenuInput: "text-xs border rounded",
        filterMenuClearButton: "text-xs",
        filterMenuApplyButton: "text-xs",
        columnResizeHandle: "w-0.5 bg-gray-200 hover:bg-blue-300",
        sortIcon: "text-gray-400",
        sortIconActive: "text-blue-500",
        selectedRowClassName: "bg-blue-50",
      },
    },
  },
};

export const BorderlessTheme: Story = {
  args: {
    columns,
    data: sampleData,
    enablePagination: true,
    enableSorting: true,
    customTheme: {
      tailwindTheme: {
        container: "border-none shadow-none",
        header: "bg-transparent border-b border-gray-200",
        headerCell: "font-semibold text-gray-700 px-4 py-3",
        row: "hover:bg-gray-50",
        cell: "px-4 py-3 border-0",
        pagination: "p-2 flex justify-between items-center",
      },
    },
  },
};

export const StripedTheme: Story = {
  args: {
    columns,
    data: sampleData,
    enablePagination: true,
    enableSorting: true,
    customTheme: {
      tailwindTheme: {
        container: "border rounded-lg overflow-hidden shadow-sm",
        header: "bg-white border-b",
        headerCell: "font-semibold text-gray-800 px-4 py-3",
        row: "[&:nth-child(odd)]:bg-gray-50 hover:bg-blue-50",
        cell: "px-4 py-3 border-0",
        pagination: "bg-gray-50 p-2 flex justify-between items-center border-t",
        selectedRowClassName: "bg-blue-100 [&:nth-child(odd)]:bg-blue-100",
      },
    },
  },
};

export const ModernTheme: Story = {
  args: {
    columns,
    data: sampleData,
    enablePagination: true,
    enableSorting: true,
    enableRowSelection: true,
    customTheme: {
      tailwindTheme: {
        container: "border-none rounded-2xl overflow-hidden shadow-xl",
        header: "bg-gradient-to-r from-blue-500 to-purple-600",
        headerCell: "text-white font-medium px-6 py-4",
        row: "border-b border-gray-100 hover:bg-gray-50",
        cell: "px-6 py-4",
        pagination: "bg-gray-50 p-3 flex justify-between items-center",
        filterMenu: "bg-white border-none shadow-xl rounded-xl",
        filterMenuContent: "p-4",
        filterMenuHeader: "font-medium mb-2",
        filterMenuInput: "border rounded-lg p-2",
        filterMenuClearButton:
          "bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2",
        filterMenuApplyButton:
          "bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2",
        columnResizeHandle:
          "w-1 bg-white/50 hover:bg-white h-full absolute right-0 top-0",
        sortIcon: "text-white/70",
        sortIconActive: "text-white",
        selectedRowClassName: "bg-blue-50 border-l-4 border-blue-500",
      },
    },
  },
};
