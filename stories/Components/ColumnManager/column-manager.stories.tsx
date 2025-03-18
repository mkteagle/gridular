import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import {
  CheckSquare,
  Square,
  Settings,
  RotateCcw,
  Columns as ColumnsIcon,
} from "lucide-react";
import { ColumnManager } from "@/components/data-grid/column-manager";
import { ColumnDef } from "@/components/data-grid/types";

const meta: Meta<typeof ColumnManager> = {
  title: "Components/ColumnManager",
  component: ColumnManager,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ColumnManager>;

// Sample column definitions
const columns: ColumnDef<any>[] = [
  { id: "name", header: "Name" },
  { id: "email", header: "Email" },
  { id: "role", header: "Role" },
  { id: "status", header: "Status" },
  { id: "lastActive", header: "Last Active" },
];

// Base story
export const Default: Story = {
  args: {
    columns: columns,
    visibleColumns: ["name", "email", "role"],
    toggleColumnVisibility: (columnId, visible) => {
      console.log(`Toggle column ${columnId} to ${visible}`);
    },
    resetGridPreferences: () => {
      console.log("Reset grid preferences");
    },
  },
};

// Custom trigger button
export const CustomTrigger: Story = {
  args: {
    ...Default.args,
    renderTrigger: ({ onClick }) => (
      <Button variant="default" onClick={onClick}>
        <ColumnsIcon className="h-4 w-4 mr-2" />
        Manage Columns
      </Button>
    ),
  },
};

// Custom column items with icons
export const CustomColumnItems: Story = {
  args: {
    ...Default.args,
    renderColumnItem: ({ column, isVisible, onToggle }) => (
      <div
        key={column.id}
        className="flex items-center px-2 py-2 hover:bg-accent cursor-pointer"
        onClick={() => onToggle(!isVisible)}
      >
        {isVisible ? (
          <CheckSquare className="h-4 w-4 mr-2" />
        ) : (
          <Square className="h-4 w-4 mr-2" />
        )}
        <span>{column.header}</span>
      </div>
    ),
  },
};

// Custom reset button
export const CustomResetButton: Story = {
  args: {
    ...Default.args,
    renderResetButton: ({ onClick }) => (
      <div
        className="px-2 py-2 text-red-500 hover:bg-red-50 cursor-pointer flex items-center"
        onClick={onClick}
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset to Default Layout
      </div>
    ),
  },
};

// No reset button
export const NoResetButton: Story = {
  args: {
    ...Default.args,
    showResetButton: false,
  },
};

// Left aligned
export const AlignStart: Story = {
  args: {
    ...Default.args,
    align: "start",
  },
};

// Custom styling
export const CustomStyling: Story = {
  args: {
    ...Default.args,
    triggerClassName: "bg-blue-100 hover:bg-blue-200 border-blue-300",
    contentClassName: "border-2 border-blue-300 rounded-lg",
    itemClassName: "hover:bg-blue-50",
    resetClassName: "text-red-600 hover:bg-red-50",
  },
};

// Comprehensive example
export const ComprehensiveCustomization: Story = {
  args: {
    ...Default.args,
    renderTrigger: ({ onClick }) => (
      <Button variant="outline" className="border-dashed" onClick={onClick}>
        <Settings className="h-4 w-4 mr-2" />
        Customize Table
      </Button>
    ),
    renderColumnItem: ({ column, isVisible, onToggle }) => (
      <div
        key={column.id}
        className="flex items-center justify-between px-3 py-2 hover:bg-blue-50 cursor-pointer"
        onClick={() => onToggle(!isVisible)}
      >
        <span>{column.header}</span>
        {isVisible ? (
          <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
        ) : (
          <div className="h-3 w-3 border border-gray-300 rounded-full"></div>
        )}
      </div>
    ),
    renderResetButton: ({ onClick }) => (
      <div
        className="mt-2 px-3 py-2 text-center bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md cursor-pointer"
        onClick={onClick}
      >
        Reset Layout
      </div>
    ),
    align: "center",
    contentClassName: "p-2 rounded-xl border-2 shadow-lg",
  },
};
