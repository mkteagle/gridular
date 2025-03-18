import React, { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { DataGrid } from "@/components/data-grid/data-grid";
import { GroupingState, SortState } from "@/components/data-grid/types";

const meta: Meta<typeof DataGrid> = {
  title: "Data Grid/Grouping",
  component: DataGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

// Sample data
const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "Admin",
    department: "Engineering",
    status: "Active",
    lastLogin: "2023-05-12",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "User",
    department: "Marketing",
    status: "Active",
    lastLogin: "2023-05-10",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Editor",
    department: "Content",
    status: "Inactive",
    lastLogin: "2023-04-25",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Admin",
    department: "Engineering",
    status: "Active",
    lastLogin: "2023-05-11",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@example.com",
    role: "User",
    department: "Sales",
    status: "Active",
    lastLogin: "2023-05-09",
  },
  {
    id: 6,
    name: "Lisa Moore",
    email: "lisa@example.com",
    role: "Editor",
    department: "Content",
    status: "Active",
    lastLogin: "2023-05-08",
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert@example.com",
    role: "User",
    department: "Marketing",
    status: "Inactive",
    lastLogin: "2023-04-20",
  },
  {
    id: 8,
    name: "Jennifer Anderson",
    email: "jennifer@example.com",
    role: "Admin",
    department: "HR",
    status: "Active",
    lastLogin: "2023-05-07",
  },
  {
    id: 9,
    name: "Thomas Jackson",
    email: "thomas@example.com",
    role: "User",
    department: "Sales",
    status: "Active",
    lastLogin: "2023-05-06",
  },
  {
    id: 10,
    name: "Jessica White",
    email: "jessica@example.com",
    role: "Editor",
    department: "Content",
    status: "Inactive",
    lastLogin: "2023-04-15",
  },
];

// Define columns for our grid
const columns = [
  {
    id: "name",
    header: "Name",
    enableSorting: true,
    enableFiltering: true,
    enableGrouping: true,
    index: 0,
  },
  {
    id: "email",
    header: "Email",
    enableSorting: true,
    enableFiltering: true,
    enableGrouping: false, // Disable grouping for email
    index: 1,
  },
  {
    id: "role",
    header: "Role",
    enableSorting: true,
    enableFiltering: true,
    enableGrouping: true,
    index: 2,
  },
  {
    id: "department",
    header: "Department",
    enableSorting: true,
    enableFiltering: true,
    enableGrouping: true,
    index: 3,
    // Custom formatter for department groups
    groupFormatter: (value: string) => `${value} Team`,
  },
  {
    id: "status",
    header: "Status",
    enableSorting: true,
    enableFiltering: true,
    enableGrouping: true,
    index: 4,
    // Custom cell renderer to show status with color
    cell: (row: any) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          row.status === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    id: "lastLogin",
    header: "Last Login",
    enableSorting: true,
    enableFiltering: true,
    enableGrouping: false,
    index: 5,
  },
];

export const BasicGrouping: Story = {
  render: (args) => {
    // Use state to manage grouping
    const [groupingState, setGroupingState] = useState<GroupingState>({
      groupByColumns: [],
      expandedGroups: {},
    });

    // When using grouping, show all data on a single page to avoid pagination issues
    const pageSize = users.length;
    const pageCount = 1;
    const pageIndex = 0;

    return (
      <div className="w-[800px]">
        <h3 className="mb-4 text-lg font-semibold">Data Grid with Grouping</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Click the "Group by" button to group the data by different columns.
          All data is shown on a single page for better grouping experience.
        </p>
        <DataGrid
          {...args}
          columns={columns}
          data={users}
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize}
          // With grouping, we typically don't want to change page size
          enablePagination={false}
          enableGrouping={true}
          groupingState={groupingState}
          onGroupingChange={setGroupingState}
          totalRows={users.length}
        />
      </div>
    );
  },
};

// Example with pre-configured grouping - show all rows on one page
export const DefaultGrouping: Story = {
  render: (args) => {
    // Start with department grouping
    const [groupingState, setGroupingState] = useState<GroupingState>({
      groupByColumns: ["department"],
      expandedGroups: { "department:Engineering:0": true }, // Pre-expand Engineering group
    });

    // Show all data on a single page
    const pageSize = users.length;
    const pageCount = 1;
    const pageIndex = 0;

    return (
      <div className="w-[800px]">
        <h3 className="mb-4 text-lg font-semibold">Pre-configured Grouping</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          This example starts with data grouped by department. All data is shown
          on a single page for better grouping experience.
        </p>
        <DataGrid
          {...args}
          columns={columns}
          data={users}
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize}
          enablePagination={false}
          enableGrouping={true}
          groupingState={groupingState}
          onGroupingChange={setGroupingState}
          totalRows={users.length}
        />
      </div>
    );
  },
};

// Example with multi-level grouping - show all rows on one page
export const MultiLevelGrouping: Story = {
  render: (args) => {
    // Group by department and then by role
    const [groupingState, setGroupingState] = useState<GroupingState>({
      groupByColumns: ["department", "role"],
      expandedGroups: {
        "department:Engineering:0": true,
        "department:Content:0": true,
      },
    });

    // Show all data on a single page
    const pageSize = users.length;
    const pageCount = 1;
    const pageIndex = 0;

    return (
      <div className="w-[800px]">
        <h3 className="mb-4 text-lg font-semibold">Multi-Level Grouping</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          This example demonstrates hierarchical grouping by department and
          role. All data is shown on a single page for better grouping
          experience.
        </p>
        <DataGrid
          {...args}
          columns={columns}
          data={users}
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize}
          enablePagination={false}
          enableGrouping={true}
          groupingState={groupingState}
          onGroupingChange={setGroupingState}
          totalRows={users.length}
        />
      </div>
    );
  },
};

// Example with custom group rendering - show all rows on one page
export const CustomGroupRendering: Story = {
  render: (args) => {
    const [groupingState, setGroupingState] = useState<GroupingState>({
      groupByColumns: ["status", "department"],
      expandedGroups: {
        "status:Active:0": true,
      },
    });

    // Show all data on a single page
    const pageSize = users.length;
    const pageCount = 1;
    const pageIndex = 0;

    return (
      <div className="w-[800px]">
        <h3 className="mb-4 text-lg font-semibold">Custom Group Rendering</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          This example shows custom rendering for group rows with different
          styling. All data is shown on a single page for better grouping
          experience.
        </p>
        <DataGrid
          {...args}
          columns={columns}
          data={users}
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize}
          enablePagination={false}
          enableGrouping={true}
          groupingState={groupingState}
          onGroupingChange={setGroupingState}
          groupExpandIcon={<ChevronRight className="h-4 w-4" />}
          groupCollapseIcon={<ChevronDown className="h-4 w-4" />}
          renderGroupRow={({
            columnId,
            value,
            depth,
            isExpanded,
            onToggleExpand,
            count,
          }: {
            columnId: string;
            value: string;
            depth: number;
            isExpanded: boolean;
            onToggleExpand: () => void;
            count: number;
          }) => (
            <div
              style={{ paddingLeft: `${depth * 20 + 8}px` }}
              className="flex items-center py-2"
            >
              <button
                onClick={onToggleExpand}
                className="mr-2 focus:outline-none"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-primary" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-primary" />
                )}
              </button>

              {columnId === "status" ? (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    value === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {value} ({count})
                </span>
              ) : (
                <span className="font-medium">
                  {columnId === "department" ? `${value} Department` : value}
                  <span className="ml-2 text-muted-foreground text-xs">
                    {count} {count === 1 ? "user" : "users"}
                  </span>
                </span>
              )}
            </div>
          )}
          totalRows={users.length}
        />
      </div>
    );
  },
};

// Example with all options - show all data for better experience
export const CompleteExample: Story = {
  render: (args) => {
    // Group states
    const [groupingState, setGroupingState] = useState<GroupingState>({
      groupByColumns: ["role"],
      expandedGroups: {},
    });

    // Sorting and filtering
    const [sortState, setSortState] = useState<SortState | null>(null);
    const [filterState, setFilterState] = useState({});
    const [selectedRows, setSelectedRows] = useState({});

    // Show all data on a single page
    const pageSize = users.length;
    const pageCount = 1;
    const pageIndex = 0;

    // Add a proper handler for grouping changes
    const handleGroupingChange = (newState: GroupingState) => {
      console.log("Group state changed:", newState);
      // Create a fresh object to avoid reference issues
      setGroupingState({
        groupByColumns: [...newState.groupByColumns],
        expandedGroups: { ...newState.expandedGroups },
      });
    };

    return (
      <div className="w-[800px]">
        <h3 className="mb-4 text-lg font-semibold">
          Complete Grouping Example
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          This example shows grouping with sorting, filtering, and row
          selection. All data is shown on a single page.
        </p>
        <DataGrid
          {...args}
          columns={[...columns]} // Spread columns
          data={[...users]} // Spread data
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize}
          enablePagination={false}
          // Grouping
          enableGrouping={true}
          groupingState={{ ...groupingState }} // Spread groupingState
          onGroupingChange={handleGroupingChange} // Use the custom handler
          // Sorting
          enableSorting={true}
          sortState={sortState ? { ...sortState } : null}
          onSortChange={(state) => setSortState(state ? { ...state } : null)}
          // Filtering
          enableFiltering={true}
          filterState={{ ...filterState }}
          onFilterChange={(state) => setFilterState({ ...state })}
          // Selection
          enableRowSelection={true}
          selectedRows={{ ...selectedRows }}
          onRowSelectionChange={(state) => setSelectedRows({ ...state })}
          // Row click
          onRowClick={(row: any) => console.log("Row clicked:", row)}
          totalRows={users.length}
        />
      </div>
    );
  },
};
