import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ColumnDef, SortDirection } from "./types";
import { FilterMenu } from "./filter-menu";
import { useTheme } from "../theme-provider/theme-provider";
import { ChevronDown, ChevronUp, FilterIcon, GripVertical } from "lucide-react";

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
      const newWidth = Math.max(50, startWidth + deltaX); // Minimum column width of 50px
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
    e.preventDefault(); // Necessary to allow drop
    e.dataTransfer.dropEffect = "move";

    if (draggedColumn && draggedColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault(); // Helps with styling
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");

    if (sourceId && targetId && sourceId !== targetId && onColumnReorder) {
      onColumnReorder(sourceId, targetId);
    }

    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  return (
    <thead className={cn("bg-muted/50", theme.header, headerClassName)}>
      <tr>
        {columns.map((column) => {
          const isFilterActive = !!filterState[column.id];
          const isFilterMenuOpen = filterMenuOpen === column.id;
          const sortDirection =
            sortState?.column === column.id ? sortState.direction : null;
          const isDragging = draggedColumn === column.id;
          const isDragOver = dragOverColumn === column.id;
          const width = columnWidths[column.id] || column.width || 150;

          return (
            <th
              key={column.id}
              className={cn(
                "h-10 px-4 text-left align-middle font-medium text-muted-foreground relative select-none",
                theme.headerCell,
                column.headerClassName,
                isDragging && "opacity-50",
                isDragOver && "border-l-2 border-primary"
              )}
              style={{ width: width + "px", minWidth: width + "px" }}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, column.id)}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
              onDragEnd={handleDragEnd}
            >
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-1">
                  {/* Drag handle */}
                  <span
                    className="cursor-grab mr-1 opacity-0 group-hover:opacity-70 transition-opacity"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </span>

                  {/* Column header with sorting */}
                  <div
                    className={cn(
                      "flex items-center gap-1",
                      enableSorting && column.enableSorting !== false
                        ? "cursor-pointer select-none"
                        : ""
                    )}
                    onClick={() => {
                      if (enableSorting && column.enableSorting !== false) {
                        onSortChange(column.id);
                      }
                    }}
                  >
                    {column.header}
                    {enableSorting && column.enableSorting !== false && (
                      <div className="flex flex-col ml-1">
                        <ChevronUp
                          className={cn(
                            "h-2 w-2",
                            sortDirection === "asc" &&
                              sortState?.column === column.id
                              ? theme.sortIconActive
                              : theme.sortIcon
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "h-2 w-2",
                            sortDirection === "desc" &&
                              sortState?.column === column.id
                              ? theme.sortIconActive
                              : theme.sortIcon
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Filter menu */}
                {column.enableFiltering !== false && (
                  <FilterMenu
                    column={column}
                    filterValue={filterValueRefs.current[column.id] || ""}
                    setFilterValue={(value) => {
                      if (typeof value === "function") {
                        const updater = value as (prevValue: string) => string;
                        filterValueRefs.current[column.id] = updater(
                          filterValueRefs.current[column.id] || ""
                        );
                      } else {
                        filterValueRefs.current[column.id] = value;
                      }
                    }}
                    onApplyFilter={onApplyFilter}
                    onClearFilter={onClearFilter}
                    isOpen={isFilterMenuOpen}
                    onOpenChange={(open) => {
                      onFilterMenuToggle(open ? column.id : null);
                    }}
                    isActive={isFilterActive}
                    trigger={
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onFilterMenuToggle(
                            isFilterMenuOpen ? null : column.id
                          );
                        }}
                        className={cn(
                          "h-6 w-6 p-1 rounded-sm transition-colors",
                          isFilterActive
                            ? "text-primary bg-primary/10 hover:bg-primary/20"
                            : "hover:bg-accent/50"
                        )}
                      >
                        <FilterIcon
                          className={cn(
                            "h-4 w-4",
                            isFilterActive && "text-primary"
                          )}
                        />
                      </button>
                    }
                  />
                )}
              </div>

              {/* Column resize handle */}
              {column.enableResize !== false && (
                <div
                  className={cn(
                    "absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/50",
                    theme.columnResizeHandle
                  )}
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
