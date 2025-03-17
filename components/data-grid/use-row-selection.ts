import { useState, useCallback } from "react";
import { RowSelectionState } from "./types";

export const useRowSelection = (enableRowSelection: boolean, onSelectionChange?: (newState: RowSelectionState) => void) => {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

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

  return {
    selectedRows,
    handleRowSelect,
  };
};