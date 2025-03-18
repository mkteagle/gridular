import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  RowSelectionState,
  GroupingState,
  GroupRowRenderProps,
} from "./types";
import { GroupRow } from "./group-row";

interface TableBodyProps<T> {
  paginatedData: any[]; // Use any[] to accommodate both T and group rows
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

  // Group-related props
  enableGrouping?: boolean;
  groupingState?: GroupingState;
  toggleGroupExpanded?: (groupKey: string, expanded?: boolean) => void;
  renderGroupRow?: (props: GroupRowRenderProps) => React.ReactNode;
  groupExpandIcon?: React.ReactNode;
  groupCollapseIcon?: React.ReactNode;
  groupRowProps?: {
    className?: string;
    rowClassName?: string;
    cellClassName?: string;
    contentClassName?: string;
    labelClassName?: string;
    iconClassName?: string;
    countClassName?: string;
    indentSize?: number;
    style?: React.CSSProperties;
    rowStyle?: React.CSSProperties;
    cellStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
  };
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

  // Group-related props
  enableGrouping = false,
  groupingState,
  toggleGroupExpanded,
  renderGroupRow,
  groupExpandIcon,
  groupCollapseIcon,
  groupRowProps = {},
}: TableBodyProps<T>) => {
  return (
    <tbody>
      {paginatedData.map((row: any, rowIndex) => {
        // Handle group rows
        if (enableGrouping && row.isGroupRow) {
          const isExpanded = !!groupingState?.expandedGroups?.[row.groupKey];

          return (
            <GroupRow
              key={row.groupKey}
              groupKey={row.groupKey}
              columnId={row.columnId}
              value={row.groupValue}
              depth={row.depth}
              isExpanded={isExpanded}
              onToggleExpand={() => {
                if (toggleGroupExpanded) {
                  toggleGroupExpanded(row.groupKey, !isExpanded);
                }
              }}
              count={row.count}
              columns={columns.length}
              formatter={
                columns.find((col) => col.id === row.columnId)?.groupFormatter
              }
              renderGroupRow={renderGroupRow}
              expandIcon={groupExpandIcon}
              collapseIcon={groupCollapseIcon}
              {...groupRowProps}
            />
          );
        }

        // Regular row handling
        const rowId = row.id || `row-${rowIndex}`;
        const isSelected = selectedRows[rowId];

        return (
          <tr
            key={rowId}
            className={cn(
              theme.classes.row,
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
                    theme.classes.cell,
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
                    : row[column.id]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
