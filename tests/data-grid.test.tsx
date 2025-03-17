import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DataGrid, ThemeProvider } from "../components/data-grid";

// Sample data for testing
const testData = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Viewer" },
];

const columns = [
  { id: "name", header: "Name" },
  { id: "email", header: "Email" },
  { id: "role", header: "Role" },
];

describe("DataGrid Component", () => {
  test("renders with data", () => {
    render(
      <ThemeProvider>
        <DataGrid columns={columns} data={testData} />
      </ThemeProvider>
    );

    // Check if column headers are rendered
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();

    // Check if data is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("Viewer")).toBeInTheDocument();
  });

  test("handles sorting", () => {
    render(
      <ThemeProvider>
        <DataGrid columns={columns} data={testData} enableSorting />
      </ThemeProvider>
    );

    // Click on Name header to sort
    fireEvent.click(screen.getByText("Name"));

    // First row should be Bob (alphabetical order)
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Bob Johnson");

    // Click again to reverse sort
    fireEvent.click(screen.getByText("Name"));

    // First row should now be John (reverse alphabetical)
    const rowsAfterSecondClick = screen.getAllByRole("row");
    expect(rowsAfterSecondClick[1]).toHaveTextContent("John Doe");
  });

  test("handles row selection", () => {
    const onSelectionChange = jest.fn();

    render(
      <ThemeProvider>
        <DataGrid
          columns={columns}
          data={testData}
          enableRowSelection
          onSelectionChange={onSelectionChange}
        />
      </ThemeProvider>
    );

    // Click on a row to select it
    fireEvent.click(screen.getByText("John Doe"));

    // Check if selection callback was called
    expect(onSelectionChange).toHaveBeenCalledWith({ "1": true });
  });

  test("renders empty state", () => {
    render(
      <ThemeProvider>
        <DataGrid
          columns={columns}
          data={[]}
          emptyMessage="No data available"
        />
      </ThemeProvider>
    );

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("renders loading state", () => {
    render(
      <ThemeProvider>
        <DataGrid
          columns={columns}
          data={testData}
          isLoading
          loadingMessage="Loading data..."
        />
      </ThemeProvider>
    );

    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });
});
