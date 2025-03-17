import React from "react";
import { cn } from "@/lib/utils";
import { ColumnDef } from "./types";

interface TableCellProps<T> {
  column: ColumnDef<T>;
  row: T;
  cellClassName?: string;
}

export const TableCell = <T,>({ column, row, cellClassName }: TableCellProps<T>) => {
  return (
    <td
      className={cn("p-2 border-b", cellClassName)}
      style={{
        width: column.width || 150,
        maxWidth: column.width || 150,
      }}
    >
      {column.cell ? column.cell(row) : (row as any)[column.id]}
    </td>
  );
};