import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Layers, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GroupManager } from "@/components/data-grid/group-manager";
import { ColumnDef } from "@/components/data-grid/types";

const meta: Meta<typeof GroupManager> = {
  title: "Components/Group Manager",
  component: GroupManager,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GroupManager>;

// Sample columns for the stories
const columns: ColumnDef<any>[] = [
  {
    id: "name",
    header: "Name",
    enableGrouping: true,
    index: 0,
  },
  {
    id: "status",
    header: "Status",
    enableGrouping: true,
    index: 1,
  },
  {
    id: "department",
    header: "Department",
    enableGrouping: true,
    index: 2,
  },
  {
    id: "lastActive",
    header: "Last Active",
    enableGrouping: false,
    index: 3,
  },
  {
    id: "email",
    header: "Email",
    enableGrouping: true,
    index: 4,
  },
];

export const Default: Story = {
  args: {
    columns,
    groupByColumns: [],
    updateGroupByColumns: () => {},
    removeGroupByColumn: () => {},
    clearGrouping: () => {},
  },
};

export const WithActiveGroups: Story = {
  args: {
    columns,
    groupByColumns: ["status", "department"],
    updateGroupByColumns: () => {},
    removeGroupByColumn: () => {},
    clearGrouping: () => {},
  },
};

export const CustomTrigger: Story = {
  args: {
    columns,
    groupByColumns: [],
    updateGroupByColumns: () => {},
    removeGroupByColumn: () => {},
    clearGrouping: () => {},
    renderTrigger: ({ onClick }) => (
      <button
        onClick={onClick}
        className="flex items-center px-3 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors"
      >
        <Layers className="h-4 w-4 mr-2" />
        <span>Manage Groups</span>
      </button>
    ),
  },
};

export const CustomActiveGroupDisplay: Story = {
  args: {
    columns,
    groupByColumns: ["status", "department"],
    updateGroupByColumns: () => {},
    removeGroupByColumn: () => {},
    clearGrouping: () => {},
    renderActiveGroup: ({ column, onRemove }) => (
      <Badge variant="secondary" className="px-3 py-1 flex items-center gap-2">
        <Filter className="h-3 w-3" />
        {column.header}
        <button
          onClick={onRemove}
          className="ml-1 text-muted-foreground hover:text-destructive rounded-full h-4 w-4 flex items-center justify-center"
        >
          ×
        </button>
      </Badge>
    ),
  },
};
