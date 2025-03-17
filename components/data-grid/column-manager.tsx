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
}

export function ColumnManager<T>({
  columns,
  visibleColumns,
  toggleColumnVisibility,
  resetGridPreferences,
}: ColumnManagerProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <Settings className="h-4 w-4 mr-2" />
          <span>Columns</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={visibleColumns.includes(column.id)}
            onCheckedChange={(checked) =>
              toggleColumnVisibility(column.id, checked)
            }
          >
            {column.header}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={resetGridPreferences}
          className="focus:bg-destructive/10 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset all columns
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
