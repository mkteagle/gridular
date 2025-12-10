import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid } from '../../DataGrid';
import { useState } from 'react';
import type { ColumnDef, FilterState } from '../../types';

const meta: Meta<typeof DataGrid> = {
  title: 'Features/Column Filtering',
  component: DataGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

// Sample data
interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  email: string;
  salary: number;
  status: string;
}

const generateEmployees = (count: number): Employee[] => {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
  const positions = ['Manager', 'Senior', 'Junior', 'Lead', 'Director', 'Specialist'];
  const statuses = ['Active', 'On Leave', 'Remote'];
  const names = [
    'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince',
    'Edward Norton', 'Fiona Apple', 'George Harrison', 'Helen Mirren',
    'Ian McKellen', 'Julia Roberts', 'Kevin Spacey', 'Laura Dern',
    'Michael Jordan', 'Nancy Drew', 'Oscar Wilde', 'Patricia Hill'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    department: departments[i % departments.length],
    position: positions[i % positions.length],
    email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@company.com`,
    salary: 50000 + (i % 10) * 10000,
    status: statuses[i % statuses.length],
  }));
};

const employees = generateEmployees(100);

const columns: ColumnDef<Employee>[] = [
  {
    id: 'id',
    header: 'ID',
    key: 'id',
    width: 80,
  },
  {
    id: 'name',
    header: 'Name',
    key: 'name',
    width: 180,
  },
  {
    id: 'department',
    header: 'Department',
    key: 'department',
    width: 150,
  },
  {
    id: 'position',
    header: 'Position',
    key: 'position',
    width: 150,
  },
  {
    id: 'email',
    header: 'Email',
    key: 'email',
    width: 250,
  },
  {
    id: 'salary',
    header: 'Salary',
    key: 'salary',
    width: 120,
    renderCell: (row) => `$${row.salary.toLocaleString()}`,
  },
  {
    id: 'status',
    header: 'Status',
    key: 'status',
    width: 120,
    renderCell: (row) => (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          row.status === 'Active'
            ? 'bg-green-100 text-green-800'
            : row.status === 'Remote'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

/**
 * Basic column filtering with text inputs.
 * Click the filter icon in any column header to filter data.
 */
export const BasicFiltering: Story = {
  render: () => {
    const [filterState, setFilterState] = useState<FilterState>({});

    return (
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Column Filtering</h2>
          <p className="text-gray-600 mb-4">
            Click the filter icon in any column header to filter the data. The filter uses
            case-insensitive substring matching by default.
          </p>
          {Object.keys(filterState).length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <strong className="text-blue-900">Active Filters:</strong>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(filterState).map(([col, value]) => (
                  <span
                    key={col}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium"
                  >
                    {col}: "{value}"
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ height: '600px' }}>
          <DataGrid
            columns={columns}
            data={employees}
            enableFiltering={true}
            filterState={filterState}
            onFilterChange={setFilterState}
            enableSorting={true}
            rowHeight={60}
          />
        </div>
      </div>
    );
  },
};

/**
 * Column filtering with custom filter functions.
 * Different columns can have custom filtering logic.
 */
export const CustomFilterFunctions: Story = {
  render: () => {
    const [filterState, setFilterState] = useState<FilterState>({});

    const customColumns: ColumnDef<Employee>[] = [
      ...columns.slice(0, -2),
      {
        id: 'salary',
        header: 'Salary',
        key: 'salary',
        width: 120,
        renderCell: (row) => `$${row.salary.toLocaleString()}`,
        // Custom filter: filter by minimum salary (numeric comparison)
        filterFn: (row, columnId, filterValue) => {
          const minSalary = parseInt(filterValue);
          if (isNaN(minSalary)) return true;
          return row.salary >= minSalary;
        },
      },
      {
        id: 'status',
        header: 'Status',
        key: 'status',
        width: 120,
        renderCell: (row) => (
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              row.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : row.status === 'Remote'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {row.status}
          </span>
        ),
        // Custom filter: exact match for status
        filterFn: (row, columnId, filterValue) => {
          return row.status.toLowerCase() === filterValue.toLowerCase();
        },
      },
    ];

    return (
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Custom Filter Functions</h2>
          <p className="text-gray-600 mb-4">
            Different columns can have custom filtering logic:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
            <li><strong>Salary:</strong> Filters by minimum salary (numeric comparison)</li>
            <li><strong>Status:</strong> Filters by exact match</li>
            <li><strong>Other columns:</strong> Default case-insensitive substring matching</li>
          </ul>
          {Object.keys(filterState).length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <strong className="text-blue-900">Active Filters:</strong>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(filterState).map(([col, value]) => (
                  <span
                    key={col}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium"
                  >
                    {col}: "{value}"
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ height: '600px' }}>
          <DataGrid
            columns={customColumns}
            data={employees}
            enableFiltering={true}
            filterState={filterState}
            onFilterChange={setFilterState}
            enableSorting={true}
            rowHeight={60}
          />
        </div>
      </div>
    );
  },
};

/**
 * Column filtering with pagination.
 * Filters are applied before pagination.
 */
export const FilteringWithPagination: Story = {
  render: () => {
    const [filterState, setFilterState] = useState<FilterState>({});
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 20;

    // Filter data first, then get total for pagination
    const filteredData = employees.filter((row) => {
      return Object.entries(filterState).every(([columnId, filterValue]) => {
        if (!filterValue) return true;
        const cellValue = String(row[columnId as keyof Employee] ?? '').toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      });
    });

    return (
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Filtering with Pagination</h2>
          <p className="text-gray-600 mb-4">
            Filters are applied to the entire dataset before pagination.
            Showing {filteredData.length} of {employees.length} total records.
          </p>
          {Object.keys(filterState).length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <strong className="text-blue-900">Active Filters:</strong>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(filterState).map(([col, value]) => (
                  <span
                    key={col}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium"
                  >
                    {col}: "{value}"
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ height: '600px' }}>
          <DataGrid
            columns={columns}
            data={filteredData}
            enableFiltering={true}
            filterState={filterState}
            onFilterChange={(newFilterState) => {
              setFilterState(newFilterState);
              setPageIndex(0); // Reset to first page when filter changes
            }}
            enableSorting={true}
            pagination={{
              pageIndex,
              pageSize,
              totalRows: filteredData.length,
              onPageChange: setPageIndex,
            }}
            rowHeight={60}
          />
        </div>
      </div>
    );
  },
};

/**
 * Disable filtering on specific columns.
 * Set `enableFiltering: false` on individual columns to disable filtering for that column.
 */
export const SelectiveFiltering: Story = {
  render: () => {
    const [filterState, setFilterState] = useState<FilterState>({});

    const selectiveColumns: ColumnDef<Employee>[] = [
      {
        ...columns[0],
        enableFiltering: false, // Disable filtering on ID
      },
      ...columns.slice(1, 5),
      {
        ...columns[5],
        enableFiltering: false, // Disable filtering on Salary
      },
      columns[6],
    ];

    return (
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Selective Column Filtering</h2>
          <p className="text-gray-600 mb-4">
            Some columns have filtering disabled (ID and Salary columns).
            Notice they don't show filter icons.
          </p>
          {Object.keys(filterState).length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <strong className="text-blue-900">Active Filters:</strong>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(filterState).map(([col, value]) => (
                  <span
                    key={col}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium"
                  >
                    {col}: "{value}"
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ height: '600px' }}>
          <DataGrid
            columns={selectiveColumns}
            data={employees}
            enableFiltering={true}
            filterState={filterState}
            onFilterChange={setFilterState}
            enableSorting={true}
            rowHeight={60}
          />
        </div>
      </div>
    );
  },
};
