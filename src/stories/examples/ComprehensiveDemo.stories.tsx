import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { DataGrid } from '../../DataGrid';
import type { ColumnDef, SortState, GroupingState } from '../../types';
import '../../index.css';

const generatePersonData = (count: number) => {
  const firstNames = ['Aria', 'Elias', 'Luna', 'Felix', 'Nova', 'Atlas', 'Iris', 'Jasper', 'Stella', 'Oscar'];
  const lastNames = ['Sterling', 'Blackwood', 'Montgomery', 'Fitzgerald', 'Ashworth', 'Kingsley', 'Beaumont', 'Hartwell', 'Sinclair', 'Windsor'];
  const departments = ['Design', 'Engineering', 'Marketing', 'Sales', 'Operations'];
  const statuses = ['Active', 'On Leave', 'Remote', 'In Office'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    email: `${firstNames[i % firstNames.length].toLowerCase()}.${lastNames[i % lastNames.length].toLowerCase()}@example.com`,
    department: departments[i % departments.length],
    status: statuses[i % statuses.length],
    salary: 60000 + Math.floor(Math.random() * 140000),
    joinDate: new Date(2018 + (i % 6), i % 12, (i % 28) + 1).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    projects: Math.floor(Math.random() * 10) + 1,
    performance: (Math.random() * 5).toFixed(1),
  }));
};

const peopleColumns: ColumnDef[] = [
  { id: 'id', key: 'id', header: 'ID', width: 80, enableSorting: true },
  { id: 'name', key: 'name', header: 'Full Name', width: 200, enableSorting: true, enableFiltering: true },
  { id: 'email', key: 'email', header: 'Email Address', width: 280, enableFiltering: true },
  { id: 'department', key: 'department', header: 'Department', width: 150, enableSorting: true, enableFiltering: true, enableGrouping: true },
  { id: 'status', key: 'status', header: 'Status', width: 120, enableSorting: true, enableGrouping: true },
  {
    id: 'salary',
    key: 'salary',
    header: 'Annual Salary',
    width: 150,
    enableSorting: true,
    render: (item) => `$${item.salary.toLocaleString()}`
  },
  { id: 'joinDate', key: 'joinDate', header: 'Join Date', width: 140 },
  { id: 'projects', key: 'projects', header: 'Projects', width: 100, enableSorting: true },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Examples/Comprehensive Demo',
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
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

export const AllFeatures: Story = {
  render: () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [sortState, setSortState] = useState<SortState | null>({ column: 'name', direction: 'asc' });
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
    const [groupingState, setGroupingState] = useState<GroupingState>({
      groupByColumns: [],
      expandedGroups: {},
    });
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
    const [selectedCell, setSelectedCell] = useState<{ rowId: string; columnId: string } | null>(null);
    const data = useMemo(() => generatePersonData(1000), []);

    return (
      <div style={{ height: '800px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">🎯 All Features Demo</h3>
          <div className="font-ui text-sm text-gray-600 space-y-1">
            <p>✨ <strong>Column Management:</strong> Show/hide columns, reset to defaults</p>
            <p>📊 <strong>Grouping:</strong> Group by Department or Status</p>
            <p>📏 <strong>Column Resize:</strong> Drag column edges to resize</p>
            <p>🔄 <strong>Column Reorder:</strong> Drag column headers to reorder</p>
            <p>🎯 <strong>Cell Selection:</strong> Click individual cells to select them</p>
            <p>📂 <strong>Expandable Rows:</strong> Click chevron icons to expand row details</p>
            <p>🔍 <strong>Sorting:</strong> Click headers to sort</p>
            <p>💾 <strong>Persistence:</strong> All settings saved to localStorage</p>
          </div>
        </div>
        <DataGrid
          gridId="comprehensive-demo"
          columns={peopleColumns}
          data={data}
          pagination={{
            pageIndex,
            pageSize,
            totalRows: data.length,
            onPageChange: setPageIndex,
            onPageSizeChange: (size) => {
              setPageSize(size);
              setPageIndex(0);
            },
            pageSizeOptions: [10, 25, 50, 100],
          }}
          virtualizationThreshold={20}
          enableSorting
          sortState={sortState}
          onSortChange={setSortState}
          enableColumnResize
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
          enableColumnReorder
          enableGrouping
          groupingState={groupingState}
          onGroupingChange={setGroupingState}
          enableExpandableRows
          expandedRows={expandedRows}
          onExpandedRowsChange={setExpandedRows}
          renderExpandedRow={(row) => (
            <div className="p-4 bg-gradient-to-br from-copper/10 to-copper/5 rounded-lg space-y-3">
              <h4 className="font-bold text-charcoal text-sm mb-2 border-b border-copper/20 pb-2">📋 Employee Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="font-semibold text-copper text-xs uppercase tracking-wide">Email</span>
                  <span className="text-charcoal mt-1">{row.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-copper text-xs uppercase tracking-wide">Projects</span>
                  <span className="text-charcoal mt-1">{row.projects} active projects</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-copper text-xs uppercase tracking-wide">Performance Rating</span>
                  <span className="text-charcoal mt-1">{row.performance}/5.0 ⭐</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-copper text-xs uppercase tracking-wide">Join Date</span>
                  <span className="text-charcoal mt-1">{row.joinDate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-copper text-xs uppercase tracking-wide">Annual Salary</span>
                  <span className="text-charcoal mt-1 text-lg font-bold">${row.salary.toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-copper text-xs uppercase tracking-wide">Status</span>
                  <span className="text-charcoal mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      row.status === 'Active' ? 'bg-green-100 text-green-800' :
                      row.status === 'Remote' ? 'bg-blue-100 text-blue-800' :
                      row.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {row.status}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}
          enableCellSelection
          selectedCell={selectedCell}
          onCellSelect={(rowId, columnId) => {
            setSelectedCell({ rowId, columnId });
          }}
          classes={{
            container: 'shadow-lg rounded-lg',
            header: 'font-semibold',
            row: 'transition-all duration-150',
          }}
        />
      </div>
    );
  },
};
