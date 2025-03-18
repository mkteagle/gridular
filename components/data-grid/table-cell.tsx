import React from "react";
import { cn } from "@/lib/utils";
import { ColumnDef } from "./types";
import { useTailwindTheme } from "../theme-provider/theme-provider";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

interface TableCellProps<T> {
  column: ColumnDef<T>;
  row: T;
  cellClassName?: string;
  isSelected?: boolean;
  onSelect?: (selected: boolean) => void;
  selectedCellClassName?: string;
  preventRowSelection?: boolean;
  rowId?: string;
  contextMenuContent?: (row: T, column: ColumnDef<T>) => React.ReactNode;
}

export const TableCell = <T,>({
  column,
  row,
  cellClassName,
  isSelected = false,
  onSelect,
  contextMenuContent,
  selectedCellClassName = "ring-2 ring-primary ring-inset",
  preventRowSelection = true,
}: TableCellProps<T>) => {
  // Get theme classes
  const themeClasses = useTailwindTheme();

  const content = (
    <div className="relative z-0">
      {column.renderCell
        ? column.renderCell(row)
        : column.cell
        ? column.cell(row)
        : (row as any)[column.id]}
    </div>
  );

  const cell = contextMenuContent ? (
    <ContextMenu
      onOpenChange={(open) => {
        if (onSelect) {
          if (open) {
            onSelect(true);
          } else {
            // Deselect by calling onSelect with null or clearing selection
            onSelect(false);
          }
        }
      }}
    >
      <ContextMenuTrigger className="flex h-full w-full">
        {content}
      </ContextMenuTrigger>
      {contextMenuContent(row, column)}
    </ContextMenu>
  ) : (
    content
  );

  return (
    <td
      className={cn(
        themeClasses.cell, // Apply theme cell class
        column.cellClassName, // Apply column-specific cell class
        cellClassName, // Apply custom cell class passed as prop
        // Use an approach that works with border-collapse
        isSelected
          ? "relative after:absolute after:inset-0 after:pointer-events-none"
          : ""
      )}
      style={{
        width: column.width || 150,
        minWidth: column.width || 150,
        maxWidth: column.width || 150,
        cursor: onSelect ? "pointer" : "default",
      }}
      onClick={(e) => {
        if (onSelect) {
          onSelect(!isSelected); // Toggle selection state
          if (preventRowSelection) {
            e.stopPropagation();
          }
        }
      }}
    >
      {cell}
      {/* Add a pseudo-element for the outline that won't be affected by border-collapse */}
      {isSelected && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none z-10",
            selectedCellClassName
          )}
          aria-hidden="true"
        />
      )}
    </td>
  );
};
