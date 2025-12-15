import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { DataGrid } from '../../DataGrid';
import type { ColumnDef } from '../../types';
import '../../index.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const columns: ColumnDef<User>[] = [
  {
    id: 'name',
    key: 'name',
    header: 'Name',
    width: 200,
  },
  {
    id: 'email',
    key: 'email',
    header: 'Email',
    width: 250,
  },
  {
    id: 'role',
    key: 'role',
    header: 'Role',
    width: 150,
  },
  {
    id: 'status',
    key: 'status',
    header: 'Status',
    width: 150,
  },
];

const mockData: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Editor', status: 'Inactive' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Customization/Skeleton Loading',
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
        <style>{`
          .skeleton-purple {
            background: linear-gradient(90deg, #e9d5ff 0%, #f3e8ff 50%, #e9d5ff 100%);
            background-size: 200% 100%;
          }

          .skeleton-slow {
            animation: shimmer 3s infinite;
          }

          .skeleton-fast {
            animation: shimmer 0.8s infinite;
          }

          .skeleton-no-animation {
            animation: none;
            background: #f0ede9;
          }

          .skeleton-large {
            width: 90%;
            height: 20px;
            border-radius: 8px;
          }

          .skeleton-dark {
            background: linear-gradient(90deg, #374151 0%, #4b5563 50%, #374151 100%);
            background-size: 200% 100%;
          }

          .skeleton-brand {
            background: linear-gradient(90deg, rgba(184, 115, 51, 0.15) 0%, rgba(184, 115, 51, 0.05) 50%, rgba(184, 115, 51, 0.15) 100%);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }
        `}</style>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

export const Default: Story = {
  render: () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate loading
      setTimeout(() => {
        setData(mockData);
        setIsLoading(false);
      }, 2000);
    }, []);

    return (
      <div>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Default Skeleton</h3>
          <p className="font-ui text-sm text-gray-600 mb-2">
            Default skeleton loading state with standard colors and animation.
          </p>
          <p className="font-ui text-xs text-gray-500">
            Uses the default <code className="bg-gray-100 px-1 rounded">.skeleton-shimmer</code> class.
          </p>
        </div>
        <div style={{ height: '400px' }}>
          <DataGrid
            columns={columns}
            data={data}
            isLoading={isLoading}
            pagination={{
              pageIndex: 0,
              pageSize: 10,
              totalRows: 5,
              manualPagination: true,
            }}
          />
        </div>
      </div>
    );
  },
};

export const CustomColors: Story = {
  render: () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate loading
      setTimeout(() => {
        setData(mockData);
        setIsLoading(false);
      }, 2000);
    }, []);

    return (
      <div>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Custom Colors (Purple)</h3>
          <p className="font-ui text-sm text-gray-600 mb-2">
            Skeleton with custom gradient colors using a purple theme.
          </p>
          <pre className="font-mono text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`.skeleton-purple {
  background: linear-gradient(90deg,
    #e9d5ff 0%, #f3e8ff 50%, #e9d5ff 100%);
  background-size: 200% 100%;
}`}</pre>
        </div>
        <div style={{ height: '400px' }}>
          <DataGrid
            columns={columns}
            data={data}
            isLoading={isLoading}
            pagination={{
              pageIndex: 0,
              pageSize: 10,
              totalRows: 5,
              manualPagination: true,
            }}
            classes={{
              skeleton: 'skeleton-purple',
            }}
          />
        </div>
      </div>
    );
  },
};

export const SlowAnimation: Story = {
  render: () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate loading
      setTimeout(() => {
        setData(mockData);
        setIsLoading(false);
      }, 2000);
    }, []);

    return (
      <div>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Slow Animation</h3>
          <p className="font-ui text-sm text-gray-600 mb-2">
            Skeleton with a slower animation duration (3 seconds).
          </p>
          <pre className="font-mono text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`.skeleton-slow {
  animation: shimmer 3s infinite;
}`}</pre>
        </div>
        <div style={{ height: '400px' }}>
          <DataGrid
            columns={columns}
            data={data}
            isLoading={isLoading}
            pagination={{
              pageIndex: 0,
              pageSize: 10,
              totalRows: 5,
              manualPagination: true,
            }}
            classes={{
              skeleton: 'skeleton-slow',
            }}
          />
        </div>
      </div>
    );
  },
};

export const FastAnimation: Story = {
  render: () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate loading
      setTimeout(() => {
        setData(mockData);
        setIsLoading(false);
      }, 2000);
    }, []);

    return (
      <div>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Fast Animation</h3>
          <p className="font-ui text-sm text-gray-600 mb-2">
            Skeleton with a faster animation duration (0.8 seconds).
          </p>
          <pre className="font-mono text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`.skeleton-fast {
  animation: shimmer 0.8s infinite;
}`}</pre>
        </div>
        <div style={{ height: '400px' }}>
          <DataGrid
            columns={columns}
            data={data}
            isLoading={isLoading}
            pagination={{
              pageIndex: 0,
              pageSize: 10,
              totalRows: 5,
              manualPagination: true,
            }}
            classes={{
              skeleton: 'skeleton-fast',
            }}
          />
        </div>
      </div>
    );
  },
};

export const NoAnimation: Story = {
  render: () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate loading
      setTimeout(() => {
        setData(mockData);
        setIsLoading(false);
      }, 2000);
    }, []);

    return (
      <div>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">No Animation</h3>
          <p className="font-ui text-sm text-gray-600 mb-2">
            Static skeleton without animation (useful for reduced motion preferences).
          </p>
          <pre className="font-mono text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`.skeleton-no-animation {
  animation: none;
  background: #f0ede9;
}`}</pre>
        </div>
        <div style={{ height: '400px' }}>
          <DataGrid
            columns={columns}
            data={data}
            isLoading={isLoading}
            pagination={{
              pageIndex: 0,
              pageSize: 10,
              totalRows: 5,
              manualPagination: true,
            }}
            classes={{
              skeleton: 'skeleton-no-animation',
            }}
          />
        </div>
      </div>
    );
  },
};

export const CustomDimensions: Story = {
  render: () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate loading
      setTimeout(() => {
        setData(mockData);
        setIsLoading(false);
      }, 2000);
    }, []);

    return (
      <div>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Custom Dimensions</h3>
          <p className="font-ui text-sm text-gray-600 mb-2">
            Skeleton with custom width, height, and border radius.
          </p>
          <pre className="font-mono text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`.skeleton-large {
  width: 90%;
  height: 20px;
  border-radius: 8px;
}`}</pre>
        </div>
        <div style={{ height: '400px' }}>
          <DataGrid
            columns={columns}
            data={data}
            isLoading={isLoading}
            pagination={{
              pageIndex: 0,
              pageSize: 10,
              totalRows: 5,
              manualPagination: true,
            }}
            classes={{
              skeleton: 'skeleton-large',
            }}
          />
        </div>
      </div>
    );
  },
};

export const DarkTheme: Story = {
  render: () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate loading
      setTimeout(() => {
        setData(mockData);
        setIsLoading(false);
      }, 2000);
    }, []);

    return (
      <div>
        <div className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-white mb-2">Dark Theme Skeleton</h3>
          <p className="font-ui text-sm text-gray-300 mb-2">
            Skeleton optimized for dark backgrounds with darker colors.
          </p>
          <pre className="font-mono text-xs bg-gray-700 text-gray-200 p-2 rounded overflow-x-auto">
{`.skeleton-dark {
  background: linear-gradient(90deg,
    #374151 0%, #4b5563 50%, #374151 100%);
  background-size: 200% 100%;
}`}</pre>
        </div>
        <div style={{ height: '400px' }}>
          <DataGrid
            columns={columns}
            data={data}
            isLoading={isLoading}
            pagination={{
              pageIndex: 0,
              pageSize: 10,
              totalRows: 5,
              manualPagination: true,
            }}
            classes={{
              container: 'bg-gray-900',
              body: 'bg-gray-900',
              skeleton: 'skeleton-dark',
            }}
          />
        </div>
      </div>
    );
  },
};

export const BrandColors: Story = {
  render: () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate loading
      setTimeout(() => {
        setData(mockData);
        setIsLoading(false);
      }, 2000);
    }, []);

    return (
      <div>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">Brand Colors</h3>
          <p className="font-ui text-sm text-gray-600 mb-2">
            Skeleton using copper brand colors to match the grid theme with slower animation.
          </p>
          <pre className="font-mono text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`.skeleton-brand {
  background: linear-gradient(90deg,
    rgba(184, 115, 51, 0.15) 0%,
    rgba(184, 115, 51, 0.05) 50%,
    rgba(184, 115, 51, 0.15) 100%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}`}</pre>
        </div>
        <div style={{ height: '400px' }}>
          <DataGrid
            columns={columns}
            data={data}
            isLoading={isLoading}
            pagination={{
              pageIndex: 0,
              pageSize: 10,
              totalRows: 5,
              manualPagination: true,
            }}
            classes={{
              skeleton: 'skeleton-brand',
            }}
          />
        </div>
      </div>
    );
  },
};
