"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  ChevronDown,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  Filter,
  EyeOff,
  Grip,
} from "lucide-react";

import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  DataGridProps,
  SortDirection,
  FilterValue,
  ColumnResizeState,
  RowSelectionState,
  VisibleColumnState,
  ColumnOrderState,
} from "./types";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function DataGrid<T>({
  columns,
  data,
  onRowClick,
  onSelectionChange,
  onSortChange,
  onFilterChange,
  onColumnVisibilityChange,
  onColumnOrderChange,
  enableSorting = true,
  enableFiltering = true,
  enableColumnResize = true,
  enableRowSelection = false,
  enablePagination = true,
  enableColumnVisibility = true, // New prop
  enableColumnReordering = true, // New prop
  defaultVisibleColumns, // New prop for default visible columns
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50, 100],
  className,
  rowClassName,
  headerClassName,
  cellClassName,
  selectedRowClassName = "bg-primary/10",
  emptyMessage = "No data available",
  loadingMessage = "Loading data...",
  isLoading = false,
}: DataGridProps<T>) {
  const { theme } = useTheme();

  // State management
  const [sortState, setSortState] = useState<{
    column: string;
    direction: SortDirection;
  } | null>(null);
  const [filterState, setFilterState] = useState<Record<string, FilterValue>>(
    {}
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
  const [columnResizeState, setColumnResizeState] = useState<ColumnResizeState>(
    {}
  );
  const [isResizing, setIsResizing] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState<string | null>(null);

  // New states for column management
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumnState>(
    defaultVisibleColumns ||
      Object.fromEntries(columns.map((col) => [col.id, true]))
  );

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((col) => col.id)
  );

  // Ref for filter value to avoid recreating FilterMenu on every render
  const filterValueRefs = useRef<Record<string, string>>({});

  // Get filtered and ordered columns
  const displayColumns = useMemo(() => {
    return columnOrder
      .filter((columnId) => visibleColumns[columnId])
      .map((columnId) => columns.find((col) => col.id === columnId))
      .filter(Boolean) as ColumnDef<T>[];
  }, [columns, visibleColumns, columnOrder]);

  // Initialize filter values from filterState
  useEffect(() => {
    Object.keys(filterState).forEach((columnId) => {
      filterValueRefs.current[columnId] =
        (filterState[columnId] as string) || "";
    });
  }, [filterState]);

  // Process data with sorting and filtering
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply filtering
    Object.entries(filterState).forEach(([columnId, filterValue]) => {
      if (filterValue) {
        const column = columns.find((col) => col.id === columnId);
        if (column && column.filterFn) {
          result = result.filter((row) =>
            column.filterFn!(row, columnId, filterValue)
          );
        } else {
          result = result.filter((row) => {
            const value = String(
              (row as Record<string, unknown>)[columnId] || ""
            ).toLowerCase();
            return value.includes(String(filterValue).toLowerCase());
          });
        }
      }
    });

    // Apply sorting
    if (sortState) {
      const { column, direction } = sortState;
      const sortColumn = columns.find((col) => col.id === column);

      result.sort((a, b) => {
        let valueA = (a as Record<string, any>)[column];
        let valueB = (b as Record<string, any>)[column];

        // Use custom sort function if provided
        if (sortColumn?.sortFn) {
          return (
            sortColumn.sortFn(a, b, column) * (direction === "asc" ? 1 : -1)
          );
        }

        // Default sorting logic
        if (typeof valueA === "string") valueA = valueA.toLowerCase();
        if (typeof valueB === "string") valueB = valueB.toLowerCase();

        if (valueA < valueB) return direction === "asc" ? -1 : 1;
        if (valueA > valueB) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, sortState, filterState, columns]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!enablePagination) return processedData;
    const start = pageIndex * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, pageIndex, pageSize, enablePagination]);

  const pageCount = useMemo(
    () => Math.ceil(processedData.length / pageSize),
    [processedData.length, pageSize]
  );

  // Handle sorting
  const handleSort = useCallback(
    (columnId: string) => {
      if (!enableSorting) return;

      setSortState((prev) => {
        const newState =
          !prev || prev.column !== columnId
            ? { column: columnId, direction: "asc" as SortDirection }
            : prev.direction === "asc"
            ? { column: columnId, direction: "desc" as SortDirection }
            : null;

        if (onSortChange) {
          onSortChange(newState);
        }

        return newState;
      });
    },
    [enableSorting, onSortChange]
  );

  // Handle filtering
  const handleFilterChange = useCallback(
    (columnId: string, value: FilterValue) => {
      setFilterState((prev) => {
        const newState = { ...prev, [columnId]: value };

        if (onFilterChange) {
          onFilterChange(newState);
        }

        return newState;
      });

      // Reset to first page when filtering
      setPageIndex(0);
    },
    [onFilterChange]
  );

  // Handle row selection
  const handleRowSelect = useCallback(
    (rowId: string) => {
      if (!enableRowSelection) return;

      setSelectedRows((prev) => {
        const newState = { ...prev, [rowId]: !prev[rowId] };

        if (onSelectionChange) {
          onSelectionChange(newState);
        }

        return newState;
      });
    },
    [enableRowSelection, onSelectionChange]
  );

  // Handle column visibility change
  const handleColumnVisibilityChange = useCallback(
    (columnId: string, isVisible: boolean) => {
      setVisibleColumns((prev) => {
        const newState = { ...prev, [columnId]: isVisible };

        if (onColumnVisibilityChange) {
          onColumnVisibilityChange(newState);
        }

        return newState;
      });
    },
    [onColumnVisibilityChange]
  );

  // Reset column visibility to defaults
  const resetColumnVisibility = useCallback(() => {
    const defaultState =
      defaultVisibleColumns ||
      Object.fromEntries(columns.map((col) => [col.id, true]));

    setVisibleColumns(defaultState);

    if (onColumnVisibilityChange) {
      onColumnVisibilityChange(defaultState);
    }
  }, [columns, defaultVisibleColumns, onColumnVisibilityChange]);

  // Handle column reordering
  const handleColumnReorder = useCallback(
    (result: any) => {
      if (!result.destination) return;

      const newOrder = [...columnOrder];
      const [movedItem] = newOrder.splice(result.source.index, 1);
      newOrder.splice(result.destination.index, 0, movedItem);

      setColumnOrder(newOrder);

      if (onColumnOrderChange) {
        onColumnOrderChange(newOrder);
      }
    },
    [columnOrder, onColumnOrderChange]
  );

  // Reset column order to default
  // Removed unused resetColumnOrder function

  // Handle column resize
  const handleColumnResizeStart = useCallback(
    (columnId: string, startWidth: number, e: React.MouseEvent) => {
      if (!enableColumnResize) return;

      setIsResizing(true);

      const startX = e.clientX;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const newWidth = Math.max(50, startWidth + deltaX);

        setColumnResizeState((prev) => ({
          ...prev,
          [columnId]: newWidth,
        }));
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setIsResizing(false);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [enableColumnResize]
  );

  // Reset page when data changes
  useEffect(() => {
    setPageIndex(0);
  }, [data.length]);

  // Calculate column widths
  const getColumnWidth = useCallback(
    (column: ColumnDef<T>) => {
      if (columnResizeState[column.id]) {
        return columnResizeState[column.id];
      }

      return column.width || 150;
    },
    [columnResizeState]
  );

  // Filter menu component using shadcn/ui Popover
  const FilterMenu = useCallback(
    ({
      column,
      filterValue,
      setFilterValue,
    }: {
      column: ColumnDef<T>;
      filterValue: string;
      setFilterValue: React.Dispatch<React.SetStateAction<string>>;
    }) => {
      const handleApplyFilter = () => {
        filterValueRefs.current[column.id] = filterValue;
        handleFilterChange(column.id, filterValue);
        setFilterMenuOpen(null);
      };

      const handleClearFilter = () => {
        setFilterValue("");
        filterValueRefs.current[column.id] = "";
        handleFilterChange(column.id, null);
        setFilterMenuOpen(null);
      };

      return (
        <div className={cn("p-3", theme.filterMenuContent)}>
          <div className="flex flex-col gap-2">
            <div className={cn("text-sm font-medium", theme.filterMenuHeader)}>
              Filter {column.header}
            </div>
            <Input
              type="text"
              value={filterValue || ""}
              onChange={(e) => setFilterValue(e.target.value)}
              className={cn("h-8", theme.filterMenuInput)}
              placeholder="Filter value..."
              autoFocus
            />
            <div className="flex justify-between mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilter}
                className={theme.filterMenuClearButton}
              >
                Clear
              </Button>
              <Button
                size="sm"
                onClick={handleApplyFilter}
                className={theme.filterMenuApplyButton}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      );
    },
    [handleFilterChange, theme]
  );
  // Column visibility menu component
  const ColumnVisibilityMenu = useCallback(() => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-2">
            <EyeOff className="h-4 w-4 mr-1" />
            <span>Columns</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {columns.map((column) => (
            <DropdownMenuItem
              key={column.id}
              className="flex items-center gap-2"
              onSelect={(e) => e.preventDefault()}
            >
              <Checkbox
                id={`column-${column.id}`}
                checked={visibleColumns[column.id]}
                onCheckedChange={(checked) => {
                  handleColumnVisibilityChange(column.id, !!checked);
                }}
              />
              <label
                htmlFor={`column-${column.id}`}
                className="flex-1 cursor-pointer"
              >
                {column.header}
              </label>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={resetColumnVisibility}>
            Reset columns
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }, [
    columns,
    visibleColumns,
    handleColumnVisibilityChange,
    resetColumnVisibility,
  ]);

  // Render empty state
  if (!isLoading && (!data || data.length === 0)) {
    return (
      <div
        className={cn(
          "w-full border rounded-md overflow-hidden",
          theme.container,
          className
        )}
      >
        <div className="p-4 text-center text-muted-foreground">
          {emptyMessage}
        </div>
      </div>
    );
  }

  // Render loading state
  if (isLoading) {
    return (
      <div
        className={cn(
          "w-full border rounded-md overflow-hidden",
          theme.container,
          className
        )}
      >
        <div className="p-4 text-center text-muted-foreground">
          {loadingMessage}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full border rounded-md overflow-hidden",
        theme.container,
        className
      )}
    >
      {/* Table toolbar */}
      <div className="flex justify-end p-2 border-b">
        {enableColumnVisibility && <ColumnVisibilityMenu />}
      </div>

      {/* Table */}
      <div className="w-full overflow-auto">
        <DragDropContext onDragEnd={handleColumnReorder}>
          <table className="w-full border-collapse">
            {/* Header */}
            <Droppable
              droppableId="columns"
              direction="horizontal"
              isDropDisabled={!enableColumnReordering}
            >
              {(provided) => (
                <thead
                  className={cn(theme.header, headerClassName)}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <tr>
                    {displayColumns.map((column, index) => (
                      <Draggable
                        key={column.id}
                        draggableId={column.id}
                        index={index}
                        isDragDisabled={!enableColumnReordering}
                      >
                        {(provided, snapshot) => (
                          <th
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={cn(
                              "relative p-2 text-left font-medium border-b",
                              theme.headerCell,
                              column.headerClassName,
                              snapshot.isDragging && "opacity-70 bg-muted"
                            )}
                            style={{
                              width: getColumnWidth(column),
                              minWidth: getColumnWidth(column),
                              maxWidth: getColumnWidth(column),
                              cursor:
                                enableSorting && column.enableSorting !== false
                                  ? "pointer"
                                  : "default",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div className="flex items-center justify-between gap-2">
                              {enableColumnReordering && (
                                <div
                                  {...provided.dragHandleProps}
                                  className="flex items-center mr-1 cursor-grab"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Grip className="h-3 w-3 text-muted-foreground/70" />
                                </div>
                              )}

                              <div
                                className="flex items-center gap-2 flex-1"
                                onClick={() => {
                                  if (
                                    enableSorting &&
                                    column.enableSorting !== false
                                  ) {
                                    handleSort(column.id);
                                  }
                                }}
                              >
                                {column.header}

                                {/* Sort indicator */}
                                {enableSorting &&
                                  column.enableSorting !== false && (
                                    <div className="flex items-center">
                                      {sortState?.column === column.id ? (
                                        sortState.direction === "asc" ? (
                                          <ArrowUp className="w-4 h-4" />
                                        ) : (
                                          <ArrowDown className="w-4 h-4" />
                                        )
                                      ) : (
                                        <ArrowUpDown className="w-4 h-4 opacity-30" />
                                      )}
                                    </div>
                                  )}
                              </div>

                              {/* Filter button */}
                              {enableFiltering &&
                                column.enableFiltering !== false && (
                                  <Popover
                                    open={filterMenuOpen === column.id}
                                    onOpenChange={(open) => {
                                      if (open) {
                                        setFilterMenuOpen(column.id);
                                      } else {
                                        setFilterMenuOpen(null);
                                      }
                                    }}
                                  >
                                    <PopoverTrigger asChild>
                                      <button
                                        onClick={(e) => e.stopPropagation()}
                                        className={cn(
                                          "p-1 rounded hover:bg-muted",
                                          filterState[column.id]
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                        )}
                                      >
                                        <Filter className="w-4 h-4" />
                                      </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className={cn(
                                        "w-[200px] p-0 z-50",
                                        theme.filterMenu
                                      )}
                                      align="start"
                                      alignOffset={-25}
                                      side="bottom"
                                      sideOffset={5}
                                    >
                                      <FilterMenu
                                        column={column}
                                        filterValue={
                                          filterValueRefs.current[column.id] ||
                                          ""
                                        }
                                        setFilterValue={(value) => {
                                          filterValueRefs.current[column.id] =
                                            typeof value === "string"
                                              ? value
                                              : value("");
                                        }}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                )}

                              {/* Column resize handle */}
                              {enableColumnResize &&
                                column.enableResize !== false && (
                                  <div
                                    className={cn(
                                      "absolute right-0 top-0 h-full w-2 cursor-col-resize group",
                                      isResizing && "bg-primary/20"
                                    )}
                                    onMouseDown={(e) => {
                                      const width = getColumnWidth(column);
                                      handleColumnResizeStart(
                                        column.id,
                                        width,
                                        e
                                      );
                                    }}
                                  >
                                    <div className="absolute right-0 top-0 h-full w-1 opacity-0 group-hover:opacity-100 bg-primary/30" />
                                  </div>
                                )}
                            </div>
                          </th>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tr>
                </thead>
              )}
            </Droppable>

            {/* Body */}
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
                        handleRowSelect(rowId);
                      }
                      if (onRowClick) {
                        onRowClick(row);
                      }
                    }}
                    style={{
                      cursor:
                        enableRowSelection || onRowClick
                          ? "pointer"
                          : "default",
                    }}
                  >
                    {displayColumns.map((column) => (
                      <td
                        key={`${rowId}-${column.id}`}
                        className={cn(
                          "p-2 border-b",
                          theme.cell,
                          column.cellClassName,
                          cellClassName
                        )}
                        style={{
                          width: getColumnWidth(column),
                          maxWidth: getColumnWidth(column),
                        }}
                      >
                        {column.cell
                          ? column.cell(row)
                          : (row as any)[column.id]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </DragDropContext>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div
          className={cn(
            "p-2 flex items-center justify-between border-t",
            theme.pagination
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Rows per page:
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setPageIndex(0);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">
              {pageIndex * pageSize + 1}-
              {Math.min((pageIndex + 1) * pageSize, processedData.length)} of{" "}
              {processedData.length}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPageIndex(0)}
              disabled={pageIndex === 0}
              className="h-8 w-8"
            >
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
              disabled={pageIndex === 0}
              className="h-8 w-8"
            >
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setPageIndex((prev) => Math.min(pageCount - 1, prev + 1))
              }
              disabled={pageIndex >= pageCount - 1}
              className="h-8 w-8"
            >
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPageIndex(pageCount - 1)}
              disabled={pageIndex >= pageCount - 1}
              className="h-8 w-8"
            >
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
