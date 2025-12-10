import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { DataGrid } from '../../DataGrid';
import type { ColumnDef } from '../../types';
import '../../index.css';

const generatePersonData = (count: number) => {
  const firstNames = ['Aria', 'Elias', 'Luna', 'Felix', 'Nova', 'Atlas', 'Iris', 'Jasper'];
  const lastNames = ['Sterling', 'Blackwood', 'Montgomery', 'Fitzgerald'];
  const departments = ['Design', 'Engineering', 'Marketing', 'Sales'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    email: `${firstNames[i % firstNames.length].toLowerCase()}@example.com`,
    department: departments[i % departments.length],
    salary: 60000 + (i * 1500),
    projects: (i % 10) + 1,
    performance: ((i % 50) / 10).toFixed(1),
    joinDate: new Date(2018 + (i % 6), i % 12, (i % 28) + 1).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
  }));
};

const peopleColumns: ColumnDef[] = [
  { id: 'id', key: 'id', header: 'ID', width: 80 },
  { id: 'name', key: 'name', header: 'Name', width: 200, enableSorting: true },
  { id: 'department', key: 'department', header: 'Department', width: 150 },
  { id: 'email', key: 'email', header: 'Email', width: 250 },
  {
    id: 'salary',
    key: 'salary',
    header: 'Salary',
    width: 150,
    render: (item) => `$${item.salary.toLocaleString()}`
  },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Features/Expandable Rows',
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

export const BasicExpanded: Story = {
  render: () => {
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
    const data = useMemo(() => generatePersonData(50), []);

    return (
      <div style={{ height: '700px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Expandable Rows</h3>
          <p className="font-ui text-sm text-gray-600">
            Click the chevron icon in the first column to expand row details.
          </p>
        </div>
        <DataGrid
          gridId="expandable-rows"
          columns={peopleColumns}
          data={data}
          enableExpandableRows
          expandedRows={expandedRows}
          onExpandedRowsChange={setExpandedRows}
          renderExpandedRow={(row) => (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold">Email:</span> {row.email}
                </div>
                <div>
                  <span className="font-semibold">Projects:</span> {row.projects}
                </div>
                <div>
                  <span className="font-semibold">Performance:</span> {row.performance}/5.0
                </div>
                <div>
                  <span className="font-semibold">Join Date:</span> {row.joinDate}
                </div>
              </div>
            </div>
          )}
          virtualizationThreshold={100}
        />
      </div>
    );
  },
};

export const ExpandedWithVirtualization: Story = {
  render: () => {
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
    const data = useMemo(() => generatePersonData(200), []);

    return (
      <div style={{ height: '700px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Expandable Rows + Virtualization</h3>
          <p className="font-ui text-sm text-gray-600">
            200 rows with expandable content. Virtualization handles dynamic heights automatically.
          </p>
        </div>
        <DataGrid
          gridId="expandable-virtualized"
          columns={peopleColumns}
          data={data}
          enableExpandableRows
          expandedRows={expandedRows}
          onExpandedRowsChange={setExpandedRows}
          renderExpandedRow={(row) => (
            <div className="p-4 space-y-3 bg-gradient-to-br from-copper/5 to-copper/10 rounded-lg">
              <h4 className="font-bold text-charcoal mb-2">Employee Details</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-copper">Email:</span>
                  <p className="text-charcoal">{row.email}</p>
                </div>
                <div>
                  <span className="font-semibold text-copper">Projects:</span>
                  <p className="text-charcoal">{row.projects} active</p>
                </div>
                <div>
                  <span className="font-semibold text-copper">Performance:</span>
                  <p className="text-charcoal">{row.performance}/5.0 ⭐</p>
                </div>
                <div>
                  <span className="font-semibold text-copper">Join Date:</span>
                  <p className="text-charcoal">{row.joinDate}</p>
                </div>
                <div>
                  <span className="font-semibold text-copper">Department:</span>
                  <p className="text-charcoal">{row.department}</p>
                </div>
                <div>
                  <span className="font-semibold text-copper">Salary:</span>
                  <p className="text-charcoal">${row.salary.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
          virtualizationThreshold={20}
        />
      </div>
    );
  },
};
