import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { DataGrid } from '../../DataGrid';
import type { ColumnDef } from '../../types';
import '../../index.css';

const generatePersonData = (count: number) => {
  const firstNames = ['Aria', 'Elias', 'Luna', 'Felix', 'Nova', 'Atlas', 'Iris', 'Jasper', 'Stella', 'Oscar'];
  const lastNames = ['Sterling', 'Blackwood', 'Montgomery', 'Fitzgerald', 'Ashworth'];
  const departments = ['Design', 'Engineering', 'Marketing', 'Sales', 'Operations'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    email: `${firstNames[i % firstNames.length].toLowerCase()}@example.com`,
    department: departments[i % departments.length],
    salary: 60000 + (i * 1000),
    projects: (i % 10) + 1,
  }));
};

const peopleColumns: ColumnDef[] = [
  { id: 'id', key: 'id', header: 'ID', width: 80 },
  { id: 'name', key: 'name', header: 'Name', width: 200 },
  { id: 'email', key: 'email', header: 'Email', width: 250 },
  { id: 'department', key: 'department', header: 'Department', width: 150 },
  {
    id: 'salary',
    key: 'salary',
    header: 'Salary',
    width: 150,
    render: (item) => `$${item.salary.toLocaleString()}`
  },
  { id: 'projects', key: 'projects', header: 'Projects', width: 100 },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Features/Cell Selection',
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

export const CellSelection: Story = {
  render: () => {
    const [selectedCell, setSelectedCell] = useState<{ rowId: string; columnId: string } | null>(null);
    const data = useMemo(() => generatePersonData(50), []);

    return (
      <div style={{ height: '700px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Cell Selection</h3>
          <p className="font-ui text-sm text-gray-600">
            Click individual cells to select them. Selected cell: {selectedCell ? `Row ${selectedCell.rowId}, Column ${selectedCell.columnId}` : 'None'}
          </p>
        </div>
        <DataGrid
          gridId="cell-selection"
          columns={peopleColumns}
          data={data}
          enableCellSelection
          selectedCell={selectedCell}
          onCellSelect={(rowId, columnId) => setSelectedCell({ rowId, columnId })}
        />
      </div>
    );
  },
};
