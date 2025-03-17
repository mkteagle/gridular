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
import { RotateCcw, Settings } from "lucide-react";

interface ColumnManagerProps<T> {
  columns: ColumnDef<T>[];
  visibleColumns: string[];
  toggleColumnVisibility: (columnId: string, visible: boolean) => void;
  resetGridPreferences: () => void;
  // New customization options
  renderTrigger?: (props: { onClick: () => void }) => React.ReactNode;
  renderResetButton?: (props: { onClick: () => void }) => React.ReactNode;
  renderColumnItem?: (props: {
    column: ColumnDef<T>;
    isVisible: boolean;
    onToggle: (checked: boolean) => void;
  }) => React.ReactNode;
  align?: "start" | "center" | "end";
  showResetButton?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  resetClassName?: string;
}

export function ColumnManager<T>({
  columns,
  visibleColumns,
  toggleColumnVisibility,
  resetGridPreferences,
  renderTrigger,
  renderResetButton,
  renderColumnItem,
  align = "end",
  showResetButton = true,
  className,
  triggerClassName,
  contentClassName,
  itemClassName,
  resetClassName,
}: ColumnManagerProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        {renderTrigger ? (
          renderTrigger({ onClick: () => {} })
        ) : (
          <Button
            variant="outline"
            size="sm"
            className={cn("ml-auto", triggerClassName)}
          >
            <Settings className="h-4 w-4 mr-2" />
            <span>Columns</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={contentClassName}>
        {columns.map((column) => {
          const isVisible = visibleColumns.includes(column.id);
          const handleToggle = (checked: boolean) =>
            toggleColumnVisibility(column.id, checked);

          return renderColumnItem ? (
            <React.Fragment key={column.id}>
              {renderColumnItem({ column, isVisible, onToggle: handleToggle })}
            </React.Fragment>
          ) : (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={isVisible}
              onCheckedChange={handleToggle}
              className={itemClassName}
            >
              {column.header}
            </DropdownMenuCheckboxItem>
          );
        })}

        {showResetButton && (
          <>
            <DropdownMenuSeparator />
            {renderResetButton ? (
              renderResetButton({ onClick: resetGridPreferences })
            ) : (
              <DropdownMenuItem
                onClick={resetGridPreferences}
                className={cn(
                  "focus:bg-destructive/10 cursor-pointer",
                  resetClassName
                )}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset all columns
              </DropdownMenuItem>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
