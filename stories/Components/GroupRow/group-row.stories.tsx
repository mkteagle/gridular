import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BadgeCheck, AlertCircle } from "lucide-react";
import { GroupRow } from "@/components/data-grid/group-row";

const meta: Meta<typeof GroupRow> = {
  title: "Components/Group Row",
  component: GroupRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GroupRow>;

export const Default: Story = {
  args: {
    columnId: "status",
    value: "Active",
    depth: 0,
    isExpanded: true,
    onToggleExpand: () => {},
    count: 12,
    columns: 5,
    groupKey: "status:Active:0",
  },
  render: (args) => (
    <table className="w-full border-collapse">
      <tbody>
        <GroupRow {...args} />
      </tbody>
    </table>
  ),
};

export const NestedGroups: Story = {
  args: {
    columnId: "department",
    value: "Engineering",
    depth: 1,
    isExpanded: false,
    onToggleExpand: () => {},
    count: 8,
    columns: 5,
    groupKey: "department:Engineering:1",
  },
  render: (args) => (
    <table className="w-full border-collapse">
      <tbody>
        <GroupRow {...args} />
      </tbody>
    </table>
  ),
};

export const CustomGroupRowRenderer: Story = {
  args: {
    columnId: "status",
    value: "Active",
    depth: 0,
    isExpanded: true,
    onToggleExpand: () => {},
    count: 12,
    columns: 5,
    groupKey: "status:Active:0",
    renderGroupRow: ({ value, isExpanded, count, onToggleExpand }) => (
      <div
        className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded"
        onClick={onToggleExpand}
      >
        {isExpanded ? (
          <BadgeCheck className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
        ) : (
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
        )}
        <span className="font-medium mr-2">{value}</span>
        <span className="text-xs bg-green-200 dark:bg-green-800 px-2 py-0.5 rounded-full">
          {count} items
        </span>
      </div>
    ),
  },
  render: (args) => (
    <table className="w-full border-collapse">
      <tbody>
        <GroupRow {...args} />
      </tbody>
    </table>
  ),
};

export const CustomStyled: Story = {
  args: {
    columnId: "priority",
    value: "High",
    depth: 0,
    isExpanded: true,
    onToggleExpand: () => {},
    count: 5,
    columns: 5,
    groupKey: "priority:High:0",
    rowClassName: "bg-red-50 dark:bg-red-900/20",
    labelClassName: "font-semibold text-red-700 dark:text-red-400",
    countClassName: "ml-2 text-xs text-red-600 dark:text-red-300",
  },
  render: (args) => (
    <table className="w-full border-collapse">
      <tbody>
        <GroupRow {...args} />
      </tbody>
    </table>
  ),
};
