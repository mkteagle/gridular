import React, { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ColumnDef } from "./types";
import { useTheme } from "../theme-provider/theme-provider";

interface FilterMenuClasses {
  container?: string;
  header?: string;
  activeIndicator?: string;
  currentFilter?: string;
  input?: string;
  buttonContainer?: string;
  clearButton?: string;
  applyButton?: string;
}

interface FilterMenuRenderProps {
  renderHeader?: (column: ColumnDef<any>, isActive: boolean) => ReactNode;
  renderCurrentFilter?: (filterValue: string) => ReactNode;
  renderInput?: (props: {
    value: string;
    onChange: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    isActive: boolean;
  }) => ReactNode;
  renderButtons?: (props: {
    onClear: () => void;
    onApply: () => void;
    isActive: boolean;
  }) => ReactNode;
  renderCustomContent?: (props: {
    column: ColumnDef<any>;
    filterValue: string;
    setFilterValue: (value: string) => void;
    onApply: () => void;
    onClear: () => void;
    isActive: boolean;
  }) => ReactNode;
}

interface FilterMenuProps extends FilterMenuRenderProps {
  column: ColumnDef<any>;
  filterValue: string;
  setFilterValue: (value: string) => void;
  onApplyFilter: (value: string) => void;
  onClearFilter: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  isActive?: boolean;
  classes?: FilterMenuClasses;
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
  classes = {},
  renderHeader,
  renderCurrentFilter,
  renderInput,
  renderButtons,
  renderCustomContent,
}: FilterMenuProps) => {
  const [localFilterValue, setLocalFilterValue] = useState(filterValue);
  const { theme } = useTheme();

  // Reset local state when external value changes
  useEffect(() => {
    setLocalFilterValue(filterValue);
  }, [filterValue]);

  // Update local state when menu opens with current filter value
  useEffect(() => {
    if (isOpen) {
      setLocalFilterValue(filterValue);
    }
  }, [isOpen, filterValue]);

  const handleApplyFilter = () => {
    // Update the parent's filter value ref for this column
    setFilterValue(localFilterValue);
    // Apply the filter (this will update the filter state)
    onApplyFilter(localFilterValue);
    // Close the menu
    onOpenChange(false);
  };
  const handleClearFilter = () => {
    setLocalFilterValue("");
    onClearFilter();
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApplyFilter();
    } else if (e.key === "Escape") {
      onOpenChange(false);
    }
  };

  // If not open, just render the trigger
  if (!isOpen) {
    return (
      <div className="relative">
        <div onClick={() => onOpenChange(true)}>{trigger}</div>
        {isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full text-[10px] flex items-center justify-center text-primary-foreground">
            •
          </div>
        )}
      </div>
    );
  }

  // If we have custom content, render that
  if (renderCustomContent) {
    return (
      <div
        className={cn(
          "absolute z-50 mt-1 min-w-[200px]",
          theme.classes.filterMenu,
          classes.container
        )}
      >
        {renderCustomContent({
          column,
          filterValue: localFilterValue,
          setFilterValue: setLocalFilterValue,
          onApply: handleApplyFilter,
          onClear: handleClearFilter,
          isActive,
        })}
      </div>
    );
  }

  // Otherwise render the default filter menu
  return (
    <div
      className={cn(
        "absolute z-50 mt-1 min-w-[200px]",
        theme.classes.filterMenu,
        classes.container
      )}
    >
      <div className={cn("p-3", theme.classes.filterMenuContent)}>
        {/* Header */}
        <div
          className={cn(
            "font-medium mb-2",
            theme.classes.filterMenuHeader,
            classes.header
          )}
        >
          {renderHeader ? (
            renderHeader(column, isActive)
          ) : (
            <div className="flex items-center justify-between">
              <span>Filter: {column.header}</span>
              {isActive && (
                <span
                  className={cn(
                    "ml-2 text-xs px-1 rounded bg-primary/20 text-primary",
                    classes.activeIndicator
                  )}
                >
                  Active
                </span>
              )}
            </div>
          )}
        </div>

        {/* Current filter display */}
        {isActive && filterValue && (
          <div className="mb-2">
            {renderCurrentFilter ? (
              renderCurrentFilter(filterValue)
            ) : (
              <div
                className={cn(
                  "text-xs bg-muted p-1 rounded",
                  classes.currentFilter
                )}
              >
                Current filter: <strong>{filterValue}</strong>
              </div>
            )}
          </div>
        )}

        {/* Input */}
        {renderInput ? (
          renderInput({
            value: localFilterValue,
            onChange: setLocalFilterValue,
            onKeyDown: handleKeyDown,
            isActive,
          })
        ) : (
          <input
            type="text"
            value={localFilterValue}
            onChange={(e) => setLocalFilterValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full p-2 border rounded-md",
              theme.classes.filterMenuInput,
              classes.input
            )}
            placeholder="Filter value..."
            autoFocus
          />
        )}

        {/* Buttons */}
        {renderButtons ? (
          renderButtons({
            onClear: handleClearFilter,
            onApply: handleApplyFilter,
            isActive,
          })
        ) : (
          <div
            className={cn(
              "flex justify-between mt-2 gap-2",
              classes.buttonContainer
            )}
          >
            <button
              onClick={handleClearFilter}
              className={cn(
                "px-3 py-1 text-sm rounded-md border",
                theme.classes.filterMenuClearButton,
                classes.clearButton
              )}
            >
              Clear
            </button>
            <button
              onClick={handleApplyFilter}
              className={cn(
                "px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md",
                theme.classes.filterMenuApplyButton,
                classes.applyButton
              )}
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
