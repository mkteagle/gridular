import React from "react";
import { cn } from "@/lib/utils";
import { ColumnDef } from "./types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Layers, X } from "lucide-react";

interface GroupManagerProps<T> {
  columns: ColumnDef<T>[];
  groupByColumns: string[];
  updateGroupByColumns: (groupByColumns: string[]) => void;
  removeGroupByColumn: (columnId: string) => void;
  clearGrouping: () => void;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  activeGroupsClassName?: string;
  renderTrigger?: (props: { onClick: () => void }) => React.ReactNode;
  renderActiveGroup?: (props: {
    column: ColumnDef<T>;
    onRemove: () => void;
  }) => React.ReactNode;
  align?: "start" | "center" | "end";
}

export function GroupManager<T>({
  columns,
  groupByColumns,
  updateGroupByColumns,
  removeGroupByColumn,
  clearGrouping,
  className,
  triggerClassName,
  contentClassName,
  itemClassName,
  activeGroupsClassName,
  renderTrigger,
  renderActiveGroup,
  align = "end",
}: GroupManagerProps<T>) {
  // Filter columns to only show those with grouping enabled
  const groupableColumns = columns.filter(
    (col) => col.enableGrouping !== false
  );

  // Helper to toggle column grouping
  const toggleColumnGrouping = (columnId: string) => {
    if (groupByColumns.includes(columnId)) {
      updateGroupByColumns(groupByColumns.filter((id) => id !== columnId));
    } else {
      updateGroupByColumns([...groupByColumns, columnId]);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Active groups display */}
      {groupByColumns.length > 0 && (
        <div className={cn("flex flex-wrap gap-1 mb-2", activeGroupsClassName)}>
          {groupByColumns.map((columnId) => {
            const column = columns.find((col) => col.id === columnId);
            if (!column) return null;

            return renderActiveGroup ? (
              <React.Fragment key={columnId}>
                {renderActiveGroup({
                  column,
                  onRemove: () => removeGroupByColumn(columnId),
                })}
              </React.Fragment>
            ) : (
              <div
                key={columnId}
                className="bg-primary/10 rounded-md px-2 py-1 text-xs flex items-center"
              >
                <span className="mr-1">{column.header}</span>
                <button
                  onClick={() => removeGroupByColumn(columnId)}
                  className="hover:text-destructive focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}

          <Button
            variant="ghost"
            size="sm"
            onClick={clearGrouping}
            className="text-xs h-6"
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Group by dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className={className}>
          {renderTrigger ? (
            renderTrigger({ onClick: () => {} })
          ) : (
            <Button
              variant="outline"
              size="sm"
              className={cn(triggerClassName)}
            >
              <Layers className="h-4 w-4 mr-2" />
              <span>Group by</span>
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} className={contentClassName}>
          {groupableColumns.length > 0 ? (
            groupableColumns.map((column) => {
              const isGrouped = groupByColumns.includes(column.id);

              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={isGrouped}
                  onCheckedChange={() => toggleColumnGrouping(column.id)}
                  className={itemClassName}
                >
                  {column.header}
                </DropdownMenuCheckboxItem>
              );
            })
          ) : (
            <DropdownMenuItem disabled>No groupable columns</DropdownMenuItem>
          )}

          {groupByColumns.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={clearGrouping}>
                Clear all groups
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
