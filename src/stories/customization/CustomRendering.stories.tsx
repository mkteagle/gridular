import type { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';
import { DataGrid } from '../../DataGrid';
import type { ColumnDef } from '../../types';
import '../../index.css';

const generateData = (count: number) => {
  const statuses = ['active', 'pending', 'inactive'];
  const priorities = ['high', 'medium', 'low'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Task ${i + 1}`,
    status: statuses[i % statuses.length],
    priority: priorities[i % priorities.length],
    progress: Math.floor(Math.random() * 100),
    assignee: `User ${(i % 5) + 1}`,
  }));
};

const meta: Meta<typeof DataGrid> = {
  title: 'Customization/Custom Rendering',
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

export const CustomCells: Story = {
  render: () => {
    const data = useMemo(() => generateData(50), []);

    const columns: ColumnDef[] = [
      { id: 'id', key: 'id', header: 'ID', width: 80 },
      { id: 'name', key: 'name', header: 'Task Name', width: 200 },
      {
        id: 'status',
        key: 'status',
        header: 'Status',
        width: 150,
        render: (row) => {
          const colors: Record<string, string> = {
            active: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            inactive: 'bg-gray-100 text-gray-800',
          };
          return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[row.status]}`}>
              {row.status.toUpperCase()}
            </span>
          );
        }
      },
      {
        id: 'priority',
        key: 'priority',
        header: 'Priority',
        width: 150,
        render: (row) => {
          const colors: Record<string, string> = {
            high: 'text-red-600',
            medium: 'text-orange-600',
            low: 'text-blue-600',
          };
          const icons: Record<string, string> = {
            high: '🔴',
            medium: '🟠',
            low: '🔵',
          };
          return (
            <span className={`font-semibold ${colors[row.priority]}`}>
              {icons[row.priority]} {row.priority.toUpperCase()}
            </span>
          );
        }
      },
      {
        id: 'progress',
        key: 'progress',
        header: 'Progress',
        width: 200,
        render: (row) => (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-copper h-2 rounded-full transition-all"
                style={{ width: `${row.progress}%` }}
              />
            </div>
            <span className="text-xs font-medium">{row.progress}%</span>
          </div>
        )
      },
      { id: 'assignee', key: 'assignee', header: 'Assignee', width: 150 },
    ];

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Custom Cell Rendering</h3>
          <p className="font-ui text-sm text-gray-600">
            Customize how individual cells are rendered with badges, progress bars, and custom styling.
          </p>
        </div>
        <DataGrid
          columns={columns}
          data={data}
          gridId="custom-cells"
        />
      </div>
    );
  },
};

export const CustomHeaders: Story = {
  render: () => {
    const data = useMemo(() => generateData(50), []);

    const columns: ColumnDef[] = [
      {
        id: 'id',
        key: 'id',
        header: 'ID',
        width: 80,
        headerClassName: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
      },
      {
        id: 'name',
        key: 'name',
        header: 'Task Name',
        width: 200,
        headerClassName: 'bg-gradient-to-r from-green-500 to-teal-500 text-white',
      },
      {
        id: 'status',
        key: 'status',
        header: 'Status',
        width: 150,
        headerClassName: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
      },
      {
        id: 'progress',
        key: 'progress',
        header: 'Progress',
        width: 200,
        headerClassName: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
      },
      {
        id: 'assignee',
        key: 'assignee',
        header: 'Assignee',
        width: 150,
        headerClassName: 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white',
      },
    ];

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Custom Header Styling</h3>
          <p className="font-ui text-sm text-gray-600">
            Apply custom classes to column headers for unique styling.
          </p>
        </div>
        <DataGrid
          columns={columns}
          data={data}
          gridId="custom-headers"
        />
      </div>
    );
  },
};

export const CustomRowStyling: Story = {
  render: () => {
    const data = useMemo(() => generateData(50), []);

    const columns: ColumnDef[] = [
      { id: 'id', key: 'id', header: 'ID', width: 80 },
      { id: 'name', key: 'name', header: 'Task Name', width: 200 },
      {
        id: 'status',
        key: 'status',
        header: 'Status',
        width: 150,
        render: (row) => {
          const colors: Record<string, string> = {
            active: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            inactive: 'bg-gray-100 text-gray-800',
          };
          return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[row.status]}`}>
              {row.status.toUpperCase()}
            </span>
          );
        }
      },
      {
        id: 'priority',
        key: 'priority',
        header: 'Priority',
        width: 150,
      },
      { id: 'assignee', key: 'assignee', header: 'Assignee', width: 150 },
    ];

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Custom Row Styling</h3>
          <p className="font-ui text-sm text-gray-600">
            Rows are styled based on status: Active (green background), Pending (yellow background), Inactive (gray background).
            Each row has a colored left border matching its status.
          </p>
        </div>
        <style>{`
          [data-grid-id="custom-row-styling"] .virtualized-grid-row {
            border-left: 4px solid transparent;
          }
          [data-grid-id="custom-row-styling"] .virtualized-grid-row:has([data-status="active"]) {
            background-color: rgb(240 253 244) !important;
            border-left-color: rgb(34 197 94) !important;
          }
          [data-grid-id="custom-row-styling"] .virtualized-grid-row:has([data-status="active"]):hover {
            background-color: rgb(220 252 231) !important;
          }
          [data-grid-id="custom-row-styling"] .virtualized-grid-row:has([data-status="pending"]) {
            background-color: rgb(254 252 232) !important;
            border-left-color: rgb(234 179 8) !important;
          }
          [data-grid-id="custom-row-styling"] .virtualized-grid-row:has([data-status="pending"]):hover {
            background-color: rgb(254 249 195) !important;
          }
          [data-grid-id="custom-row-styling"] .virtualized-grid-row:has([data-status="inactive"]) {
            background-color: rgb(249 250 251) !important;
            border-left-color: rgb(156 163 175) !important;
          }
          [data-grid-id="custom-row-styling"] .virtualized-grid-row:has([data-status="inactive"]):hover {
            background-color: rgb(243 244 246) !important;
          }
        `}</style>
        <div data-grid-id="custom-row-styling">
          <DataGrid
            columns={columns}
            data={data}
            gridId="custom-row-styling"
            renderCell={({ value, row, column }) => {
              if (column.id === 'status') {
                return <span data-status={row.status}>{column.render ? column.render(row) : value}</span>;
              }
              return value;
            }}
          />
        </div>
      </div>
    );
  },
};
