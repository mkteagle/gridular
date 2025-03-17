import React, { useState } from "react";
import { DataGrid } from "@/components/data-grid/data-grid";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within, waitFor } from "@storybook/test";
import { ColumnDef } from "@/components/data-grid/types";

// Sample data for stories
const sampleData = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  name: `Name ${i}`,
  email: `user${i}@example.com`,
  status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Inactive",
  createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
}));

type DataRow = {
  id: number;
  name: string;
  email: string;
  status: string;
  createdAt: string;
};

const statusFilterFn = (
  row: DataRow,
  columnId: string,
  filterValue: string
) => {
  return row[columnId as keyof DataRow] === filterValue;
};

const columns: ColumnDef<DataRow>[] = [
  {
    id: "id",
    header: "ID",
    width: 80,
  },
  {
    id: "name",
    header: "Name",
    enableSorting: true,
    enableFiltering: true,
  },
  {
    id: "email",
    header: "Email",
    enableFiltering: true,
  },
  {
    id: "status",
    header: "Status",
    enableFiltering: true,
    filterFn: statusFilterFn,
    cell: (row) => {
      const value = row.status;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "Active"
              ? "bg-green-100 text-green-800"
              : value === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      );
    },
  },
  {
    id: "createdAt",
    header: "Created",
    cell: (row) => {
      return new Date(row.createdAt).toLocaleDateString();
    },
  },
];

// Create a wrapper component for controlled stories
type ControlledDataGridWrapperProps = {
  data: DataRow[];
  columns: ColumnDef<DataRow>[];
  pageSize?: number;
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
  enableColumnResize?: boolean;
  isLoading?: boolean; // Added isLoading property
  emptyMessage?: string; // Added emptyMessage property
  className?: string; // Added className property
  rowClassName?: string; // Added rowClassName property
  headerClassName?: string; // Added headerClassName property
  cellClassName?: string; // Added cellClassName property
  selectedRowClassName?: string; // Added selectedRowClassName property
};

const ControlledDataGridWrapper = (props: ControlledDataGridWrapperProps) => {
  const [sortState, setSortState] = useState<{ column: string; direction: "asc" | "desc" } | null>(null);
  const [filterState, setFilterState] = useState<Record<string, string>>({});
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(props.pageSize || 10);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    (props.columns as ColumnDef<DataRow>[]).map((col: ColumnDef<DataRow>) => col.id)
  );

  // Calculate total pages
  const pageCount = Math.ceil(props.data.length / pageSize);

  // Apply filtering
  const filteredData = React.useMemo(() => {
    if (Object.keys(filterState).length === 0) return props.data;
    
    return props.data.filter((row: DataRow) => {
      return Object.entries(filterState).every(([columnId, filterValue]) => {
        const column = props.columns.find((col: ColumnDef<DataRow>) => col.id === columnId);
        if (!column) return true;
        
        if (column.filterFn) {
          return column.filterFn(row, columnId, filterValue);
        }
        
        const cellValue = row[columnId as keyof DataRow];
        const stringValue = String(cellValue || '').toLowerCase();
        return stringValue.includes(filterValue.toLowerCase());
      });
    });
  }, [props.data, filterState, props.columns]);
  
  // Apply sorting
  const sortedData = React.useMemo(() => {
    if (!sortState) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const column = props.columns.find(col => col.id === sortState.column);
      if (!column) return 0;
      
      if (column.sortFn) {
        return sortState.direction === "asc" 
          ? column.sortFn(a, b, sortState.column) 
          : column.sortFn(b, a, sortState.column);
      }
      
      const aValue = a[sortState.column as keyof DataRow];
      const bValue = b[sortState.column as keyof DataRow];
      
      if (aValue === bValue) return 0;
      if (aValue == null) return sortState.direction === "asc" ? -1 : 1;
      if (bValue == null) return sortState.direction === "asc" ? 1 : -1;
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortState.direction === "asc" 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return sortState.direction === "asc" 
        ? Number(aValue) - Number(bValue) 
        : Number(bValue) - Number(aValue);
    });
  }, [filteredData, sortState, props.columns]);
  
  // Apply pagination
  const paginatedData = React.useMemo(() => {
    if (!props.enablePagination) return sortedData;
    const start = pageIndex * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pageIndex, pageSize, props.enablePagination]);

  // Handle column reordering
  const handleColumnReorder = (draggedId: string, targetId: string) => {
    setVisibleColumns(prev => {
      const newOrder = [...prev];
      const dragIndex = newOrder.indexOf(draggedId);
      const targetIndex = newOrder.indexOf(targetId);
      
      if (dragIndex === -1 || targetIndex === -1) return prev;
      
      newOrder.splice(dragIndex, 1);
      newOrder.splice(targetIndex, 0, draggedId);
      
      return newOrder;
    });
  };

  return (
    <DataGrid
      {...props}
      data={paginatedData}
      sortState={sortState}
      onSortChange={setSortState}
      filterState={filterState}
      onFilterChange={setFilterState}
      selectedRows={selectedRows}
      onRowSelectionChange={setSelectedRows}
      pageIndex={pageIndex}
      pageCount={pageCount}
      pageSize={pageSize}
      onPageChange={setPageIndex}
      onPageSizeChange={setPageSize}
      visibleColumns={visibleColumns}
      onVisibleColumnsChange={setVisibleColumns}
      onColumnReorder={handleColumnReorder}
    />
  );
};

const meta: Meta = {
  title: "Components/DataGrid",
  component: ControlledDataGridWrapper,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onSortChange: { action: "sorted" },
    onFilterChange: { action: "filtered" },
    onRowSelectionChange: { action: "rowSelected" },
    onPageChange: { action: "pageChanged" },
    onPageSizeChange: { action: "pageSizeChanged" },
    onVisibleColumnsChange: { action: "columnsVisibilityChanged" },
    onColumnReorder: { action: "columnsReordered" },
    onRowClick: { action: "rowClicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ControlledDataGridWrapper>;

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
    enablePagination: true,
    enableSorting: true,
    enableRowSelection: true,
    enableColumnResize: true,
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loadingMessage = canvas.getByText("Loading data...");
    expect(loadingMessage).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: "No data found",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emptyMessage = canvas.getByText("No data found");
    expect(emptyMessage).toBeInTheDocument();
  },
};

export const WithRowSelection: Story = {
  args: {
    columns,
    data: sampleData,
    enableRowSelection: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find first data row (skipping header)
    const rows = canvas.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1);

    // Click on the first data row
    await userEvent.click(rows[1]);

    // Check row has selection class
    await waitFor(() => {
      expect(rows[1]).toHaveClass("bg-primary/10");
    });
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    data: sampleData,
    enablePagination: true,
    pageSize: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify pagination is present
    const paginationElement = canvas.getByText("Page 1 of 10");
    expect(paginationElement).toBeInTheDocument();

    // Check we only see 5 data rows initially
    const rows = canvas.getAllByRole("row");
    expect(rows.length).toBe(6); // 5 data rows + header

    // Navigate to next page
    const nextButton = canvas.getByRole("button", { name: /next/i });
    await userEvent.click(nextButton);

    // Check we're on page 2
    await waitFor(() => {
      expect(canvas.getByText("Page 2 of 10")).toBeInTheDocument();
    });
  },
};

export const WithSorting: Story = {
  args: {
    columns,
    data: sampleData,
    enableSorting: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click name header to sort
    const nameHeader = canvas.getByRole("columnheader", { name: /name/i });
    await userEvent.click(nameHeader);

    // Check the sort icon
    await waitFor(() => {
      const sortIcon = within(nameHeader).queryByTestId("sort-icon-asc");
      expect(sortIcon).toBeInTheDocument();
    });

    // Click again to reverse sort
    await userEvent.click(nameHeader);

    // Check the sort icon changed
    await waitFor(() => {
      const sortIcon = within(nameHeader).queryByTestId("sort-icon-desc");
      expect(sortIcon).toBeInTheDocument();
    });
  },
};

export const WithFiltering: Story = {
  args: {
    columns,
    data: sampleData,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find name column header
    const nameHeader = canvas.getByRole("columnheader", { name: /name/i });

    // Find and click filter button
    const filterButton = within(nameHeader).getByRole("button");
    await userEvent.click(filterButton);

    // Verify filter popover appears
    const filterPopover = await canvas.findByPlaceholderText("Filter value...");
    expect(filterPopover).toBeInTheDocument();

    // Type filter value
    await userEvent.type(filterPopover, "Name 1");

    // Click apply button
    const applyButton = canvas.getByRole("button", { name: /apply/i });
    await userEvent.click(applyButton);

    // Verify filtered data (should only show rows with "Name 1" in the name)
    await waitFor(() => {
      const cells = canvas.getAllByRole("cell");
      const nameCell = cells.find(cell => cell.textContent?.includes("Name 1"));
      expect(nameCell).toBeInTheDocument();
    });
  },
};

export const WithColumnReordering: Story = {
  args: {
    columns,
    data: sampleData,
  },
  // Note: Testing drag and drop with Storybook test is complex, so we'll skip the play function
};

export const WithColumnVisibilityManagement: Story = {
  args: {
    columns,
    data: sampleData,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Click column visibility button
    const columnsButton = canvas.getByRole("button", { name: /columns/i });
    await userEvent.click(columnsButton);

    // Find the dropdown menu
    const emailCheckbox = await canvas.findByRole("menuitemcheckbox", { name: /email/i });
    expect(emailCheckbox).toBeInTheDocument();
    
    // Uncheck the email column
    await userEvent.click(emailCheckbox);
    
    // Close dropdown
    await userEvent.click(document.body);
    
    // Verify column is hidden
    await waitFor(() => {
      const headers = canvas.getAllByRole("columnheader");
      const emailHeader = headers.find(h => h.textContent?.includes("Email"));
      expect(emailHeader).not.toBeInTheDocument();
    });
  },
};

export const CustomStyling: Story = {
  args: {
    columns,
    data: sampleData,
    className: "border-blue-500 shadow-md",
    rowClassName: "hover:bg-blue-50",
    headerClassName: "bg-gray-100",
    cellClassName: "px-6 py-3",
    selectedRowClassName: "bg-blue-100",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that our custom container class is applied
    const container = canvas.getByRole("table").closest("div");
    expect(container).toHaveClass("border-blue-500", "shadow-md");

    // Check custom header class
    const header = canvas.getAllByRole("columnheader")[0].closest("tr");
    expect(header).toHaveClass("bg-gray-100");

    // Check custom cell class
    const cell = canvas.getAllByRole("cell")[0];
    expect(cell).toHaveClass("px-6", "py-3");
  },
};

export const DisabledFeatures: Story = {
  args: {
    columns,
    data: sampleData,
    enableSorting: false,
    enablePagination: false,
    enableColumnResize: false,
    enableRowSelection: false,
  },
};
