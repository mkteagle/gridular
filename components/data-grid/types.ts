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
}

export type FilterValue = string | null;

export interface ColumnResizeState {
  [key: string]: number;
}

export type RowSelectionState = Record<string, boolean>;

export interface ThemeProviderContext {
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

export interface DataGridProps<T> {
  // Data and columns
  columns: ColumnDef<T>[];
  data: T[];

  // Sorting
  sortState: { column: string; direction: "asc" | "desc" } | null;
  onSortChange: (
    sortState: { column: string; direction: "asc" | "desc" } | null
  ) => void;

  // Filtering
  filterState: Record<string, string>;
  onFilterChange: (filterState: Record<string, string>) => void;

  // Row selection
  selectedRows: Record<string, boolean>;
  onRowSelectionChange: (selectedRows: Record<string, boolean>) => void;

  // Pagination
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;

  // Column visibility and ordering
  visibleColumns: string[];
  onVisibleColumnsChange: (columns: string[]) => void;
  onColumnReorder: (draggedId: string, targetId: string) => void;

  // Row interaction
  onRowClick?: (row: T) => void;

  // Feature flags
  enableSorting?: boolean;
  enableColumnResize?: boolean;
  enableRowSelection?: boolean;
  enablePagination?: boolean;

  // UI customization
  pageSizeOptions?: number[];
  className?: string;
  rowClassName?: string;
  headerClassName?: string;
  cellClassName?: string;
  selectedRowClassName?: string;

  // Status messages
  emptyMessage?: string;
  loadingMessage?: string;
  isLoading?: boolean;

  gridId?: string;
}
