import { useMemo } from 'react';
import { GroupingState } from '../types';

export interface GroupRow {
  isGroupRow: true;
  groupKey: string;
  groupValue: any;
  columnId: string;
  depth: number;
  count: number;
  children: any[];
}

export function useDataGrouping<T>(
  data: T[],
  groupingState: GroupingState,
  _idAccessor: (row: T) => string
) {
  const { groupByColumns, expandedGroups } = groupingState;

  const groupedData = useMemo(() => {
    if (!groupByColumns.length) return { rows: data, flattenedRows: data };

    const createGroupingStructure = (
      rows: T[],
      groupBy: string[],
      depth = 0
    ): (T | GroupRow)[] => {
      if (depth >= groupBy.length || groupBy.length === 0) {
        return rows;
      }

      const columnId = groupBy[depth];
      const groupMap = new Map<any, T[]>();

      // Group the rows by the current column value
      for (const row of rows) {
        const value = (row as any)[columnId];
        if (!groupMap.has(value)) {
          groupMap.set(value, []);
        }
        groupMap.get(value)!.push(row);
      }

      // Create group rows and recursively group their children
      const result: (T | GroupRow)[] = [];
      for (const [value, groupRows] of groupMap.entries()) {
        const groupKey = `${columnId}:${value}:${depth}`;

        // Create a group row
        const groupRow: GroupRow = {
          isGroupRow: true,
          groupKey,
          groupValue: value,
          columnId,
          depth,
          count: groupRows.length,
          children: createGroupingStructure(groupRows, groupBy, depth + 1),
        };

        result.push(groupRow);
      }

      return result;
    };

    const groupedRows = createGroupingStructure(data, groupByColumns);

    // Flatten rows for rendering based on expanded state
    const flattenRows = (
      rows: (T | GroupRow)[],
      result: any[] = [],
      parentGroupKeys: string[] = []
    ) => {
      for (const row of rows) {
        if ((row as GroupRow).isGroupRow) {
          const groupRow = row as GroupRow;
          result.push(groupRow);

          // Only include children if the group is expanded
          if (expandedGroups[groupRow.groupKey]) {
            flattenRows(groupRow.children, result, [
              ...parentGroupKeys,
              groupRow.groupKey,
            ]);
          }
        } else {
          // Regular row, add group keys as metadata
          const rowWithGroupInfo = {
            ...row,
            _groupParentKeys: parentGroupKeys,
          };
          result.push(rowWithGroupInfo);
        }
      }
      return result;
    };

    const flattenedRows = flattenRows(groupedRows);

    return { rows: groupedRows, flattenedRows };
  }, [data, groupByColumns, expandedGroups]);

  return groupedData;
}
