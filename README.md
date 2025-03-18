# Gridular Data Grid

Gridular is a flexible and customizable data grid component for React applications. It provides features such as sorting, filtering, pagination, and row selection, making it easy to display and manage tabular data.

## Features

- **Sorting**: Easily sort data by clicking on column headers.
- **Filtering**: Filter data using a user-friendly filter menu for each column.
- **Pagination**: Navigate through large datasets with pagination controls.
- **Row Selection**: Select rows for actions or data manipulation.
- **Column Resizing**: Adjust column widths to fit your data needs.
- **Column Management**: Show/hide and reorder columns as needed.
- **Grid State Persistence**: Maintain column widths and ordering between sessions.

## Installation

To install Gridular, use npm or yarn:

```bash
npm install gridular
```

```bash
yarn add gridular
```

## Usage

To use the DataGrid component, import it into your React component:

```typescript
import { DataGrid } from "gridular/components/data-grid";

const MyComponent = () => {
  const columns = [
    { id: "name", header: "Name" },
    { id: "age", header: "Age" },
    // Add more columns as needed
  ];

  const data = [
    { id: 1, name: "John Doe", age: 28 },
    { id: 2, name: "Jane Smith", age: 34 },
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
- **ColumnManager**: Manages column visibility and order.

## Custom Hooks

Gridular provides custom hooks for managing various functionalities:

- **useColumnResize**: For managing column resizing.
- **useGridPersistence**: For persisting grid preferences like - \*\*column widths and order.

## Utility Functions

Gridular provides several utility functions to help with styling and component customization:

```typescript
cn(...inputs: ClassValue[])
```

A utility function that combines multiple class names or conditional class expressions using clsx and tailwind-merge. This helps avoid className conflicts when using Tailwind CSS.

```typescript
import { cn } from "gridular";

// Usage
<div
  className={cn(
    "base-class",
    isActive && "active-class",
    isFocused ? "focused-class" : "unfocused-class"
  )}
>
  Content
</div>;
```

```typescript
mergeStyles(tssStyles, tailwindClasses);
```

Combines TSS-React style objects with Tailwind CSS classes, making it easier to integrate both styling approaches.

```typescript
import { mergeStyles } from "gridular";

// Usage
const styles = mergeStyles(
  { color: "#000", backgroundColor: "#fff" },
  "p-4 rounded-md hover:bg-gray-100"
);

<div {...styles}>Content</div>;
```

## Parameters:

-- tssStyles: A TSS-React style object (CSSObject)
-- tailwindClasses: A string or array of strings containing -- Tailwind class names Returns an object with merged styles that can be spread into React components.

## Theming

Gridular includes a built-in theme provider that allows you to customize the appearance of your data grids:

-- ThemeProvider: Context provider for styling your data grids.
-- ThemeSwitcher: Component for toggling between light and dark themes.
-- ThemeWrapper: Utility component for wrapping your components with theme context.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
