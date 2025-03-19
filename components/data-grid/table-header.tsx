import React, { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ColumnDef, SortDirection, FilterMenuCustomization } from "./types";
import { FilterMenu } from "./filter-menu";
import { useTheme } from "../theme-provider/theme-provider";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";

export interface TableHeaderProps<T> {
  columns: ColumnDef<T>[];
  sortState: { column: string; direction: "asc" | "desc" } | null;
  onSortChange: (columnId: string) => void;
  enableSorting: boolean;
  filterState: Record<string, string>;
  filterMenuOpen: string | null;
  onFilterMenuToggle: (columnId: string | null) => void;
  columnWidths: Record<string, number>;
  onColumnResize: (columnId: string, width: number) => void;
  headerClassName?: string;
  filterValueRefs: React.MutableRefObject<Record<string, string>>;
  onApplyFilter: (value: string) => void;
  onClearFilter: () => void;
  onColumnReorder: (draggedId: string, targetId: string) => void;
  renderHeader?: (
    column: ColumnDef<T>,
    sortDirection: SortDirection
  ) => ReactNode;
  renderSortIcon?: (
    column: ColumnDef<T>,
    sortDirection: SortDirection
  ) => ReactNode;
  renderFilterIcon?: (column: ColumnDef<T>, isActive: boolean) => ReactNode;
  sortIconVariant?: "arrows" | "chevrons" | "none";
  filterMenu?: FilterMenuCustomization;
  filterMenuRef: React.RefObject<HTMLDivElement | null>;
}

export function TableHeader<T>({
  columns,
  sortState,
  onSortChange,
  enableSorting,
  filterState,
  filterMenuOpen,
  onFilterMenuToggle,
  columnWidths,
  onColumnResize,
  headerClassName,
  filterValueRefs,
  onApplyFilter,
  onClearFilter,
  onColumnReorder,
  renderHeader = undefined,
  renderSortIcon,
  renderFilterIcon,
  sortIconVariant = "arrows",
  filterMenu,
  filterMenuRef,
}: TableHeaderProps<T>) {
  const { theme } = useTheme();
  // State for drag handling
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  // Column resizing
  const handleColumnResizeStart = (columnId: string, e: React.MouseEvent) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = columnWidths[columnId] || 150;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(50, startWidth + deltaX);
      onColumnResize(columnId, newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Column dragging/reordering
  const handleDragStart = (e: React.DragEvent, columnId: string) => {
    e.dataTransfer.setData("text/plain", columnId);
    e.dataTransfer.effectAllowed = "move";
    setDraggedColumn(columnId);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (draggedColumn && draggedColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");

    if (sourceId && targetId && sourceId !== targetId) {
      onColumnReorder(sourceId, targetId);
    }

    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  // Default sort icon renderer based on variant
  const defaultSortIcon = (
    column: ColumnDef<T>,
    sortDirection: SortDirection
  ) => {
    if (!sortDirection) return null;

    if (sortIconVariant === "none") return null;

    if (sortIconVariant === "chevrons") {
      return sortDirection === "asc" ? (
        <ChevronUp className="ml-2 h-4 w-4 text-primary" />
      ) : (
        <ChevronDown className="ml-2 h-4 w-4 text-primary" />
      );
    }

    // Default "arrows"
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4 text-primary" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 text-primary" />
    );
  };

  // Default filter icon renderer
  const defaultFilterIcon = (column: ColumnDef<T>, isActive: boolean) => {
    return (
      <Filter
        className={cn(
          "h-4 w-4 ml-1",
          isActive ? theme.classes.sortIconActive : theme.classes.sortIcon
        )}
      />
    );
  };

  console.info(!!renderSortIcon);
  return (
    <thead>
      <tr className={cn(theme.classes.header, headerClassName)}>
        {columns.map((column, index) => {
          column = { ...column, index };
          // Get sort direction for this column
          const sortDirection =
            sortState && sortState.column === column.id
              ? sortState.direction
              : null;

          // Check if this column has an active filter
          const hasActiveFilter = !!filterState?.[column.id];

          // Get column width
          const width = columnWidths[column.id] || column.width || 150;

          return (
            <th
              key={column.id}
              className={cn(
                theme.classes.headerCell,
                column.headerClassName,
                dragOverColumn === column.id && "bg-primary/10"
              )}
              style={{
                width: `${width}px`,
                minWidth: `${width}px`,
                maxWidth: `${width}px`,
                position: "relative",
              }}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, column.id)}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
              onDragEnd={handleDragEnd}
              role="columnheader"
              aria-label={column.header}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "cursor-pointer flex items-center",
                    enableSorting &&
                      column.enableSorting !== false &&
                      "hover:text-foreground"
                  )}
                  onClick={() => {
                    if (enableSorting && column.enableSorting !== false) {
                      onSortChange(column.id);
                    }
                  }}
                >
                  {renderHeader ? (
                    renderHeader(column, sortDirection)
                  ) : (
                    <>
                      <span>{column.header}</span>
                      {enableSorting && column.enableSorting !== false && (
                        <>
                          {sortDirection && (
                            <span className="inline-flex ml-1" role="img">
                              {renderSortIcon
                                ? renderSortIcon(column, sortDirection)
                                : defaultSortIcon(column, sortDirection)}
                            </span>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>

                {column.enableFiltering !== false && (
                  <div
                    className="flex items-center"
                    ref={filterMenuOpen === column.id ? filterMenuRef : null}
                  >
                    <FilterMenu
                      column={{ ...column, index }}
                      totalColumns={columns.length}
                      filterValue={filterValueRefs.current[column.id] || ""}
                      setFilterValue={(value) => {
                        filterValueRefs.current[column.id] = value;
                      }}
                      onApplyFilter={onApplyFilter}
                      onClearFilter={onClearFilter}
                      isOpen={filterMenuOpen === column.id}
                      onOpenChange={(open) => {
                        onFilterMenuToggle(open ? column.id : null);
                      }}
                      isActive={hasActiveFilter}
                      trigger={
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onFilterMenuToggle(
                              filterMenuOpen === column.id ? null : column.id
                            );
                          }}
                          className="focus:outline-none"
                        >
                          {renderFilterIcon
                            ? renderFilterIcon(column, hasActiveFilter)
                            : defaultFilterIcon(column, hasActiveFilter)}
                        </button>
                      }
                      {...filterMenu}
                    />
                  </div>
                )}
              </div>

              {/* Column resize handle */}
              {column.enableResize !== false && (
                <div
                  className={cn(theme.classes.columnResizeHandle)}
                  onMouseDown={(e) => handleColumnResizeStart(column.id, e)}
                />
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
