import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ColumnDef, RowSelectionState } from "./types";

interface TableBodyProps<T> {
  paginatedData: T[];
  columns: ColumnDef<T>[];
  selectedRows: RowSelectionState;
  enableRowSelection: boolean;
  onRowSelect: (rowId: string) => void;
  onRowClick?: (row: T) => void;
  rowClassName?: string;
  cellClassName?: string;
  columnWidths: Record<string, number>;
  theme: any;
  selectedRowClassName?: string;
  renderCell?: (row: T, column: ColumnDef<T>) => ReactNode;
}

export const TableBody = <T,>({
  paginatedData,
  columns,
  selectedRows,
  enableRowSelection,
  onRowSelect,
  onRowClick,
  rowClassName,
  cellClassName,
  columnWidths,
  theme,
  selectedRowClassName,
  renderCell,
}: TableBodyProps<T>) => {
  return (
    <tbody>
      {paginatedData.map((row, rowIndex) => {
        const rowId = (row as any).id || `row-${rowIndex}`;
        const isSelected = selectedRows[rowId];

        return (
          <tr
            key={rowId}
            className={cn(
              theme.classes.row, // Access using theme.classes.row
              isSelected && (selectedRowClassName || "bg-primary/10"),
              rowClassName
            )}
            onClick={() => {
              if (enableRowSelection) {
                onRowSelect(rowId);
              }
              if (onRowClick) {
                onRowClick(row);
              }
            }}
            style={{
              cursor: enableRowSelection || onRowClick ? "pointer" : "default",
            }}
          >
            {columns.map((column) => {
              const width = columnWidths[column.id] || column.width || 150;

              return (
                <td
                  key={`${rowId}-${column.id}`}
                  className={cn(
                    theme.classes.cell, // Access using theme.classes.cell
                    column.cellClassName,
                    cellClassName
                  )}
                  style={{
                    width: width + "px",
                    minWidth: width + "px",
                    maxWidth: width + "px",
                  }}
                >
                  {renderCell
                    ? renderCell(row, column)
                    : column.cell
                    ? column.cell(row)
                    : (row as any)[column.id]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
