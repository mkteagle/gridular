import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { DataGrid } from '../../DataGrid';
import type { ColumnDef, SortState } from '../../types';
import '../../index.css';

const generateData = (count: number) => {
  const names = ['Alice', 'Bob', 'Carol', 'David', 'Eve'];
  const departments = ['Engineering', 'Marketing', 'Sales'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    department: departments[i % departments.length],
    age: 25 + (i % 20),
    score: Math.floor(Math.random() * 100),
  }));
};

const columns: ColumnDef[] = [
  { id: 'id', key: 'id', header: 'ID', width: 80, enableSorting: true },
  { id: 'name', key: 'name', header: 'Name', width: 200, enableSorting: true },
  { id: 'department', key: 'department', header: 'Department', width: 200, enableSorting: true },
  { id: 'age', key: 'age', header: 'Age', width: 120, enableSorting: true },
  { id: 'score', key: 'score', header: 'Score', width: 120, enableSorting: true },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Features/Sorting',
  component: DataGrid,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #f5f3f0 0%, #e8e5e0 100%)', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

export const BasicSorting: Story = {
  render: () => {
    const [sortState, setSortState] = useState<SortState | null>(null);
    const data = useMemo(() => generateData(50), []);

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Basic Sorting</h3>
          <p className="font-ui text-sm text-gray-600">
            Click column headers to sort. Click again to reverse, and once more to clear sorting.
          </p>
          {sortState && (
            <p className="font-ui text-sm text-copper mt-2">
              Sorted by: {sortState.column} ({sortState.direction})
            </p>
          )}
        </div>
        <DataGrid
          columns={columns}
          data={data}
          enableSorting
          sortState={sortState}
          onSortChange={setSortState}
          gridId="basic-sorting"
        />
      </div>
    );
  },
};

export const DefaultSorted: Story = {
  render: () => {
    const [sortState, setSortState] = useState<SortState | null>({ column: 'name', direction: 'asc' });
    const data = useMemo(() => generateData(50), []);

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Default Sorted</h3>
          <p className="font-ui text-sm text-gray-600">
            Grid starts with data sorted by Name in ascending order.
          </p>
        </div>
        <DataGrid
          columns={columns}
          data={data}
          enableSorting
          sortState={sortState}
          onSortChange={setSortState}
          gridId="default-sorted"
        />
      </div>
    );
  },
};
