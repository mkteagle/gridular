"use strict";(self.webpackChunkgridular=self.webpackChunkgridular||[]).push([[641],{"./stories/DataGrid/data-grid-theme.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BorderlessTheme:()=>BorderlessTheme,DarkThemeGrid:()=>DarkThemeGrid,DefaultTheme:()=>DefaultTheme,MinimalTheme:()=>MinimalTheme,ModernTheme:()=>ModernTheme,StripedTheme:()=>StripedTheme,WithCleanClassesAPI:()=>WithCleanClassesAPI,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./stories/utils/data-grid-helpers.tsx"));const __WEBPACK_DEFAULT_EXPORT__={title:"Data Grid/Main/Themes",component:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.AA,decorators:[(Story,context)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.L$,{customTheme:context.args.customTheme,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Story,{})})],parameters:{layout:"padded"}},DefaultTheme={args:{columns:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.YB,data:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.$e,enablePagination:!0,enableSorting:!0,enableRowSelection:!0}},DarkThemeGrid={args:{columns:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.YB,data:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.$e,enablePagination:!0,enableSorting:!0,enableRowSelection:!0,customTheme:{tailwindTheme:{container:"bg-gray-900 border border-gray-700 rounded-md overflow-hidden shadow-lg",header:"bg-gray-800 border-b border-gray-700",headerCell:"text-gray-300 font-medium px-4 py-3",row:"border-b border-gray-700 hover:bg-gray-800 transition-colors",cell:"px-4 py-2 text-sm text-gray-300",pagination:"bg-gray-800 border-t border-gray-700 p-2 flex justify-between items-center text-gray-300",filterMenu:"bg-gray-800 border border-gray-700 shadow-xl rounded-md",filterMenuContent:"p-3 text-gray-300",filterMenuHeader:"font-medium mb-2 text-gray-200",filterMenuInput:"bg-gray-700 border-gray-600 text-gray-200",filterMenuClearButton:"bg-gray-700 hover:bg-gray-600 text-gray-200",filterMenuApplyButton:"bg-blue-600 hover:bg-blue-700 text-white",columnResizeHandle:"w-1 bg-gray-700 hover:bg-blue-400 cursor-col-resize h-full absolute right-0 top-0",columnResizeHandleActive:"bg-blue-400",sortIcon:"text-gray-500",sortIconActive:"text-blue-400",selectedRowClassName:"bg-blue-900/30 border-l-2 border-blue-400"},tssTheme:{colors:{primary:"#3b82f6",secondary:"#9ca3af",background:"#111827",foreground:"#f9fafb",muted:"#1f2937",mutedForeground:"#d1d5db",border:"#374151",accent:"#2563eb",accentForeground:"#bfdbfe",destructive:"#ef4444",destructiveForeground:"#fca5a5"},spacing:4}}}},WithCleanClassesAPI={args:{columns:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.YB,data:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.$e,enablePagination:!0,enableSorting:!0,enableRowSelection:!0,classes:{root:"shadow-lg",header:"bg-gray-100 text-gray-800",row:"hover:bg-blue-50 transition-colors",cell:"px-4 py-2",selectedRow:"bg-blue-100 border-l-2 border-blue-500",pagination:"bg-gray-50 border-t"}}},MinimalTheme={args:{columns:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.YB,data:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.$e,enablePagination:!0,enableSorting:!0,enableRowSelection:!0,customTheme:{tailwindTheme:{container:"border-none shadow-none",header:"bg-transparent border-b border-gray-200",headerCell:"font-normal text-sm text-gray-500 px-3 py-2",row:"border-b border-gray-100 hover:bg-gray-50",cell:"px-3 py-2 text-sm",pagination:"py-1 px-2 flex justify-between items-center text-sm",filterMenu:"bg-white border shadow-sm rounded-sm",filterMenuContent:"p-2",filterMenuHeader:"text-sm mb-1",filterMenuInput:"text-xs border rounded",filterMenuClearButton:"text-xs",filterMenuApplyButton:"text-xs",columnResizeHandle:"w-0.5 bg-gray-200 hover:bg-blue-300",sortIcon:"text-gray-400",sortIconActive:"text-blue-500",selectedRowClassName:"bg-blue-50"}}}},BorderlessTheme={args:{columns:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.YB,data:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.$e,enablePagination:!0,enableSorting:!0,customTheme:{tailwindTheme:{container:"border-none shadow-none",header:"bg-transparent border-b border-gray-200",headerCell:"font-semibold text-gray-700 px-4 py-3",row:"hover:bg-gray-50",cell:"px-4 py-3 border-0",pagination:"p-2 flex justify-between items-center"}}}},StripedTheme={args:{columns:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.YB,data:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.$e,enablePagination:!0,enableSorting:!0,customTheme:{tailwindTheme:{container:"border rounded-lg overflow-hidden shadow-sm",header:"bg-white border-b",headerCell:"font-semibold text-gray-800 px-4 py-3",row:"[&:nth-child(odd)]:bg-gray-50 hover:bg-blue-50",cell:"px-4 py-3 border-0",pagination:"bg-gray-50 p-2 flex justify-between items-center border-t",selectedRowClassName:"bg-blue-100 [&:nth-child(odd)]:bg-blue-100"}}}},ModernTheme={args:{columns:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.YB,data:_utils_data_grid_helpers__WEBPACK_IMPORTED_MODULE_2__.$e,enablePagination:!0,enableSorting:!0,enableRowSelection:!0,customTheme:{tailwindTheme:{container:"border-none rounded-2xl overflow-hidden shadow-xl",header:"bg-gradient-to-r from-blue-500 to-purple-600",headerCell:"text-white font-medium px-6 py-4",row:"border-b border-gray-100 hover:bg-gray-50",cell:"px-6 py-4",pagination:"bg-gray-50 p-3 flex justify-between items-center",filterMenu:"bg-white border-none shadow-xl rounded-xl",filterMenuContent:"p-4",filterMenuHeader:"font-medium mb-2",filterMenuInput:"border rounded-lg p-2",filterMenuClearButton:"bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2",filterMenuApplyButton:"bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2",columnResizeHandle:"w-1 bg-white/50 hover:bg-white h-full absolute right-0 top-0",sortIcon:"text-white/70",sortIconActive:"text-white",selectedRowClassName:"bg-blue-50 border-l-4 border-blue-500"}}}},__namedExportsOrder=["DefaultTheme","DarkThemeGrid","WithCleanClassesAPI","MinimalTheme","BorderlessTheme","StripedTheme","ModernTheme"];DefaultTheme.parameters={...DefaultTheme.parameters,docs:{...DefaultTheme.parameters?.docs,source:{originalSource:"{\n  args: {\n    columns,\n    data: sampleData,\n    enablePagination: true,\n    enableSorting: true,\n    enableRowSelection: true\n  }\n}",...DefaultTheme.parameters?.docs?.source}}},DarkThemeGrid.parameters={...DarkThemeGrid.parameters,docs:{...DarkThemeGrid.parameters?.docs,source:{originalSource:'{\n  args: {\n    columns,\n    data: sampleData,\n    enablePagination: true,\n    enableSorting: true,\n    enableRowSelection: true,\n    customTheme: {\n      tailwindTheme: {\n        container: "bg-gray-900 border border-gray-700 rounded-md overflow-hidden shadow-lg",\n        header: "bg-gray-800 border-b border-gray-700",\n        headerCell: "text-gray-300 font-medium px-4 py-3",\n        row: "border-b border-gray-700 hover:bg-gray-800 transition-colors",\n        cell: "px-4 py-2 text-sm text-gray-300",\n        pagination: "bg-gray-800 border-t border-gray-700 p-2 flex justify-between items-center text-gray-300",\n        filterMenu: "bg-gray-800 border border-gray-700 shadow-xl rounded-md",\n        filterMenuContent: "p-3 text-gray-300",\n        filterMenuHeader: "font-medium mb-2 text-gray-200",\n        filterMenuInput: "bg-gray-700 border-gray-600 text-gray-200",\n        filterMenuClearButton: "bg-gray-700 hover:bg-gray-600 text-gray-200",\n        filterMenuApplyButton: "bg-blue-600 hover:bg-blue-700 text-white",\n        columnResizeHandle: "w-1 bg-gray-700 hover:bg-blue-400 cursor-col-resize h-full absolute right-0 top-0",\n        columnResizeHandleActive: "bg-blue-400",\n        sortIcon: "text-gray-500",\n        sortIconActive: "text-blue-400",\n        selectedRowClassName: "bg-blue-900/30 border-l-2 border-blue-400"\n      },\n      tssTheme: {\n        colors: {\n          primary: "#3b82f6",\n          // blue-500\n          secondary: "#9ca3af",\n          // gray-400\n          background: "#111827",\n          // gray-900\n          foreground: "#f9fafb",\n          // gray-50\n          muted: "#1f2937",\n          // gray-800\n          mutedForeground: "#d1d5db",\n          // gray-300\n          border: "#374151",\n          // gray-700\n          accent: "#2563eb",\n          // blue-600\n          accentForeground: "#bfdbfe",\n          // blue-100\n          destructive: "#ef4444",\n          // red-500\n          destructiveForeground: "#fca5a5" // red-300\n        },\n        spacing: 4\n      }\n    }\n  }\n}',...DarkThemeGrid.parameters?.docs?.source}}},WithCleanClassesAPI.parameters={...WithCleanClassesAPI.parameters,docs:{...WithCleanClassesAPI.parameters?.docs,source:{originalSource:'{\n  args: {\n    columns,\n    data: sampleData,\n    enablePagination: true,\n    enableSorting: true,\n    enableRowSelection: true,\n    classes: {\n      root: "shadow-lg",\n      header: "bg-gray-100 text-gray-800",\n      row: "hover:bg-blue-50 transition-colors",\n      cell: "px-4 py-2",\n      selectedRow: "bg-blue-100 border-l-2 border-blue-500",\n      pagination: "bg-gray-50 border-t"\n    }\n  }\n}',...WithCleanClassesAPI.parameters?.docs?.source}}},MinimalTheme.parameters={...MinimalTheme.parameters,docs:{...MinimalTheme.parameters?.docs,source:{originalSource:'{\n  args: {\n    columns,\n    data: sampleData,\n    enablePagination: true,\n    enableSorting: true,\n    enableRowSelection: true,\n    customTheme: {\n      tailwindTheme: {\n        container: "border-none shadow-none",\n        header: "bg-transparent border-b border-gray-200",\n        headerCell: "font-normal text-sm text-gray-500 px-3 py-2",\n        row: "border-b border-gray-100 hover:bg-gray-50",\n        cell: "px-3 py-2 text-sm",\n        pagination: "py-1 px-2 flex justify-between items-center text-sm",\n        filterMenu: "bg-white border shadow-sm rounded-sm",\n        filterMenuContent: "p-2",\n        filterMenuHeader: "text-sm mb-1",\n        filterMenuInput: "text-xs border rounded",\n        filterMenuClearButton: "text-xs",\n        filterMenuApplyButton: "text-xs",\n        columnResizeHandle: "w-0.5 bg-gray-200 hover:bg-blue-300",\n        sortIcon: "text-gray-400",\n        sortIconActive: "text-blue-500",\n        selectedRowClassName: "bg-blue-50"\n      }\n    }\n  }\n}',...MinimalTheme.parameters?.docs?.source}}},BorderlessTheme.parameters={...BorderlessTheme.parameters,docs:{...BorderlessTheme.parameters?.docs,source:{originalSource:'{\n  args: {\n    columns,\n    data: sampleData,\n    enablePagination: true,\n    enableSorting: true,\n    customTheme: {\n      tailwindTheme: {\n        container: "border-none shadow-none",\n        header: "bg-transparent border-b border-gray-200",\n        headerCell: "font-semibold text-gray-700 px-4 py-3",\n        row: "hover:bg-gray-50",\n        cell: "px-4 py-3 border-0",\n        pagination: "p-2 flex justify-between items-center"\n      }\n    }\n  }\n}',...BorderlessTheme.parameters?.docs?.source}}},StripedTheme.parameters={...StripedTheme.parameters,docs:{...StripedTheme.parameters?.docs,source:{originalSource:'{\n  args: {\n    columns,\n    data: sampleData,\n    enablePagination: true,\n    enableSorting: true,\n    customTheme: {\n      tailwindTheme: {\n        container: "border rounded-lg overflow-hidden shadow-sm",\n        header: "bg-white border-b",\n        headerCell: "font-semibold text-gray-800 px-4 py-3",\n        row: "[&:nth-child(odd)]:bg-gray-50 hover:bg-blue-50",\n        cell: "px-4 py-3 border-0",\n        pagination: "bg-gray-50 p-2 flex justify-between items-center border-t",\n        selectedRowClassName: "bg-blue-100 [&:nth-child(odd)]:bg-blue-100"\n      }\n    }\n  }\n}',...StripedTheme.parameters?.docs?.source}}},ModernTheme.parameters={...ModernTheme.parameters,docs:{...ModernTheme.parameters?.docs,source:{originalSource:'{\n  args: {\n    columns,\n    data: sampleData,\n    enablePagination: true,\n    enableSorting: true,\n    enableRowSelection: true,\n    customTheme: {\n      tailwindTheme: {\n        container: "border-none rounded-2xl overflow-hidden shadow-xl",\n        header: "bg-gradient-to-r from-blue-500 to-purple-600",\n        headerCell: "text-white font-medium px-6 py-4",\n        row: "border-b border-gray-100 hover:bg-gray-50",\n        cell: "px-6 py-4",\n        pagination: "bg-gray-50 p-3 flex justify-between items-center",\n        filterMenu: "bg-white border-none shadow-xl rounded-xl",\n        filterMenuContent: "p-4",\n        filterMenuHeader: "font-medium mb-2",\n        filterMenuInput: "border rounded-lg p-2",\n        filterMenuClearButton: "bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2",\n        filterMenuApplyButton: "bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2",\n        columnResizeHandle: "w-1 bg-white/50 hover:bg-white h-full absolute right-0 top-0",\n        sortIcon: "text-white/70",\n        sortIconActive: "text-white",\n        selectedRowClassName: "bg-blue-50 border-l-4 border-blue-500"\n      }\n    }\n  }\n}',...ModernTheme.parameters?.docs?.source}}}}}]);