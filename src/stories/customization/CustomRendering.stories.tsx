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

export const CustomHeaderCellRendering: Story = {
  render: () => {
    const data = useMemo(() => generateData(50), []);

    const columns: ColumnDef[] = [
      { id: 'id', key: 'id', header: 'ID', width: 80 },
      { id: 'name', key: 'name', header: 'Task Name', width: 200 },
      { id: 'status', key: 'status', header: 'Status', width: 150 },
      { id: 'priority', key: 'priority', header: 'Priority', width: 150 },
      { id: 'progress', key: 'progress', header: 'Progress', width: 200 },
      { id: 'assignee', key: 'assignee', header: 'Assignee', width: 150 },
    ];

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Custom Header Cell Rendering</h3>
          <p className="font-ui text-sm text-gray-600">
            Use <code className="px-1 py-0.5 bg-gray-100 rounded text-xs">renderHeaderCell</code> to completely customize header appearance with icons, badges, and custom layouts.
          </p>
        </div>
        <DataGrid
          columns={columns}
          data={data}
          gridId="custom-header-cells"
          enableSorting
          enableFiltering
          renderHeaderCell={({ column, columnIndex, sortDirection, isFiltered }) => {
            // Custom icons for each column
            const icons: Record<string, string> = {
              id: '🔢',
              name: '📝',
              status: '🎯',
              priority: '⚡',
              progress: '📊',
              assignee: '👤',
            };

            const icon = icons[column.id] || '📌';

            return (
              <div className="flex items-center justify-between w-full py-2 px-3 bg-gradient-to-r from-slate-800 to-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{icon}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      {column.header}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Column {columnIndex + 1}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {sortDirection && (
                    <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded border border-amber-500/30">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                  {isFiltered && (
                    <span className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 text-[10px] font-bold rounded border border-cyan-500/30">
                      FILTERED
                    </span>
                  )}
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  },
};

export const MinimalHeaderDesign: Story = {
  render: () => {
    const data = useMemo(() => generateData(50), []);

    const columns: ColumnDef[] = [
      { id: 'id', key: 'id', header: 'ID', width: 80 },
      { id: 'name', key: 'name', header: 'Task Name', width: 200 },
      { id: 'status', key: 'status', header: 'Status', width: 150 },
      { id: 'priority', key: 'priority', header: 'Priority', width: 150 },
      { id: 'progress', key: 'progress', header: 'Progress', width: 200 },
      { id: 'assignee', key: 'assignee', header: 'Assignee', width: 150 },
    ];

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Minimal Header Design</h3>
          <p className="font-ui text-sm text-gray-600">
            Clean, minimalist header design with subtle styling and no uppercase text.
          </p>
        </div>
        <DataGrid
          columns={columns}
          data={data}
          gridId="minimal-headers"
          enableSorting
          renderHeaderCell={({ column, sortDirection }) => (
            <div className="flex items-center justify-between w-full px-4 py-3 bg-stone-50 border-b border-stone-200">
              <span className="text-sm font-medium text-stone-900">
                {column.header}
              </span>
              {sortDirection && (
                <span className="text-stone-500 text-xs font-mono">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </div>
          )}
        />
      </div>
    );
  },
};

export const ColorfulHeaderBadges: Story = {
  render: () => {
    const data = useMemo(() => generateData(50), []);

    const columns: ColumnDef[] = [
      { id: 'id', key: 'id', header: 'ID', width: 80 },
      { id: 'name', key: 'name', header: 'Task Name', width: 200 },
      { id: 'status', key: 'status', header: 'Status', width: 150 },
      { id: 'priority', key: 'priority', header: 'Priority', width: 150 },
      { id: 'progress', key: 'progress', header: 'Progress', width: 200 },
      { id: 'assignee', key: 'assignee', header: 'Assignee', width: 150 },
    ];

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Colorful Header Badges</h3>
          <p className="font-ui text-sm text-gray-600">
            Each column header gets a unique color badge for visual distinction.
          </p>
        </div>
        <DataGrid
          columns={columns}
          data={data}
          gridId="colorful-headers"
          enableSorting
          enableFiltering
          renderHeaderCell={({ column, columnIndex, sortDirection, isFiltered }) => {
            const colorSchemes = [
              { badge: 'bg-blue-600', text: 'text-blue-100', bg: 'bg-blue-950' },
              { badge: 'bg-violet-600', text: 'text-violet-100', bg: 'bg-violet-950' },
              { badge: 'bg-fuchsia-600', text: 'text-fuchsia-100', bg: 'bg-fuchsia-950' },
              { badge: 'bg-orange-600', text: 'text-orange-100', bg: 'bg-orange-950' },
              { badge: 'bg-emerald-600', text: 'text-emerald-100', bg: 'bg-emerald-950' },
              { badge: 'bg-indigo-600', text: 'text-indigo-100', bg: 'bg-indigo-950' },
            ];
            const scheme = colorSchemes[columnIndex % colorSchemes.length];

            return (
              <div className={`flex items-center gap-2 w-full px-3 py-2 ${scheme.bg}`}>
                <span className={`w-8 h-8 ${scheme.badge} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-black/20`}>
                  {column.header.charAt(0)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-bold ${scheme.text} uppercase tracking-wider truncate`}>
                    {column.header}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {sortDirection && (
                      <span className={`text-[10px] ${scheme.badge.replace('bg-', 'text-')} font-semibold`}>
                        {sortDirection.toUpperCase()}
                      </span>
                    )}
                    {isFiltered && (
                      <span className="text-[10px] text-cyan-400 font-semibold">
                        • FILTERED
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  },
};

export const HeadersWithTooltips: Story = {
  render: () => {
    const data = useMemo(() => generateData(50), []);

    const columns: ColumnDef[] = [
      { id: 'id', key: 'id', header: 'ID', width: 80 },
      { id: 'name', key: 'name', header: 'Task Name', width: 200 },
      { id: 'status', key: 'status', header: 'Status', width: 150 },
      { id: 'priority', key: 'priority', header: 'Priority', width: 150 },
      { id: 'progress', key: 'progress', header: 'Progress', width: 200 },
      { id: 'assignee', key: 'assignee', header: 'Assignee', width: 150 },
    ];

    const descriptions: Record<string, string> = {
      id: 'Unique task identifier',
      name: 'Name of the task',
      status: 'Current task status',
      priority: 'Task priority level',
      progress: 'Completion percentage',
      assignee: 'Person assigned to task',
    };

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Headers with Info Icons</h3>
          <p className="font-ui text-sm text-gray-600">
            Headers include info icons and descriptions. Hover over the ℹ️ to see more details.
          </p>
        </div>
        <DataGrid
          columns={columns}
          data={data}
          gridId="headers-with-tooltips"
          enableSorting
          renderHeaderCell={({ column, sortDirection }) => (
            <div className="flex items-center justify-between w-full px-3 py-2 group bg-gradient-to-b from-gray-50 to-gray-100 border-b-2 border-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  {column.header}
                </span>
                <span
                  className="text-xs text-blue-600 opacity-60 group-hover:opacity-100 transition-opacity cursor-help"
                  title={descriptions[column.id] || 'No description available'}
                >
                  ℹ️
                </span>
              </div>
              {sortDirection && (
                <span className="text-orange-600 font-bold text-xs">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </div>
          )}
        />
      </div>
    );
  },
};

export const GradientHeaderDesign: Story = {
  render: () => {
    const data = useMemo(() => generateData(50), []);

    const columns: ColumnDef[] = [
      { id: 'id', key: 'id', header: 'ID', width: 80 },
      { id: 'name', key: 'name', header: 'Task Name', width: 200 },
      { id: 'status', key: 'status', header: 'Status', width: 150 },
      { id: 'priority', key: 'priority', header: 'Priority', width: 150 },
      { id: 'progress', key: 'progress', header: 'Progress', width: 200 },
      { id: 'assignee', key: 'assignee', header: 'Assignee', width: 150 },
    ];

    return (
      <div style={{ height: '600px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Gradient Header Design</h3>
          <p className="font-ui text-sm text-gray-600">
            Modern gradient design with glassmorphism effect and custom styling.
          </p>
        </div>
        <style>{`
          .gradient-header-wrapper {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            backdrop-filter: blur(10px);
            border-bottom: 2px solid rgba(255, 255, 255, 0.4);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
        `}</style>
        <DataGrid
          columns={columns}
          data={data}
          gridId="gradient-headers"
          enableSorting
          enableFiltering
          renderHeaderCell={({ column, sortDirection, isFiltered }) => (
            <div className="gradient-header-wrapper flex items-center justify-between w-full px-4 py-3">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-wide">
                  {column.header}
                </span>
                {(sortDirection || isFiltered) && (
                  <div className="flex items-center gap-2 mt-1">
                    {sortDirection && (
                      <span className="text-xs text-white/80 font-medium">
                        {sortDirection === 'asc' ? '↑ Ascending' : '↓ Descending'}
                      </span>
                    )}
                    {isFiltered && (
                      <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                        Filtered
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
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
