import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { DataGrid } from '../../DataGrid';
import type { ColumnDef, GroupingState } from '../../types';
import '../../index.css';

const meta: Meta<typeof DataGrid> = {
  title: 'Customization/Themes',
  component: DataGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Pre-built theme examples demonstrating the full customization capabilities of the grid.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

// Sample data
const generatePersonData = (count: number) => {
  const firstNames = ['Aria', 'Elias', 'Luna', 'Felix', 'Nova', 'Atlas', 'Iris', 'Jasper', 'Stella', 'Oscar'];
  const lastNames = ['Sterling', 'Blackwood', 'Montgomery', 'Fitzgerald', 'Ashworth'];
  const departments = ['Design', 'Engineering', 'Marketing', 'Sales', 'Operations'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    department: departments[i % departments.length],
    email: `${firstNames[i % firstNames.length].toLowerCase()}@company.com`,
    status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Remote' : 'On Leave',
  }));
};

const columns: ColumnDef[] = [
  { id: 'id', key: 'id', header: 'ID', width: 80, enableSorting: true },
  { id: 'name', key: 'name', header: 'Name', width: 200, enableSorting: true, enableGrouping: true },
  { id: 'department', key: 'department', header: 'Department', width: 150, enableSorting: true, enableGrouping: true },
  { id: 'email', key: 'email', header: 'Email', width: 250 },
  { id: 'status', key: 'status', header: 'Status', width: 120, enableGrouping: true },
];

export const DarkTheme: Story = {
  render: () => {
    const [groupingState, setGroupingState] = useState<GroupingState>({
      groupByColumns: [],
      expandedGroups: {},
    });
    const data = useMemo(() => generatePersonData(100), []);

    return (
      <div style={{ height: '700px', background: '#1a1a1a', padding: '2rem', borderRadius: '8px' }}>
        <div className="mb-4 p-4 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
          <h3 className="font-ui text-lg font-semibold text-white mb-2">🌙 Dark Theme</h3>
          <p className="font-ui text-sm text-gray-300">
            Complete dark theme perfect for dark mode applications.
          </p>
        </div>
        <DataGrid
          columns={columns}
          data={data}
          enableSorting
          enableGrouping
          groupingState={groupingState}
          onGroupingChange={setGroupingState}
          gridId="dark-theme"
          classes={{
            container: 'bg-gray-900 border border-gray-700 shadow-2xl',
            containerStyle: { borderRadius: '12px' },
            header: 'bg-gray-800 border-b border-gray-700',
            headerCell: 'text-gray-100 border-r border-gray-700',
            body: 'bg-gray-900',
            row: 'border-b border-gray-800 hover:bg-gray-800/50',
            cell: 'text-gray-200 border-r border-gray-800',
            groupManagerTrigger: 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-100',
            groupManagerContent: 'bg-gray-800 border-gray-600',
            groupManagerItem: 'hover:bg-gray-700 text-gray-200',
            columnManagerTrigger: 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-100',
            columnManagerContent: 'bg-gray-800 border-gray-600',
            columnManagerItem: 'hover:bg-gray-700 text-gray-200',
          }}
        />
      </div>
    );
  },
};

export const MinimalTheme: Story = {
  render: () => {
    const data = useMemo(() => generatePersonData(50), []);

    return (
      <div style={{ height: '700px', padding: '2rem', background: '#fff' }}>
        <div className="mb-4 p-4 bg-white rounded-lg border-2 border-black">
          <h3 className="font-ui text-lg font-semibold text-black mb-2">✨ Minimal Theme</h3>
          <p className="font-ui text-sm text-gray-800">
            Clean, minimal design with monochrome colors.
          </p>
        </div>
        <DataGrid
          columns={columns}
          data={data}
          enableSorting
          gridId="minimal-theme"
          classes={{
            container: 'bg-white border-0 shadow-none',
            header: 'bg-white border-b-2 border-black',
            headerCell: 'text-black font-bold border-r-0 uppercase text-xs tracking-wider',
            headerCellStyle: { padding: '1rem' },
            body: 'bg-white',
            row: 'border-b border-gray-200 hover:bg-gray-50',
            cell: 'text-gray-800 border-r-0',
            cellStyle: { padding: '1rem' },
            columnManagerTrigger: 'bg-black text-white border-0 hover:bg-gray-800 rounded-none font-bold uppercase text-xs',
            columnManagerTriggerStyle: {
              padding: '0.75rem 1.5rem',
              letterSpacing: '0.1em',
            },
            columnManagerContent: 'bg-white border-2 border-black shadow-xl rounded-none',
            columnManagerItem: 'hover:bg-black hover:text-white text-black font-medium',
          }}
        />
      </div>
    );
  },
};

export const PlayfulTheme: Story = {
  render: () => {
    const [groupingState, setGroupingState] = useState<GroupingState>({
      groupByColumns: [],
      expandedGroups: {},
    });
    const data = useMemo(() => generatePersonData(100), []);

    return (
      <div style={{ height: '700px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem', borderRadius: '16px' }}>
        <div className="mb-4 p-4 bg-white/90 backdrop-blur rounded-2xl shadow-2xl">
          <h3 className="font-ui text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">🎉 Playful Theme</h3>
          <p className="font-ui text-sm text-gray-700">
            Vibrant, colorful theme with gradients and playful styling.
          </p>
        </div>
        <DataGrid
          columns={columns}
          data={data}
          enableSorting
          enableGrouping
          groupingState={groupingState}
          onGroupingChange={setGroupingState}
          gridId="playful-theme"
          classes={{
            container: 'bg-white/90 backdrop-blur border-0 shadow-2xl',
            containerStyle: { borderRadius: '20px' },
            header: 'bg-gradient-to-r from-pink-400 to-purple-400 border-0',
            headerCell: 'text-white font-bold border-r border-white/20',
            headerCellStyle: { textShadow: '0 2px 4px rgba(0,0,0,0.1)' },
            body: 'bg-white',
            row: 'border-b border-purple-100 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50',
            cell: 'text-gray-800 border-r border-purple-100',
            groupManagerTrigger: 'bg-gradient-to-r from-yellow-400 to-orange-400 border-0 hover:from-yellow-500 hover:to-orange-500 text-white font-bold shadow-lg',
            groupManagerTriggerStyle: {
              borderRadius: '20px',
              padding: '0.75rem 1.5rem',
            },
            groupManagerContent: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-300 shadow-2xl',
            groupManagerContentStyle: { borderRadius: '16px' },
            groupManagerItem: 'hover:bg-gradient-to-r hover:from-yellow-200 hover:to-orange-200 text-gray-800 font-semibold',
            columnManagerTrigger: 'bg-gradient-to-r from-green-400 to-teal-400 border-0 hover:from-green-500 hover:to-teal-500 text-white font-bold shadow-lg',
            columnManagerTriggerStyle: {
              borderRadius: '20px',
              padding: '0.75rem 1.5rem',
            },
            columnManagerContent: 'bg-gradient-to-br from-green-50 to-teal-50 border-2 border-teal-300 shadow-2xl',
            columnManagerContentStyle: { borderRadius: '16px' },
            columnManagerItem: 'hover:bg-gradient-to-r hover:from-green-200 hover:to-teal-200 text-gray-800 font-semibold',
          }}
        />
      </div>
    );
  },
};
