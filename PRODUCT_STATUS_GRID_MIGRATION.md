# ProductStatusGrid Migration Example

## Summary of Changes Needed

Your ProductStatusGrid component needs **minimal changes** - mostly just adding `key` properties and renaming `cell` to `renderCell`. Here's the exact diff:

## Changes Required

### 1. Update Imports (Remove ThemeProvider)

```diff
import {
  type ColumnDef,
  DataGrid,
  type GroupingState,
-  ThemeProvider,
  type GroupRowRenderProps,
} from 'gridular';
```

### 2. Update Each Column Definition

For every column in `allColumns`, make these two changes:

```diff
{
  id: 'connectorName',
+  key: 'connectorName',  // ADD THIS LINE
  header: t('Connector'),
  enableGrouping: true,
  enableSorting: true,
  enableFiltering: false,
-  cell: (row: ConnectorFeatureRow) => (
+  renderCell: (row: ConnectorFeatureRow) => (  // RENAME 'cell' to 'renderCell'
    <div className={classes.connectorNameCell}>{row.connectorName}</div>
  ),
  groupFormatter: (value: any) => String(value),
},
```

Repeat for all 9 columns:
- `connectorName` - key: `'connectorName'`
- `featureName` - key: `'featureName'`
- `status` - key: `'enabled'` (the actual data field)
- `integrations` - key: `'enabledIntegrations'` (primary field)
- `classesIds` - key: `'classesWithValidIdentifiers'`
- `classesMappings` - key: `'classesWithValidMappings'`
- `activitiesIds` - key: `'activitiesWithValidIdentifiers'`
- `activitiesMappings` - key: `'activitiesWithValidMappings'`

### 3. Update DataGrid JSX (Remove ThemeProvider and pagination props)

```diff
-      <ThemeProvider>
        <DataGrid
          columns={columns}
          data={tableData}
-          pageIndex={0}
-          pageCount={1}
-          pageSize={tableData.length}
-          totalRows={tableData.length}
-          enablePagination={false}
          enableGrouping={true}
          groupingState={groupingState}
          onGroupingChange={setGroupingState}
          enableSorting={true}
          enableFiltering={false}
-          enableRowSelection={false}  // OPTIONAL: can remove (false is default)
          enableColumnResize={true}
          gridId="product-status-grid"
          hideGroupControls={true}
          hideColumnManager={true}
          renderGroupRow={renderGroupRow}
-          groupExpandIcon={<ChevronDown size={16} />}
-          groupCollapseIcon={<ChevronRight size={16} />}
          classes={{
            container: classes.gridularContainer,
            header: classes.gridularHeader,
            row: classes.gridularRow,
            cell: classes.gridularCell,
          }}
        />
-      </ThemeProvider>
```

## Complete Updated Column Example

Here's one complete column updated to show the pattern:

```typescript
{
  id: 'status',
  key: 'enabled',  // ✅ ADDED - the actual data field name
  header: t('Status'),
  enableSorting: true,
  enableFiltering: false,
  renderCell: (row: ConnectorFeatureRow) => (  // ✅ RENAMED from 'cell'
    <div className={classes.statusCell}>
      <Badge
        type={row.enabled ? 'success' : 'error'}
        text={row.enabled ? t('Enabled') : t('Disabled')}
      />
    </div>
  ),
},
```

## Testing After Migration

1. **Test Grouping**:
   - Switch between "Group By: Connector" and "Group By: Feature"
   - Verify expand/collapse works
   - Check that the correct data shows in groups

2. **Test Sorting**:
   - Click column headers to sort
   - Verify ascending/descending/clear states

3. **Test Column Resizing**:
   - Drag column borders to resize
   - Verify resize persists (gridId: 'product-status-grid')

4. **Test Column Visibility**:
   - Use your custom column manager
   - Verify columns show/hide correctly

5. **Verify Styling**:
   - Check that all custom classes still apply
   - Verify group rows match your design
   - Check metrics colors (good/warning/error)

## Why These Changes?

### `key` Property
The `key` tells the grid which field in the data to use for basic operations like sorting when no custom `sortFn` is provided. Even though you have custom renderers, this is required for internal data handling.

### `renderCell` vs `cell`
Gridular v3 uses `renderCell` to be more explicit and consistent with React naming conventions. The old `cell` prop may still work (for backwards compatibility) but `renderCell` is preferred.

### No ThemeProvider
Gridular v3 doesn't use a theme provider. All styling is done via the `classes` prop (which you're already using) or CSS.

### Pagination Props Consolidated
Instead of 5-6 separate props, pagination is now a single object. When not using pagination, just don't pass the prop.

### Group Icons
The expand/collapse icons are now controlled inside your `renderGroupRow` function (which you're already doing correctly).

## Expected Behavior After Migration

Everything should work exactly the same as before:
- ✅ Grouping by Connector or Feature
- ✅ Custom group row rendering with counts
- ✅ Sorting by clicking headers
- ✅ Column resizing
- ✅ Your custom column visibility controls
- ✅ All styling and colors
- ✅ Badge components for status
- ✅ Metric calculations and coloring

**Plus you get:**
- ⚡ Much better performance with large datasets (virtualization!)
- 📦 Smaller bundle size
- 🐛 Better tested (43 test cases)
- 🔒 Better TypeScript support

## Need Help?

The migration should take ~10 minutes. If you hit any issues:

1. Make sure `key` is set to an actual field in `ConnectorFeatureRow`
2. Check console for any TypeScript errors
3. Verify imports are correct
4. Test in browser dev tools for runtime errors
