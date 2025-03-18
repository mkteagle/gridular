import { Meta, StoryObj } from "@storybook/react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useColumnResize } from "@/components/data-grid/use-column-resize";

const meta: Meta = {
  title: "Hooks/useColumnResize",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

const ResizableColumnsDemo = () => {
  const { columnResizeState, isResizing, handleColumnResizeStart } =
    useColumnResize(true);

  const columns: { id: keyof typeof columnWidths; header: string }[] = [
    { id: "name", header: "Name" },
    { id: "email", header: "Email" },
    { id: "role", header: "Role" },
    { id: "status", header: "Status" },
  ];

  // Keep track of widths that are not directly managed by the hook
  const [columnWidths, setColumnWidths] = useState({
    name: 150,
    email: 200,
    role: 150,
    status: 150,
  });

  // Update the width when resizing
  const effectiveWidths = { ...columnWidths, ...columnResizeState };

  // When mouse up, update our local state
  const handleMouseUp = (columnId: string) => {
    if ((columnResizeState as Record<string, any>)[columnId]) {
      setColumnWidths((prev) => ({
        ...prev,
        [columnId]: (columnResizeState as Record<string, any>)[columnId],
      }));
    }
  };

  return (
    <div className="w-[700px] p-4 space-y-4">
      <h3 className="text-lg font-medium">Resizable Columns Demo</h3>

      <div
        className={cn(
          "mb-4",
          isResizing ? "select-none cursor-col-resize" : ""
        )}
      >
        <div className="flex w-full border rounded-md overflow-hidden">
          {columns.map((column) => (
            <div
              key={column.id}
              className="relative"
              style={{
                width: `${effectiveWidths[column.id]}px`,
                minWidth: `${effectiveWidths[column.id]}px`,
              }}
            >
              <div className="h-12 bg-gray-50 p-2 flex items-center border-r">
                {column.header}
              </div>

              {/* Resize handle */}
              <div
                className="absolute top-0 right-0 h-full w-2 cursor-col-resize hover:bg-blue-300 hover:opacity-50"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleColumnResizeStart(
                    column.id,
                    effectiveWidths[column.id],
                    e.nativeEvent
                  );
                  const handleMouseUp = () => {
                    document.removeEventListener("mouseup", handleMouseUp);
                    setColumnWidths((prev) => ({
                      ...prev,
                      [column.id]: effectiveWidths[column.id],
                    }));
                  };
                  document.addEventListener("mouseup", handleMouseUp);
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex w-full border-x border-b rounded-b-md">
          {columns.map((column) => (
            <div
              key={`cell-${column.id}`}
              className="p-2 border-r"
              style={{
                width: `${effectiveWidths[column.id]}px`,
                minWidth: `${effectiveWidths[column.id]}px`,
              }}
            >
              Sample data for {column.header}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-md">
        <h4 className="text-sm font-medium mb-2">Current Column Widths:</h4>
        <pre className="text-xs">
          {JSON.stringify(effectiveWidths, null, 2)}
        </pre>
      </div>

      <div className="text-sm text-gray-500">
        <p>Drag the column dividers to resize the columns.</p>
        <p>The hook keeps track of the state during the resize operation.</p>
      </div>
    </div>
  );
};

export const Demo: StoryObj = {
  render: () => <ResizableColumnsDemo />,
};
