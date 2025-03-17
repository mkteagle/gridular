import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DataGrid, ThemeProvider } from "../components/data-grid";

const meta: Meta<typeof DataGrid> = {
  title: "Components/DataGrid",
  component: DataGrid,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

// Sample data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
}

const users: User[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
  status: i % 4 === 0 ? "inactive" : i % 5 === 0 ? "pending" : "active",
  lastLogin: new Date(
    Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .split("T")[0],
}));

export const Default: Story = {
  args: {
    columns: [
      {
        id: "name",
        header: "Name",
        width: 200,
      },
      {
        id: "email",
        header: "Email",
        width: 250,
      },
      {
        id: "role",
        header: "Role",
        width: 150,
      },
      {
        id: "status",
        header: "Status",
        cell: (row: unknown) => {
          const user = row as User;
          return (
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  user.status === "active"
                    ? "bg-green-500"
                    : user.status === "inactive"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              />
              <span className="capitalize">{user.status}</span>
            </div>
          );
        },
        width: 150,
      },
      {
        id: "lastLogin",
        header: "Last Login",
        width: 150,
      },
    ],
    data: users,
  },
};

export const WithRowSelection: Story = {
  args: {
    ...Default.args,
    enableRowSelection: true,
  },
};

export const WithoutFiltering: Story = {
  args: {
    ...Default.args,
    enableFiltering: false,
  },
};

export const WithoutSorting: Story = {
  args: {
    ...Default.args,
    enableSorting: false,
  },
};

export const WithoutPagination: Story = {
  args: {
    ...Default.args,
    enablePagination: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
  },
};

export const CustomTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider
        theme={{
          container: "bg-slate-50 border-slate-200",
          header: "bg-slate-100",
          headerCell: "text-slate-700 font-bold",
          row: "border-b border-slate-200 hover:bg-slate-100",
          cell: "text-slate-800",
          pagination: "bg-slate-50 border-t border-slate-200",
        }}
      >
        <div className="p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  args: {
    ...Default.args,
  },
};
