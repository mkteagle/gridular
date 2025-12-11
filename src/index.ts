// Main DataGrid component with all features
export { DataGrid, default } from './DataGrid';

// Components
export { Pagination } from './Pagination';
export { ColumnManager } from './components/ColumnManager';
export { GroupManager } from './components/GroupManager';
export { ExpandableGridRow, BaseExpandableRow } from './components/ExpandableGridRow';
export type { ExpandableGridRowProps } from './components/ExpandableGridRow';
export { DataGridRow, BaseDataGridRow } from './components/DataGridRow';
export type { DataGridRowProps } from './components/DataGridRow';

// Hooks
export { useSelectCell } from './hooks/useSelectCell';
export type { CellPosition } from './hooks/useSelectCell';
export { useGridPersistence } from './hooks/useGridPersistence';
export { useDataGrouping } from './hooks/useDataGrouping';
export type { GroupRow } from './hooks/useDataGrouping';

// Types
export type {
  ColumnDef,
  SortDirection,
  SortState,
  FilterState,
  RowSelectionState,
  PaginationState,
  GroupingState,
  GridClasses,
  GroupRowRenderProps,
  GridPreferences,
  VirtualizedGridProps as DataGridProps,
} from './types';

// Utilities
export { cn, mergeStyles, tssToInlineStyles, spacing } from './lib/utils';
