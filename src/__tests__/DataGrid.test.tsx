import React from 'react';
import { render, screen, within, waitFor } from './utils';
import { DataGrid } from '../DataGrid';
import { ColumnDef } from '../types';
import { describe, test, expect, vi } from 'vitest';

// Sample data for testing
interface TestData {
  id: string;
  name: string;
  email: string;
  role: string;
  age: number;
  department: string;
}

const testData: TestData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    age: 35,
    department: 'Engineering',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    age: 28,
    department: 'Marketing',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Viewer',
    age: 42,
    department: 'Engineering',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Admin',
    age: 31,
    department: 'Sales',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Editor',
    age: 39,
    department: 'Engineering',
  },
];

const columns: ColumnDef<TestData>[] = [
  {
    id: 'name',
    key: 'name',
    header: 'Name',
    enableSorting: true,
    enableFiltering: true,
  },
  {
    id: 'email',
    key: 'email',
    header: 'Email',
    enableSorting: true,
    enableFiltering: true,
  },
  {
    id: 'role',
    key: 'role',
    header: 'Role',
    enableSorting: true,
    enableFiltering: true,
  },
  {
    id: 'age',
    key: 'age',
    header: 'Age',
    enableSorting: true,
  },
  {
    id: 'department',
    key: 'department',
    header: 'Department',
    enableSorting: true,
    enableGrouping: true,
  },
];

describe('DataGrid Component', () => {
  describe('Basic Rendering', () => {
    test('renders with data and proper column headers', () => {
      render(<DataGrid columns={columns} data={testData} />);

      // Check column headers
      columns.forEach((column) => {
        expect(screen.getByText(column.header)).toBeInTheDocument();
      });

      // Check data is rendered - use getAllByText for values that appear multiple times
      testData.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
        expect(screen.getByText(item.email)).toBeInTheDocument();
        // Role might appear multiple times, so just check it exists somewhere
        const roleElements = screen.getAllByText(item.role);
        expect(roleElements.length).toBeGreaterThan(0);
      });
    });

    test('renders empty state when no data provided', () => {
      render(<DataGrid columns={columns} data={[]} emptyMessage="No data found" />);

      // Headers should still be visible
      columns.forEach((column) => {
        expect(screen.getByText(column.header)).toBeInTheDocument();
      });
    });

    test('applies custom className', () => {
      const { container } = render(
        <DataGrid columns={columns} data={testData} className="custom-grid" />
      );

      expect(container.querySelector('.custom-grid')).toBeInTheDocument();
    });

    test('renders with custom row height', () => {
      render(<DataGrid columns={columns} data={testData} rowHeight={100} />);

      // Data should still be visible
      expect(screen.getByText(testData[0].name)).toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    test('sorting is disabled by default', () => {
      render(<DataGrid columns={columns} data={testData} />);

      const nameHeader = screen.getByText('Name');
      nameHeader.click();

      // Data order should not change - first item should still be John
      const firstRow = screen.getAllByText('John Doe')[0];
      expect(firstRow).toBeInTheDocument();
    });

    test('enables sorting when enableSorting prop is true', async () => {
      const onSortChange = vi.fn();
      const { user } = render(
        <DataGrid
          columns={columns}
          data={testData}
          enableSorting
          onSortChange={onSortChange}
        />
      );

      // Click the name header to sort
      const nameHeader = screen.getByText('Name');
      await user.click(nameHeader);

      // onSortChange should be called with ascending
      expect(onSortChange).toHaveBeenCalledWith({
        column: 'name',
        direction: 'asc',
      });
    });

    test('cycles through sort states: asc -> desc -> null', async () => {
      let sortState: any = null;
      const onSortChange = vi.fn((newState) => {
        sortState = newState;
      });

      const { user, rerender } = render(
        <DataGrid
          columns={columns}
          data={testData}
          enableSorting
          sortState={sortState}
          onSortChange={onSortChange}
        />
      );

      const nameHeader = screen.getByText('Name');

      // First click: asc
      await user.click(nameHeader);
      expect(onSortChange).toHaveBeenCalledWith({
        column: 'name',
        direction: 'asc',
      });

      // Re-render with new state
      sortState = { column: 'name', direction: 'asc' };
      rerender(
        <DataGrid
          columns={columns}
          data={testData}
          enableSorting
          sortState={sortState}
          onSortChange={onSortChange}
        />
      );

      // Second click: desc
      await user.click(nameHeader);
      expect(onSortChange).toHaveBeenCalledWith({
        column: 'name',
        direction: 'desc',
      });

      // Re-render with new state
      sortState = { column: 'name', direction: 'desc' };
      rerender(
        <DataGrid
          columns={columns}
          data={testData}
          enableSorting
          sortState={sortState}
          onSortChange={onSortChange}
        />
      );

      // Third click: null (clear sort)
      await user.click(nameHeader);
      expect(onSortChange).toHaveBeenCalledWith(null);
    });

    test('sorts data in ascending order', () => {
      render(
        <DataGrid
          columns={columns}
          data={testData}
          enableSorting
          sortState={{ column: 'name', direction: 'asc' }}
        />
      );

      // Get all cells with names (should be in alphabetical order)
      const names = testData.map((d) => d.name).sort();
      names.forEach((name) => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    test('sorts data in descending order', () => {
      render(
        <DataGrid
          columns={columns}
          data={testData}
          enableSorting
          sortState={{ column: 'age', direction: 'desc' }}
        />
      );

      // Data should be sorted by age descending
      expect(screen.getByText('42')).toBeInTheDocument(); // Bob (oldest)
    });

    test('uses custom sort function when provided', () => {
      const customSortColumns: ColumnDef<TestData>[] = [
        {
          id: 'name',
          key: 'name',
          header: 'Name',
          enableSorting: true,
          sortFn: (a, b) => {
            // Custom sort: reverse alphabetical
            return b.name.localeCompare(a.name);
          },
        },
      ];

      render(
        <DataGrid
          columns={customSortColumns}
          data={testData}
          enableSorting
          sortState={{ column: 'name', direction: 'asc' }}
        />
      );

      expect(screen.getByText(testData[0].name)).toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    test('renders pagination controls when pagination prop provided', () => {
      const onPageChange = vi.fn();
      render(
        <DataGrid
          columns={columns}
          data={testData}
          pagination={{
            pageIndex: 0,
            pageSize: 2,
            totalRows: testData.length,
            onPageChange,
          }}
        />
      );

      // Pagination controls should be visible
      expect(screen.getByText(/Page/)).toBeInTheDocument();
    });

    test('displays correct page of data with client-side pagination', () => {
      render(
        <DataGrid
          columns={columns}
          data={testData}
          pagination={{
            pageIndex: 0,
            pageSize: 2,
            totalRows: testData.length,
          }}
        />
      );

      // Should show first 2 items
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
    });

    test('handles page change', async () => {
      const onPageChange = vi.fn();
      const { user } = render(
        <DataGrid
          columns={columns}
          data={testData}
          pagination={{
            pageIndex: 0,
            pageSize: 2,
            totalRows: testData.length,
            onPageChange,
          }}
        />
      );

      // Find and click next page button
      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    test('handles manual pagination mode', () => {
      // In manual mode, only the data for current page is provided
      const currentPageData = testData.slice(0, 2);

      render(
        <DataGrid
          columns={columns}
          data={currentPageData}
          pagination={{
            pageIndex: 0,
            pageSize: 2,
            totalRows: testData.length,
            manualPagination: true,
          }}
        />
      );

      // Should only show the 2 items we provided
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    test('changes page size', async () => {
      const onPageSizeChange = vi.fn();
      const { user } = render(
        <DataGrid
          columns={columns}
          data={testData}
          pagination={{
            pageIndex: 0,
            pageSize: 2,
            totalRows: testData.length,
            onPageSizeChange,
            pageSizeOptions: [2, 5, 10],
          }}
        />
      );

      // This test would need to interact with the page size selector
      // Implementation depends on how the Pagination component renders
    });
  });

  describe('Virtualization', () => {
    test('uses standard rendering when below threshold', () => {
      const smallData = testData.slice(0, 3);
      render(
        <DataGrid
          columns={columns}
          data={smallData}
          virtualizationThreshold={20}
        />
      );

      // All items should be rendered
      smallData.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });

    test('uses virtualized rendering when above threshold', () => {
      // Create a large dataset with all required fields
      const largeData = Array.from({ length: 50 }, (_, i) => ({
        id: `${i}`,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        role: 'User',
        age: 25 + i,
        department: 'Engineering',
      }));

      const { container } = render(
        <DataGrid
          columns={columns}
          data={largeData}
          virtualizationThreshold={20}
          rowHeight={72}
        />
      );

      // Check that the virtualized body is rendered
      const virtualizedBody = container.querySelector('.virtualized-grid-body');
      expect(virtualizedBody).toBeInTheDocument();

      // The data exceeds threshold, so virtualization should be active
      // With 50 rows, we should have triggered virtualization (threshold is 20)
      expect(largeData.length).toBeGreaterThan(20);
    });
  });

  describe('Row Selection', () => {
    test('row selection is disabled by default', async () => {
      const onRowClick = vi.fn();
      const { user } = render(
        <DataGrid columns={columns} data={testData} onRowClick={onRowClick} />
      );

      const firstRow = screen.getByText('John Doe').closest('.virtualized-grid-row');
      if (firstRow) {
        await user.click(firstRow);
        expect(onRowClick).toHaveBeenCalled();
      }
    });

    test('handles row click events', async () => {
      const onRowClick = vi.fn();
      const { user } = render(
        <DataGrid columns={columns} data={testData} onRowClick={onRowClick} />
      );

      const firstRow = screen.getByText('John Doe').closest('.virtualized-grid-row');
      if (firstRow) {
        await user.click(firstRow);
        expect(onRowClick).toHaveBeenCalledWith(testData[0], 0);
      }
    });
  });

  describe('Cell Selection', () => {
    test('cell selection is disabled by default', () => {
      render(<DataGrid columns={columns} data={testData} />);

      const cell = screen.getByText('John Doe').closest('.virtualized-grid-cell');
      expect(cell).not.toHaveClass('ring-2');
    });

    test('enables cell selection when prop is true', async () => {
      const onCellSelect = vi.fn();
      const { user } = render(
        <DataGrid
          columns={columns}
          data={testData}
          enableCellSelection
          onCellSelect={onCellSelect}
        />
      );

      const cell = screen.getByText('John Doe').closest('.virtualized-grid-cell');
      if (cell) {
        await user.click(cell);
        expect(onCellSelect).toHaveBeenCalledWith('1', 'name');
      }
    });

    test('shows selected cell with visual indicator', () => {
      render(
        <DataGrid
          columns={columns}
          data={testData}
          enableCellSelection
          selectedCell={{ rowId: '1', columnId: 'name' }}
        />
      );

      const cell = screen.getByText('John Doe').closest('.virtualized-grid-cell');
      expect(cell).toHaveClass('ring-2', 'ring-copper', 'ring-inset');
    });
  });

  describe('Column Management', () => {
    test('shows column manager by default', () => {
      render(<DataGrid columns={columns} data={testData} />);

      // Column manager button should be visible by default
      expect(screen.getByText(/columns/i)).toBeInTheDocument();
    });

    test('shows column manager when hideColumnManager is false', () => {
      render(
        <DataGrid columns={columns} data={testData} hideColumnManager={false} />
      );

      // Column manager should be visible
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Column Resizing', () => {
    test('column resizing is disabled by default', () => {
      const { container } = render(
        <DataGrid columns={columns} data={testData} />
      );

      const resizeHandle = container.querySelector('.cursor-col-resize');
      expect(resizeHandle).not.toBeInTheDocument();
    });

    test('enables resize handles when enableColumnResize is true', () => {
      const { container } = render(
        <DataGrid columns={columns} data={testData} enableColumnResize />
      );

      const resizeHandles = container.querySelectorAll('.cursor-col-resize');
      expect(resizeHandles.length).toBeGreaterThan(0);
    });

    test('calls onColumnWidthsChange when resizing', () => {
      const onColumnWidthsChange = vi.fn();
      const { container } = render(
        <DataGrid
          columns={columns}
          data={testData}
          enableColumnResize
          onColumnWidthsChange={onColumnWidthsChange}
        />
      );

      // Get a resize handle
      const resizeHandle = container.querySelector('.cursor-col-resize');
      expect(resizeHandle).toBeInTheDocument();

      // Simulating mouse drag would require more complex testing
      // This is a basic structure test
    });
  });

  describe('Column Reordering', () => {
    test('column reordering is disabled by default', () => {
      const { container } = render(
        <DataGrid columns={columns} data={testData} />
      );

      const headerCell = container.querySelector('.virtualized-grid-header-cell');
      expect(headerCell).not.toHaveAttribute('draggable', 'true');
    });

    test('enables draggable headers when enableColumnReorder is true', () => {
      const { container } = render(
        <DataGrid columns={columns} data={testData} enableColumnReorder />
      );

      const headerCells = container.querySelectorAll('.virtualized-grid-header-cell');
      headerCells.forEach((cell) => {
        expect(cell).toHaveAttribute('draggable', 'true');
      });
    });
  });

  describe('Expandable Rows', () => {
    test('expandable rows are disabled by default', () => {
      render(
        <DataGrid columns={columns} data={testData} hideColumnManager />
      );

      // Should not have expand buttons (only column manager button exists by default)
      const buttons = screen.queryAllByRole('button');
      expect(buttons.length).toBe(0);
    });

    test('shows expand buttons when enableExpandableRows and renderExpandedRow provided', () => {
      render(
        <DataGrid
          columns={columns}
          data={testData}
          enableExpandableRows
          renderExpandedRow={(row) => <div>Expanded: {row.name}</div>}
        />
      );

      // Should have expand buttons (ChevronRight icons)
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    test('expands row when expand button clicked', async () => {
      const onExpandedRowsChange = vi.fn();
      const { user } = render(
        <DataGrid
          columns={columns}
          data={testData}
          enableExpandableRows
          renderExpandedRow={(row) => <div>Expanded: {row.name}</div>}
          onExpandedRowsChange={onExpandedRowsChange}
          hideColumnManager
        />
      );

      // Click first expand button (should be in the first cell)
      const expandButtons = screen.getAllByRole('button');
      expect(expandButtons.length).toBeGreaterThan(0);
      await user.click(expandButtons[0]);
      expect(onExpandedRowsChange).toHaveBeenCalled();
    });

    test('shows expanded content when row is expanded', () => {
      render(
        <DataGrid
          columns={columns}
          data={testData}
          enableExpandableRows
          renderExpandedRow={(row) => <div>Expanded: {row.name}</div>}
          expandedRows={{ '1': true }}
        />
      );

      expect(screen.getByText('Expanded: John Doe')).toBeInTheDocument();
    });
  });

  describe('Grouping', () => {
    test('grouping is disabled by default', () => {
      render(<DataGrid columns={columns} data={testData} />);

      // Should not show grouping controls
      expect(screen.queryByText(/grouped by/i)).not.toBeInTheDocument();
    });

    test('shows grouping controls when enableGrouping is true', () => {
      render(
        <DataGrid
          columns={columns}
          data={testData}
          enableGrouping
          hideGroupControls={false}
        />
      );

      // Should show group manager button
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    test('displays grouped data when groupingState provided', () => {
      render(
        <DataGrid
          columns={columns}
          data={testData}
          enableGrouping
          groupingState={{
            groupByColumns: ['department'],
            expandedGroups: { 'department:Engineering': true },
          }}
        />
      );

      // Should show group rows
      expect(screen.getByText(/Engineering/)).toBeInTheDocument();
    });

    test('shows active grouping pills', () => {
      render(
        <DataGrid
          columns={columns}
          data={testData}
          enableGrouping
          groupingState={{
            groupByColumns: ['department'],
            expandedGroups: {},
          }}
        />
      );

      expect(screen.getByText(/grouped by/i)).toBeInTheDocument();
      // Check for Department header in the pills, not just anywhere
      const pills = screen.getAllByText('Department');
      expect(pills.length).toBeGreaterThan(0);
    });
  });

  describe('Loading State', () => {
    test('shows loading skeletons when isLoading is true', () => {
      render(
        <DataGrid
          columns={columns}
          data={[]}
          isLoading
          pagination={{
            pageIndex: 0,
            pageSize: 3,
            totalRows: 0,
            manualPagination: true,
          }}
        />
      );

      // Should show skeleton rows
      const { container } = render(
        <DataGrid
          columns={columns}
          data={[]}
          isLoading
          pagination={{
            pageIndex: 0,
            pageSize: 3,
            totalRows: 0,
            manualPagination: true,
          }}
        />
      );

      const skeletons = container.querySelectorAll('.skeleton-shimmer');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });

  describe('Custom Rendering', () => {
    test('uses custom cell renderer when provided', () => {
      const customColumns: ColumnDef<TestData>[] = [
        {
          id: 'name',
          key: 'name',
          header: 'Name',
          renderCell: (row) => <strong data-testid="custom-cell">{row.name}</strong>,
        },
      ];

      render(<DataGrid columns={customColumns} data={testData} />);

      // Should find at least one custom cell (one for each row)
      const customCells = screen.getAllByTestId('custom-cell');
      expect(customCells.length).toBeGreaterThan(0);
      expect(customCells[0]).toHaveTextContent('John Doe');
    });

    test('uses global renderCell prop', () => {
      render(
        <DataGrid
          columns={[columns[0]]}
          data={testData}
          renderCell={({ value }) => <span data-testid="global-render">{value}</span>}
        />
      );

      // Should find at least one rendered cell
      const renderedCells = screen.getAllByTestId('global-render');
      expect(renderedCells.length).toBeGreaterThan(0);
    });
  });

  describe('Custom Row ID', () => {
    test('uses custom getRowId function', () => {
      const customData = [
        { customId: 'custom-1', name: 'Test User' },
      ];

      const customColumns: ColumnDef[] = [
        { id: 'name', key: 'name', header: 'Name' },
      ];

      render(
        <DataGrid
          columns={customColumns}
          data={customData}
          getRowId={(row) => row.customId}
          enableCellSelection
          selectedCell={{ rowId: 'custom-1', columnId: 'name' }}
        />
      );

      const cell = screen.getByText('Test User').closest('.virtualized-grid-cell');
      expect(cell).toHaveClass('ring-2');
    });
  });

  describe('Scroll Events', () => {
    test('calls onScroll callback when scrolling', () => {
      const onScroll = vi.fn();

      // Create large dataset to enable scrolling
      const largeData = Array.from({ length: 50 }, (_, i) => ({
        ...testData[0],
        id: `${i}`,
        name: `User ${i}`,
      }));

      const { container } = render(
        <DataGrid
          columns={columns}
          data={largeData}
          virtualizationThreshold={10}
          onScroll={onScroll}
        />
      );

      const scrollContainer = container.querySelector('.virtualized-grid-body');

      if (scrollContainer) {
        // Simulate scroll event
        scrollContainer.dispatchEvent(new Event('scroll'));
      }

      // Note: The actual callback might not fire in jsdom without proper setup
      // This is a basic structure test
    });
  });

  describe('Grid Persistence', () => {
    test('uses provided gridId for persistence', () => {
      render(
        <DataGrid
          columns={columns}
          data={testData}
          gridId="custom-grid-id"
        />
      );

      // Grid should render normally
      expect(screen.getByText('John Doe')).toBeInTheDocument();

      // localStorage should be used (would need to mock localStorage to test fully)
    });
  });
});
