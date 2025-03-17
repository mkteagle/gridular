import { ReactNode } from "react";

export type SortDirection = "asc" | "desc";

export type FilterValue = string | number | boolean | null;

export type RowSelectionState = Record<string, boolean>;

export type ColumnResizeState = Record<string, number>;

export type VisibleColumnState = Record<string, boolean>;
export type ColumnOrderState = string[];

export interface ColumnDef<T> {
  id: string;
  header: ReactNode;
  cell?: (row: T) => ReactNode;
  width?: number;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableResize?: boolean;
  sortFn?: (a: T, b: T, columnId: string) => number;
  filterFn?: (row: T, columnId: string, filterValue: FilterValue) => boolean;
  headerClassName?: string;
  cellClassName?: string;
  filterMenuPosition?: {
    top: number;
    left: number;
  };
}

export interface DataGridProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  onSelectionChange?: (state: RowSelectionState) => void;
  onSortChange?: (
    state: { column: string; direction: SortDirection } | null
  ) => void;
  onFilterChange?: (state: Record<string, FilterValue>) => void;
  onColumnVisibilityChange?: (state: VisibleColumnState) => void; // New callback
  onColumnOrderChange?: (state: ColumnOrderState) => void; // New callback
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableColumnResize?: boolean;
  enableRowSelection?: boolean;
  enablePagination?: boolean;
  enableColumnVisibility?: boolean; // New prop
  enableColumnReordering?: boolean; // New prop
  defaultVisibleColumns?: VisibleColumnState; // New prop
  pageSize?: number;
  pageSizeOptions?: number[];
  className?: string;
  rowClassName?: string;
  headerClassName?: string;
  cellClassName?: string;
  selectedRowClassName?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  isLoading?: boolean;
}

export type ThemeProviderContext = {
  container: string;
  header: string;
  headerCell: string;
  row: string;
  cell: string;
  pagination: string;

  // Filter menu theming
  filterMenu?: string;
  filterMenuContent?: string;
  filterMenuHeader?: string;
  filterMenuInput?: string;
  filterMenuClearButton?: string;
  filterMenuApplyButton?: string;

  // Column management
  columnVisibilityMenu?: string;
  columnVisibilityMenuItem?: string;
  columnVisibilityButton?: string;

  // Column resize
  columnResizeHandle?: string;
  columnResizeHandleActive?: string;

  // Column reordering
  columnDragHandle?: string;
  columnDragging?: string;

  // Sorting
  sortIcon?: string;
  sortIconActive?: string;
};
