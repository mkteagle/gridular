import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { RotateCcw, Settings } from 'lucide-react';
import { cn, tssToInlineStyles } from '../lib/utils';
import type { ColumnDef, GridClasses } from '../types';

interface ColumnManagerProps<T> {
  columns: ColumnDef<T>[];
  visibleColumns: string[];
  toggleColumnVisibility: (columnId: string, visible: boolean) => void;
  resetGridPreferences: () => void;
  align?: 'start' | 'center' | 'end';
  showResetButton?: boolean;
  className?: string;
  classes?: GridClasses;
}

export function ColumnManager<T>({
  columns,
  visibleColumns,
  toggleColumnVisibility,
  resetGridPreferences,
  align = 'start',
  showResetButton = true,
  className,
  classes,
}: ColumnManagerProps<T>) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            'inline-flex items-center px-3 py-1.5 text-sm font-medium text-charcoal bg-ivory border-2 border-copper/40 rounded-md hover:bg-copper/10 hover:border-copper transition-colors shadow-sm',
            classes?.columnManagerTrigger,
            className
          )}
          style={tssToInlineStyles(classes?.columnManagerTriggerStyle)}
        >
          <Settings className="h-3 w-3 mr-1.5 text-copper" />
          <span>Columns</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          sideOffset={4}
          className={cn(
            "z-[9999] w-56 rounded-md border-2 border-copper/40 bg-ivory shadow-xl max-h-[80vh] overflow-auto animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            classes?.columnManagerContent
          )}
          style={tssToInlineStyles(classes?.columnManagerContentStyle)}
        >
          <div className="p-2">
            {columns.map((column) => {
              const isVisible = visibleColumns.includes(column.id);

              return (
                <DropdownMenu.CheckboxItem
                  key={column.id}
                  checked={isVisible}
                  onCheckedChange={(checked) => toggleColumnVisibility(column.id, checked)}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded hover:bg-copper/10 cursor-pointer text-charcoal transition-colors outline-none select-none",
                    classes?.columnManagerItem
                  )}
                  style={tssToInlineStyles(classes?.columnManagerItemStyle)}
                >
                  <span className="flex items-center flex-1">
                    <span className="mr-2 h-4 w-4 flex items-center justify-center border-2 border-copper/50 rounded">
                      <DropdownMenu.ItemIndicator>
                        <svg
                          className="w-3 h-3 text-copper"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </DropdownMenu.ItemIndicator>
                    </span>
                    <span className="font-medium">{column.header}</span>
                  </span>
                </DropdownMenu.CheckboxItem>
              );
            })}

            {showResetButton && (
              <>
                <DropdownMenu.Separator className="my-2 h-0.5 bg-copper/20" />
                <DropdownMenu.Item
                  onSelect={resetGridPreferences}
                  className="flex items-center w-full px-3 py-2 text-sm rounded hover:bg-red-50 text-red-600 cursor-pointer font-medium transition-colors outline-none select-none"
                >
                  <RotateCcw className="h-3 w-3 mr-1.5" />
                  Reset all columns
                </DropdownMenu.Item>
              </>
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
