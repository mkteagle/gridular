import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Layers } from 'lucide-react';
import { cn, tssToInlineStyles } from '../lib/utils';
import type { ColumnDef, GridClasses } from '../types';

interface GroupManagerProps<T> {
  columns: ColumnDef<T>[];
  groupByColumns: string[];
  updateGroupByColumns: (groupByColumns: string[]) => void;
  align?: 'start' | 'center' | 'end';
  className?: string;
  classes?: GridClasses;
}

export function GroupManager<T>({
  columns,
  groupByColumns,
  updateGroupByColumns,
  align = 'start',
  className,
  classes,
}: GroupManagerProps<T>) {
  const groupableColumns = columns.filter(
    (col) => col.enableGrouping !== false
  );

  const toggleColumnGrouping = (columnId: string) => {
    if (groupByColumns.includes(columnId)) {
      updateGroupByColumns(groupByColumns.filter((id) => id !== columnId));
    } else {
      updateGroupByColumns([...groupByColumns, columnId]);
    }
  };

  return (
    <div className={cn(classes?.groupManager, className)} style={tssToInlineStyles(classes?.groupManagerStyle)}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className={cn(
              "inline-flex items-center px-3 py-1.5 text-sm font-medium text-charcoal bg-ivory border-2 border-copper/40 rounded-md hover:bg-copper/10 hover:border-copper transition-colors shadow-sm",
              classes?.groupManagerTrigger
            )}
            style={tssToInlineStyles(classes?.groupManagerTriggerStyle)}
          >
            <Layers className="h-3 w-3 mr-1.5 text-copper" />
            <span>Group by</span>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align={align}
            sideOffset={4}
            className={cn(
              "z-[9999] w-56 rounded-md border-2 border-copper/40 bg-ivory shadow-xl max-h-[80vh] overflow-auto animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
              classes?.groupManagerContent
            )}
            style={tssToInlineStyles(classes?.groupManagerContentStyle)}
          >
            <div className="p-2">
              {groupableColumns.length > 0 ? (
                groupableColumns.map((column) => {
                  const isGrouped = groupByColumns.includes(column.id);

                  return (
                    <DropdownMenu.CheckboxItem
                      key={column.id}
                      checked={isGrouped}
                      onCheckedChange={() => toggleColumnGrouping(column.id)}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded hover:bg-copper/10 cursor-pointer text-charcoal transition-colors outline-none select-none",
                        classes?.groupManagerItem
                      )}
                      style={tssToInlineStyles(classes?.groupManagerItemStyle)}
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
                })
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No groupable columns
                </div>
              )}

              {groupByColumns.length > 0 && (
                <>
                  <DropdownMenu.Separator className="my-2 h-0.5 bg-copper/20" />
                  <DropdownMenu.Item
                    onSelect={() => updateGroupByColumns([])}
                    className="flex items-center w-full px-3 py-2 text-sm rounded hover:bg-copper/10 cursor-pointer text-charcoal font-medium transition-colors outline-none select-none"
                  >
                    Clear all groups
                  </DropdownMenu.Item>
                </>
              )}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
