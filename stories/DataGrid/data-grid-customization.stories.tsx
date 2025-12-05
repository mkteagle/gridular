import { Meta, StoryObj } from "@storybook/react";
import { cn } from "@/lib/utils";
import {
  columns,
  sampleData,
  ControlledDataGridWrapper,
  ThemeWrapper,
} from "../Shared/utils/data-grid-helpers";

const meta: Meta<typeof ControlledDataGridWrapper> = {
  title: "Data Grid/Customization",
  component: ControlledDataGridWrapper,
  decorators: [
    (Story, context) => (
      <ThemeWrapper customTheme={context.args.customTheme}>
        <Story />
      </ThemeWrapper>
    ),
  ],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ControlledDataGridWrapper>;

export const CustomTailwindStyling: Story = {
  args: {
    columns,
    data: sampleData,
    enablePagination: true,
    pageSize: 5,
    className: "border-blue-500 shadow-md",
    rowClassName: "hover:bg-blue-50",
    headerClassName: "bg-gray-100",
    cellClassName: "px-6 py-3",
    selectedRowClassName: "bg-blue-100",
  },
};

export const WithCleanClassesAPI: Story = {
  args: {
    columns,
    data: sampleData,
    enablePagination: true,
    enableSorting: true,
    enableRowSelection: true,
    classes: {
      root: "shadow-lg",
      header: "bg-gray-100 text-gray-800",
      row: "hover:bg-blue-50 transition-colors",
      cell: "px-4 py-2",
      selectedRow: "bg-blue-100 border-l-2 border-blue-500",
      pagination: "bg-gray-50 border-t",
    },
  },
};
