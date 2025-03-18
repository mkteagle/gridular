import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { TableBody } from "@/components/data-grid/table-body";
import { ColumnDef } from "@/components/data-grid/types";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof TableBody> = {
  title: "Components/TableBody",
  component: TableBody,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <table className="border-collapse w-full">
          <Story />
        </table>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TableBody>;

const columns: ColumnDef<any>[] = [
  { id: "name", header: "Name" },
  { id: "email", header: "Email" },
  { id: "role", header: "Role" },
  { id: "status", header: "Status" },
  { id: "lastActive", header: "Last Active" },
];

const data = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Away",
    lastActive: "5 days ago",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    status: "Inactive",
    lastActive: "2 weeks ago",
  },
];

const theme = {
  classes: {
    row: "hover:bg-gray-100",
    cell: "p-2 border-b",
  },
};

// Base story
export const Default: Story = {
  args: {
    paginatedData: data,
    columns,
    selectedRows: {},
    enableRowSelection: false,
    onRowSelect: (rowId) => console.log(`Row selected: ${rowId}`),
    columnWidths: {
      name: 150,
      email: 200,
      role: 150,
      status: 150,
      lastActive: 180,
    },
    theme,
  },
};

// With row selection
export const WithRowSelection: Story = {
  args: {
    ...Default.args,
    enableRowSelection: true,
    selectedRows: { "2": true },
  },
};

// With custom cell rendering
export const CustomCells: Story = {
  args: {
    ...Default.args,
    renderCell: (row: unknown, column) => {
      const typedRow = row as Record<string, any>;
      const status = typedRow.status;
      let badgeVariant = "default";

      if (status === "Active") badgeVariant = "success";
      if (status === "Away") badgeVariant = "warning";
      if (status === "Inactive") badgeVariant = "destructive";

      if (column.id === "status") {
        return <Badge variant={badgeVariant as any}>{status}</Badge>;
      }

      return typedRow[column.id];
    },
  },
};

// Interactive TableBody
export const Interactive: Story = {
  render: (args) => {
    const InteractiveTableBody = () => {
      const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>(
        {}
      );

      const handleRowSelect = (rowId: string) => {
        setSelectedRows((prev) => ({
          ...prev,
          [rowId]: !prev[rowId],
        }));
      };

      return (
        <div className="flex flex-col gap-4">
          <div className="text-sm mb-2">
            Selected rows:{" "}
            {Object.keys(selectedRows)
              .filter((key) => selectedRows[key])
              .join(", ")}
          </div>
          <TableBody
            {...args}
            enableRowSelection={true}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
          />
        </div>
      );
    };

    return <InteractiveTableBody />;
  },
};
