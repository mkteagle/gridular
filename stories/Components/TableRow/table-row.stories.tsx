import { TableRow as TableRowComponent } from "@/components/data-grid/table-row";
import { ColumnDef } from "@/components/data-grid/types";
import type { Meta, StoryObj } from "@storybook/react";

// Sample data for stories
interface Person {
  id: string;
  name: string;
  age: number;
  email: string;
}

const sampleColumns: ColumnDef<Person>[] = [
  {
    id: "name",
    header: "Name",
    width: 150,
  },
  {
    id: "age",
    header: "Age",
    width: 80,
  },
  {
    id: "email",
    header: "Email",
    width: 200,
    cell: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
  },
];

const sampleRow: Person = {
  id: "1",
  name: "John Doe",
  age: 30,
  email: "john@example.com",
};
const meta: Meta<typeof TableRowComponent<Person>> = {
  title: "Components/TableRow",
  component: TableRowComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <table className="border-collapse w-full">
        <tbody>
          <Story />
        </tbody>
      </table>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TableRowComponent>;

// Basic row
export const Default: Story = {
  args: {
    row: sampleRow,
    //@ts-ignore
    columns: sampleColumns,
    isSelected: false,
    onSelect: () => console.log("Row selected"),
  },
};

// Selected row
export const Selected: Story = {
  args: {
    row: sampleRow,
    //@ts-ignore
    columns: sampleColumns,
    isSelected: true,
    onSelect: () => console.log("Row selected"),
    selectedRowClassName: "bg-blue-100",
  },
};

// Row with click handler
export const WithRowClick: Story = {
  args: {
    row: sampleRow,
    //@ts-ignore
    columns: sampleColumns,
    isSelected: false,
    onSelect: () => console.log("Row selected"),
    onRowClick: (row) => console.log("Row clicked", row),
  },
};

// Row with custom class name
export const CustomRowStyle: Story = {
  args: {
    row: sampleRow,
    //@ts-ignore
    columns: sampleColumns,
    isSelected: false,
    onSelect: () => console.log("Row selected"),
    rowClassName: "bg-gray-50",
  },
};
