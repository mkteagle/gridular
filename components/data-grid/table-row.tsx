import React from "react";
import { cn } from "@/lib/utils";
import { ColumnDef } from "./types";

interface TableRowProps<T> {
  row: T;
  columns: ColumnDef<T>[];
  onRowClick?: (row: T) => void;
  isSelected: boolean;
  onSelect: () => void;
  selectedRowClassName?: string;
  rowClassName?: string;
}

export function TableRow<T>({
  row,
  columns,
  onRowClick,
  isSelected,
  onSelect,
  selectedRowClassName,
  rowClassName,
}: TableRowProps<T>) {
  const rowId = (row as any).id || `row-${Math.random()}`;

  return (
    <tr
      key={rowId}
      className={cn(
        "hover:bg-muted/50 transition-colors",
        isSelected && selectedRowClassName,
        rowClassName
      )}
      onClick={() => {
        if (onSelect) {
          onSelect();
        }
        if (onRowClick) {
          onRowClick(row);
        }
      }}
      style={{
        cursor: onRowClick ? "pointer" : "default",
      }}
    >
      {columns.map((column) => (
        <td
          key={`${rowId}-${column.id}`}
          className={cn("p-2 border-b", column.cellClassName)}
          style={{
            width: column.width || 150,
            maxWidth: column.width || 150,
          }}
        >
          {column.cell ? column.cell(row) : (row as any)[column.id]}
        </td>
      ))}
    </tr>
  );
}