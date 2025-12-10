import type { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';
import { DataGrid } from '../../DataGrid';
import type { ColumnDef } from '../../types';
import '../../index.css';

const meta: Meta<typeof DataGrid> = {
  title: 'Examples/Basic Usage',
  component: DataGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Simple examples demonstrating basic grid usage with minimal configuration.',
      },
    },
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
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

// Sample data
const generateBasicData = (count: number) => {
  const names = ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Eve Martinez'];
  const departments = ['Engineering', 'Marketing', 'Sales', 'Operations', 'Design'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    department: departments[i % departments.length],
    email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@company.com`,
    joinDate: new Date(2020 + (i % 5), i % 12, (i % 28) + 1).toLocaleDateString(),
  }));
};

const basicColumns: ColumnDef[] = [
  { id: 'id', key: 'id', header: 'ID', width: 80 },
  { id: 'name', key: 'name', header: 'Name', width: 200 },
  { id: 'department', key: 'department', header: 'Department', width: 150 },
  { id: 'email', key: 'email', header: 'Email', width: 250 },
  { id: 'joinDate', key: 'joinDate', header: 'Join Date', width: 140 },
];

export const MinimalSetup: Story = {
  render: () => {
    const data = useMemo(() => generateBasicData(20), []);

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Minimal Setup</h3>
          <p className="font-ui text-sm text-gray-600">
            The simplest possible grid configuration. Just pass columns and data.
          </p>
        </div>
        <DataGrid
          columns={basicColumns}
          data={data}
        />
      </div>
    );
  },
};

export const SmallDataset: Story = {
  render: () => {
    const data = useMemo(() => generateBasicData(10), []);

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Small Dataset (10 rows)</h3>
          <p className="font-ui text-sm text-gray-600">
            With less than 20 rows, virtualization is disabled by default for better performance.
          </p>
        </div>
        <DataGrid
          columns={basicColumns}
          data={data}
        />
      </div>
    );
  },
};

export const VirtualizedDataset: Story = {
  render: () => {
    const data = useMemo(() => generateBasicData(100), []);

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Virtualized Dataset (100 rows)</h3>
          <p className="font-ui text-sm text-gray-600">
            With more than 20 rows, virtualization is automatically enabled. Scroll to see smooth performance.
          </p>
        </div>
        <DataGrid
          columns={basicColumns}
          data={data}
        />
      </div>
    );
  },
};

export const LargeDataset: Story = {
  render: () => {
    const data = useMemo(() => generateBasicData(1000), []);

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Large Dataset (1,000 rows)</h3>
          <p className="font-ui text-sm text-gray-600">
            Virtualization handles large datasets with ease. Try scrolling through 1,000 rows smoothly!
          </p>
        </div>
        <DataGrid
          columns={basicColumns}
          data={data}
          gridId="large-dataset-basic"
        />
      </div>
    );
  },
};
