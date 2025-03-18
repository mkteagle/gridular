import { TableCell } from "@/components/data-grid/table-cell";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import type { Meta, StoryObj } from "@storybook/react";

// Sample data for stories
interface Person {
  id: string;
  name: string;
  age: number;
  email: string;
}

const sampleRow: Person = {
  id: "1",
  name: "John Doe",
  age: 30,
  email: "john@example.com",
};

const meta: Meta<typeof TableCell> = {
  title: "Components/TableCell",
  component: TableCell,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <table className="border-collapse w-full">
          <tbody>
            <tr>
              <Story />
            </tr>
          </tbody>
        </table>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TableCell>;

// Text cell
export const TextCell: Story = {
  args: {
    column: {
      id: "name",
      header: "Name",
      width: 150,
    },
    row: sampleRow,
  },
};

// Numeric cell
export const NumericCell: Story = {
  args: {
    column: {
      id: "age",
      header: "Age",
      width: 80,
      cellClassName: "text-right",
    },
    row: sampleRow,
  },
};

// Custom render cell
export const CustomRenderCell: Story = {
  args: {
    column: {
      id: "email",
      header: "Email",
      width: 200,
      cell: (row: unknown) => {
        const person = row as Person;
        return (
          <a
            href={`mailto:${person.email}`}
            className="text-blue-600 hover:underline"
          >
            {person.email}
          </a>
        );
      },
    },
    row: sampleRow,
  },
};

// Cell with custom styling
export const StyledCell: Story = {
  args: {
    column: {
      id: "name",
      header: "Name",
      width: 150,
      cellClassName: "font-bold text-purple-700",
    },
    row: sampleRow,
    cellClassName: "bg-gray-100",
  },
};

// Cell with fixed width
export const FixedWidthCell: Story = {
  args: {
    column: {
      id: "name",
      header: "Name",
      width: 300,
    },
    row: sampleRow,
  },
};
