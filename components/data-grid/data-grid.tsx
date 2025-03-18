"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  SortState,
  DataGridRenderProps,
  GroupingState,
  FilterMenuCustomization,
  DataGridProps as BaseDataGridProps,
} from "./types";
import { TableHeader } from "./table-header";
import { TableBody } from "./table-body";
import { Pagination } from "./pagination";
import { ColumnManager } from "./column-manager";
import { GroupManager } from "./group-manager";
import { useGridPersistence } from "./use-grid-persistence";
import { useDataGrouping } from "./use-data-grouping";
import { useTheme } from "../theme-provider/theme-provider";

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
  groupManagerProps?: Partial<
    Omit<
      React.ComponentProps<typeof GroupManager<T>>,
      | "columns"
      | "groupByColumns"
      | "updateGroupByColumns"
      | "removeGroupByColumn"
      | "clearGrouping"
    >
  >;
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

export function DataGrid<T>({
  columns,
  data,
  sortState = null,
  onSortChange,
  filterState = {},
  onFilterChange,
  selectedRows = {},
  onRowSelectionChange,
  pageIndex,
  pageCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onRowClick,
  enableSorting = true,
  enableFiltering = true,
  enableColumnResize = true,
  enableRowSelection = false,
  enablePagination = true,
  enableGrouping = false,
  hideGroupControls = false,
  hideColumnManager = false,
  pageSizeOptions = [5, 10, 20, 50, 100],
  emptyMessage = "No data available",
  loadingMessage = "Loading data...",
  isLoading = false,
  gridId = "default",
  classes = {},
  className,
  renderCell,
  renderHeader,
  renderSortIcon,
  renderFilterIcon,
  renderGroupRow,
  sortIconVariant = "arrows",
  columnManagerProps = {},
  paginationProps = {},
  groupManagerProps = {},
  groupRowProps = {},
  groupingState,
  onGroupingChange,
  groupExpandIcon,
  groupCollapseIcon,
  totalRows,
  filterMenu,
}: DataGridProps<T>) {
  const { theme } = useTheme();
  const filterValueRefs = useRef<Record<string, string>>(filterState || {});
  const [filterMenuOpen, setFilterMenuOpen] = useState<string | null>(null);
  const [activeFilterColumn, setActiveFilterColumn] =
    useState<ColumnDef<T> | null>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const effectiveEnablePagination = enableGrouping ? false : enablePagination;

  const {
    preferences,
    updateColumnWidth,
    updateColumnOrder,
    toggleColumnVisibility,
    updateGroupByColumns,
    toggleGroupExpanded,
    resetPreferences,
  } = useGridPersistence(gridId, columns);

  // Initialize internal grouping state
  const [internalGroupingState, setInternalGroupingState] =
    useState<GroupingState>({
      groupByColumns:
        groupingState?.groupByColumns || preferences.groupByColumns || [],
      expandedGroups:
        groupingState?.expandedGroups || preferences.expandedGroups || {},
    });

  // Use either controlled or internal state
  const effectiveGroupingState = groupingState || internalGroupingState;

  // Manage visible columns
  const visibleColumns = useMemo(() => {
    const hiddenIds = new Set(preferences.hiddenColumns);

    const visible = columns
      .filter((col) => !hiddenIds.has(col.id))
      .map((col) => col.id);

    const orderedIds = preferences.columnOrder.filter((id) =>
      visible.includes(id)
    );

    // Make sure all visible columns are included in the order
    visible.forEach((id) => {
      if (!orderedIds.includes(id)) {
        orderedIds.push(id);
      }
    });

    return orderedIds;
  }, [columns, preferences.hiddenColumns, preferences.columnOrder]);

  // Get ordered columns for display
  const orderedColumns = useMemo(() => {
    const colMap = new Map(columns.map((col) => [col.id, col]));
    return visibleColumns.map((id) => colMap.get(id)!).filter(Boolean);
  }, [columns, visibleColumns]);

  // Sync refs with filter state
  useEffect(() => {
    if (filterState) {
      filterValueRefs.current = { ...filterState };
    }
  }, [filterState]);

  // Handle click outside to close filter menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        setFilterMenuOpen(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterMenuOpen]);

  // Process data for grouping when enabled
  const { flattenedRows } = useDataGrouping(
    data,
    enableGrouping
      ? effectiveGroupingState
      : { groupByColumns: [], expandedGroups: {} },
    (row) => (row as any).id || `row-${Math.random()}`
  );
  const paginatedData = useMemo(() => {
    const displayData = enableGrouping ? flattenedRows : data;

    if (!effectiveEnablePagination || !pageSize) {
      return displayData;
    }

    const effectivePageIndex = pageIndex ?? 0;
    const totalPages = Math.max(1, Math.ceil(displayData.length / pageSize));
    const safePageIndex = Math.min(effectivePageIndex, totalPages - 1);

    const start = safePageIndex * pageSize;
    const end = start + pageSize;

    const slicedData = displayData.slice(
      start,
      Math.min(end, displayData.length)
    );
    return slicedData;
  }, [
    data,
    flattenedRows,
    enableGrouping,
    effectiveEnablePagination,
    pageIndex,
    pageSize,
  ]);

  // Filter menu handlers
  const handleFilterMenuToggle = (columnId: string | null) => {
    if (columnId === filterMenuOpen) {
      setFilterMenuOpen(null);
      setActiveFilterColumn(null);
    } else if (columnId) {
      const column = columns.find((col) => col.id === columnId);
      if (column) {
        setFilterMenuOpen(columnId);
        setActiveFilterColumn(column);
      }
    } else {
      setFilterMenuOpen(null);
      setActiveFilterColumn(null);
    }
  };

  const handleApplyFilter = (value: string) => {
    if (!activeFilterColumn || !onFilterChange) return;

    const newFilterState = { ...filterState };
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

    const newFilterState = { ...filterState };
    delete newFilterState[activeFilterColumn.id];

    onFilterChange(newFilterState);
    setFilterMenuOpen(null);
  };

  // Column management handlers
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

  // Grouping handlers
  const handleGroupByColumnsUpdate = (groupByColumns: string[]) => {
    const newGroupingState = {
      ...effectiveGroupingState,
      groupByColumns,
    };

    if (onGroupingChange) {
      onGroupingChange(newGroupingState);
    } else {
      setInternalGroupingState(newGroupingState);
      updateGroupByColumns(groupByColumns);
    }
  };

  const handleRemoveGroupByColumn = (columnId: string) => {
    const newGroupByColumns = effectiveGroupingState.groupByColumns.filter(
      (id) => id !== columnId
    );
    handleGroupByColumnsUpdate(newGroupByColumns);
  };

  const handleClearGrouping = () => {
    handleGroupByColumnsUpdate([]);
  };

  const handleToggleGroupExpanded = (groupKey: string) => {
    const isCurrentlyExpanded =
      !!effectiveGroupingState.expandedGroups[groupKey];
    const newExpandedGroups = {
      ...effectiveGroupingState.expandedGroups,
      [groupKey]: !isCurrentlyExpanded,
    };

    const newGroupingState = {
      ...effectiveGroupingState,
      expandedGroups: newExpandedGroups,
    };

    if (onGroupingChange) {
      onGroupingChange(newGroupingState);
    } else {
      setInternalGroupingState(newGroupingState);
      toggleGroupExpanded(groupKey, !isCurrentlyExpanded);
    }
  };

  // Other handlers
  const handleToggleColumnVisibility = (columnId: string, visible: boolean) => {
    toggleColumnVisibility(columnId, visible);
  };

  const handleResetGridPreferences = () => {
    resetPreferences();
    setInternalGroupingState({
      groupByColumns: [],
      expandedGroups: {},
    });
  };

  // Empty state handling
  if (!isLoading && (!data || data.length === 0)) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-8 border rounded-md",
          theme.classes.container,
          classes.emptyState
        )}
      >
        {emptyMessage}
      </div>
    );
  }

  // Loading state handling
  if (isLoading) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-8 border rounded-md",
          theme.classes.container,
          classes.loadingState
        )}
      >
        {loadingMessage}
      </div>
    );
  }

  const showToolbar =
    (enableGrouping && !hideGroupControls) || !hideColumnManager;

  return (
    <div
      className={cn(
        "w-full border rounded-md overflow-hidden",
        theme.classes.container,
        className,
        classes.container
      )}
    >
      {showToolbar ? (
        <div
          className={cn(
            "p-2 flex items-center justify-end border-b gap-2",
            classes.columnManager
          )}
        >
          {enableGrouping && !hideGroupControls ? (
            <GroupManager
              columns={columns}
              groupByColumns={effectiveGroupingState.groupByColumns}
              updateGroupByColumns={handleGroupByColumnsUpdate}
              removeGroupByColumn={handleRemoveGroupByColumn}
              clearGrouping={handleClearGrouping}
              {...groupManagerProps}
            />
          ) : null}
          {!hideColumnManager ? (
            <ColumnManager
              columns={columns}
              visibleColumns={visibleColumns}
              toggleColumnVisibility={handleToggleColumnVisibility}
              resetGridPreferences={handleResetGridPreferences}
              {...columnManagerProps}
            />
          ) : null}
        </div>
      ) : null}
      <div className="w-full overflow-auto">
        <table className="w-full border-collapse">
          <TableHeader
            columns={orderedColumns}
            sortState={sortState}
            onSortChange={(columnId) => {
              if (!onSortChange || !enableSorting) return;

              let newSortState: SortState | null = null;

              if (!sortState || sortState.column !== columnId) {
                newSortState = { column: columnId, direction: "asc" };
              } else if (sortState.direction === "asc") {
                newSortState = { column: columnId, direction: "desc" };
              }

              onSortChange(newSortState);
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
                ? (column, sortDirection) =>
                    renderHeader({ column, sortDirection })
                : undefined
            }
            renderSortIcon={(column, sortDirection) =>
              renderSortIcon
                ? renderSortIcon({
                    isSorted: sortDirection !== undefined,
                    sortDirection,
                  })
                : null
            }
            renderFilterIcon={
              renderFilterIcon
                ? (column, isActive) =>
                    renderFilterIcon({
                      isFiltered: isActive,
                    })
                : undefined
            }
            sortIconVariant={sortIconVariant}
            filterMenu={filterMenu as FilterMenuCustomization | undefined}
            filterMenuRef={filterMenuRef}
          />

          <TableBody
            paginatedData={paginatedData}
            columns={orderedColumns}
            selectedRows={selectedRows || {}}
            enableRowSelection={enableRowSelection}
            onRowSelect={(rowId) => {
              if (enableRowSelection && onRowSelectionChange) {
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
            selectedRowClassName={classes.selectedRow}
            renderCell={
              renderCell
                ? (row, column) =>
                    renderCell({
                      value: (row as any)[column.id],
                      row,
                      column,
                    })
                : undefined
            }
            enableGrouping={enableGrouping}
            groupingState={effectiveGroupingState}
            toggleGroupExpanded={handleToggleGroupExpanded}
            renderGroupRow={renderGroupRow}
            groupExpandIcon={groupExpandIcon}
            groupCollapseIcon={groupCollapseIcon}
            groupRowProps={groupRowProps}
          />
        </table>
      </div>
      {effectiveEnablePagination ? (
        <Pagination
          pageIndex={pageIndex ?? 0}
          pageCount={
            pageCount ||
            Math.max(
              1,
              Math.ceil(
                (totalRows ||
                  (enableGrouping ? flattenedRows.length : data.length)) /
                  (pageSize || 10)
              )
            )
          }
          pageSize={pageSize || 10}
          totalRows={
            totalRows || (enableGrouping ? flattenedRows.length : data.length)
          }
          setPageIndex={onPageChange || (() => {})}
          setPageSize={onPageSizeChange || (() => {})}
          pageSizeOptions={pageSizeOptions}
          processedDataLength={paginatedData.length} // Use actual paginated data length
          className={classes.pagination}
          {...paginationProps}
        />
      ) : null}
    </div>
  );
}
