import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo, useEffect } from 'react';
import { DataGrid } from '../../DataGrid';
import type { ColumnDef, RowSelectionState } from '../../types';
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
  title: 'Features/Row Selection',
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

export const SingleRowSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const data = useMemo(() => generatePersonData(50), []);

    const handleRowClick = (item: any) => {
      const rowId = String(item.id);
      setSelectedRows((prev) => {
        // Toggle single row selection
        if (prev[rowId]) {
          const { [rowId]: _, ...rest } = prev;
          return rest;
        }
        return { [rowId]: true };
      });
    };

    const selectedCount = Object.keys(selectedRows).length;

    return (
      <div style={{ height: '700px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Single Row Selection</h3>
          <p className="font-ui text-sm text-gray-600 mb-2">
            Click on any row to select it. Selected rows will be highlighted with a copper accent.
          </p>
          <p className="font-ui text-sm text-gray-700 font-semibold">
            Selected rows: {selectedCount}
          </p>
        </div>
        <DataGrid
          gridId="single-row-selection"
          columns={peopleColumns}
          data={data}
          enableRowSelection
          selectedRows={selectedRows}
          onRowSelectionChange={setSelectedRows}
          onRowClick={handleRowClick}
        />
      </div>
    );
  },
};

export const MultiRowSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);
    const [mouseDownTime, setMouseDownTime] = useState<number>(0);
    const [dragAction, setDragAction] = useState<'select' | 'deselect'>('select');
    const [initialSelection, setInitialSelection] = useState<RowSelectionState>({});
    const [touchedRows, setTouchedRows] = useState<Set<string>>(new Set());
    const data = useMemo(() => generatePersonData(50), []);

    const handleRowClick = (item: any, index: number, event: React.MouseEvent<HTMLDivElement>) => {
      const rowId = String(item.id);

      // Check if this was a quick click (not a drag)
      const clickDuration = Date.now() - mouseDownTime;
      const wasQuickClick = clickDuration < 200 && touchedRows.size <= 1;

      // If we dragged (not a quick click), skip the click handler
      if (!wasQuickClick && touchedRows.size > 1) {
        return;
      }

      // Shift+click for range selection
      if (event.shiftKey && lastSelectedIndex !== null) {
        const start = Math.min(lastSelectedIndex, index);
        const end = Math.max(lastSelectedIndex, index);

        setSelectedRows((prev) => {
          const newSelection = { ...prev };
          for (let i = start; i <= end; i++) {
            newSelection[String(data[i].id)] = true;
          }
          return newSelection;
        });
        setLastSelectedIndex(index);
        return;
      }

      // For quick clicks, toggle normally (undo the mouseDown action if needed)
      if (wasQuickClick) {
        setSelectedRows((prev) => {
          if (prev[rowId]) {
            const { [rowId]: _, ...rest } = prev;
            return rest;
          }
          return { ...prev, [rowId]: true };
        });
        setLastSelectedIndex(index);
      }
    };

    const handleMouseDown = (item: any, index: number, event: React.MouseEvent<HTMLDivElement>) => {
      const rowId = String(item.id);

      setMouseDownTime(Date.now());
      setDragStartIndex(index);

      // Skip drag handling if Shift key is pressed (for Shift+Click range selection)
      if (event.shiftKey) {
        setIsDragging(false);
        return;
      }

      setIsDragging(true); // Start dragging immediately

      // Save the initial selection state
      setInitialSelection({ ...selectedRows });
      setTouchedRows(new Set());

      // Determine if we're selecting or deselecting based on the starting row
      const isCurrentlySelected = selectedRows[rowId];
      setDragAction(isCurrentlySelected ? 'deselect' : 'select');

      // Immediately apply action to the starting row
      setSelectedRows((prev) => {
        const newSelection = { ...prev };
        if (isCurrentlySelected) {
          delete newSelection[rowId];
        } else {
          newSelection[rowId] = true;
        }
        return newSelection;
      });

      // Mark starting row as touched
      setTouchedRows(new Set([rowId]));
      setLastSelectedIndex(index);
    };

    const handleMouseEnter = (_item: any, index: number) => {
      if (!isDragging || dragStartIndex === null) return;

      const currentIndex = index;

      // Calculate the range from drag start to current position
      const start = Math.min(dragStartIndex, currentIndex);
      const end = Math.max(dragStartIndex, currentIndex);

      setSelectedRows((_prev) => {
        const newSelection = { ...initialSelection }; // Start from initial state

        // Apply the drag action to all rows in the current range
        for (let i = start; i <= end; i++) {
          const rangeRowId = String(data[i].id);
          if (dragAction === 'select') {
            newSelection[rangeRowId] = true;
          } else {
            delete newSelection[rangeRowId];
          }
        }

        return newSelection;
      });

      // Update touched rows to match the current range
      setTouchedRows(new Set(
        Array.from({ length: end - start + 1 }, (_, i) => String(data[start + i].id))
      ));

      setLastSelectedIndex(index);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragStartIndex(null);
      setMouseDownTime(0);
      setInitialSelection({});
      setTouchedRows(new Set());
    };

    // Add global mouse up listener
    useEffect(() => {
      const handleGlobalMouseUp = () => handleMouseUp();
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, []);

    const selectedCount = Object.keys(selectedRows).length;
    const selectedIds = Object.keys(selectedRows).join(', ');

    return (
      <div style={{ height: '700px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Multi-Row Selection with Drag</h3>
          <p className="font-ui text-sm text-gray-600 mb-2">
            Click any row to select/deselect it. Hold Shift and click to select a range. Click and drag across rows to toggle selection (exactly like on mobile).
          </p>
          <p className="font-ui text-sm text-gray-700 font-semibold">
            Selected rows ({selectedCount}): {selectedIds || 'None'}
          </p>
        </div>
        <DataGrid
          gridId="multi-row-selection"
          columns={peopleColumns}
          data={data}
          enableRowSelection
          selectedRows={selectedRows}
          onRowSelectionChange={setSelectedRows}
          onRowClick={handleRowClick}
          onRowMouseDown={handleMouseDown}
          onRowMouseEnter={handleMouseEnter}
        />
      </div>
    );
  },
};

export const MultiRowWithModifier: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const data = useMemo(() => generatePersonData(50), []);

    const handleRowClick = (item: any, _index: number, event: React.MouseEvent<HTMLDivElement>) => {
      const rowId = String(item.id);

      setSelectedRows((prev) => {
        // Toggle row with Cmd/Ctrl for multi-select
        if (event.metaKey || event.ctrlKey) {
          if (prev[rowId]) {
            const { [rowId]: _, ...rest } = prev;
            return rest;
          }
          return { ...prev, [rowId]: true };
        }

        // Single selection without modifier
        if (prev[rowId]) {
          return {};
        }
        return { [rowId]: true };
      });
    };

    const selectedCount = Object.keys(selectedRows).length;
    const selectedIds = Object.keys(selectedRows).join(', ');

    return (
      <div style={{ height: '700px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Multi-Row Selection with Modifier</h3>
          <p className="font-ui text-sm text-gray-600 mb-2">
            Click to select a single row (replaces previous selection). Hold Cmd (Mac) or Ctrl (Windows) and click to add/remove rows from selection.
          </p>
          <p className="font-ui text-sm text-gray-700 font-semibold">
            Selected rows ({selectedCount}): {selectedIds || 'None'}
          </p>
        </div>
        <DataGrid
          gridId="multi-row-modifier-selection"
          columns={peopleColumns}
          data={data}
          enableRowSelection
          selectedRows={selectedRows}
          onRowSelectionChange={setSelectedRows}
          onRowClick={handleRowClick}
        />
      </div>
    );
  },
};

export const PreselectedRows: Story = {
  render: () => {
    const data = useMemo(() => generatePersonData(50), []);
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({
      '2': true,
      '5': true,
      '8': true,
    });

    const handleRowClick = (item: any) => {
      const rowId = String(item.id);
      setSelectedRows((prev) => {
        if (prev[rowId]) {
          const { [rowId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [rowId]: true };
      });
    };

    const selectedCount = Object.keys(selectedRows).length;
    const selectedIds = Object.keys(selectedRows).join(', ');

    return (
      <div style={{ height: '700px' }}>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Preselected Rows</h3>
          <p className="font-ui text-sm text-gray-600 mb-2">
            Rows can be preselected on initial render. Click rows to toggle selection.
          </p>
          <p className="font-ui text-sm text-gray-700 font-semibold">
            Selected rows ({selectedCount}): {selectedIds}
          </p>
        </div>
        <DataGrid
          gridId="preselected-rows"
          columns={peopleColumns}
          data={data}
          enableRowSelection
          selectedRows={selectedRows}
          onRowSelectionChange={setSelectedRows}
          onRowClick={handleRowClick}
        />
      </div>
    );
  },
};
