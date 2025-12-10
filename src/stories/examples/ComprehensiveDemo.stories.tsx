import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { DataGrid } from '../../DataGrid';
import type { ColumnDef, SortState, GroupingState, FilterState } from '../../types';
import { Download, Copy, Star } from 'lucide-react';
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
  {
    id: 'id',
    key: 'id',
    header: 'ID',
    width: 80,
    enableSorting: true
  },
  {
    id: 'name',
    key: 'name',
    header: 'Full Name',
    width: 200,
    enableSorting: true,
    enableFiltering: true,
    enableColumnMenu: true,
    columnMenuItems: [
      {
        id: 'copy-names',
        label: 'Copy Names',
        icon: <Copy className="w-3 h-3" />,
        onClick: (columnId) => {
          console.log(`Copying all names from ${columnId}`);
        },
        shortcut: '⌘C',
      },
      {
        id: 'export-names',
        label: 'Export Names',
        icon: <Download className="w-3 h-3" />,
        onClick: (columnId) => {
          console.log(`Exporting ${columnId}`);
        },
        separator: true,
      },
    ],
  },
  {
    id: 'email',
    key: 'email',
    header: 'Email Address',
    width: 280,
    enableFiltering: true
  },
  {
    id: 'department',
    key: 'department',
    header: 'Department',
    width: 150,
    enableSorting: true,
    enableFiltering: true,
    enableGrouping: true,
    enableColumnMenu: true,
  },
  {
    id: 'status',
    key: 'status',
    header: 'Status',
    width: 120,
    enableSorting: true,
    enableGrouping: true,
    enableColumnMenu: true,
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          item.status === 'Active' ? 'bg-green-100 text-green-800' :
          item.status === 'Remote' ? 'bg-blue-100 text-blue-800' :
          item.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}
      >
        {item.status}
      </span>
    ),
  },
  {
    id: 'salary',
    key: 'salary',
    header: 'Annual Salary',
    width: 150,
    enableSorting: true,
    enableColumnMenu: true,
    render: (item) => `$${item.salary.toLocaleString()}`,
    columnMenuItems: [
      {
        id: 'highlight-high',
        label: 'Highlight High Earners',
        icon: <Star className="w-3 h-3" />,
        onClick: () => console.log('Highlighting high earners'),
      },
    ],
  },
  {
    id: 'joinDate',
    key: 'joinDate',
    header: 'Join Date',
    width: 140
  },
  {
    id: 'projects',
    key: 'projects',
    header: 'Projects',
    width: 100,
    enableSorting: true
  },
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
    const [filterState, setFilterState] = useState<FilterState>({});
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
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">🎯 Comprehensive Feature Demo</h3>
          <div className="font-ui text-sm text-gray-600 space-y-1">
            <p>✨ <strong>Column Management:</strong> Show/hide columns, reset to defaults</p>
            <p>📊 <strong>Grouping:</strong> Group by Department or Status using the Group Manager</p>
            <p>📏 <strong>Column Resize:</strong> Drag column edges to resize widths</p>
            <p>🔄 <strong>Column Reorder:</strong> Drag and drop column headers to reorder</p>
            <p>🎯 <strong>Cell Selection:</strong> Click individual cells to select them</p>
            <p>📂 <strong>Expandable Rows:</strong> Click chevron icons to expand/collapse row details</p>
            <p>🔍 <strong>Sorting:</strong> Click column headers to sort data (asc/desc/none)</p>
            <p>🔎 <strong>Column Filtering:</strong> Use filter buttons in column headers (compact Radix Popover)</p>
            <p>⚙️ <strong>Column Menu:</strong> Click three-dot menu for column-specific actions with custom items</p>
            <p>📄 <strong>Pagination:</strong> Navigate through pages with configurable page sizes</p>
            <p>⚡ <strong>Virtualization:</strong> Efficient rendering for 1000+ rows</p>
            <p>💾 <strong>Persistence:</strong> All settings automatically saved to localStorage</p>
            <p>🎨 <strong>Custom Rendering:</strong> Status badges and salary formatting</p>
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
          enableFiltering
          filterState={filterState}
          onFilterChange={setFilterState}
          enableColumnMenu
          defaultColumnMenuItems={[
            {
              id: 'export',
              label: 'Export Column',
              icon: <Download className="w-3 h-3" />,
              onClick: (columnId) => {
                console.log(`Exporting column: ${columnId}`);
              },
              shortcut: '⌘E',
            },
          ]}
          onColumnAction={(action, columnId) => {
            console.log(`Column action: ${action} on ${columnId}`);
          }}
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
            <div className="relative overflow-hidden">
              {/* Elegant background with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100/50" />

              {/* Decorative accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-copper via-copper-dark to-copper" />

              {/* Content */}
              <div className="relative px-6 py-5">
                {/* Header with icon */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-copper to-copper-dark flex items-center justify-center text-white text-sm font-bold">
                    {row.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <h4 className="text-base font-bold text-gray-900">Employee Profile</h4>
                </div>

                {/* Details grid with refined spacing and typography */}
                <div className="grid grid-cols-3 gap-x-8 gap-y-5">
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</span>
                    <span className="text-sm text-gray-900 font-medium">{row.email}</span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Projects</span>
                    <span className="text-sm text-gray-900 font-medium">{row.projects} projects</span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Join Date</span>
                    <span className="text-sm text-gray-900 font-medium">{row.joinDate}</span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Performance</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900 font-medium">{row.performance} / 5.0</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${i < Math.floor(parseFloat(row.performance)) ? 'text-amber-500' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Annual Salary</span>
                    <span className="text-lg text-gray-900 font-bold">${row.salary.toLocaleString()}</span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Employment Status</span>
                    <span className={`inline-flex items-center w-fit px-3 py-1 rounded-full text-xs font-bold ${
                      row.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      row.status === 'Remote' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      row.status === 'On Leave' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                      {row.status}
                    </span>
                  </div>
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
