"use client";

import React, { useMemo, useRef, useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  DataGridProps as BaseDataGridProps,
  DataGridRenderProps,
  FilterMenuCustomization,
  SortState,
} from "./types";
import { TableHeader } from "./table-header";
import { TableBody } from "./table-body";
import { Pagination } from "./pagination";
import { ColumnManager } from "./column-manager";
import { useTheme } from "../theme-provider/theme-provider";
import { useGridPersistence } from "./use-grid-persistence";

// Extended DataGridProps with column manager and pagination customization options
export interface DataGridProps<T> extends BaseDataGridProps<T> {
  // Add column manager customization
  columnManagerProps?: Partial<
    Omit<
      React.ComponentProps<typeof ColumnManager<T>>,
      | "columns"
      | "visibleColumns"
      | "toggleColumnVisibility"
      | "resetGridPreferences"
    >
  >;

  // Add pagination customization
  paginationProps?: Partial<
    Omit<
      React.ComponentProps<typeof Pagination>,
      | "pageIndex"
      | "pageCount"
      | "pageSize"
      | "setPageIndex"
      | "setPageSize"
      | "pageSizeOptions"
      | "processedDataLength"
    >
  >;
}

export function DataGrid<T>({
  // Data props
  columns,
  data,
  // State props
  sortState = null,
  onSortChange,
  filterState,
  onFilterChange,
  selectedRows,
  onRowSelectionChange,
  pageIndex,
  pageCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onRowClick,

  // Feature flags
  enableSorting = true,
  enableColumnResize = true,
  enableRowSelection = false,
  enablePagination = true,

  // Configuration props
  pageSizeOptions = [5, 10, 20, 50, 100],
  emptyMessage = "No data available",
  loadingMessage = "Loading data...",
  isLoading = false,
  gridId = "default",

  // Styling props - consolidated into classes object
  classes = {},
  className, // Keep this for backward compatibility

  // Render customization props
  renderCell,
  renderSortIcon,
  renderFilterIcon,
  sortIconVariant = "arrows",

  // New customization props
  columnManagerProps = {},
  paginationProps = {},

  // Render props
  children,
  filterMenu,
  renderHeader,
}: DataGridProps<T>) {
  const { theme } = useTheme();
  const filterValueRefs = useRef<Record<string, string>>(filterState || {});
  const [filterMenuOpen, setFilterMenuOpen] = useState<string | null>(null);
  const [activeFilterColumn, setActiveFilterColumn] =
    useState<ColumnDef<T> | null>(null);

  // Use our grid persistence hook for column preferences
  const {
    preferences,
    updateColumnWidth,
    updateColumnOrder,
    toggleColumnVisibility,
    resetPreferences,
  } = useGridPersistence(gridId, columns);

  // Calculate visible columns based on preferences
  const visibleColumns = useMemo(() => {
    const hiddenIds = new Set(preferences.hiddenColumns);

    // Filter by visibility
    const visible = columns
      .filter((col) => !hiddenIds.has(col.id))
      .map((col) => col.id);

    // Get and apply the saved order for visible columns
    const orderedIds = preferences.columnOrder.filter((id) =>
      visible.includes(id)
    );

    // Add any new columns that aren't in the saved order
    visible.forEach((id) => {
      if (!orderedIds.includes(id)) {
        orderedIds.push(id);
      }
    });

    return orderedIds;
  }, [columns, preferences.hiddenColumns, preferences.columnOrder]);

  // Get filtered columns in the correct order
  const orderedColumns = useMemo(() => {
    const colMap = new Map(columns.map((col) => [col.id, col]));
    return visibleColumns.map((id) => colMap.get(id)!).filter(Boolean);
  }, [columns, visibleColumns]);

  // Update filter refs when filter state changes
  useEffect(() => {
    if (filterState) {
      filterValueRefs.current = { ...filterState };
    }
  }, [filterState]);

  // Handle filter menu toggling
  const handleFilterMenuToggle = (columnId: string | null) => {
    if (columnId === filterMenuOpen) {
      setFilterMenuOpen(null);
      setActiveFilterColumn(null);
    } else if (columnId) {
      setFilterMenuOpen(columnId);
      const column = columns.find((col) => col.id === columnId);
      if (column) {
        setActiveFilterColumn(column);
      }
    } else {
      setFilterMenuOpen(null);
      setActiveFilterColumn(null);
    }
  };

  // Pass filter actions up to parent
  const handleApplyFilter = (value: string) => {
    if (!activeFilterColumn || !onFilterChange) return;

    const newFilterState = { ...(filterState || {}) };
    if (value) {
      newFilterState[activeFilterColumn.id] = value;
    } else {
      delete newFilterState[activeFilterColumn.id];
    }

    onFilterChange(newFilterState);
    setFilterMenuOpen(null);
  };

  const handleClearFilter = () => {
    if (!activeFilterColumn || !onFilterChange) return;

    const newFilterState = { ...(filterState || {}) };
    delete newFilterState[activeFilterColumn.id];

    onFilterChange(newFilterState);
    setFilterMenuOpen(null);
  };

  // Handle column reordering
  const handleColumnReorder = (draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;

    const currentOrder = [...preferences.columnOrder];
    const draggedIndex = currentOrder.indexOf(draggedId);
    const targetIndex = currentOrder.indexOf(targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      currentOrder.splice(draggedIndex, 1);
      currentOrder.splice(targetIndex, 0, draggedId);
      updateColumnOrder(currentOrder);
    }
  };

  // Handle column resizing
  const handleColumnResize = (columnId: string, width: number) => {
    updateColumnWidth(columnId, width);
  };

  // Handle column visibility toggle
  const handleToggleColumnVisibility = (columnId: string, visible: boolean) => {
    toggleColumnVisibility(columnId, visible);
  };

  // Handle reset of all grid preferences
  const handleResetGridPreferences = () => {
    resetPreferences();
  };

  // Create render props object for children function
  const renderProps: DataGridRenderProps<T> = {
    filterState: filterState || {},
    sortState,
    selectedRows: selectedRows || {},
    data,
    visibleColumns,
    pageIndex,
    pageCount,
    pageSize,
    isLoading,
  };

  // Render empty state
  if (!isLoading && (!data || data.length === 0)) {
    return (
      <div
        className={cn(
          "w-full border rounded-md overflow-hidden",
          theme.classes.container,
          className,
          classes.container
        )}
      >
        <div
          className={cn(
            "p-4 text-center text-muted-foreground",
            classes.emptyState
          )}
        >
          {emptyMessage}
        </div>
        {children && children(renderProps)}
      </div>
    );
  }

  // Render loading state
  if (isLoading) {
    return (
      <div
        className={cn(
          "w-full border rounded-md overflow-hidden",
          theme.classes.container,
          className,
          classes.container
        )}
      >
        <div
          className={cn(
            "p-4 text-center text-muted-foreground",
            classes.loadingState
          )}
        >
          {loadingMessage}
        </div>
        {children && children(renderProps)}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full border rounded-md overflow-hidden",
        theme.classes.container,
        className,
        classes.container
      )}
    >
      <div
        className={cn(
          "p-2 flex items-center justify-end border-b",
          classes.columnManager
        )}
      >
        <ColumnManager
          columns={columns}
          visibleColumns={visibleColumns}
          toggleColumnVisibility={handleToggleColumnVisibility}
          resetGridPreferences={handleResetGridPreferences}
          {...columnManagerProps}
        />
      </div>
      <div className="w-full overflow-auto">
        <table className="w-full border-collapse">
          <TableHeader
            columns={orderedColumns}
            sortState={sortState}
            onSortChange={(columnId) => {
              if (onSortChange) {
                const direction =
                  sortState?.column === columnId &&
                  sortState.direction === "asc"
                    ? "desc"
                    : "asc";
                onSortChange({ column: columnId, direction });
              }
            }}
            enableSorting={enableSorting}
            filterState={filterState || {}}
            filterMenuOpen={filterMenuOpen}
            onFilterMenuToggle={handleFilterMenuToggle}
            columnWidths={preferences.columnWidths}
            onColumnResize={handleColumnResize}
            headerClassName={classes.header}
            filterValueRefs={filterValueRefs}
            onApplyFilter={handleApplyFilter}
            onClearFilter={handleClearFilter}
            onColumnReorder={handleColumnReorder}
            renderHeader={
              renderHeader
                ? (column, direction) =>
                    renderHeader({
                      column,
                      sortDirection: direction || undefined,
                    })
                : undefined
            }
            renderSortIcon={
              renderSortIcon
                ? (column, sortDirection) =>
                    renderSortIcon({
                      isSorted: !!sortDirection,
                      sortDirection: sortDirection || undefined,
                    })
                : undefined
            }
            sortIconVariant={sortIconVariant}
            renderFilterIcon={
              renderFilterIcon
                ? (column, isActive) =>
                    renderFilterIcon({ isFiltered: !!filterState?.[column.id] })
                : undefined
            }
            filterMenu={filterMenu as FilterMenuCustomization | undefined}
          />
          <TableBody
            paginatedData={data}
            columns={orderedColumns}
            selectedRows={selectedRows || {}}
            enableRowSelection={enableRowSelection}
            onRowSelect={(rowId) => {
              if (onRowSelectionChange) {
                const newSelectedRows = { ...selectedRows };
                newSelectedRows[rowId] = !newSelectedRows[rowId];
                onRowSelectionChange(newSelectedRows);
              }
            }}
            onRowClick={onRowClick}
            rowClassName={classes.row}
            cellClassName={classes.cell}
            columnWidths={preferences.columnWidths}
            theme={theme}
            selectedRowClassName={classes.selectedRow || "bg-primary/10"}
            renderCell={
              renderCell
                ? (row, column) =>
                    renderCell({
                      value: (row as Record<string, any>)[column.id],
                      row,
                      column,
                    })
                : undefined
            }
          />
        </table>
      </div>

      {enablePagination && (
        <div className={cn(classes.pagination)}>
          <Pagination
            pageIndex={pageIndex}
            pageCount={pageCount}
            pageSize={pageSize}
            setPageIndex={onPageChange || (() => {})}
            setPageSize={onPageSizeChange || (() => {})}
            pageSizeOptions={pageSizeOptions}
            processedDataLength={data.length}
            {...paginationProps}
          />
        </div>
      )}

      {/* Render children with all the internal state */}
      {children && children(renderProps)}
    </div>
  );
}
