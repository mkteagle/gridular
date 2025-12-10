import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid } from '../../DataGrid';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  [key: string]: any; // Allow indexing by string
}

const sampleUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'Editor', 'Viewer'][i % 3],
  status: ['Active', 'Inactive', 'Pending'][i % 3],
}));

const meta = {
  title: 'Features/Context Menu',
  component: DataGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicContextMenu: Story = {
  args: {
    columns: [],
    data: [],
  },
  render: () => {
    const [notification, setNotification] = useState<string>('');

    const columns = [
      { id: 'name', header: 'Name', key: 'name' },
      { id: 'email', header: 'Email', key: 'email' },
      { id: 'role', header: 'Role', key: 'role' },
      { id: 'status', header: 'Status', key: 'status' },
    ];

    return (
      <div>
        {notification && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-800">
            {notification}
          </div>
        )}
        <DataGrid
          columns={columns}
          data={sampleUsers}
          contextMenuContent={(row, column) => (
            <>
              <button
                onClick={() => {
                  setNotification(`Copied ${column.header}: ${row[column.key]}`);
                  navigator.clipboard.writeText(String(row[column.key]));
                  setTimeout(() => setNotification(''), 3000);
                }}
              >
                Copy Cell Value
              </button>
              <button
                onClick={() => {
                  setNotification(`Viewing details for: ${row.name}`);
                  setTimeout(() => setNotification(''), 3000);
                }}
              >
                View Details
              </button>
              <button
                onClick={() => {
                  setNotification(`Editing: ${row.name}`);
                  setTimeout(() => setNotification(''), 3000);
                }}
              >
                Edit Row
              </button>
              <div className="virtualized-grid-context-menu-divider" />
              <button
                className="danger"
                onClick={() => {
                  setNotification(`Deleted: ${row.name}`);
                  setTimeout(() => setNotification(''), 3000);
                }}
              >
                Delete Row
              </button>
            </>
          )}
        />
      </div>
    );
  },
};

export const ConditionalContextMenu: Story = {
  args: {
    columns: [],
    data: [],
  },
  render: () => {
    const [notification, setNotification] = useState<string>('');

    const columns = [
      { id: 'name', header: 'Name', key: 'name' },
      { id: 'email', header: 'Email', key: 'email' },
      { id: 'role', header: 'Role', key: 'role' },
      { id: 'status', header: 'Status', key: 'status' },
    ];

    return (
      <div>
        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <p className="text-sm text-gray-700">
            This example shows conditional context menus. Try right-clicking on different columns:
          </p>
          <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
            <li><strong>Name column:</strong> Shows user-specific actions</li>
            <li><strong>Email column:</strong> Shows email-specific actions</li>
            <li><strong>Role column:</strong> Shows role management actions</li>
            <li><strong>Status column:</strong> Shows status change actions</li>
          </ul>
        </div>
        {notification && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-800">
            {notification}
          </div>
        )}
        <DataGrid
          columns={columns}
          data={sampleUsers}
          contextMenuContent={(row, column) => {
            // Different menu based on which column was right-clicked
            if (column.id === 'name') {
              return (
                <>
                  <div className="virtualized-grid-context-menu-header">
                    User Actions
                  </div>
                  <button
                    onClick={() => {
                      setNotification(`Viewing profile: ${row.name}`);
                      setTimeout(() => setNotification(''), 3000);
                    }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      setNotification(`Sending message to: ${row.name}`);
                      setTimeout(() => setNotification(''), 3000);
                    }}
                  >
                    Send Message
                  </button>
                </>
              );
            }

            if (column.id === 'email') {
              return (
                <>
                  <div className="virtualized-grid-context-menu-header">
                    Email Actions
                  </div>
                  <button
                    onClick={() => {
                      setNotification(`Copied email: ${row.email}`);
                      navigator.clipboard.writeText(row.email);
                      setTimeout(() => setNotification(''), 3000);
                    }}
                  >
                    Copy Email
                  </button>
                  <button
                    onClick={() => {
                      setNotification(`Opening email client for: ${row.email}`);
                      setTimeout(() => setNotification(''), 3000);
                    }}
                  >
                    Send Email
                  </button>
                </>
              );
            }

            if (column.id === 'role') {
              return (
                <>
                  <div className="virtualized-grid-context-menu-header">
                    Change Role
                  </div>
                  <button
                    onClick={() => {
                      setNotification(`Changed ${row.name}'s role to Admin`);
                      setTimeout(() => setNotification(''), 3000);
                    }}
                  >
                    Set as Admin
                  </button>
                  <button
                    onClick={() => {
                      setNotification(`Changed ${row.name}'s role to Editor`);
                      setTimeout(() => setNotification(''), 3000);
                    }}
                  >
                    Set as Editor
                  </button>
                  <button
                    onClick={() => {
                      setNotification(`Changed ${row.name}'s role to Viewer`);
                      setTimeout(() => setNotification(''), 3000);
                    }}
                  >
                    Set as Viewer
                  </button>
                </>
              );
            }

            if (column.id === 'status') {
              return (
                <>
                  <div className="virtualized-grid-context-menu-header">
                    Change Status
                  </div>
                  <button
                    onClick={() => {
                      setNotification(`Activated ${row.name}`);
                      setTimeout(() => setNotification(''), 3000);
                    }}
                  >
                    Set Active
                  </button>
                  <button
                    onClick={() => {
                      setNotification(`Deactivated ${row.name}`);
                      setTimeout(() => setNotification(''), 3000);
                    }}
                  >
                    Set Inactive
                  </button>
                  <button
                    onClick={() => {
                      setNotification(`Set ${row.name} to Pending`);
                      setTimeout(() => setNotification(''), 3000);
                    }}
                  >
                    Set Pending
                  </button>
                </>
              );
            }

            // Default menu for any other column
            return (
              <button
                onClick={() => {
                  setNotification(`Copied: ${row[column.key]}`);
                  navigator.clipboard.writeText(String(row[column.key]));
                  setTimeout(() => setNotification(''), 3000);
                }}
              >
                Copy Value
              </button>
            );
          }}
        />
      </div>
    );
  },
};

export const WithoutContextMenu: Story = {
  args: {
    columns: [],
    data: [],
  },
  render: () => {
    const columns = [
      { id: 'name', header: 'Name', key: 'name' },
      { id: 'email', header: 'Email', key: 'email' },
      { id: 'role', header: 'Role', key: 'role' },
      { id: 'status', header: 'Status', key: 'status' },
    ];

    return (
      <div>
        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <p className="text-sm text-gray-700">
            This grid has no <code className="px-1 py-0.5 bg-gray-200 rounded">contextMenuContent</code> prop,
            so right-clicking cells will show the browser's default context menu.
          </p>
        </div>
        <DataGrid
          columns={columns}
          data={sampleUsers.slice(0, 10)}
        />
      </div>
    );
  },
};
