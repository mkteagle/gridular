import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ColumnDef } from "./types";
import { useTheme } from "../theme-provider/theme-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { FilterIcon } from "lucide-react";

interface FilterMenuProps {
  column: ColumnDef<any>;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  onApplyFilter: (value: string) => void;
  onClearFilter: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  isActive?: boolean;
}

export const FilterMenu = ({
  column,
  filterValue,
  setFilterValue,
  onApplyFilter,
  onClearFilter,
  isOpen,
  onOpenChange,
  trigger,
  isActive = false,
}: FilterMenuProps) => {
  const [localFilterValue, setLocalFilterValue] = useState(filterValue);
  const { theme } = useTheme();

  // Update local value when external value changes
  useEffect(() => {
    setLocalFilterValue(filterValue);
  }, [filterValue]);

  const handleApplyFilter = () => {
    setFilterValue(localFilterValue);
    onApplyFilter(localFilterValue);
    onOpenChange(false);
  };

  const handleClearFilter = () => {
    setLocalFilterValue("");
    setFilterValue("");
    onClearFilter();
    onOpenChange(false);
  };

  // Handle Enter key to apply filter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApplyFilter();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div className="relative">
          {trigger}
          {isActive && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-none absolute inline-flex h-full w-full rounded-full bg-primary"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn("p-0 w-[240px]", theme.filterMenu)}
        align="start"
      >
        <div className="flex flex-col gap-2 p-3">
          <div className="flex items-center justify-between">
            <div className={cn("text-sm font-medium", theme.filterMenuHeader)}>
              Filter {column.header}
            </div>
            {isActive && (
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary text-xs"
              >
                Active
              </Badge>
            )}
          </div>

          {isActive && (
            <div className="flex items-center bg-muted/50 text-xs rounded p-1.5 text-muted-foreground">
              <FilterIcon className="h-3 w-3 mr-1" />
              Current filter: "{filterValue}"
            </div>
          )}

          <input
            type="text"
            value={localFilterValue || ""}
            onChange={(e) => setLocalFilterValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "border rounded px-2 py-1 text-sm",
              isActive && "border-primary/50",
              theme.filterMenuInput
            )}
            placeholder="Filter value..."
            autoFocus
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={handleClearFilter}
              className={cn(
                "text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80",
                theme.filterMenuClearButton
              )}
            >
              Clear
            </button>
            <button
              onClick={handleApplyFilter}
              className={cn(
                "text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90",
                theme.filterMenuApplyButton
              )}
            >
              Apply
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
