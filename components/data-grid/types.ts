import { ReactNode } from "react";

export type SortDirection = "asc" | "desc" | null;

export interface ColumnDef<T> {
  id: string;
  header: string;
  width?: number;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableResize?: boolean;
  filterFn?: (row: T, columnId: string, filterValue: string) => boolean;
  sortFn?: (a: T, b: T, columnId: string) => number;
  headerClassName?: string;
  cellClassName?: string;
  filterMenuPosition?: { top: number; left: number };
  cell?: (row: T) => React.ReactNode;
  index: number;
  groupFormatter?: (value: any) => string;
  enableGrouping?: boolean;
}

export type FilterValue = string | null;

export interface ColumnResizeState {
  [key: string]: number;
}

export type RowSelectionState = Record<string, boolean>;

export interface ThemeProviderContextType {
  container: string;
  header: string;
  headerCell: string;
  row: string;
  cell: string;
  pagination: string;
  filterMenu: string;
  filterMenuContent: string;
  filterMenuHeader: string;
  filterMenuInput: string;
  filterMenuClearButton: string;
  filterMenuApplyButton: string;
  columnResizeHandle: string;
  columnResizeHandleActive: string;
  sortIcon: string;
  sortIconActive: string;
  [key: string]: string;
}

export interface DataGridRenderProps<T> {
  filterState: Record<string, string>;
  sortState?: SortState | null;
  selectedRows: Record<string, boolean>;
  data: T[];
  visibleColumns: string[];
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  isLoading: boolean;
}

export interface DataGridClasses {
  container?: string;
  header?: string;
  headerCell?: string;
  row?: string;
  cell?: string;
  selectedRow?: string;
  pagination?: string;
  emptyState?: string;
  loadingState?: string;
  columnManager?: string;
}

export interface SortState {
  column: string;
  direction: "asc" | "desc";
}

export interface GroupingState {
  groupByColumns: string[];
  expandedGroups: Record<string, boolean>;
}

// Add grouping to GridPreferences
export interface GridPreferences {
  columnWidths: Record<string, number>;
  columnOrder: string[];
  hiddenColumns: string[];
  groupByColumns: string[]; // Add this
  expandedGroups: Record<string, boolean>; // Add this
}

export interface DataGridProps<T> {
  // Data props
  columns: ColumnDef<T>[];
  data: T[];

  // State props
  sortState?: SortState | null;
  onSortChange?: (sortState: SortState | null) => void;
  filterState?: Record<string, string>;
  onFilterChange?: (filterState: Record<string, string>) => void;
  selectedRows?: Record<string, boolean>;
  onRowSelectionChange?: (selectedRows: Record<string, boolean>) => void;
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onRowClick?: (row: T) => void;

  // Feature flags
  enableFiltering?: boolean;
  enableSorting?: boolean;
  enableColumnResize?: boolean;
  enableRowSelection?: boolean;
  enablePagination?: boolean;
  hideGroupControls?: boolean;
  hideColumnManager?: boolean;

  // Configuration props
  pageSizeOptions?: number[];
  emptyMessage?: string;
  loadingMessage?: string;
  isLoading?: boolean;
  gridId?: string;
  totalRows: number;

  // Styling props
  classes?: {
    container?: string;
    columnManager?: string;
    header?: string;
    row?: string;
    cell?: string;
    selectedRow?: string;
    pagination?: string;
    emptyState?: string;
    loadingState?: string;
    toolbar?: string;
    loadingContainer?: string;
    emptyContainer?: string;
    errorContainer?: string;
  };
  className?: string;

  // Render customization props
  renderCell?: (props: {
    value: any;
    row: T;
    column: ColumnDef<T>;
  }) => React.ReactNode;
  renderHeader?: (props: {
    column: ColumnDef<T>;
    sortDirection?: SortDirection;
  }) => React.ReactNode;
  renderSortIcon?: (props: {
    isSorted: boolean;
    sortDirection?: SortDirection;
  }) => React.ReactNode;
  renderFilterIcon?: (props: { isFiltered: boolean }) => React.ReactNode;
  sortIconVariant?: "arrows" | "chevrons";

  // Render function
  children?: (props: DataGridRenderProps<T>) => React.ReactNode;
  filterMenu?: React.ReactNode;

  // Grouping props
  groupingState?: GroupingState;
  onGroupingChange?: (groupingState: GroupingState) => void;
  enableGrouping?: boolean;
  defaultGroupTemplate?: string;
  renderGroupRow?: (props: GroupRowRenderProps) => React.ReactNode;
  groupExpandIcon?: React.ReactNode;
  groupCollapseIcon?: React.ReactNode;
}

export interface FilterMenuCustomization {
  classes?: {
    container?: string;
    header?: string;
    activeIndicator?: string;
    currentFilter?: string;
    input?: string;
    buttonContainer?: string;
    clearButton?: string;
    applyButton?: string;
  };
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

export interface GroupRowRenderProps {
  groupKey: string;
  columnId: string;
  value: any;
  depth: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  count: number;
}
