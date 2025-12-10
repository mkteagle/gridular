import { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ArrowUp, ArrowDown, ChevronDown, ChevronRight, X } from 'lucide-react';
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

  // Grouping
  enableGrouping = false,
  groupingState: controlledGroupingState,
  onGroupingChange,
  renderGroupRow,

  // Expandable Rows
  enableExpandableRows = false,
  expandedRows: controlledExpandedRows,
  onExpandedRowsChange,
  renderExpandedRow,

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
  renderSortIcon: _renderSortIcon,
  renderFilterIcon: _renderFilterIcon,

  // Callbacks
  onRowClick,
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
    if (enableSorting && sortState && !enableGrouping) {
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
      {(enableGrouping || !hideColumnManager) && (
        <div className="flex items-center justify-between gap-4 mb-4 px-4 pt-4">
          {/* Left side - active grouping pills */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {enableGrouping && groupingState.groupByColumns.length > 0 && (
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
            {enableGrouping && !hideGroupControls && (
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
        {columns.map((column, index) => (
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
            <div
              className="flex items-center justify-between gap-2 cursor-pointer"
              onClick={() => handleSort(column.id)}
            >
              <span className="header-text">{column.header}</span>
              {enableSorting && renderSortIconDefault(column)}
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
          </div>
        ))}
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
        return rowHeight + 200;
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
                onClick={() => onRowClick?.(item, virtualRow.index)}
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

              {/* Expanded row content */}
              {enableExpandableRows && isExpanded && renderExpandedRow && (
                <div className="border-t bg-gray-50 dark:bg-gray-800">
                  <div className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {renderExpandedRow(item)}
                  </div>
                </div>
              )}
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
              onClick={() => onRowClick?.(item, index)}
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

            {/* Expanded row content */}
            {enableExpandableRows && isExpanded && renderExpandedRow && (
              <div
                key={`${rowId}-expanded`}
                className="border-b bg-gray-50 dark:bg-gray-800"
              >
                <div className="px-4 py-3 bg-white dark:bg-gray-800 border-t text-gray-900 dark:text-gray-100">
                  {renderExpandedRow(item as T)}
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}

export default DataGrid;
