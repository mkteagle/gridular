import React from "react";
import { cn } from "@/lib/utils";
import { ColumnDef } from "./types";
import { useTailwindTheme } from "../theme-provider/theme-provider";

interface TableCellProps<T> {
  column: ColumnDef<T>;
  row: T;
  cellClassName?: string;
}

export const TableCell = <T,>({
  column,
  row,
  cellClassName,
}: TableCellProps<T>) => {
  // Get theme classes
  const themeClasses = useTailwindTheme();

  return (
    <td
      className={cn(
        themeClasses.cell, // Apply theme cell class
        column.cellClassName, // Apply column-specific cell class
        cellClassName // Apply custom cell class passed as prop
      )}
      style={{
        width: column.width || 150,
        minWidth: column.width || 150,
        maxWidth: column.width || 150,
      }}
    >
      {column.cell ? column.cell(row) : (row as any)[column.id]}
    </td>
  );
};
