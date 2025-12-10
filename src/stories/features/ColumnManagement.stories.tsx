import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { DataGrid } from '../../DataGrid';
import type { ColumnDef } from '../../types';
import '../../index.css';

const generateData = (count: number) => {
  const names = ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson'];
  const departments = ['Engineering', 'Marketing', 'Sales', 'Design'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    department: departments[i % departments.length],
    email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@company.com`,
    phone: `+1 (555) ${String(i).padStart(3, '0')}-${String(i * 11).padStart(4, '0')}`,
    role: `Role ${i % 5 + 1}`,
  }));
};

const columns: ColumnDef[] = [
  { id: 'id', key: 'id', header: 'ID', width: 80, enableSorting: true },
  { id: 'name', key: 'name', header: 'Name', width: 200, enableSorting: true },
  { id: 'department', key: 'department', header: 'Department', width: 150 },
  { id: 'email', key: 'email', header: 'Email', width: 250 },
  { id: 'phone', key: 'phone', header: 'Phone', width: 180 },
  { id: 'role', key: 'role', header: 'Role', width: 150 },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Features/Column Management',
  component: DataGrid,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{
        padding: '2rem',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f3f0 0%, #e8e5e0 100%)',
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

export const ColumnResize: Story = {
  render: () => {
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
    const data = useMemo(() => generateData(50), []);

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Column Resizing</h3>
          <p className="font-ui text-sm text-gray-600">
            Drag the column edges to resize them. Widths are persisted automatically.
          </p>
        </div>
        <DataGrid
          gridId="column-resize"
          columns={columns}
          data={data}
          enableColumnResize
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
          enableSorting
        />
      </div>
    );
  },
};

export const ColumnReorder: Story = {
  render: () => {
    const [columnOrder, setColumnOrder] = useState<string[]>([]);
    const data = useMemo(() => generateData(50), []);

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Column Reordering</h3>
          <p className="font-ui text-sm text-gray-600">
            Drag column headers to reorder them. Order is persisted automatically.
          </p>
        </div>
        <DataGrid
          gridId="column-reorder"
          columns={columns}
          data={data}
          enableColumnReorder
          columnOrder={columnOrder}
          onColumnOrderChange={setColumnOrder}
          enableSorting
        />
      </div>
    );
  },
};

export const ShowHideColumns: Story = {
  render: () => {
    const data = useMemo(() => generateData(50), []);

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Show/Hide Columns</h3>
          <p className="font-ui text-sm text-gray-600">
            Click the "Columns" button to show/hide individual columns. Settings are persisted.
          </p>
        </div>
        <DataGrid
          gridId="show-hide-columns"
          columns={columns}
          data={data}
          enableSorting
        />
      </div>
    );
  },
};

export const AllColumnFeatures: Story = {
  render: () => {
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
    const [columnOrder, setColumnOrder] = useState<string[]>([]);
    const data = useMemo(() => generateData(50), []);

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">All Column Features</h3>
          <p className="font-ui text-sm text-gray-600 space-y-1">
            <span className="block">• Drag edges to resize columns</span>
            <span className="block">• Drag headers to reorder columns</span>
            <span className="block">• Use Columns menu to show/hide columns</span>
            <span className="block">• Click Reset to restore defaults</span>
          </p>
        </div>
        <DataGrid
          gridId="all-column-features"
          columns={columns}
          data={data}
          enableColumnResize
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
          enableColumnReorder
          columnOrder={columnOrder}
          onColumnOrderChange={setColumnOrder}
          enableSorting
        />
      </div>
    );
  },
};
