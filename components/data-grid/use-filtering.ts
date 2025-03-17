import { useState, useCallback, useEffect, useMemo } from "react";
import { ColumnDef } from "./types";

export function useFiltering<T>(
  columns: ColumnDef<T>[],
  filterValueRefs: React.MutableRefObject<Record<string, string>>,
  onFilterChange?: (filters: Record<string, string>) => void
) {
  const [filterState, setFilterState] = useState<Record<string, string>>({});

  // Apply a filter for a column
  const applyFilter = useCallback(
    (columnId: string, value: string) => {
      setFilterState((prev) => {
        // Only update if the value has changed
        if (prev[columnId] === value) return prev;

        const newFilterState = { ...prev };

        if (value) {
          // Add or update the filter
          newFilterState[columnId] = value;
        } else if (columnId in newFilterState) {
          // Remove the filter if value is empty
          delete newFilterState[columnId];
        }

        return newFilterState;
      });

      // Update the ref to keep it in sync
      if (value) {
        filterValueRefs.current[columnId] = value;
      } else {
        delete filterValueRefs.current[columnId];
      }
    },
    [filterValueRefs]
  );

  // Clear a filter for a column
  const clearFilter = useCallback(
    (columnId: string) => {
      setFilterState((prev) => {
        if (!(columnId in prev)) return prev;

        const newFilterState = { ...prev };
        delete newFilterState[columnId];
        return newFilterState;
      });

      // Clear value in ref
      delete filterValueRefs.current[columnId];
    },
    [filterValueRefs]
  );

  // Filter the data based on filterState
  const filterData = useCallback(
    (data: T[]) => {
      if (Object.keys(filterState).length === 0) {
        return data;
      }

      return data.filter((row) => {
        return Object.entries(filterState).every(([columnId, filterValue]) => {
          const column = columns.find((col) => col.id === columnId);
          if (!column) return true;

          // Use custom filtering function if provided
          if (column.filterFn) {
            return column.filterFn(row, columnId, filterValue);
          }

          // Default filtering: string includes search
          const cellValue = (row as any)[columnId];
          const stringValue = String(cellValue || "").toLowerCase();
          return stringValue.includes(filterValue.toLowerCase());
        });
      });
    },
    [columns, filterState]
  );

  // Call the onFilterChange callback when filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filterState);
    }
  }, [filterState, onFilterChange]);

  // Initialize the filterValueRefs from filterState
  useEffect(() => {
    Object.entries(filterState).forEach(([columnId, value]) => {
      filterValueRefs.current[columnId] = value;
    });
  }, []);

  return {
    filterState,
    applyFilter,
    clearFilter,
    filterData,
  };
}
