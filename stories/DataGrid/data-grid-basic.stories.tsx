import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, waitFor } from "@storybook/test";
import {
  columns,
  sampleData,
  ControlledDataGridWrapper,
  ThemeWrapper,
} from "../utils/data-grid-helpers";

const meta: Meta<typeof ControlledDataGridWrapper> = {
  title: "Data Grid/Main/Basic",
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
    const paginationElement = canvas.getByText("Page 1 of 10");
    expect(paginationElement).toBeInTheDocument();

    // Check we only see 5 data rows initially
    const rows = canvas.getAllByRole("row");
    expect(rows.length).toBe(6); // 5 data rows + header

    // Navigate to next page
    const nextButton = canvas.getByRole("button", { name: /next/i });
    await userEvent.click(nextButton);

    // Check we're on page 2
    await waitFor(() => {
      expect(canvas.getByText("Page 2 of 10")).toBeInTheDocument();
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
    await userEvent.click(nameHeader);

    // Check the sort icon
    await waitFor(() => {
      const sortIcon = within(nameHeader).queryByTestId("sort-icon-asc");
      expect(sortIcon).toBeInTheDocument();
    });

    // Click again to reverse sort
    await userEvent.click(nameHeader);

    // Check the sort icon changed
    await waitFor(() => {
      const sortIcon = within(nameHeader).queryByTestId("sort-icon-desc");
      expect(sortIcon).toBeInTheDocument();
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

    // Click column visibility button
    const columnsButton = canvas.getByRole("button", { name: /columns/i });
    await userEvent.click(columnsButton);

    // Find the dropdown menu
    const emailCheckbox = await canvas.findByRole("menuitemcheckbox", {
      name: /email/i,
    });
    expect(emailCheckbox).toBeInTheDocument();

    // Uncheck the email column
    await userEvent.click(emailCheckbox);

    // Close dropdown
    await userEvent.click(document.body);

    // Verify column is hidden
    await waitFor(() => {
      const headers = canvas.getAllByRole("columnheader");
      const emailHeader = headers.find((h) => h.textContent?.includes("Email"));
      expect(emailHeader).not.toBeInTheDocument();
    });
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
