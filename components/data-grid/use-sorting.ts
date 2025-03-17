import { useCallback, useState } from "react";
import { SortDirection } from "./types";

export const useSorting = () => {
  const [sortState, setSortState] = useState<{
    column: string;
    direction: SortDirection;
  } | null>(null);

  const handleSort = useCallback((columnId: string) => {
    setSortState((prev) => {
      const newState =
        !prev || prev.column !== columnId
          ? { column: columnId, direction: "asc" as SortDirection }
          : prev.direction === "asc"
          ? { column: columnId, direction: "desc" as SortDirection }
          : null;

      return newState;
    });
  }, []);

  return { sortState, handleSort };
};
