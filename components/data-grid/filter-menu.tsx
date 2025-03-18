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
  totalColumns?: number;
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
  totalColumns = 1,
}: FilterMenuProps) => {
  const { theme } = useTheme();
  const [localFilterValue, setLocalFilterValue] = useState(filterValue);
  const menuRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalFilterValue(filterValue);
  }, [filterValue]);

  useEffect(() => {
    if (isOpen) {
      setLocalFilterValue(filterValue);
    }
  }, [isOpen, filterValue]);

  const handleApplyFilter = () => {
    setFilterValue(localFilterValue);
    onApplyFilter(localFilterValue);
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

  const menuContent = (
    <div className={cn("p-3", theme.classes.filterMenuContent)}>
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
  );

  if (renderCustomContent) {
    return (
      <>
        <div>{trigger}</div>
        <div
          ref={menuRef}
          className={cn(
            "absolute top-full left-0 z-50 mt-1 min-w-[200px] bg-popover border rounded-md shadow-md",
            theme.classes.filterMenu,
            classes.container,
            column.index === totalColumns - 1 && "right-0 left-auto"
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
      </>
    );
  }

  return (
    <>
      <div>{trigger}</div>
      <div
        ref={menuRef}
        className={cn(
          "absolute top-full left-0 z-50 mt-1 min-w-[200px] bg-popover border rounded-md shadow-md",
          theme.classes.filterMenu,
          classes.container,
          column.index === totalColumns - 1 && "right-0 left-auto"
        )}
      >
        {menuContent}
      </div>
    </>
  );
};
