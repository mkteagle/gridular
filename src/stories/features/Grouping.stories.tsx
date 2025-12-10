import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { DataGrid } from '../../DataGrid';
import type { ColumnDef, GroupingState } from '../../types';
import '../../index.css';

const generatePersonData = (count: number) => {
  const firstNames = ['Aria', 'Elias', 'Luna', 'Felix', 'Nova', 'Atlas', 'Iris', 'Jasper', 'Stella', 'Oscar'];
  const lastNames = ['Sterling', 'Blackwood', 'Montgomery', 'Fitzgerald', 'Ashworth'];
  const departments = ['Design', 'Engineering', 'Marketing', 'Sales', 'Operations'];
  const statuses = ['Active', 'On Leave', 'Remote', 'In Office'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    email: `${firstNames[i % firstNames.length].toLowerCase()}@example.com`,
    department: departments[i % departments.length],
    status: statuses[i % statuses.length],
    salary: 60000 + (i * 1000),
  }));
};

const peopleColumns: ColumnDef[] = [
  { id: 'id', key: 'id', header: 'ID', width: 80, enableSorting: true },
  { id: 'name', key: 'name', header: 'Name', width: 200, enableSorting: true },
  { id: 'department', key: 'department', header: 'Department', width: 150, enableSorting: true, enableGrouping: true },
  { id: 'status', key: 'status', header: 'Status', width: 120, enableSorting: true, enableGrouping: true },
  { id: 'email', key: 'email', header: 'Email', width: 250 },
  {
    id: 'salary',
    key: 'salary',
    header: 'Salary',
    width: 150,
    enableSorting: true,
    render: (item) => `$${item.salary.toLocaleString()}`
  },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Features/Grouping',
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

export const BasicGrouping: Story = {
  render: () => {
    const [groupingState, setGroupingState] = useState<GroupingState>({
      groupByColumns: ['department'],
      expandedGroups: {},
    });
    const data = useMemo(() => generatePersonData(100), []);

    return (
      <div style={{ height: '700px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Data Grouping</h3>
          <p className="font-ui text-sm text-gray-600">
            Group data by Department. Click group headers to expand/collapse. Use the "Group by" button to change grouping.
          </p>
        </div>
        <DataGrid
          gridId="grouping-example"
          columns={peopleColumns}
          data={data}
          enableSorting
          enableGrouping
          groupingState={groupingState}
          onGroupingChange={setGroupingState}
          virtualizationThreshold={20}
        />
      </div>
    );
  },
};

export const MultiLevelGrouping: Story = {
  render: () => {
    const [groupingState, setGroupingState] = useState<GroupingState>({
      groupByColumns: ['department', 'status'],
      expandedGroups: {},
    });
    const data = useMemo(() => generatePersonData(100), []);

    return (
      <div style={{ height: '700px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Multi-Level Grouping</h3>
          <p className="font-ui text-sm text-gray-600">
            Group by Department, then by Status. Creates a hierarchical structure with nested groups.
          </p>
        </div>
        <DataGrid
          gridId="multi-level-grouping"
          columns={peopleColumns}
          data={data}
          enableSorting
          enableGrouping
          groupingState={groupingState}
          onGroupingChange={setGroupingState}
          virtualizationThreshold={20}
        />
      </div>
    );
  },
};

export const GroupingWithVirtualization: Story = {
  render: () => {
    const [groupingState, setGroupingState] = useState<GroupingState>({
      groupByColumns: ['department'],
      expandedGroups: {},
    });
    const data = useMemo(() => generatePersonData(500), []);

    return (
      <div style={{ height: '700px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Grouping + Virtualization (500 rows)</h3>
          <p className="font-ui text-sm text-gray-600">
            Large dataset with grouping enabled. Virtualization handles both group rows and data rows efficiently.
          </p>
        </div>
        <DataGrid
          gridId="grouping-virtualized"
          columns={peopleColumns}
          data={data}
          enableSorting
          enableGrouping
          groupingState={groupingState}
          onGroupingChange={setGroupingState}
          virtualizationThreshold={20}
        />
      </div>
    );
  },
};
