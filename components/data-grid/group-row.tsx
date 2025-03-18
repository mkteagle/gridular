import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown } from "lucide-react";
import { GroupRowRenderProps } from "./types";

interface GroupRowProps {
  columnId: string;
  value: any;
  depth: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  count: number;
  columns: number;
  groupKey: string;
  formatter?: (value: any) => string;
  renderGroupRow?: (props: GroupRowRenderProps) => React.ReactNode;
  expandIcon?: React.ReactNode;
  collapseIcon?: React.ReactNode;
  // Style customization props
  className?: string;
  rowClassName?: string;
  cellClassName?: string;
  contentClassName?: string;
  labelClassName?: string;
  iconClassName?: string;
  countClassName?: string;
  indentSize?: number;
  // Allow passing CSS properties for more styling flexibility
  style?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export function GroupRow({
  columnId,
  value,
  depth,
  isExpanded,
  onToggleExpand,
  count,
  columns,
  groupKey,
  formatter,
  renderGroupRow,
  expandIcon,
  collapseIcon,
  // Style props
  className,
  rowClassName,
  cellClassName,
  contentClassName,
  labelClassName,
  iconClassName,
  countClassName,
  indentSize = 16,
  // Style objects
  style,
  rowStyle,
  cellStyle,
  contentStyle,
}: GroupRowProps) {
  const formattedValue = formatter ? formatter(value) : value;
  const displayValue =
    value === null || value === undefined ? "(empty)" : formattedValue;

  // If a custom renderer is provided, use it
  if (renderGroupRow) {
    return (
      <tr
        className={cn("group-row bg-muted/30", rowClassName, className)}
        style={{ ...rowStyle, ...style }}
      >
        <td
          colSpan={columns}
          className={cn("p-2 border-b", cellClassName)}
          onClick={onToggleExpand}
          style={{ cursor: "pointer", ...cellStyle }}
        >
          {renderGroupRow({
            groupKey,
            columnId,
            value,
            depth,
            isExpanded,
            onToggleExpand,
            count,
          })}
        </td>
      </tr>
    );
  }

  // Default group row rendering - simplified ag-grid style
  return (
    <tr
      className={cn("group-row bg-muted/20", rowClassName, className)}
      style={{ ...rowStyle, ...style }}
    >
      <td
        colSpan={columns}
        className={cn("p-2 border-b", cellClassName)}
        onClick={onToggleExpand}
        style={{ cursor: "pointer", ...cellStyle }}
      >
        <div
          className={cn("flex items-center", contentClassName)}
          style={contentStyle}
        >
          <div
            style={{ marginLeft: `${depth * indentSize}px`, ...contentStyle }}
            className={cn("flex items-center text-sm")}
          >
            <button className={cn("mr-1 focus:outline-none", iconClassName)}>
              {isExpanded
                ? collapseIcon || <ChevronDown className="h-3.5 w-3.5" />
                : expandIcon || <ChevronRight className="h-3.5 w-3.5" />}
            </button>
            <span className={cn(labelClassName)}>
              {displayValue}
              <span className={cn(countClassName)}>({count})</span>
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
}
