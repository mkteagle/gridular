import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  columns,
  sampleData,
  ControlledDataGridWrapper,
  ThemeWrapper,
} from "../utils/data-grid-helpers";

const meta: Meta<typeof ControlledDataGridWrapper> = {
  title: "Data Grid/Main/Filters",
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

export const CustomFilterMenu: Story = {
  args: {
    columns,
    data: sampleData,
    enableSorting: true,
    filterMenu: {
      classes: {
        container: "bg-slate-900 border border-slate-700 shadow-xl",
        header: "text-white",
        input: "bg-slate-800 border-slate-600 text-white",
        clearButton: "bg-slate-700 text-white",
        applyButton: "bg-indigo-600 text-white",
      },
      renderCurrentFilter: (filterValue) => (
        <div className="bg-indigo-900/30 border border-indigo-700/50 p-1.5 rounded text-xs text-indigo-200 flex items-center">
          <span className="mr-1">🔍</span>
          Active filter: <span className="font-bold ml-1">{filterValue}</span>
        </div>
      ),
    },
  },
};

export const CompletelyCustomFilterMenu: Story = {
  args: {
    columns,
    data: sampleData,
    filterMenu: {
      renderCustomContent: (props) => (
        <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 flex flex-col gap-3">
          <h3 className="font-bold text-lg text-purple-800 dark:text-purple-300">
            Custom Filter for {props.column.header}
          </h3>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Enter filter criteria:
            </label>
            <input
              className="w-full rounded border border-purple-200 dark:border-purple-800 p-2 bg-white dark:bg-gray-800"
              value={props.filterValue || ""}
              onChange={(e) => props.setFilterValue(e.target.value)}
              placeholder="Type to filter..."
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={props.onClear}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={props.onApply}
              className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Apply Filter
            </button>
          </div>
        </div>
      ),
    },
  },
};
