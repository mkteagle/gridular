import { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ArrowUp, ArrowDown, ChevronDown, ChevronRight, X, Filter, Search, MoreVertical, EyeOff } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn, tssToInlineStyles } from './lib/utils';
import { Pagination } from './Pagination';
import { ColumnManager } from './components/ColumnManager';
import { GroupManager } from './components/GroupManager';
import { useGridPersistence } from './hooks/useGridPersistence';
import { useDataGrouping, GroupRow } from './hooks/useDataGrouping';
import type {
  VirtualizedGridProps,
  ColumnDef,
  SortState,
  FilterState,
  RowSelectionState,
  GroupingState,
} from './types';
import './DataGrid.css';
import type { ColumnMenuItem } from './types';

// Helper component for rendering menu items with submenu support
interface MenuItemRendererProps {
  item: ColumnMenuItem;
  columnId: string;
  onColumnAction?: (action: string, columnId: string) => void;
  classes?: any;
}

function MenuItemRenderer({ item, columnId, onColumnAction, classes }: MenuItemRendererProps) {
  // Use custom render if provided
  if (item.render) {
    return (
      <>
        {item.render({
          item,
          columnId,
          isDisabled: !!item.disabled,
          onSelect: () => {
            if (!item.disabled) {
              item.onClick(columnId);
              onColumnAction?.(item.id, columnId);
            }
          },
        })}
      </>
    );
  }

  // Render with submenu
  if (item.subMenu && item.subMenu.length > 0) {
    return (
      <>
        {item.separator && (
          <DropdownMenu.Separator className="h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent my-1" />
        )}
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger
            className={cn(
              'flex items-center justify-between gap-2 px-2.5 py-1.5 rounded',
              'text-xs font-medium text-charcoal cursor-pointer outline-none',
              'hover:bg-copper/10 focus:bg-copper/10 transition-colors',
              item.disabled && 'opacity-50 cursor-not-allowed',
              item.danger && 'text-red-600',
              item.className,
              classes?.columnMenuItem
            )}
            disabled={item.disabled}
          >
            <div className="flex items-center gap-2">
              {item.icon && <span className="flex-shrink-0 w-3 h-3">{item.icon}</span>}
              <span>{item.label}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {item.shortcut && (
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-charcoal/5 rounded border border-charcoal/10">
                  {item.shortcut}
                </kbd>
              )}
              <ChevronRight className="w-3 h-3 text-charcoal/40" />
            </div>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.Portal>
            <DropdownMenu.SubContent
              className={cn(
                'z-50 min-w-[180px] rounded-lg',
                'bg-gradient-to-br from-ivory via-ivory to-ivory-dark',
                'border-2 border-copper shadow-xl shadow-copper/20',
                'animate-in fade-in-0 zoom-in-95 slide-in-from-left-1',
                'p-1',
                classes?.columnMenu
              )}
              sideOffset={8}
            >
              {item.subMenu.map((subItem) => (
                <MenuItemRenderer
                  key={subItem.id}
                  item={subItem}
                  columnId={columnId}
                  onColumnAction={onColumnAction}
                  classes={classes}
                />
              ))}
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>
      </>
    );
  }

  // Regular menu item
  return (
    <>
      {item.separator && (
        <DropdownMenu.Separator className="h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent my-1" />
      )}
      <DropdownMenu.Item
        className={cn(
          'flex items-center justify-between gap-2 px-2.5 py-1.5 rounded',
          'text-xs font-medium cursor-pointer outline-none',
          'transition-colors',
          item.disabled && 'opacity-50 cursor-not-allowed',
          item.danger
            ? 'text-red-600 hover:bg-red-50 focus:bg-red-50'
            : 'text-charcoal hover:bg-copper/10 focus:bg-copper/10',
          item.className,
          classes?.columnMenuItem
        )}
        disabled={item.disabled}
        onSelect={() => {
          if (!item.disabled) {
            item.onClick(columnId);
            onColumnAction?.(item.id, columnId);
          }
        }}
      >
        <div className="flex items-center gap-2">
          {item.icon && <span className="flex-shrink-0 w-3 h-3">{item.icon}</span>}
          <span>{item.label}</span>
        </div>
        {item.shortcut && (
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-charcoal/5 rounded border border-charcoal/10">
            {item.shortcut}
          </kbd>
        )}
      </DropdownMenu.Item>
    </>
  );
}

export function DataGrid<T extends Record<string, any> = Record<string, any>>({
  // Data
  columns: propColumns,
  data,

  // Pagination
  pagination,
  virtualizationThreshold = 20,

  // Virtualization
  rowHeight = 72,
  overscan = 5,

  // Sorting
  sortState: controlledSortState,
  onSortChange,
  enableSorting = false,
  sortIconVariant = 'arrows',

  // Filtering
  filterState: controlledFilterState,
  onFilterChange: _onFilterChange,
  enableFiltering = false,

  // Row Selection
  selectedRows: controlledSelectedRows,
  onRowSelectionChange: _onRowSelectionChange,
  enableRowSelection: _enableRowSelection = false,

  // Cell Selection
  enableCellSelection = false,
  selectedCell: controlledSelectedCell,
  onCellSelect,

  // Column Resize
  enableColumnResize = false,
  columnWidths: controlledColumnWidths,
  onColumnWidthsChange,

  // Column Reorder
  enableColumnReorder = false,
  columnOrder: controlledColumnOrder,
  onColumnOrderChange,

  // Column Menu
  enableColumnMenu = false,
  defaultColumnMenuItems = [],
  onColumnAction,
  renderFilterMenu,
  renderColumnMenu,
  renderColumnMenuTrigger,

  // Grouping
  enableGrouping = false,
  groupingState: controlledGroupingState,
  onGroupingChange,
  renderGroupRow,
  hideGroupingUI = false,

  // Expandable Rows
  enableExpandableRows = false,
  expandedRows: controlledExpandedRows,
  onExpandedRowsChange,
  renderExpandedRow,
  expandedRowHeight = 200,

  // UI State
  isLoading: _isLoading = false,
  emptyMessage: _emptyMessage = 'No data available',
  loadingMessage: _loadingMessage = 'Loading...',

  // Styling
  className,
  classes,

  // Custom Rendering
  renderCell,
  renderHeader: _renderHeader,
  renderHeaderCell,
  renderSortIcon: _renderSortIcon,
  renderFilterIcon: _renderFilterIcon,

  // Callbacks
  onRowClick,
  onRowMouseDown,
  onRowMouseEnter,
  getRowId = (row) => String((row as any).id),
  onScroll,

  // Advanced
  gridId = 'default-grid',
  hideColumnManager = false,
  hideGroupControls = false,
}: VirtualizedGridProps<T>) {
  // Container ref for measuring available width
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Grid persistence hook
  const {
    preferences,
    updateColumnWidth,
    updateColumnOrder,
    toggleColumnVisibility,
    updateGroupByColumns,
    toggleGroupExpanded,
    resetPreferences,
  } = useGridPersistence(gridId, propColumns, 150);

  // Internal state for uncontrolled mode
  const [internalSortState, setInternalSortState] = useState<SortState | null>(null);
  const [_internalFilterState, _setInternalFilterState] = useState<FilterState>({});
  const [_internalSelectedRows, _setInternalSelectedRows] = useState<RowSelectionState>({});
  const [internalColumnWidths, setInternalColumnWidths] = useState<Record<string, number>>({});
  const [internalColumnOrder, setInternalColumnOrder] = useState<string[]>([]);
  const [internalGroupingState, setInternalGroupingState] = useState<GroupingState>({
    groupByColumns: [],
    expandedGroups: {},
  });
  const [internalExpandedRows, setInternalExpandedRows] = useState<Record<string, boolean>>({});
  const [internalSelectedCell, setInternalSelectedCell] = useState<{ rowId: string; columnId: string } | null>(null);

  // Dragging state for column reorder
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  // Filter UI state
  const [openFilterPopovers, setOpenFilterPopovers] = useState<Record<string, boolean>>({});
  const [filterInputValues, setFilterInputValues] = useState<Record<string, string>>({});

  // Use controlled or uncontrolled state
  const sortState = controlledSortState !== undefined ? controlledSortState : internalSortState;
  const filterState = controlledFilterState || _internalFilterState;
  const selectedRows = controlledSelectedRows || _internalSelectedRows;
  const columnWidths = controlledColumnWidths || (preferences.columnWidths.size ? preferences.columnWidths : internalColumnWidths);
  const columnOrder = controlledColumnOrder || (preferences.columnOrder.length ? preferences.columnOrder : internalColumnOrder);
  const groupingState = controlledGroupingState || (preferences.groupByColumns.length ? {
    groupByColumns: preferences.groupByColumns,
    expandedGroups: preferences.expandedGroups,
  } : internalGroupingState);
  const expandedRows = controlledExpandedRows || internalExpandedRows;
  const selectedCell = controlledSelectedCell !== undefined ? controlledSelectedCell : internalSelectedCell;

  // Apply column order and visibility
  const columns = useMemo(() => {
    // Filter out hidden columns
    const visibleCols = propColumns.filter(
      (col) => !preferences.hiddenColumns.includes(col.id)
    );

    // Apply custom order if set
    if (columnOrder.length > 0) {
      const orderedCols: ColumnDef<T>[] = [];
      columnOrder.forEach((id) => {
        const col = visibleCols.find((c) => c.id === id);
        if (col) orderedCols.push(col);
      });
      // Add any columns not in the order list
      visibleCols.forEach((col) => {
        if (!columnOrder.includes(col.id)) {
          orderedCols.push(col);
        }
      });
      return orderedCols;
    }

    return visibleCols;
  }, [propColumns, preferences.hiddenColumns, columnOrder]);

  // Get visible column IDs for column manager
  const visibleColumnIds = useMemo(() => columns.map((col) => col.id), [columns]);

  // Handlers
  const handleSortChange = useCallback(
    (newSortState: SortState | null) => {
      if (onSortChange) {
        onSortChange(newSortState);
      } else {
        setInternalSortState(newSortState);
      }
    },
    [onSortChange]
  );

  const handleFilterChange = useCallback(
    (columnId: string, filterValue: string) => {
      const newFilterState = { ...filterState };
      if (filterValue) {
        newFilterState[columnId] = filterValue;
      } else {
        delete newFilterState[columnId];
      }
      if (_onFilterChange) {
        _onFilterChange(newFilterState);
      } else {
        _setInternalFilterState(newFilterState);
      }
      setFilterInputValues((prev) => ({ ...prev, [columnId]: filterValue }));
    },
    [filterState, _onFilterChange]
  );

  const handleApplyFilter = useCallback(
    (columnId: string) => {
      handleFilterChange(columnId, filterInputValues[columnId] ?? '');
      setOpenFilterPopovers((prev) => ({ ...prev, [columnId]: false }));
    },
    [handleFilterChange, filterInputValues]
  );

  const handleClearFilter = useCallback(
    (columnId: string) => {
      handleFilterChange(columnId, '');
      setFilterInputValues((prev) => ({ ...prev, [columnId]: '' }));
      setOpenFilterPopovers((prev) => ({ ...prev, [columnId]: false }));
    },
    [handleFilterChange]
  );

  const handleColumnWidthChange = useCallback(
    (columnId: string, width: number) => {
      const newWidths = { ...columnWidths, [columnId]: width };
      if (onColumnWidthsChange) {
        onColumnWidthsChange(newWidths);
      } else {
        updateColumnWidth(columnId, width);
        setInternalColumnWidths(newWidths);
      }
    },
    [columnWidths, onColumnWidthsChange, updateColumnWidth]
  );

  const handleColumnReorder = useCallback(
    (draggedId: string, targetId: string) => {
      const newOrder = [...columnOrder];
      const draggedIndex = newOrder.indexOf(draggedId);
      const targetIndex = newOrder.indexOf(targetId);

      if (draggedIndex !== -1 && targetIndex !== -1) {
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(targetIndex, 0, draggedId);

        if (onColumnOrderChange) {
          onColumnOrderChange(newOrder);
        } else {
          updateColumnOrder(newOrder);
          setInternalColumnOrder(newOrder);
        }
      }
    },
    [columnOrder, onColumnOrderChange, updateColumnOrder]
  );

  const handleGroupingChange = useCallback(
    (newGroupByColumns: string[]) => {
      const newState = { ...groupingState, groupByColumns: newGroupByColumns };
      if (onGroupingChange) {
        onGroupingChange(newState);
      } else {
        updateGroupByColumns(newGroupByColumns);
        setInternalGroupingState(newState);
      }
    },
    [groupingState, onGroupingChange, updateGroupByColumns]
  );

  const handleToggleGroupExpand = useCallback(
    (groupKey: string) => {
      const newExpandedGroups = {
        ...groupingState.expandedGroups,
        [groupKey]: !groupingState.expandedGroups[groupKey],
      };
      const newState = { ...groupingState, expandedGroups: newExpandedGroups };

      if (onGroupingChange) {
        onGroupingChange(newState);
      } else {
        toggleGroupExpanded(groupKey, !groupingState.expandedGroups[groupKey]);
        setInternalGroupingState(newState);
      }
    },
    [groupingState, onGroupingChange, toggleGroupExpanded]
  );

  const handleToggleRowExpand = useCallback(
    (rowId: string) => {
      const newExpandedRows = {
        ...expandedRows,
        [rowId]: !expandedRows[rowId],
      };

      if (onExpandedRowsChange) {
        onExpandedRowsChange(newExpandedRows);
      } else {
        setInternalExpandedRows(newExpandedRows);
      }
    },
    [expandedRows, onExpandedRowsChange]
  );

  const handleCellSelect = useCallback(
    (rowId: string, columnId: string) => {
      if (onCellSelect) {
        onCellSelect(rowId, columnId);
      } else {
        setInternalSelectedCell({ rowId, columnId });
      }
    },
    [onCellSelect]
  );

  const handleResetPreferences = useCallback(() => {
    resetPreferences();
    setInternalColumnWidths({});
    setInternalColumnOrder([]);
    setInternalGroupingState({ groupByColumns: [], expandedGroups: {} });
  }, [resetPreferences]);

  // Use data grouping hook if grouping is enabled
  const { flattenedRows } = useDataGrouping(
    data,
    groupingState,
    (row) => getRowId(row)
  );

  // Generate skeleton data when loading
  const skeletonData = useMemo(() => {
    if (!_isLoading) return [];
    const skeletonCount = pagination?.pageSize || 20;
    return Array.from({ length: skeletonCount }, (_, i) => ({
      __skeleton: true,
      __id: `skeleton-${i}`,
    }));
  }, [_isLoading, pagination?.pageSize]);

  // Process data: filter, sort, apply grouping
  const processedData = useMemo(() => {
    // If loading and we have pagination with manualPagination, show skeletons
    if (_isLoading && pagination?.manualPagination && skeletonData.length > 0) {
      return skeletonData as any;
    }

    let result = enableGrouping ? flattenedRows : [...data];

    // Apply filtering (only on non-group rows)
    if (enableFiltering && Object.keys(filterState).length > 0) {
      result = result.filter((row) => {
        // Skip group rows
        if ((row as any).isGroupRow) return true;

        return Object.entries(filterState).every(([columnId, filterValue]) => {
          if (!filterValue) return true;
          const column = propColumns.find((col) => col.id === columnId);
          if (column?.filterFn) {
            return column.filterFn(row, columnId, filterValue);
          }
          // Default filter: case-insensitive string match
          const cellValue = String(row[columnId] ?? '').toLowerCase();
          return cellValue.includes(filterValue.toLowerCase());
        });
      });
    }

    // Apply sorting (only on non-group rows at the same level)
    // When grouping is enabled but no groups are active, still allow sorting
    const hasActiveGroups = enableGrouping && groupingState.groupByColumns.length > 0;
    if (enableSorting && sortState && !hasActiveGroups) {
      const column = propColumns.find((col) => col.id === sortState.column);
      result.sort((a, b) => {
        if (column?.sortFn) {
          return column.sortFn(a, b, sortState.column);
        }
        // Default sort
        const aVal = a[sortState.column];
        const bVal = b[sortState.column];
        if (aVal === bVal) return 0;
        const comparison = aVal > bVal ? 1 : -1;
        return sortState.direction === 'asc' ? comparison : -comparison;
      });
    }

    // Apply pagination (if enabled and not manual)
    // Note: When grouping is enabled, pagination works on the flattened rows
    // This means groups may be split across pages
    // If manualPagination is true, skip slicing as the data prop already contains only the current page
    if (pagination && !pagination.manualPagination) {
      const start = pagination.pageIndex * pagination.pageSize;
      const end = start + pagination.pageSize;
      result = result.slice(start, end);
    }

    return result;
  }, [data, flattenedRows, filterState, sortState, pagination, propColumns, enableFiltering, enableSorting, virtualizationThreshold, enableGrouping, _isLoading, skeletonData]);

  // Measure container width on mount and resize
  useEffect(() => {
    const measureWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    measureWidth();
    const resizeObserver = new ResizeObserver(measureWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Determine if we should use virtualization
  const shouldVirtualize = processedData.length > virtualizationThreshold;

  // Column widths with defaults - spread evenly if no custom widths
  const getColumnWidth = useCallback((column: ColumnDef<T>) => {
    // If user has manually resized this column, use that width
    if (columnWidths[column.id]) {
      return columnWidths[column.id];
    }
    // If column has a defined width, use that
    if (column.width) {
      return column.width;
    }
    // Otherwise, calculate equal width based on container
    if (containerWidth > 0 && columns.length > 0) {
      return containerWidth / columns.length;
    }
    return 150;
  }, [columnWidths, containerWidth, columns.length]);

  const totalWidth = useMemo(() => {
    if (containerWidth > 0) {
      // Check if any columns have custom widths
      const hasCustomWidths = columns.some(col => columnWidths[col.id] || col.width);
      if (hasCustomWidths) {
        return columns.reduce((acc, col) => {
          if (columnWidths[col.id]) return acc + columnWidths[col.id];
          if (col.width) return acc + col.width;
          return acc + (containerWidth / columns.length);
        }, 0);
      }
      // Otherwise use full container width
      return containerWidth;
    }
    return columns.reduce((acc, col) => {
      if (columnWidths[col.id]) return acc + columnWidths[col.id];
      if (col.width) return acc + col.width;
      return acc + 150;
    }, 0);
  }, [columns, columnWidths, containerWidth]);

  // Sort handler
  const handleSort = (columnId: string) => {
    if (!enableSorting) return;

    const column = propColumns.find((col) => col.id === columnId);
    if (column?.enableSorting === false) return;

    if (!sortState || sortState.column !== columnId) {
      handleSortChange({ column: columnId, direction: 'asc' });
    } else if (sortState.direction === 'asc') {
      handleSortChange({ column: columnId, direction: 'desc' });
    } else {
      handleSortChange(null);
    }
  };

  // Render sort icon
  const renderSortIconDefault = (column: ColumnDef<T>) => {
    const isSorted = sortState?.column === column.id;
    const direction = sortState?.direction;

    if (!isSorted) return null;

    if (sortIconVariant === 'arrows') {
      return direction === 'asc' ? (
        <ArrowUp className="w-3 h-3 text-copper" />
      ) : (
        <ArrowDown className="w-3 h-3 text-copper" />
      );
    }

    return null;
  };

  // Column drag handlers
  const handleDragStart = (e: React.DragEvent, columnId: string) => {
    if (!enableColumnReorder) return;
    e.dataTransfer.setData('text/plain', columnId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedColumn(columnId);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    if (!enableColumnReorder) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (draggedColumn && draggedColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    if (!enableColumnReorder) return;
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');

    if (sourceId && targetId && sourceId !== targetId) {
      handleColumnReorder(sourceId, targetId);
    }

    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'virtualized-grid-container',
        classes?.container,
        className
      )}
      style={tssToInlineStyles(classes?.containerStyle)}
    >
      {/* Toolbar with controls */}
      {((enableGrouping && !hideGroupingUI) || !hideColumnManager) && (
        <div className="flex items-center justify-between gap-4 mb-4 px-4 pt-4">
          {/* Left side - active grouping pills */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {enableGrouping && !hideGroupingUI && groupingState.groupByColumns.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Grouped by:</span>
                {groupingState.groupByColumns.map((columnId) => {
                  const column = propColumns.find((col) => col.id === columnId);
                  if (!column) return null;

                  return (
                    <div
                      key={columnId}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-copper/20 to-copper/10 rounded-full border border-copper/30 text-xs font-semibold text-charcoal shadow-sm backdrop-blur-sm"
                    >
                      <span>{column.header}</span>
                      <button
                        onClick={() => {
                          const newColumns = groupingState.groupByColumns.filter((id) => id !== columnId);
                          handleGroupingChange(newColumns);
                        }}
                        className="hover:text-red-600 focus:outline-none transition-colors p-0.5 rounded-full hover:bg-red-50"
                        title="Remove grouping"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
                <button
                  onClick={() => handleGroupingChange([])}
                  className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Right side - control buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {enableGrouping && !hideGroupControls && !hideGroupingUI && (
              <GroupManager
                columns={propColumns}
                groupByColumns={groupingState.groupByColumns}
                updateGroupByColumns={handleGroupingChange}
                classes={classes}
              />
            )}
            {!hideColumnManager && (
              <ColumnManager
                columns={propColumns}
                visibleColumns={visibleColumnIds}
                toggleColumnVisibility={toggleColumnVisibility}
                resetGridPreferences={handleResetPreferences}
                classes={classes}
              />
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div
        className={cn('virtualized-grid-header', classes?.header)}
        style={{
          ...tssToInlineStyles(classes?.headerStyle),
          width: totalWidth,
        }}
      >
        {columns.map((column, index) => {
          const isFiltered = enableFiltering && filterState[column.id];
          const columnFilteringEnabled = column.enableFiltering !== false;

          return (
            <div
              key={column.id}
              className={cn(
                'virtualized-grid-header-cell',
                classes?.headerCell,
                column.headerClassName,
                dragOverColumn === column.id && 'bg-copper/10',
                enableColumnReorder && 'cursor-move'
              )}
              style={{
                ...tssToInlineStyles(classes?.headerCellStyle),
                ...tssToInlineStyles(column.headerStyle),
                width: getColumnWidth(column),
                animationDelay: `${index * 0.05}s`,
              }}
              draggable={enableColumnReorder}
              onDragStart={(e) => handleDragStart(e, column.id)}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDrop={(e) => handleDrop(e, column.id)}
              onDragEnd={handleDragEnd}
            >
              {renderHeaderCell ? (
                renderHeaderCell({
                  column,
                  columnIndex: index,
                  sortDirection: sortState?.column === column.id ? sortState.direction : undefined,
                  isFiltered: !!isFiltered,
                })
              ) : (
                <>
                  <div className="flex items-center justify-between gap-1.5 w-full">
                    <div
                      className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
                      onClick={() => handleSort(column.id)}
                    >
                      <span className="header-text truncate">{column.header}</span>
                      {enableSorting && renderSortIconDefault(column)}
                    </div>

                {/* Standalone Filter Button (when overflow menu is disabled) */}
                {enableFiltering && columnFilteringEnabled && !enableColumnMenu && !column.enableColumnMenu && (
                  <Popover.Root
                    open={openFilterPopovers[column.id] || false}
                    onOpenChange={(open) => {
                      setOpenFilterPopovers((prev) => ({ ...prev, [column.id]: open }));
                      if (open && !filterInputValues[column.id]) {
                        setFilterInputValues((prev) => ({
                          ...prev,
                          [column.id]: filterState[column.id] ?? '',
                        }));
                      }
                    }}
                  >
                    <Popover.Trigger asChild>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                          'relative p-1 rounded transition-all duration-200',
                          'hover:bg-white/15 active:scale-95',
                          'focus:outline-none focus-visible:ring-1 focus-visible:ring-ivory/50',
                          isFiltered ? 'text-copper' : 'text-ivory',
                          classes?.filterIcon
                        )}
                        title={isFiltered ? 'Filter active' : 'Filter'}
                      >
                        <Filter
                          className={cn(
                            'w-3 h-3 transition-all duration-200',
                            isFiltered
                              ? 'fill-copper drop-shadow-[0_0_4px_rgba(184,115,51,0.6)]'
                              : 'text-ivory/90 hover:text-ivory'
                          )}
                        />
                        {isFiltered && (
                          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-copper rounded-full border border-ivory/30 animate-pulse" />
                        )}
                      </button>
                    </Popover.Trigger>

                    <Popover.Portal>
                      <Popover.Content
                        className={cn(
                          'z-50 w-60 rounded-lg',
                          'bg-gradient-to-br from-ivory via-ivory to-ivory-dark',
                          'border-2 border-copper shadow-xl shadow-copper/20',
                          'animate-in fade-in-0 zoom-in-95',
                          classes?.filterMenu
                        )}
                        side="bottom"
                        align="end"
                        sideOffset={6}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {renderFilterMenu ? (
                          renderFilterMenu({
                            column,
                            filterValue: filterInputValues[column.id] ?? '',
                            onFilterChange: (value) => setFilterInputValues((prev) => ({ ...prev, [column.id]: value })),
                            onClose: () => setOpenFilterPopovers((prev) => ({ ...prev, [column.id]: false })),
                            isFiltered: !!isFiltered,
                          })
                        ) : column.renderFilterMenu ? (
                          column.renderFilterMenu({
                            column,
                            filterValue: filterInputValues[column.id] ?? '',
                            onFilterChange: (value) => setFilterInputValues((prev) => ({ ...prev, [column.id]: value })),
                            onClose: () => setOpenFilterPopovers((prev) => ({ ...prev, [column.id]: false })),
                            isFiltered: !!isFiltered,
                          })
                        ) : (
                          <div className="p-2.5 space-y-2.5">
                            {/* Compact Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <Search className="w-3 h-3 text-copper" />
                                <span className="text-[10px] font-bold text-charcoal/70 uppercase tracking-wide">
                                  Filter {column.header}
                                </span>
                              </div>
                              <Popover.Close
                                className="p-0.5 rounded hover:bg-copper/10 transition-colors"
                              >
                                <X className="w-3 h-3 text-charcoal/60" />
                              </Popover.Close>
                            </div>

                            {/* Compact Input */}
                            <input
                              type="text"
                              value={filterInputValues[column.id] ?? ''}
                              onChange={(e) => {
                                setFilterInputValues((prev) => ({
                                  ...prev,
                                  [column.id]: e.target.value,
                                }));
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleApplyFilter(column.id);
                                } else if (e.key === 'Escape') {
                                  setOpenFilterPopovers((prev) => ({ ...prev, [column.id]: false }));
                                }
                              }}
                              placeholder="Type to filter..."
                              className={cn(
                                'w-full px-2 py-1.5 text-xs',
                                'bg-white border border-copper/20 rounded',
                                'text-charcoal placeholder:text-charcoal/40',
                                'focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10',
                                'transition-all',
                                classes?.filterMenuInput
                              )}
                              autoFocus
                            />

                            {/* Compact Actions */}
                            <div className={cn('flex gap-1.5', classes?.filterMenuActions)}>
                              <button
                                onClick={() => handleApplyFilter(column.id)}
                                className={cn(
                                  'flex-1 px-2 py-1.5 rounded text-[11px] font-bold',
                                  'bg-gradient-to-r from-copper to-copper-dark text-white',
                                  'shadow-sm shadow-copper/30 hover:shadow-md',
                                  'active:scale-[0.98] transition-all'
                                )}
                              >
                                Apply
                              </button>
                              {isFiltered && (
                                <button
                                  onClick={() => handleClearFilter(column.id)}
                                  className={cn(
                                    'px-2 py-1.5 rounded text-[11px] font-bold',
                                    'bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/70',
                                    'active:scale-[0.98] transition-all'
                                  )}
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                        <Popover.Arrow className="fill-copper" width={12} height={6} />
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                )}

                {/* Column Overflow Menu */}
                {(enableColumnMenu || column.enableColumnMenu) && (
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      {renderColumnMenuTrigger ? (
                        renderColumnMenuTrigger({
                          column,
                          onClick: () => {},
                        })
                      ) : (
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            'p-1 rounded transition-all duration-200',
                            'hover:bg-white/15 active:scale-95',
                            'focus:outline-none focus-visible:ring-1 focus-visible:ring-ivory/50',
                            'text-ivory',
                            classes?.columnMenuTrigger
                          )}
                          title="Column options"
                        >
                          <MoreVertical className="w-3 h-3 text-ivory/90 hover:text-ivory transition-colors" />
                        </button>
                      )}
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className={cn(
                          'z-50 min-w-[180px] rounded-lg',
                          'bg-gradient-to-br from-ivory via-ivory to-ivory-dark',
                          'border-2 border-copper shadow-xl shadow-copper/20',
                          'animate-in fade-in-0 zoom-in-95',
                          'p-1',
                          classes?.columnMenu
                        )}
                        side="bottom"
                        align="end"
                        sideOffset={6}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Custom column menu renderer */}
                        {(renderColumnMenu || column.renderColumnMenu) ? (
                          <>
                            {column.renderColumnMenu ? (
                              column.renderColumnMenu({
                                column,
                                items: [...(column.columnMenuItems || []), ...(defaultColumnMenuItems || [])],
                                defaultItems: {
                                  filter: enableFiltering && columnFilteringEnabled ? (
                                    <DropdownMenu.Sub>
                                      <DropdownMenu.SubTrigger
                                        className={cn(
                                          'flex items-center justify-between gap-2 px-2.5 py-1.5 rounded',
                                          'text-xs font-medium text-charcoal cursor-pointer outline-none',
                                          'hover:bg-copper/10 focus:bg-copper/10 transition-colors',
                                          isFiltered && 'text-copper',
                                          classes?.columnMenuItem
                                        )}
                                      >
                                        <div className="flex items-center gap-2">
                                          <Filter className={cn('w-3 h-3', isFiltered && 'fill-copper')} />
                                          <span>Filter</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          {isFiltered && <span className="w-1.5 h-1.5 bg-copper rounded-full" />}
                                          <ChevronRight className="w-3 h-3 text-charcoal/40" />
                                        </div>
                                      </DropdownMenu.SubTrigger>
                                      <DropdownMenu.Portal>
                                        <DropdownMenu.SubContent
                                          className={cn(
                                            'z-50 w-60 rounded-lg',
                                            'bg-gradient-to-br from-ivory via-ivory to-ivory-dark',
                                            'border-2 border-copper shadow-xl shadow-copper/20',
                                            'animate-in fade-in-0 zoom-in-95 slide-in-from-left-1',
                                            classes?.filterMenu
                                          )}
                                          sideOffset={8}
                                        >
                                          {renderFilterMenu ? (
                                            renderFilterMenu({
                                              column,
                                              filterValue: filterInputValues[column.id] ?? '',
                                              onFilterChange: (value) => setFilterInputValues((prev) => ({ ...prev, [column.id]: value })),
                                              onClose: () => {},
                                              isFiltered: !!isFiltered,
                                            })
                                          ) : column.renderFilterMenu ? (
                                            column.renderFilterMenu({
                                              column,
                                              filterValue: filterInputValues[column.id] ?? '',
                                              onFilterChange: (value) => setFilterInputValues((prev) => ({ ...prev, [column.id]: value })),
                                              onClose: () => {},
                                              isFiltered: !!isFiltered,
                                            })
                                          ) : (
                                            <div className="p-2.5 space-y-2.5">
                                              <div className="flex items-center gap-1.5">
                                                <Search className="w-3 h-3 text-copper" />
                                                <span className="text-[10px] font-bold text-charcoal/70 uppercase tracking-wide">
                                                  Filter {column.header}
                                                </span>
                                              </div>
                                              <input
                                                type="text"
                                                value={filterInputValues[column.id] ?? ''}
                                                onChange={(e) => {
                                                  setFilterInputValues((prev) => ({
                                                    ...prev,
                                                    [column.id]: e.target.value,
                                                  }));
                                                }}
                                                onKeyDown={(e) => {
                                                  if (e.key === 'Enter') {
                                                    handleApplyFilter(column.id);
                                                  }
                                                }}
                                                placeholder="Type to filter..."
                                                className={cn(
                                                  'w-full px-2 py-1.5 text-xs',
                                                  'bg-white border border-copper/20 rounded',
                                                  'text-charcoal placeholder:text-charcoal/40',
                                                  'focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10',
                                                  'transition-all',
                                                  classes?.filterMenuInput
                                                )}
                                                autoFocus
                                              />
                                              <div className={cn('flex gap-1.5', classes?.filterMenuActions)}>
                                                <button
                                                  onClick={() => handleApplyFilter(column.id)}
                                                  className="flex-1 px-2 py-1.5 rounded text-[11px] font-bold bg-gradient-to-r from-copper to-copper-dark text-white shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                                                >
                                                  Apply
                                                </button>
                                                {isFiltered && (
                                                  <button
                                                    onClick={() => handleClearFilter(column.id)}
                                                    className="px-2 py-1.5 rounded text-[11px] font-bold bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/70 active:scale-[0.98] transition-all"
                                                  >
                                                    Clear
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </DropdownMenu.SubContent>
                                      </DropdownMenu.Portal>
                                    </DropdownMenu.Sub>
                                  ) : undefined,
                                  hideColumn: (
                                    <DropdownMenu.Item
                                      className={cn(
                                        'flex items-center gap-2 px-2.5 py-1.5 rounded',
                                        'text-xs font-medium text-charcoal cursor-pointer outline-none',
                                        'hover:bg-copper/10 focus:bg-copper/10 transition-colors',
                                        classes?.columnMenuItem
                                      )}
                                      onSelect={() => {
                                        toggleColumnVisibility(column.id, false);
                                        onColumnAction?.('hide', column.id);
                                      }}
                                    >
                                      <EyeOff className="w-3 h-3 text-charcoal/60" />
                                      <span>Hide Column</span>
                                    </DropdownMenu.Item>
                                  ),
                                },
                                onClose: () => {},
                              })
                            ) : renderColumnMenu?.({
                              column,
                              items: [...(column.columnMenuItems || []), ...(defaultColumnMenuItems || [])],
                              defaultItems: {
                                filter: enableFiltering && columnFilteringEnabled ? (
                                  <DropdownMenu.Sub>
                                    <DropdownMenu.SubTrigger
                                      className={cn(
                                        'flex items-center justify-between gap-2 px-2.5 py-1.5 rounded',
                                        'text-xs font-medium text-charcoal cursor-pointer outline-none',
                                        'hover:bg-copper/10 focus:bg-copper/10 transition-colors',
                                        isFiltered && 'text-copper',
                                        classes?.columnMenuItem
                                      )}
                                    >
                                      <div className="flex items-center gap-2">
                                        <Filter className={cn('w-3 h-3', isFiltered && 'fill-copper')} />
                                        <span>Filter</span>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        {isFiltered && <span className="w-1.5 h-1.5 bg-copper rounded-full" />}
                                        <ChevronRight className="w-3 h-3 text-charcoal/40" />
                                      </div>
                                    </DropdownMenu.SubTrigger>
                                    <DropdownMenu.Portal>
                                      <DropdownMenu.SubContent
                                        className={cn(
                                          'z-50 w-60 rounded-lg',
                                          'bg-gradient-to-br from-ivory via-ivory to-ivory-dark',
                                          'border-2 border-copper shadow-xl shadow-copper/20',
                                          'animate-in fade-in-0 zoom-in-95 slide-in-from-left-1',
                                          classes?.filterMenu
                                        )}
                                        sideOffset={8}
                                      >
                                        {renderFilterMenu ? (
                                          renderFilterMenu({
                                            column,
                                            filterValue: filterInputValues[column.id] ?? '',
                                            onFilterChange: (value) => setFilterInputValues((prev) => ({ ...prev, [column.id]: value })),
                                            onClose: () => {},
                                            isFiltered: !!isFiltered,
                                          })
                                        ) : column.renderFilterMenu ? (
                                          column.renderFilterMenu({
                                            column,
                                            filterValue: filterInputValues[column.id] ?? '',
                                            onFilterChange: (value) => setFilterInputValues((prev) => ({ ...prev, [column.id]: value })),
                                            onClose: () => {},
                                            isFiltered: !!isFiltered,
                                          })
                                        ) : (
                                          <div className="p-2.5 space-y-2.5">
                                            <div className="flex items-center gap-1.5">
                                              <Search className="w-3 h-3 text-copper" />
                                              <span className="text-[10px] font-bold text-charcoal/70 uppercase tracking-wide">
                                                Filter {column.header}
                                              </span>
                                            </div>
                                            <input
                                              type="text"
                                              value={filterInputValues[column.id] ?? ''}
                                              onChange={(e) => {
                                                setFilterInputValues((prev) => ({
                                                  ...prev,
                                                  [column.id]: e.target.value,
                                                }));
                                              }}
                                              onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                  handleApplyFilter(column.id);
                                                }
                                              }}
                                              placeholder="Type to filter..."
                                              className={cn(
                                                'w-full px-2 py-1.5 text-xs',
                                                'bg-white border border-copper/20 rounded',
                                                'text-charcoal placeholder:text-charcoal/40',
                                                'focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10',
                                                'transition-all',
                                                classes?.filterMenuInput
                                              )}
                                              autoFocus
                                            />
                                            <div className={cn('flex gap-1.5', classes?.filterMenuActions)}>
                                              <button
                                                onClick={() => handleApplyFilter(column.id)}
                                                className="flex-1 px-2 py-1.5 rounded text-[11px] font-bold bg-gradient-to-r from-copper to-copper-dark text-white shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                                              >
                                                Apply
                                              </button>
                                              {isFiltered && (
                                                <button
                                                  onClick={() => handleClearFilter(column.id)}
                                                  className="px-2 py-1.5 rounded text-[11px] font-bold bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/70 active:scale-[0.98] transition-all"
                                                >
                                                  Clear
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </DropdownMenu.SubContent>
                                    </DropdownMenu.Portal>
                                  </DropdownMenu.Sub>
                                ) : undefined,
                                hideColumn: (
                                  <DropdownMenu.Item
                                    className={cn(
                                      'flex items-center gap-2 px-2.5 py-1.5 rounded',
                                      'text-xs font-medium text-charcoal cursor-pointer outline-none',
                                      'hover:bg-copper/10 focus:bg-copper/10 transition-colors',
                                      classes?.columnMenuItem
                                    )}
                                    onSelect={() => {
                                      toggleColumnVisibility(column.id, false);
                                      onColumnAction?.('hide', column.id);
                                    }}
                                  >
                                    <EyeOff className="w-3 h-3 text-charcoal/60" />
                                    <span>Hide Column</span>
                                  </DropdownMenu.Item>
                                ),
                              },
                              onClose: () => {},
                            })}
                          </>
                        ) : (
                          <>
                            {/* Filter option in menu */}
                            {enableFiltering && columnFilteringEnabled && (
                              <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger
                                  className={cn(
                                    'flex items-center justify-between gap-2 px-2.5 py-1.5 rounded',
                                    'text-xs font-medium text-charcoal cursor-pointer outline-none',
                                    'hover:bg-copper/10 focus:bg-copper/10 transition-colors',
                                    isFiltered && 'text-copper',
                                    classes?.columnMenuItem
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    <Filter className={cn('w-3 h-3', isFiltered && 'fill-copper')} />
                                    <span>Filter</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    {isFiltered && <span className="w-1.5 h-1.5 bg-copper rounded-full" />}
                                    <ChevronRight className="w-3 h-3 text-charcoal/40" />
                                  </div>
                                </DropdownMenu.SubTrigger>
                                <DropdownMenu.Portal>
                                  <DropdownMenu.SubContent
                                    className={cn(
                                      'z-50 w-60 rounded-lg',
                                      'bg-gradient-to-br from-ivory via-ivory to-ivory-dark',
                                      'border-2 border-copper shadow-xl shadow-copper/20',
                                      'animate-in fade-in-0 zoom-in-95 slide-in-from-left-1',
                                      classes?.filterMenu
                                    )}
                                    sideOffset={8}
                                  >
                                    {renderFilterMenu ? (
                                      renderFilterMenu({
                                        column,
                                        filterValue: filterInputValues[column.id] ?? '',
                                        onFilterChange: (value) => setFilterInputValues((prev) => ({ ...prev, [column.id]: value })),
                                        onClose: () => {},
                                        isFiltered: !!isFiltered,
                                      })
                                    ) : column.renderFilterMenu ? (
                                      column.renderFilterMenu({
                                        column,
                                        filterValue: filterInputValues[column.id] ?? '',
                                        onFilterChange: (value) => setFilterInputValues((prev) => ({ ...prev, [column.id]: value })),
                                        onClose: () => {},
                                        isFiltered: !!isFiltered,
                                      })
                                    ) : (
                                      <div className="p-2.5 space-y-2.5">
                                        <div className="flex items-center gap-1.5">
                                          <Search className="w-3 h-3 text-copper" />
                                          <span className="text-[10px] font-bold text-charcoal/70 uppercase tracking-wide">
                                            Filter {column.header}
                                          </span>
                                        </div>
                                        <input
                                          type="text"
                                          value={filterInputValues[column.id] ?? ''}
                                          onChange={(e) => {
                                            setFilterInputValues((prev) => ({
                                              ...prev,
                                              [column.id]: e.target.value,
                                            }));
                                          }}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                              handleApplyFilter(column.id);
                                            }
                                          }}
                                          placeholder="Type to filter..."
                                          className={cn(
                                            'w-full px-2 py-1.5 text-xs',
                                            'bg-white border border-copper/20 rounded',
                                            'text-charcoal placeholder:text-charcoal/40',
                                            'focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10',
                                            'transition-all',
                                            classes?.filterMenuInput
                                          )}
                                          autoFocus
                                        />
                                        <div className={cn('flex gap-1.5', classes?.filterMenuActions)}>
                                          <button
                                            onClick={() => handleApplyFilter(column.id)}
                                            className="flex-1 px-2 py-1.5 rounded text-[11px] font-bold bg-gradient-to-r from-copper to-copper-dark text-white shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                                          >
                                            Apply
                                          </button>
                                          {isFiltered && (
                                            <button
                                              onClick={() => handleClearFilter(column.id)}
                                              className="px-2 py-1.5 rounded text-[11px] font-bold bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/70 active:scale-[0.98] transition-all"
                                            >
                                              Clear
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </DropdownMenu.SubContent>
                                </DropdownMenu.Portal>
                              </DropdownMenu.Sub>
                            )}

                            {/* Separator */}
                            {enableFiltering && columnFilteringEnabled && <DropdownMenu.Separator className="h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent my-1" />}

                            {/* Hide Column */}
                            <DropdownMenu.Item
                              className={cn(
                                'flex items-center gap-2 px-2.5 py-1.5 rounded',
                                'text-xs font-medium text-charcoal cursor-pointer outline-none',
                                'hover:bg-copper/10 focus:bg-copper/10 transition-colors',
                                classes?.columnMenuItem
                              )}
                              onSelect={() => {
                                toggleColumnVisibility(column.id, false);
                                onColumnAction?.('hide', column.id);
                              }}
                            >
                              <EyeOff className="w-3 h-3 text-charcoal/60" />
                              <span>Hide Column</span>
                            </DropdownMenu.Item>

                            {/* Custom Column Menu Items */}
                            {column.columnMenuItems && column.columnMenuItems.length > 0 && (
                              <>
                                <DropdownMenu.Separator className="h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent my-1" />
                                {column.columnMenuItems.map((item) => (
                                  <MenuItemRenderer
                                    key={item.id}
                                    item={item}
                                    columnId={column.id}
                                    onColumnAction={onColumnAction}
                                    classes={classes}
                                  />
                                ))}
                              </>
                            )}

                            {/* Default Column Menu Items */}
                            {defaultColumnMenuItems && defaultColumnMenuItems.length > 0 && (
                              <>
                                <DropdownMenu.Separator className="h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent my-1" />
                                {defaultColumnMenuItems.map((item) => (
                                  <MenuItemRenderer
                                    key={item.id}
                                    item={item}
                                    columnId={column.id}
                                    onColumnAction={onColumnAction}
                                    classes={classes}
                                  />
                                ))}
                              </>
                            )}
                          </>
                        )}
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                )}
              </div>
              <div className="header-accent" />

              {/* Resize handle */}
              {enableColumnResize && (
                <div
                className={cn(
                  'absolute right-0 top-0 bottom-0 w-2 cursor-col-resize',
                  'hover:border-r-2 hover:border-copper transition-all',
                  'group',
                  classes?.resizeHandle
                )}
                style={tssToInlineStyles(classes?.resizeHandleStyle)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const startX = e.clientX;
                  const startWidth = getColumnWidth(column);

                  const handleMouseMove = (e: MouseEvent) => {
                    const diff = e.clientX - startX;
                    const newWidth = Math.max(50, startWidth + diff);
                    handleColumnWidthChange(column.id, newWidth);
                  };

                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };

                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
                />
              )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Body */}
      {shouldVirtualize ? (
        <VirtualizedBody
          data={processedData}
          columns={columns}
          rowHeight={rowHeight}
          overscan={overscan}
          totalWidth={totalWidth}
          getColumnWidth={getColumnWidth}
          selectedRows={selectedRows}
          onRowClick={onRowClick}
          onRowMouseDown={onRowMouseDown}
          onRowMouseEnter={onRowMouseEnter}
          getRowId={getRowId}
          classes={classes}
          renderCell={renderCell}
          enableCellSelection={enableCellSelection}
          selectedCell={selectedCell}
          onCellSelect={handleCellSelect}
          enableExpandableRows={enableExpandableRows}
          expandedRows={expandedRows}
          onToggleRowExpand={handleToggleRowExpand}
          renderExpandedRow={renderExpandedRow}
          expandedRowHeight={expandedRowHeight}
          enableGrouping={enableGrouping}
          onToggleGroupExpand={handleToggleGroupExpand}
          groupingState={groupingState}
          renderGroupRow={renderGroupRow}
          onScroll={onScroll}
        />
      ) : (
        <StandardBody
          data={processedData}
          columns={columns}
          totalWidth={totalWidth}
          getColumnWidth={getColumnWidth}
          selectedRows={selectedRows}
          onRowClick={onRowClick}
          onRowMouseDown={onRowMouseDown}
          onRowMouseEnter={onRowMouseEnter}
          getRowId={getRowId}
          classes={classes}
          renderCell={renderCell}
          enableCellSelection={enableCellSelection}
          selectedCell={selectedCell}
          onCellSelect={handleCellSelect}
          enableExpandableRows={enableExpandableRows}
          expandedRows={expandedRows}
          onToggleRowExpand={handleToggleRowExpand}
          renderExpandedRow={renderExpandedRow}
          enableGrouping={enableGrouping}
          onToggleGroupExpand={handleToggleGroupExpand}
          groupingState={groupingState}
          renderGroupRow={renderGroupRow}
        />
      )}

      {/* Pagination */}
      {pagination && (
        <Pagination
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalRows={pagination.totalRows}
          onPageChange={pagination.onPageChange || (() => {})}
          onPageSizeChange={pagination.onPageSizeChange}
          pageSizeOptions={pagination.pageSizeOptions}
          classes={classes}
        />
      )}

      {/* Grain overlay */}
      <div className="grain-overlay" />
    </div>
  );
}

// Virtualized Body Component
function VirtualizedBody<T extends Record<string, any>>({
  data,
  columns,
  rowHeight,
  overscan,
  totalWidth,
  getColumnWidth,
  selectedRows,
  onRowClick,
  onRowMouseDown,
  onRowMouseEnter,
  getRowId,
  classes,
  renderCell,
  enableCellSelection,
  selectedCell,
  onCellSelect,
  enableExpandableRows,
  expandedRows,
  onToggleRowExpand,
  renderExpandedRow,
  expandedRowHeight,
  enableGrouping,
  onToggleGroupExpand,
  groupingState,
  renderGroupRow,
  onScroll,
}: any) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      const item = data[index];
      const rowId = getRowId(item, index);
      // If this row is expanded, estimate a larger size
      if (enableExpandableRows && expandedRows[rowId] && renderExpandedRow) {
        return rowHeight + expandedRowHeight;
      }
      return rowHeight;
    },
    overscan,
  });

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (onScroll) {
      const target = e.currentTarget;
      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight;
      const clientHeight = target.clientHeight;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      onScroll({ scrollTop, scrollHeight, clientHeight, scrollPercentage });
    }
  }, [onScroll]);

  return (
    <div ref={parentRef} className={cn('virtualized-grid-body', classes?.body)} onScroll={handleScroll}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: totalWidth,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = data[virtualRow.index];

          // Check if this is a group row
          if (enableGrouping && (item as GroupRow).isGroupRow) {
            const groupRow = item as GroupRow;
            const isExpanded = groupingState.expandedGroups[groupRow.groupKey];

            return (
              <div
                key={virtualRow.key}
                className={cn(
                  'virtualized-grid-row',
                  'cursor-pointer bg-gray-50 dark:bg-gray-900 font-medium',
                  classes?.row
                )}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  paddingLeft: `${groupRow.depth * 24}px`,
                }}
                onClick={() => onToggleGroupExpand(groupRow.groupKey)}
              >
                {renderGroupRow ? (
                  renderGroupRow({
                    groupKey: groupRow.groupKey,
                    columnId: groupRow.columnId,
                    value: groupRow.groupValue,
                    depth: groupRow.depth,
                    isExpanded,
                    onToggleExpand: () => onToggleGroupExpand(groupRow.groupKey),
                    count: groupRow.count,
                  })
                ) : (
                  <div className="flex items-center px-4 py-2">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 mr-2" />
                    ) : (
                      <ChevronRight className="w-4 h-4 mr-2" />
                    )}
                    <span>{groupRow.groupValue}</span>
                    <span className="ml-2 text-sm text-gray-500">({groupRow.count})</span>
                  </div>
                )}
              </div>
            );
          }

          // Regular data row
          const rowId = (item as any).__skeleton ? (item as any).__id : getRowId(item, virtualRow.index);
          const isSelected = selectedRows[rowId];
          const isExpanded = expandedRows[rowId];

          const estimatedHeight = isExpanded ? rowHeight + expandedRowHeight : rowHeight;

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                minHeight: `${estimatedHeight}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {/* Main row */}
              <div
                className={cn(
                  'virtualized-grid-row',
                  onRowClick && 'clickable',
                  isSelected && 'selected',
                  classes?.row,
                  isSelected && classes?.selectedRow
                )}
                style={{
                  ...tssToInlineStyles(classes?.rowStyle),
                  ...(isSelected && tssToInlineStyles(classes?.selectedRowStyle)),
                  height: `${rowHeight}px`,
                }}
                onClick={(e) => onRowClick?.(item, virtualRow.index, e)}
                onMouseDown={(e) => onRowMouseDown?.(item, virtualRow.index, e)}
                onMouseEnter={(e) => onRowMouseEnter?.(item, virtualRow.index, e)}
              >
                {columns.map((column: ColumnDef<T>, colIndex: number) => {
                  const isCellSelected = enableCellSelection &&
                    selectedCell?.rowId === rowId &&
                    selectedCell?.columnId === column.id;

                  return (
                    <div
                      key={column.id}
                      className={cn(
                        'virtualized-grid-cell',
                        classes?.cell,
                        column.cellClassName,
                        isCellSelected && 'ring-2 ring-copper ring-inset',
                        isCellSelected && classes?.selectedCell
                      )}
                      style={{
                        ...tssToInlineStyles(classes?.cellStyle),
                        ...tssToInlineStyles(column.cellStyle),
                        width: getColumnWidth(column),
                      }}
                      onClick={(e) => {
                        if (enableCellSelection) {
                          e.stopPropagation();
                          onCellSelect(rowId, column.id);
                        }
                      }}
                    >
                      <div className="cell-content">
                        {/* Show skeleton if this is a skeleton row */}
                        {(item as any).__skeleton ? (
                          <div className="skeleton-shimmer" style={{ width: '80%', height: '16px', borderRadius: '4px' }} />
                        ) : (
                          <>
                            {/* Expand button in first cell - only show if renderExpandedRow exists */}
                            {enableExpandableRows && renderExpandedRow && colIndex === 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleRowExpand(rowId);
                                }}
                                className="mr-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                              >
                                {isExpanded ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </button>
                            )}
                            {renderCell
                              ? renderCell({ value: item[column.key], row: item, column, rowIndex: virtualRow.index })
                              : column.render
                              ? column.render(item)
                              : column.renderCell
                              ? column.renderCell(item)
                              : String(item[column.key] ?? '')}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="row-shimmer" />
              </div>

              {/* Expanded row content - render function has full control */}
              {enableExpandableRows && isExpanded && renderExpandedRow && renderExpandedRow(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Standard (Non-Virtualized) Body Component
function StandardBody<T extends Record<string, any>>({
  data,
  columns,
  totalWidth,
  getColumnWidth,
  selectedRows,
  onRowClick,
  onRowMouseDown,
  onRowMouseEnter,
  getRowId,
  classes,
  renderCell,
  enableCellSelection,
  selectedCell,
  onCellSelect,
  enableExpandableRows,
  expandedRows,
  onToggleRowExpand,
  renderExpandedRow,
  enableGrouping,
  onToggleGroupExpand,
  groupingState,
  renderGroupRow,
}: any) {
  return (
    <div className={cn('virtualized-grid-body', classes?.body)} style={{ width: totalWidth }}>
      {data.map((item: T | GroupRow, index: number) => {
        // Check if this is a group row
        if (enableGrouping && (item as GroupRow).isGroupRow) {
          const groupRow = item as GroupRow;
          const isExpanded = groupingState.expandedGroups[groupRow.groupKey];

          return (
            <div
              key={groupRow.groupKey}
              className={cn(
                'virtualized-grid-row',
                'cursor-pointer bg-gray-50 dark:bg-gray-900 font-medium',
                classes?.row
              )}
              style={{
                ...tssToInlineStyles(classes?.rowStyle),
                paddingLeft: `${groupRow.depth * 24}px`,
              }}
              onClick={() => onToggleGroupExpand(groupRow.groupKey)}
            >
              {renderGroupRow ? (
                renderGroupRow({
                  groupKey: groupRow.groupKey,
                  columnId: groupRow.columnId,
                  value: groupRow.groupValue,
                  depth: groupRow.depth,
                  isExpanded,
                  onToggleExpand: () => onToggleGroupExpand(groupRow.groupKey),
                  count: groupRow.count,
                })
              ) : (
                <div className="flex items-center px-4 py-2">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 mr-2" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-2" />
                  )}
                  <span>{groupRow.groupValue}</span>
                  <span className="ml-2 text-sm text-gray-500">({groupRow.count})</span>
                </div>
              )}
            </div>
          );
        }

        // Regular data row
        const rowId = (item as any).__skeleton ? (item as any).__id : getRowId(item, index);
        const isSelected = selectedRows[rowId];
        const isExpanded = expandedRows[rowId];

        return (
          <>
            <div
              key={rowId}
              className={cn(
                'virtualized-grid-row',
                onRowClick && 'clickable',
                isSelected && 'selected',
                classes?.row,
                isSelected && classes?.selectedRow
              )}
              style={{
                ...tssToInlineStyles(classes?.rowStyle),
                ...(isSelected && tssToInlineStyles(classes?.selectedRowStyle)),
              }}
              onClick={(e) => onRowClick?.(item, index, e)}
              onMouseDown={(e) => onRowMouseDown?.(item, index, e)}
              onMouseEnter={(e) => onRowMouseEnter?.(item, index, e)}
            >
              {columns.map((column: ColumnDef<T>, colIndex: number) => {
                const isCellSelected = enableCellSelection &&
                  selectedCell?.rowId === rowId &&
                  selectedCell?.columnId === column.id;

                return (
                  <div
                    key={column.id}
                    className={cn(
                      'virtualized-grid-cell',
                      classes?.cell,
                      column.cellClassName,
                      isCellSelected && 'ring-2 ring-copper ring-inset',
                      isCellSelected && classes?.selectedCell
                    )}
                    style={{
                      ...tssToInlineStyles(classes?.cellStyle),
                      ...tssToInlineStyles(column.cellStyle),
                      width: getColumnWidth(column),
                    }}
                    onClick={(e) => {
                      if (enableCellSelection) {
                        e.stopPropagation();
                        onCellSelect(rowId, column.id);
                      }
                    }}
                  >
                    <div className="cell-content">
                      {/* Show skeleton if this is a skeleton row */}
                      {(item as any).__skeleton ? (
                        <div className="skeleton-shimmer" style={{ width: '80%', height: '16px', borderRadius: '4px' }} />
                      ) : (
                        <>
                          {/* Expand button in first cell - only show if renderExpandedRow exists */}
                          {enableExpandableRows && renderExpandedRow && colIndex === 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleRowExpand(rowId);
                              }}
                              className="mr-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                            >
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                          )}
                          {renderCell
                            ? renderCell({ value: (item as any)[column.key], row: item as T, column })
                            : column.render
                            ? column.render(item as T)
                            : column.renderCell
                            ? column.renderCell(item as T)
                            : String((item as any)[column.key] ?? '')}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="row-shimmer" />
            </div>

            {/* Expanded row content - render function has full control */}
            {enableExpandableRows && isExpanded && renderExpandedRow && renderExpandedRow(item as T)}
          </>
        );
      })}
    </div>
  );
}

export default DataGrid;
