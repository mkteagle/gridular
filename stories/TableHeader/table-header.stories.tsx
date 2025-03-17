import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { TableHeader } from "@/components/data-grid/table-header";
import { ColumnDef } from "@/components/data-grid/types";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";

const meta: Meta<typeof TableHeader> = {
  title: "Data Grid/TableHeader",
  component: TableHeader,
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

type Story = StoryObj<typeof TableHeader>;

const columns: ColumnDef<any>[] = [
  { id: "name", header: "Name" },
  { id: "email", header: "Email" },
  { id: "role", header: "Role" },
  { id: "status", header: "Status", enableSorting: false },
  { id: "lastActive", header: "Last Active", enableFiltering: false },
];

// Base header story
export const Default: Story = {
  args: {
    columns,
    sortState: null,
    onSortChange: (columnId) => {
      console.log(`Sort clicked on column ${columnId}`);
    },
    enableSorting: true,
    filterState: {},
    filterMenuOpen: null,
    onFilterMenuToggle: (columnId) => {
      console.log(`Filter menu toggled for column ${columnId}`);
    },
    columnWidths: {
      name: 150,
      email: 200,
      role: 150,
      status: 150,
      lastActive: 180,
    },
    onColumnResize: (columnId, width) => {
      console.log(`Resize column ${columnId} to ${width}px`);
    },
    filterValueRefs: { current: {} },
    onApplyFilter: (value) => {
      console.log(`Apply filter: ${value}`);
    },
    onClearFilter: () => {
      console.log("Clear filter");
    },
    onColumnReorder: (draggedId, targetId) => {
      console.log(`Reorder columns: ${draggedId} -> ${targetId}`);
    },
  },
};

// Header with active sort
export const WithActiveSort: Story = {
  args: {
    ...Default.args,
    sortState: { column: "name", direction: "asc" },
  },
};

// Header with active filter
export const WithActiveFilter: Story = {
  args: {
    ...Default.args,
    filterState: { name: "John" },
  },
};

// Interactive header with state
export const Interactive: Story = {
  render: (args) => {
    const InteractiveTableHeader = () => {
      const [sortState, setSortState] = useState<{
        column: string;
        direction: "asc" | "desc";
      } | null>(null);
      const [filterState, setFilterState] = useState<Record<string, string>>(
        {}
      );
      const [filterMenuOpen, setFilterMenuOpen] = useState<string | null>(null);
      const [columnWidths, setColumnWidths] = useState({
        name: 150,
        email: 200,
        role: 150,
        status: 150,
        lastActive: 180,
      });
      const filterValueRefs = useRef<Record<string, string>>({});

      const handleSortChange = (columnId: string) => {
        setSortState((prev) => {
          if (prev?.column === columnId) {
            return prev.direction === "asc"
              ? { column: columnId, direction: "desc" }
              : null;
          }
          return { column: columnId, direction: "asc" };
        });
      };

      const handleFilterMenuToggle = (columnId: string | null) => {
        setFilterMenuOpen((prev) => (prev === columnId ? null : columnId));
      };

      const handleApplyFilter = (value: string) => {
        if (filterMenuOpen) {
          setFilterState((prev) => ({ ...prev, [filterMenuOpen]: value }));
          setFilterMenuOpen(null);
        }
      };

      const handleClearFilter = () => {
        if (filterMenuOpen) {
          const newFilterState = { ...filterState };
          delete newFilterState[filterMenuOpen];
          setFilterState(newFilterState);
          setFilterMenuOpen(null);
        }
      };

      return (
        <TableHeader
          {...args}
          columns={columns}
          sortState={sortState}
          onSortChange={handleSortChange}
          filterState={filterState}
          filterMenuOpen={filterMenuOpen}
          onFilterMenuToggle={handleFilterMenuToggle}
          columnWidths={columnWidths}
          onColumnResize={(columnId, width) => {
            setColumnWidths((prev) => ({ ...prev, [columnId]: width }));
          }}
          filterValueRefs={filterValueRefs}
          onApplyFilter={handleApplyFilter}
          onClearFilter={handleClearFilter}
          onColumnReorder={(draggedId, targetId) => {
            console.log(`Reorder columns: ${draggedId} -> ${targetId}`);
          }}
        />
      );
    };

    return <InteractiveTableHeader />;
  },
};

// Custom render header
export const CustomHeader: Story = {
  args: {
    ...Default.args,
    renderHeader: (column, sortDirection) => (
      <div className="flex items-center gap-2 text-primary">
        <span>★</span>
        <span>{column.header}</span>
        {sortDirection && <span>{sortDirection === "asc" ? "↑" : "↓"}</span>}
      </div>
    ),
  },
};

// Custom sort icon
export const CustomSortIcon: Story = {
  args: {
    ...Default.args,
    renderSortIcon: (_column, sortDirection: "asc" | "desc" | null) =>
      sortDirection ? (
        <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
      ) : (
        <span className="ml-1 text-gray-300">○</span>
      ),
  },
};
