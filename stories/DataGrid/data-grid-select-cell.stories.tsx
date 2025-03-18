import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataGrid } from "@/components/data-grid/data-grid";
import { CellPosition } from "@/components/data-grid/use-select-cell";
import { ColumnDef } from "@/components";

const meta: Meta<typeof DataGrid> = {
  title: "Data Grid/Cell Selection",
  component: DataGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

// Sample data for the DataGrid
const data = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "5",
    name: "Charlie Green",
    email: "charlie@example.com",
    role: "User",
    status: "Pending",
  },
];

// Column definitions
const columns: ColumnDef<any>[] = [
  { id: "name", header: "Name", width: 150, index: 0 },
  { id: "email", header: "Email", width: 200, index: 1 },
  { id: "role", header: "Role", width: 100, index: 2 },
  { id: "status", header: "Status", width: 100, index: 3 },
];

// Interactive cell selection demo
const CellSelectionDemo = () => {
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded">
        {selectedCell ? (
          <div>
            <h3 className="font-medium">Selected Cell</h3>
            <p>
              Row ID: <span className="font-mono">{selectedCell.rowId}</span>
            </p>
            <p>
              Column ID:{" "}
              <span className="font-mono">{selectedCell.columnId}</span>
            </p>
            <p>
              Value:{" "}
              <span className="font-mono">
                {selectedCell.rowId &&
                  selectedCell.columnId &&
                  data.find((row) => row.id === selectedCell.rowId)?.[
                    selectedCell.columnId as keyof (typeof data)[0]
                  ]}
              </span>
            </p>
          </div>
        ) : (
          <p>Click on a cell to select it</p>
        )}
      </div>

      <DataGrid
        columns={columns}
        data={data}
        pageIndex={0}
        pageCount={1}
        pageSize={10}
        totalRows={data.length}
        enableCellSelection={true}
        onCellSelect={(rowId, columnId) => setSelectedCell({ rowId, columnId })}
        selectedCellClassName="ring-2 ring-primary ring-inset bg-primary/5"
      />
    </div>
  );
};

// Simple cell selection story
export const Default: Story = {
  render: () => <CellSelectionDemo />,
};

// Custom styling for selected cell
export const CustomStyling: Story = {
  args: {
    columns,
    data,
    pageIndex: 0,
    pageCount: 1,
    pageSize: 10,
    totalRows: data.length,
    enableCellSelection: true,
    classes: {
      selectedCell:
        "ring-2 ring-inset ring-red-500",
    },
  },
};

// With row selection enabled as well
export const WithRowSelection: Story = {
  args: {
    columns,
    data,
    pageIndex: 0,
    pageCount: 1,
    pageSize: 10,
    totalRows: data.length,
    enableCellSelection: true,
    enableRowSelection: true,
    selectedCellClassName: "ring-2 ring-primary ring-inset",
    preventRowSelection: false,
  },
};

// Controlled cell selection
export const ControlledSelection: Story = {
  render: () => {
    const [selectedCell, setSelectedCell] = useState<CellPosition>({
      rowId: "2",
      columnId: "name",
    });

    const handleCellSelect = (rowId: string, columnId: string) => {
      // Only allow selection of name and email cells
      if (columnId === "name" || columnId === "email") {
        setSelectedCell({ rowId, columnId });
      }
    };

    return (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded">
          <p>Only name and email cells are selectable</p>
          <p>
            Currently selected: {selectedCell.rowId}:{selectedCell.columnId}
          </p>
        </div>

        <DataGrid
          columns={columns}
          data={data}
          pageIndex={0}
          pageCount={1}
          pageSize={10}
          totalRows={data.length}
          enableCellSelection={true}
          onCellSelect={handleCellSelect}
          selectedCell={selectedCell}
          selectedCellClassName="ring-2 ring-green-500 ring-inset bg-green-50 dark:bg-green-900/20"
        />
      </div>
    );
  },
};

// Cell selection with editable behavior hint
export const SelectForEditing: Story = {
  render: () => {
    const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
    const [editMode, setEditMode] = useState(false);

    const handleCellDoubleClick = (rowId: string, columnId: string) => {
      setEditMode(true);
    };

    return (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded">
          <p>
            {editMode
              ? "Editing mode active (simulated)"
              : "Click to select, double-click to edit (simulated)"}
          </p>
        </div>

        <DataGrid
          columns={columns.map((col) => ({
            ...col,
            cellClassName: "cursor-pointer",
            // This is just a simulation of the behavior
            cell: (row: {
              id: string;
              name: string;
              email: string;
              role: string;
              status: string;
            }) => (
              <div onDoubleClick={() => handleCellDoubleClick(row.id, col.id)}>
                {row[col.id as keyof typeof row]}
              </div>
            ),
          }))}
          data={data}
          pageIndex={0}
          pageCount={1}
          pageSize={10}
          totalRows={data.length}
          enableCellSelection={true}
          onCellSelect={(rowId, columnId) => {
            setSelectedCell({ rowId, columnId });
            setEditMode(false);
          }}
          selectedCellClassName={
            editMode
              ? "ring-2 ring-blue-500 ring-inset bg-blue-50 dark:bg-blue-900/20"
              : "ring-2 ring-primary ring-inset bg-primary/5"
          }
        />
      </div>
    );
  },
};
