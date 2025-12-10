import { ReactNode } from 'react';
import type { CSSObject } from 'tss-react';

export type SortDirection = 'asc' | 'desc' | null;

export interface ColumnDef<T = any> {
  id: string;
  header: string;
  key: string;
  width?: number;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableResize?: boolean;
  enableGrouping?: boolean;
  enableColumnMenu?: boolean; // Enable overflow menu for this column
  filterFn?: (row: T, columnId: string, filterValue: string) => boolean;
  sortFn?: (a: T, b: T, columnId: string) => number;

  // Styling - supports both Tailwind and TSS-React
  headerClassName?: string;
  cellClassName?: string;
  headerStyle?: CSSObject;
  cellStyle?: CSSObject;

  // Rendering
  renderCell?: (row: T) => ReactNode;
  cell?: (row: T) => ReactNode;
  render?: (row: T) => ReactNode;
  groupFormatter?: (value: any) => string;

  // Custom filter UI
  renderFilterMenu?: (props: FilterMenuRenderProps<T>) => ReactNode;

  // Custom column menu items
  columnMenuItems?: ColumnMenuItem[];

  // Custom column menu rendering
  renderColumnMenu?: (props: ColumnMenuRenderProps<T>) => ReactNode;

  // Internal
  index?: number;
}

export interface FilterMenuRenderProps<T = any> {
  column: ColumnDef<T>;
  filterValue: string;
  onFilterChange: (value: string) => void;
  onClose: () => void;
  isFiltered: boolean;
}

export interface ColumnMenuItem {
  id: string;
  label: string | ReactNode;
  icon?: ReactNode;
  onClick: (columnId: string) => void;
  disabled?: boolean;
  danger?: boolean;
  // Advanced customization
  className?: string;
  shortcut?: string; // Keyboard shortcut display
  subMenu?: ColumnMenuItem[]; // Nested menu items
  separator?: boolean; // Add separator before this item
  render?: (props: ColumnMenuItemRenderProps) => ReactNode; // Full custom render
}

export interface ColumnMenuItemRenderProps {
  item: ColumnMenuItem;
  columnId: string;
  isDisabled: boolean;
  onSelect: () => void;
}

export interface ColumnMenuRenderProps<T = any> {
  column: ColumnDef<T>;
  items: ColumnMenuItem[];
  defaultItems: {
    filter?: ReactNode;
    hideColumn?: ReactNode;
  };
  onClose: () => void;
}

export interface SortState {
  column: string;
  direction: 'asc' | 'desc';
}

export interface FilterState {
  [columnId: string]: string;
}

export interface RowSelectionState {
  [rowId: string]: boolean;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface GroupingState {
  groupByColumns: string[];
  expandedGroups: Record<string, boolean>;
}

/**
 * Class overrides for grid styling
 * Supports both Tailwind classes (string) and TSS-React objects
 */
export interface GridClasses {
  // Container
  container?: string;
  containerStyle?: CSSObject;

  // Header
  header?: string;
  headerStyle?: CSSObject;
  headerCell?: string;
  headerCellStyle?: CSSObject;

  // Body & Rows
  body?: string;
  bodyStyle?: CSSObject;
  row?: string;
  rowStyle?: CSSObject;
  selectedRow?: string;
  selectedRowStyle?: CSSObject;
  hoveredRow?: string;
  hoveredRowStyle?: CSSObject;

  // Cells
  cell?: string;
  cellStyle?: CSSObject;
  selectedCell?: string;
  selectedCellStyle?: CSSObject;

  // Pagination
  pagination?: string;
  paginationStyle?: CSSObject;
  paginationButton?: string;
  paginationButtonStyle?: CSSObject;
  pageInfo?: string;
  pageInfoStyle?: CSSObject;

  // States
  emptyState?: string;
  emptyStateStyle?: CSSObject;
  loadingState?: string;
  loadingStateStyle?: CSSObject;

  // Controls
  toolbar?: string;
  toolbarStyle?: CSSObject;
  columnManager?: string;
  columnManagerStyle?: CSSObject;
  columnManagerTrigger?: string;
  columnManagerTriggerStyle?: CSSObject;
  columnManagerContent?: string;
  columnManagerContentStyle?: CSSObject;
  columnManagerItem?: string;
  columnManagerItemStyle?: CSSObject;
  groupManager?: string;
  groupManagerStyle?: CSSObject;
  groupManagerTrigger?: string;
  groupManagerTriggerStyle?: CSSObject;
  groupManagerContent?: string;
  groupManagerContentStyle?: CSSObject;
  groupManagerItem?: string;
  groupManagerItemStyle?: CSSObject;
  filterMenu?: string;
  filterMenuStyle?: CSSObject;
  filterMenuHeader?: string;
  filterMenuHeaderStyle?: CSSObject;
  filterMenuInput?: string;
  filterMenuInputStyle?: CSSObject;
  filterMenuActions?: string;
  filterMenuActionsStyle?: CSSObject;
  columnMenu?: string;
  columnMenuStyle?: CSSObject;
  columnMenuTrigger?: string;
  columnMenuTriggerStyle?: CSSObject;
  columnMenuItem?: string;
  columnMenuItemStyle?: CSSObject;

  // Resize handle
  resizeHandle?: string;
  resizeHandleStyle?: CSSObject;
  resizeHandleActive?: string;
  resizeHandleActiveStyle?: CSSObject;

  // Sort & Filter icons
  sortIcon?: string;
  sortIconStyle?: CSSObject;
  sortIconActive?: string;
  sortIconActiveStyle?: CSSObject;
  filterIcon?: string;
  filterIconStyle?: CSSObject;
  filterIconActive?: string;
  filterIconActiveStyle?: CSSObject;
}

export interface VirtualizedGridProps<T = any> {
  // Required Data
  columns: ColumnDef<T>[];
  data: T[];

  // Pagination - if provided, enables pagination mode
  // Auto-virtualizes if total rows exceed virtualizationThreshold
  pagination?: {
    pageIndex: number;
    pageSize: number;
    totalRows: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    pageSizeOptions?: number[];
    // If true, assumes data prop contains only the current page's data
    // If false (default), will slice the data array based on pageIndex/pageSize
    manualPagination?: boolean;
  };

  // Virtualization
  virtualizationThreshold?: number; // Default: 20 (auto-enable virtualization past this many rows)
  rowHeight?: number; // Default: 72
  overscan?: number; // Default: 5

  // Sorting
  sortState?: SortState | null;
  onSortChange?: (sortState: SortState | null) => void;
  enableSorting?: boolean; // Default: false
  sortIconVariant?: 'arrows' | 'chevrons'; // Default: 'arrows'

  // Filtering
  filterState?: FilterState;
  onFilterChange?: (filterState: FilterState) => void;
  enableFiltering?: boolean; // Default: false
  renderFilterMenu?: (props: FilterMenuRenderProps) => ReactNode; // Custom filter menu renderer

  // Row Selection
  selectedRows?: RowSelectionState;
  onRowSelectionChange?: (selectedRows: RowSelectionState) => void;
  enableRowSelection?: boolean; // Default: false

  // Cell Selection
  enableCellSelection?: boolean; // Default: false
  selectedCell?: { rowId: string; columnId: string } | null;
  onCellSelect?: (rowId: string, columnId: string) => void;

  // Column Resize
  enableColumnResize?: boolean; // Default: false
  columnWidths?: Record<string, number>;
  onColumnWidthsChange?: (widths: Record<string, number>) => void;

  // Column Reorder
  enableColumnReorder?: boolean; // Default: false
  columnOrder?: string[];
  onColumnOrderChange?: (order: string[]) => void;

  // Column Menu
  enableColumnMenu?: boolean; // Default: false - enables overflow menu on columns
  defaultColumnMenuItems?: ColumnMenuItem[]; // Default menu items for all columns
  onColumnAction?: (action: string, columnId: string) => void; // Callback for column actions
  renderColumnMenu?: (props: ColumnMenuRenderProps) => ReactNode; // Custom column menu renderer
  renderColumnMenuTrigger?: (props: { column: ColumnDef; onClick: () => void }) => ReactNode; // Custom trigger button

  // Grouping
  enableGrouping?: boolean; // Default: false
  groupingState?: GroupingState;
  onGroupingChange?: (groupingState: GroupingState) => void;
  renderGroupRow?: (props: GroupRowRenderProps) => ReactNode;

  // Expandable Rows
  enableExpandableRows?: boolean; // Default: false
  expandedRows?: Record<string, boolean>;
  onExpandedRowsChange?: (expandedRows: Record<string, boolean>) => void;
  renderExpandedRow?: (row: T) => ReactNode;

  // UI State
  isLoading?: boolean;
  emptyMessage?: string; // Default: "No data available"
  loadingMessage?: string; // Default: "Loading..."

  // Styling - Tailwind classes
  className?: string;
  classes?: GridClasses;

  // Custom Rendering
  renderCell?: (props: { value: any; row: T; column: ColumnDef<T>; rowIndex: number }) => ReactNode;
  renderRow?: (props: { row: T; rowIndex: number; cells: ReactNode[]; defaultRow: ReactNode }) => ReactNode;
  renderHeaderCell?: (props: { column: ColumnDef<T>; columnIndex: number; sortDirection?: SortDirection; defaultHeader: ReactNode }) => ReactNode;
  renderHeader?: (props: { column: ColumnDef<T>; sortDirection?: SortDirection }) => ReactNode;
  renderSortIcon?: (props: { isSorted: boolean; sortDirection?: SortDirection }) => ReactNode;
  renderFilterIcon?: (props: { isFiltered: boolean }) => ReactNode;

  // Callbacks
  onRowClick?: (row: T, index: number, event: React.MouseEvent<HTMLDivElement>) => void;
  onRowMouseDown?: (row: T, index: number, event: React.MouseEvent<HTMLDivElement>) => void;
  onRowMouseEnter?: (row: T, index: number, event: React.MouseEvent<HTMLDivElement>) => void;
  getRowId?: (row: T) => string;
  onScroll?: (event: { scrollTop: number; scrollHeight: number; clientHeight: number; scrollPercentage: number }) => void;

  // Context Menu
  contextMenuContent?: (row: T, column: ColumnDef<T>) => ReactNode;

  // Advanced
  gridId?: string; // For persistence
  hideColumnManager?: boolean;
  hideGroupControls?: boolean;
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

export interface GridPreferences {
  columnWidths: Record<string, number>;
  columnOrder: string[];
  hiddenColumns: string[];
  groupByColumns: string[];
  expandedGroups: Record<string, boolean>;
}
