# Gridular Data Grid

Gridular is a flexible and customizable data grid component for React applications. It provides features such as sorting, filtering, pagination, and row selection, making it easy to display and manage tabular data.

## Features

- **Sorting**: Easily sort data by clicking on column headers.
- **Filtering**: Filter data using a user-friendly filter menu for each column.
- **Pagination**: Navigate through large datasets with pagination controls.
- **Row Selection**: Select rows for actions or data manipulation.
- **Column Resizing**: Adjust column widths to fit your data needs.

## Installation

To install Gridular, use npm or yarn:

```bash
npm install gridular
```

or

```bash
yarn add gridular
```

## Usage

To use the DataGrid component, import it into your React component:

```tsx
import { DataGrid } from 'gridular/components/data-grid';

const MyComponent = () => {
  const columns = [
    { id: 'name', header: 'Name' },
    { id: 'age', header: 'Age' },
    // Add more columns as needed
  ];

  const data = [
    { id: 1, name: 'John Doe', age: 28 },
    { id: 2, name: 'Jane Smith', age: 34 },
    // Add more data as needed
  ];

  return <DataGrid columns={columns} data={data} />;
};
```

## Components

- **DataGrid**: The main component that renders the grid.
- **FilterMenu**: A component for filtering data in the grid.
- **Pagination**: A component for managing pagination controls.
- **TableBody**: Renders the rows of the data grid.
- **TableCell**: Represents individual cells in the data grid.
- **TableHeader**: Renders the header of the data grid.
- **TableRow**: Represents individual rows in the data grid.

## Custom Hooks

Gridular also provides custom hooks for managing various functionalities:

- **useColumnResize**: For managing column resizing.
- **useFiltering**: For managing filtering logic.
- **usePagination**: For managing pagination logic.
- **useRowSelection**: For managing row selection.
- **useSorting**: For managing sorting logic.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.