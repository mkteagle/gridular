import { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
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
    className: "border-blue-500 shadow-md",
    rowClassName: "hover:bg-blue-50",
    headerClassName: "bg-gray-100",
    cellClassName: "px-6 py-3",
    selectedRowClassName: "bg-blue-100",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that our custom container class is applied
    const container = canvas.getByRole("table").closest("div");
    expect(container).toHaveClass("border-blue-500", "shadow-md");

    // Check custom header class
    const header = canvas.getAllByRole("columnheader")[0].closest("tr");
    expect(header).toHaveClass("bg-gray-100");

    // Check custom cell class
    const cell = canvas.getAllByRole("cell")[0];
    expect(cell).toHaveClass("px-6", "py-3");
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the root class is applied
    const container = canvas.getByRole("table").closest("div");
    expect(container).toHaveClass("shadow-lg");

    // Verify other classes are applied
    const row = canvas.getAllByRole("row")[1]; // First data row
    expect(row).toHaveClass("hover:bg-blue-50");

    const cell = canvas.getAllByRole("cell")[0];
    expect(cell).toHaveClass("px-4", "py-2");
  },
};
