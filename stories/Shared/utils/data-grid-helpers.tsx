import React, { useState } from "react";
import { DataGrid } from "@/components/data-grid/data-grid";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { ColumnDef } from "@/components/data-grid/types";

// Sample data for stories
export const sampleData = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  name: `Name ${i}`,
  email: `user${i}@example.com`,
  status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Inactive",
  createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
}));

export type DataRow = {
  id: number;
  name: string;
  email: string;
  status: string;
  createdAt: string;
};

export const statusFilterFn = (
  row: DataRow,
  columnId: string,
  filterValue: string
) => {
  return row[columnId as keyof DataRow] === filterValue;
};

export const columns: ColumnDef<DataRow>[] = [
  {
    id: "id",
    header: "ID",
    width: 80,
    index: 0,
  },
  {
    id: "name",
    header: "Name",
    enableSorting: true,
    enableFiltering: true,
    sortFn: (a, b, columnId) => {
      const aNum = parseInt(
        (a[columnId as keyof DataRow] as string).replace("Name ", "")
      );
      const bNum = parseInt(
        (b[columnId as keyof DataRow] as string).replace("Name ", "")
      );
      return aNum - bNum;
    },
    index: 1,
  },
  {
    id: "email",
    header: "Email",
    enableFiltering: true,
    sortFn: (a, b, columnId) => {
      const aNum = parseInt(
        (a[columnId as keyof DataRow] as string).replace("Name ", "")
      );
      const bNum = parseInt(
        (b[columnId as keyof DataRow] as string).replace("Name ", "")
      );
      return aNum - bNum;
    },
    index: 2,
  },
  {
    id: "status",
    header: "Status",
    enableFiltering: true,
    filterFn: statusFilterFn,
    cell: (row) => {
      const value = row.status;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : value === "Pending"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300"
          }`}
        >
          {value}
        </span>
      );
    },
    index: 3,
  },
  {
    id: "createdAt",
    header: "Created",
    cell: (row) => {
      return new Date(row.createdAt).toLocaleDateString();
    },
    index: 4,
  },
];

// Create a wrapper component for controlled stories
export type ControlledDataGridWrapperProps = {
  filterMenu?: {
    classes?: {
      container?: string;
      header?: string;
      input?: string;
      clearButton?: string;
      applyButton?: string;
    };
    renderCurrentFilter?: (filterValue: string) => React.ReactNode;
    renderCustomContent?: (props: {
      column: ColumnDef<DataRow>;
      filterValue: string;
      setFilterValue: (value: string) => void;
      onApply: () => void;
      onClear: () => void;
    }) => React.ReactNode;
  };
  data: DataRow[];
  totalRows: number;
  columns: ColumnDef<DataRow>[];
  pageSize?: number;
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
  enableColumnResize?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  rowClassName?: string;
  headerClassName?: string;
  cellClassName?: string;
  selectedRowClassName?: string;
  customTheme?: {
    tailwindTheme?: any;
    tssTheme?: any;
  };
  renderHeader?: (
    column: ColumnDef<DataRow>,
    sortDirection: "asc" | "desc" | null
  ) => React.ReactNode;
  renderSortIcon?: (
    column: ColumnDef<DataRow>,
    sortDirection: "asc" | "desc" | null
  ) => React.ReactNode;
  sortIconVariant?: "arrows" | "chevrons" | "none";
  renderFilterIcon?: (
    column: ColumnDef<DataRow>,
    isActive: boolean
  ) => React.ReactNode;
  classes?: {
    root?: string;
    header?: string;
    row?: string;
    cell?: string;
    selectedRow?: string;
    pagination?: string;
  };
};

export const ControlledDataGridWrapper = (
  props: ControlledDataGridWrapperProps
) => {
  const [sortState, setSortState] = useState<{
    column: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [filterState, setFilterState] = useState<Record<string, string>>({});
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(props.pageSize || 10);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    (props.columns as ColumnDef<DataRow>[]).map(
      (col: ColumnDef<DataRow>) => col.id
    )
  );

  // Calculate total pages
  const pageCount = Math.ceil(props.data.length / pageSize);

  // Apply filtering
  const filteredData = React.useMemo(() => {
    if (Object.keys(filterState).length === 0) return props.data;

    return props.data.filter((row: DataRow) => {
      return Object.entries(filterState).every(([columnId, filterValue]) => {
        const column = props.columns.find(
          (col: ColumnDef<DataRow>) => col.id === columnId
        );
        if (!column) return true;

        if (column.filterFn) {
          return column.filterFn(row, columnId, filterValue);
        }

        const cellValue = row[columnId as keyof DataRow];
        const stringValue = String(cellValue || "").toLowerCase();
        return stringValue.includes(filterValue.toLowerCase());
      });
    });
  }, [props.data, filterState, props.columns]);

  // Apply sorting
  const sortedData = React.useMemo(() => {
    if (!sortState) return filteredData;

    return [...filteredData].sort((a, b) => {
      const column = props.columns.find((col) => col.id === sortState.column);
      if (!column) return 0;

      if (column.sortFn) {
        return sortState.direction === "asc"
          ? column.sortFn(a, b, sortState.column)
          : column.sortFn(b, a, sortState.column);
      }

      const aValue = a[sortState.column as keyof DataRow];
      const bValue = b[sortState.column as keyof DataRow];

      if (aValue === bValue) return 0;
      if (aValue == null) return sortState.direction === "asc" ? -1 : 1;
      if (bValue == null) return sortState.direction === "asc" ? 1 : -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortState.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortState.direction === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });
  }, [filteredData, sortState, props.columns]);

  // Apply pagination
  const paginatedData = React.useMemo(() => {
    if (!props.enablePagination) return sortedData;
    const start = pageIndex * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pageIndex, pageSize, props.enablePagination]);

  // Handle column reordering
  const handleColumnReorder = (draggedId: string, targetId: string) => {
    setVisibleColumns((prev) => {
      const newOrder = [...prev];
      const dragIndex = newOrder.indexOf(draggedId);
      const targetIndex = newOrder.indexOf(targetId);

      if (dragIndex === -1 || targetIndex === -1) return prev;

      newOrder.splice(dragIndex, 1);
      newOrder.splice(targetIndex, 0, draggedId);

      return newOrder;
    });
  };

  // Extract custom theme and other props
  const { customTheme, ...dataGridProps } = props;

  return (
    <DataGrid
      {...dataGridProps}
      data={paginatedData}
      totalRows={props.data.length}
      sortState={sortState}
      onSortChange={setSortState}
      filterState={filterState}
      onFilterChange={setFilterState}
      selectedRows={selectedRows}
      onRowSelectionChange={setSelectedRows}
      pageIndex={pageIndex}
      pageCount={pageCount}
      pageSize={pageSize}
      onPageChange={setPageIndex}
      onPageSizeChange={setPageSize}
      // @ts-ignore
      visibleColumns={visibleColumns}
      onVisibleColumnsChange={setVisibleColumns}
      onColumnReorder={handleColumnReorder}
      renderHeader={
        props.renderHeader
          ? ({ column, sortDirection }) =>
              props.renderHeader?.(column, sortDirection || null)
          : undefined
      }
    />
  );
};

// ThemeWrapper component to apply custom themes
export const ThemeWrapper = ({
  children,
  customTheme,
}: {
  children: React.ReactNode;
  customTheme?: { tailwindTheme?: any; tssTheme?: any };
}) => (
  <ThemeProvider
    initialTailwindTheme={customTheme?.tailwindTheme || {}}
    initialTssTheme={customTheme?.tssTheme || {}}
  >
    <div className="p-4">{children}</div>
  </ThemeProvider>
);
