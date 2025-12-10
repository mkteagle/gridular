# Gridular v3

<div align="center">
  <img src="./public/logo.svg" alt="Gridular Logo" width="200" height="200" />

  <p><strong>A high-performance virtualized React data grid with comprehensive features</strong></p>

  [![npm version](https://img.shields.io/npm/v/gridular.svg)](https://www.npmjs.com/package/gridular)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
</div>

## ✨ Features

- ⚡ **True Virtualization** - Handles 100,000+ rows smoothly using `@tanstack/react-virtual`
- 📊 **Data Grouping** - Multi-level hierarchical grouping with expand/collapse
- 🔍 **Sorting & Filtering** - Column-level sorting and filtering with custom functions
- 📄 **Pagination** - Client-side and server-side pagination support
- ✏️ **Column Resizing** - Drag to resize columns with persistence
- 🔄 **Column Reordering** - Drag-and-drop column reordering
- 👁️ **Column Management** - Show/hide columns with reset to defaults
- 📱 **Expandable Rows** - Custom expandable row content
- 🎯 **Cell Selection** - Individual cell selection with visual indicators
- 💾 **State Persistence** - localStorage persistence for grid preferences
- 🎨 **Dual Styling** - Support for both Tailwind CSS and TSS-React (CSS-in-JS)
- 🧪 **Fully Tested** - 43 comprehensive test cases
- 📘 **TypeScript First** - Complete type safety and IntelliSense support

## 📦 Installation

\`\`\`bash
# npm
npm install gridular

# pnpm
pnpm add gridular

# yarn
yarn add gridular
\`\`\`

## 🚀 Quick Start

\`\`\`tsx
import { DataGrid } from 'gridular';
import type { ColumnDef } from 'gridular';

const columns: ColumnDef[] = [
  { id: 'name', key: 'name', header: 'Name', enableSorting: true },
  { id: 'email', key: 'email', header: 'Email', enableSorting: true },
  { id: 'age', key: 'age', header: 'Age', enableSorting: true },
];

const data = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 28 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 34 },
];

function App() {
  return <DataGrid columns={columns} data={data} enableSorting enableColumnResize />;
}
\`\`\`

## 📖 Documentation

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for upgrading from v2.

For complete examples, run Storybook:
\`\`\`bash
npm run storybook
\`\`\`

## 🔄 Migration from v2

**Quick changes:**
- ✅ Add \`key\` property to all columns
- ✅ Rename \`cell\` to \`renderCell\`
- ✅ Remove \`ThemeProvider\` wrapper
- ✅ Consolidate pagination props
- ✅ Remove group icon props

See [PRODUCT_STATUS_GRID_MIGRATION.md](./PRODUCT_STATUS_GRID_MIGRATION.md) for specific ProductStatusGrid migration example.

## 📚 More Examples

- [Storybook](https://gridular.vercel.app)
- Run locally: \`npm run storybook\`

## 🧪 Testing

\`\`\`bash
npm test              # Run tests
npm run test:ui       # Tests with UI
npm run test:coverage # With coverage
\`\`\`

## 📝 License

MIT © [Michael Teagle](https://github.com/mkteagle)

## 🌟 Built With

- [@tanstack/react-virtual](https://tanstack.com/virtual) - Virtualization
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TSS-React](https://www.tss-react.dev/) - CSS-in-JS

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/mkteagle">Michael Teagle</a>
</div>
