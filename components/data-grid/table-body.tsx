import React from "react";
import { ColumnDef } from "./types";
import { GroupRow } from "./group-row";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CellPosition } from "./use-select-cell";
import { TableRow } from "./table-row";

interface TableBodyProps<T> {
  paginatedData: any[]; // Use any[] to accommodate both T and group rows
  columns: ColumnDef<T>[];
  selectedRows: Record<string, boolean>;
  enableRowSelection: boolean;
  onRowSelect: (rowId: string) => void;
  onRowClick?: (row: T) => void;
  rowClassName?: string;
  cellClassName?: string;
  columnWidths: Record<string, number>;
  theme: any;
  selectedRowClassName?: string;
  renderCell?: (row: T, column: ColumnDef<T>) => React.ReactNode;
  enableGrouping?: boolean;
  groupingState?: {
    groupByColumns: string[];
    expandedGroups: Record<string, boolean>;
  };
  toggleGroupExpanded?: (groupKey: string) => void;
  renderGroupRow?: (props: any) => React.ReactNode;
  groupExpandIcon?: React.ReactNode;
  groupCollapseIcon?: React.ReactNode;
  groupRowProps?: Record<string, any>;

  // Cell selection props
  selectedCell?: CellPosition | null;
  onCellSelect?: (rowId: string, columnId: string) => void;
  selectedCellClassName?: string;
  preventRowSelection?: boolean;
  contextMenuContent?: (row: T, column: ColumnDef<T>) => React.ReactNode;
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
  enableGrouping = false,
  groupingState,
  toggleGroupExpanded,
  renderGroupRow,
  groupExpandIcon = <ChevronDown className="h-4 w-4" />,
  groupCollapseIcon = <ChevronRight className="h-4 w-4" />,
  groupRowProps = {},
  selectedCell = null,
  onCellSelect,
  selectedCellClassName = "ring-2 ring-primary ring-inset",
  preventRowSelection,
  contextMenuContent,
}: TableBodyProps<T>) => {
  return (
    <tbody className={theme.classes.tbody}>
      {paginatedData.map((row: any, rowIndex) => {
        if (enableGrouping && row.isGroupRow) {
          return (
            <GroupRow
              key={row.groupKey}
              columnId={row.columnId}
              value={row.groupValue}
              depth={row.depth}
              isExpanded={groupingState?.expandedGroups[row.groupKey] || false}
              onToggleExpand={() => toggleGroupExpanded?.(row.groupKey)}
              count={row.count}
              columns={columns.length}
              groupKey={row.groupKey}
              expandIcon={groupExpandIcon}
              collapseIcon={groupCollapseIcon}
              renderGroupRow={renderGroupRow}
              {...groupRowProps}
            />
          );
        }

        const rowId = row.id || `row-${rowIndex}`;
        const isSelected = selectedRows[rowId];

        return (
          <TableRow
            key={rowId}
            row={row}
            rowId={rowId}
            columns={columns}
            isSelected={isSelected}
            onRowSelect={
              enableRowSelection ? () => onRowSelect(rowId) : undefined
            }
            onRowClick={onRowClick}
            selectedRowClassName={selectedRowClassName}
            rowClassName={rowClassName}
            cellClassName={cellClassName}
            columnWidths={columnWidths}
            selectedCell={selectedCell}
            onCellSelect={onCellSelect}
            selectedCellClassName={selectedCellClassName}
            preventRowSelection={preventRowSelection}
            contextMenuContent={contextMenuContent}
          />
        );
      })}
    </tbody>
  );
};
