import { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGridPersistence } from "@/components/data-grid/use-grid-persistence";

const meta: Meta = {
  title: "Data Grid/Hooks/useGridPersistence",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// Component to demonstrate the hook
const GridPersistenceDemoComponent = () => {
  const columns = [
    { id: "name", header: "Name" },
    { id: "email", header: "Email" },
    { id: "role", header: "Role" },
    { id: "status", header: "Status" },
  ];

  const {
    preferences,
    updateColumnWidth,
    updateColumnOrder,
    toggleColumnVisibility,
    resetPreferences,
  } = useGridPersistence("storybook-demo", columns);

  const [localPrefs, setLocalPrefs] = useState(preferences);

  useEffect(() => {
    setLocalPrefs(preferences);
  }, [preferences]);

  return (
    <div className="w-[500px] p-4 border rounded-md space-y-4">
      <h3 className="text-lg font-medium">Grid Persistence Demo</h3>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Current Preferences:</h4>
        <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto h-[200px]">
          {JSON.stringify(localPrefs, null, 2)}
        </pre>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Actions:</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateColumnWidth("name", 200)}
          >
            Set Name Width: 200px
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => updateColumnWidth("email", 250)}
          >
            Set Email Width: 250px
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              updateColumnOrder(["role", "name", "email", "status"])
            }
          >
            Reorder Columns
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => toggleColumnVisibility("email", false)}
          >
            Hide Email
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => toggleColumnVisibility("email", true)}
          >
            Show Email
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => resetPreferences()}
          >
            Reset All
          </Button>
        </div>
      </div>

      <div className="border-t pt-3">
        <p className="text-sm text-gray-500">
          Note: These preferences are stored in your browser's localStorage with
          the key "gridular-preferences-storybook-demo"
        </p>
      </div>
    </div>
  );
};

export const Demo: StoryObj = {
  render: () => <GridPersistenceDemoComponent />,
};
