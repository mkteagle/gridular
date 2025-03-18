import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Pagination } from "@/components/data-grid/pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

// Base pagination story
export const Default: Story = {
  args: {
    pageIndex: 0,
    pageCount: 10,
    pageSize: 10,
    setPageIndex: (index) => {
      console.log(`Set page index to ${index}`);
    },
    setPageSize: (size) => {
      console.log(`Set page size to ${size}`);
    },
    pageSizeOptions: [5, 10, 20, 50, 100],
    processedDataLength: 95,
  },
};

// Middle page
export const MiddlePage: Story = {
  args: {
    ...Default.args,
    pageIndex: 4,
  },
};

// Last page
export const LastPage: Story = {
  args: {
    ...Default.args,
    pageIndex: 9,
  },
};

// No first/last buttons
export const NoFirstLastButtons: Story = {
  args: {
    ...Default.args,
    showFirstLastButtons: false,
  },
};

// Custom page info
export const CustomPageInfo: Story = {
  args: {
    ...Default.args,
    renderPageInfo: ({ start, end, total }) => (
      <div className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md text-sm">
        Showing <strong>{start}</strong> to <strong>{end}</strong> of{" "}
        <strong>{total}</strong> entries
      </div>
    ),
  },
};

// Custom page size selector
export const CustomPageSizeSelector: Story = {
  args: {
    ...Default.args,
    renderPageSizeSelector: ({ pageSize, options, onChange }) => (
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Show:</span>
        <div className="flex border rounded overflow-hidden">
          {options.map((size) => (
            <button
              key={size}
              className={`px-2 py-1 text-sm ${
                pageSize === size
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => onChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    ),
  },
};

// Custom navigation buttons
export const CustomNavigationButtons: Story = {
  args: {
    ...Default.args,
    renderFirstPageButton: ({ onClick, disabled }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        disabled={disabled}
        className="mr-1"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
    ),
    renderPrevPageButton: ({ onClick, disabled }) => (
      <Button variant="outline" size="sm" onClick={onClick} disabled={disabled}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
    ),
    renderNextPageButton: ({ onClick, disabled }) => (
      <Button variant="outline" size="sm" onClick={onClick} disabled={disabled}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    ),
    renderLastPageButton: ({ onClick, disabled }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        disabled={disabled}
        className="ml-1"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    ),
  },
};

// Hide page size selector
export const NoPageSizeSelector: Story = {
  args: {
    ...Default.args,
    showPageSizeSelector: false,
  },
};

// Hide page info
export const NoPageInfo: Story = {
  args: {
    ...Default.args,
    showPageInfo: false,
  },
};

// Custom styling
export const CustomStyling: Story = {
  args: {
    ...Default.args,
    className: "bg-gray-50 p-4 rounded-lg shadow",
    pageSizeClassName: "border-r pr-4",
    pageInfoClassName: "font-mono text-xs",
    buttonsClassName: "space-x-2",
    buttonClassName: "bg-white shadow-sm",
  },
};

// Comprehensive customization
export const ComprehensiveCustomization: Story = {
  args: {
    ...Default.args,
    className:
      "bg-blue-50 p-3 rounded-lg flex flex-col sm:flex-row items-center gap-3",
    renderPageSizeSelector: ({ pageSize, options, onChange }) => (
      <div className="flex flex-col items-center sm:items-start">
        <span className="text-xs text-blue-800 mb-1">Rows per page</span>
        <select
          value={pageSize}
          onChange={(e) => onChange(Number(e.target.value))}
          className="bg-white border border-blue-200 rounded px-2 py-1 text-sm"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} rows
            </option>
          ))}
        </select>
      </div>
    ),
    renderPageInfo: ({ start, end, total }) => (
      <div className="px-3 py-1 bg-white shadow-sm rounded text-sm text-center">
        <span className="text-blue-800">
          {start}-{end} of {total}
        </span>
      </div>
    ),
    renderFirstPageButton: ({ onClick, disabled }) => (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`p-2 rounded-l-md ${
          disabled
            ? "bg-gray-100 text-gray-400"
            : "bg-white text-blue-800 hover:bg-blue-50"
        }`}
      >
        <ChevronsLeft className="h-3 w-3" />
      </button>
    ),
    renderPrevPageButton: ({ onClick, disabled }) => (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`p-2 border-l ${
          disabled
            ? "bg-gray-100 text-gray-400"
            : "bg-white text-blue-800 hover:bg-blue-50"
        }`}
      >
        <ChevronLeft className="h-3 w-3" />
      </button>
    ),
    renderNextPageButton: ({ onClick, disabled }) => (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`p-2 border-l ${
          disabled
            ? "bg-gray-100 text-gray-400"
            : "bg-white text-blue-800 hover:bg-blue-50"
        }`}
      >
        <ChevronRight className="h-3 w-3" />
      </button>
    ),
    renderLastPageButton: ({ onClick, disabled }) => (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`p-2 border-l rounded-r-md ${
          disabled
            ? "bg-gray-100 text-gray-400"
            : "bg-white text-blue-800 hover:bg-blue-50"
        }`}
      >
        <ChevronsRight className="h-3 w-3" />
      </button>
    ),
    buttonsClassName: "flex overflow-hidden border rounded-md shadow-sm",
  },
};
