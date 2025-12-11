import { ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export interface ExpandableGridRowProps<T = any> {
  /** The data row */
  row: T;
  /** Whether the row is currently expanded */
  isExpanded: boolean;
  /** Callback to toggle expansion */
  onToggle: () => void;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Children to render inside the expanded content */
  children?: ReactNode;
}

/**
 * Base expandable row component for Gridular DataGrid.
 *
 * This component provides the basic structure for expandable row content.
 * You can use it directly or extend it to create custom expandable rows.
 *
 * @example
 * // Direct usage
 * <DataGrid
 *   renderExpandedRow={(row) => (
 *     <ExpandableGridRow row={row} isExpanded={expandedRows[row.id]} onToggle={() => toggle(row.id)}>
 *       <div>Custom content here</div>
 *     </ExpandableGridRow>
 *   )}
 * />
 *
 * @example
 * // Extended usage
 * export class CustomExpandableRow extends ExpandableGridRow {
 *   renderContent() {
 *     const { row } = this.props;
 *     return <div>Custom content for {row.name}</div>;
 *   }
 * }
 */
export class ExpandableGridRow<T = any> {
  constructor(protected props: ExpandableGridRowProps<T>) {}

  /**
   * Renders the expand/collapse toggle button.
   * Override this method to customize the toggle button appearance.
   */
  renderToggleButton(): ReactNode {
    const { isExpanded, onToggle } = this.props;

    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="mr-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
    );
  }

  /**
   * Renders the expanded content.
   * Override this method to provide custom expanded content.
   */
  renderContent(): ReactNode {
    return this.props.children;
  }

  /**
   * Renders the container for the expanded row.
   * Override this method to customize the container styling.
   */
  renderContainer(content: ReactNode): ReactNode {
    const { className, style } = this.props;

    return (
      <div
        className={cn(
          'virtualized-grid-expanded-row',
          'border-t border-gray-200 dark:border-gray-700',
          'bg-gray-50 dark:bg-gray-900',
          'px-4 py-3',
          className
        )}
        style={style}
      >
        {content}
      </div>
    );
  }

  /**
   * Main render method.
   * This is called by the DataGrid to render the expanded row.
   */
  render(): ReactNode {
    const content = this.renderContent();
    return this.renderContainer(content);
  }
}

/**
 * Functional component wrapper for ExpandableGridRow.
 * Use this when you want to use the base component directly without extending.
 */
export function BaseExpandableRow<T = any>(props: ExpandableGridRowProps<T>) {
  const instance = new ExpandableGridRow(props);
  return <>{instance.render()}</>;
}
