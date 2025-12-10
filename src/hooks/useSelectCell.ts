import { useState, useCallback } from 'react';

export interface CellPosition {
  rowId: string;
  columnId: string;
}

export function useSelectCell() {
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);

  const selectCell = useCallback((rowId: string, columnId: string) => {
    setSelectedCell({ rowId, columnId });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCell(null);
  }, []);

  const isCellSelected = useCallback(
    (rowId: string, columnId: string) => {
      return (
        selectedCell !== null &&
        selectedCell.rowId === rowId &&
        selectedCell.columnId === columnId
      );
    },
    [selectedCell]
  );

  return {
    selectedCell,
    selectCell,
    clearSelection,
    isCellSelected,
  };
}
