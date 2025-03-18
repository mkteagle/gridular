import React from "react";
import { render, screen, within } from "./__test__/utils";
import { DataGrid } from "@/components/data-grid";
import { ColumnDef } from "@/components/data-grid/types";
import { describe, test, expect, vi } from "vitest";

// Sample data for testing
const testData = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    age: 35,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    age: 28,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    age: 42,
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Admin",
    age: 31,
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Editor",
    age: 39,
  },
];

const columns: ColumnDef<(typeof testData)[0]>[] = [
  { id: "name", header: "Name", enableSorting: true, enableFiltering: true },
  { id: "email", header: "Email", enableSorting: true, enableFiltering: true },
  { id: "role", header: "Role", enableSorting: true, enableFiltering: true },
  { id: "age", header: "Age", enableSorting: true },
];

describe("DataGrid Component", () => {
  test("renders with data and proper column headers", () => {
    const { user } = render(
      <DataGrid
        columns={columns}
        data={testData}
        pageIndex={0}
        pageCount={1}
        pageSize={testData.length}
      />
    );

    // Check column headers
    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });

    // Check data in cells - using getAllByText for repeated values
    testData.forEach((item) => {
      const rows = screen.getAllByRole("row");
      const rowWithData = rows.find(
        (row) => within(row).queryByText(item.name) !== null
      );
      expect(rowWithData).toBeTruthy();
      if (rowWithData) {
        expect(within(rowWithData).getByText(item.name)).toBeInTheDocument();
        expect(within(rowWithData).getByText(item.email)).toBeInTheDocument();
        expect(within(rowWithData).getByText(item.role)).toBeInTheDocument();
        expect(
          within(rowWithData).getByText(String(item.age))
        ).toBeInTheDocument();
      }
    });
  });

  test("handles sorting when clicking on column headers", async () => {
    const onSortingChange = vi.fn();
    const { user } = render(
      <DataGrid
        columns={columns}
        data={testData}
        enableSorting={true}
        onSortChange={onSortingChange}
        pageIndex={0}
        pageCount={1}
        pageSize={testData.length}
      />
    );

    // Find and click the name column header
    const nameHeader = screen.getByText("Name");
    await user.click(nameHeader);

    // Verify sorting callback was called with the correct format
    expect(onSortingChange).toHaveBeenCalledWith({
      column: "name",
      direction: "asc",
    });
  });

  test("handles row selection", async () => {
    const onRowSelectionChange = vi.fn();

    const { user } = render(
      <DataGrid
        columns={columns}
        data={testData}
        enableRowSelection={true}
        onRowSelectionChange={onRowSelectionChange}
        pageIndex={0}
        pageCount={1}
        pageSize={testData.length}
      />
    );

    // Click on a row to select it
    await user.click(screen.getByText("John Doe"));

    // Check if selection callback was called with the correct row ID
    expect(onRowSelectionChange).toHaveBeenCalledWith(
      expect.objectContaining({ "1": true })
    );

    // Click on another row
    await user.click(screen.getByText("Jane Smith"));

    // Check that the new selection was registered
    expect(onRowSelectionChange).toHaveBeenCalledWith(
      expect.objectContaining({ "2": true })
    );
  });

  test("shows empty state message when no data is provided", () => {
    render(
      <DataGrid
        columns={columns}
        data={[]}
        emptyMessage="Custom empty message"
        pageIndex={0}
        pageCount={0}
        pageSize={10}
      />
    );

    expect(screen.getByText("Custom empty message")).toBeInTheDocument();
  });

  test("shows loading state when isLoading is true", () => {
    render(
      <DataGrid
        columns={columns}
        data={testData}
        isLoading={true}
        loadingMessage="Custom loading message"
        pageIndex={0}
        pageCount={1}
        pageSize={testData.length}
      />
    );

    expect(screen.getByText("Custom loading message")).toBeInTheDocument();
  });

  test("handles pagination correctly", async () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();

    const { user } = render(
      <DataGrid
        columns={columns}
        data={testData}
        enablePagination={true}
        pageIndex={0}
        pageCount={3}
        pageSize={2}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        pageSizeOptions={[2, 5, 10]}
      />
    );

    // Find the next page button using the actual ">" text
    const nextButton = screen.getByRole("button", { name: ">" });
    await user.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(1);

    // Find and change page size using the select element
    const pageSizeSelect = screen.getByRole("combobox");
    await user.selectOptions(pageSizeSelect, "5");

    expect(onPageSizeChange).toHaveBeenCalledWith(5);
  });

  test("handles custom cell rendering", () => {
    const customColumns = [
      ...columns,
      {
        id: "actions",
        header: "Actions",
        cell: () => <button>Edit</button>,
      },
    ];

    render(
      <DataGrid
        columns={customColumns}
        data={testData}
        pageIndex={0}
        pageCount={1}
        pageSize={testData.length}
      />
    );

    // Check if custom rendered buttons exist
    const buttons = screen.getAllByRole("button", { name: /edit/i });
    expect(buttons.length).toBe(testData.length);
  });

  test("handles filtering", async () => {
    const onFilterChange = vi.fn();

    const { user } = render(
      <DataGrid
        columns={columns}
        data={testData}
        filterState={{}}
        onFilterChange={onFilterChange}
        pageIndex={0}
        pageCount={1}
        pageSize={testData.length}
      />
    );

    // Find the Role column header
    const roleColumnHeader = screen.getByRole("columnheader", {
      name: /role/i,
    });

    // Find and click the filter button within the Role column header
    const filterButton = within(roleColumnHeader).getByRole("button");
    await user.click(filterButton);

    // Find filter input and type in it
    const filterInput = screen.getByPlaceholderText(/filter/i);
    await user.type(filterInput, "Admin");

    // Find and click apply button
    const applyButton = screen.getByRole("button", { name: /apply/i });
    await user.click(applyButton);

    // Check if filter callback was called with correct value
    expect(onFilterChange).toHaveBeenCalledWith({
      role: "Admin", // Changed from role to name to match actual implementation
    });
  });

  test("handles column visibility through column manager", async () => {
    const { user } = render(
      <DataGrid
        columns={columns}
        data={testData}
        pageIndex={0}
        pageCount={1}
        pageSize={testData.length}
        columnManagerProps={{
          showResetButton: true,
        }}
      />
    );

    // Verify initial state - all columns should be visible
    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });

    // Open column manager
    const columnManagerButton = screen.getByText(/columns/i);
    await user.click(columnManagerButton);

    // Look for the Email column toggle in the dropdown using menuitemcheckbox role
    const emailToggle = screen.getByRole("menuitemcheckbox", {
      name: /email/i,
    });
    await user.click(emailToggle);

    // Verify Email column is no longer visible
    expect(screen.queryByText("john@example.com")).not.toBeInTheDocument();
  });

  test("handles row click callback", async () => {
    const onRowClick = vi.fn();

    const { user } = render(
      <DataGrid
        columns={columns}
        data={testData}
        onRowClick={onRowClick}
        pageIndex={0}
        pageCount={1}
        pageSize={testData.length}
      />
    );

    // Click on a row
    await user.click(screen.getByText("John Doe"));

    // Check if onRowClick was called with the correct row data
    expect(onRowClick).toHaveBeenCalledWith(testData[0]);
  });

  test("handles custom class names for styling", () => {
    const customClasses = {
      container: "custom-container-class",
      row: "custom-row-class",
      cell: "custom-cell-class",
    };

    render(
      <DataGrid
        columns={columns}
        data={testData}
        classes={customClasses}
        pageIndex={0}
        pageCount={1}
        pageSize={testData.length}
      />
    );

    // Check if custom classes were applied
    expect(
      document.querySelector(".custom-container-class")
    ).toBeInTheDocument();
    expect(document.querySelector(".custom-row-class")).toBeInTheDocument();
    expect(document.querySelector(".custom-cell-class")).toBeInTheDocument();
  });
});
