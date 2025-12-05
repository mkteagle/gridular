import { Meta, StoryObj } from "@storybook/react";
import {
  columns,
  sampleData,
  ControlledDataGridWrapper,
  ThemeWrapper,
} from "../Shared/utils/data-grid-helpers";

const meta: Meta<typeof ControlledDataGridWrapper> = {
  title: "Data Grid/Basic",
  component: ControlledDataGridWrapper,
  decorators: [
    (Story, context) => (
      <ThemeWrapper customTheme={context.args.customTheme}>
        <Story />
      </ThemeWrapper>
    ),
  ],
  args: {
    renderHeader: undefined,
  },
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    // @ts-ignore
    onSortChange: { action: "sorted" },
    onFilterChange: { action: "filtered" },
    onRowSelectionChange: { action: "rowSelected" },
    onPageChange: { action: "pageChanged" },
    onPageSizeChange: { action: "pageSizeChanged" },
    onVisibleColumnsChange: { action: "columnsVisibilityChanged" },
    onColumnReorder: { action: "columnsReordered" },
    onRowClick: { action: "rowClicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ControlledDataGridWrapper>;

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
    enablePagination: true,
    enableSorting: true,
    enableRowSelection: true,
    enableColumnResize: true,
    renderHeader: undefined,
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loadingMessage = canvas.getByText("Loading data...");
    expect(loadingMessage).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: "No data found",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emptyMessage = canvas.getByText("No data found");
    expect(emptyMessage).toBeInTheDocument();
  },
};

export const WithRowSelection: Story = {
  args: {
    columns,
    data: sampleData,
    enableRowSelection: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find first data row (skipping header)
    const rows = canvas.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1);

    // Click on the first data row
    await userEvent.click(rows[1]);

    // Check row has selection class
    await waitFor(() => {
      expect(rows[1]).toHaveClass("bg-primary/10");
    });
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    data: sampleData,
    enablePagination: true,
    pageSize: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify pagination is present
    const paginationElement = canvas.getByText("1-5 of 50");
    expect(paginationElement).toBeInTheDocument();

    // Check we only see 5 data rows initially
    const rows = canvas.getAllByRole("row");
    expect(rows.length).toBe(6); // 5 data rows + header

    // Navigate to next page - use exact text match to avoid ambiguity
    const nextButton = canvas.getByRole("button", {
      name: (name) => name === ">",
    });
    await userEvent.click(nextButton);

    // Check we're on page 2
    await waitFor(() => {
      expect(canvas.getByText("6-10 of 50")).toBeInTheDocument();
    });
  },
};

export const WithSorting: Story = {
  args: {
    columns,
    data: sampleData,
    enableSorting: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click name header to sort
    const nameHeader = canvas.getByRole("columnheader", { name: /name/i });
    expect(nameHeader).toBeInTheDocument();

    // Click header to sort ascending
    await userEvent.click(nameHeader);

    // Wait for and verify sorted data (Name 0 should be first)
    await waitFor(() => {
      expect(canvas.getByText("Name 0")).toBeInTheDocument();
    });

    // Click again to sort descending
    await userEvent.click(nameHeader);

    // Wait for and verify reverse sorted data (Name 49 should be first)
    await waitFor(() => {
      expect(canvas.getByText("Name 49")).toBeInTheDocument();
    });
  },
};

export const WithFiltering: Story = {
  args: {
    columns,
    data: sampleData,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find name column header
    const nameHeader = canvas.getByRole("columnheader", { name: /name/i });

    // Find and click filter button
    const filterButton = within(nameHeader).getByRole("button");
    await userEvent.click(filterButton);

    // Verify filter popover appears
    const filterPopover = await canvas.findByPlaceholderText("Filter value...");
    expect(filterPopover).toBeInTheDocument();

    // Type filter value
    await userEvent.type(filterPopover, "Name 1");

    // Click apply button
    const applyButton = canvas.getByRole("button", { name: /apply/i });
    await userEvent.click(applyButton);

    // Verify filtered data
    await waitFor(() => {
      const cells = canvas.getAllByRole("cell");
      const nameCell = cells.find((cell) =>
        cell.textContent?.includes("Name 1")
      );
      expect(nameCell).toBeInTheDocument();
    });
  },
};

export const WithColumnReordering: Story = {
  args: {
    columns,
    data: sampleData,
  },
};

export const WithColumnVisibilityManagement: Story = {
  args: {
    columns,
    data: sampleData,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify email column is not visible
    await waitFor(() => {
      const headers = canvas.getAllByRole("columnheader");
      const emailHeader = headers.find((h) => h.textContent?.includes("Email"));
      expect(emailHeader).toBeUndefined();
    });

    // Verify other columns are visible
    const nameHeader = canvas.getByRole("columnheader", { name: /name/i });
    expect(nameHeader).toBeInTheDocument();

    const statusHeader = canvas.getByRole("columnheader", { name: /status/i });
    expect(statusHeader).toBeInTheDocument();
  },
};

export const DisabledFeatures: Story = {
  args: {
    columns,
    data: sampleData,
    enableSorting: false,
    enablePagination: false,
    enableColumnResize: false,
    enableRowSelection: false,
  },
};
