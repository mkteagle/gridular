import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useDataGrouping } from "@/components/data-grid/use-data-grouping";
import { GroupRow } from "@/components/data-grid/group-row";

// Create a wrapper component to showcase the hook
function GroupingDemo({
  data,
  groupByColumns,
  expandedGroups,
}: {
  data: any[];
  groupByColumns: string[];
  expandedGroups: Record<string, boolean>;
}) {
  const { flattenedRows } = useDataGrouping(
    data,
    { groupByColumns, expandedGroups },
    (row) => row.id
  );

  return (
    <div className="overflow-auto border rounded-md">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="px-4 py-2 text-left font-medium">Name</th>
            <th className="px-4 py-2 text-left font-medium">Department</th>
            <th className="px-4 py-2 text-left font-medium">Status</th>
            <th className="px-4 py-2 text-left font-medium">Role</th>
          </tr>
        </thead>
        <tbody>
          {flattenedRows.map((row, idx) => {
            if ("isGroupRow" in row) {
              return (
                <GroupRow
                  key={row.groupKey}
                  columnId={row.columnId}
                  value={row.groupValue}
                  depth={row.depth}
                  isExpanded={!!expandedGroups[row.groupKey]}
                  onToggleExpand={() => {}}
                  count={row.count}
                  columns={4}
                  groupKey={row.groupKey}
                />
              );
            }

            return (
              <tr key={row.id} className="border-b hover:bg-muted/50">
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.department}</td>
                <td className="px-4 py-2">{row.status}</td>
                <td className="px-4 py-2">{row.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const meta: Meta<typeof GroupingDemo> = {
  title: "Hooks/Data Grouping Hook",
  component: GroupingDemo,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof GroupingDemo>;

// Sample data for the stories
const sampleData = [
  {
    id: "1",
    name: "John Doe",
    department: "Engineering",
    status: "Active",
    role: "Developer",
  },
  {
    id: "2",
    name: "Jane Smith",
    department: "Engineering",
    status: "Active",
    role: "Lead",
  },
  {
    id: "3",
    name: "Bob Johnson",
    department: "Engineering",
    status: "Inactive",
    role: "Developer",
  },
  {
    id: "4",
    name: "Alice Brown",
    department: "Design",
    status: "Active",
    role: "Designer",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    department: "Design",
    status: "Active",
    role: "Lead",
  },
  {
    id: "6",
    name: "Eve Davis",
    department: "Marketing",
    status: "Inactive",
    role: "Specialist",
  },
  {
    id: "7",
    name: "Frank Miller",
    department: "Marketing",
    status: "Active",
    role: "Manager",
  },
  {
    id: "8",
    name: "Grace Lee",
    department: "Finance",
    status: "Active",
    role: "Analyst",
  },
  {
    id: "9",
    name: "Henry Wang",
    department: "Finance",
    status: "Inactive",
    role: "Director",
  },
];

export const SingleLevelGrouping: Story = {
  args: {
    data: sampleData,
    groupByColumns: ["department"],
    expandedGroups: {
      "department:Engineering:0": true,
      "department:Design:0": true,
      "department:Marketing:0": false,
      "department:Finance:0": false,
    },
  },
};

export const MultiLevelGrouping: Story = {
  args: {
    data: sampleData,
    groupByColumns: ["department", "status"],
    expandedGroups: {
      "department:Engineering:0": true,
      "status:Active:1": true,
      "department:Design:0": true,
      "department:Marketing:0": false,
      "department:Finance:0": false,
    },
  },
};

export const NoGrouping: Story = {
  args: {
    data: sampleData,
    groupByColumns: [],
    expandedGroups: {},
  },
};
