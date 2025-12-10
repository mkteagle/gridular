import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid } from '../../DataGrid';
import { useState } from 'react';
import { Download, Copy, Trash2, Settings, Archive, Star, Share2, FileText, Sparkles } from 'lucide-react';
import type { ColumnDef, FilterState } from '../../types';
import { cn } from '../../lib/utils';

const meta: Meta<typeof DataGrid> = {
  title: 'Features/Column Menu',
  component: DataGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

const products: Product[] = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, stock: 45, status: 'Active' },
  { id: 2, name: 'Wireless Mouse', category: 'Electronics', price: 29, stock: 120, status: 'Active' },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 399, stock: 8, status: 'Low Stock' },
  { id: 4, name: 'Monitor 4K', category: 'Electronics', price: 599, stock: 0, status: 'Out of Stock' },
  { id: 5, name: 'Keyboard Mechanical', category: 'Electronics', price: 149, stock: 67, status: 'Active' },
  { id: 6, name: 'Standing Desk', category: 'Furniture', price: 799, stock: 15, status: 'Active' },
  { id: 7, name: 'Webcam HD', category: 'Electronics', price: 89, stock: 0, status: 'Out of Stock' },
  { id: 8, name: 'Desk Lamp', category: 'Furniture', price: 49, stock: 200, status: 'Active' },
];

const columns: ColumnDef<Product>[] = [
  {
    id: 'name',
    header: 'Product Name',
    key: 'name',
    width: 200,
  },
  {
    id: 'category',
    header: 'Category',
    key: 'category',
    width: 150,
  },
  {
    id: 'price',
    header: 'Price',
    key: 'price',
    width: 120,
    renderCell: (row) => `$${row.price.toLocaleString()}`,
  },
  {
    id: 'stock',
    header: 'Stock',
    key: 'stock',
    width: 100,
  },
  {
    id: 'status',
    header: 'Status',
    key: 'status',
    width: 140,
    renderCell: (row) => (
      <span
        className={`px-2 py-0.5 rounded text-xs font-semibold ${
          row.status === 'Active'
            ? 'bg-green-100 text-green-800'
            : row.status === 'Low Stock'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

/**
 * Basic overflow menu with filter and hide column options.
 */
export const BasicOverflowMenu: Story = {
  render: () => {
    const [filterState, setFilterState] = useState<FilterState>({});

    return (
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Column Overflow Menu</h2>
          <p className="text-gray-600 mb-4">
            Click the three-dot menu icon in any column header to access column actions:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
            <li><strong>Filter:</strong> Opens a submenu with filter input (if filtering is enabled)</li>
            <li><strong>Hide Column:</strong> Hides the column (can be shown again from the Column Manager)</li>
          </ul>
        </div>
        <div style={{ height: '600px' }}>
          <DataGrid
            columns={columns}
            data={products}
            enableFiltering={true}
            enableColumnMenu={true}
            filterState={filterState}
            onFilterChange={setFilterState}
            enableSorting={true}
            rowHeight={60}
          />
        </div>
      </div>
    );
  },
};

/**
 * Custom menu items per column and globally.
 */
export const CustomMenuItems: Story = {
  render: () => {
    const [filterState, setFilterState] = useState<FilterState>({});
    const [message, setMessage] = useState<string>('');

    const customColumns: ColumnDef<Product>[] = [
      {
        ...columns[0],
        columnMenuItems: [
          {
            id: 'copy',
            label: 'Copy Names',
            icon: <Copy className="w-3 h-3" />,
            onClick: (columnId) => {
              setMessage(`Copied all values from ${columnId}`);
              setTimeout(() => setMessage(''), 2000);
            },
          },
        ],
      },
      ...columns.slice(1, 3),
      {
        ...columns[3],
        columnMenuItems: [
          {
            id: 'export',
            label: 'Export Stock Data',
            icon: <Download className="w-3 h-3" />,
            onClick: (columnId) => {
              setMessage(`Exporting ${columnId} data...`);
              setTimeout(() => setMessage(''), 2000);
            },
          },
          {
            id: 'clear',
            label: 'Clear Zero Stock',
            icon: <Trash2 className="w-3 h-3" />,
            onClick: (columnId) => {
              setMessage(`Clearing zero stock items from ${columnId}`);
              setTimeout(() => setMessage(''), 2000);
            },
            danger: true,
          },
        ],
      },
      columns[4],
    ];

    return (
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Custom Column Menu Items</h2>
          <p className="text-gray-600 mb-4">
            Each column can have custom menu items with icons and actions:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
            <li><strong>Product Name:</strong> "Copy Names" option</li>
            <li><strong>Stock:</strong> "Export Stock Data" and "Clear Zero Stock" (danger) options</li>
          </ul>
          {message && (
            <div className="p-3 bg-green-50 border border-green-200 rounded mb-4">
              <span className="text-green-900 text-sm font-medium">{message}</span>
            </div>
          )}
        </div>
        <div style={{ height: '600px' }}>
          <DataGrid
            columns={customColumns}
            data={products}
            enableFiltering={true}
            enableColumnMenu={true}
            filterState={filterState}
            onFilterChange={setFilterState}
            onColumnAction={(action, columnId) => {
              console.log('Column action:', action, 'on column:', columnId);
            }}
            enableSorting={true}
            rowHeight={60}
          />
        </div>
      </div>
    );
  },
};

/**
 * Global default menu items that appear on all columns.
 */
export const GlobalMenuItems: Story = {
  render: () => {
    const [filterState, setFilterState] = useState<FilterState>({});
    const [message, setMessage] = useState<string>('');

    return (
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Global Default Menu Items</h2>
          <p className="text-gray-600 mb-4">
            Use <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">defaultColumnMenuItems</code> to add
            actions that appear on all columns.
          </p>
          {message && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded mb-4">
              <span className="text-blue-900 text-sm font-medium">{message}</span>
            </div>
          )}
        </div>
        <div style={{ height: '600px' }}>
          <DataGrid
            columns={columns}
            data={products}
            enableFiltering={true}
            enableColumnMenu={true}
            defaultColumnMenuItems={[
              {
                id: 'export',
                label: 'Export Column',
                icon: <Download className="w-3 h-3" />,
                onClick: (columnId) => {
                  setMessage(`Exporting ${columnId} data...`);
                  setTimeout(() => setMessage(''), 2000);
                },
              },
              {
                id: 'copy',
                label: 'Copy Column',
                icon: <Copy className="w-3 h-3" />,
                onClick: (columnId) => {
                  setMessage(`Copied ${columnId} to clipboard`);
                  setTimeout(() => setMessage(''), 2000);
                },
              },
            ]}
            filterState={filterState}
            onFilterChange={setFilterState}
            onColumnAction={(action, columnId) => {
              console.log('Global action:', action, 'on column:', columnId);
            }}
            enableSorting={true}
            rowHeight={60}
          />
        </div>
      </div>
    );
  },
};

/**
 * Custom filter menu rendering per column.
 */
export const CustomFilterMenu: Story = {
  render: () => {
    const [filterState, setFilterState] = useState<FilterState>({});

    const customColumns: ColumnDef<Product>[] = [
      ...columns.slice(0, 2),
      {
        ...columns[2],
        renderFilterMenu: ({ filterValue, onFilterChange, onClose }) => (
          <div className="p-3 space-y-2">
            <div className="text-xs font-bold text-charcoal mb-2">Price Range</div>
            <div className="space-y-2">
              {['0-50', '50-200', '200-500', '500+'].map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    onFilterChange(range);
                    onClose();
                  }}
                  className={cn(
                    'w-full px-2 py-1.5 text-left text-xs rounded',
                    'hover:bg-copper/10 transition-colors',
                    filterValue === range && 'bg-copper/20 font-bold'
                  )}
                >
                  ${range}
                </button>
              ))}
            </div>
          </div>
        ),
        filterFn: (row, _, filterValue) => {
          if (!filterValue) return true;
          const price = row.price;
          if (filterValue === '0-50') return price <= 50;
          if (filterValue === '50-200') return price > 50 && price <= 200;
          if (filterValue === '200-500') return price > 200 && price <= 500;
          if (filterValue === '500+') return price > 500;
          return true;
        },
      },
      ...columns.slice(3),
    ];

    return (
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Custom Filter Menu Rendering</h2>
          <p className="text-gray-600 mb-4">
            The Price column has a custom filter menu with preset price ranges instead of a text input.
            Use <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">renderFilterMenu</code> per column
            or globally to customize the filter UI.
          </p>
        </div>
        <div style={{ height: '600px' }}>
          <DataGrid
            columns={customColumns}
            data={products}
            enableFiltering={true}
            enableColumnMenu={true}
            filterState={filterState}
            onFilterChange={setFilterState}
            enableSorting={true}
            rowHeight={60}
          />
        </div>
      </div>
    );
  },
};

/**
 * Menu items with nested submenus and keyboard shortcuts.
 */
export const SubMenusAndShortcuts: Story = {
  render: () => {
    const [filterState, setFilterState] = useState<FilterState>({});
    const [message, setMessage] = useState<string>('');

    const showMessage = (msg: string) => {
      setMessage(msg);
      setTimeout(() => setMessage(''), 2500);
    };

    const customColumns: ColumnDef<Product>[] = [
      {
        ...columns[0],
        columnMenuItems: [
          {
            id: 'export',
            label: 'Export',
            icon: <Download className="w-3 h-3" />,
            onClick: () => {},
            subMenu: [
              {
                id: 'export-csv',
                label: 'Export as CSV',
                icon: <FileText className="w-3 h-3" />,
                onClick: () => showMessage('Exporting as CSV...'),
                shortcut: '⌘E',
              },
              {
                id: 'export-json',
                label: 'Export as JSON',
                icon: <FileText className="w-3 h-3" />,
                onClick: () => showMessage('Exporting as JSON...'),
                shortcut: '⌘J',
              },
              {
                id: 'export-excel',
                label: 'Export as Excel',
                icon: <FileText className="w-3 h-3" />,
                onClick: () => showMessage('Exporting as Excel...'),
              },
            ],
          },
          {
            id: 'share',
            label: 'Share',
            icon: <Share2 className="w-3 h-3" />,
            onClick: () => {},
            separator: true,
            subMenu: [
              {
                id: 'share-link',
                label: 'Copy Link',
                icon: <Copy className="w-3 h-3" />,
                onClick: () => showMessage('Link copied to clipboard'),
                shortcut: '⌘L',
              },
              {
                id: 'share-email',
                label: 'Send via Email',
                onClick: () => showMessage('Opening email client...'),
              },
            ],
          },
          {
            id: 'favorite',
            label: 'Add to Favorites',
            icon: <Star className="w-3 h-3" />,
            onClick: () => showMessage('Added to favorites'),
            shortcut: '⌘F',
          },
        ],
      },
      ...columns.slice(1, 3),
      {
        ...columns[3],
        columnMenuItems: [
          {
            id: 'settings',
            label: 'Column Settings',
            icon: <Settings className="w-3 h-3" />,
            onClick: () => {},
            subMenu: [
              {
                id: 'format',
                label: 'Number Format',
                onClick: () => {},
                subMenu: [
                  {
                    id: 'format-number',
                    label: 'Standard',
                    onClick: () => showMessage('Format: Standard'),
                  },
                  {
                    id: 'format-compact',
                    label: 'Compact (1.2K)',
                    onClick: () => showMessage('Format: Compact'),
                  },
                  {
                    id: 'format-full',
                    label: 'Full (1,234)',
                    onClick: () => showMessage('Format: Full'),
                  },
                ],
              },
              {
                id: 'align',
                label: 'Alignment',
                separator: true,
                onClick: () => {},
                subMenu: [
                  {
                    id: 'align-left',
                    label: 'Left',
                    onClick: () => showMessage('Alignment: Left'),
                  },
                  {
                    id: 'align-center',
                    label: 'Center',
                    onClick: () => showMessage('Alignment: Center'),
                  },
                  {
                    id: 'align-right',
                    label: 'Right',
                    onClick: () => showMessage('Alignment: Right'),
                  },
                ],
              },
            ],
          },
          {
            id: 'highlight',
            label: 'Highlight Low Stock',
            icon: <Sparkles className="w-3 h-3" />,
            onClick: () => showMessage('Highlighting items with stock < 10'),
            separator: true,
          },
          {
            id: 'archive',
            label: 'Archive Zero Stock',
            icon: <Archive className="w-3 h-3" />,
            onClick: () => showMessage('Archiving zero stock items'),
            danger: true,
          },
        ],
      },
      columns[4],
    ];

    return (
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Submenus & Keyboard Shortcuts</h2>
          <p className="text-gray-600 mb-4">
            Menu items support nested submenus (with ChevronRight indicators), keyboard shortcuts display, and separators.
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
            <li><strong>Product Name:</strong> Export submenu, Share submenu, Add to Favorites with shortcuts</li>
            <li><strong>Stock:</strong> Nested settings menu (format → alignment), highlight and archive actions</li>
          </ul>
          {message && (
            <div className="p-3 bg-purple-50 border border-purple-200 rounded mb-4 animate-in fade-in slide-in-from-top-2">
              <span className="text-purple-900 text-sm font-medium">{message}</span>
            </div>
          )}
        </div>
        <div style={{ height: '600px' }}>
          <DataGrid
            columns={customColumns}
            data={products}
            enableFiltering={true}
            enableColumnMenu={true}
            filterState={filterState}
            onFilterChange={setFilterState}
            enableSorting={true}
            rowHeight={60}
          />
        </div>
      </div>
    );
  },
};

/**
 * Fully custom column menu rendering per column.
 */
export const FullyCustomMenu: Story = {
  render: () => {
    const [filterState, setFilterState] = useState<FilterState>({});
    const [message, setMessage] = useState<string>('');

    const customColumns: ColumnDef<Product>[] = [
      ...columns.slice(0, 2),
      {
        ...columns[2],
        renderColumnMenu: ({ defaultItems }) => (
          <div className="p-2">
            <div className="px-2 py-1.5 mb-2">
              <div className="text-[10px] font-bold text-copper uppercase tracking-wider">Price Actions</div>
            </div>

            <button
              onClick={() => {
                setMessage('Bulk price update initiated');
                setTimeout(() => setMessage(''), 2500);
              }}
              className="w-full px-2.5 py-2 text-left text-xs rounded-md bg-gradient-to-r from-copper/10 to-copper-dark/10 hover:from-copper/20 hover:to-copper-dark/20 transition-all mb-1.5"
            >
              <div className="font-bold text-copper mb-0.5">Bulk Price Update</div>
              <div className="text-[10px] text-charcoal/60">Update prices for all items</div>
            </button>

            <button
              onClick={() => {
                setMessage('Price history opened');
                setTimeout(() => setMessage(''), 2500);
              }}
              className="w-full px-2.5 py-2 text-left text-xs rounded-md hover:bg-copper/5 transition-colors mb-1.5"
            >
              <div className="font-medium text-charcoal">View Price History</div>
              <div className="text-[10px] text-charcoal/50">See pricing trends over time</div>
            </button>

            <div className="h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent my-2" />

            {defaultItems.filter}
            {defaultItems.hideColumn}
          </div>
        ),
      },
      ...columns.slice(3),
    ];

    return (
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Fully Custom Column Menu</h2>
          <p className="text-gray-600 mb-4">
            Use <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">renderColumnMenu</code> to completely
            customize the menu UI while still using default items like Filter and Hide Column.
          </p>
          {message && (
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded mb-4">
              <span className="text-indigo-900 text-sm font-medium">{message}</span>
            </div>
          )}
        </div>
        <div style={{ height: '600px' }}>
          <DataGrid
            columns={customColumns}
            data={products}
            enableFiltering={true}
            enableColumnMenu={true}
            filterState={filterState}
            onFilterChange={setFilterState}
            enableSorting={true}
            rowHeight={60}
          />
        </div>
      </div>
    );
  },
};

/**
 * Custom trigger button for the column menu.
 */
export const CustomTrigger: Story = {
  render: () => {
    const [filterState, setFilterState] = useState<FilterState>({});

    return (
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Custom Menu Trigger</h2>
          <p className="text-gray-600 mb-4">
            Use <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">renderColumnMenuTrigger</code> to
            customize the menu trigger button appearance.
          </p>
        </div>
        <div style={{ height: '600px' }}>
          <DataGrid
            columns={columns}
            data={products}
            enableFiltering={true}
            enableColumnMenu={true}
            renderColumnMenuTrigger={({ column }) => (
              <button
                onClick={(e) => e.stopPropagation()}
                className="px-2 py-1 rounded-full bg-copper/20 hover:bg-copper/30 transition-all active:scale-95"
                title={`Options for ${column.header}`}
              >
                <Settings className="w-3 h-3 text-copper" />
              </button>
            )}
            defaultColumnMenuItems={[
              {
                id: 'export',
                label: 'Export Column',
                icon: <Download className="w-3 h-3" />,
                onClick: () => {},
                shortcut: '⌘E',
              },
            ]}
            filterState={filterState}
            onFilterChange={setFilterState}
            enableSorting={true}
            rowHeight={60}
          />
        </div>
      </div>
    );
  },
};
