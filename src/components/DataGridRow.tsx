import { ReactNode, MouseEvent } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn, tssToInlineStyles } from '../lib/utils';
import type { ColumnDef } from '../types';

export interface DataGridRowProps<T = any> {
  /** The data row */
  row: T;
  /** Row index */
  rowIndex: number;
  /** Row ID (from getRowId) */
  rowId: string;
  /** Column definitions */
  columns: ColumnDef<T>[];
  /** Whether the row is selected */
  isSelected: boolean;
  /** Whether the row is expanded */
  isExpanded: boolean;
  /** Whether expandable rows are enabled */
  enableExpandableRows?: boolean;
  /** Whether cell selection is enabled */
  enableCellSelection?: boolean;
  /** Currently selected cell ID */
  selectedCell?: string;
  /** Custom classes from DataGrid */
  classes?: any;
  /** Total width for the row */
  totalWidth: number;
  /** Function to get column width */
  getColumnWidth: (column: ColumnDef<T>) => string;
  /** Custom cell renderer from DataGrid */
  renderCell?: (params: { value: any; row: T; column: ColumnDef<T>; rowIndex: number }) => ReactNode;
  /** Callback for row click */
  onRowClick?: (row: T, event: MouseEvent) => void;
  /** Callback for row mouse down */
  onRowMouseDown?: (row: T, event: MouseEvent) => void;
  /** Callback for row mouse enter */
  onRowMouseEnter?: (row: T, event: MouseEvent) => void;
  /** Callback for toggle expand */
  onToggleExpand?: (rowId: string) => void;
  /** Callback for cell selection */
  onCellSelect?: (rowId: string, columnId: string) => void;
  /** Function to render expanded content */
  renderExpandedRow?: (row: T) => ReactNode;
}

/**
 * Base DataGridRow component for Gridular DataGrid.
 *
 * This component provides the complete structure for rendering a data grid row.
 * You can extend this class to customize any aspect of row rendering, including:
 * - Individual cell rendering
 * - Row styling and classes
 * - Expanded content
 * - Click handlers
 * - Hover states
 *
 * @example
 * // Direct usage with renderRow prop
 * <DataGrid
 *   renderRow={(props) => <BaseDataGridRow {...props} />}
 * />
 *
 * @example
 * // Extended usage with custom cell rendering
 * export class CustomDataGridRow extends DataGridRow {
 *   renderCell(column: ColumnDef, colIndex: number) {
 *     const { row } = this.props;
 *     return (
 *       <OverflowingText>
 *         {String(row[column.key] ?? '')}
 *       </OverflowingText>
 *     );
 *   }
 * }
 *
 * <DataGrid
 *   renderRow={(props) => {
 *     const row = new CustomDataGridRow(props);
 *     return row.render();
 *   }}
 * />
 */
export class DataGridRow<T = any> {
  constructor(protected props: DataGridRowProps<T>) {}

  /**
   * Get the CSS classes for the row container.
   * Override to customize row styling.
   */
  getRowClassName(): string {
    const { isSelected, classes } = this.props;
    return cn(
      'virtualized-grid-row',
      isSelected && classes?.selectedRow,
      classes?.row
    );
  }

  /**
   * Get inline styles for the row container.
   * Override to add custom row styles.
   */
  getRowStyle(): React.CSSProperties {
    const { totalWidth, classes } = this.props;
    return {
      ...tssToInlineStyles(classes?.rowStyle),
      width: totalWidth,
    };
  }

  /**
   * Renders the expand/collapse toggle button.
   * Override to customize the toggle button appearance.
   */
  renderExpandButton(): ReactNode {
    const { isExpanded, onToggleExpand, rowId } = this.props;

    if (!onToggleExpand) return null;

    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleExpand(rowId);
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
   * Get the CSS classes for a cell.
   * Override to customize cell styling.
   */
  getCellClassName(column: ColumnDef<T>, _colIndex: number): string {
    const { enableCellSelection, selectedCell, rowId, classes } = this.props;
    const isCellSelected = enableCellSelection && selectedCell === `${rowId}-${column.id}`;

    return cn(
      'virtualized-grid-cell',
      classes?.cell,
      isCellSelected && classes?.selectedCell
    );
  }

  /**
   * Get inline styles for a cell.
   * Override to add custom cell styles.
   */
  getCellStyle(column: ColumnDef<T>): React.CSSProperties {
    const { getColumnWidth, classes } = this.props;
    return {
      ...tssToInlineStyles(classes?.cellStyle),
      ...tssToInlineStyles(column.cellStyle),
      width: getColumnWidth(column),
    };
  }

  /**
   * Renders the content of a single cell.
   * Override this method to customize how cell content is rendered.
   */
  renderCellContent(column: ColumnDef<T>, colIndex: number): ReactNode {
    const { row, rowIndex, renderCell, enableExpandableRows, renderExpandedRow } = this.props;

    // Show expand button in first cell if expandable rows are enabled
    const expandButton =
      enableExpandableRows && renderExpandedRow && colIndex === 0 ? this.renderExpandButton() : null;

    // Render the cell value
    let cellValue: ReactNode;
    if (renderCell) {
      cellValue = renderCell({ value: (row as any)[column.key], row, column, rowIndex });
    } else if (column.render) {
      cellValue = column.render(row);
    } else if (column.renderCell) {
      cellValue = column.renderCell(row);
    } else {
      cellValue = String((row as any)[column.key] ?? '');
    }

    return (
      <>
        {expandButton}
        {cellValue}
      </>
    );
  }

  /**
   * Renders a single cell.
   * Override to completely customize cell rendering including the cell wrapper.
   */
  renderCell(column: ColumnDef<T>, colIndex: number): ReactNode {
    const { enableCellSelection, onCellSelect, rowId } = this.props;

    return (
      <div
        key={column.id}
        className={this.getCellClassName(column, colIndex)}
        style={this.getCellStyle(column)}
        onClick={(e) => {
          if (enableCellSelection && onCellSelect) {
            e.stopPropagation();
            onCellSelect(rowId, column.id);
          }
        }}
      >
        <div className="cell-content">{this.renderCellContent(column, colIndex)}</div>
      </div>
    );
  }

  /**
   * Renders all cells in the row.
   * Override to customize how multiple cells are rendered together.
   */
  renderCells(): ReactNode {
    const { columns } = this.props;
    return columns.map((column, colIndex) => this.renderCell(column, colIndex));
  }

  /**
   * Renders the expanded row content.
   * Override to customize expanded content rendering.
   */
  renderExpandedContent(): ReactNode {
    const { enableExpandableRows, isExpanded, renderExpandedRow, row } = this.props;

    if (!enableExpandableRows || !isExpanded || !renderExpandedRow) {
      return null;
    }

    return renderExpandedRow(row);
  }

  /**
   * Handles row click event.
   * Override to customize click behavior.
   */
  handleRowClick = (e: MouseEvent) => {
    const { onRowClick, row } = this.props;
    if (onRowClick) {
      onRowClick(row, e);
    }
  };

  /**
   * Handles row mouse down event.
   * Override to customize mouse down behavior.
   */
  handleRowMouseDown = (e: MouseEvent) => {
    const { onRowMouseDown, row } = this.props;
    if (onRowMouseDown) {
      onRowMouseDown(row, e);
    }
  };

  /**
   * Handles row mouse enter event.
   * Override to customize hover behavior.
   */
  handleRowMouseEnter = (e: MouseEvent) => {
    const { onRowMouseEnter, row } = this.props;
    if (onRowMouseEnter) {
      onRowMouseEnter(row, e);
    }
  };

  /**
   * Main render method.
   * Override to completely customize the row structure.
   */
  render(): ReactNode {
    const { rowId } = this.props;

    return (
      <div key={rowId}>
        <div
          className={this.getRowClassName()}
          style={this.getRowStyle()}
          onClick={this.handleRowClick}
          onMouseDown={this.handleRowMouseDown}
          onMouseEnter={this.handleRowMouseEnter}
        >
          {this.renderCells()}
          <div className="row-shimmer" />
        </div>
        {this.renderExpandedContent()}
      </div>
    );
  }
}

/**
 * Functional component wrapper for DataGridRow.
 * Use this when you want to use the base component directly without extending.
 */
export function BaseDataGridRow<T = any>(props: DataGridRowProps<T>) {
  const instance = new DataGridRow(props);
  return <>{instance.render()}</>;
}
