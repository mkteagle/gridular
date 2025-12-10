import { useState, useEffect } from 'react';
import { GridPreferences } from '../types';

export function useGridPersistence(
  gridId: string,
  columns: { id: string }[],
  defaultColumnWidth = 150
) {
  const storageKey = `virtualized-grid-preferences-${gridId}`;

  // Initialize with default values
  const getDefaultPreferences = (): GridPreferences => ({
    columnWidths: columns.reduce((acc, col) => {
      acc[col.id] = defaultColumnWidth;
      return acc;
    }, {} as Record<string, number>),
    columnOrder: columns.map((col) => col.id),
    hiddenColumns: [],
    groupByColumns: [],
    expandedGroups: {},
  });

  // Load preferences from localStorage
  const loadPreferences = (): GridPreferences => {
    if (typeof window === 'undefined') return getDefaultPreferences();

    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return getDefaultPreferences();

      const parsed = JSON.parse(stored) as GridPreferences;

      // Ensure all columns exist in the preferences
      const updated = {
        ...parsed,
        // Ensure these fields exist
        groupByColumns: parsed.groupByColumns || [],
        expandedGroups: parsed.expandedGroups || {},
      };

      // Add any new columns that don't exist in saved preferences
      columns.forEach((col) => {
        if (!parsed.columnWidths[col.id]) {
          updated.columnWidths[col.id] = defaultColumnWidth;
        }
        if (!parsed.columnOrder.includes(col.id)) {
          updated.columnOrder.push(col.id);
        }
      });

      return updated;
    } catch (error) {
      console.error('Failed to load grid preferences', error);
      return getDefaultPreferences();
    }
  };

  const [preferences, setPreferences] = useState<GridPreferences>(
    getDefaultPreferences()
  );

  // Load preferences on mount
  useEffect(() => {
    setPreferences(loadPreferences());
  }, []);

  // Save preferences to localStorage
  const savePreferences = (newPreferences: GridPreferences) => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(newPreferences));
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Failed to save grid preferences', error);
    }
  };

  // Update column width
  const updateColumnWidth = (columnId: string, width: number) => {
    savePreferences({
      ...preferences,
      columnWidths: {
        ...preferences.columnWidths,
        [columnId]: width,
      },
    });
  };

  // Update column order
  const updateColumnOrder = (newOrder: string[]) => {
    savePreferences({
      ...preferences,
      columnOrder: newOrder,
    });
  };

  // Toggle column visibility
  const toggleColumnVisibility = (columnId: string, visible: boolean) => {
    const hiddenColumns = [...preferences.hiddenColumns];

    if (!visible && !hiddenColumns.includes(columnId)) {
      hiddenColumns.push(columnId);
    } else if (visible) {
      const index = hiddenColumns.indexOf(columnId);
      if (index !== -1) {
        hiddenColumns.splice(index, 1);
      }
    }

    savePreferences({
      ...preferences,
      hiddenColumns,
    });
  };

  // Add new grouping methods
  const updateGroupByColumns = (groupByColumns: string[]) => {
    savePreferences({
      ...preferences,
      groupByColumns,
    });
  };

  const toggleGroupExpanded = (groupKey: string, expanded: boolean) => {
    savePreferences({
      ...preferences,
      expandedGroups: {
        ...preferences.expandedGroups,
        [groupKey]: expanded,
      },
    });
  };

  // Reset preferences to defaults
  const resetPreferences = () => {
    savePreferences(getDefaultPreferences());
  };

  return {
    preferences,
    updateColumnWidth,
    updateColumnOrder,
    toggleColumnVisibility,
    updateGroupByColumns,
    toggleGroupExpanded,
    resetPreferences,
  };
}
