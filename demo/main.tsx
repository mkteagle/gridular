import React from 'react';
import ReactDOM from 'react-dom/client';
import { VirtualizedGrid } from '../src/VirtualizedGrid';
import type { ColumnDef, GridItem } from '../src/VirtualizedGrid';
import '../src/VirtualizedGrid.css';

// Generate sample data
const generateData = (count: number): GridItem[] => {
  const firstNames = ['Aria', 'Elias', 'Luna', 'Felix', 'Nova', 'Atlas', 'Iris', 'Jasper'];
  const lastNames = ['Sterling', 'Blackwood', 'Montgomery', 'Fitzgerald', 'Ashworth'];
  const departments = ['Design', 'Engineering', 'Marketing', 'Sales', 'Operations'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    email: `${firstNames[i % firstNames.length].toLowerCase()}@example.com`,
    department: departments[i % departments.length],
    salary: 60000 + Math.floor(Math.random() * 140000),
    joinDate: new Date(2018 + (i % 6), i % 12, (i % 28) + 1).toLocaleDateString(),
  }));
};

const columns: ColumnDef[] = [
  { key: 'id', header: 'ID', width: 80 },
  { key: 'name', header: 'Full Name', width: 200 },
  { key: 'email', header: 'Email', width: 250 },
  { key: 'department', header: 'Department', width: 150 },
  {
    key: 'salary',
    header: 'Salary',
    width: 150,
    render: (item) => `$${item.salary.toLocaleString()}`
  },
  { key: 'joinDate', header: 'Join Date', width: 140 },
];

function App() {
  const data = generateData(10000);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      padding: '2rem',
      boxSizing: 'border-box',
      background: 'linear-gradient(135deg, #f5f3f0 0%, #e8e5e0 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '3rem',
          fontWeight: 700,
          color: '#1a1a1a',
          margin: 0,
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em'
        }}>
          Virtualized Grid
        </h1>
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '1rem',
          color: '#b87333',
          margin: 0,
          letterSpacing: '0.01em',
          fontWeight: 500
        }}>
          Luxury data presentation with 10,000 rows
        </p>
      </div>
      <div style={{ height: 'calc(100% - 120px)' }}>
        <VirtualizedGrid
          data={data}
          columns={columns}
          rowHeight={72}
          onRowClick={(item) => console.log('Clicked:', item)}
        />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
