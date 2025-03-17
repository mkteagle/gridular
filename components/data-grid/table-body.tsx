import React from "react";
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
              theme.row,
              "hover:bg-muted/50 transition-colors",
              isSelected && selectedRowClassName,
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
                    "p-2 border-b",
                    theme.cell,
                    column.cellClassName,
                    cellClassName
                  )}
                  style={{
                    width: width + "px",
                    minWidth: width + "px",
                    maxWidth: width + "px",
                  }}
                >
                  {column.cell ? column.cell(row) : (row as any)[column.id]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
