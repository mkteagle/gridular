import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  columns,
  sampleData,
  ControlledDataGridWrapper,
  ThemeWrapper,
} from "../Shared/utils/data-grid-helpers";

const meta: Meta<typeof ControlledDataGridWrapper> = {
  title: "Data Grid/Headers",
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

export const CustomSortIcons: Story = {
  args: {
    columns,
    data: sampleData,
    enableSorting: true,
    sortIconVariant: "arrows",
  },
};

export const CustomSortIndicators: Story = {
  args: {
    columns,
    data: sampleData,
    enableSorting: true,
    renderSortIcon: (column, sortDirection) => {
      if (!sortDirection) return null;

      return (
        <span className="ml-2 text-xs font-mono">
          {sortDirection === "asc" ? "↑ ASC" : "↓ DESC"}
        </span>
      );
    },
  },
};

export const CustomHeaderRendering: Story = {
  args: {
    columns,
    data: sampleData,
    enableSorting: true,
    renderHeader: (column, sortDirection: "asc" | "desc" | null) => {
      return (
        <div className="flex flex-col">
          <span className="font-bold">{column.header}</span>
          <span className="text-xs text-muted-foreground">{column.id}</span>
        </div>
      );
    },
  },
};

export const CustomFilterIcons: Story = {
  args: {
    columns,
    data: sampleData,
    enableSorting: true,
    renderFilterIcon: (column, isActive) => {
      return (
        <SlidersHorizontal
          className={cn(
            "h-4 w-4",
            isActive ? "text-blue-500" : "text-gray-400"
          )}
        />
      );
    },
  },
};

export const FullyCustomizedHeader: Story = {
  args: {
    columns,
    data: sampleData,
    enableSorting: true,
    renderHeader: (column, sortDirection) => (
      <div className="flex flex-col">
        <span className="font-bold">{column.header}</span>
        <span className="text-xs text-muted-foreground">{column.id}</span>
      </div>
    ),
    renderSortIcon: (column, sortDirection) => {
      if (!sortDirection) return null;
      return (
        <span className="ml-2 text-xs font-mono bg-blue-100 px-1 rounded">
          {sortDirection === "asc" ? "↑" : "↓"}
        </span>
      );
    },
    renderFilterIcon: (column, isActive) => (
      <Search
        className={cn("h-4 w-4", isActive ? "text-primary" : "text-gray-400")}
      />
    ),
  },
};
