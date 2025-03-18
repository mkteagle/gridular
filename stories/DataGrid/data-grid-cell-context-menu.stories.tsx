import { DataGrid } from "@/components/data-grid";
import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ColumnDef } from "@/components/data-grid/types";

const data = [
  { id: "1", name: "John", age: 30, city: "New York" },
  { id: "2", name: "Jane", age: 25, city: "Los Angeles" },
  { id: "3", name: "Bob", age: 35, city: "Chicago" },
];

interface DataRow {
  id: string;
  name: string;
  age: number;
  city: string;
}

const meta: Meta<typeof DataGrid> = {
  title: "Data Grid/Cell Context Menu",
  component: DataGrid,
};

export default meta;

const WithCellContextMenuComponent = () => {
  const [selectedCell, setSelectedCell] = useState<{
    rowId: string;
    columnId: string;
  } | null>(null);

  const columns = [
    { id: "name", header: "Name" },
    { id: "age", header: "Age" },
    { id: "city", header: "City" },
  ].map((col, index) => ({ ...col, index }));

  const contextMenuContent = (row: DataRow, column: ColumnDef<DataRow>) => (
    <ContextMenuContent>
      <ContextMenuItem
        onClick={() => console.log("Copy:", (row as any)[column.id])}
      >
        Copy
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => console.log("Edit:", (row as any)[column.id])}
      >
        Edit
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => console.log("Delete:", (row as any)[column.id])}
      >
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  );

  return (
    <DataGrid
      data={data}
      columns={columns}
      pageSize={5}
      pageCount={1}
      pageIndex={0}
      totalRows={data.length}
      selectedCell={selectedCell}
      onCellSelect={(rowId, columnId) => setSelectedCell({ rowId, columnId })}
      contextMenuContent={contextMenuContent}
      enableCellSelection
    />
  );
};

export const WithCellContextMenu: StoryObj<typeof DataGrid> = {
  render: () => <WithCellContextMenuComponent />,
};
