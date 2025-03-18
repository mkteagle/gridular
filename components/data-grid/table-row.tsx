import React from "react";
import { cn } from "@/lib/utils";
import { ColumnDef } from "./types";
import { TableCell } from "./table-cell";
import { CellPosition } from "./use-select-cell";

interface TableRowProps<T> {
  row: T;
  columns: ColumnDef<T>[];
  rowId: string;
  isSelected: boolean;
  onRowSelect?: () => void;
  onRowClick?: (row: T) => void;
  selectedRowClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  columnWidths: Record<string, number>;
  // Cell selection props
  selectedCell?: CellPosition | null;
  onCellSelect?: (rowId: string, columnId: string) => void;
  selectedCellClassName?: string;
  preventRowSelection?: boolean;
  contextMenuContent?: (row: T, column: ColumnDef<T>) => React.ReactNode;
}

export function TableRow<T>({
  row,
  columns,
  rowId,
  isSelected,
  onRowSelect,
  onRowClick,
  selectedRowClassName,
  rowClassName,
  cellClassName,
  columnWidths,
  selectedCell,
  onCellSelect,
  selectedCellClassName,
  preventRowSelection,
  contextMenuContent,
}: TableRowProps<T>) {
  return (
    <tr
      className={cn(
        "hover:bg-muted/50 transition-colors",
        isSelected && selectedRowClassName,
        rowClassName
      )}
      onClick={() => {
        if (onRowSelect) {
          onRowSelect();
        }
        if (onRowClick) {
          onRowClick(row);
        }
      }}
      style={{
        cursor: onRowSelect || onRowClick ? "pointer" : "default",
      }}
    >
      {columns.map((column) => {
        const isCellSelected =
          selectedCell &&
          selectedCell.rowId === rowId &&
          selectedCell.columnId === column.id;

        return (
          <TableCell
            key={`${rowId}-${column.id}`}
            column={{
              ...column,
              width: columnWidths[column.id] || column.width,
            }}
            row={row}
            cellClassName={cellClassName}
            isSelected={!!isCellSelected}
            selectedCellClassName={selectedCellClassName}
            onSelect={(selected) => {
              if (onCellSelect) {
                if (selected) {
                  onCellSelect(rowId, column.id);
                } else {
                  onCellSelect("", ""); // Clear selection
                }
              }
            }}
            preventRowSelection={preventRowSelection}
            contextMenuContent={contextMenuContent}
          />
        );
      })}
    </tr>
  );
}
