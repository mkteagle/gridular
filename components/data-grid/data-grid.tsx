"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  DataGridProps as BaseDataGridProps,
  DataGridRenderProps,
  FilterMenuCustomization,
} from "./types";
import { TableHeader } from "./table-header";
import { TableBody } from "./table-body";
import { Pagination } from "./pagination";
import { ColumnManager } from "./column-manager";
import { useTheme } from "../theme-provider/theme-provider";
import { useGridPersistence } from "./use-grid-persistence";

export interface DataGridProps<T> extends BaseDataGridProps<T> {
  columnManagerProps?: Partial<
    Omit<
      React.ComponentProps<typeof ColumnManager<T>>,
      | "columns"
      | "visibleColumns"
      | "toggleColumnVisibility"
      | "resetGridPreferences"
    >
  >;
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
      | "totalRows"
    >
  >;
}

export function DataGrid<T>({
  columns,
  data,
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
  enableSorting = true,
  enableColumnResize = true,
  enableRowSelection = false,
  enablePagination = false,
  pageSizeOptions = [5, 10, 20, 50, 100],
  emptyMessage = "No data available",
  loadingMessage = "Loading data...",
  isLoading = false,
  gridId = "default",
  classes = {},
  className,
  renderCell,
  renderSortIcon,
  renderFilterIcon,
  sortIconVariant = "arrows",
  columnManagerProps = {},
  paginationProps = {},
  totalRows,
  children,
  filterMenu,
  renderHeader,
}: DataGridProps<T>) {
  const { theme } = useTheme();
  const filterValueRefs = useRef<Record<string, string>>(filterState || {});
  const [filterMenuOpen, setFilterMenuOpen] = useState<string | null>(null);
  const [activeFilterColumn, setActiveFilterColumn] =
    useState<ColumnDef<T> | null>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  const {
    preferences,
    updateColumnWidth,
    updateColumnOrder,
    toggleColumnVisibility,
    resetPreferences,
  } = useGridPersistence(gridId, columns);

  const visibleColumns = useMemo(() => {
    const hiddenIds = new Set(preferences.hiddenColumns);

    const visible = columns
      .filter((col) => !hiddenIds.has(col.id))
      .map((col) => col.id);

    const orderedIds = preferences.columnOrder.filter((id) =>
      visible.includes(id)
    );

    visible.forEach((id) => {
      if (!orderedIds.includes(id)) {
        orderedIds.push(id);
      }
    });

    return orderedIds;
  }, [columns, preferences.hiddenColumns, preferences.columnOrder]);

  const orderedColumns = useMemo(() => {
    const colMap = new Map(columns.map((col) => [col.id, col]));
    return visibleColumns.map((id) => colMap.get(id)!).filter(Boolean);
  }, [columns, visibleColumns]);

  useEffect(() => {
    if (filterState) {
      filterValueRefs.current = { ...filterState };
    }
  }, [filterState]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node) &&
        filterMenuOpen
      ) {
        setFilterMenuOpen(null);
        setActiveFilterColumn(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterMenuOpen]);

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

  const handleColumnResize = (columnId: string, width: number) => {
    updateColumnWidth(columnId, width);
  };

  const handleToggleColumnVisibility = (columnId: string, visible: boolean) => {
    toggleColumnVisibility(columnId, visible);
  };

  const handleResetGridPreferences = () => {
    resetPreferences();
  };

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
            filterMenuRef={filterMenuRef}
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

      {enablePagination ? (
        <div className={cn(classes.pagination)}>
          <Pagination
            pageIndex={pageIndex}
            pageCount={pageCount}
            pageSize={pageSize}
            setPageIndex={onPageChange || (() => {})}
            setPageSize={onPageSizeChange || (() => {})}
            pageSizeOptions={pageSizeOptions}
            processedDataLength={data.length}
            totalRows={totalRows}
            {...paginationProps}
          />
        </div>
      ) : null}
      {children && children(renderProps)}
    </div>
  );
}
