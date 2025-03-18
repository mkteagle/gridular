var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value2) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key2] = value2;
var __spreadValues = (a4, b6) => {
  for (var prop in b6 || (b6 = {}))
    if (__hasOwnProp.call(b6, prop))
      __defNormalProp(a4, prop, b6[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b6)) {
      if (__propIsEnum.call(b6, prop))
        __defNormalProp(a4, prop, b6[prop]);
    }
  return a4;
};
var __spreadProps = (a4, b6) => __defProps(a4, __getOwnPropDescs(b6));
var __require = /* @__PURE__ */ ((x6) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x6, {
  get: (a4, b6) => (typeof require !== "undefined" ? require : a4)[b6]
}) : x6)(function(x6) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x6 + '" is not supported');
});
var __objRest = (source2, exclude) => {
  var target = {};
  for (var prop in source2)
    if (__hasOwnProp.call(source2, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source2[prop];
  if (source2 != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source2)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source2, prop))
        target[prop] = source2[prop];
    }
  return target;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to3, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to3, key2) && key2 !== except)
        __defProp(to3, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to3;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal2(a4, b6) {
      if (a4 === b6) return true;
      if (a4 && b6 && typeof a4 == "object" && typeof b6 == "object") {
        if (a4.constructor !== b6.constructor) return false;
        var length, i3, keys;
        if (Array.isArray(a4)) {
          length = a4.length;
          if (length != b6.length) return false;
          for (i3 = length; i3-- !== 0; )
            if (!equal2(a4[i3], b6[i3])) return false;
          return true;
        }
        if (a4.constructor === RegExp) return a4.source === b6.source && a4.flags === b6.flags;
        if (a4.valueOf !== Object.prototype.valueOf) return a4.valueOf() === b6.valueOf();
        if (a4.toString !== Object.prototype.toString) return a4.toString() === b6.toString();
        keys = Object.keys(a4);
        length = keys.length;
        if (length !== Object.keys(b6).length) return false;
        for (i3 = length; i3-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b6, keys[i3])) return false;
        for (i3 = length; i3-- !== 0; ) {
          var key2 = keys[i3];
          if (!equal2(a4[key2], b6[key2])) return false;
        }
        return true;
      }
      return a4 !== a4 && b6 !== b6;
    };
  }
});

// components/data-grid/data-grid.tsx
import React9, { useMemo as useMemo2, useRef, useState as useState5, useEffect as useEffect3 } from "react";

// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function mergeStyles(tssStyles, tailwindClasses) {
  const tailwindClassString = Array.isArray(tailwindClasses) ? tailwindClasses.join(" ") : tailwindClasses;
  if (!tssStyles) {
    return { className: tailwindClassString };
  }
  const _a2 = tssStyles, { className: tssClassName } = _a2, otherStyles = __objRest(_a2, ["className"]);
  const mergedClassName = tssClassName ? cn(tssClassName, tailwindClassString) : tailwindClassString;
  return __spreadProps(__spreadValues({}, otherStyles), {
    className: mergedClassName
  });
}

// components/data-grid/table-header.tsx
import React3, { useState as useState3 } from "react";

// components/data-grid/filter-menu.tsx
import React2, { useState as useState2, useEffect } from "react";

// components/theme-provider/theme-provider.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import { createMakeStyles } from "tss-react";
var lightTheme = {
  colors: {
    primary: "#2563eb",
    // blue-600
    secondary: "#6b7280",
    // gray-500
    background: "#ffffff",
    foreground: "#1e1e21",
    // slate-950
    muted: "#f1f5f9",
    // slate-100
    mutedForeground: "#64748b",
    // slate-500
    border: "#e2e8f0",
    // slate-200
    popover: "#ffffff"
  }
};
var darkTheme = {
  colors: {
    primary: "#3b82f6",
    // blue-500
    secondary: "#9ca3af",
    // gray-400
    background: "#121314",
    foreground: "#f8fafc",
    // slate-50
    muted: "#1e293b",
    // slate-800
    mutedForeground: "#94a3b8",
    // slate-400
    border: "#334155",
    // slate-700
    popover: "#1a1c1e"
  }
};
var defaultTailwindTheme = {
  container: "bg-background border border-border rounded-md overflow-hidden",
  header: "bg-muted/50 border-b border-border",
  headerCell: "text-muted-foreground font-medium px-4 py-3",
  row: "border-b border-border hover:bg-muted/30 transition-colors",
  cell: "px-4 py-2 text-sm",
  pagination: "bg-background border-t border-border p-2 flex justify-between items-center",
  filterMenu: "bg-popover border border-border shadow-md rounded-md",
  filterMenuContent: "p-3",
  filterMenuHeader: "font-medium mb-2",
  filterMenuInput: "",
  filterMenuClearButton: "",
  filterMenuApplyButton: "",
  columnResizeHandle: "w-1 bg-border hover:bg-primary cursor-col-resize h-full absolute right-0 top-0",
  columnResizeHandleActive: "bg-primary",
  sortIcon: "text-muted-foreground",
  sortIconActive: "text-foreground"
};
var createSpacingFunction = (baseSpacing = 4) => {
  const spacingFn = (...args2) => {
    if (args2.length === 0) return "0";
    return args2.map((factor) => factor === 0 ? "0" : `${factor * baseSpacing}px`).join(" ");
  };
  spacingFn.baseSpacing = baseSpacing;
  return spacingFn;
};
var defaultTssTheme = {
  colors: {
    primary: "#2563eb",
    // blue-600
    secondary: "#6b7280",
    // gray-500
    background: "#ffffff",
    foreground: "#020617",
    // slate-950
    muted: "#f1f5f9",
    // slate-100
    mutedForeground: "#64748b",
    // slate-500
    border: "#e2e8f0"
    // slate-200
  },
  spacing: createSpacingFunction(4)
};
var defaultUnifiedTheme = {
  classes: defaultTailwindTheme,
  colors: defaultTssTheme.colors,
  spacing: defaultTssTheme.spacing
};
var ThemeContext = createContext({
  theme: defaultUnifiedTheme,
  setTailwindTheme: () => {
  },
  setTssTheme: () => {
  },
  resetTheme: () => {
  },
  toggleThemeMode: () => {
  }
  // Add default no-op implementation
});
var ThemeProvider = ({
  children,
  initialTailwindTheme = {},
  initialTssTheme = {},
  darkMode = false
}) => {
  const baseTheme = darkMode ? darkTheme : lightTheme;
  const [tailwindTheme, setTailwindThemeState] = useState(initialTailwindTheme);
  const [tssTheme, setTssThemeState] = useState(() => {
    const _a2 = initialTssTheme, { spacing } = _a2, rest = __objRest(_a2, ["spacing"]);
    const processedSpacing = spacing !== void 0 ? typeof spacing === "number" ? createSpacingFunction(spacing) : spacing : void 0;
    return __spreadValues(__spreadValues(__spreadValues({}, baseTheme), rest), processedSpacing && { spacing: processedSpacing });
  });
  const setTailwindTheme = (newTheme) => {
    setTailwindThemeState((prev) => __spreadValues(__spreadValues({}, prev), newTheme));
  };
  const setTssTheme = (newTheme) => {
    setTssThemeState((prev) => {
      const updatedTheme = __spreadValues({}, prev);
      if (newTheme.colors) {
        updatedTheme.colors = __spreadValues(__spreadValues({}, prev.colors || {}), newTheme.colors);
      }
      if (newTheme.spacing !== void 0) {
        if (typeof newTheme.spacing === "number") {
          updatedTheme.spacing = createSpacingFunction(newTheme.spacing);
        } else {
          updatedTheme.spacing = newTheme.spacing;
        }
      }
      const otherKeys = Object.keys(newTheme).filter(
        (key2) => key2 !== "colors" && key2 !== "spacing"
      );
      otherKeys.forEach((key2) => {
        updatedTheme[key2] = newTheme[key2];
      });
      return updatedTheme;
    });
  };
  const resetTheme = () => {
    setTailwindThemeState(initialTailwindTheme);
    setTssThemeState(() => {
      const _a2 = initialTssTheme, { spacing } = _a2, rest = __objRest(_a2, ["spacing"]);
      const processedSpacing = spacing !== void 0 ? typeof spacing === "number" ? createSpacingFunction(spacing) : spacing : void 0;
      return __spreadValues(__spreadValues(__spreadValues({}, baseTheme), rest), processedSpacing && { spacing: processedSpacing });
    });
  };
  const toggleThemeMode = () => {
    setTssThemeState((prev) => {
      var _a2, _b;
      const isDarkMode = ((_a2 = prev.colors) == null ? void 0 : _a2.background) === ((_b = darkTheme.colors) == null ? void 0 : _b.background);
      const newBaseTheme = isDarkMode ? lightTheme : darkTheme;
      return __spreadProps(__spreadValues({}, prev), {
        colors: __spreadValues(__spreadValues({}, newBaseTheme.colors), Object.fromEntries(
          Object.entries(prev.colors || {}).filter(
            ([key2]) => !(key2 in newBaseTheme.colors)
          )
        ))
      });
    });
    setTailwindThemeState((prev) => {
      var _a2, _b;
      const isDarkMode = ((_a2 = tssTheme.colors) == null ? void 0 : _a2.background) === ((_b = darkTheme.colors) == null ? void 0 : _b.background);
      const rowClass = isDarkMode ? "border-b border-border hover:bg-muted/30 transition-colors" : "border-b border-border hover:bg-muted/50 transition-colors";
      return __spreadProps(__spreadValues({}, prev), {
        row: rowClass
        // Other class adjustments as needed
      });
    });
  };
  const value2 = useMemo(() => {
    const mergedTailwindTheme = Object.keys(defaultTailwindTheme).reduce(
      (acc, key2) => {
        const k7 = key2;
        acc[k7] = tailwindTheme[k7] !== void 0 ? cn(defaultTailwindTheme[k7], tailwindTheme[k7]) : defaultTailwindTheme[k7];
        return acc;
      },
      {}
    );
    const mergedTssTheme = {
      colors: __spreadValues(__spreadValues({}, defaultTssTheme.colors), tssTheme.colors || {}),
      spacing: tssTheme.spacing || defaultTssTheme.spacing
    };
    const otherKeys = Object.keys(tssTheme).filter(
      (key2) => key2 !== "colors" && key2 !== "spacing"
    );
    const extraProperties = {};
    otherKeys.forEach((key2) => {
      extraProperties[key2] = tssTheme[key2];
    });
    const unifiedTheme = __spreadValues({
      classes: mergedTailwindTheme,
      colors: mergedTssTheme.colors,
      spacing: mergedTssTheme.spacing
    }, extraProperties);
    return {
      theme: unifiedTheme,
      setTailwindTheme,
      setTssTheme,
      resetTheme,
      toggleThemeMode
      // Include the new toggle function
    };
  }, [tailwindTheme, tssTheme]);
  return /* @__PURE__ */ React.createElement(ThemeContext.Provider, { value: value2 }, children);
};
var useTheme = () => useContext(ThemeContext);
var useTailwindTheme = () => useTheme().theme.classes;
var useTssTheme = () => ({
  colors: useTheme().theme.colors,
  spacing: useTheme().theme.spacing
});
var { makeStyles, useStyles: useTssStyles } = createMakeStyles({
  useTheme: () => useTssTheme()
});
var useStyles = (stylesFn) => {
  const { css, cx } = useTssStyles();
  const styles = {};
  const styleObj = stylesFn(useTssTheme());
  Object.entries(styleObj).forEach(([key2, value2]) => {
    styles[key2] = css(value2);
  });
  return { styles, cx };
};

// components/data-grid/filter-menu.tsx
var FilterMenu = ({
  column,
  filterValue,
  setFilterValue,
  onApplyFilter,
  onClearFilter,
  isOpen,
  onOpenChange,
  trigger,
  isActive = false,
  classes = {},
  renderHeader,
  renderCurrentFilter,
  renderInput,
  renderButtons,
  renderCustomContent
}) => {
  const [localFilterValue, setLocalFilterValue] = useState2(filterValue);
  const { theme } = useTheme();
  useEffect(() => {
    setLocalFilterValue(filterValue);
  }, [filterValue]);
  useEffect(() => {
    if (isOpen) {
      setLocalFilterValue(filterValue);
    }
  }, [isOpen, filterValue]);
  const handleApplyFilter = () => {
    setFilterValue(localFilterValue);
    onApplyFilter(localFilterValue);
    onOpenChange(false);
  };
  const handleClearFilter = () => {
    setLocalFilterValue("");
    onClearFilter();
    onOpenChange(false);
  };
  const handleKeyDown = (e3) => {
    if (e3.key === "Enter") {
      handleApplyFilter();
    } else if (e3.key === "Escape") {
      onOpenChange(false);
    }
  };
  if (!isOpen) {
    return /* @__PURE__ */ React2.createElement("div", { className: "relative" }, /* @__PURE__ */ React2.createElement("div", { onClick: () => onOpenChange(true) }, trigger), isActive && /* @__PURE__ */ React2.createElement("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full text-[10px] flex items-center justify-center text-primary-foreground" }, "\u2022"));
  }
  if (renderCustomContent) {
    return /* @__PURE__ */ React2.createElement(
      "div",
      {
        className: cn(
          "absolute z-50 mt-1 min-w-[200px]",
          theme.classes.filterMenu,
          classes.container
        )
      },
      renderCustomContent({
        column,
        filterValue: localFilterValue,
        setFilterValue: setLocalFilterValue,
        onApply: handleApplyFilter,
        onClear: handleClearFilter,
        isActive
      })
    );
  }
  return /* @__PURE__ */ React2.createElement(
    "div",
    {
      className: cn(
        "absolute z-50 mt-1 min-w-[200px]",
        theme.classes.filterMenu,
        classes.container
      )
    },
    /* @__PURE__ */ React2.createElement("div", { className: cn("p-3", theme.classes.filterMenuContent) }, /* @__PURE__ */ React2.createElement(
      "div",
      {
        className: cn(
          "font-medium mb-2",
          theme.classes.filterMenuHeader,
          classes.header
        )
      },
      renderHeader ? renderHeader(column, isActive) : /* @__PURE__ */ React2.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React2.createElement("span", null, "Filter: ", column.header), isActive && /* @__PURE__ */ React2.createElement(
        "span",
        {
          className: cn(
            "ml-2 text-xs px-1 rounded bg-primary/20 text-primary",
            classes.activeIndicator
          )
        },
        "Active"
      ))
    ), isActive && filterValue && /* @__PURE__ */ React2.createElement("div", { className: "mb-2" }, renderCurrentFilter ? renderCurrentFilter(filterValue) : /* @__PURE__ */ React2.createElement(
      "div",
      {
        className: cn(
          "text-xs bg-muted p-1 rounded",
          classes.currentFilter
        )
      },
      "Current filter: ",
      /* @__PURE__ */ React2.createElement("strong", null, filterValue)
    )), renderInput ? renderInput({
      value: localFilterValue,
      onChange: setLocalFilterValue,
      onKeyDown: handleKeyDown,
      isActive
    }) : /* @__PURE__ */ React2.createElement(
      "input",
      {
        type: "text",
        value: localFilterValue,
        onChange: (e3) => setLocalFilterValue(e3.target.value),
        onKeyDown: handleKeyDown,
        className: cn(
          "w-full p-2 border rounded-md",
          theme.classes.filterMenuInput,
          classes.input
        ),
        placeholder: "Filter value...",
        autoFocus: true
      }
    ), renderButtons ? renderButtons({
      onClear: handleClearFilter,
      onApply: handleApplyFilter,
      isActive
    }) : /* @__PURE__ */ React2.createElement(
      "div",
      {
        className: cn(
          "flex justify-between mt-2 gap-2",
          classes.buttonContainer
        )
      },
      /* @__PURE__ */ React2.createElement(
        "button",
        {
          onClick: handleClearFilter,
          className: cn(
            "px-3 py-1 text-sm rounded-md border",
            theme.classes.filterMenuClearButton,
            classes.clearButton
          )
        },
        "Clear"
      ),
      /* @__PURE__ */ React2.createElement(
        "button",
        {
          onClick: handleApplyFilter,
          className: cn(
            "px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md",
            theme.classes.filterMenuApplyButton,
            classes.applyButton
          )
        },
        "Apply"
      )
    ))
  );
};

// components/data-grid/table-header.tsx
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Filter
} from "lucide-react";
function TableHeader({
  columns,
  sortState,
  onSortChange,
  enableSorting,
  filterState,
  filterMenuOpen,
  onFilterMenuToggle,
  columnWidths,
  onColumnResize,
  headerClassName,
  filterValueRefs,
  onApplyFilter,
  onClearFilter,
  onColumnReorder,
  renderHeader = void 0,
  renderSortIcon,
  renderFilterIcon,
  sortIconVariant = "arrows",
  filterMenu
}) {
  const { theme } = useTheme();
  const [draggedColumn, setDraggedColumn] = useState3(null);
  const [dragOverColumn, setDragOverColumn] = useState3(null);
  const handleColumnResizeStart = (columnId, e3) => {
    e3.preventDefault();
    const startX = e3.clientX;
    const startWidth = columnWidths[columnId] || 150;
    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(50, startWidth + deltaX);
      onColumnResize(columnId, newWidth);
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleDragStart = (e3, columnId) => {
    e3.dataTransfer.setData("text/plain", columnId);
    e3.dataTransfer.effectAllowed = "move";
    setDraggedColumn(columnId);
  };
  const handleDragOver = (e3, columnId) => {
    e3.preventDefault();
    e3.dataTransfer.dropEffect = "move";
    if (draggedColumn && draggedColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };
  const handleDragEnter = (e3) => {
    e3.preventDefault();
  };
  const handleDragLeave = () => {
    setDragOverColumn(null);
  };
  const handleDrop = (e3, targetId) => {
    e3.preventDefault();
    const sourceId = e3.dataTransfer.getData("text/plain");
    if (sourceId && targetId && sourceId !== targetId) {
      onColumnReorder(sourceId, targetId);
    }
    setDraggedColumn(null);
    setDragOverColumn(null);
  };
  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };
  const defaultSortIcon = (column, sortDirection) => {
    if (!sortDirection) return null;
    if (sortIconVariant === "none") return null;
    if (sortIconVariant === "chevrons") {
      return sortDirection === "asc" ? /* @__PURE__ */ React3.createElement(ChevronUp, { className: "ml-2 h-4 w-4 text-primary" }) : /* @__PURE__ */ React3.createElement(ChevronDown, { className: "ml-2 h-4 w-4 text-primary" });
    }
    return sortDirection === "asc" ? /* @__PURE__ */ React3.createElement(ArrowUp, { className: "ml-2 h-4 w-4 text-primary" }) : /* @__PURE__ */ React3.createElement(ArrowDown, { className: "ml-2 h-4 w-4 text-primary" });
  };
  const defaultFilterIcon = (column, isActive) => {
    return /* @__PURE__ */ React3.createElement(
      Filter,
      {
        className: cn(
          "h-4 w-4 ml-1",
          isActive ? theme.classes.sortIconActive : theme.classes.sortIcon
        )
      }
    );
  };
  return /* @__PURE__ */ React3.createElement("thead", null, /* @__PURE__ */ React3.createElement("tr", { className: cn(theme.classes.header, headerClassName) }, columns.map((column) => {
    const sortDirection = sortState && sortState.column === column.id ? sortState.direction : null;
    const hasActiveFilter = !!(filterState == null ? void 0 : filterState[column.id]);
    const width = columnWidths[column.id] || column.width || 150;
    return /* @__PURE__ */ React3.createElement(
      "th",
      {
        key: column.id,
        className: cn(
          theme.classes.headerCell,
          column.headerClassName,
          dragOverColumn === column.id && "bg-primary/10"
        ),
        style: {
          width: `${width}px`,
          minWidth: `${width}px`,
          maxWidth: `${width}px`,
          position: "relative"
        },
        draggable: true,
        onDragStart: (e3) => handleDragStart(e3, column.id),
        onDragOver: (e3) => handleDragOver(e3, column.id),
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDrop: (e3) => handleDrop(e3, column.id),
        onDragEnd: handleDragEnd
      },
      /* @__PURE__ */ React3.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React3.createElement(
        "div",
        {
          className: cn(
            "cursor-pointer",
            enableSorting && column.enableSorting !== false && "hover:text-foreground"
          ),
          onClick: () => {
            if (enableSorting && column.enableSorting !== false) {
              onSortChange(column.id);
            }
          }
        },
        renderHeader ? renderHeader(column, sortDirection) : /* @__PURE__ */ React3.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React3.createElement("span", null, column.header), enableSorting && column.enableSorting !== false && sortDirection && /* @__PURE__ */ React3.createElement("div", { className: "ml-1" }, renderSortIcon ? renderSortIcon(column, sortDirection) : defaultSortIcon(column, sortDirection)))
      ), column.enableFiltering !== false && /* @__PURE__ */ React3.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React3.createElement(
        FilterMenu,
        __spreadValues({
          column,
          filterValue: filterValueRefs.current[column.id] || "",
          setFilterValue: (value2) => {
            filterValueRefs.current[column.id] = value2;
          },
          onApplyFilter,
          onClearFilter,
          isOpen: filterMenuOpen === column.id,
          onOpenChange: (open) => {
            onFilterMenuToggle(open ? column.id : null);
          },
          isActive: hasActiveFilter,
          trigger: /* @__PURE__ */ React3.createElement(
            "button",
            {
              onClick: (e3) => {
                e3.stopPropagation();
                onFilterMenuToggle(
                  filterMenuOpen === column.id ? null : column.id
                );
              },
              className: "focus:outline-none"
            },
            renderFilterIcon ? renderFilterIcon(column, hasActiveFilter) : defaultFilterIcon(column, hasActiveFilter)
          )
        }, filterMenu)
      ))),
      column.enableResize !== false && /* @__PURE__ */ React3.createElement(
        "div",
        {
          className: cn(theme.classes.columnResizeHandle),
          onMouseDown: (e3) => handleColumnResizeStart(column.id, e3)
        }
      )
    );
  })));
}

// components/data-grid/table-body.tsx
import React4 from "react";
var TableBody = ({
  paginatedData,
  columns,
  selectedRows,
  enableRowSelection,
  onRowSelect,
  onRowClick,
  rowClassName,
  cellClassName,
  columnWidths,
  theme,
  selectedRowClassName,
  renderCell
}) => {
  return /* @__PURE__ */ React4.createElement("tbody", null, paginatedData.map((row, rowIndex) => {
    const rowId = row.id || `row-${rowIndex}`;
    const isSelected = selectedRows[rowId];
    return /* @__PURE__ */ React4.createElement(
      "tr",
      {
        key: rowId,
        className: cn(
          theme.classes.row,
          // Access using theme.classes.row
          isSelected && (selectedRowClassName || "bg-primary/10"),
          rowClassName
        ),
        onClick: () => {
          if (enableRowSelection) {
            onRowSelect(rowId);
          }
          if (onRowClick) {
            onRowClick(row);
          }
        },
        style: {
          cursor: enableRowSelection || onRowClick ? "pointer" : "default"
        }
      },
      columns.map((column) => {
        const width = columnWidths[column.id] || column.width || 150;
        return /* @__PURE__ */ React4.createElement(
          "td",
          {
            key: `${rowId}-${column.id}`,
            className: cn(
              theme.classes.cell,
              // Access using theme.classes.cell
              column.cellClassName,
              cellClassName
            ),
            style: {
              width: width + "px",
              minWidth: width + "px",
              maxWidth: width + "px"
            }
          },
          renderCell ? renderCell(row, column) : column.cell ? column.cell(row) : row[column.id]
        );
      })
    );
  }));
};

// components/data-grid/pagination.tsx
import React5 from "react";
var Pagination = ({
  pageIndex,
  pageCount,
  pageSize,
  setPageIndex,
  setPageSize,
  pageSizeOptions,
  processedDataLength,
  // Custom props
  className,
  showFirstLastButtons = true,
  showPageSizeSelector = true,
  showPageInfo = true,
  renderPageSizeSelector,
  renderPageInfo,
  renderFirstPageButton,
  renderPrevPageButton,
  renderNextPageButton,
  renderLastPageButton,
  pageSizeClassName,
  pageInfoClassName,
  buttonsClassName,
  buttonClassName
}) => {
  const start = processedDataLength === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, processedDataLength);
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex >= pageCount - 1;
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPageIndex(0);
  };
  const goToFirstPage = () => setPageIndex(0);
  const goToPrevPage = () => setPageIndex(Math.max(0, pageIndex - 1));
  const goToNextPage = () => setPageIndex(Math.min(pageCount - 1, pageIndex + 1));
  const goToLastPage = () => setPageIndex(pageCount - 1);
  return /* @__PURE__ */ React5.createElement("div", { className: cn("p-2 flex items-center justify-between", className) }, showPageSizeSelector && /* @__PURE__ */ React5.createElement("div", { className: cn("flex items-center gap-2", pageSizeClassName) }, renderPageSizeSelector ? renderPageSizeSelector({
    pageSize,
    options: pageSizeOptions,
    onChange: handlePageSizeChange
  }) : /* @__PURE__ */ React5.createElement(React5.Fragment, null, /* @__PURE__ */ React5.createElement("span", { className: "text-sm text-muted-foreground" }, "Rows per page:"), /* @__PURE__ */ React5.createElement(
    "select",
    {
      value: pageSize,
      onChange: (e3) => handlePageSizeChange(Number(e3.target.value)),
      className: "border rounded px-2 py-1 text-sm bg-background"
    },
    pageSizeOptions.map((option) => /* @__PURE__ */ React5.createElement("option", { key: option, value: option }, option))
  ))), /* @__PURE__ */ React5.createElement("div", { className: cn("flex items-center", buttonsClassName) }, showPageInfo && /* @__PURE__ */ React5.createElement("div", { className: cn("mr-2", pageInfoClassName) }, renderPageInfo ? renderPageInfo({ start, end, total: processedDataLength }) : /* @__PURE__ */ React5.createElement("span", { className: "text-sm text-muted-foreground" }, start, "-", end, " of ", processedDataLength)), showFirstLastButtons && (renderFirstPageButton ? renderFirstPageButton({
    onClick: goToFirstPage,
    disabled: isFirstPage
  }) : /* @__PURE__ */ React5.createElement(
    "button",
    {
      onClick: goToFirstPage,
      disabled: isFirstPage,
      className: cn(
        "p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",
        buttonClassName
      )
    },
    "<<"
  )), renderPrevPageButton ? renderPrevPageButton({
    onClick: goToPrevPage,
    disabled: isFirstPage
  }) : /* @__PURE__ */ React5.createElement(
    "button",
    {
      onClick: goToPrevPage,
      disabled: isFirstPage,
      className: cn(
        "p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",
        buttonClassName
      )
    },
    "<"
  ), renderNextPageButton ? renderNextPageButton({
    onClick: goToNextPage,
    disabled: isLastPage
  }) : /* @__PURE__ */ React5.createElement(
    "button",
    {
      onClick: goToNextPage,
      disabled: isLastPage,
      className: cn(
        "p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",
        buttonClassName
      )
    },
    ">"
  ), showFirstLastButtons && (renderLastPageButton ? renderLastPageButton({
    onClick: goToLastPage,
    disabled: isLastPage
  }) : /* @__PURE__ */ React5.createElement(
    "button",
    {
      onClick: goToLastPage,
      disabled: isLastPage,
      className: cn(
        "p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",
        buttonClassName
      )
    },
    ">>"
  ))));
};

// components/data-grid/column-manager.tsx
import React8 from "react";

// components/ui/dropdown-menu.tsx
import * as React6 from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuSubTrigger = React6.forwardRef((_a2, ref) => {
  var _b = _a2, { className, inset, children } = _b, props = __objRest(_b, ["className", "inset", "children"]);
  return /* @__PURE__ */ React6.createElement(
    DropdownMenuPrimitive.SubTrigger,
    __spreadValues({
      ref,
      className: cn(
        "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        inset && "pl-8",
        className
      )
    }, props),
    children,
    /* @__PURE__ */ React6.createElement(ChevronRight, { className: "ml-auto" })
  );
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React6.forwardRef((_a2, ref) => {
  var _b = _a2, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React6.createElement(
    DropdownMenuPrimitive.SubContent,
    __spreadValues({
      ref,
      className: cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )
    }, props)
  );
});
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React6.forwardRef((_a2, ref) => {
  var _b = _a2, { className, sideOffset = 4 } = _b, props = __objRest(_b, ["className", "sideOffset"]);
  return /* @__PURE__ */ React6.createElement(DropdownMenuPrimitive.Portal, null, /* @__PURE__ */ React6.createElement(
    DropdownMenuPrimitive.Content,
    __spreadValues({
      ref,
      sideOffset,
      className: cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )
    }, props)
  ));
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React6.forwardRef((_a2, ref) => {
  var _b = _a2, { className, inset } = _b, props = __objRest(_b, ["className", "inset"]);
  return /* @__PURE__ */ React6.createElement(
    DropdownMenuPrimitive.Item,
    __spreadValues({
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
        inset && "pl-8",
        className
      )
    }, props)
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React6.forwardRef((_a2, ref) => {
  var _b = _a2, { className, children, checked } = _b, props = __objRest(_b, ["className", "children", "checked"]);
  return /* @__PURE__ */ React6.createElement(
    DropdownMenuPrimitive.CheckboxItem,
    __spreadValues({
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      checked
    }, props),
    /* @__PURE__ */ React6.createElement("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, /* @__PURE__ */ React6.createElement(DropdownMenuPrimitive.ItemIndicator, null, /* @__PURE__ */ React6.createElement(Check, { className: "h-4 w-4" }))),
    children
  );
});
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React6.forwardRef((_a2, ref) => {
  var _b = _a2, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React6.createElement(
    DropdownMenuPrimitive.RadioItem,
    __spreadValues({
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )
    }, props),
    /* @__PURE__ */ React6.createElement("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, /* @__PURE__ */ React6.createElement(DropdownMenuPrimitive.ItemIndicator, null, /* @__PURE__ */ React6.createElement(Circle, { className: "h-2 w-2 fill-current" }))),
    children
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React6.forwardRef((_a2, ref) => {
  var _b = _a2, { className, inset } = _b, props = __objRest(_b, ["className", "inset"]);
  return /* @__PURE__ */ React6.createElement(
    DropdownMenuPrimitive.Label,
    __spreadValues({
      ref,
      className: cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className
      )
    }, props)
  );
});
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React6.forwardRef((_a2, ref) => {
  var _b = _a2, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React6.createElement(
    DropdownMenuPrimitive.Separator,
    __spreadValues({
      ref,
      className: cn("-mx-1 my-1 h-px bg-muted", className)
    }, props)
  );
});
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = (_a2) => {
  var _b = _a2, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React6.createElement(
    "span",
    __spreadValues({
      className: cn("ml-auto text-xs tracking-widest opacity-60", className)
    }, props)
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// components/ui/button.tsx
import * as React7 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React7.forwardRef(
  (_a2, ref) => {
    var _b = _a2, { className, variant, size, asChild = false } = _b, props = __objRest(_b, ["className", "variant", "size", "asChild"]);
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ React7.createElement(
      Comp,
      __spreadValues({
        className: cn(buttonVariants({ variant, size, className })),
        ref
      }, props)
    );
  }
);
Button.displayName = "Button";

// components/data-grid/column-manager.tsx
import { RotateCcw, Settings } from "lucide-react";
function ColumnManager({
  columns,
  visibleColumns,
  toggleColumnVisibility,
  resetGridPreferences,
  renderTrigger,
  renderResetButton,
  renderColumnItem,
  align = "end",
  showResetButton = true,
  className,
  triggerClassName,
  contentClassName,
  itemClassName,
  resetClassName
}) {
  return /* @__PURE__ */ React8.createElement(DropdownMenu, null, /* @__PURE__ */ React8.createElement(DropdownMenuTrigger, { asChild: true, className }, renderTrigger ? renderTrigger({ onClick: () => {
  } }) : /* @__PURE__ */ React8.createElement(
    Button,
    {
      variant: "outline",
      size: "sm",
      className: cn("ml-auto", triggerClassName)
    },
    /* @__PURE__ */ React8.createElement(Settings, { className: "h-4 w-4 mr-2" }),
    /* @__PURE__ */ React8.createElement("span", null, "Columns")
  )), /* @__PURE__ */ React8.createElement(DropdownMenuContent, { align, className: contentClassName }, columns.map((column) => {
    const isVisible = visibleColumns.includes(column.id);
    const handleToggle = (checked) => toggleColumnVisibility(column.id, checked);
    return renderColumnItem ? /* @__PURE__ */ React8.createElement(React8.Fragment, { key: column.id }, renderColumnItem({ column, isVisible, onToggle: handleToggle })) : /* @__PURE__ */ React8.createElement(
      DropdownMenuCheckboxItem,
      {
        key: column.id,
        checked: isVisible,
        onCheckedChange: handleToggle,
        className: itemClassName
      },
      column.header
    );
  }), showResetButton && /* @__PURE__ */ React8.createElement(React8.Fragment, null, /* @__PURE__ */ React8.createElement(DropdownMenuSeparator, null), renderResetButton ? renderResetButton({ onClick: resetGridPreferences }) : /* @__PURE__ */ React8.createElement(
    DropdownMenuItem,
    {
      onClick: resetGridPreferences,
      className: cn(
        "focus:bg-destructive/10 cursor-pointer",
        resetClassName
      )
    },
    /* @__PURE__ */ React8.createElement(RotateCcw, { className: "h-4 w-4 mr-2" }),
    "Reset all columns"
  ))));
}

// components/data-grid/use-grid-persistence.tsx
import { useState as useState4, useEffect as useEffect2 } from "react";
function useGridPersistence(gridId, columns, defaultColumnWidth = 150) {
  const storageKey = `gridular-preferences-${gridId}`;
  const getDefaultPreferences = () => ({
    columnWidths: columns.reduce((acc, col) => {
      acc[col.id] = defaultColumnWidth;
      return acc;
    }, {}),
    columnOrder: columns.map((col) => col.id),
    hiddenColumns: []
  });
  const loadPreferences = () => {
    if (typeof window === "undefined") return getDefaultPreferences();
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return getDefaultPreferences();
      const parsed = JSON.parse(stored);
      const updated = __spreadValues({}, parsed);
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
      console.error("Failed to load grid preferences", error);
      return getDefaultPreferences();
    }
  };
  const [preferences, setPreferences] = useState4(
    getDefaultPreferences()
  );
  useEffect2(() => {
    setPreferences(loadPreferences());
  }, []);
  const savePreferences = (newPreferences) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(newPreferences));
      setPreferences(newPreferences);
    } catch (error) {
      console.error("Failed to save grid preferences", error);
    }
  };
  const updateColumnWidth = (columnId, width) => {
    savePreferences(__spreadProps(__spreadValues({}, preferences), {
      columnWidths: __spreadProps(__spreadValues({}, preferences.columnWidths), {
        [columnId]: width
      })
    }));
  };
  const updateColumnOrder = (newOrder) => {
    savePreferences(__spreadProps(__spreadValues({}, preferences), {
      columnOrder: newOrder
    }));
  };
  const toggleColumnVisibility = (columnId, visible) => {
    const hiddenColumns = [...preferences.hiddenColumns];
    if (!visible && !hiddenColumns.includes(columnId)) {
      hiddenColumns.push(columnId);
    } else if (visible) {
      const index = hiddenColumns.indexOf(columnId);
      if (index !== -1) {
        hiddenColumns.splice(index, 1);
      }
    }
    savePreferences(__spreadProps(__spreadValues({}, preferences), {
      hiddenColumns
    }));
  };
  const resetPreferences = () => {
    savePreferences(getDefaultPreferences());
  };
  return {
    preferences,
    updateColumnWidth,
    updateColumnOrder,
    toggleColumnVisibility,
    resetPreferences
  };
}

// components/data-grid/data-grid.tsx
function DataGrid({
  // Data props
  columns,
  data,
  // State props
  sortState = null,
  onSortChange,
  filterState,
  onFilterChange,
  selectedRows,
  onRowSelectionChange,
  pageIndex,
  pageCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onRowClick,
  // Feature flags
  enableSorting = true,
  enableColumnResize = true,
  enableRowSelection = false,
  enablePagination = true,
  // Configuration props
  pageSizeOptions = [5, 10, 20, 50, 100],
  emptyMessage = "No data available",
  loadingMessage = "Loading data...",
  isLoading = false,
  gridId = "default",
  // Styling props - consolidated into classes object
  classes = {},
  className,
  // Keep this for backward compatibility
  // Render customization props
  renderCell,
  renderSortIcon,
  renderFilterIcon,
  sortIconVariant = "arrows",
  // New customization props
  columnManagerProps = {},
  paginationProps = {},
  // Render props
  children,
  filterMenu,
  renderHeader
}) {
  const { theme } = useTheme();
  const filterValueRefs = useRef(filterState || {});
  const [filterMenuOpen, setFilterMenuOpen] = useState5(null);
  const [activeFilterColumn, setActiveFilterColumn] = useState5(null);
  const {
    preferences,
    updateColumnWidth,
    updateColumnOrder,
    toggleColumnVisibility,
    resetPreferences
  } = useGridPersistence(gridId, columns);
  const visibleColumns = useMemo2(() => {
    const hiddenIds = new Set(preferences.hiddenColumns);
    const visible = columns.filter((col) => !hiddenIds.has(col.id)).map((col) => col.id);
    const orderedIds = preferences.columnOrder.filter(
      (id) => visible.includes(id)
    );
    visible.forEach((id) => {
      if (!orderedIds.includes(id)) {
        orderedIds.push(id);
      }
    });
    return orderedIds;
  }, [columns, preferences.hiddenColumns, preferences.columnOrder]);
  const orderedColumns = useMemo2(() => {
    const colMap = new Map(columns.map((col) => [col.id, col]));
    return visibleColumns.map((id) => colMap.get(id)).filter(Boolean);
  }, [columns, visibleColumns]);
  useEffect3(() => {
    if (filterState) {
      filterValueRefs.current = __spreadValues({}, filterState);
    }
  }, [filterState]);
  const handleFilterMenuToggle = (columnId) => {
    if (columnId === filterMenuOpen) {
      setFilterMenuOpen(null);
      setActiveFilterColumn(null);
    } else if (columnId) {
      setFilterMenuOpen(columnId);
      const column = columns.find((col) => col.id === columnId);
      if (column) {
        setActiveFilterColumn(column);
      }
    } else {
      setFilterMenuOpen(null);
      setActiveFilterColumn(null);
    }
  };
  const handleApplyFilter = (value2) => {
    if (!activeFilterColumn || !onFilterChange) return;
    const newFilterState = __spreadValues({}, filterState || {});
    if (value2) {
      newFilterState[activeFilterColumn.id] = value2;
    } else {
      delete newFilterState[activeFilterColumn.id];
    }
    onFilterChange(newFilterState);
    setFilterMenuOpen(null);
  };
  const handleClearFilter = () => {
    if (!activeFilterColumn || !onFilterChange) return;
    const newFilterState = __spreadValues({}, filterState || {});
    delete newFilterState[activeFilterColumn.id];
    onFilterChange(newFilterState);
    setFilterMenuOpen(null);
  };
  const handleColumnReorder = (draggedId, targetId) => {
    if (draggedId === targetId) return;
    const currentOrder = [...preferences.columnOrder];
    const draggedIndex = currentOrder.indexOf(draggedId);
    const targetIndex = currentOrder.indexOf(targetId);
    if (draggedIndex !== -1 && targetIndex !== -1) {
      currentOrder.splice(draggedIndex, 1);
      currentOrder.splice(targetIndex, 0, draggedId);
      updateColumnOrder(currentOrder);
    }
  };
  const handleColumnResize = (columnId, width) => {
    updateColumnWidth(columnId, width);
  };
  const handleToggleColumnVisibility = (columnId, visible) => {
    toggleColumnVisibility(columnId, visible);
  };
  const handleResetGridPreferences = () => {
    resetPreferences();
  };
  const renderProps = {
    filterState: filterState || {},
    sortState,
    selectedRows: selectedRows || {},
    data,
    visibleColumns,
    pageIndex,
    pageCount,
    pageSize,
    isLoading
  };
  if (!isLoading && (!data || data.length === 0)) {
    return /* @__PURE__ */ React9.createElement(
      "div",
      {
        className: cn(
          "w-full border rounded-md overflow-hidden",
          theme.classes.container,
          className,
          classes.container
        )
      },
      /* @__PURE__ */ React9.createElement(
        "div",
        {
          className: cn(
            "p-4 text-center text-muted-foreground",
            classes.emptyState
          )
        },
        emptyMessage
      ),
      children && children(renderProps)
    );
  }
  if (isLoading) {
    return /* @__PURE__ */ React9.createElement(
      "div",
      {
        className: cn(
          "w-full border rounded-md overflow-hidden",
          theme.classes.container,
          className,
          classes.container
        )
      },
      /* @__PURE__ */ React9.createElement(
        "div",
        {
          className: cn(
            "p-4 text-center text-muted-foreground",
            classes.loadingState
          )
        },
        loadingMessage
      ),
      children && children(renderProps)
    );
  }
  return /* @__PURE__ */ React9.createElement(
    "div",
    {
      className: cn(
        "w-full border rounded-md overflow-hidden",
        theme.classes.container,
        className,
        classes.container
      )
    },
    /* @__PURE__ */ React9.createElement(
      "div",
      {
        className: cn(
          "p-2 flex items-center justify-end border-b",
          classes.columnManager
        )
      },
      /* @__PURE__ */ React9.createElement(
        ColumnManager,
        __spreadValues({
          columns,
          visibleColumns,
          toggleColumnVisibility: handleToggleColumnVisibility,
          resetGridPreferences: handleResetGridPreferences
        }, columnManagerProps)
      )
    ),
    /* @__PURE__ */ React9.createElement("div", { className: "w-full overflow-auto" }, /* @__PURE__ */ React9.createElement("table", { className: "w-full border-collapse" }, /* @__PURE__ */ React9.createElement(
      TableHeader,
      {
        columns: orderedColumns,
        sortState,
        onSortChange: (columnId) => {
          if (onSortChange) {
            const direction = (sortState == null ? void 0 : sortState.column) === columnId && sortState.direction === "asc" ? "desc" : "asc";
            onSortChange({ column: columnId, direction });
          }
        },
        enableSorting,
        filterState: filterState || {},
        filterMenuOpen,
        onFilterMenuToggle: handleFilterMenuToggle,
        columnWidths: preferences.columnWidths,
        onColumnResize: handleColumnResize,
        headerClassName: classes.header,
        filterValueRefs,
        onApplyFilter: handleApplyFilter,
        onClearFilter: handleClearFilter,
        onColumnReorder: handleColumnReorder,
        renderHeader: renderHeader ? (column, direction) => renderHeader({
          column,
          sortDirection: direction || void 0
        }) : void 0,
        renderSortIcon: renderSortIcon ? (column, sortDirection) => renderSortIcon({
          isSorted: !!sortDirection,
          sortDirection: sortDirection || void 0
        }) : void 0,
        sortIconVariant,
        renderFilterIcon: renderFilterIcon ? (column, isActive) => renderFilterIcon({ isFiltered: !!(filterState == null ? void 0 : filterState[column.id]) }) : void 0,
        filterMenu
      }
    ), /* @__PURE__ */ React9.createElement(
      TableBody,
      {
        paginatedData: data,
        columns: orderedColumns,
        selectedRows: selectedRows || {},
        enableRowSelection,
        onRowSelect: (rowId) => {
          if (onRowSelectionChange) {
            const newSelectedRows = __spreadValues({}, selectedRows);
            newSelectedRows[rowId] = !newSelectedRows[rowId];
            onRowSelectionChange(newSelectedRows);
          }
        },
        onRowClick,
        rowClassName: classes.row,
        cellClassName: classes.cell,
        columnWidths: preferences.columnWidths,
        theme,
        selectedRowClassName: classes.selectedRow || "bg-primary/10",
        renderCell: renderCell ? (row, column) => renderCell({
          value: row[column.id],
          row,
          column
        }) : void 0
      }
    ))),
    enablePagination && /* @__PURE__ */ React9.createElement("div", { className: cn(classes.pagination) }, /* @__PURE__ */ React9.createElement(
      Pagination,
      __spreadValues({
        pageIndex,
        pageCount,
        pageSize,
        setPageIndex: onPageChange || (() => {
        }),
        setPageSize: onPageSizeChange || (() => {
        }),
        pageSizeOptions,
        processedDataLength: data.length
      }, paginationProps)
    )),
    children && children(renderProps)
  );
}

// components/data-grid/table-cell.tsx
import React10 from "react";
var TableCell = ({
  column,
  row,
  cellClassName
}) => {
  const themeClasses = useTailwindTheme();
  return /* @__PURE__ */ React10.createElement(
    "td",
    {
      className: cn(
        themeClasses.cell,
        // Apply theme cell class
        column.cellClassName,
        // Apply column-specific cell class
        cellClassName
        // Apply custom cell class passed as prop
      ),
      style: {
        width: column.width || 150,
        minWidth: column.width || 150,
        maxWidth: column.width || 150
      }
    },
    column.cell ? column.cell(row) : row[column.id]
  );
};

// components/data-grid/table-row.tsx
import React11 from "react";
function TableRow({
  row,
  columns,
  onRowClick,
  isSelected,
  onSelect,
  selectedRowClassName,
  rowClassName
}) {
  const rowId = row.id || `row-${Math.random()}`;
  return /* @__PURE__ */ React11.createElement(
    "tr",
    {
      key: rowId,
      className: cn(
        "hover:bg-muted/50 transition-colors",
        isSelected && selectedRowClassName,
        rowClassName
      ),
      onClick: () => {
        if (onSelect) {
          onSelect();
        }
        if (onRowClick) {
          onRowClick(row);
        }
      },
      style: {
        cursor: onRowClick ? "pointer" : "default"
      }
    },
    columns.map((column) => /* @__PURE__ */ React11.createElement(
      "td",
      {
        key: `${rowId}-${column.id}`,
        className: cn("p-2 border-b", column.cellClassName),
        style: {
          width: column.width || 150,
          maxWidth: column.width || 150
        }
      },
      column.cell ? column.cell(row) : row[column.id]
    ))
  );
}

// components/data-grid/use-column-resize.ts
import { useState as useState6, useCallback } from "react";
var useColumnResize = (enableColumnResize) => {
  const [columnResizeState, setColumnResizeState] = useState6({});
  const [isResizing, setIsResizing] = useState6(false);
  const handleColumnResizeStart = useCallback(
    (columnId, startWidth, e3) => {
      if (!enableColumnResize) return;
      setIsResizing(true);
      const startX = e3.clientX;
      const handleMouseMove = (moveEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const newWidth = Math.max(50, startWidth + deltaX);
        setColumnResizeState((prev) => __spreadProps(__spreadValues({}, prev), {
          [columnId]: newWidth
        }));
      };
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setIsResizing(false);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [enableColumnResize]
  );
  return {
    columnResizeState,
    isResizing,
    handleColumnResizeStart
  };
};

// components/theme-provider/theme-switcher.tsx
import React12 from "react";
import { Moon, Sun } from "lucide-react";
var ThemeSwitcher = ({ className }) => {
  const { theme, setTssTheme, setTailwindTheme } = useTheme();
  const isDarkMode = theme.colors.background === "#121314";
  const toggleTheme = () => {
    if (isDarkMode) {
      setTssTheme({
        colors: {
          primary: "#2563eb",
          secondary: "#6b7280",
          background: "#ffffff",
          foreground: "#1e1e21",
          muted: "#f1f5f9",
          mutedForeground: "#64748b",
          border: "#e2e8f0",
          popover: "#ffffff"
        }
      });
      setTailwindTheme({
        container: "bg-background border border-border text-foreground",
        cell: "px-4 py-2 text-sm border-border",
        row: "border-b border-border hover:bg-muted/30"
      });
    } else {
      setTssTheme({
        colors: {
          primary: "#3b82f6",
          secondary: "#9ca3af",
          background: "#121314",
          foreground: "#f8fafc",
          muted: "#1e293b",
          mutedForeground: "#94a3b8",
          border: "#334155",
          popover: "#1a1c1e"
        }
      });
      setTailwindTheme({
        container: "bg-muted border border-border text-foreground",
        cell: "px-4 py-2 text-sm border-border",
        row: "border-b border-border hover:bg-muted/50"
      });
    }
  };
  return /* @__PURE__ */ React12.createElement(
    Button,
    {
      onClick: toggleTheme,
      variant: "outline",
      size: "icon",
      className,
      title: isDarkMode ? "Switch to light mode" : "Switch to dark mode"
    },
    isDarkMode ? /* @__PURE__ */ React12.createElement(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ React12.createElement(Moon, { className: "h-4 w-4" })
  );
};

// components/theme-provider/theme-wrapper.tsx
import React14 from "react";

// node_modules/@storybook/core/dist/client-logger/index.js
var u = Object.defineProperty;
var a = (e3, o4) => u(e3, "name", { value: o4, configurable: true });
var y = (() => {
  let e3;
  return typeof window < "u" ? e3 = window : typeof globalThis < "u" ? e3 = globalThis : typeof global < "u" ? e3 = global : typeof self < "u" ? e3 = self : e3 = {}, e3;
})();
var { LOGLEVEL: b } = y;
var t = {
  trace: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
  silent: 10
};
var L = b;
var i = t[L] || t.info;
var s = {
  trace: /* @__PURE__ */ a((e3, ...o4) => {
    i <= t.trace && console.trace(e3, ...o4);
  }, "trace"),
  debug: /* @__PURE__ */ a((e3, ...o4) => {
    i <= t.debug && console.debug(e3, ...o4);
  }, "debug"),
  info: /* @__PURE__ */ a((e3, ...o4) => {
    i <= t.info && console.info(e3, ...o4);
  }, "info"),
  warn: /* @__PURE__ */ a((e3, ...o4) => {
    i <= t.warn && console.warn(e3, ...o4);
  }, "warn"),
  error: /* @__PURE__ */ a((e3, ...o4) => {
    i <= t.error && console.error(e3, ...o4);
  }, "error"),
  log: /* @__PURE__ */ a((e3, ...o4) => {
    i < t.silent && console.log(e3, ...o4);
  }, "log")
};
var c = /* @__PURE__ */ new Set();
var n = /* @__PURE__ */ a((e3) => (o4, ...l2) => {
  if (!c.has(o4))
    return c.add(o4), s[e3](o4, ...l2);
}, "once");
n.clear = () => c.clear();
n.trace = n("trace");
n.debug = n("debug");
n.info = n("info");
n.warn = n("warn");
n.error = n("error");
n.log = n("log");
var m = n("warn");
var r = /* @__PURE__ */ a((e3) => (...o4) => {
  let l2 = [];
  if (o4.length) {
    let f6 = /<span\s+style=(['"])([^'"]*)\1\s*>/gi, p4 = /<\/span>/gi, d2;
    for (l2.push(o4[0].replace(f6, "%c").replace(p4, "%c")); d2 = f6.exec(o4[0]); )
      l2.push(d2[2]), l2.push("");
    for (let g2 = 1; g2 < o4.length; g2++)
      l2.push(o4[g2]);
  }
  s[e3].apply(s, l2);
}, "pretty");
r.trace = r("trace");
r.debug = r("debug");
r.info = r("info");
r.warn = r("warn");
r.error = r("error");

// node_modules/@storybook/core/dist/core-events/index.js
var core_events_exports = {};
__export(core_events_exports, {
  ARGTYPES_INFO_REQUEST: () => SE,
  ARGTYPES_INFO_RESPONSE: () => TE,
  CHANNEL_CREATED: () => T,
  CHANNEL_WS_DISCONNECT: () => S,
  CONFIG_ERROR: () => N,
  CREATE_NEW_STORYFILE_REQUEST: () => O,
  CREATE_NEW_STORYFILE_RESPONSE: () => A,
  CURRENT_STORY_WAS_SET: () => r2,
  DOCS_PREPARED: () => D,
  DOCS_RENDERED: () => I,
  FILE_COMPONENT_SEARCH_REQUEST: () => o,
  FILE_COMPONENT_SEARCH_RESPONSE: () => C,
  FORCE_REMOUNT: () => P,
  FORCE_RE_RENDER: () => L2,
  GLOBALS_UPDATED: () => U,
  NAVIGATE_URL: () => G,
  PLAY_FUNCTION_THREW_EXCEPTION: () => a2,
  PRELOAD_ENTRIES: () => t2,
  PREVIEW_BUILDER_PROGRESS: () => d,
  PREVIEW_KEYDOWN: () => e,
  REGISTER_SUBSCRIPTION: () => H,
  REQUEST_WHATS_NEW_DATA: () => J,
  RESET_STORY_ARGS: () => W,
  RESULT_WHATS_NEW_DATA: () => Z,
  SAVE_STORY_REQUEST: () => RE,
  SAVE_STORY_RESPONSE: () => _E,
  SELECT_STORY: () => l,
  SET_CONFIG: () => i2,
  SET_CURRENT_STORY: () => p,
  SET_FILTER: () => F,
  SET_GLOBALS: () => u2,
  SET_INDEX: () => M,
  SET_STORIES: () => s2,
  SET_WHATS_NEW_CACHE: () => $,
  SHARED_STATE_CHANGED: () => y2,
  SHARED_STATE_SET: () => c2,
  STORIES_COLLAPSE_ALL: () => g,
  STORIES_EXPAND_ALL: () => h,
  STORY_ARGS_UPDATED: () => f2,
  STORY_CHANGED: () => Q,
  STORY_ERRORED: () => x,
  STORY_FINISHED: () => q,
  STORY_INDEX_INVALIDATED: () => m2,
  STORY_MISSING: () => V,
  STORY_PREPARED: () => w,
  STORY_RENDERED: () => X,
  STORY_RENDER_PHASE_CHANGED: () => B,
  STORY_SPECIFIED: () => b2,
  STORY_THREW_EXCEPTION: () => K,
  STORY_UNCHANGED: () => j,
  TELEMETRY_ERROR: () => EE,
  TESTING_MODULE_CANCEL_TEST_RUN_REQUEST: () => DE,
  TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE: () => IE,
  TESTING_MODULE_CRASH_REPORT: () => NE,
  TESTING_MODULE_PROGRESS_REPORT: () => OE,
  TESTING_MODULE_RUN_ALL_REQUEST: () => rE,
  TESTING_MODULE_RUN_REQUEST: () => AE,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: () => v,
  UNHANDLED_ERRORS_WHILE_PLAYING: () => Y,
  UPDATE_GLOBALS: () => k,
  UPDATE_QUERY_PARAMS: () => n2,
  UPDATE_STORY_ARGS: () => z,
  default: () => _
});
var R = /* @__PURE__ */ ((E3) => (E3.CHANNEL_WS_DISCONNECT = "channelWSDisconnect", E3.CHANNEL_CREATED = "channelCreated", E3.CONFIG_ERROR = "configError", E3.STORY_INDEX_INVALIDATED = "storyIndexInvalidated", E3.STORY_SPECIFIED = "storySpecified", E3.SET_CONFIG = "setConfig", E3.SET_STORIES = "setStories", E3.SET_INDEX = "setIndex", E3.SET_CURRENT_STORY = "setCurrentStory", E3.CURRENT_STORY_WAS_SET = "currentStoryWasSet", E3.FORCE_RE_RENDER = "forceReRender", E3.FORCE_REMOUNT = "forceRemount", E3.PRELOAD_ENTRIES = "preloadStories", E3.STORY_PREPARED = "storyPrepared", E3.DOCS_PREPARED = "docsPrepared", E3.STORY_CHANGED = "storyChanged", E3.STORY_UNCHANGED = "storyUnchanged", E3.STORY_RENDERED = "storyRendered", E3.STORY_FINISHED = "storyFinished", E3.STORY_MISSING = "storyMissing", E3.STORY_ERRORED = "storyErrored", E3.STORY_THREW_EXCEPTION = "storyThrewException", E3.STORY_RENDER_PHASE_CHANGED = "storyRenderPhaseChanged", E3.PLAY_FUNCTION_THREW_EXCEPTION = "playFunctionThrewException", E3.UNHANDLED_ERRORS_WHILE_PLAYING = "unhandledErrorsWhilePlaying", E3.UPDATE_STORY_ARGS = "updateStoryArgs", E3.STORY_ARGS_UPDATED = "storyArgsUpdated", E3.RESET_STORY_ARGS = "resetStoryArgs", E3.SET_FILTER = "setFilter", E3.SET_GLOBALS = "setGlobals", E3.UPDATE_GLOBALS = "updateGlobals", E3.GLOBALS_UPDATED = "globalsUpdated", E3.REGISTER_SUBSCRIPTION = "registerSubscription", E3.PREVIEW_KEYDOWN = "previewKeydown", E3.PREVIEW_BUILDER_PROGRESS = "preview_builder_progress", E3.SELECT_STORY = "selectStory", E3.STORIES_COLLAPSE_ALL = "storiesCollapseAll", E3.STORIES_EXPAND_ALL = "storiesExpandAll", E3.DOCS_RENDERED = "docsRendered", E3.SHARED_STATE_CHANGED = "sharedStateChanged", E3.SHARED_STATE_SET = "sharedStateSet", E3.NAVIGATE_URL = "navigateUrl", E3.UPDATE_QUERY_PARAMS = "updateQueryParams", E3.REQUEST_WHATS_NEW_DATA = "requestWhatsNewData", E3.RESULT_WHATS_NEW_DATA = "resultWhatsNewData", E3.SET_WHATS_NEW_CACHE = "setWhatsNewCache", E3.TOGGLE_WHATS_NEW_NOTIFICATIONS = "toggleWhatsNewNotifications", E3.TELEMETRY_ERROR = "telemetryError", E3.FILE_COMPONENT_SEARCH_REQUEST = "fileComponentSearchRequest", E3.FILE_COMPONENT_SEARCH_RESPONSE = "fileComponentSearchResponse", E3.SAVE_STORY_REQUEST = "saveStoryRequest", E3.SAVE_STORY_RESPONSE = "saveStoryResponse", E3.ARGTYPES_INFO_REQUEST = "argtypesInfoRequest", E3.ARGTYPES_INFO_RESPONSE = "argtypesInfoResponse", E3.CREATE_NEW_STORYFILE_REQUEST = "createNewStoryfileRequest", E3.CREATE_NEW_STORYFILE_RESPONSE = "createNewStoryfileResponse", E3.TESTING_MODULE_CRASH_REPORT = "testingModuleCrashReport", E3.TESTING_MODULE_PROGRESS_REPORT = "testingModuleProgressReport", E3.TESTING_MODULE_RUN_REQUEST = "testingModuleRunRequest", E3.TESTING_MODULE_RUN_ALL_REQUEST = "testingModuleRunAllRequest", E3.TESTING_MODULE_CANCEL_TEST_RUN_REQUEST = "testingModuleCancelTestRunRequest", E3.TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE = "testingModuleCancelTestRunResponse", E3))(R || {});
var _ = R;
var {
  CHANNEL_WS_DISCONNECT: S,
  CHANNEL_CREATED: T,
  CONFIG_ERROR: N,
  CREATE_NEW_STORYFILE_REQUEST: O,
  CREATE_NEW_STORYFILE_RESPONSE: A,
  CURRENT_STORY_WAS_SET: r2,
  DOCS_PREPARED: D,
  DOCS_RENDERED: I,
  FILE_COMPONENT_SEARCH_REQUEST: o,
  FILE_COMPONENT_SEARCH_RESPONSE: C,
  FORCE_RE_RENDER: L2,
  FORCE_REMOUNT: P,
  GLOBALS_UPDATED: U,
  NAVIGATE_URL: G,
  PLAY_FUNCTION_THREW_EXCEPTION: a2,
  UNHANDLED_ERRORS_WHILE_PLAYING: Y,
  PRELOAD_ENTRIES: t2,
  PREVIEW_BUILDER_PROGRESS: d,
  PREVIEW_KEYDOWN: e,
  REGISTER_SUBSCRIPTION: H,
  RESET_STORY_ARGS: W,
  SELECT_STORY: l,
  SET_CONFIG: i2,
  SET_CURRENT_STORY: p,
  SET_FILTER: F,
  SET_GLOBALS: u2,
  SET_INDEX: M,
  SET_STORIES: s2,
  SHARED_STATE_CHANGED: y2,
  SHARED_STATE_SET: c2,
  STORIES_COLLAPSE_ALL: g,
  STORIES_EXPAND_ALL: h,
  STORY_ARGS_UPDATED: f2,
  STORY_CHANGED: Q,
  STORY_ERRORED: x,
  STORY_INDEX_INVALIDATED: m2,
  STORY_MISSING: V,
  STORY_PREPARED: w,
  STORY_RENDER_PHASE_CHANGED: B,
  STORY_RENDERED: X,
  STORY_FINISHED: q,
  STORY_SPECIFIED: b2,
  STORY_THREW_EXCEPTION: K,
  STORY_UNCHANGED: j,
  UPDATE_GLOBALS: k,
  UPDATE_QUERY_PARAMS: n2,
  UPDATE_STORY_ARGS: z,
  REQUEST_WHATS_NEW_DATA: J,
  RESULT_WHATS_NEW_DATA: Z,
  SET_WHATS_NEW_CACHE: $,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: v,
  TELEMETRY_ERROR: EE,
  SAVE_STORY_REQUEST: RE,
  SAVE_STORY_RESPONSE: _E,
  ARGTYPES_INFO_REQUEST: SE,
  ARGTYPES_INFO_RESPONSE: TE,
  TESTING_MODULE_CRASH_REPORT: NE,
  TESTING_MODULE_PROGRESS_REPORT: OE,
  TESTING_MODULE_RUN_REQUEST: AE,
  TESTING_MODULE_RUN_ALL_REQUEST: rE,
  TESTING_MODULE_CANCEL_TEST_RUN_REQUEST: DE,
  TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE: IE
} = R;

// node_modules/@storybook/core/dist/channels/index.js
var ae = Object.create;
var ut = Object.defineProperty;
var se = Object.getOwnPropertyDescriptor;
var le = Object.getOwnPropertyNames;
var ce = Object.getPrototypeOf;
var pe = Object.prototype.hasOwnProperty;
var a3 = (r4, t4) => ut(r4, "name", { value: t4, configurable: true });
var H2 = /* @__PURE__ */ ((r4) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(r4, {
  get: (t4, e3) => (typeof __require < "u" ? __require : t4)[e3]
}) : r4)(function(r4) {
  if (typeof __require < "u") return __require.apply(this, arguments);
  throw Error('Dynamic require of "' + r4 + '" is not supported');
});
var ue = (r4, t4) => () => (t4 || r4((t4 = { exports: {} }).exports, t4), t4.exports);
var fe = (r4, t4, e3, n3) => {
  if (t4 && typeof t4 == "object" || typeof t4 == "function")
    for (let o4 of le(t4))
      !pe.call(r4, o4) && o4 !== e3 && ut(r4, o4, { get: () => t4[o4], enumerable: !(n3 = se(t4, o4)) || n3.enumerable });
  return r4;
};
var he = (r4, t4, e3) => (e3 = r4 != null ? ae(ce(r4)) : {}, fe(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  t4 || !r4 || !r4.__esModule ? ut(e3, "default", { value: r4, enumerable: true }) : e3,
  r4
));
var xt = ue((It3, yt2) => {
  (function(r4) {
    if (typeof It3 == "object" && typeof yt2 < "u")
      yt2.exports = r4();
    else if (typeof define == "function" && define.amd)
      define([], r4);
    else {
      var t4;
      typeof window < "u" ? t4 = window : typeof global < "u" ? t4 = global : typeof self < "u" ? t4 = self : t4 = this, t4.memoizerific = r4();
    }
  })(function() {
    var r4, t4, e3;
    return (/* @__PURE__ */ a3(function n3(o4, s5, l2) {
      function c3(p4, u3) {
        if (!s5[p4]) {
          if (!o4[p4]) {
            var y4 = typeof H2 == "function" && H2;
            if (!u3 && y4) return y4(p4, true);
            if (i3) return i3(p4, true);
            var v5 = new Error("Cannot find module '" + p4 + "'");
            throw v5.code = "MODULE_NOT_FOUND", v5;
          }
          var d2 = s5[p4] = { exports: {} };
          o4[p4][0].call(d2.exports, function(m3) {
            var E3 = o4[p4][1][m3];
            return c3(E3 || m3);
          }, d2, d2.exports, n3, o4, s5, l2);
        }
        return s5[p4].exports;
      }
      a3(c3, "s");
      for (var i3 = typeof H2 == "function" && H2, g2 = 0; g2 < l2.length; g2++) c3(l2[g2]);
      return c3;
    }, "e"))({ 1: [function(n3, o4, s5) {
      o4.exports = function(l2) {
        if (typeof Map != "function" || l2) {
          var c3 = n3("./similar");
          return new c3();
        } else
          return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(n3, o4, s5) {
      function l2() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      a3(l2, "Similar"), l2.prototype.get = function(c3) {
        var i3;
        if (this.lastItem && this.isEqual(this.lastItem.key, c3))
          return this.lastItem.val;
        if (i3 = this.indexOf(c3), i3 >= 0)
          return this.lastItem = this.list[i3], this.list[i3].val;
      }, l2.prototype.set = function(c3, i3) {
        var g2;
        return this.lastItem && this.isEqual(this.lastItem.key, c3) ? (this.lastItem.val = i3, this) : (g2 = this.indexOf(c3), g2 >= 0 ? (this.lastItem = this.list[g2], this.list[g2].val = i3, this) : (this.lastItem = { key: c3, val: i3 }, this.list.push(this.lastItem), this.size++, this));
      }, l2.prototype.delete = function(c3) {
        var i3;
        if (this.lastItem && this.isEqual(this.lastItem.key, c3) && (this.lastItem = void 0), i3 = this.indexOf(c3), i3 >= 0)
          return this.size--, this.list.splice(i3, 1)[0];
      }, l2.prototype.has = function(c3) {
        var i3;
        return this.lastItem && this.isEqual(this.lastItem.key, c3) ? true : (i3 = this.indexOf(c3), i3 >= 0 ? (this.lastItem = this.list[i3], true) : false);
      }, l2.prototype.forEach = function(c3, i3) {
        var g2;
        for (g2 = 0; g2 < this.size; g2++)
          c3.call(i3 || this, this.list[g2].val, this.list[g2].key, this);
      }, l2.prototype.indexOf = function(c3) {
        var i3;
        for (i3 = 0; i3 < this.size; i3++)
          if (this.isEqual(this.list[i3].key, c3))
            return i3;
        return -1;
      }, l2.prototype.isEqual = function(c3, i3) {
        return c3 === i3 || c3 !== c3 && i3 !== i3;
      }, o4.exports = l2;
    }, {}], 3: [function(n3, o4, s5) {
      var l2 = n3("map-or-similar");
      o4.exports = function(p4) {
        var u3 = new l2(false), y4 = [];
        return function(v5) {
          var d2 = /* @__PURE__ */ a3(function() {
            var m3 = u3, E3, I7, T7 = arguments.length - 1, R5 = Array(T7 + 1), C5 = true, N5;
            if ((d2.numArgs || d2.numArgs === 0) && d2.numArgs !== T7 + 1)
              throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (N5 = 0; N5 < T7; N5++) {
              if (R5[N5] = {
                cacheItem: m3,
                arg: arguments[N5]
              }, m3.has(arguments[N5])) {
                m3 = m3.get(arguments[N5]);
                continue;
              }
              C5 = false, E3 = new l2(false), m3.set(arguments[N5], E3), m3 = E3;
            }
            return C5 && (m3.has(arguments[T7]) ? I7 = m3.get(arguments[T7]) : C5 = false), C5 || (I7 = v5.apply(null, arguments), m3.set(arguments[T7], I7)), p4 > 0 && (R5[T7] = {
              cacheItem: m3,
              arg: arguments[T7]
            }, C5 ? c3(y4, R5) : y4.push(R5), y4.length > p4 && i3(y4.shift())), d2.wasMemoized = C5, d2.numArgs = T7 + 1, I7;
          }, "memoizerific");
          return d2.limit = p4, d2.wasMemoized = false, d2.cache = u3, d2.lru = y4, d2;
        };
      };
      function c3(p4, u3) {
        var y4 = p4.length, v5 = u3.length, d2, m3, E3;
        for (m3 = 0; m3 < y4; m3++) {
          for (d2 = true, E3 = 0; E3 < v5; E3++)
            if (!g2(p4[m3][E3].arg, u3[E3].arg)) {
              d2 = false;
              break;
            }
          if (d2)
            break;
        }
        p4.push(p4.splice(m3, 1)[0]);
      }
      a3(c3, "moveToMostRecentLru");
      function i3(p4) {
        var u3 = p4.length, y4 = p4[u3 - 1], v5, d2;
        for (y4.cacheItem.delete(y4.arg), d2 = u3 - 2; d2 >= 0 && (y4 = p4[d2], v5 = y4.cacheItem.get(y4.arg), !v5 || !v5.size); d2--)
          y4.cacheItem.delete(y4.arg);
      }
      a3(i3, "removeCachedResult");
      function g2(p4, u3) {
        return p4 === u3 || p4 !== p4 && u3 !== u3;
      }
      a3(g2, "isEqual");
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
});
var S2 = (() => {
  let r4;
  return typeof window < "u" ? r4 = window : typeof globalThis < "u" ? r4 = globalThis : typeof global < "u" ? r4 = global : typeof self < "u" ? r4 = self : r4 = {}, r4;
})();
function F2(r4) {
  for (var t4 = [], e3 = 1; e3 < arguments.length; e3++)
    t4[e3 - 1] = arguments[e3];
  var n3 = Array.from(typeof r4 == "string" ? [r4] : r4);
  n3[n3.length - 1] = n3[n3.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var o4 = n3.reduce(function(c3, i3) {
    var g2 = i3.match(/\n([\t ]+|(?!\s).)/g);
    return g2 ? c3.concat(g2.map(function(p4) {
      var u3, y4;
      return (y4 = (u3 = p4.match(/[\t ]/g)) === null || u3 === void 0 ? void 0 : u3.length) !== null && y4 !== void 0 ? y4 : 0;
    })) : c3;
  }, []);
  if (o4.length) {
    var s5 = new RegExp(`
[	 ]{` + Math.min.apply(Math, o4) + "}", "g");
    n3 = n3.map(function(c3) {
      return c3.replace(s5, `
`);
    });
  }
  n3[0] = n3[0].replace(/^\r?\n/, "");
  var l2 = n3[0];
  return t4.forEach(function(c3, i3) {
    var g2 = l2.match(/(?:^|\n)( *)$/), p4 = g2 ? g2[1] : "", u3 = c3;
    typeof c3 == "string" && c3.includes(`
`) && (u3 = String(c3).split(`
`).map(function(y4, v5) {
      return v5 === 0 ? y4 : "" + p4 + y4;
    }).join(`
`)), l2 += u3 + n3[i3 + 1];
  }), l2;
}
a3(F2, "dedent");
var ft = /* @__PURE__ */ new Map();
var ye = "UNIVERSAL_STORE:";
var x2 = {
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED"
};
var h2 = class h3 {
  constructor(t4, e3) {
    var _a2, _b, _c;
    this.debugging = false;
    this.listeners = /* @__PURE__ */ new Map([["*", /* @__PURE__ */ new Set()]]);
    this.getState = /* @__PURE__ */ a3(() => (this.debug("getState", { state: this.state }), this.state), "getState");
    this.subscribe = /* @__PURE__ */ a3((t5, e4) => {
      let n3 = typeof t5 == "function", o4 = n3 ? "*" : t5, s5 = n3 ? t5 : e4;
      if (this.debug("subscribe", { eventType: o4, listener: s5 }), !s5)
        throw new TypeError(
          `Missing first subscribe argument, or second if first is the event type, when subscribing to a UniversalStore with id '${this.id}'`
        );
      return this.listeners.has(o4) || this.listeners.set(o4, /* @__PURE__ */ new Set()), this.listeners.get(o4).add(s5), () => {
        var _a3;
        this.debug("unsubscribe", { eventType: o4, listener: s5 }), this.listeners.has(o4) && (this.listeners.get(o4).delete(s5), ((_a3 = this.listeners.get(o4)) == null ? void 0 : _a3.size) === 0 && this.listeners.delete(o4));
      };
    }, "subscribe");
    this.send = /* @__PURE__ */ a3((t5) => {
      if (this.debug("send", { event: t5 }), this.status !== h3.Status.READY)
        throw new TypeError(
          F2`Cannot send event before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify(
            {
              event: t5,
              id: this.id,
              actor: this.actor,
              environment: this.environment
            },
            null,
            2
          )}`
        );
      this.emitToListeners(t5, { actor: this.actor }), this.emitToChannel(t5, { actor: this.actor });
    }, "send");
    if (this.debugging = (_a2 = t4.debug) != null ? _a2 : false, !h3.isInternalConstructing)
      throw new TypeError(
        "UniversalStore is not constructable - use UniversalStore.create() instead"
      );
    if (h3.isInternalConstructing = false, this.id = t4.id, this.actorId = Date.now().toString(36) + Math.random().toString(36).substring(2), this.actorType = t4.leader ? h3.ActorType.LEADER : h3.ActorType.FOLLOWER, this.state = t4.initialState, this.channelEventName = `${ye}${this.id}`, this.debug("constructor", {
      options: t4,
      environmentOverrides: e3,
      channelEventName: this.channelEventName
    }), this.actor.type === h3.ActorType.LEADER)
      this.syncing = {
        state: x2.RESOLVED,
        promise: Promise.resolve()
      };
    else {
      let n3, o4, s5 = new Promise((l2, c3) => {
        n3 = /* @__PURE__ */ a3(() => {
          this.syncing.state === x2.PENDING && (this.syncing.state = x2.RESOLVED, l2());
        }, "syncingResolve"), o4 = /* @__PURE__ */ a3((i3) => {
          this.syncing.state === x2.PENDING && (this.syncing.state = x2.REJECTED, c3(i3));
        }, "syncingReject");
      });
      this.syncing = {
        state: x2.PENDING,
        promise: s5,
        resolve: n3,
        reject: o4
      };
    }
    this.getState = this.getState.bind(this), this.setState = this.setState.bind(this), this.subscribe = this.subscribe.bind(this), this.onStateChange = this.onStateChange.bind(this), this.send = this.send.bind(this), this.emitToChannel = this.emitToChannel.bind(this), this.prepareThis = this.prepareThis.bind(this), this.emitToListeners = this.emitToListeners.bind(this), this.handleChannelEvents = this.handleChannelEvents.bind(
      this
    ), this.debug = this.debug.bind(this), this.channel = (_b = e3 == null ? void 0 : e3.channel) != null ? _b : h3.preparation.channel, this.environment = (_c = e3 == null ? void 0 : e3.environment) != null ? _c : h3.preparation.environment, this.channel && this.environment ? this.prepareThis({ channel: this.channel, environment: this.environment }) : h3.preparation.promise.then(this.prepareThis);
  }
  static setupPreparationPromise() {
    let t4, e3, n3 = new Promise(
      (o4, s5) => {
        t4 = /* @__PURE__ */ a3((l2) => {
          o4(l2);
        }, "resolveRef"), e3 = /* @__PURE__ */ a3((...l2) => {
          s5(l2);
        }, "rejectRef");
      }
    );
    h3.preparation = {
      resolve: t4,
      reject: e3,
      promise: n3
    };
  }
  /** The actor object representing the store instance with a unique ID and a type */
  get actor() {
    var _a2;
    return Object.freeze({
      id: this.actorId,
      type: this.actorType,
      environment: (_a2 = this.environment) != null ? _a2 : h3.Environment.UNKNOWN
    });
  }
  /**
   * The current state of the store, that signals both if the store is prepared by Storybook and
   * also - in the case of a follower - if the state has been synced with the leader's state.
   */
  get status() {
    var _a2;
    if (!this.channel || !this.environment)
      return h3.Status.UNPREPARED;
    switch ((_a2 = this.syncing) == null ? void 0 : _a2.state) {
      case x2.PENDING:
      case void 0:
        return h3.Status.SYNCING;
      case x2.REJECTED:
        return h3.Status.ERROR;
      case x2.RESOLVED:
      default:
        return h3.Status.READY;
    }
  }
  /**
   * A promise that resolves when the store is fully ready. A leader will be ready when the store
   * has been prepared by Storybook, which is almost instantly.
   *
   * A follower will be ready when the state has been synced with the leader's state, within a few
   * hundred milliseconds.
   */
  untilReady() {
    var _a2;
    return Promise.all([h3.preparation.promise, (_a2 = this.syncing) == null ? void 0 : _a2.promise]);
  }
  /** Creates a new instance of UniversalStore */
  static create(t4) {
    if (!t4 || typeof (t4 == null ? void 0 : t4.id) != "string")
      throw new TypeError("id is required and must be a string, when creating a UniversalStore");
    t4.debug && console.debug(
      F2`[UniversalStore]
        create`,
      { options: t4 }
    );
    let e3 = ft.get(t4.id);
    if (e3)
      return console.warn(F2`UniversalStore with id "${t4.id}" already exists in this environment, re-using existing.
        You should reuse the existing instance instead of trying to create a new one.`), e3;
    h3.isInternalConstructing = true;
    let n3 = new h3(t4);
    return ft.set(t4.id, n3), n3;
  }
  /**
   * Used by Storybook to set the channel for all instances of UniversalStore in the given
   * environment.
   *
   * @internal
   */
  static __prepare(t4, e3) {
    h3.preparation.channel = t4, h3.preparation.environment = e3, h3.preparation.resolve({ channel: t4, environment: e3 });
  }
  /**
   * Updates the store's state
   *
   * Either a new state or a state updater function can be passed to the method.
   */
  setState(t4) {
    let e3 = this.state, n3 = typeof t4 == "function" ? t4(e3) : t4;
    if (this.debug("setState", { newState: n3, previousState: e3, updater: t4 }), this.status !== h3.Status.READY)
      throw new TypeError(
        F2`Cannot set state before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify(
          {
            newState: n3,
            id: this.id,
            actor: this.actor,
            environment: this.environment
          },
          null,
          2
        )}`
      );
    this.state = n3;
    let o4 = {
      type: h3.InternalEventType.SET_STATE,
      payload: {
        state: n3,
        previousState: e3
      }
    };
    this.emitToChannel(o4, { actor: this.actor }), this.emitToListeners(o4, { actor: this.actor });
  }
  /**
   * Subscribes to state changes
   *
   * @returns Unsubscribe function
   */
  onStateChange(t4) {
    return this.debug("onStateChange", { listener: t4 }), this.subscribe(
      h3.InternalEventType.SET_STATE,
      ({ payload: e3 }, n3) => {
        t4(e3.state, e3.previousState, n3);
      }
    );
  }
  emitToChannel(t4, e3) {
    var _a2;
    this.debug("emitToChannel", { event: t4, eventInfo: e3, channel: this.channel }), (_a2 = this.channel) == null ? void 0 : _a2.emit(this.channelEventName, {
      event: t4,
      eventInfo: e3
    });
  }
  prepareThis({
    channel: t4,
    environment: e3
  }) {
    this.channel = t4, this.environment = e3, this.debug("prepared", { channel: t4, environment: e3 }), this.channel.on(this.channelEventName, this.handleChannelEvents), this.actor.type === h3.ActorType.LEADER ? this.emitToChannel(
      { type: h3.InternalEventType.LEADER_CREATED },
      { actor: this.actor }
    ) : (this.emitToChannel(
      { type: h3.InternalEventType.FOLLOWER_CREATED },
      { actor: this.actor }
    ), this.emitToChannel(
      { type: h3.InternalEventType.EXISTING_STATE_REQUEST },
      { actor: this.actor }
    ), setTimeout(() => {
      this.syncing.reject(
        new TypeError(
          `No existing state found for follower with id: '${this.id}'. Make sure a leader with the same id exists before creating a follower.`
        )
      );
    }, 1e3));
  }
  emitToListeners(t4, e3) {
    let n3 = this.listeners.get(t4.type), o4 = this.listeners.get("*");
    this.debug("emitToListeners", {
      event: t4,
      eventInfo: e3,
      eventTypeListeners: n3,
      everythingListeners: o4
    }), [...n3 != null ? n3 : [], ...o4 != null ? o4 : []].forEach(
      (s5) => s5(t4, e3)
    );
  }
  handleChannelEvents(t4) {
    var _a2, _b, _c, _d, _e4;
    let { event: e3, eventInfo: n3 } = t4;
    if ([n3.actor.id, (_a2 = n3.forwardingActor) == null ? void 0 : _a2.id].includes(this.actor.id)) {
      this.debug("handleChannelEvents: Ignoring event from self", { channelEvent: t4 });
      return;
    } else if (((_b = this.syncing) == null ? void 0 : _b.state) === x2.PENDING && e3.type !== h3.InternalEventType.EXISTING_STATE_RESPONSE) {
      this.debug("handleChannelEvents: Ignoring event while syncing", { channelEvent: t4 });
      return;
    }
    if (this.debug("handleChannelEvents", { channelEvent: t4 }), this.actor.type === h3.ActorType.LEADER) {
      let o4 = true;
      switch (e3.type) {
        case h3.InternalEventType.EXISTING_STATE_REQUEST:
          o4 = false;
          let s5 = {
            type: h3.InternalEventType.EXISTING_STATE_RESPONSE,
            payload: this.state
          };
          this.debug("handleChannelEvents: responding to existing state request", {
            responseEvent: s5
          }), this.emitToChannel(s5, { actor: this.actor });
          break;
        case h3.InternalEventType.LEADER_CREATED:
          o4 = false, this.syncing.state = x2.REJECTED, this.debug("handleChannelEvents: erroring due to second leader being created", {
            event: e3
          }), console.error(
            F2`Detected multiple UniversalStore leaders created with the same id "${this.id}".
            Only one leader can exists at a time, your stores are now in an invalid state.
            Leaders detected:
            this: ${JSON.stringify(this.actor, null, 2)}
            other: ${JSON.stringify(n3.actor, null, 2)}`
          );
          break;
      }
      o4 && (this.debug("handleChannelEvents: forwarding event", { channelEvent: t4 }), this.emitToChannel(e3, { actor: n3.actor, forwardingActor: this.actor }));
    }
    if (this.actor.type === h3.ActorType.FOLLOWER)
      switch (e3.type) {
        case h3.InternalEventType.EXISTING_STATE_RESPONSE:
          if (this.debug("handleChannelEvents: Setting state from leader's existing state response", {
            event: e3
          }), ((_c = this.syncing) == null ? void 0 : _c.state) !== x2.PENDING)
            break;
          (_e4 = (_d = this.syncing).resolve) == null ? void 0 : _e4.call(_d);
          let o4 = {
            type: h3.InternalEventType.SET_STATE,
            payload: {
              state: e3.payload,
              previousState: this.state
            }
          };
          this.state = e3.payload, this.emitToListeners(o4, n3);
          break;
      }
    switch (e3.type) {
      case h3.InternalEventType.SET_STATE:
        this.debug("handleChannelEvents: Setting state", { event: e3 }), this.state = e3.payload.state;
        break;
    }
    this.emitToListeners(e3, { actor: n3.actor });
  }
  debug(t4, e3) {
    var _a2;
    this.debugging && console.debug(
      F2`[UniversalStore::${this.id}::${(_a2 = this.environment) != null ? _a2 : h3.Environment.UNKNOWN}]
        ${t4}`,
      JSON.stringify(
        {
          data: e3,
          actor: this.actor,
          state: this.state,
          status: this.status
        },
        null,
        2
      )
    );
  }
  /**
   * Used to reset the static fields of the UniversalStore class when cleaning up tests
   *
   * @internal
   */
  static __reset() {
    h3.preparation.reject(new Error("reset")), h3.setupPreparationPromise(), h3.isInternalConstructing = false;
  }
};
a3(h2, "UniversalStore"), /**
* Defines the possible actor types in the store system
*
* @readonly
*/
h2.ActorType = {
  LEADER: "LEADER",
  FOLLOWER: "FOLLOWER"
}, /**
* Defines the possible environments the store can run in
*
* @readonly
*/
h2.Environment = {
  SERVER: "SERVER",
  MANAGER: "MANAGER",
  PREVIEW: "PREVIEW",
  UNKNOWN: "UNKNOWN",
  MOCK: "MOCK"
}, /**
* Internal event types used for store synchronization
*
* @readonly
*/
h2.InternalEventType = {
  EXISTING_STATE_REQUEST: "__EXISTING_STATE_REQUEST",
  EXISTING_STATE_RESPONSE: "__EXISTING_STATE_RESPONSE",
  SET_STATE: "__SET_STATE",
  LEADER_CREATED: "__LEADER_CREATED",
  FOLLOWER_CREATED: "__FOLLOWER_CREATED"
}, h2.Status = {
  UNPREPARED: "UNPREPARED",
  SYNCING: "SYNCING",
  READY: "READY",
  ERROR: "ERROR"
}, // This is used to check if constructor was called from the static factory create()
h2.isInternalConstructing = false, h2.setupPreparationPromise();
var $2 = h2;
var de = /* @__PURE__ */ a3((r4) => r4.transports !== void 0, "isMulti");
var ge = /* @__PURE__ */ a3(() => Math.random().toString(16).slice(2), "generateRandomId");
var ht = class ht2 {
  constructor(t4 = {}) {
    this.sender = ge();
    this.events = {};
    this.data = {};
    this.transports = [];
    this.isAsync = t4.async || false, de(t4) ? (this.transports = t4.transports || [], this.transports.forEach((e3) => {
      e3.setHandler((n3) => this.handleEvent(n3));
    })) : this.transports = t4.transport ? [t4.transport] : [], this.transports.forEach((e3) => {
      e3.setHandler((n3) => this.handleEvent(n3));
    });
  }
  get hasTransport() {
    return this.transports.length > 0;
  }
  addListener(t4, e3) {
    this.events[t4] = this.events[t4] || [], this.events[t4].push(e3);
  }
  emit(t4, ...e3) {
    let n3 = { type: t4, args: e3, from: this.sender }, o4 = {};
    e3.length >= 1 && e3[0] && e3[0].options && (o4 = e3[0].options);
    let s5 = /* @__PURE__ */ a3(() => {
      this.transports.forEach((l2) => {
        l2.send(n3, o4);
      }), this.handleEvent(n3);
    }, "handler");
    this.isAsync ? setImmediate(s5) : s5();
  }
  last(t4) {
    return this.data[t4];
  }
  eventNames() {
    return Object.keys(this.events);
  }
  listenerCount(t4) {
    let e3 = this.listeners(t4);
    return e3 ? e3.length : 0;
  }
  listeners(t4) {
    return this.events[t4] || void 0;
  }
  once(t4, e3) {
    let n3 = this.onceListener(t4, e3);
    this.addListener(t4, n3);
  }
  removeAllListeners(t4) {
    t4 ? this.events[t4] && delete this.events[t4] : this.events = {};
  }
  removeListener(t4, e3) {
    let n3 = this.listeners(t4);
    n3 && (this.events[t4] = n3.filter((o4) => o4 !== e3));
  }
  on(t4, e3) {
    this.addListener(t4, e3);
  }
  off(t4, e3) {
    this.removeListener(t4, e3);
  }
  handleEvent(t4) {
    let e3 = this.listeners(t4.type);
    e3 && e3.length && e3.forEach((n3) => {
      n3.apply(t4, t4.args);
    }), this.data[t4.type] = t4.args;
  }
  onceListener(t4, e3) {
    let n3 = /* @__PURE__ */ a3((...o4) => (this.removeListener(t4, n3), e3(...o4)), "onceListener");
    return n3;
  }
};
a3(ht, "Channel");
var B2 = ht;
var ve = Object.create;
var Ot = Object.defineProperty;
var me = Object.getOwnPropertyDescriptor;
var Ct = Object.getOwnPropertyNames;
var Ee = Object.getPrototypeOf;
var be = Object.prototype.hasOwnProperty;
var P2 = /* @__PURE__ */ a3((r4, t4) => /* @__PURE__ */ a3(function() {
  return t4 || (0, r4[Ct(r4)[0]])((t4 = { exports: {} }).exports, t4), t4.exports;
}, "__require"), "__commonJS");
var Se = /* @__PURE__ */ a3((r4, t4, e3, n3) => {
  if (t4 && typeof t4 == "object" || typeof t4 == "function")
    for (let o4 of Ct(t4))
      !be.call(r4, o4) && o4 !== e3 && Ot(r4, o4, { get: /* @__PURE__ */ a3(() => t4[o4], "get"), enumerable: !(n3 = me(t4, o4)) || n3.enumerable });
  return r4;
}, "__copyProps");
var ot = /* @__PURE__ */ a3((r4, t4, e3) => (e3 = r4 != null ? ve(Ee(r4)) : {}, Se(
  t4 || !r4 || !r4.__esModule ? Ot(e3, "default", { value: r4, enumerable: true }) : e3,
  r4
)), "__toESM");
var _e = [
  "bubbles",
  "cancelBubble",
  "cancelable",
  "composed",
  "currentTarget",
  "defaultPrevented",
  "eventPhase",
  "isTrusted",
  "returnValue",
  "srcElement",
  "target",
  "timeStamp",
  "type"
];
var Te = ["detail"];
function Pt(r4) {
  let t4 = _e.filter((e3) => r4[e3] !== void 0).reduce((e3, n3) => __spreadProps(__spreadValues({}, e3), { [n3]: r4[n3] }), {});
  return r4 instanceof CustomEvent && Te.filter((e3) => r4[e3] !== void 0).forEach((e3) => {
    t4[e3] = r4[e3];
  }), t4;
}
a3(Pt, "extractEventHiddenProperties");
var Bt = he(xt(), 1);
var Ft = P2({
  "node_modules/has-symbols/shams.js"(r4, t4) {
    "use strict";
    t4.exports = /* @__PURE__ */ a3(function() {
      if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
        return false;
      if (typeof Symbol.iterator == "symbol")
        return true;
      var n3 = {}, o4 = Symbol("test"), s5 = Object(o4);
      if (typeof o4 == "string" || Object.prototype.toString.call(o4) !== "[object Symbol]" || Object.prototype.toString.call(s5) !== "[object Symbol]")
        return false;
      var l2 = 42;
      n3[o4] = l2;
      for (o4 in n3)
        return false;
      if (typeof Object.keys == "function" && Object.keys(n3).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(
        n3
      ).length !== 0)
        return false;
      var c3 = Object.getOwnPropertySymbols(n3);
      if (c3.length !== 1 || c3[0] !== o4 || !Object.prototype.propertyIsEnumerable.call(n3, o4))
        return false;
      if (typeof Object.getOwnPropertyDescriptor == "function") {
        var i3 = Object.getOwnPropertyDescriptor(n3, o4);
        if (i3.value !== l2 || i3.enumerable !== true)
          return false;
      }
      return true;
    }, "hasSymbols");
  }
});
var Mt = P2({
  "node_modules/has-symbols/index.js"(r4, t4) {
    "use strict";
    var e3 = typeof Symbol < "u" && Symbol, n3 = Ft();
    t4.exports = /* @__PURE__ */ a3(function() {
      return typeof e3 != "function" || typeof Symbol != "function" || typeof e3("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? false : n3();
    }, "hasNativeSymbols");
  }
});
var Ae = P2({
  "node_modules/function-bind/implementation.js"(r4, t4) {
    "use strict";
    var e3 = "Function.prototype.bind called on incompatible ", n3 = Array.prototype.slice, o4 = Object.prototype.toString, s5 = "[object Function]";
    t4.exports = /* @__PURE__ */ a3(function(c3) {
      var i3 = this;
      if (typeof i3 != "function" || o4.call(i3) !== s5)
        throw new TypeError(e3 + i3);
      for (var g2 = n3.call(arguments, 1), p4, u3 = /* @__PURE__ */ a3(function() {
        if (this instanceof p4) {
          var E3 = i3.apply(
            this,
            g2.concat(n3.call(arguments))
          );
          return Object(E3) === E3 ? E3 : this;
        } else
          return i3.apply(
            c3,
            g2.concat(n3.call(arguments))
          );
      }, "binder"), y4 = Math.max(0, i3.length - g2.length), v5 = [], d2 = 0; d2 < y4; d2++)
        v5.push("$" + d2);
      if (p4 = Function("binder", "return function (" + v5.join(",") + "){ return binder.apply(this,arguments); }")(u3), i3.prototype) {
        var m3 = /* @__PURE__ */ a3(function() {
        }, "Empty2");
        m3.prototype = i3.prototype, p4.prototype = new m3(), m3.prototype = null;
      }
      return p4;
    }, "bind");
  }
});
var gt = P2({
  "node_modules/function-bind/index.js"(r4, t4) {
    "use strict";
    var e3 = Ae();
    t4.exports = Function.prototype.bind || e3;
  }
});
var we = P2({
  "node_modules/has/src/index.js"(r4, t4) {
    "use strict";
    var e3 = gt();
    t4.exports = e3.call(Function.call, Object.prototype.hasOwnProperty);
  }
});
var $t = P2({
  "node_modules/get-intrinsic/index.js"(r4, t4) {
    "use strict";
    var e3, n3 = SyntaxError, o4 = Function, s5 = TypeError, l2 = /* @__PURE__ */ a3(function(j5) {
      try {
        return o4('"use strict"; return (' + j5 + ").constructor;")();
      } catch (e4) {
      }
    }, "getEvalledConstructor"), c3 = Object.getOwnPropertyDescriptor;
    if (c3)
      try {
        c3({}, "");
      } catch (e4) {
        c3 = null;
      }
    var i3 = /* @__PURE__ */ a3(function() {
      throw new s5();
    }, "throwTypeError"), g2 = c3 ? function() {
      try {
        return arguments.callee, i3;
      } catch (e4) {
        try {
          return c3(arguments, "callee").get;
        } catch (e5) {
          return i3;
        }
      }
    }() : i3, p4 = Mt()(), u3 = Object.getPrototypeOf || function(j5) {
      return j5.__proto__;
    }, y4 = {}, v5 = typeof Uint8Array > "u" ? e3 : u3(Uint8Array), d2 = {
      "%AggregateError%": typeof AggregateError > "u" ? e3 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer > "u" ? e3 : ArrayBuffer,
      "%ArrayIteratorPrototype%": p4 ? u3([][Symbol.iterator]()) : e3,
      "%AsyncFromSyncIteratorPrototype%": e3,
      "%AsyncFunction%": y4,
      "%AsyncGenerator%": y4,
      "%AsyncGeneratorFunction%": y4,
      "%AsyncIteratorPrototype%": y4,
      "%Atomics%": typeof Atomics > "u" ? e3 : Atomics,
      "%BigInt%": typeof BigInt > "u" ? e3 : BigInt,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView > "u" ? e3 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array > "u" ? e3 : Float32Array,
      "%Float64Array%": typeof Float64Array > "u" ? e3 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? e3 : FinalizationRegistry,
      "%Function%": o4,
      "%GeneratorFunction%": y4,
      "%Int8Array%": typeof Int8Array > "u" ? e3 : Int8Array,
      "%Int16Array%": typeof Int16Array > "u" ? e3 : Int16Array,
      "%Int32Array%": typeof Int32Array > "u" ? e3 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": p4 ? u3(u3([][Symbol.iterator]())) : e3,
      "%JSON%": typeof JSON == "object" ? JSON : e3,
      "%Map%": typeof Map > "u" ? e3 : Map,
      "%MapIteratorPrototype%": typeof Map > "u" || !p4 ? e3 : u3((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise > "u" ? e3 : Promise,
      "%Proxy%": typeof Proxy > "u" ? e3 : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect > "u" ? e3 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set > "u" ? e3 : Set,
      "%SetIteratorPrototype%": typeof Set > "u" || !p4 ? e3 : u3((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? e3 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": p4 ? u3(""[Symbol.iterator]()) : e3,
      "%Symbol%": p4 ? Symbol : e3,
      "%SyntaxError%": n3,
      "%ThrowTypeError%": g2,
      "%TypedArray%": v5,
      "%TypeError%": s5,
      "%Uint8Array%": typeof Uint8Array > "u" ? e3 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? e3 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array > "u" ? e3 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array > "u" ? e3 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap > "u" ? e3 : WeakMap,
      "%WeakRef%": typeof WeakRef > "u" ? e3 : WeakRef,
      "%WeakSet%": typeof WeakSet > "u" ? e3 : WeakSet
    }, m3 = /* @__PURE__ */ a3(function j5(b6) {
      var A4;
      if (b6 === "%AsyncFunction%")
        A4 = l2("async function () {}");
      else if (b6 === "%GeneratorFunction%")
        A4 = l2("function* () {}");
      else if (b6 === "%AsyncGeneratorFunction%")
        A4 = l2("async function* () {}");
      else if (b6 === "%AsyncGenerator%") {
        var _6 = j5("%AsyncGeneratorFunction%");
        _6 && (A4 = _6.prototype);
      } else if (b6 === "%AsyncIteratorPrototype%") {
        var w5 = j5("%AsyncGenerator%");
        w5 && (A4 = u3(w5.prototype));
      }
      return d2[b6] = A4, A4;
    }, "doEval2"), E3 = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    }, I7 = gt(), T7 = we(), R5 = I7.call(Function.call, Array.prototype.concat), C5 = I7.call(Function.apply, Array.prototype.splice), N5 = I7.call(
      Function.call,
      String.prototype.replace
    ), Q4 = I7.call(Function.call, String.prototype.slice), ee4 = I7.call(Function.call, RegExp.prototype.exec), re4 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, ne = /\\(\\)?/g, oe3 = /* @__PURE__ */ a3(
      function(b6) {
        var A4 = Q4(b6, 0, 1), _6 = Q4(b6, -1);
        if (A4 === "%" && _6 !== "%")
          throw new n3("invalid intrinsic syntax, expected closing `%`");
        if (_6 === "%" && A4 !== "%")
          throw new n3("invalid intrinsic syntax, expected opening `%`");
        var w5 = [];
        return N5(b6, re4, function(L7, M5, O5, Z4) {
          w5[w5.length] = O5 ? N5(Z4, ne, "$1") : M5 || L7;
        }), w5;
      },
      "stringToPath3"
    ), ie3 = /* @__PURE__ */ a3(function(b6, A4) {
      var _6 = b6, w5;
      if (T7(E3, _6) && (w5 = E3[_6], _6 = "%" + w5[0] + "%"), T7(d2, _6)) {
        var L7 = d2[_6];
        if (L7 === y4 && (L7 = m3(_6)), typeof L7 > "u" && !A4)
          throw new s5("intrinsic " + b6 + " exists, but is not available. Please file an issue!");
        return {
          alias: w5,
          name: _6,
          value: L7
        };
      }
      throw new n3("intrinsic " + b6 + " does not exist!");
    }, "getBaseIntrinsic2");
    t4.exports = /* @__PURE__ */ a3(function(b6, A4) {
      if (typeof b6 != "string" || b6.length === 0)
        throw new s5("intrinsic name must be a non-empty string");
      if (arguments.length > 1 && typeof A4 != "boolean")
        throw new s5('"allowMissing" argument must be a boolean');
      if (ee4(/^%?[^%]*%?$/, b6) === null)
        throw new n3("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      var _6 = oe3(b6), w5 = _6.length > 0 ? _6[0] : "", L7 = ie3("%" + w5 + "%", A4), M5 = L7.name, O5 = L7.value, Z4 = false, pt2 = L7.alias;
      pt2 && (w5 = pt2[0], C5(_6, R5([0, 1], pt2)));
      for (var tt2 = 1, z5 = true; tt2 < _6.length; tt2 += 1) {
        var D5 = _6[tt2], et4 = Q4(D5, 0, 1), rt4 = Q4(D5, -1);
        if ((et4 === '"' || et4 === "'" || et4 === "`" || rt4 === '"' || rt4 === "'" || rt4 === "`") && et4 !== rt4)
          throw new n3("property names with quotes must have matching quotes");
        if ((D5 === "constructor" || !z5) && (Z4 = true), w5 += "." + D5, M5 = "%" + w5 + "%", T7(d2, M5))
          O5 = d2[M5];
        else if (O5 != null) {
          if (!(D5 in O5)) {
            if (!A4)
              throw new s5("base intrinsic for " + b6 + " exists, but the property is not available.");
            return;
          }
          if (c3 && tt2 + 1 >= _6.length) {
            var nt4 = c3(O5, D5);
            z5 = !!nt4, z5 && "get" in nt4 && !("originalValue" in nt4.get) ? O5 = nt4.get : O5 = O5[D5];
          } else
            z5 = T7(O5, D5), O5 = O5[D5];
          z5 && !Z4 && (d2[M5] = O5);
        }
      }
      return O5;
    }, "GetIntrinsic");
  }
});
var Oe = P2({
  "node_modules/call-bind/index.js"(r4, t4) {
    "use strict";
    var e3 = gt(), n3 = $t(), o4 = n3("%Function.prototype.apply%"), s5 = n3("%Function.prototype.call%"), l2 = n3("%Reflect.apply%", true) || e3.call(
      s5,
      o4
    ), c3 = n3("%Object.getOwnPropertyDescriptor%", true), i3 = n3("%Object.defineProperty%", true), g2 = n3("%Math.max%");
    if (i3)
      try {
        i3({}, "a", { value: 1 });
      } catch (e4) {
        i3 = null;
      }
    t4.exports = /* @__PURE__ */ a3(function(y4) {
      var v5 = l2(e3, s5, arguments);
      if (c3 && i3) {
        var d2 = c3(v5, "length");
        d2.configurable && i3(
          v5,
          "length",
          { value: 1 + g2(0, y4.length - (arguments.length - 1)) }
        );
      }
      return v5;
    }, "callBind");
    var p4 = /* @__PURE__ */ a3(function() {
      return l2(e3, o4, arguments);
    }, "applyBind2");
    i3 ? i3(t4.exports, "apply", { value: p4 }) : t4.exports.apply = p4;
  }
});
var Ce = P2({
  "node_modules/call-bind/callBound.js"(r4, t4) {
    "use strict";
    var e3 = $t(), n3 = Oe(), o4 = n3(e3("String.prototype.indexOf"));
    t4.exports = /* @__PURE__ */ a3(function(l2, c3) {
      var i3 = e3(l2, !!c3);
      return typeof i3 == "function" && o4(l2, ".prototype.") > -1 ? n3(i3) : i3;
    }, "callBoundIntrinsic");
  }
});
var Pe = P2({
  "node_modules/has-tostringtag/shams.js"(r4, t4) {
    "use strict";
    var e3 = Ft();
    t4.exports = /* @__PURE__ */ a3(function() {
      return e3() && !!Symbol.toStringTag;
    }, "hasToStringTagShams");
  }
});
var Ie = P2({
  "node_modules/is-regex/index.js"(r4, t4) {
    "use strict";
    var e3 = Ce(), n3 = Pe()(), o4, s5, l2, c3;
    n3 && (o4 = e3("Object.prototype.hasOwnProperty"), s5 = e3("RegExp.prototype.exec"), l2 = {}, i3 = /* @__PURE__ */ a3(function() {
      throw l2;
    }, "throwRegexMarker"), c3 = {
      toString: i3,
      valueOf: i3
    }, typeof Symbol.toPrimitive == "symbol" && (c3[Symbol.toPrimitive] = i3));
    var i3, g2 = e3("Object.prototype.toString"), p4 = Object.getOwnPropertyDescriptor, u3 = "[object RegExp]";
    t4.exports = /* @__PURE__ */ a3(n3 ? function(v5) {
      if (!v5 || typeof v5 != "object")
        return false;
      var d2 = p4(v5, "lastIndex"), m3 = d2 && o4(d2, "value");
      if (!m3)
        return false;
      try {
        s5(v5, c3);
      } catch (E3) {
        return E3 === l2;
      }
    } : function(v5) {
      return !v5 || typeof v5 != "object" && typeof v5 != "function" ? false : g2(v5) === u3;
    }, "isRegex");
  }
});
var xe = P2({
  "node_modules/is-function/index.js"(r4, t4) {
    t4.exports = n3;
    var e3 = Object.prototype.toString;
    function n3(o4) {
      if (!o4)
        return false;
      var s5 = e3.call(o4);
      return s5 === "[object Function]" || typeof o4 == "function" && s5 !== "[object RegExp]" || typeof window < "u" && (o4 === window.setTimeout || o4 === window.alert || o4 === window.confirm || o4 === window.prompt);
    }
    a3(n3, "isFunction3");
  }
});
var Re = P2({
  "node_modules/is-symbol/index.js"(r4, t4) {
    "use strict";
    var e3 = Object.prototype.toString, n3 = Mt()();
    n3 ? (o4 = Symbol.prototype.toString, s5 = /^Symbol\(.*\)$/, l2 = /* @__PURE__ */ a3(function(i3) {
      return typeof i3.valueOf() != "symbol" ? false : s5.test(o4.call(i3));
    }, "isRealSymbolObject"), t4.exports = /* @__PURE__ */ a3(function(i3) {
      if (typeof i3 == "symbol")
        return true;
      if (e3.call(i3) !== "[object Symbol]")
        return false;
      try {
        return l2(i3);
      } catch (e4) {
        return false;
      }
    }, "isSymbol3")) : t4.exports = /* @__PURE__ */ a3(function(i3) {
      return false;
    }, "isSymbol3");
    var o4, s5, l2;
  }
});
var Ne = ot(Ie());
var je = ot(xe());
var Le = ot(Re());
function De(r4) {
  return r4 != null && typeof r4 == "object" && Array.isArray(r4) === false;
}
a3(De, "isObject");
var Fe = typeof global == "object" && global && global.Object === Object && global;
var Me = Fe;
var $e = typeof self == "object" && self && self.Object === Object && self;
var Ue = Me || $e || Function("return this")();
var vt = Ue;
var ke = vt.Symbol;
var U2 = ke;
var Ut = Object.prototype;
var Ge = Ut.hasOwnProperty;
var We = Ut.toString;
var q2 = U2 ? U2.toStringTag : void 0;
function ze(r4) {
  var t4 = Ge.call(r4, q2), e3 = r4[q2];
  try {
    r4[q2] = void 0;
    var n3 = true;
  } catch (e4) {
  }
  var o4 = We.call(r4);
  return n3 && (t4 ? r4[q2] = e3 : delete r4[q2]), o4;
}
a3(ze, "getRawTag");
var He = ze;
var Be = Object.prototype;
var qe = Be.toString;
function Ve(r4) {
  return qe.call(r4);
}
a3(Ve, "objectToString");
var Je = Ve;
var Ke = "[object Null]";
var Ye = "[object Undefined]";
var Rt = U2 ? U2.toStringTag : void 0;
function Xe(r4) {
  return r4 == null ? r4 === void 0 ? Ye : Ke : Rt && Rt in Object(r4) ? He(r4) : Je(r4);
}
a3(Xe, "baseGetTag");
var kt = Xe;
function Qe(r4) {
  return r4 != null && typeof r4 == "object";
}
a3(Qe, "isObjectLike");
var Ze = Qe;
var tr = "[object Symbol]";
function er(r4) {
  return typeof r4 == "symbol" || Ze(r4) && kt(r4) == tr;
}
a3(er, "isSymbol");
var mt = er;
function rr(r4, t4) {
  for (var e3 = -1, n3 = r4 == null ? 0 : r4.length, o4 = Array(n3); ++e3 < n3; )
    o4[e3] = t4(r4[e3], e3, r4);
  return o4;
}
a3(rr, "arrayMap");
var nr = rr;
var or = Array.isArray;
var Et = or;
var ir = 1 / 0;
var Nt = U2 ? U2.prototype : void 0;
var jt = Nt ? Nt.toString : void 0;
function Gt(r4) {
  if (typeof r4 == "string")
    return r4;
  if (Et(r4))
    return nr(r4, Gt) + "";
  if (mt(r4))
    return jt ? jt.call(r4) : "";
  var t4 = r4 + "";
  return t4 == "0" && 1 / r4 == -ir ? "-0" : t4;
}
a3(Gt, "baseToString");
var ar = Gt;
function sr(r4) {
  var t4 = typeof r4;
  return r4 != null && (t4 == "object" || t4 == "function");
}
a3(sr, "isObject2");
var Wt = sr;
var lr = "[object AsyncFunction]";
var cr = "[object Function]";
var pr = "[object GeneratorFunction]";
var ur = "[object Proxy]";
function fr(r4) {
  if (!Wt(r4))
    return false;
  var t4 = kt(r4);
  return t4 == cr || t4 == pr || t4 == lr || t4 == ur;
}
a3(fr, "isFunction");
var hr = fr;
var yr = vt["__core-js_shared__"];
var dt = yr;
var Lt = function() {
  var r4 = /[^.]+$/.exec(dt && dt.keys && dt.keys.IE_PROTO || "");
  return r4 ? "Symbol(src)_1." + r4 : "";
}();
function dr(r4) {
  return !!Lt && Lt in r4;
}
a3(dr, "isMasked");
var gr = dr;
var vr = Function.prototype;
var mr = vr.toString;
function Er(r4) {
  if (r4 != null) {
    try {
      return mr.call(r4);
    } catch (e3) {
    }
    try {
      return r4 + "";
    } catch (e3) {
    }
  }
  return "";
}
a3(Er, "toSource");
var br = Er;
var Sr = /[\\^$.*+?()[\]{}|]/g;
var _r = /^\[object .+?Constructor\]$/;
var Tr = Function.prototype;
var Ar = Object.prototype;
var wr = Tr.toString;
var Or = Ar.hasOwnProperty;
var Cr = RegExp(
  "^" + wr.call(Or).replace(Sr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Pr(r4) {
  if (!Wt(r4) || gr(r4))
    return false;
  var t4 = hr(r4) ? Cr : _r;
  return t4.test(br(r4));
}
a3(Pr, "baseIsNative");
var Ir = Pr;
function xr(r4, t4) {
  return r4 == null ? void 0 : r4[t4];
}
a3(xr, "getValue");
var Rr = xr;
function Nr(r4, t4) {
  var e3 = Rr(r4, t4);
  return Ir(e3) ? e3 : void 0;
}
a3(Nr, "getNative");
var zt = Nr;
function jr(r4, t4) {
  return r4 === t4 || r4 !== r4 && t4 !== t4;
}
a3(jr, "eq");
var Lr = jr;
var Dr = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var Fr = /^\w*$/;
function Mr(r4, t4) {
  if (Et(r4))
    return false;
  var e3 = typeof r4;
  return e3 == "number" || e3 == "symbol" || e3 == "boolean" || r4 == null || mt(r4) ? true : Fr.test(r4) || !Dr.test(r4) || t4 != null && r4 in Object(
    t4
  );
}
a3(Mr, "isKey");
var $r = Mr;
var Ur = zt(Object, "create");
var V2 = Ur;
function kr() {
  this.__data__ = V2 ? V2(null) : {}, this.size = 0;
}
a3(kr, "hashClear");
var Gr = kr;
function Wr(r4) {
  var t4 = this.has(r4) && delete this.__data__[r4];
  return this.size -= t4 ? 1 : 0, t4;
}
a3(Wr, "hashDelete");
var zr = Wr;
var Hr = "__lodash_hash_undefined__";
var Br = Object.prototype;
var qr = Br.hasOwnProperty;
function Vr(r4) {
  var t4 = this.__data__;
  if (V2) {
    var e3 = t4[r4];
    return e3 === Hr ? void 0 : e3;
  }
  return qr.call(t4, r4) ? t4[r4] : void 0;
}
a3(Vr, "hashGet");
var Jr = Vr;
var Kr = Object.prototype;
var Yr = Kr.hasOwnProperty;
function Xr(r4) {
  var t4 = this.__data__;
  return V2 ? t4[r4] !== void 0 : Yr.call(t4, r4);
}
a3(Xr, "hashHas");
var Qr = Xr;
var Zr = "__lodash_hash_undefined__";
function tn(r4, t4) {
  var e3 = this.__data__;
  return this.size += this.has(r4) ? 0 : 1, e3[r4] = V2 && t4 === void 0 ? Zr : t4, this;
}
a3(tn, "hashSet");
var en = tn;
function k2(r4) {
  var t4 = -1, e3 = r4 == null ? 0 : r4.length;
  for (this.clear(); ++t4 < e3; ) {
    var n3 = r4[t4];
    this.set(n3[0], n3[1]);
  }
}
a3(k2, "Hash");
k2.prototype.clear = Gr;
k2.prototype.delete = zr;
k2.prototype.get = Jr;
k2.prototype.has = Qr;
k2.prototype.set = en;
var Dt = k2;
function rn() {
  this.__data__ = [], this.size = 0;
}
a3(rn, "listCacheClear");
var nn = rn;
function on(r4, t4) {
  for (var e3 = r4.length; e3--; )
    if (Lr(r4[e3][0], t4))
      return e3;
  return -1;
}
a3(on, "assocIndexOf");
var at = on;
var an = Array.prototype;
var sn = an.splice;
function ln(r4) {
  var t4 = this.__data__, e3 = at(t4, r4);
  if (e3 < 0)
    return false;
  var n3 = t4.length - 1;
  return e3 == n3 ? t4.pop() : sn.call(t4, e3, 1), --this.size, true;
}
a3(ln, "listCacheDelete");
var cn2 = ln;
function pn(r4) {
  var t4 = this.__data__, e3 = at(t4, r4);
  return e3 < 0 ? void 0 : t4[e3][1];
}
a3(pn, "listCacheGet");
var un = pn;
function fn(r4) {
  return at(this.__data__, r4) > -1;
}
a3(fn, "listCacheHas");
var hn = fn;
function yn(r4, t4) {
  var e3 = this.__data__, n3 = at(e3, r4);
  return n3 < 0 ? (++this.size, e3.push([r4, t4])) : e3[n3][1] = t4, this;
}
a3(yn, "listCacheSet");
var dn = yn;
function G2(r4) {
  var t4 = -1, e3 = r4 == null ? 0 : r4.length;
  for (this.clear(); ++t4 < e3; ) {
    var n3 = r4[t4];
    this.set(n3[0], n3[1]);
  }
}
a3(G2, "ListCache");
G2.prototype.clear = nn;
G2.prototype.delete = cn2;
G2.prototype.get = un;
G2.prototype.has = hn;
G2.prototype.set = dn;
var gn = G2;
var vn = zt(vt, "Map");
var mn = vn;
function En() {
  this.size = 0, this.__data__ = {
    hash: new Dt(),
    map: new (mn || gn)(),
    string: new Dt()
  };
}
a3(En, "mapCacheClear");
var bn = En;
function Sn(r4) {
  var t4 = typeof r4;
  return t4 == "string" || t4 == "number" || t4 == "symbol" || t4 == "boolean" ? r4 !== "__proto__" : r4 === null;
}
a3(Sn, "isKeyable");
var _n = Sn;
function Tn(r4, t4) {
  var e3 = r4.__data__;
  return _n(t4) ? e3[typeof t4 == "string" ? "string" : "hash"] : e3.map;
}
a3(Tn, "getMapData");
var st = Tn;
function An(r4) {
  var t4 = st(this, r4).delete(r4);
  return this.size -= t4 ? 1 : 0, t4;
}
a3(An, "mapCacheDelete");
var wn = An;
function On(r4) {
  return st(this, r4).get(r4);
}
a3(On, "mapCacheGet");
var Cn = On;
function Pn(r4) {
  return st(this, r4).has(r4);
}
a3(Pn, "mapCacheHas");
var In = Pn;
function xn(r4, t4) {
  var e3 = st(this, r4), n3 = e3.size;
  return e3.set(r4, t4), this.size += e3.size == n3 ? 0 : 1, this;
}
a3(xn, "mapCacheSet");
var Rn = xn;
function W2(r4) {
  var t4 = -1, e3 = r4 == null ? 0 : r4.length;
  for (this.clear(); ++t4 < e3; ) {
    var n3 = r4[t4];
    this.set(n3[0], n3[1]);
  }
}
a3(W2, "MapCache");
W2.prototype.clear = bn;
W2.prototype.delete = wn;
W2.prototype.get = Cn;
W2.prototype.has = In;
W2.prototype.set = Rn;
var Ht = W2;
var Nn = "Expected a function";
function bt(r4, t4) {
  if (typeof r4 != "function" || t4 != null && typeof t4 != "function")
    throw new TypeError(Nn);
  var e3 = /* @__PURE__ */ a3(function() {
    var n3 = arguments, o4 = t4 ? t4.apply(this, n3) : n3[0], s5 = e3.cache;
    if (s5.has(o4))
      return s5.get(o4);
    var l2 = r4.apply(this, n3);
    return e3.cache = s5.set(o4, l2) || s5, l2;
  }, "memoized");
  return e3.cache = new (bt.Cache || Ht)(), e3;
}
a3(bt, "memoize");
bt.Cache = Ht;
var jn = bt;
var Ln = 500;
function Dn(r4) {
  var t4 = jn(r4, function(n3) {
    return e3.size === Ln && e3.clear(), n3;
  }), e3 = t4.cache;
  return t4;
}
a3(Dn, "memoizeCapped");
var Fn = Dn;
var Mn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var $n = /\\(\\)?/g;
var Un = Fn(
  function(r4) {
    var t4 = [];
    return r4.charCodeAt(0) === 46 && t4.push(""), r4.replace(Mn, function(e3, n3, o4, s5) {
      t4.push(o4 ? s5.replace($n, "$1") : n3 || e3);
    }), t4;
  }
);
var kn = Un;
function Gn(r4) {
  return r4 == null ? "" : ar(r4);
}
a3(Gn, "toString");
var Wn = Gn;
function zn(r4, t4) {
  return Et(r4) ? r4 : $r(r4, t4) ? [r4] : kn(Wn(r4));
}
a3(zn, "castPath");
var Hn = zn;
var Bn = 1 / 0;
function qn(r4) {
  if (typeof r4 == "string" || mt(r4))
    return r4;
  var t4 = r4 + "";
  return t4 == "0" && 1 / r4 == -Bn ? "-0" : t4;
}
a3(qn, "toKey");
var Vn = qn;
function Jn(r4, t4) {
  t4 = Hn(t4, r4);
  for (var e3 = 0, n3 = t4.length; r4 != null && e3 < n3; )
    r4 = r4[Vn(t4[e3++])];
  return e3 && e3 == n3 ? r4 : void 0;
}
a3(Jn, "baseGet");
var Kn = Jn;
function Yn(r4, t4, e3) {
  var n3 = r4 == null ? void 0 : Kn(r4, t4);
  return n3 === void 0 ? e3 : n3;
}
a3(Yn, "get");
var Xn = Yn;
var it = De;
var Qn = /* @__PURE__ */ a3((r4) => {
  let t4 = null, e3 = false, n3 = false, o4 = false, s5 = "";
  if (r4.indexOf("//") >= 0 || r4.indexOf("/*") >= 0)
    for (let l2 = 0; l2 < r4.length; l2 += 1)
      !t4 && !e3 && !n3 && !o4 ? r4[l2] === '"' || r4[l2] === "'" || r4[l2] === "`" ? t4 = r4[l2] : r4[l2] === "/" && r4[l2 + 1] === "*" ? e3 = true : r4[l2] === "/" && r4[l2 + 1] === "/" ? n3 = true : r4[l2] === "/" && r4[l2 + 1] !== "/" && (o4 = true) : (t4 && (r4[l2] === t4 && r4[l2 - 1] !== "\\" || r4[l2] === `
` && t4 !== "`") && (t4 = null), o4 && (r4[l2] === "/" && r4[l2 - 1] !== "\\" || r4[l2] === `
`) && (o4 = false), e3 && r4[l2 - 1] === "/" && r4[l2 - 2] === "*" && (e3 = false), n3 && r4[l2] === `
` && (n3 = false)), !e3 && !n3 && (s5 += r4[l2]);
  else
    s5 = r4;
  return s5;
}, "removeCodeComments");
var Zn = (0, Bt.default)(1e4)(
  (r4) => Qn(r4).replace(/\n\s*/g, "").trim()
);
var to = /* @__PURE__ */ a3(function(t4, e3) {
  let n3 = e3.slice(0, e3.indexOf("{")), o4 = e3.slice(e3.indexOf("{"));
  if (n3.includes("=>") || n3.includes("function"))
    return e3;
  let s5 = n3;
  return s5 = s5.replace(t4, "function"), s5 + o4;
}, "convertShorthandMethods2");
var eo = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
var J2 = /* @__PURE__ */ a3(
  (r4) => r4.match(/^[\[\{\"\}].*[\]\}\"]$/),
  "isJSON"
);
function qt(r4) {
  if (!it(r4))
    return r4;
  let t4 = r4, e3 = false;
  return typeof Event < "u" && r4 instanceof Event && (t4 = Pt(t4), e3 = true), t4 = Object.keys(t4).reduce((n3, o4) => {
    try {
      t4[o4] && t4[o4].toJSON, n3[o4] = t4[o4];
    } catch (e4) {
      e3 = true;
    }
    return n3;
  }, {}), e3 ? t4 : r4;
}
a3(qt, "convertUnconventionalData");
var ro = /* @__PURE__ */ a3(function(t4) {
  let e3, n3, o4, s5;
  return /* @__PURE__ */ a3(function(c3, i3) {
    try {
      if (c3 === "")
        return s5 = [], e3 = /* @__PURE__ */ new Map([[i3, "[]"]]), n3 = /* @__PURE__ */ new Map(), o4 = [], i3;
      let g2 = n3.get(this) || this;
      for (; o4.length && g2 !== o4[0]; )
        o4.shift(), s5.pop();
      if (typeof i3 == "boolean")
        return i3;
      if (i3 === void 0)
        return t4.allowUndefined ? "_undefined_" : void 0;
      if (i3 === null)
        return null;
      if (typeof i3 == "number")
        return i3 === -1 / 0 ? "_-Infinity_" : i3 === 1 / 0 ? "_Infinity_" : Number.isNaN(i3) ? "_NaN_" : i3;
      if (typeof i3 == "bigint")
        return `_bigint_${i3.toString()}`;
      if (typeof i3 == "string")
        return eo.test(i3) ? t4.allowDate ? `_date_${i3}` : void 0 : i3;
      if ((0, Ne.default)(i3))
        return t4.allowRegExp ? `_regexp_${i3.flags}|${i3.source}` : void 0;
      if ((0, je.default)(i3)) {
        if (!t4.allowFunction)
          return;
        let { name: u3 } = i3, y4 = i3.toString();
        return y4.match(
          /(\[native code\]|WEBPACK_IMPORTED_MODULE|__webpack_exports__|__webpack_require__)/
        ) ? `_function_${u3}|${(() => {
        }).toString()}` : `_function_${u3}|${Zn(to(c3, y4))}`;
      }
      if ((0, Le.default)(i3)) {
        if (!t4.allowSymbol)
          return;
        let u3 = Symbol.keyFor(i3);
        return u3 !== void 0 ? `_gsymbol_${u3}` : `_symbol_${i3.toString().slice(7, -1)}`;
      }
      if (o4.length >= t4.maxDepth)
        return Array.isArray(i3) ? `[Array(${i3.length})]` : "[Object]";
      if (i3 === this)
        return `_duplicate_${JSON.stringify(s5)}`;
      if (i3 instanceof Error && t4.allowError)
        return {
          __isConvertedError__: true,
          errorProperties: __spreadProps(__spreadValues(__spreadValues({}, i3.cause ? { cause: i3.cause } : {}), i3), {
            name: i3.name,
            message: i3.message,
            stack: i3.stack,
            "_constructor-name_": i3.constructor.name
          })
        };
      if (i3.constructor && i3.constructor.name && i3.constructor.name !== "Object" && !Array.isArray(i3) && !t4.allowClass)
        return;
      let p4 = e3.get(i3);
      if (!p4) {
        let u3 = Array.isArray(i3) ? i3 : qt(i3);
        if (i3.constructor && i3.constructor.name && i3.constructor.name !== "Object" && !Array.isArray(i3) && t4.allowClass)
          try {
            Object.assign(u3, { "_constructor-name_": i3.constructor.name });
          } catch (e4) {
          }
        return s5.push(c3), o4.unshift(u3), e3.set(i3, JSON.stringify(s5)), i3 !== u3 && n3.set(i3, u3), u3;
      }
      return `_duplicate_${p4}`;
    } catch (e4) {
      return;
    }
  }, "replace");
}, "replacer2");
var no = /* @__PURE__ */ a3(function reviver(options) {
  let refs = [], root;
  return /* @__PURE__ */ a3(function revive(key, value) {
    if (key === "" && (root = value, refs.forEach(({ target: r4, container: t4, replacement: e3 }) => {
      let n3 = J2(e3) ? JSON.parse(e3) : e3.split(".");
      n3.length === 0 ? t4[r4] = root : t4[r4] = Xn(root, n3);
    })), key === "_constructor-name_")
      return value;
    if (it(value) && value.__isConvertedError__) {
      let _a2 = value.errorProperties, { message: r4 } = _a2, t4 = __objRest(_a2, ["message"]), e3 = new Error(r4);
      return Object.assign(e3, t4), e3;
    }
    if (it(value) && value["_constructor-name_"] && options.allowFunction) {
      let r4 = value["_constructor-name_"];
      if (r4 !== "Object") {
        let t4 = new Function(`return function ${r4.replace(/[^a-zA-Z0-9$_]+/g, "")}(){}`)();
        Object.setPrototypeOf(value, new t4());
      }
      return delete value["_constructor-name_"], value;
    }
    if (typeof value == "string" && value.startsWith("_function_") && options.allowFunction) {
      let [, name, source] = value.match(/_function_([^|]*)\|(.*)/) || [], sourceSanitized = source.replace(/[(\(\))|\\| |\]|`]*$/, "");
      if (!options.lazyEval)
        return eval(`(${sourceSanitized})`);
      let result = /* @__PURE__ */ a3((...args) => {
        let f = eval(`(${sourceSanitized})`);
        return f(...args);
      }, "result");
      return Object.defineProperty(result, "toString", {
        value: /* @__PURE__ */ a3(() => sourceSanitized, "value")
      }), Object.defineProperty(result, "name", {
        value: name
      }), result;
    }
    if (typeof value == "string" && value.startsWith("_regexp_") && options.allowRegExp) {
      let [, r4, t4] = value.match(/_regexp_([^|]*)\|(.*)/) || [];
      return new RegExp(t4, r4);
    }
    return typeof value == "string" && value.startsWith("_date_") && options.allowDate ? new Date(value.replace("_date_", "")) : typeof value == "string" && value.startsWith("_duplicate_") ? (refs.push({ target: key, container: this, replacement: value.replace(/^_duplicate_/, "") }), null) : typeof value == "string" && value.startsWith("_symbol_") && options.allowSymbol ? Symbol(value.replace("_symbol_", "")) : typeof value == "string" && value.startsWith("_gsymbol_") && options.allowSymbol ? Symbol.for(value.replace("_gsymbol_", "")) : typeof value == "string" && value === "_-Infinity_" ? -1 / 0 : typeof value == "string" && value === "_Infinity_" ? 1 / 0 : typeof value == "string" && value === "_NaN_" ? NaN : typeof value == "string" && value.startsWith("_bigint_") && typeof BigInt == "function" ? BigInt(value.replace("_bigint_", "")) : value;
  }, "revive");
}, "reviver");
var Vt = {
  maxDepth: 10,
  space: void 0,
  allowFunction: true,
  allowRegExp: true,
  allowDate: true,
  allowClass: true,
  allowError: true,
  allowUndefined: true,
  allowSymbol: true,
  lazyEval: true
};
var lt = /* @__PURE__ */ a3((r4, t4 = {}) => {
  let e3 = __spreadValues(__spreadValues({}, Vt), t4);
  return JSON.stringify(qt(r4), ro(e3), t4.space);
}, "stringify");
var oo = /* @__PURE__ */ a3(() => {
  let r4 = /* @__PURE__ */ new Map();
  return /* @__PURE__ */ a3(function t4(e3) {
    it(e3) && Object.entries(e3).forEach(([n3, o4]) => {
      o4 === "_undefined_" ? e3[n3] = void 0 : r4.get(o4) || (r4.set(o4, true), t4(o4));
    }), Array.isArray(e3) && e3.forEach((n3, o4) => {
      n3 === "_undefined_" ? (r4.set(n3, true), e3[o4] = void 0) : r4.get(n3) || (r4.set(n3, true), t4(n3));
    });
  }, "mutateUndefined");
}, "mutator");
var ct = /* @__PURE__ */ a3((r4, t4 = {}) => {
  let e3 = __spreadValues(__spreadValues({}, Vt), t4), n3 = JSON.parse(r4, no(e3));
  return oo()(n3), n3;
}, "parse");
var io = false;
var St = "Invariant failed";
function K2(r4, t4) {
  if (!r4) {
    if (io)
      throw new Error(St);
    var e3 = typeof t4 == "function" ? t4() : t4, n3 = e3 ? "".concat(St, ": ").concat(e3) : St;
    throw new Error(n3);
  }
}
a3(K2, "invariant");
var Jt = /* @__PURE__ */ a3((r4) => {
  let t4 = Array.from(
    document.querySelectorAll("iframe[data-is-storybook]")
  ), [e3, ...n3] = t4.filter((s5) => {
    var _a2, _b;
    try {
      return ((_a2 = s5.contentWindow) == null ? void 0 : _a2.location.origin) === r4.source.location.origin && ((_b = s5.contentWindow) == null ? void 0 : _b.location.pathname) === r4.source.location.pathname;
    } catch (e4) {
    }
    try {
      return s5.contentWindow === r4.source;
    } catch (e4) {
    }
    let l2 = s5.getAttribute("src"), c3;
    try {
      if (!l2)
        return false;
      ({ origin: c3 } = new URL(l2, document.location.toString()));
    } catch (e4) {
      return false;
    }
    return c3 === r4.origin;
  }), o4 = e3 == null ? void 0 : e3.getAttribute("src");
  if (o4 && n3.length === 0) {
    let { protocol: s5, host: l2, pathname: c3 } = new URL(o4, document.location.toString());
    return `${s5}//${l2}${c3}`;
  }
  return n3.length > 0 && s.error("found multiple candidates for event source"), null;
}, "getEventSourceUrl");
var { document: _t, location: Tt } = S2;
var Xt = "storybook-channel";
var lo = { allowFunction: false, maxDepth: 25 };
var At = class At2 {
  constructor(t4) {
    this.config = t4;
    this.connected = false;
    if (this.buffer = [], typeof (S2 == null ? void 0 : S2.addEventListener) == "function" && S2.addEventListener("message", this.handleEvent.bind(this), false), t4.page !== "manager" && t4.page !== "preview")
      throw new Error(`postmsg-channel: "config.page" cannot be "${t4.page}"`);
  }
  setHandler(t4) {
    this.handler = (...e3) => {
      t4.apply(this, e3), !this.connected && this.getLocalFrame().length && (this.flush(), this.connected = true);
    };
  }
  /**
   * Sends `event` to the associated window. If the window does not yet exist the event will be
   * stored in a buffer and sent when the window exists.
   *
   * @param event
   */
  send(t4, e3) {
    let {
      target: n3,
      // telejson options
      allowRegExp: o4,
      allowFunction: s5,
      allowSymbol: l2,
      allowDate: c3,
      allowError: i3,
      allowUndefined: g2,
      allowClass: p4,
      maxDepth: u3,
      space: y4,
      lazyEval: v5
    } = e3 || {}, d2 = Object.fromEntries(
      Object.entries({
        allowRegExp: o4,
        allowFunction: s5,
        allowSymbol: l2,
        allowDate: c3,
        allowError: i3,
        allowUndefined: g2,
        allowClass: p4,
        maxDepth: u3,
        space: y4,
        lazyEval: v5
      }).filter(([R5, C5]) => typeof C5 < "u")
    ), m3 = __spreadValues(__spreadValues(__spreadValues({}, lo), S2.CHANNEL_OPTIONS || {}), d2), E3 = this.getFrames(n3), I7 = new URLSearchParams((Tt == null ? void 0 : Tt.search) || ""), T7 = lt(
      {
        key: Xt,
        event: t4,
        refId: I7.get("refId")
      },
      m3
    );
    return E3.length ? (this.buffer.length && this.flush(), E3.forEach((R5) => {
      try {
        R5.postMessage(T7, "*");
      } catch (e4) {
        s.error("sending over postmessage fail");
      }
    }), Promise.resolve(null)) : new Promise((R5, C5) => {
      this.buffer.push({ event: t4, resolve: R5, reject: C5 });
    });
  }
  flush() {
    let { buffer: t4 } = this;
    this.buffer = [], t4.forEach((e3) => {
      this.send(e3.event).then(e3.resolve).catch(e3.reject);
    });
  }
  getFrames(t4) {
    if (this.config.page === "manager") {
      let n3 = Array.from(
        _t.querySelectorAll("iframe[data-is-storybook][data-is-loaded]")
      ).flatMap((o4) => {
        try {
          return o4.contentWindow && o4.dataset.isStorybook !== void 0 && o4.id === t4 ? [o4.contentWindow] : [];
        } catch (e3) {
          return [];
        }
      });
      return (n3 == null ? void 0 : n3.length) ? n3 : this.getCurrentFrames();
    }
    return S2 && S2.parent && S2.parent !== S2.self ? [S2.parent] : [];
  }
  getCurrentFrames() {
    return this.config.page === "manager" ? Array.from(
      _t.querySelectorAll('[data-is-storybook="true"]')
    ).flatMap((e3) => e3.contentWindow ? [e3.contentWindow] : []) : S2 && S2.parent ? [S2.parent] : [];
  }
  getLocalFrame() {
    return this.config.page === "manager" ? Array.from(
      _t.querySelectorAll("#storybook-preview-iframe")
    ).flatMap((e3) => e3.contentWindow ? [e3.contentWindow] : []) : S2 && S2.parent ? [S2.parent] : [];
  }
  handleEvent(t4) {
    try {
      let { data: e3 } = t4, { key: n3, event: o4, refId: s5 } = typeof e3 == "string" && J2(e3) ? ct(e3, S2.CHANNEL_OPTIONS || {}) : e3;
      if (n3 === Xt) {
        let l2 = this.config.page === "manager" ? '<span style="color: #37D5D3; background: black"> manager </span>' : '<span style="color: #1EA7FD; background: black"> preview </span>', c3 = Object.values(core_events_exports).includes(o4.type) ? `<span style="color: #FF4785">${o4.type}</span>` : `<span style="color: #FFAE00">${o4.type}</span>`;
        if (s5 && (o4.refId = s5), o4.source = this.config.page === "preview" ? t4.origin : Jt(t4), !o4.source) {
          r.error(
            `${l2} received ${c3} but was unable to determine the source of the event`
          );
          return;
        }
        let i3 = `${l2} received ${c3} (${e3.length})`;
        r.debug(
          Tt.origin !== o4.source ? i3 : `${i3} <span style="color: gray">(on ${Tt.origin} from ${o4.source})</span>`,
          ...o4.args
        ), K2(this.handler, "ChannelHandler should be set"), this.handler(o4);
      }
    } catch (e3) {
      s.error(e3);
    }
  }
};
a3(At, "PostMessageTransport");
var Y2 = At;
var { WebSocket: co } = S2;
var Zt = 15e3;
var te = 5e3;
var wt = class wt2 {
  constructor({ url: t4, onError: e3, page: n3 }) {
    this.buffer = [];
    this.isReady = false;
    this.isClosed = false;
    this.pingTimeout = 0;
    this.socket = new co(t4), this.socket.onopen = () => {
      this.isReady = true, this.heartbeat(), this.flush();
    }, this.socket.onmessage = ({ data: o4 }) => {
      let s5 = typeof o4 == "string" && J2(o4) ? ct(o4) : o4;
      K2(this.handler, "WebsocketTransport handler should be set"), this.handler(s5), s5.type === "ping" && (this.heartbeat(), this.send({ type: "pong" }));
    }, this.socket.onerror = (o4) => {
      e3 && e3(o4);
    }, this.socket.onclose = (o4) => {
      K2(this.handler, "WebsocketTransport handler should be set"), this.handler({
        type: S,
        args: [{ reason: o4.reason, code: o4.code }],
        from: n3 || "preview"
      }), this.isClosed = true, clearTimeout(this.pingTimeout);
    };
  }
  heartbeat() {
    clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
      this.socket.close(3008, "timeout");
    }, Zt + te);
  }
  setHandler(t4) {
    this.handler = t4;
  }
  send(t4) {
    this.isClosed || (this.isReady ? this.sendNow(t4) : this.sendLater(t4));
  }
  sendLater(t4) {
    this.buffer.push(t4);
  }
  sendNow(t4) {
    let e3 = lt(t4, __spreadValues({
      maxDepth: 15,
      allowFunction: false
    }, S2.CHANNEL_OPTIONS));
    this.socket.send(e3);
  }
  flush() {
    let { buffer: t4 } = this;
    this.buffer = [], t4.forEach((e3) => this.send(e3));
  }
};
a3(wt, "WebsocketTransport");
var X2 = wt;
var { CONFIG_TYPE: po } = S2;
var Xo = B2;
function Qo({ page: r4, extraTransports: t4 = [] }) {
  let e3 = [new Y2({ page: r4 }), ...t4];
  if (po === "DEVELOPMENT") {
    let o4 = window.location.protocol === "http:" ? "ws" : "wss", { hostname: s5, port: l2 } = window.location, c3 = `${o4}://${s5}:${l2}/storybook-server-channel`;
    e3.push(new X2({ url: c3, onError: /* @__PURE__ */ a3(() => {
    }, "onError"), page: r4 }));
  }
  let n3 = new B2({ transports: e3 });
  return $2.__prepare(
    n3,
    r4 === "manager" ? $2.Environment.MANAGER : $2.Environment.PREVIEW
  ), n3;
}
a3(Qo, "createBrowserChannel");

// node_modules/@storybook/core/dist/preview-errors.js
var oe = Object.defineProperty;
var t3 = (u3, n3) => oe(u3, "name", { value: n3, configurable: true });
function r3(u3) {
  for (var n3 = [], e3 = 1; e3 < arguments.length; e3++)
    n3[e3 - 1] = arguments[e3];
  var a4 = Array.from(typeof u3 == "string" ? [u3] : u3);
  a4[a4.length - 1] = a4[a4.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var g2 = a4.reduce(function(i3, m3) {
    var y4 = m3.match(/\n([\t ]+|(?!\s).)/g);
    return y4 ? i3.concat(y4.map(function(E3) {
      var l2, d2;
      return (d2 = (l2 = E3.match(/[\t ]/g)) === null || l2 === void 0 ? void 0 : l2.length) !== null && d2 !== void 0 ? d2 : 0;
    })) : i3;
  }, []);
  if (g2.length) {
    var h5 = new RegExp(`
[	 ]{` + Math.min.apply(Math, g2) + "}", "g");
    a4 = a4.map(function(i3) {
      return i3.replace(h5, `
`);
    });
  }
  a4[0] = a4[0].replace(/^\r?\n/, "");
  var c3 = a4[0];
  return n3.forEach(function(i3, m3) {
    var y4 = c3.match(/(?:^|\n)( *)$/), E3 = y4 ? y4[1] : "", l2 = i3;
    typeof i3 == "string" && i3.includes(`
`) && (l2 = String(i3).split(`
`).map(function(d2, te5) {
      return te5 === 0 ? d2 : "" + E3 + d2;
    }).join(`
`)), c3 += l2 + a4[m3 + 1];
  }), c3;
}
t3(r3, "dedent");
function C2({
  code: u3,
  category: n3
}) {
  let e3 = String(u3).padStart(4, "0");
  return `SB_${n3}_${e3}`;
}
t3(C2, "parseErrorCode");
var p2 = class p3 extends Error {
  constructor(e3) {
    var _a2;
    super(p3.getFullMessage(e3));
    this.data = {};
    this.fromStorybook = true;
    this.category = e3.category, this.documentation = (_a2 = e3.documentation) != null ? _a2 : false, this.code = e3.code;
  }
  get fullErrorCode() {
    return C2({ code: this.code, category: this.category });
  }
  /** Overrides the default `Error.name` property in the format: SB_<CATEGORY>_<CODE>. */
  get name() {
    let e3 = this.constructor.name;
    return `${this.fullErrorCode} (${e3})`;
  }
  /** Generates the error message along with additional documentation link (if applicable). */
  static getFullMessage({
    documentation: e3,
    code: a4,
    category: g2,
    message: h5
  }) {
    let c3;
    return e3 === true ? c3 = `https://storybook.js.org/error/${C2({ code: a4, category: g2 })}` : typeof e3 == "string" ? c3 = e3 : Array.isArray(e3) && (c3 = `
${e3.map((i3) => `	- ${i3}`).join(`
`)}`), `${h5}${c3 != null ? `

More info: ${c3}
` : ""}`;
  }
};
t3(p2, "StorybookError");
var o2 = p2;
var f3 = class f4 extends o2 {
  constructor(e3) {
    super({
      category: "PREVIEW_API",
      code: 1,
      message: r3`
        Couldn't find story matching id '${e3.storyId}' after HMR.
        - Did you just rename a story?
        - Did you remove it from your CSF file?
        - Are you sure a story with the id '${e3.storyId}' exists?
        - Please check the values in the stories field of your main.js config and see if they would match your CSF File.
        - Also check the browser console and terminal for potential error messages.`
    });
    this.data = e3;
  }
};
t3(f3, "MissingStoryAfterHmrError");
var D2 = f3;
var R2 = class R3 extends o2 {
  constructor(e3) {
    super({
      category: "PREVIEW_API",
      code: 2,
      documentation: "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-for-example-in-the-play-function",
      message: r3`
        We detected that you use an implicit action arg while ${e3.phase} of your story.  
        ${e3.deprecated ? `
This is deprecated and won't work in Storybook 8 anymore.
` : ""}
        Please provide an explicit spy to your args like this:
          import { fn } from '@storybook/test';
          ... 
          args: {
           ${e3.name}: fn()
          }`
    });
    this.data = e3;
  }
};
t3(R2, "ImplicitActionsDuringRendering");
var b3 = class b4 extends o2 {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 3,
      message: r3`
        Cannot call \`storyStore.extract()\` without calling \`storyStore.cacheAllCsfFiles()\` first.

        You probably meant to call \`await preview.extract()\` which does the above for you.`
    });
  }
};
t3(b3, "CalledExtractOnStoreError");
var L3 = b3;
var I2 = class I3 extends o2 {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 4,
      message: r3`
        Expected your framework's preset to export a \`renderToCanvas\` field.

        Perhaps it needs to be upgraded for Storybook 7.0?`,
      documentation: "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#mainjs-framework-field"
    });
  }
};
t3(I2, "MissingRenderToCanvasError");
var G3 = I2;
var P3 = class P4 extends o2 {
  constructor(e3) {
    super({
      category: "PREVIEW_API",
      code: 5,
      message: r3`
        Called \`Preview.${e3.methodName}()\` before initialization.
        
        The preview needs to load the story index before most methods can be called. If you want
        to call \`${e3.methodName}\`, try \`await preview.initializationPromise;\` first.
        
        If you didn't call the above code, then likely it was called by an addon that needs to
        do the above.`
    });
    this.data = e3;
  }
};
t3(P3, "CalledPreviewMethodBeforeInitializationError");
var Y3 = P3;
var x3 = class x4 extends o2 {
  constructor(e3) {
    super({
      category: "PREVIEW_API",
      code: 6,
      message: r3`
        Error fetching \`/index.json\`:
        
        ${e3.text}

        If you are in development, this likely indicates a problem with your Storybook process,
        check the terminal for errors.

        If you are in a deployed Storybook, there may have been an issue deploying the full Storybook
        build.`
    });
    this.data = e3;
  }
};
t3(x3, "StoryIndexFetchError");
var M2 = x3;
var T2 = class T3 extends o2 {
  constructor(e3) {
    super({
      category: "PREVIEW_API",
      code: 7,
      message: r3`
        Tried to render docs entry ${e3.storyId} but it is a MDX file that has no CSF
        references, or autodocs for a CSF file that some doesn't refer to itself.
        
        This likely is an internal error in Storybook's indexing, or you've attached the
        \`attached-mdx\` tag to an MDX file that is not attached.`
    });
    this.data = e3;
  }
};
t3(T2, "MdxFileWithNoCsfReferencesError");
var H3 = T2;
var w2 = class w3 extends o2 {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 8,
      message: r3`
        Couldn't find any stories in your Storybook.

        - Please check your stories field of your main.js config: does it match correctly?
        - Also check the browser console and terminal for error messages.`
    });
  }
};
t3(w2, "EmptyIndexError");
var F3 = w2;
var k3 = class k4 extends o2 {
  constructor(e3) {
    super({
      category: "PREVIEW_API",
      code: 9,
      message: r3`
        Couldn't find story matching '${e3.storySpecifier}'.

        - Are you sure a story with that id exists?
        - Please check your stories field of your main.js config.
        - Also check the browser console and terminal for error messages.`
    });
    this.data = e3;
  }
};
t3(k3, "NoStoryMatchError");
var K3 = k3;
var S3 = class S4 extends o2 {
  constructor(e3) {
    super({
      category: "PREVIEW_API",
      code: 10,
      message: r3`
        Couldn't find story matching id '${e3.storyId}' after importing a CSF file.

        The file was indexed as if the story was there, but then after importing the file in the browser
        we didn't find the story. Possible reasons:
        - You are using a custom story indexer that is misbehaving.
        - You have a custom file loader that is removing or renaming exports.

        Please check your browser console and terminal for errors that may explain the issue.`
    });
    this.data = e3;
  }
};
t3(S3, "MissingStoryFromCsfFileError");
var X3 = S3;
var v2 = class v3 extends o2 {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 11,
      message: r3`
        Cannot access the Story Store until the index is ready.

        It is not recommended to use methods directly on the Story Store anyway, in Storybook 9 we will
        remove access to the store entirely`
    });
  }
};
t3(v2, "StoryStoreAccessedBeforeInitializationError");
var U3 = v2;
var _2 = class _3 extends o2 {
  constructor(e3) {
    super({
      category: "PREVIEW_API",
      code: 12,
      message: r3`
      Incorrect use of mount in the play function.
      
      To use mount in the play function, you must satisfy the following two requirements: 
      
      1. You *must* destructure the mount property from the \`context\` (the argument passed to your play function). 
         This makes sure that Storybook does not start rendering the story before the play function begins.
      
      2. Your Storybook framework or builder must be configured to transpile to ES2017 or newer. 
         This is because destructuring statements and async/await usages are otherwise transpiled away, 
         which prevents Storybook from recognizing your usage of \`mount\`.
      
      Note that Angular is not supported. As async/await is transpiled to support the zone.js polyfill. 
      
      More info: https://storybook.js.org/docs/writing-tests/interaction-testing#run-code-before-the-component-gets-rendered
      
      Received the following play function:
      ${e3.playFunction}`
    });
    this.data = e3;
  }
};
t3(_2, "MountMustBeDestructuredError");
var J3 = _2;
var V3 = class V4 extends o2 {
  constructor(e3) {
    super({
      category: "PREVIEW_API",
      code: 14,
      message: r3`
        No render function available for storyId '${e3.id}'
      `
    });
    this.data = e3;
  }
};
t3(V3, "NoRenderFunctionError");
var q3 = V3;
var N2 = class N3 extends o2 {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 15,
      message: r3`
        No component is mounted in your story.
        
        This usually occurs when you destructure mount in the play function, but forget to call it.
        
        For example:

        async play({ mount, canvasElement }) {
          // 👈 mount should be called: await mount(); 
          const canvas = within(canvasElement);
          const button = await canvas.findByRole('button');
          await userEvent.click(button);
        };

        Make sure to either remove it or call mount in your play function.
      `
    });
  }
};
t3(N2, "NoStoryMountedError");
var z2 = N2;
var A2 = class A3 extends o2 {
  constructor() {
    super({
      category: "FRAMEWORK_NEXTJS",
      code: 1,
      documentation: "https://storybook.js.org/docs/get-started/nextjs#faq",
      message: r3`
      You are importing avif images, but you don't have sharp installed.

      You have to install sharp in order to use image optimization features in Next.js.
      `
    });
  }
};
t3(A2, "NextJsSharpError");
var W3 = class W4 extends o2 {
  constructor(e3) {
    super({
      category: "FRAMEWORK_NEXTJS",
      code: 2,
      message: r3`
        Tried to access router mocks from "${e3.importType}" but they were not created yet. You might be running code in an unsupported environment.
      `
    });
    this.data = e3;
  }
};
t3(W3, "NextjsRouterMocksNotAvailable");
var $3 = class $4 extends o2 {
  constructor(e3) {
    super({
      category: "DOCS-TOOLS",
      code: 1,
      documentation: "https://github.com/storybookjs/storybook/issues/26606",
      message: r3`
        There was a failure when generating detailed ArgTypes in ${e3.language} for:
        ${JSON.stringify(e3.type, null, 2)} 
        
        Storybook will fall back to use a generic type description instead.

        This type is either not supported or it is a bug in the docgen generation in Storybook.
        If you think this is a bug, please detail it as much as possible in the Github issue.
      `
    });
    this.data = e3;
  }
};
t3($3, "UnknownArgTypesError");
var O2 = class O3 extends o2 {
  constructor(e3) {
    super({
      category: "ADDON_VITEST",
      code: 1,
      // TODO: Add documentation about viewports support
      // documentation: '',
      message: r3`
        Encountered an unsupported value "${e3.value}" when setting the viewport ${e3.dimension} dimension.
        
        The Storybook plugin only supports values in the following units:
        - px, vh, vw, em, rem and %.
        
        You can either change the viewport for this story to use one of the supported units or skip the test by adding '!test' to the story's tags per https://storybook.js.org/docs/writing-stories/tags
      `
    });
    this.data = e3;
  }
};
t3(O2, "UnsupportedViewportDimensionError");

// node_modules/@storybook/core/dist/csf/index.js
var b5 = Object.create;
var f5 = Object.defineProperty;
var v4 = Object.getOwnPropertyDescriptor;
var P5 = Object.getOwnPropertyNames;
var O4 = Object.getPrototypeOf;
var _4 = Object.prototype.hasOwnProperty;
var s3 = (e3, r4) => f5(e3, "name", { value: r4, configurable: true });
var $5 = (e3, r4) => () => (r4 || e3((r4 = { exports: {} }).exports, r4), r4.exports);
var j2 = (e3, r4, t4, n3) => {
  if (r4 && typeof r4 == "object" || typeof r4 == "function")
    for (let a4 of P5(r4))
      !_4.call(e3, a4) && a4 !== t4 && f5(e3, a4, { get: () => r4[a4], enumerable: !(n3 = v4(r4, a4)) || n3.enumerable });
  return e3;
};
var C3 = (e3, r4, t4) => (t4 = e3 != null ? b5(O4(e3)) : {}, j2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  r4 || !e3 || !e3.__esModule ? f5(t4, "default", { value: e3, enumerable: true }) : t4,
  e3
));
var T4 = $5((g2) => {
  Object.defineProperty(g2, "__esModule", { value: true }), g2.isEqual = /* @__PURE__ */ function() {
    var e3 = Object.prototype.toString, r4 = Object.getPrototypeOf, t4 = Object.getOwnPropertySymbols ? function(n3) {
      return Object.keys(n3).concat(Object.getOwnPropertySymbols(n3));
    } : Object.keys;
    return function(n3, a4) {
      return (/* @__PURE__ */ s3(function d2(o4, i3, p4) {
        var c3, u3, l2, m3 = e3.call(o4), h5 = e3.call(i3);
        if (o4 === i3) return true;
        if (o4 == null || i3 == null) return false;
        if (p4.indexOf(o4) > -1 && p4.indexOf(i3) > -1) return true;
        if (p4.push(o4, i3), m3 != h5 || (c3 = t4(o4), u3 = t4(i3), c3.length != u3.length || c3.some(function(A4) {
          return !d2(o4[A4], i3[A4], p4);
        }))) return false;
        switch (m3.slice(8, -1)) {
          case "Symbol":
            return o4.valueOf() == i3.valueOf();
          case "Date":
          case "Number":
            return +o4 == +i3 || +o4 != +o4 && +i3 != +i3;
          case "RegExp":
          case "Function":
          case "String":
          case "Boolean":
            return "" + o4 == "" + i3;
          case "Set":
          case "Map":
            c3 = o4.entries(), u3 = i3.entries();
            do
              if (!d2((l2 = c3.next()).value, u3.next().value, p4)) return false;
            while (!l2.done);
            return true;
          case "ArrayBuffer":
            o4 = new Uint8Array(o4), i3 = new Uint8Array(i3);
          case "DataView":
            o4 = new Uint8Array(o4.buffer), i3 = new Uint8Array(i3.buffer);
          case "Float32Array":
          case "Float64Array":
          case "Int8Array":
          case "Int16Array":
          case "Int32Array":
          case "Uint8Array":
          case "Uint16Array":
          case "Uint32Array":
          case "Uint8ClampedArray":
          case "Arguments":
          case "Array":
            if (o4.length != i3.length) return false;
            for (l2 = 0; l2 < o4.length; l2++) if ((l2 in o4 || l2 in i3) && (l2 in o4 != l2 in i3 || !d2(o4[l2], i3[l2], p4))) return false;
            return true;
          case "Object":
            return d2(r4(o4), r4(i3), p4);
          default:
            return false;
        }
      }, "n"))(n3, a4, []);
    };
  }();
});
function R4(e3) {
  return e3.replace(/_/g, " ").replace(/-/g, " ").replace(/\./g, " ").replace(/([^\n])([A-Z])([a-z])/g, (r4, t4, n3, a4) => `${t4} ${n3}${a4}`).replace(
    /([a-z])([A-Z])/g,
    (r4, t4, n3) => `${t4} ${n3}`
  ).replace(/([a-z])([0-9])/gi, (r4, t4, n3) => `${t4} ${n3}`).replace(/([0-9])([a-z])/gi, (r4, t4, n3) => `${t4} ${n3}`).replace(/(\s|^)(\w)/g, (r4, t4, n3) => `${t4}${n3.toUpperCase()}`).replace(/ +/g, " ").trim();
}
s3(R4, "toStartCaseStr");
var y3 = C3(T4(), 1);
var x5 = /* @__PURE__ */ s3((e3) => e3.map((r4) => typeof r4 < "u").filter(Boolean).length, "count");
var E = /* @__PURE__ */ s3((e3, r4) => {
  let { exists: t4, eq: n3, neq: a4, truthy: d2 } = e3;
  if (x5([t4, n3, a4, d2]) > 1)
    throw new Error(`Invalid conditional test ${JSON.stringify({ exists: t4, eq: n3, neq: a4 })}`);
  if (typeof n3 < "u")
    return (0, y3.isEqual)(r4, n3);
  if (typeof a4 < "u")
    return !(0, y3.isEqual)(r4, a4);
  if (typeof t4 < "u") {
    let i3 = typeof r4 < "u";
    return t4 ? i3 : !i3;
  }
  return (typeof d2 > "u" ? true : d2) ? !!r4 : !r4;
}, "testValue");
var z3 = /* @__PURE__ */ s3((e3, r4, t4) => {
  if (!e3.if)
    return true;
  let { arg: n3, global: a4 } = e3.if;
  if (x5([n3, a4]) !== 1)
    throw new Error(`Invalid conditional value ${JSON.stringify({ arg: n3, global: a4 })}`);
  let d2 = n3 ? r4[n3] : t4[a4];
  return E(e3.if, d2);
}, "includeConditionalArg");
function L4(e3) {
  let r4, t4 = {
    _tag: "Preview",
    input: e3,
    get composed() {
      if (r4)
        return r4;
      let _a2 = e3, { addons: n3 } = _a2, a4 = __objRest(_a2, ["addons"]);
      return r4 = be2(Ee2([...n3 != null ? n3 : [], a4])), r4;
    },
    meta(n3) {
      return I4(n3, this);
    }
  };
  return globalThis.globalProjectAnnotations = t4.composed, t4;
}
s3(L4, "__definePreview");
function W5(e3) {
  return e3 != null && typeof e3 == "object" && "_tag" in e3 && (e3 == null ? void 0 : e3._tag) === "Preview";
}
s3(W5, "isPreview");
function H4(e3) {
  return e3 != null && typeof e3 == "object" && "_tag" in e3 && (e3 == null ? void 0 : e3._tag) === "Meta";
}
s3(H4, "isMeta");
function I4(e3, r4) {
  return {
    _tag: "Meta",
    input: e3,
    preview: r4,
    get composed() {
      throw new Error("Not implemented");
    },
    story(t4) {
      return U4(t4, this);
    }
  };
}
s3(I4, "defineMeta");
function U4(e3, r4) {
  return {
    _tag: "Story",
    input: e3,
    meta: r4,
    get composed() {
      throw new Error("Not implemented");
    }
  };
}
s3(U4, "defineStory");
function K4(e3) {
  return e3 != null && typeof e3 == "object" && "_tag" in e3 && (e3 == null ? void 0 : e3._tag) === "Story";
}
s3(K4, "isStory");
var D3 = /* @__PURE__ */ s3((e3) => e3.toLowerCase().replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-").replace(
  /-+/g,
  "-"
).replace(/^-+/, "").replace(/-+$/, ""), "sanitize");
var w4 = /* @__PURE__ */ s3((e3, r4) => {
  let t4 = D3(e3);
  if (t4 === "")
    throw new Error(`Invalid ${r4} '${e3}', must include alphanumeric characters`);
  return t4;
}, "sanitizeSafe");
var ee = /* @__PURE__ */ s3((e3, r4) => `${w4(e3, "kind")}${r4 ? `--${w4(r4, "name")}` : ""}`, "toId");
var re = /* @__PURE__ */ s3((e3) => R4(
  e3
), "storyNameFromExport");
function S5(e3, r4) {
  return Array.isArray(r4) ? r4.includes(e3) : e3.match(r4);
}
s3(S5, "matches");
function te2(e3, { includeStories: r4, excludeStories: t4 }) {
  return (
    // https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs
    e3 !== "__esModule" && (!r4 || S5(e3, r4)) && (!t4 || !S5(e3, t4))
  );
}
s3(te2, "isExportStory");
var oe2 = /* @__PURE__ */ s3((...e3) => {
  let r4 = e3.reduce((t4, n3) => (n3.startsWith("!") ? t4.delete(n3.slice(1)) : t4.add(n3), t4), /* @__PURE__ */ new Set());
  return Array.from(r4);
}, "combineTags");

// node_modules/@storybook/core/dist/preview-api/index.js
var zn2 = Object.create;
var br2 = Object.defineProperty;
var Vn2 = Object.getOwnPropertyDescriptor;
var Hn2 = Object.getOwnPropertyNames;
var Wn2 = Object.getPrototypeOf;
var $n2 = Object.prototype.hasOwnProperty;
var s4 = (r4, e3) => br2(r4, "name", { value: e3, configurable: true });
var Fe2 = /* @__PURE__ */ ((r4) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(r4, {
  get: (e3, t4) => (typeof __require < "u" ? __require : e3)[t4]
}) : r4)(function(r4) {
  if (typeof __require < "u") return __require.apply(this, arguments);
  throw Error('Dynamic require of "' + r4 + '" is not supported');
});
var k5 = (r4, e3) => () => (e3 || r4((e3 = { exports: {} }).exports, e3), e3.exports);
var Yn2 = (r4, e3, t4, o4) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function")
    for (let n3 of Hn2(e3))
      !$n2.call(r4, n3) && n3 !== t4 && br2(r4, n3, { get: () => e3[n3], enumerable: !(o4 = Vn2(e3, n3)) || o4.enumerable });
  return r4;
};
var he2 = (r4, e3, t4) => (t4 = r4 != null ? zn2(Wn2(r4)) : {}, Yn2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e3 || !r4 || !r4.__esModule ? br2(t4, "default", { value: r4, enumerable: true }) : t4,
  r4
));
var _r2 = k5((io2, Mr3) => {
  (function(r4) {
    if (typeof io2 == "object" && typeof Mr3 < "u")
      Mr3.exports = r4();
    else if (typeof define == "function" && define.amd)
      define([], r4);
    else {
      var e3;
      typeof window < "u" ? e3 = window : typeof global < "u" ? e3 = global : typeof self < "u" ? e3 = self : e3 = this, e3.memoizerific = r4();
    }
  })(function() {
    var r4, e3, t4;
    return (/* @__PURE__ */ s4(function o4(n3, i3, a4) {
      function l2(p4, u3) {
        if (!i3[p4]) {
          if (!n3[p4]) {
            var y4 = typeof Fe2 == "function" && Fe2;
            if (!u3 && y4) return y4(p4, true);
            if (c3) return c3(p4, true);
            var m3 = new Error("Cannot find module '" + p4 + "'");
            throw m3.code = "MODULE_NOT_FOUND", m3;
          }
          var g2 = i3[p4] = { exports: {} };
          n3[p4][0].call(g2.exports, function(S6) {
            var h5 = n3[p4][1][S6];
            return l2(h5 || S6);
          }, g2, g2.exports, o4, n3, i3, a4);
        }
        return i3[p4].exports;
      }
      s4(l2, "s");
      for (var c3 = typeof Fe2 == "function" && Fe2, d2 = 0; d2 < a4.length; d2++) l2(a4[d2]);
      return l2;
    }, "e"))({ 1: [function(o4, n3, i3) {
      n3.exports = function(a4) {
        if (typeof Map != "function" || a4) {
          var l2 = o4("./similar");
          return new l2();
        } else
          return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(o4, n3, i3) {
      function a4() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      s4(a4, "Similar"), a4.prototype.get = function(l2) {
        var c3;
        if (this.lastItem && this.isEqual(this.lastItem.key, l2))
          return this.lastItem.val;
        if (c3 = this.indexOf(l2), c3 >= 0)
          return this.lastItem = this.list[c3], this.list[c3].val;
      }, a4.prototype.set = function(l2, c3) {
        var d2;
        return this.lastItem && this.isEqual(this.lastItem.key, l2) ? (this.lastItem.val = c3, this) : (d2 = this.indexOf(l2), d2 >= 0 ? (this.lastItem = this.list[d2], this.list[d2].val = c3, this) : (this.lastItem = { key: l2, val: c3 }, this.list.push(this.lastItem), this.size++, this));
      }, a4.prototype.delete = function(l2) {
        var c3;
        if (this.lastItem && this.isEqual(this.lastItem.key, l2) && (this.lastItem = void 0), c3 = this.indexOf(l2), c3 >= 0)
          return this.size--, this.list.splice(c3, 1)[0];
      }, a4.prototype.has = function(l2) {
        var c3;
        return this.lastItem && this.isEqual(this.lastItem.key, l2) ? true : (c3 = this.indexOf(l2), c3 >= 0 ? (this.lastItem = this.list[c3], true) : false);
      }, a4.prototype.forEach = function(l2, c3) {
        var d2;
        for (d2 = 0; d2 < this.size; d2++)
          l2.call(c3 || this, this.list[d2].val, this.list[d2].key, this);
      }, a4.prototype.indexOf = function(l2) {
        var c3;
        for (c3 = 0; c3 < this.size; c3++)
          if (this.isEqual(this.list[c3].key, l2))
            return c3;
        return -1;
      }, a4.prototype.isEqual = function(l2, c3) {
        return l2 === c3 || l2 !== l2 && c3 !== c3;
      }, n3.exports = a4;
    }, {}], 3: [function(o4, n3, i3) {
      var a4 = o4("map-or-similar");
      n3.exports = function(p4) {
        var u3 = new a4(false), y4 = [];
        return function(m3) {
          var g2 = /* @__PURE__ */ s4(function() {
            var S6 = u3, h5, E3, R5 = arguments.length - 1, f6 = Array(R5 + 1), b6 = true, x6;
            if ((g2.numArgs || g2.numArgs === 0) && g2.numArgs !== R5 + 1)
              throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (x6 = 0; x6 < R5; x6++) {
              if (f6[x6] = {
                cacheItem: S6,
                arg: arguments[x6]
              }, S6.has(arguments[x6])) {
                S6 = S6.get(arguments[x6]);
                continue;
              }
              b6 = false, h5 = new a4(false), S6.set(arguments[x6], h5), S6 = h5;
            }
            return b6 && (S6.has(arguments[R5]) ? E3 = S6.get(arguments[R5]) : b6 = false), b6 || (E3 = m3.apply(null, arguments), S6.set(arguments[R5], E3)), p4 > 0 && (f6[R5] = {
              cacheItem: S6,
              arg: arguments[R5]
            }, b6 ? l2(y4, f6) : y4.push(f6), y4.length > p4 && c3(y4.shift())), g2.wasMemoized = b6, g2.numArgs = R5 + 1, E3;
          }, "memoizerific");
          return g2.limit = p4, g2.wasMemoized = false, g2.cache = u3, g2.lru = y4, g2;
        };
      };
      function l2(p4, u3) {
        var y4 = p4.length, m3 = u3.length, g2, S6, h5;
        for (S6 = 0; S6 < y4; S6++) {
          for (g2 = true, h5 = 0; h5 < m3; h5++)
            if (!d2(p4[S6][h5].arg, u3[h5].arg)) {
              g2 = false;
              break;
            }
          if (g2)
            break;
        }
        p4.push(p4.splice(S6, 1)[0]);
      }
      s4(l2, "moveToMostRecentLru");
      function c3(p4) {
        var u3 = p4.length, y4 = p4[u3 - 1], m3, g2;
        for (y4.cacheItem.delete(y4.arg), g2 = u3 - 2; g2 >= 0 && (y4 = p4[g2], m3 = y4.cacheItem.get(y4.arg), !m3 || !m3.size); g2--)
          y4.cacheItem.delete(y4.arg);
      }
      s4(c3, "removeCachedResult");
      function d2(p4, u3) {
        return p4 === u3 || p4 !== p4 && u3 !== u3;
      }
      s4(d2, "isEqual");
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
});
var dt2 = k5((ct3) => {
  "use strict";
  Object.defineProperty(ct3, "__esModule", { value: true });
  ct3.encodeString = ta;
  var H6 = Array.from({ length: 256 }, (r4, e3) => "%" + ((e3 < 16 ? "0" : "") + e3.toString(16)).toUpperCase()), ra = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
  ]);
  function ta(r4) {
    let e3 = r4.length;
    if (e3 === 0)
      return "";
    let t4 = "", o4 = 0, n3 = 0;
    e: for (; n3 < e3; n3++) {
      let i3 = r4.charCodeAt(n3);
      for (; i3 < 128; ) {
        if (ra[i3] !== 1 && (o4 < n3 && (t4 += r4.slice(o4, n3)), o4 = n3 + 1, t4 += H6[i3]), ++n3 === e3)
          break e;
        i3 = r4.charCodeAt(n3);
      }
      if (o4 < n3 && (t4 += r4.slice(o4, n3)), i3 < 2048) {
        o4 = n3 + 1, t4 += H6[192 | i3 >> 6] + H6[128 | i3 & 63];
        continue;
      }
      if (i3 < 55296 || i3 >= 57344) {
        o4 = n3 + 1, t4 += H6[224 | i3 >> 12] + H6[128 | i3 >> 6 & 63] + H6[128 | i3 & 63];
        continue;
      }
      if (++n3, n3 >= e3)
        throw new Error("URI malformed");
      let a4 = r4.charCodeAt(n3) & 1023;
      o4 = n3 + 1, i3 = 65536 + ((i3 & 1023) << 10 | a4), t4 += H6[240 | i3 >> 18] + H6[128 | i3 >> 12 & 63] + H6[128 | i3 >> 6 & 63] + H6[128 | i3 & 63];
    }
    return o4 === 0 ? r4 : o4 < e3 ? t4 + r4.slice(o4) : t4;
  }
  s4(ta, "encodeString");
});
var sr2 = k5((W7) => {
  "use strict";
  Object.defineProperty(W7, "__esModule", { value: true });
  W7.defaultOptions = W7.defaultShouldSerializeObject = W7.defaultValueSerializer = void 0;
  var pt2 = dt2(), oa = /* @__PURE__ */ s4((r4) => {
    switch (typeof r4) {
      case "string":
        return (0, pt2.encodeString)(r4);
      case "bigint":
      case "boolean":
        return "" + r4;
      case "number":
        if (Number.isFinite(r4))
          return r4 < 1e21 ? "" + r4 : (0, pt2.encodeString)("" + r4);
        break;
    }
    return r4 instanceof Date ? (0, pt2.encodeString)(r4.toISOString()) : "";
  }, "defaultValueSerializer");
  W7.defaultValueSerializer = oa;
  var na2 = /* @__PURE__ */ s4((r4) => r4 instanceof Date, "defaultShouldSerializeObject");
  W7.defaultShouldSerializeObject = na2;
  var Bo = /* @__PURE__ */ s4((r4) => r4, "identityFunc");
  W7.defaultOptions = {
    nesting: true,
    nestingSyntax: "dot",
    arrayRepeat: false,
    arrayRepeatSyntax: "repeat",
    delimiter: 38,
    valueDeserializer: Bo,
    valueSerializer: W7.defaultValueSerializer,
    keyDeserializer: Bo,
    shouldSerializeObject: W7.defaultShouldSerializeObject
  };
});
var ut2 = k5((ir3) => {
  "use strict";
  Object.defineProperty(ir3, "__esModule", { value: true });
  ir3.getDeepObject = aa;
  ir3.stringifyObject = zo;
  var de3 = sr2(), sa2 = dt2();
  function ia2(r4) {
    return r4 === "__proto__" || r4 === "constructor" || r4 === "prototype";
  }
  s4(ia2, "isPrototypeKey");
  function aa(r4, e3, t4, o4, n3) {
    if (ia2(e3))
      return r4;
    let i3 = r4[e3];
    return typeof i3 == "object" && i3 !== null ? i3 : !o4 && (n3 || typeof t4 == "number" || typeof t4 == "string" && t4 * 0 === 0 && t4.indexOf(".") === -1) ? r4[e3] = [] : r4[e3] = {};
  }
  s4(aa, "getDeepObject");
  var la2 = 20, ca2 = "[]", da2 = "[", pa2 = "]", ua2 = ".";
  function zo(r4, e3, t4 = 0, o4, n3) {
    let { nestingSyntax: i3 = de3.defaultOptions.nestingSyntax, arrayRepeat: a4 = de3.defaultOptions.arrayRepeat, arrayRepeatSyntax: l2 = de3.defaultOptions.arrayRepeatSyntax, nesting: c3 = de3.defaultOptions.nesting, delimiter: d2 = de3.defaultOptions.delimiter, valueSerializer: p4 = de3.defaultOptions.valueSerializer, shouldSerializeObject: u3 = de3.defaultOptions.shouldSerializeObject } = e3, y4 = typeof d2 == "number" ? String.fromCharCode(
      d2
    ) : d2, m3 = n3 === true && a4, g2 = i3 === "dot" || i3 === "js" && !n3;
    if (t4 > la2)
      return "";
    let S6 = "", h5 = true, E3 = false;
    for (let R5 in r4) {
      let f6 = r4[R5], b6;
      o4 ? (b6 = o4, m3 ? l2 === "bracket" && (b6 += ca2) : g2 ? (b6 += ua2, b6 += R5) : (b6 += da2, b6 += R5, b6 += pa2)) : b6 = R5, h5 || (S6 += y4), typeof f6 == "object" && f6 !== null && !u3(f6) ? (E3 = f6.pop !== void 0, (c3 || a4 && E3) && (S6 += zo(f6, e3, t4 + 1, b6, E3))) : (S6 += (0, sa2.encodeString)(b6), S6 += "=", S6 += p4(f6, R5)), h5 && (h5 = false);
    }
    return S6;
  }
  s4(zo, "stringifyObject");
});
var $o = k5((df, Wo) => {
  "use strict";
  var Vo = 12, fa2 = 0, ft2 = [
    // The first part of the table maps bytes to character to a transition.
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    4,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    7,
    7,
    10,
    9,
    9,
    9,
    11,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    // The second part of the table maps a state to a new state when adding a
    // transition.
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    12,
    0,
    0,
    0,
    0,
    24,
    36,
    48,
    60,
    72,
    84,
    96,
    0,
    12,
    12,
    12,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    // The third part maps the current transition to a mask that needs to apply
    // to the byte.
    127,
    63,
    63,
    63,
    0,
    31,
    15,
    15,
    15,
    7,
    7,
    7
  ];
  function ya2(r4) {
    var e3 = r4.indexOf("%");
    if (e3 === -1) return r4;
    for (var t4 = r4.length, o4 = "", n3 = 0, i3 = 0, a4 = e3, l2 = Vo; e3 > -1 && e3 < t4; ) {
      var c3 = Ho(r4[e3 + 1], 4), d2 = Ho(r4[e3 + 2], 0), p4 = c3 | d2, u3 = ft2[p4];
      if (l2 = ft2[256 + l2 + u3], i3 = i3 << 6 | p4 & ft2[364 + u3], l2 === Vo)
        o4 += r4.slice(n3, a4), o4 += i3 <= 65535 ? String.fromCharCode(i3) : String.fromCharCode(
          55232 + (i3 >> 10),
          56320 + (i3 & 1023)
        ), i3 = 0, n3 = e3 + 3, e3 = a4 = r4.indexOf("%", n3);
      else {
        if (l2 === fa2)
          return null;
        if (e3 += 3, e3 < t4 && r4.charCodeAt(e3) === 37) continue;
        return null;
      }
    }
    return o4 + r4.slice(n3);
  }
  s4(ya2, "decodeURIComponent");
  var ha2 = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    A: 10,
    b: 11,
    B: 11,
    c: 12,
    C: 12,
    d: 13,
    D: 13,
    e: 14,
    E: 14,
    f: 15,
    F: 15
  };
  function Ho(r4, e3) {
    var t4 = ha2[r4];
    return t4 === void 0 ? 255 : t4 << e3;
  }
  s4(Ho, "hexCodeToInt");
  Wo.exports = ya2;
});
var Jo = k5((X5) => {
  "use strict";
  var ma2 = X5 && X5.__importDefault || function(r4) {
    return r4 && r4.__esModule ? r4 : { default: r4 };
  };
  Object.defineProperty(X5, "__esModule", { value: true });
  X5.numberValueDeserializer = X5.numberKeyDeserializer = void 0;
  X5.parse = ba2;
  var ar3 = ut2(), pe3 = sr2(), Yo = ma2($o()), ga2 = /* @__PURE__ */ s4((r4) => {
    let e3 = Number(r4);
    return Number.isNaN(e3) ? r4 : e3;
  }, "numberKeyDeserializer");
  X5.numberKeyDeserializer = ga2;
  var Sa2 = /* @__PURE__ */ s4((r4) => {
    let e3 = Number(r4);
    return Number.isNaN(e3) ? r4 : e3;
  }, "numberValueDeserializer");
  X5.numberValueDeserializer = Sa2;
  var Ko = /\+/g, Xo2 = /* @__PURE__ */ s4(function() {
  }, "Empty");
  Xo2.prototype = /* @__PURE__ */ Object.create(null);
  function lr2(r4, e3, t4, o4, n3) {
    let i3 = r4.substring(e3, t4);
    return o4 && (i3 = i3.replace(Ko, " ")), n3 && (i3 = (0, Yo.default)(i3) || i3), i3;
  }
  s4(lr2, "computeKeySlice");
  function ba2(r4, e3) {
    let { valueDeserializer: t4 = pe3.defaultOptions.valueDeserializer, keyDeserializer: o4 = pe3.defaultOptions.keyDeserializer, arrayRepeatSyntax: n3 = pe3.defaultOptions.arrayRepeatSyntax, nesting: i3 = pe3.defaultOptions.nesting, arrayRepeat: a4 = pe3.defaultOptions.arrayRepeat, nestingSyntax: l2 = pe3.defaultOptions.nestingSyntax, delimiter: c3 = pe3.defaultOptions.delimiter } = e3 != null ? e3 : {}, d2 = typeof c3 == "string" ? c3.charCodeAt(0) : c3, p4 = l2 === "js", u3 = new Xo2();
    if (typeof r4 != "string")
      return u3;
    let y4 = r4.length, m3 = "", g2 = -1, S6 = -1, h5 = -1, E3 = u3, R5, f6 = "", b6 = "", x6 = false, w5 = false, A4 = false, O5 = false, N5 = false, U6 = false, ye3 = false, C5 = 0, z5 = -1, Ce3 = -1, Pt3 = -1;
    for (let D5 = 0; D5 < y4 + 1; D5++) {
      if (C5 = D5 !== y4 ? r4.charCodeAt(D5) : d2, C5 === d2) {
        if (ye3 = S6 > g2, ye3 || (S6 = D5), h5 !== S6 - 1 && (b6 = lr2(r4, h5 + 1, z5 > -1 ? z5 : S6, A4, x6), f6 = o4(b6), R5 !== void 0 && (E3 = (0, ar3.getDeepObject)(
          E3,
          R5,
          f6,
          p4 && N5,
          p4 && U6
        ))), ye3 || f6 !== "") {
          ye3 && (m3 = r4.slice(S6 + 1, D5), O5 && (m3 = m3.replace(Ko, " ")), w5 && (m3 = (0, Yo.default)(m3) || m3));
          let Pe2 = t4(m3, f6);
          if (a4) {
            let Ve3 = E3[f6];
            Ve3 === void 0 ? z5 > -1 ? E3[f6] = [Pe2] : E3[f6] = Pe2 : Ve3.pop ? Ve3.push(Pe2) : E3[f6] = [Ve3, Pe2];
          } else
            E3[f6] = Pe2;
        }
        m3 = "", g2 = D5, S6 = D5, x6 = false, w5 = false, A4 = false, O5 = false, N5 = false, U6 = false, z5 = -1, h5 = D5, E3 = u3, R5 = void 0, f6 = "";
      } else C5 === 93 ? (a4 && n3 === "bracket" && Pt3 === 91 && (z5 = Ce3), i3 && (l2 === "index" || p4) && S6 <= g2 && (h5 !== Ce3 && (b6 = lr2(
        r4,
        h5 + 1,
        D5,
        A4,
        x6
      ), f6 = o4(b6), R5 !== void 0 && (E3 = (0, ar3.getDeepObject)(E3, R5, f6, void 0, p4)), R5 = f6, A4 = false, x6 = false), h5 = D5, U6 = true, N5 = false)) : C5 === 46 ? i3 && (l2 === "dot" || p4) && S6 <= g2 && (h5 !== Ce3 && (b6 = lr2(r4, h5 + 1, D5, A4, x6), f6 = o4(b6), R5 !== void 0 && (E3 = (0, ar3.getDeepObject)(
        E3,
        R5,
        f6,
        p4
      )), R5 = f6, A4 = false, x6 = false), N5 = true, U6 = false, h5 = D5) : C5 === 91 ? i3 && (l2 === "index" || p4) && S6 <= g2 && (h5 !== Ce3 && (b6 = lr2(
        r4,
        h5 + 1,
        D5,
        A4,
        x6
      ), f6 = o4(b6), p4 && R5 !== void 0 && (E3 = (0, ar3.getDeepObject)(E3, R5, f6, p4)), R5 = f6, A4 = false, x6 = false, N5 = false, U6 = true), h5 = D5) : C5 === 61 ? S6 <= g2 ? S6 = D5 : w5 = true : C5 === 43 ? S6 > g2 ? O5 = true : A4 = true : C5 === 37 && (S6 > g2 ? w5 = true : x6 = true);
      Ce3 = D5, Pt3 = C5;
    }
    return u3;
  }
  s4(ba2, "parse");
});
var Qo2 = k5((yt2) => {
  "use strict";
  Object.defineProperty(yt2, "__esModule", { value: true });
  yt2.stringify = Ea2;
  var Ta2 = ut2();
  function Ea2(r4, e3) {
    if (r4 === null || typeof r4 != "object")
      return "";
    let t4 = e3 != null ? e3 : {};
    return (0, Ta2.stringifyObject)(r4, t4);
  }
  s4(Ea2, "stringify");
});
var cr2 = k5((B4) => {
  "use strict";
  var Ra2 = B4 && B4.__createBinding || (Object.create ? function(r4, e3, t4, o4) {
    o4 === void 0 && (o4 = t4);
    var n3 = Object.getOwnPropertyDescriptor(e3, t4);
    (!n3 || ("get" in n3 ? !e3.__esModule : n3.writable || n3.configurable)) && (n3 = { enumerable: true, get: /* @__PURE__ */ s4(function() {
      return e3[t4];
    }, "get") }), Object.defineProperty(r4, o4, n3);
  } : function(r4, e3, t4, o4) {
    o4 === void 0 && (o4 = t4), r4[o4] = e3[t4];
  }), xa2 = B4 && B4.__exportStar || function(r4, e3) {
    for (var t4 in r4) t4 !== "default" && !Object.prototype.hasOwnProperty.call(e3, t4) && Ra2(e3, r4, t4);
  };
  Object.defineProperty(B4, "__esModule", { value: true });
  B4.stringify = B4.parse = void 0;
  var wa2 = Jo();
  Object.defineProperty(B4, "parse", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return wa2.parse;
  }, "get") });
  var va2 = Qo2();
  Object.defineProperty(B4, "stringify", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return va2.stringify;
  }, "get") });
  xa2(sr2(), B4);
});
var St2 = k5((Cf, ka2) => {
  ka2.exports = {
    Aacute: "\xC1",
    aacute: "\xE1",
    Abreve: "\u0102",
    abreve: "\u0103",
    ac: "\u223E",
    acd: "\u223F",
    acE: "\u223E\u0333",
    Acirc: "\xC2",
    acirc: "\xE2",
    acute: "\xB4",
    Acy: "\u0410",
    acy: "\u0430",
    AElig: "\xC6",
    aelig: "\xE6",
    af: "\u2061",
    Afr: "\u{1D504}",
    afr: "\u{1D51E}",
    Agrave: "\xC0",
    agrave: "\xE0",
    alefsym: "\u2135",
    aleph: "\u2135",
    Alpha: "\u0391",
    alpha: "\u03B1",
    Amacr: "\u0100",
    amacr: "\u0101",
    amalg: "\u2A3F",
    amp: "&",
    AMP: "&",
    andand: "\u2A55",
    And: "\u2A53",
    and: "\u2227",
    andd: "\u2A5C",
    andslope: "\u2A58",
    andv: "\u2A5A",
    ang: "\u2220",
    ange: "\u29A4",
    angle: "\u2220",
    angmsdaa: "\u29A8",
    angmsdab: "\u29A9",
    angmsdac: "\u29AA",
    angmsdad: "\u29AB",
    angmsdae: "\u29AC",
    angmsdaf: "\u29AD",
    angmsdag: "\u29AE",
    angmsdah: "\u29AF",
    angmsd: "\u2221",
    angrt: "\u221F",
    angrtvb: "\u22BE",
    angrtvbd: "\u299D",
    angsph: "\u2222",
    angst: "\xC5",
    angzarr: "\u237C",
    Aogon: "\u0104",
    aogon: "\u0105",
    Aopf: "\u{1D538}",
    aopf: "\u{1D552}",
    apacir: "\u2A6F",
    ap: "\u2248",
    apE: "\u2A70",
    ape: "\u224A",
    apid: "\u224B",
    apos: "'",
    ApplyFunction: "\u2061",
    approx: "\u2248",
    approxeq: "\u224A",
    Aring: "\xC5",
    aring: "\xE5",
    Ascr: "\u{1D49C}",
    ascr: "\u{1D4B6}",
    Assign: "\u2254",
    ast: "*",
    asymp: "\u2248",
    asympeq: "\u224D",
    Atilde: "\xC3",
    atilde: "\xE3",
    Auml: "\xC4",
    auml: "\xE4",
    awconint: "\u2233",
    awint: "\u2A11",
    backcong: "\u224C",
    backepsilon: "\u03F6",
    backprime: "\u2035",
    backsim: "\u223D",
    backsimeq: "\u22CD",
    Backslash: "\u2216",
    Barv: "\u2AE7",
    barvee: "\u22BD",
    barwed: "\u2305",
    Barwed: "\u2306",
    barwedge: "\u2305",
    bbrk: "\u23B5",
    bbrktbrk: "\u23B6",
    bcong: "\u224C",
    Bcy: "\u0411",
    bcy: "\u0431",
    bdquo: "\u201E",
    becaus: "\u2235",
    because: "\u2235",
    Because: "\u2235",
    bemptyv: "\u29B0",
    bepsi: "\u03F6",
    bernou: "\u212C",
    Bernoullis: "\u212C",
    Beta: "\u0392",
    beta: "\u03B2",
    beth: "\u2136",
    between: "\u226C",
    Bfr: "\u{1D505}",
    bfr: "\u{1D51F}",
    bigcap: "\u22C2",
    bigcirc: "\u25EF",
    bigcup: "\u22C3",
    bigodot: "\u2A00",
    bigoplus: "\u2A01",
    bigotimes: "\u2A02",
    bigsqcup: "\u2A06",
    bigstar: "\u2605",
    bigtriangledown: "\u25BD",
    bigtriangleup: "\u25B3",
    biguplus: "\u2A04",
    bigvee: "\u22C1",
    bigwedge: "\u22C0",
    bkarow: "\u290D",
    blacklozenge: "\u29EB",
    blacksquare: "\u25AA",
    blacktriangle: "\u25B4",
    blacktriangledown: "\u25BE",
    blacktriangleleft: "\u25C2",
    blacktriangleright: "\u25B8",
    blank: "\u2423",
    blk12: "\u2592",
    blk14: "\u2591",
    blk34: "\u2593",
    block: "\u2588",
    bne: "=\u20E5",
    bnequiv: "\u2261\u20E5",
    bNot: "\u2AED",
    bnot: "\u2310",
    Bopf: "\u{1D539}",
    bopf: "\u{1D553}",
    bot: "\u22A5",
    bottom: "\u22A5",
    bowtie: "\u22C8",
    boxbox: "\u29C9",
    boxdl: "\u2510",
    boxdL: "\u2555",
    boxDl: "\u2556",
    boxDL: "\u2557",
    boxdr: "\u250C",
    boxdR: "\u2552",
    boxDr: "\u2553",
    boxDR: "\u2554",
    boxh: "\u2500",
    boxH: "\u2550",
    boxhd: "\u252C",
    boxHd: "\u2564",
    boxhD: "\u2565",
    boxHD: "\u2566",
    boxhu: "\u2534",
    boxHu: "\u2567",
    boxhU: "\u2568",
    boxHU: "\u2569",
    boxminus: "\u229F",
    boxplus: "\u229E",
    boxtimes: "\u22A0",
    boxul: "\u2518",
    boxuL: "\u255B",
    boxUl: "\u255C",
    boxUL: "\u255D",
    boxur: "\u2514",
    boxuR: "\u2558",
    boxUr: "\u2559",
    boxUR: "\u255A",
    boxv: "\u2502",
    boxV: "\u2551",
    boxvh: "\u253C",
    boxvH: "\u256A",
    boxVh: "\u256B",
    boxVH: "\u256C",
    boxvl: "\u2524",
    boxvL: "\u2561",
    boxVl: "\u2562",
    boxVL: "\u2563",
    boxvr: "\u251C",
    boxvR: "\u255E",
    boxVr: "\u255F",
    boxVR: "\u2560",
    bprime: "\u2035",
    breve: "\u02D8",
    Breve: "\u02D8",
    brvbar: "\xA6",
    bscr: "\u{1D4B7}",
    Bscr: "\u212C",
    bsemi: "\u204F",
    bsim: "\u223D",
    bsime: "\u22CD",
    bsolb: "\u29C5",
    bsol: "\\",
    bsolhsub: "\u27C8",
    bull: "\u2022",
    bullet: "\u2022",
    bump: "\u224E",
    bumpE: "\u2AAE",
    bumpe: "\u224F",
    Bumpeq: "\u224E",
    bumpeq: "\u224F",
    Cacute: "\u0106",
    cacute: "\u0107",
    capand: "\u2A44",
    capbrcup: "\u2A49",
    capcap: "\u2A4B",
    cap: "\u2229",
    Cap: "\u22D2",
    capcup: "\u2A47",
    capdot: "\u2A40",
    CapitalDifferentialD: "\u2145",
    caps: "\u2229\uFE00",
    caret: "\u2041",
    caron: "\u02C7",
    Cayleys: "\u212D",
    ccaps: "\u2A4D",
    Ccaron: "\u010C",
    ccaron: "\u010D",
    Ccedil: "\xC7",
    ccedil: "\xE7",
    Ccirc: "\u0108",
    ccirc: "\u0109",
    Cconint: "\u2230",
    ccups: "\u2A4C",
    ccupssm: "\u2A50",
    Cdot: "\u010A",
    cdot: "\u010B",
    cedil: "\xB8",
    Cedilla: "\xB8",
    cemptyv: "\u29B2",
    cent: "\xA2",
    centerdot: "\xB7",
    CenterDot: "\xB7",
    cfr: "\u{1D520}",
    Cfr: "\u212D",
    CHcy: "\u0427",
    chcy: "\u0447",
    check: "\u2713",
    checkmark: "\u2713",
    Chi: "\u03A7",
    chi: "\u03C7",
    circ: "\u02C6",
    circeq: "\u2257",
    circlearrowleft: "\u21BA",
    circlearrowright: "\u21BB",
    circledast: "\u229B",
    circledcirc: "\u229A",
    circleddash: "\u229D",
    CircleDot: "\u2299",
    circledR: "\xAE",
    circledS: "\u24C8",
    CircleMinus: "\u2296",
    CirclePlus: "\u2295",
    CircleTimes: "\u2297",
    cir: "\u25CB",
    cirE: "\u29C3",
    cire: "\u2257",
    cirfnint: "\u2A10",
    cirmid: "\u2AEF",
    cirscir: "\u29C2",
    ClockwiseContourIntegral: "\u2232",
    CloseCurlyDoubleQuote: "\u201D",
    CloseCurlyQuote: "\u2019",
    clubs: "\u2663",
    clubsuit: "\u2663",
    colon: ":",
    Colon: "\u2237",
    Colone: "\u2A74",
    colone: "\u2254",
    coloneq: "\u2254",
    comma: ",",
    commat: "@",
    comp: "\u2201",
    compfn: "\u2218",
    complement: "\u2201",
    complexes: "\u2102",
    cong: "\u2245",
    congdot: "\u2A6D",
    Congruent: "\u2261",
    conint: "\u222E",
    Conint: "\u222F",
    ContourIntegral: "\u222E",
    copf: "\u{1D554}",
    Copf: "\u2102",
    coprod: "\u2210",
    Coproduct: "\u2210",
    copy: "\xA9",
    COPY: "\xA9",
    copysr: "\u2117",
    CounterClockwiseContourIntegral: "\u2233",
    crarr: "\u21B5",
    cross: "\u2717",
    Cross: "\u2A2F",
    Cscr: "\u{1D49E}",
    cscr: "\u{1D4B8}",
    csub: "\u2ACF",
    csube: "\u2AD1",
    csup: "\u2AD0",
    csupe: "\u2AD2",
    ctdot: "\u22EF",
    cudarrl: "\u2938",
    cudarrr: "\u2935",
    cuepr: "\u22DE",
    cuesc: "\u22DF",
    cularr: "\u21B6",
    cularrp: "\u293D",
    cupbrcap: "\u2A48",
    cupcap: "\u2A46",
    CupCap: "\u224D",
    cup: "\u222A",
    Cup: "\u22D3",
    cupcup: "\u2A4A",
    cupdot: "\u228D",
    cupor: "\u2A45",
    cups: "\u222A\uFE00",
    curarr: "\u21B7",
    curarrm: "\u293C",
    curlyeqprec: "\u22DE",
    curlyeqsucc: "\u22DF",
    curlyvee: "\u22CE",
    curlywedge: "\u22CF",
    curren: "\xA4",
    curvearrowleft: "\u21B6",
    curvearrowright: "\u21B7",
    cuvee: "\u22CE",
    cuwed: "\u22CF",
    cwconint: "\u2232",
    cwint: "\u2231",
    cylcty: "\u232D",
    dagger: "\u2020",
    Dagger: "\u2021",
    daleth: "\u2138",
    darr: "\u2193",
    Darr: "\u21A1",
    dArr: "\u21D3",
    dash: "\u2010",
    Dashv: "\u2AE4",
    dashv: "\u22A3",
    dbkarow: "\u290F",
    dblac: "\u02DD",
    Dcaron: "\u010E",
    dcaron: "\u010F",
    Dcy: "\u0414",
    dcy: "\u0434",
    ddagger: "\u2021",
    ddarr: "\u21CA",
    DD: "\u2145",
    dd: "\u2146",
    DDotrahd: "\u2911",
    ddotseq: "\u2A77",
    deg: "\xB0",
    Del: "\u2207",
    Delta: "\u0394",
    delta: "\u03B4",
    demptyv: "\u29B1",
    dfisht: "\u297F",
    Dfr: "\u{1D507}",
    dfr: "\u{1D521}",
    dHar: "\u2965",
    dharl: "\u21C3",
    dharr: "\u21C2",
    DiacriticalAcute: "\xB4",
    DiacriticalDot: "\u02D9",
    DiacriticalDoubleAcute: "\u02DD",
    DiacriticalGrave: "`",
    DiacriticalTilde: "\u02DC",
    diam: "\u22C4",
    diamond: "\u22C4",
    Diamond: "\u22C4",
    diamondsuit: "\u2666",
    diams: "\u2666",
    die: "\xA8",
    DifferentialD: "\u2146",
    digamma: "\u03DD",
    disin: "\u22F2",
    div: "\xF7",
    divide: "\xF7",
    divideontimes: "\u22C7",
    divonx: "\u22C7",
    DJcy: "\u0402",
    djcy: "\u0452",
    dlcorn: "\u231E",
    dlcrop: "\u230D",
    dollar: "$",
    Dopf: "\u{1D53B}",
    dopf: "\u{1D555}",
    Dot: "\xA8",
    dot: "\u02D9",
    DotDot: "\u20DC",
    doteq: "\u2250",
    doteqdot: "\u2251",
    DotEqual: "\u2250",
    dotminus: "\u2238",
    dotplus: "\u2214",
    dotsquare: "\u22A1",
    doublebarwedge: "\u2306",
    DoubleContourIntegral: "\u222F",
    DoubleDot: "\xA8",
    DoubleDownArrow: "\u21D3",
    DoubleLeftArrow: "\u21D0",
    DoubleLeftRightArrow: "\u21D4",
    DoubleLeftTee: "\u2AE4",
    DoubleLongLeftArrow: "\u27F8",
    DoubleLongLeftRightArrow: "\u27FA",
    DoubleLongRightArrow: "\u27F9",
    DoubleRightArrow: "\u21D2",
    DoubleRightTee: "\u22A8",
    DoubleUpArrow: "\u21D1",
    DoubleUpDownArrow: "\u21D5",
    DoubleVerticalBar: "\u2225",
    DownArrowBar: "\u2913",
    downarrow: "\u2193",
    DownArrow: "\u2193",
    Downarrow: "\u21D3",
    DownArrowUpArrow: "\u21F5",
    DownBreve: "\u0311",
    downdownarrows: "\u21CA",
    downharpoonleft: "\u21C3",
    downharpoonright: "\u21C2",
    DownLeftRightVector: "\u2950",
    DownLeftTeeVector: "\u295E",
    DownLeftVectorBar: "\u2956",
    DownLeftVector: "\u21BD",
    DownRightTeeVector: "\u295F",
    DownRightVectorBar: "\u2957",
    DownRightVector: "\u21C1",
    DownTeeArrow: "\u21A7",
    DownTee: "\u22A4",
    drbkarow: "\u2910",
    drcorn: "\u231F",
    drcrop: "\u230C",
    Dscr: "\u{1D49F}",
    dscr: "\u{1D4B9}",
    DScy: "\u0405",
    dscy: "\u0455",
    dsol: "\u29F6",
    Dstrok: "\u0110",
    dstrok: "\u0111",
    dtdot: "\u22F1",
    dtri: "\u25BF",
    dtrif: "\u25BE",
    duarr: "\u21F5",
    duhar: "\u296F",
    dwangle: "\u29A6",
    DZcy: "\u040F",
    dzcy: "\u045F",
    dzigrarr: "\u27FF",
    Eacute: "\xC9",
    eacute: "\xE9",
    easter: "\u2A6E",
    Ecaron: "\u011A",
    ecaron: "\u011B",
    Ecirc: "\xCA",
    ecirc: "\xEA",
    ecir: "\u2256",
    ecolon: "\u2255",
    Ecy: "\u042D",
    ecy: "\u044D",
    eDDot: "\u2A77",
    Edot: "\u0116",
    edot: "\u0117",
    eDot: "\u2251",
    ee: "\u2147",
    efDot: "\u2252",
    Efr: "\u{1D508}",
    efr: "\u{1D522}",
    eg: "\u2A9A",
    Egrave: "\xC8",
    egrave: "\xE8",
    egs: "\u2A96",
    egsdot: "\u2A98",
    el: "\u2A99",
    Element: "\u2208",
    elinters: "\u23E7",
    ell: "\u2113",
    els: "\u2A95",
    elsdot: "\u2A97",
    Emacr: "\u0112",
    emacr: "\u0113",
    empty: "\u2205",
    emptyset: "\u2205",
    EmptySmallSquare: "\u25FB",
    emptyv: "\u2205",
    EmptyVerySmallSquare: "\u25AB",
    emsp13: "\u2004",
    emsp14: "\u2005",
    emsp: "\u2003",
    ENG: "\u014A",
    eng: "\u014B",
    ensp: "\u2002",
    Eogon: "\u0118",
    eogon: "\u0119",
    Eopf: "\u{1D53C}",
    eopf: "\u{1D556}",
    epar: "\u22D5",
    eparsl: "\u29E3",
    eplus: "\u2A71",
    epsi: "\u03B5",
    Epsilon: "\u0395",
    epsilon: "\u03B5",
    epsiv: "\u03F5",
    eqcirc: "\u2256",
    eqcolon: "\u2255",
    eqsim: "\u2242",
    eqslantgtr: "\u2A96",
    eqslantless: "\u2A95",
    Equal: "\u2A75",
    equals: "=",
    EqualTilde: "\u2242",
    equest: "\u225F",
    Equilibrium: "\u21CC",
    equiv: "\u2261",
    equivDD: "\u2A78",
    eqvparsl: "\u29E5",
    erarr: "\u2971",
    erDot: "\u2253",
    escr: "\u212F",
    Escr: "\u2130",
    esdot: "\u2250",
    Esim: "\u2A73",
    esim: "\u2242",
    Eta: "\u0397",
    eta: "\u03B7",
    ETH: "\xD0",
    eth: "\xF0",
    Euml: "\xCB",
    euml: "\xEB",
    euro: "\u20AC",
    excl: "!",
    exist: "\u2203",
    Exists: "\u2203",
    expectation: "\u2130",
    exponentiale: "\u2147",
    ExponentialE: "\u2147",
    fallingdotseq: "\u2252",
    Fcy: "\u0424",
    fcy: "\u0444",
    female: "\u2640",
    ffilig: "\uFB03",
    fflig: "\uFB00",
    ffllig: "\uFB04",
    Ffr: "\u{1D509}",
    ffr: "\u{1D523}",
    filig: "\uFB01",
    FilledSmallSquare: "\u25FC",
    FilledVerySmallSquare: "\u25AA",
    fjlig: "fj",
    flat: "\u266D",
    fllig: "\uFB02",
    fltns: "\u25B1",
    fnof: "\u0192",
    Fopf: "\u{1D53D}",
    fopf: "\u{1D557}",
    forall: "\u2200",
    ForAll: "\u2200",
    fork: "\u22D4",
    forkv: "\u2AD9",
    Fouriertrf: "\u2131",
    fpartint: "\u2A0D",
    frac12: "\xBD",
    frac13: "\u2153",
    frac14: "\xBC",
    frac15: "\u2155",
    frac16: "\u2159",
    frac18: "\u215B",
    frac23: "\u2154",
    frac25: "\u2156",
    frac34: "\xBE",
    frac35: "\u2157",
    frac38: "\u215C",
    frac45: "\u2158",
    frac56: "\u215A",
    frac58: "\u215D",
    frac78: "\u215E",
    frasl: "\u2044",
    frown: "\u2322",
    fscr: "\u{1D4BB}",
    Fscr: "\u2131",
    gacute: "\u01F5",
    Gamma: "\u0393",
    gamma: "\u03B3",
    Gammad: "\u03DC",
    gammad: "\u03DD",
    gap: "\u2A86",
    Gbreve: "\u011E",
    gbreve: "\u011F",
    Gcedil: "\u0122",
    Gcirc: "\u011C",
    gcirc: "\u011D",
    Gcy: "\u0413",
    gcy: "\u0433",
    Gdot: "\u0120",
    gdot: "\u0121",
    ge: "\u2265",
    gE: "\u2267",
    gEl: "\u2A8C",
    gel: "\u22DB",
    geq: "\u2265",
    geqq: "\u2267",
    geqslant: "\u2A7E",
    gescc: "\u2AA9",
    ges: "\u2A7E",
    gesdot: "\u2A80",
    gesdoto: "\u2A82",
    gesdotol: "\u2A84",
    gesl: "\u22DB\uFE00",
    gesles: "\u2A94",
    Gfr: "\u{1D50A}",
    gfr: "\u{1D524}",
    gg: "\u226B",
    Gg: "\u22D9",
    ggg: "\u22D9",
    gimel: "\u2137",
    GJcy: "\u0403",
    gjcy: "\u0453",
    gla: "\u2AA5",
    gl: "\u2277",
    glE: "\u2A92",
    glj: "\u2AA4",
    gnap: "\u2A8A",
    gnapprox: "\u2A8A",
    gne: "\u2A88",
    gnE: "\u2269",
    gneq: "\u2A88",
    gneqq: "\u2269",
    gnsim: "\u22E7",
    Gopf: "\u{1D53E}",
    gopf: "\u{1D558}",
    grave: "`",
    GreaterEqual: "\u2265",
    GreaterEqualLess: "\u22DB",
    GreaterFullEqual: "\u2267",
    GreaterGreater: "\u2AA2",
    GreaterLess: "\u2277",
    GreaterSlantEqual: "\u2A7E",
    GreaterTilde: "\u2273",
    Gscr: "\u{1D4A2}",
    gscr: "\u210A",
    gsim: "\u2273",
    gsime: "\u2A8E",
    gsiml: "\u2A90",
    gtcc: "\u2AA7",
    gtcir: "\u2A7A",
    gt: ">",
    GT: ">",
    Gt: "\u226B",
    gtdot: "\u22D7",
    gtlPar: "\u2995",
    gtquest: "\u2A7C",
    gtrapprox: "\u2A86",
    gtrarr: "\u2978",
    gtrdot: "\u22D7",
    gtreqless: "\u22DB",
    gtreqqless: "\u2A8C",
    gtrless: "\u2277",
    gtrsim: "\u2273",
    gvertneqq: "\u2269\uFE00",
    gvnE: "\u2269\uFE00",
    Hacek: "\u02C7",
    hairsp: "\u200A",
    half: "\xBD",
    hamilt: "\u210B",
    HARDcy: "\u042A",
    hardcy: "\u044A",
    harrcir: "\u2948",
    harr: "\u2194",
    hArr: "\u21D4",
    harrw: "\u21AD",
    Hat: "^",
    hbar: "\u210F",
    Hcirc: "\u0124",
    hcirc: "\u0125",
    hearts: "\u2665",
    heartsuit: "\u2665",
    hellip: "\u2026",
    hercon: "\u22B9",
    hfr: "\u{1D525}",
    Hfr: "\u210C",
    HilbertSpace: "\u210B",
    hksearow: "\u2925",
    hkswarow: "\u2926",
    hoarr: "\u21FF",
    homtht: "\u223B",
    hookleftarrow: "\u21A9",
    hookrightarrow: "\u21AA",
    hopf: "\u{1D559}",
    Hopf: "\u210D",
    horbar: "\u2015",
    HorizontalLine: "\u2500",
    hscr: "\u{1D4BD}",
    Hscr: "\u210B",
    hslash: "\u210F",
    Hstrok: "\u0126",
    hstrok: "\u0127",
    HumpDownHump: "\u224E",
    HumpEqual: "\u224F",
    hybull: "\u2043",
    hyphen: "\u2010",
    Iacute: "\xCD",
    iacute: "\xED",
    ic: "\u2063",
    Icirc: "\xCE",
    icirc: "\xEE",
    Icy: "\u0418",
    icy: "\u0438",
    Idot: "\u0130",
    IEcy: "\u0415",
    iecy: "\u0435",
    iexcl: "\xA1",
    iff: "\u21D4",
    ifr: "\u{1D526}",
    Ifr: "\u2111",
    Igrave: "\xCC",
    igrave: "\xEC",
    ii: "\u2148",
    iiiint: "\u2A0C",
    iiint: "\u222D",
    iinfin: "\u29DC",
    iiota: "\u2129",
    IJlig: "\u0132",
    ijlig: "\u0133",
    Imacr: "\u012A",
    imacr: "\u012B",
    image: "\u2111",
    ImaginaryI: "\u2148",
    imagline: "\u2110",
    imagpart: "\u2111",
    imath: "\u0131",
    Im: "\u2111",
    imof: "\u22B7",
    imped: "\u01B5",
    Implies: "\u21D2",
    incare: "\u2105",
    in: "\u2208",
    infin: "\u221E",
    infintie: "\u29DD",
    inodot: "\u0131",
    intcal: "\u22BA",
    int: "\u222B",
    Int: "\u222C",
    integers: "\u2124",
    Integral: "\u222B",
    intercal: "\u22BA",
    Intersection: "\u22C2",
    intlarhk: "\u2A17",
    intprod: "\u2A3C",
    InvisibleComma: "\u2063",
    InvisibleTimes: "\u2062",
    IOcy: "\u0401",
    iocy: "\u0451",
    Iogon: "\u012E",
    iogon: "\u012F",
    Iopf: "\u{1D540}",
    iopf: "\u{1D55A}",
    Iota: "\u0399",
    iota: "\u03B9",
    iprod: "\u2A3C",
    iquest: "\xBF",
    iscr: "\u{1D4BE}",
    Iscr: "\u2110",
    isin: "\u2208",
    isindot: "\u22F5",
    isinE: "\u22F9",
    isins: "\u22F4",
    isinsv: "\u22F3",
    isinv: "\u2208",
    it: "\u2062",
    Itilde: "\u0128",
    itilde: "\u0129",
    Iukcy: "\u0406",
    iukcy: "\u0456",
    Iuml: "\xCF",
    iuml: "\xEF",
    Jcirc: "\u0134",
    jcirc: "\u0135",
    Jcy: "\u0419",
    jcy: "\u0439",
    Jfr: "\u{1D50D}",
    jfr: "\u{1D527}",
    jmath: "\u0237",
    Jopf: "\u{1D541}",
    jopf: "\u{1D55B}",
    Jscr: "\u{1D4A5}",
    jscr: "\u{1D4BF}",
    Jsercy: "\u0408",
    jsercy: "\u0458",
    Jukcy: "\u0404",
    jukcy: "\u0454",
    Kappa: "\u039A",
    kappa: "\u03BA",
    kappav: "\u03F0",
    Kcedil: "\u0136",
    kcedil: "\u0137",
    Kcy: "\u041A",
    kcy: "\u043A",
    Kfr: "\u{1D50E}",
    kfr: "\u{1D528}",
    kgreen: "\u0138",
    KHcy: "\u0425",
    khcy: "\u0445",
    KJcy: "\u040C",
    kjcy: "\u045C",
    Kopf: "\u{1D542}",
    kopf: "\u{1D55C}",
    Kscr: "\u{1D4A6}",
    kscr: "\u{1D4C0}",
    lAarr: "\u21DA",
    Lacute: "\u0139",
    lacute: "\u013A",
    laemptyv: "\u29B4",
    lagran: "\u2112",
    Lambda: "\u039B",
    lambda: "\u03BB",
    lang: "\u27E8",
    Lang: "\u27EA",
    langd: "\u2991",
    langle: "\u27E8",
    lap: "\u2A85",
    Laplacetrf: "\u2112",
    laquo: "\xAB",
    larrb: "\u21E4",
    larrbfs: "\u291F",
    larr: "\u2190",
    Larr: "\u219E",
    lArr: "\u21D0",
    larrfs: "\u291D",
    larrhk: "\u21A9",
    larrlp: "\u21AB",
    larrpl: "\u2939",
    larrsim: "\u2973",
    larrtl: "\u21A2",
    latail: "\u2919",
    lAtail: "\u291B",
    lat: "\u2AAB",
    late: "\u2AAD",
    lates: "\u2AAD\uFE00",
    lbarr: "\u290C",
    lBarr: "\u290E",
    lbbrk: "\u2772",
    lbrace: "{",
    lbrack: "[",
    lbrke: "\u298B",
    lbrksld: "\u298F",
    lbrkslu: "\u298D",
    Lcaron: "\u013D",
    lcaron: "\u013E",
    Lcedil: "\u013B",
    lcedil: "\u013C",
    lceil: "\u2308",
    lcub: "{",
    Lcy: "\u041B",
    lcy: "\u043B",
    ldca: "\u2936",
    ldquo: "\u201C",
    ldquor: "\u201E",
    ldrdhar: "\u2967",
    ldrushar: "\u294B",
    ldsh: "\u21B2",
    le: "\u2264",
    lE: "\u2266",
    LeftAngleBracket: "\u27E8",
    LeftArrowBar: "\u21E4",
    leftarrow: "\u2190",
    LeftArrow: "\u2190",
    Leftarrow: "\u21D0",
    LeftArrowRightArrow: "\u21C6",
    leftarrowtail: "\u21A2",
    LeftCeiling: "\u2308",
    LeftDoubleBracket: "\u27E6",
    LeftDownTeeVector: "\u2961",
    LeftDownVectorBar: "\u2959",
    LeftDownVector: "\u21C3",
    LeftFloor: "\u230A",
    leftharpoondown: "\u21BD",
    leftharpoonup: "\u21BC",
    leftleftarrows: "\u21C7",
    leftrightarrow: "\u2194",
    LeftRightArrow: "\u2194",
    Leftrightarrow: "\u21D4",
    leftrightarrows: "\u21C6",
    leftrightharpoons: "\u21CB",
    leftrightsquigarrow: "\u21AD",
    LeftRightVector: "\u294E",
    LeftTeeArrow: "\u21A4",
    LeftTee: "\u22A3",
    LeftTeeVector: "\u295A",
    leftthreetimes: "\u22CB",
    LeftTriangleBar: "\u29CF",
    LeftTriangle: "\u22B2",
    LeftTriangleEqual: "\u22B4",
    LeftUpDownVector: "\u2951",
    LeftUpTeeVector: "\u2960",
    LeftUpVectorBar: "\u2958",
    LeftUpVector: "\u21BF",
    LeftVectorBar: "\u2952",
    LeftVector: "\u21BC",
    lEg: "\u2A8B",
    leg: "\u22DA",
    leq: "\u2264",
    leqq: "\u2266",
    leqslant: "\u2A7D",
    lescc: "\u2AA8",
    les: "\u2A7D",
    lesdot: "\u2A7F",
    lesdoto: "\u2A81",
    lesdotor: "\u2A83",
    lesg: "\u22DA\uFE00",
    lesges: "\u2A93",
    lessapprox: "\u2A85",
    lessdot: "\u22D6",
    lesseqgtr: "\u22DA",
    lesseqqgtr: "\u2A8B",
    LessEqualGreater: "\u22DA",
    LessFullEqual: "\u2266",
    LessGreater: "\u2276",
    lessgtr: "\u2276",
    LessLess: "\u2AA1",
    lesssim: "\u2272",
    LessSlantEqual: "\u2A7D",
    LessTilde: "\u2272",
    lfisht: "\u297C",
    lfloor: "\u230A",
    Lfr: "\u{1D50F}",
    lfr: "\u{1D529}",
    lg: "\u2276",
    lgE: "\u2A91",
    lHar: "\u2962",
    lhard: "\u21BD",
    lharu: "\u21BC",
    lharul: "\u296A",
    lhblk: "\u2584",
    LJcy: "\u0409",
    ljcy: "\u0459",
    llarr: "\u21C7",
    ll: "\u226A",
    Ll: "\u22D8",
    llcorner: "\u231E",
    Lleftarrow: "\u21DA",
    llhard: "\u296B",
    lltri: "\u25FA",
    Lmidot: "\u013F",
    lmidot: "\u0140",
    lmoustache: "\u23B0",
    lmoust: "\u23B0",
    lnap: "\u2A89",
    lnapprox: "\u2A89",
    lne: "\u2A87",
    lnE: "\u2268",
    lneq: "\u2A87",
    lneqq: "\u2268",
    lnsim: "\u22E6",
    loang: "\u27EC",
    loarr: "\u21FD",
    lobrk: "\u27E6",
    longleftarrow: "\u27F5",
    LongLeftArrow: "\u27F5",
    Longleftarrow: "\u27F8",
    longleftrightarrow: "\u27F7",
    LongLeftRightArrow: "\u27F7",
    Longleftrightarrow: "\u27FA",
    longmapsto: "\u27FC",
    longrightarrow: "\u27F6",
    LongRightArrow: "\u27F6",
    Longrightarrow: "\u27F9",
    looparrowleft: "\u21AB",
    looparrowright: "\u21AC",
    lopar: "\u2985",
    Lopf: "\u{1D543}",
    lopf: "\u{1D55D}",
    loplus: "\u2A2D",
    lotimes: "\u2A34",
    lowast: "\u2217",
    lowbar: "_",
    LowerLeftArrow: "\u2199",
    LowerRightArrow: "\u2198",
    loz: "\u25CA",
    lozenge: "\u25CA",
    lozf: "\u29EB",
    lpar: "(",
    lparlt: "\u2993",
    lrarr: "\u21C6",
    lrcorner: "\u231F",
    lrhar: "\u21CB",
    lrhard: "\u296D",
    lrm: "\u200E",
    lrtri: "\u22BF",
    lsaquo: "\u2039",
    lscr: "\u{1D4C1}",
    Lscr: "\u2112",
    lsh: "\u21B0",
    Lsh: "\u21B0",
    lsim: "\u2272",
    lsime: "\u2A8D",
    lsimg: "\u2A8F",
    lsqb: "[",
    lsquo: "\u2018",
    lsquor: "\u201A",
    Lstrok: "\u0141",
    lstrok: "\u0142",
    ltcc: "\u2AA6",
    ltcir: "\u2A79",
    lt: "<",
    LT: "<",
    Lt: "\u226A",
    ltdot: "\u22D6",
    lthree: "\u22CB",
    ltimes: "\u22C9",
    ltlarr: "\u2976",
    ltquest: "\u2A7B",
    ltri: "\u25C3",
    ltrie: "\u22B4",
    ltrif: "\u25C2",
    ltrPar: "\u2996",
    lurdshar: "\u294A",
    luruhar: "\u2966",
    lvertneqq: "\u2268\uFE00",
    lvnE: "\u2268\uFE00",
    macr: "\xAF",
    male: "\u2642",
    malt: "\u2720",
    maltese: "\u2720",
    Map: "\u2905",
    map: "\u21A6",
    mapsto: "\u21A6",
    mapstodown: "\u21A7",
    mapstoleft: "\u21A4",
    mapstoup: "\u21A5",
    marker: "\u25AE",
    mcomma: "\u2A29",
    Mcy: "\u041C",
    mcy: "\u043C",
    mdash: "\u2014",
    mDDot: "\u223A",
    measuredangle: "\u2221",
    MediumSpace: "\u205F",
    Mellintrf: "\u2133",
    Mfr: "\u{1D510}",
    mfr: "\u{1D52A}",
    mho: "\u2127",
    micro: "\xB5",
    midast: "*",
    midcir: "\u2AF0",
    mid: "\u2223",
    middot: "\xB7",
    minusb: "\u229F",
    minus: "\u2212",
    minusd: "\u2238",
    minusdu: "\u2A2A",
    MinusPlus: "\u2213",
    mlcp: "\u2ADB",
    mldr: "\u2026",
    mnplus: "\u2213",
    models: "\u22A7",
    Mopf: "\u{1D544}",
    mopf: "\u{1D55E}",
    mp: "\u2213",
    mscr: "\u{1D4C2}",
    Mscr: "\u2133",
    mstpos: "\u223E",
    Mu: "\u039C",
    mu: "\u03BC",
    multimap: "\u22B8",
    mumap: "\u22B8",
    nabla: "\u2207",
    Nacute: "\u0143",
    nacute: "\u0144",
    nang: "\u2220\u20D2",
    nap: "\u2249",
    napE: "\u2A70\u0338",
    napid: "\u224B\u0338",
    napos: "\u0149",
    napprox: "\u2249",
    natural: "\u266E",
    naturals: "\u2115",
    natur: "\u266E",
    nbsp: "\xA0",
    nbump: "\u224E\u0338",
    nbumpe: "\u224F\u0338",
    ncap: "\u2A43",
    Ncaron: "\u0147",
    ncaron: "\u0148",
    Ncedil: "\u0145",
    ncedil: "\u0146",
    ncong: "\u2247",
    ncongdot: "\u2A6D\u0338",
    ncup: "\u2A42",
    Ncy: "\u041D",
    ncy: "\u043D",
    ndash: "\u2013",
    nearhk: "\u2924",
    nearr: "\u2197",
    neArr: "\u21D7",
    nearrow: "\u2197",
    ne: "\u2260",
    nedot: "\u2250\u0338",
    NegativeMediumSpace: "\u200B",
    NegativeThickSpace: "\u200B",
    NegativeThinSpace: "\u200B",
    NegativeVeryThinSpace: "\u200B",
    nequiv: "\u2262",
    nesear: "\u2928",
    nesim: "\u2242\u0338",
    NestedGreaterGreater: "\u226B",
    NestedLessLess: "\u226A",
    NewLine: `
`,
    nexist: "\u2204",
    nexists: "\u2204",
    Nfr: "\u{1D511}",
    nfr: "\u{1D52B}",
    ngE: "\u2267\u0338",
    nge: "\u2271",
    ngeq: "\u2271",
    ngeqq: "\u2267\u0338",
    ngeqslant: "\u2A7E\u0338",
    nges: "\u2A7E\u0338",
    nGg: "\u22D9\u0338",
    ngsim: "\u2275",
    nGt: "\u226B\u20D2",
    ngt: "\u226F",
    ngtr: "\u226F",
    nGtv: "\u226B\u0338",
    nharr: "\u21AE",
    nhArr: "\u21CE",
    nhpar: "\u2AF2",
    ni: "\u220B",
    nis: "\u22FC",
    nisd: "\u22FA",
    niv: "\u220B",
    NJcy: "\u040A",
    njcy: "\u045A",
    nlarr: "\u219A",
    nlArr: "\u21CD",
    nldr: "\u2025",
    nlE: "\u2266\u0338",
    nle: "\u2270",
    nleftarrow: "\u219A",
    nLeftarrow: "\u21CD",
    nleftrightarrow: "\u21AE",
    nLeftrightarrow: "\u21CE",
    nleq: "\u2270",
    nleqq: "\u2266\u0338",
    nleqslant: "\u2A7D\u0338",
    nles: "\u2A7D\u0338",
    nless: "\u226E",
    nLl: "\u22D8\u0338",
    nlsim: "\u2274",
    nLt: "\u226A\u20D2",
    nlt: "\u226E",
    nltri: "\u22EA",
    nltrie: "\u22EC",
    nLtv: "\u226A\u0338",
    nmid: "\u2224",
    NoBreak: "\u2060",
    NonBreakingSpace: "\xA0",
    nopf: "\u{1D55F}",
    Nopf: "\u2115",
    Not: "\u2AEC",
    not: "\xAC",
    NotCongruent: "\u2262",
    NotCupCap: "\u226D",
    NotDoubleVerticalBar: "\u2226",
    NotElement: "\u2209",
    NotEqual: "\u2260",
    NotEqualTilde: "\u2242\u0338",
    NotExists: "\u2204",
    NotGreater: "\u226F",
    NotGreaterEqual: "\u2271",
    NotGreaterFullEqual: "\u2267\u0338",
    NotGreaterGreater: "\u226B\u0338",
    NotGreaterLess: "\u2279",
    NotGreaterSlantEqual: "\u2A7E\u0338",
    NotGreaterTilde: "\u2275",
    NotHumpDownHump: "\u224E\u0338",
    NotHumpEqual: "\u224F\u0338",
    notin: "\u2209",
    notindot: "\u22F5\u0338",
    notinE: "\u22F9\u0338",
    notinva: "\u2209",
    notinvb: "\u22F7",
    notinvc: "\u22F6",
    NotLeftTriangleBar: "\u29CF\u0338",
    NotLeftTriangle: "\u22EA",
    NotLeftTriangleEqual: "\u22EC",
    NotLess: "\u226E",
    NotLessEqual: "\u2270",
    NotLessGreater: "\u2278",
    NotLessLess: "\u226A\u0338",
    NotLessSlantEqual: "\u2A7D\u0338",
    NotLessTilde: "\u2274",
    NotNestedGreaterGreater: "\u2AA2\u0338",
    NotNestedLessLess: "\u2AA1\u0338",
    notni: "\u220C",
    notniva: "\u220C",
    notnivb: "\u22FE",
    notnivc: "\u22FD",
    NotPrecedes: "\u2280",
    NotPrecedesEqual: "\u2AAF\u0338",
    NotPrecedesSlantEqual: "\u22E0",
    NotReverseElement: "\u220C",
    NotRightTriangleBar: "\u29D0\u0338",
    NotRightTriangle: "\u22EB",
    NotRightTriangleEqual: "\u22ED",
    NotSquareSubset: "\u228F\u0338",
    NotSquareSubsetEqual: "\u22E2",
    NotSquareSuperset: "\u2290\u0338",
    NotSquareSupersetEqual: "\u22E3",
    NotSubset: "\u2282\u20D2",
    NotSubsetEqual: "\u2288",
    NotSucceeds: "\u2281",
    NotSucceedsEqual: "\u2AB0\u0338",
    NotSucceedsSlantEqual: "\u22E1",
    NotSucceedsTilde: "\u227F\u0338",
    NotSuperset: "\u2283\u20D2",
    NotSupersetEqual: "\u2289",
    NotTilde: "\u2241",
    NotTildeEqual: "\u2244",
    NotTildeFullEqual: "\u2247",
    NotTildeTilde: "\u2249",
    NotVerticalBar: "\u2224",
    nparallel: "\u2226",
    npar: "\u2226",
    nparsl: "\u2AFD\u20E5",
    npart: "\u2202\u0338",
    npolint: "\u2A14",
    npr: "\u2280",
    nprcue: "\u22E0",
    nprec: "\u2280",
    npreceq: "\u2AAF\u0338",
    npre: "\u2AAF\u0338",
    nrarrc: "\u2933\u0338",
    nrarr: "\u219B",
    nrArr: "\u21CF",
    nrarrw: "\u219D\u0338",
    nrightarrow: "\u219B",
    nRightarrow: "\u21CF",
    nrtri: "\u22EB",
    nrtrie: "\u22ED",
    nsc: "\u2281",
    nsccue: "\u22E1",
    nsce: "\u2AB0\u0338",
    Nscr: "\u{1D4A9}",
    nscr: "\u{1D4C3}",
    nshortmid: "\u2224",
    nshortparallel: "\u2226",
    nsim: "\u2241",
    nsime: "\u2244",
    nsimeq: "\u2244",
    nsmid: "\u2224",
    nspar: "\u2226",
    nsqsube: "\u22E2",
    nsqsupe: "\u22E3",
    nsub: "\u2284",
    nsubE: "\u2AC5\u0338",
    nsube: "\u2288",
    nsubset: "\u2282\u20D2",
    nsubseteq: "\u2288",
    nsubseteqq: "\u2AC5\u0338",
    nsucc: "\u2281",
    nsucceq: "\u2AB0\u0338",
    nsup: "\u2285",
    nsupE: "\u2AC6\u0338",
    nsupe: "\u2289",
    nsupset: "\u2283\u20D2",
    nsupseteq: "\u2289",
    nsupseteqq: "\u2AC6\u0338",
    ntgl: "\u2279",
    Ntilde: "\xD1",
    ntilde: "\xF1",
    ntlg: "\u2278",
    ntriangleleft: "\u22EA",
    ntrianglelefteq: "\u22EC",
    ntriangleright: "\u22EB",
    ntrianglerighteq: "\u22ED",
    Nu: "\u039D",
    nu: "\u03BD",
    num: "#",
    numero: "\u2116",
    numsp: "\u2007",
    nvap: "\u224D\u20D2",
    nvdash: "\u22AC",
    nvDash: "\u22AD",
    nVdash: "\u22AE",
    nVDash: "\u22AF",
    nvge: "\u2265\u20D2",
    nvgt: ">\u20D2",
    nvHarr: "\u2904",
    nvinfin: "\u29DE",
    nvlArr: "\u2902",
    nvle: "\u2264\u20D2",
    nvlt: "<\u20D2",
    nvltrie: "\u22B4\u20D2",
    nvrArr: "\u2903",
    nvrtrie: "\u22B5\u20D2",
    nvsim: "\u223C\u20D2",
    nwarhk: "\u2923",
    nwarr: "\u2196",
    nwArr: "\u21D6",
    nwarrow: "\u2196",
    nwnear: "\u2927",
    Oacute: "\xD3",
    oacute: "\xF3",
    oast: "\u229B",
    Ocirc: "\xD4",
    ocirc: "\xF4",
    ocir: "\u229A",
    Ocy: "\u041E",
    ocy: "\u043E",
    odash: "\u229D",
    Odblac: "\u0150",
    odblac: "\u0151",
    odiv: "\u2A38",
    odot: "\u2299",
    odsold: "\u29BC",
    OElig: "\u0152",
    oelig: "\u0153",
    ofcir: "\u29BF",
    Ofr: "\u{1D512}",
    ofr: "\u{1D52C}",
    ogon: "\u02DB",
    Ograve: "\xD2",
    ograve: "\xF2",
    ogt: "\u29C1",
    ohbar: "\u29B5",
    ohm: "\u03A9",
    oint: "\u222E",
    olarr: "\u21BA",
    olcir: "\u29BE",
    olcross: "\u29BB",
    oline: "\u203E",
    olt: "\u29C0",
    Omacr: "\u014C",
    omacr: "\u014D",
    Omega: "\u03A9",
    omega: "\u03C9",
    Omicron: "\u039F",
    omicron: "\u03BF",
    omid: "\u29B6",
    ominus: "\u2296",
    Oopf: "\u{1D546}",
    oopf: "\u{1D560}",
    opar: "\u29B7",
    OpenCurlyDoubleQuote: "\u201C",
    OpenCurlyQuote: "\u2018",
    operp: "\u29B9",
    oplus: "\u2295",
    orarr: "\u21BB",
    Or: "\u2A54",
    or: "\u2228",
    ord: "\u2A5D",
    order: "\u2134",
    orderof: "\u2134",
    ordf: "\xAA",
    ordm: "\xBA",
    origof: "\u22B6",
    oror: "\u2A56",
    orslope: "\u2A57",
    orv: "\u2A5B",
    oS: "\u24C8",
    Oscr: "\u{1D4AA}",
    oscr: "\u2134",
    Oslash: "\xD8",
    oslash: "\xF8",
    osol: "\u2298",
    Otilde: "\xD5",
    otilde: "\xF5",
    otimesas: "\u2A36",
    Otimes: "\u2A37",
    otimes: "\u2297",
    Ouml: "\xD6",
    ouml: "\xF6",
    ovbar: "\u233D",
    OverBar: "\u203E",
    OverBrace: "\u23DE",
    OverBracket: "\u23B4",
    OverParenthesis: "\u23DC",
    para: "\xB6",
    parallel: "\u2225",
    par: "\u2225",
    parsim: "\u2AF3",
    parsl: "\u2AFD",
    part: "\u2202",
    PartialD: "\u2202",
    Pcy: "\u041F",
    pcy: "\u043F",
    percnt: "%",
    period: ".",
    permil: "\u2030",
    perp: "\u22A5",
    pertenk: "\u2031",
    Pfr: "\u{1D513}",
    pfr: "\u{1D52D}",
    Phi: "\u03A6",
    phi: "\u03C6",
    phiv: "\u03D5",
    phmmat: "\u2133",
    phone: "\u260E",
    Pi: "\u03A0",
    pi: "\u03C0",
    pitchfork: "\u22D4",
    piv: "\u03D6",
    planck: "\u210F",
    planckh: "\u210E",
    plankv: "\u210F",
    plusacir: "\u2A23",
    plusb: "\u229E",
    pluscir: "\u2A22",
    plus: "+",
    plusdo: "\u2214",
    plusdu: "\u2A25",
    pluse: "\u2A72",
    PlusMinus: "\xB1",
    plusmn: "\xB1",
    plussim: "\u2A26",
    plustwo: "\u2A27",
    pm: "\xB1",
    Poincareplane: "\u210C",
    pointint: "\u2A15",
    popf: "\u{1D561}",
    Popf: "\u2119",
    pound: "\xA3",
    prap: "\u2AB7",
    Pr: "\u2ABB",
    pr: "\u227A",
    prcue: "\u227C",
    precapprox: "\u2AB7",
    prec: "\u227A",
    preccurlyeq: "\u227C",
    Precedes: "\u227A",
    PrecedesEqual: "\u2AAF",
    PrecedesSlantEqual: "\u227C",
    PrecedesTilde: "\u227E",
    preceq: "\u2AAF",
    precnapprox: "\u2AB9",
    precneqq: "\u2AB5",
    precnsim: "\u22E8",
    pre: "\u2AAF",
    prE: "\u2AB3",
    precsim: "\u227E",
    prime: "\u2032",
    Prime: "\u2033",
    primes: "\u2119",
    prnap: "\u2AB9",
    prnE: "\u2AB5",
    prnsim: "\u22E8",
    prod: "\u220F",
    Product: "\u220F",
    profalar: "\u232E",
    profline: "\u2312",
    profsurf: "\u2313",
    prop: "\u221D",
    Proportional: "\u221D",
    Proportion: "\u2237",
    propto: "\u221D",
    prsim: "\u227E",
    prurel: "\u22B0",
    Pscr: "\u{1D4AB}",
    pscr: "\u{1D4C5}",
    Psi: "\u03A8",
    psi: "\u03C8",
    puncsp: "\u2008",
    Qfr: "\u{1D514}",
    qfr: "\u{1D52E}",
    qint: "\u2A0C",
    qopf: "\u{1D562}",
    Qopf: "\u211A",
    qprime: "\u2057",
    Qscr: "\u{1D4AC}",
    qscr: "\u{1D4C6}",
    quaternions: "\u210D",
    quatint: "\u2A16",
    quest: "?",
    questeq: "\u225F",
    quot: '"',
    QUOT: '"',
    rAarr: "\u21DB",
    race: "\u223D\u0331",
    Racute: "\u0154",
    racute: "\u0155",
    radic: "\u221A",
    raemptyv: "\u29B3",
    rang: "\u27E9",
    Rang: "\u27EB",
    rangd: "\u2992",
    range: "\u29A5",
    rangle: "\u27E9",
    raquo: "\xBB",
    rarrap: "\u2975",
    rarrb: "\u21E5",
    rarrbfs: "\u2920",
    rarrc: "\u2933",
    rarr: "\u2192",
    Rarr: "\u21A0",
    rArr: "\u21D2",
    rarrfs: "\u291E",
    rarrhk: "\u21AA",
    rarrlp: "\u21AC",
    rarrpl: "\u2945",
    rarrsim: "\u2974",
    Rarrtl: "\u2916",
    rarrtl: "\u21A3",
    rarrw: "\u219D",
    ratail: "\u291A",
    rAtail: "\u291C",
    ratio: "\u2236",
    rationals: "\u211A",
    rbarr: "\u290D",
    rBarr: "\u290F",
    RBarr: "\u2910",
    rbbrk: "\u2773",
    rbrace: "}",
    rbrack: "]",
    rbrke: "\u298C",
    rbrksld: "\u298E",
    rbrkslu: "\u2990",
    Rcaron: "\u0158",
    rcaron: "\u0159",
    Rcedil: "\u0156",
    rcedil: "\u0157",
    rceil: "\u2309",
    rcub: "}",
    Rcy: "\u0420",
    rcy: "\u0440",
    rdca: "\u2937",
    rdldhar: "\u2969",
    rdquo: "\u201D",
    rdquor: "\u201D",
    rdsh: "\u21B3",
    real: "\u211C",
    realine: "\u211B",
    realpart: "\u211C",
    reals: "\u211D",
    Re: "\u211C",
    rect: "\u25AD",
    reg: "\xAE",
    REG: "\xAE",
    ReverseElement: "\u220B",
    ReverseEquilibrium: "\u21CB",
    ReverseUpEquilibrium: "\u296F",
    rfisht: "\u297D",
    rfloor: "\u230B",
    rfr: "\u{1D52F}",
    Rfr: "\u211C",
    rHar: "\u2964",
    rhard: "\u21C1",
    rharu: "\u21C0",
    rharul: "\u296C",
    Rho: "\u03A1",
    rho: "\u03C1",
    rhov: "\u03F1",
    RightAngleBracket: "\u27E9",
    RightArrowBar: "\u21E5",
    rightarrow: "\u2192",
    RightArrow: "\u2192",
    Rightarrow: "\u21D2",
    RightArrowLeftArrow: "\u21C4",
    rightarrowtail: "\u21A3",
    RightCeiling: "\u2309",
    RightDoubleBracket: "\u27E7",
    RightDownTeeVector: "\u295D",
    RightDownVectorBar: "\u2955",
    RightDownVector: "\u21C2",
    RightFloor: "\u230B",
    rightharpoondown: "\u21C1",
    rightharpoonup: "\u21C0",
    rightleftarrows: "\u21C4",
    rightleftharpoons: "\u21CC",
    rightrightarrows: "\u21C9",
    rightsquigarrow: "\u219D",
    RightTeeArrow: "\u21A6",
    RightTee: "\u22A2",
    RightTeeVector: "\u295B",
    rightthreetimes: "\u22CC",
    RightTriangleBar: "\u29D0",
    RightTriangle: "\u22B3",
    RightTriangleEqual: "\u22B5",
    RightUpDownVector: "\u294F",
    RightUpTeeVector: "\u295C",
    RightUpVectorBar: "\u2954",
    RightUpVector: "\u21BE",
    RightVectorBar: "\u2953",
    RightVector: "\u21C0",
    ring: "\u02DA",
    risingdotseq: "\u2253",
    rlarr: "\u21C4",
    rlhar: "\u21CC",
    rlm: "\u200F",
    rmoustache: "\u23B1",
    rmoust: "\u23B1",
    rnmid: "\u2AEE",
    roang: "\u27ED",
    roarr: "\u21FE",
    robrk: "\u27E7",
    ropar: "\u2986",
    ropf: "\u{1D563}",
    Ropf: "\u211D",
    roplus: "\u2A2E",
    rotimes: "\u2A35",
    RoundImplies: "\u2970",
    rpar: ")",
    rpargt: "\u2994",
    rppolint: "\u2A12",
    rrarr: "\u21C9",
    Rrightarrow: "\u21DB",
    rsaquo: "\u203A",
    rscr: "\u{1D4C7}",
    Rscr: "\u211B",
    rsh: "\u21B1",
    Rsh: "\u21B1",
    rsqb: "]",
    rsquo: "\u2019",
    rsquor: "\u2019",
    rthree: "\u22CC",
    rtimes: "\u22CA",
    rtri: "\u25B9",
    rtrie: "\u22B5",
    rtrif: "\u25B8",
    rtriltri: "\u29CE",
    RuleDelayed: "\u29F4",
    ruluhar: "\u2968",
    rx: "\u211E",
    Sacute: "\u015A",
    sacute: "\u015B",
    sbquo: "\u201A",
    scap: "\u2AB8",
    Scaron: "\u0160",
    scaron: "\u0161",
    Sc: "\u2ABC",
    sc: "\u227B",
    sccue: "\u227D",
    sce: "\u2AB0",
    scE: "\u2AB4",
    Scedil: "\u015E",
    scedil: "\u015F",
    Scirc: "\u015C",
    scirc: "\u015D",
    scnap: "\u2ABA",
    scnE: "\u2AB6",
    scnsim: "\u22E9",
    scpolint: "\u2A13",
    scsim: "\u227F",
    Scy: "\u0421",
    scy: "\u0441",
    sdotb: "\u22A1",
    sdot: "\u22C5",
    sdote: "\u2A66",
    searhk: "\u2925",
    searr: "\u2198",
    seArr: "\u21D8",
    searrow: "\u2198",
    sect: "\xA7",
    semi: ";",
    seswar: "\u2929",
    setminus: "\u2216",
    setmn: "\u2216",
    sext: "\u2736",
    Sfr: "\u{1D516}",
    sfr: "\u{1D530}",
    sfrown: "\u2322",
    sharp: "\u266F",
    SHCHcy: "\u0429",
    shchcy: "\u0449",
    SHcy: "\u0428",
    shcy: "\u0448",
    ShortDownArrow: "\u2193",
    ShortLeftArrow: "\u2190",
    shortmid: "\u2223",
    shortparallel: "\u2225",
    ShortRightArrow: "\u2192",
    ShortUpArrow: "\u2191",
    shy: "\xAD",
    Sigma: "\u03A3",
    sigma: "\u03C3",
    sigmaf: "\u03C2",
    sigmav: "\u03C2",
    sim: "\u223C",
    simdot: "\u2A6A",
    sime: "\u2243",
    simeq: "\u2243",
    simg: "\u2A9E",
    simgE: "\u2AA0",
    siml: "\u2A9D",
    simlE: "\u2A9F",
    simne: "\u2246",
    simplus: "\u2A24",
    simrarr: "\u2972",
    slarr: "\u2190",
    SmallCircle: "\u2218",
    smallsetminus: "\u2216",
    smashp: "\u2A33",
    smeparsl: "\u29E4",
    smid: "\u2223",
    smile: "\u2323",
    smt: "\u2AAA",
    smte: "\u2AAC",
    smtes: "\u2AAC\uFE00",
    SOFTcy: "\u042C",
    softcy: "\u044C",
    solbar: "\u233F",
    solb: "\u29C4",
    sol: "/",
    Sopf: "\u{1D54A}",
    sopf: "\u{1D564}",
    spades: "\u2660",
    spadesuit: "\u2660",
    spar: "\u2225",
    sqcap: "\u2293",
    sqcaps: "\u2293\uFE00",
    sqcup: "\u2294",
    sqcups: "\u2294\uFE00",
    Sqrt: "\u221A",
    sqsub: "\u228F",
    sqsube: "\u2291",
    sqsubset: "\u228F",
    sqsubseteq: "\u2291",
    sqsup: "\u2290",
    sqsupe: "\u2292",
    sqsupset: "\u2290",
    sqsupseteq: "\u2292",
    square: "\u25A1",
    Square: "\u25A1",
    SquareIntersection: "\u2293",
    SquareSubset: "\u228F",
    SquareSubsetEqual: "\u2291",
    SquareSuperset: "\u2290",
    SquareSupersetEqual: "\u2292",
    SquareUnion: "\u2294",
    squarf: "\u25AA",
    squ: "\u25A1",
    squf: "\u25AA",
    srarr: "\u2192",
    Sscr: "\u{1D4AE}",
    sscr: "\u{1D4C8}",
    ssetmn: "\u2216",
    ssmile: "\u2323",
    sstarf: "\u22C6",
    Star: "\u22C6",
    star: "\u2606",
    starf: "\u2605",
    straightepsilon: "\u03F5",
    straightphi: "\u03D5",
    strns: "\xAF",
    sub: "\u2282",
    Sub: "\u22D0",
    subdot: "\u2ABD",
    subE: "\u2AC5",
    sube: "\u2286",
    subedot: "\u2AC3",
    submult: "\u2AC1",
    subnE: "\u2ACB",
    subne: "\u228A",
    subplus: "\u2ABF",
    subrarr: "\u2979",
    subset: "\u2282",
    Subset: "\u22D0",
    subseteq: "\u2286",
    subseteqq: "\u2AC5",
    SubsetEqual: "\u2286",
    subsetneq: "\u228A",
    subsetneqq: "\u2ACB",
    subsim: "\u2AC7",
    subsub: "\u2AD5",
    subsup: "\u2AD3",
    succapprox: "\u2AB8",
    succ: "\u227B",
    succcurlyeq: "\u227D",
    Succeeds: "\u227B",
    SucceedsEqual: "\u2AB0",
    SucceedsSlantEqual: "\u227D",
    SucceedsTilde: "\u227F",
    succeq: "\u2AB0",
    succnapprox: "\u2ABA",
    succneqq: "\u2AB6",
    succnsim: "\u22E9",
    succsim: "\u227F",
    SuchThat: "\u220B",
    sum: "\u2211",
    Sum: "\u2211",
    sung: "\u266A",
    sup1: "\xB9",
    sup2: "\xB2",
    sup3: "\xB3",
    sup: "\u2283",
    Sup: "\u22D1",
    supdot: "\u2ABE",
    supdsub: "\u2AD8",
    supE: "\u2AC6",
    supe: "\u2287",
    supedot: "\u2AC4",
    Superset: "\u2283",
    SupersetEqual: "\u2287",
    suphsol: "\u27C9",
    suphsub: "\u2AD7",
    suplarr: "\u297B",
    supmult: "\u2AC2",
    supnE: "\u2ACC",
    supne: "\u228B",
    supplus: "\u2AC0",
    supset: "\u2283",
    Supset: "\u22D1",
    supseteq: "\u2287",
    supseteqq: "\u2AC6",
    supsetneq: "\u228B",
    supsetneqq: "\u2ACC",
    supsim: "\u2AC8",
    supsub: "\u2AD4",
    supsup: "\u2AD6",
    swarhk: "\u2926",
    swarr: "\u2199",
    swArr: "\u21D9",
    swarrow: "\u2199",
    swnwar: "\u292A",
    szlig: "\xDF",
    Tab: "	",
    target: "\u2316",
    Tau: "\u03A4",
    tau: "\u03C4",
    tbrk: "\u23B4",
    Tcaron: "\u0164",
    tcaron: "\u0165",
    Tcedil: "\u0162",
    tcedil: "\u0163",
    Tcy: "\u0422",
    tcy: "\u0442",
    tdot: "\u20DB",
    telrec: "\u2315",
    Tfr: "\u{1D517}",
    tfr: "\u{1D531}",
    there4: "\u2234",
    therefore: "\u2234",
    Therefore: "\u2234",
    Theta: "\u0398",
    theta: "\u03B8",
    thetasym: "\u03D1",
    thetav: "\u03D1",
    thickapprox: "\u2248",
    thicksim: "\u223C",
    ThickSpace: "\u205F\u200A",
    ThinSpace: "\u2009",
    thinsp: "\u2009",
    thkap: "\u2248",
    thksim: "\u223C",
    THORN: "\xDE",
    thorn: "\xFE",
    tilde: "\u02DC",
    Tilde: "\u223C",
    TildeEqual: "\u2243",
    TildeFullEqual: "\u2245",
    TildeTilde: "\u2248",
    timesbar: "\u2A31",
    timesb: "\u22A0",
    times: "\xD7",
    timesd: "\u2A30",
    tint: "\u222D",
    toea: "\u2928",
    topbot: "\u2336",
    topcir: "\u2AF1",
    top: "\u22A4",
    Topf: "\u{1D54B}",
    topf: "\u{1D565}",
    topfork: "\u2ADA",
    tosa: "\u2929",
    tprime: "\u2034",
    trade: "\u2122",
    TRADE: "\u2122",
    triangle: "\u25B5",
    triangledown: "\u25BF",
    triangleleft: "\u25C3",
    trianglelefteq: "\u22B4",
    triangleq: "\u225C",
    triangleright: "\u25B9",
    trianglerighteq: "\u22B5",
    tridot: "\u25EC",
    trie: "\u225C",
    triminus: "\u2A3A",
    TripleDot: "\u20DB",
    triplus: "\u2A39",
    trisb: "\u29CD",
    tritime: "\u2A3B",
    trpezium: "\u23E2",
    Tscr: "\u{1D4AF}",
    tscr: "\u{1D4C9}",
    TScy: "\u0426",
    tscy: "\u0446",
    TSHcy: "\u040B",
    tshcy: "\u045B",
    Tstrok: "\u0166",
    tstrok: "\u0167",
    twixt: "\u226C",
    twoheadleftarrow: "\u219E",
    twoheadrightarrow: "\u21A0",
    Uacute: "\xDA",
    uacute: "\xFA",
    uarr: "\u2191",
    Uarr: "\u219F",
    uArr: "\u21D1",
    Uarrocir: "\u2949",
    Ubrcy: "\u040E",
    ubrcy: "\u045E",
    Ubreve: "\u016C",
    ubreve: "\u016D",
    Ucirc: "\xDB",
    ucirc: "\xFB",
    Ucy: "\u0423",
    ucy: "\u0443",
    udarr: "\u21C5",
    Udblac: "\u0170",
    udblac: "\u0171",
    udhar: "\u296E",
    ufisht: "\u297E",
    Ufr: "\u{1D518}",
    ufr: "\u{1D532}",
    Ugrave: "\xD9",
    ugrave: "\xF9",
    uHar: "\u2963",
    uharl: "\u21BF",
    uharr: "\u21BE",
    uhblk: "\u2580",
    ulcorn: "\u231C",
    ulcorner: "\u231C",
    ulcrop: "\u230F",
    ultri: "\u25F8",
    Umacr: "\u016A",
    umacr: "\u016B",
    uml: "\xA8",
    UnderBar: "_",
    UnderBrace: "\u23DF",
    UnderBracket: "\u23B5",
    UnderParenthesis: "\u23DD",
    Union: "\u22C3",
    UnionPlus: "\u228E",
    Uogon: "\u0172",
    uogon: "\u0173",
    Uopf: "\u{1D54C}",
    uopf: "\u{1D566}",
    UpArrowBar: "\u2912",
    uparrow: "\u2191",
    UpArrow: "\u2191",
    Uparrow: "\u21D1",
    UpArrowDownArrow: "\u21C5",
    updownarrow: "\u2195",
    UpDownArrow: "\u2195",
    Updownarrow: "\u21D5",
    UpEquilibrium: "\u296E",
    upharpoonleft: "\u21BF",
    upharpoonright: "\u21BE",
    uplus: "\u228E",
    UpperLeftArrow: "\u2196",
    UpperRightArrow: "\u2197",
    upsi: "\u03C5",
    Upsi: "\u03D2",
    upsih: "\u03D2",
    Upsilon: "\u03A5",
    upsilon: "\u03C5",
    UpTeeArrow: "\u21A5",
    UpTee: "\u22A5",
    upuparrows: "\u21C8",
    urcorn: "\u231D",
    urcorner: "\u231D",
    urcrop: "\u230E",
    Uring: "\u016E",
    uring: "\u016F",
    urtri: "\u25F9",
    Uscr: "\u{1D4B0}",
    uscr: "\u{1D4CA}",
    utdot: "\u22F0",
    Utilde: "\u0168",
    utilde: "\u0169",
    utri: "\u25B5",
    utrif: "\u25B4",
    uuarr: "\u21C8",
    Uuml: "\xDC",
    uuml: "\xFC",
    uwangle: "\u29A7",
    vangrt: "\u299C",
    varepsilon: "\u03F5",
    varkappa: "\u03F0",
    varnothing: "\u2205",
    varphi: "\u03D5",
    varpi: "\u03D6",
    varpropto: "\u221D",
    varr: "\u2195",
    vArr: "\u21D5",
    varrho: "\u03F1",
    varsigma: "\u03C2",
    varsubsetneq: "\u228A\uFE00",
    varsubsetneqq: "\u2ACB\uFE00",
    varsupsetneq: "\u228B\uFE00",
    varsupsetneqq: "\u2ACC\uFE00",
    vartheta: "\u03D1",
    vartriangleleft: "\u22B2",
    vartriangleright: "\u22B3",
    vBar: "\u2AE8",
    Vbar: "\u2AEB",
    vBarv: "\u2AE9",
    Vcy: "\u0412",
    vcy: "\u0432",
    vdash: "\u22A2",
    vDash: "\u22A8",
    Vdash: "\u22A9",
    VDash: "\u22AB",
    Vdashl: "\u2AE6",
    veebar: "\u22BB",
    vee: "\u2228",
    Vee: "\u22C1",
    veeeq: "\u225A",
    vellip: "\u22EE",
    verbar: "|",
    Verbar: "\u2016",
    vert: "|",
    Vert: "\u2016",
    VerticalBar: "\u2223",
    VerticalLine: "|",
    VerticalSeparator: "\u2758",
    VerticalTilde: "\u2240",
    VeryThinSpace: "\u200A",
    Vfr: "\u{1D519}",
    vfr: "\u{1D533}",
    vltri: "\u22B2",
    vnsub: "\u2282\u20D2",
    vnsup: "\u2283\u20D2",
    Vopf: "\u{1D54D}",
    vopf: "\u{1D567}",
    vprop: "\u221D",
    vrtri: "\u22B3",
    Vscr: "\u{1D4B1}",
    vscr: "\u{1D4CB}",
    vsubnE: "\u2ACB\uFE00",
    vsubne: "\u228A\uFE00",
    vsupnE: "\u2ACC\uFE00",
    vsupne: "\u228B\uFE00",
    Vvdash: "\u22AA",
    vzigzag: "\u299A",
    Wcirc: "\u0174",
    wcirc: "\u0175",
    wedbar: "\u2A5F",
    wedge: "\u2227",
    Wedge: "\u22C0",
    wedgeq: "\u2259",
    weierp: "\u2118",
    Wfr: "\u{1D51A}",
    wfr: "\u{1D534}",
    Wopf: "\u{1D54E}",
    wopf: "\u{1D568}",
    wp: "\u2118",
    wr: "\u2240",
    wreath: "\u2240",
    Wscr: "\u{1D4B2}",
    wscr: "\u{1D4CC}",
    xcap: "\u22C2",
    xcirc: "\u25EF",
    xcup: "\u22C3",
    xdtri: "\u25BD",
    Xfr: "\u{1D51B}",
    xfr: "\u{1D535}",
    xharr: "\u27F7",
    xhArr: "\u27FA",
    Xi: "\u039E",
    xi: "\u03BE",
    xlarr: "\u27F5",
    xlArr: "\u27F8",
    xmap: "\u27FC",
    xnis: "\u22FB",
    xodot: "\u2A00",
    Xopf: "\u{1D54F}",
    xopf: "\u{1D569}",
    xoplus: "\u2A01",
    xotime: "\u2A02",
    xrarr: "\u27F6",
    xrArr: "\u27F9",
    Xscr: "\u{1D4B3}",
    xscr: "\u{1D4CD}",
    xsqcup: "\u2A06",
    xuplus: "\u2A04",
    xutri: "\u25B3",
    xvee: "\u22C1",
    xwedge: "\u22C0",
    Yacute: "\xDD",
    yacute: "\xFD",
    YAcy: "\u042F",
    yacy: "\u044F",
    Ycirc: "\u0176",
    ycirc: "\u0177",
    Ycy: "\u042B",
    ycy: "\u044B",
    yen: "\xA5",
    Yfr: "\u{1D51C}",
    yfr: "\u{1D536}",
    YIcy: "\u0407",
    yicy: "\u0457",
    Yopf: "\u{1D550}",
    yopf: "\u{1D56A}",
    Yscr: "\u{1D4B4}",
    yscr: "\u{1D4CE}",
    YUcy: "\u042E",
    yucy: "\u044E",
    yuml: "\xFF",
    Yuml: "\u0178",
    Zacute: "\u0179",
    zacute: "\u017A",
    Zcaron: "\u017D",
    zcaron: "\u017E",
    Zcy: "\u0417",
    zcy: "\u0437",
    Zdot: "\u017B",
    zdot: "\u017C",
    zeetrf: "\u2128",
    ZeroWidthSpace: "\u200B",
    Zeta: "\u0396",
    zeta: "\u03B6",
    zfr: "\u{1D537}",
    Zfr: "\u2128",
    ZHcy: "\u0416",
    zhcy: "\u0436",
    zigrarr: "\u21DD",
    zopf: "\u{1D56B}",
    Zopf: "\u2124",
    Zscr: "\u{1D4B5}",
    zscr: "\u{1D4CF}",
    zwj: "\u200D",
    zwnj: "\u200C"
  };
});
var sn2 = k5((Pf, ja2) => {
  ja2.exports = {
    Aacute: "\xC1",
    aacute: "\xE1",
    Acirc: "\xC2",
    acirc: "\xE2",
    acute: "\xB4",
    AElig: "\xC6",
    aelig: "\xE6",
    Agrave: "\xC0",
    agrave: "\xE0",
    amp: "&",
    AMP: "&",
    Aring: "\xC5",
    aring: "\xE5",
    Atilde: "\xC3",
    atilde: "\xE3",
    Auml: "\xC4",
    auml: "\xE4",
    brvbar: "\xA6",
    Ccedil: "\xC7",
    ccedil: "\xE7",
    cedil: "\xB8",
    cent: "\xA2",
    copy: "\xA9",
    COPY: "\xA9",
    curren: "\xA4",
    deg: "\xB0",
    divide: "\xF7",
    Eacute: "\xC9",
    eacute: "\xE9",
    Ecirc: "\xCA",
    ecirc: "\xEA",
    Egrave: "\xC8",
    egrave: "\xE8",
    ETH: "\xD0",
    eth: "\xF0",
    Euml: "\xCB",
    euml: "\xEB",
    frac12: "\xBD",
    frac14: "\xBC",
    frac34: "\xBE",
    gt: ">",
    GT: ">",
    Iacute: "\xCD",
    iacute: "\xED",
    Icirc: "\xCE",
    icirc: "\xEE",
    iexcl: "\xA1",
    Igrave: "\xCC",
    igrave: "\xEC",
    iquest: "\xBF",
    Iuml: "\xCF",
    iuml: "\xEF",
    laquo: "\xAB",
    lt: "<",
    LT: "<",
    macr: "\xAF",
    micro: "\xB5",
    middot: "\xB7",
    nbsp: "\xA0",
    not: "\xAC",
    Ntilde: "\xD1",
    ntilde: "\xF1",
    Oacute: "\xD3",
    oacute: "\xF3",
    Ocirc: "\xD4",
    ocirc: "\xF4",
    Ograve: "\xD2",
    ograve: "\xF2",
    ordf: "\xAA",
    ordm: "\xBA",
    Oslash: "\xD8",
    oslash: "\xF8",
    Otilde: "\xD5",
    otilde: "\xF5",
    Ouml: "\xD6",
    ouml: "\xF6",
    para: "\xB6",
    plusmn: "\xB1",
    pound: "\xA3",
    quot: '"',
    QUOT: '"',
    raquo: "\xBB",
    reg: "\xAE",
    REG: "\xAE",
    sect: "\xA7",
    shy: "\xAD",
    sup1: "\xB9",
    sup2: "\xB2",
    sup3: "\xB3",
    szlig: "\xDF",
    THORN: "\xDE",
    thorn: "\xFE",
    times: "\xD7",
    Uacute: "\xDA",
    uacute: "\xFA",
    Ucirc: "\xDB",
    ucirc: "\xFB",
    Ugrave: "\xD9",
    ugrave: "\xF9",
    uml: "\xA8",
    Uuml: "\xDC",
    uuml: "\xFC",
    Yacute: "\xDD",
    yacute: "\xFD",
    yen: "\xA5",
    yuml: "\xFF"
  };
});
var bt2 = k5((Ff, La2) => {
  La2.exports = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };
});
var an2 = k5((If, Na) => {
  Na.exports = {
    "0": 65533,
    "128": 8364,
    "130": 8218,
    "131": 402,
    "132": 8222,
    "133": 8230,
    "134": 8224,
    "135": 8225,
    "136": 710,
    "137": 8240,
    "138": 352,
    "139": 8249,
    "140": 338,
    "142": 381,
    "145": 8216,
    "146": 8217,
    "147": 8220,
    "148": 8221,
    "149": 8226,
    "150": 8211,
    "151": 8212,
    "152": 732,
    "153": 8482,
    "154": 353,
    "155": 8250,
    "156": 339,
    "158": 382,
    "159": 376
  };
});
var cn3 = k5((ze3) => {
  "use strict";
  var Ma2 = ze3 && ze3.__importDefault || function(r4) {
    return r4 && r4.__esModule ? r4 : { default: r4 };
  };
  Object.defineProperty(ze3, "__esModule", { value: true });
  var ln2 = Ma2(an2()), _a2 = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.fromCodePoint || function(r4) {
      var e3 = "";
      return r4 > 65535 && (r4 -= 65536, e3 += String.fromCharCode(r4 >>> 10 & 1023 | 55296), r4 = 56320 | r4 & 1023), e3 += String.fromCharCode(r4), e3;
    }
  );
  function qa2(r4) {
    return r4 >= 55296 && r4 <= 57343 || r4 > 1114111 ? "\uFFFD" : (r4 in ln2.default && (r4 = ln2.default[r4]), _a2(r4));
  }
  s4(qa2, "decodeCodePoint");
  ze3.default = qa2;
});
var Et2 = k5(($7) => {
  "use strict";
  var dr3 = $7 && $7.__importDefault || function(r4) {
    return r4 && r4.__esModule ? r4 : { default: r4 };
  };
  Object.defineProperty($7, "__esModule", { value: true });
  $7.decodeHTML = $7.decodeHTMLStrict = $7.decodeXML = void 0;
  var Tt3 = dr3(St2()), Ua2 = dr3(sn2()), Ga2 = dr3(bt2()), dn2 = dr3(cn3()), Ba2 = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
  $7.decodeXML = un2(Ga2.default);
  $7.decodeHTMLStrict = un2(Tt3.default);
  function un2(r4) {
    var e3 = fn2(r4);
    return function(t4) {
      return String(t4).replace(Ba2, e3);
    };
  }
  s4(un2, "getStrictDecoder");
  var pn2 = /* @__PURE__ */ s4(function(r4, e3) {
    return r4 < e3 ? 1 : -1;
  }, "sorter");
  $7.decodeHTML = function() {
    for (var r4 = Object.keys(Ua2.default).sort(pn2), e3 = Object.keys(Tt3.default).sort(pn2), t4 = 0, o4 = 0; t4 < e3.length; t4++)
      r4[o4] === e3[t4] ? (e3[t4] += ";?", o4++) : e3[t4] += ";";
    var n3 = new RegExp("&(?:" + e3.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"), i3 = fn2(Tt3.default);
    function a4(l2) {
      return l2.substr(-1) !== ";" && (l2 += ";"), i3(l2);
    }
    return s4(a4, "replacer"), function(l2) {
      return String(l2).replace(n3, a4);
    };
  }();
  function fn2(r4) {
    return /* @__PURE__ */ s4(function(t4) {
      if (t4.charAt(1) === "#") {
        var o4 = t4.charAt(2);
        return o4 === "X" || o4 === "x" ? dn2.default(parseInt(t4.substr(3), 16)) : dn2.default(parseInt(t4.substr(2), 10));
      }
      return r4[t4.slice(1, -1)] || t4;
    }, "replace");
  }
  s4(fn2, "getReplacer");
});
var xt2 = k5((_6) => {
  "use strict";
  var yn3 = _6 && _6.__importDefault || function(r4) {
    return r4 && r4.__esModule ? r4 : { default: r4 };
  };
  Object.defineProperty(_6, "__esModule", { value: true });
  _6.escapeUTF8 = _6.escape = _6.encodeNonAsciiHTML = _6.encodeHTML = _6.encodeXML = void 0;
  var za2 = yn3(bt2()), hn2 = gn2(za2.default), mn2 = Sn3(hn2);
  _6.encodeXML = En3(hn2);
  var Va2 = yn3(St2()), Rt3 = gn2(Va2.default), Ha2 = Sn3(Rt3);
  _6.encodeHTML = $a2(Rt3, Ha2);
  _6.encodeNonAsciiHTML = En3(Rt3);
  function gn2(r4) {
    return Object.keys(r4).sort().reduce(function(e3, t4) {
      return e3[r4[t4]] = "&" + t4 + ";", e3;
    }, {});
  }
  s4(gn2, "getInverseObj");
  function Sn3(r4) {
    for (var e3 = [], t4 = [], o4 = 0, n3 = Object.keys(r4); o4 < n3.length; o4++) {
      var i3 = n3[o4];
      i3.length === 1 ? e3.push("\\" + i3) : t4.push(i3);
    }
    e3.sort();
    for (var a4 = 0; a4 < e3.length - 1; a4++) {
      for (var l2 = a4; l2 < e3.length - 1 && e3[l2].charCodeAt(1) + 1 === e3[l2 + 1].charCodeAt(1); )
        l2 += 1;
      var c3 = 1 + l2 - a4;
      c3 < 3 || e3.splice(a4, c3, e3[a4] + "-" + e3[l2]);
    }
    return t4.unshift("[" + e3.join("") + "]"), new RegExp(t4.join("|"), "g");
  }
  s4(Sn3, "getInverseReplacer");
  var bn2 = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g, Wa = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.prototype.codePointAt != null ? (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      function(r4) {
        return r4.codePointAt(0);
      }
    ) : (
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      function(r4) {
        return (r4.charCodeAt(0) - 55296) * 1024 + r4.charCodeAt(1) - 56320 + 65536;
      }
    )
  );
  function pr3(r4) {
    return "&#x" + (r4.length > 1 ? Wa(r4) : r4.charCodeAt(0)).toString(16).toUpperCase() + ";";
  }
  s4(pr3, "singleCharReplacer");
  function $a2(r4, e3) {
    return function(t4) {
      return t4.replace(e3, function(o4) {
        return r4[o4];
      }).replace(bn2, pr3);
    };
  }
  s4($a2, "getInverse");
  var Tn3 = new RegExp(mn2.source + "|" + bn2.source, "g");
  function Ya2(r4) {
    return r4.replace(Tn3, pr3);
  }
  s4(Ya2, "escape");
  _6.escape = Ya2;
  function Ka2(r4) {
    return r4.replace(mn2, pr3);
  }
  s4(Ka2, "escapeUTF8");
  _6.escapeUTF8 = Ka2;
  function En3(r4) {
    return function(e3) {
      return e3.replace(Tn3, function(t4) {
        return r4[t4] || pr3(t4);
      });
    };
  }
  s4(En3, "getASCIIEncoder");
});
var xn2 = k5((v5) => {
  "use strict";
  Object.defineProperty(v5, "__esModule", { value: true });
  v5.decodeXMLStrict = v5.decodeHTML5Strict = v5.decodeHTML4Strict = v5.decodeHTML5 = v5.decodeHTML4 = v5.decodeHTMLStrict = v5.decodeHTML = v5.decodeXML = v5.encodeHTML5 = v5.encodeHTML4 = v5.escapeUTF8 = v5.escape = v5.encodeNonAsciiHTML = v5.encodeHTML = v5.encodeXML = v5.encode = v5.decodeStrict = v5.decode = void 0;
  var ur2 = Et2(), Rn3 = xt2();
  function Xa2(r4, e3) {
    return (!e3 || e3 <= 0 ? ur2.decodeXML : ur2.decodeHTML)(r4);
  }
  s4(Xa2, "decode");
  v5.decode = Xa2;
  function Ja2(r4, e3) {
    return (!e3 || e3 <= 0 ? ur2.decodeXML : ur2.decodeHTMLStrict)(r4);
  }
  s4(Ja2, "decodeStrict");
  v5.decodeStrict = Ja2;
  function Qa2(r4, e3) {
    return (!e3 || e3 <= 0 ? Rn3.encodeXML : Rn3.encodeHTML)(r4);
  }
  s4(Qa2, "encode");
  v5.encode = Qa2;
  var ue3 = xt2();
  Object.defineProperty(v5, "encodeXML", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return ue3.encodeXML;
  }, "get") });
  Object.defineProperty(v5, "encodeHTML", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return ue3.encodeHTML;
  }, "get") });
  Object.defineProperty(v5, "encodeNonAsciiHTML", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return ue3.encodeNonAsciiHTML;
  }, "get") });
  Object.defineProperty(v5, "escape", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return ue3.escape;
  }, "get") });
  Object.defineProperty(v5, "escapeUTF8", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return ue3.escapeUTF8;
  }, "get") });
  Object.defineProperty(v5, "encodeHTML4", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return ue3.encodeHTML;
  }, "get") });
  Object.defineProperty(v5, "encodeHTML5", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return ue3.encodeHTML;
  }, "get") });
  var oe3 = Et2();
  Object.defineProperty(v5, "decodeXML", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return oe3.decodeXML;
  }, "get") });
  Object.defineProperty(v5, "decodeHTML", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return oe3.decodeHTML;
  }, "get") });
  Object.defineProperty(v5, "decodeHTMLStrict", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return oe3.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(v5, "decodeHTML4", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return oe3.decodeHTML;
  }, "get") });
  Object.defineProperty(v5, "decodeHTML5", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return oe3.decodeHTML;
  }, "get") });
  Object.defineProperty(v5, "decodeHTML4Strict", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return oe3.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(v5, "decodeHTML5Strict", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return oe3.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(v5, "decodeXMLStrict", { enumerable: true, get: /* @__PURE__ */ s4(function() {
    return oe3.decodeXML;
  }, "get") });
});
var jn2 = k5((qf, kn2) => {
  "use strict";
  function Za2(r4, e3) {
    if (!(r4 instanceof e3))
      throw new TypeError("Cannot call a class as a function");
  }
  s4(Za2, "_classCallCheck");
  function wn3(r4, e3) {
    for (var t4 = 0; t4 < e3.length; t4++) {
      var o4 = e3[t4];
      o4.enumerable = o4.enumerable || false, o4.configurable = true, "value" in o4 && (o4.writable = true), Object.defineProperty(r4, o4.key, o4);
    }
  }
  s4(wn3, "_defineProperties");
  function el(r4, e3, t4) {
    return e3 && wn3(r4.prototype, e3), t4 && wn3(r4, t4), r4;
  }
  s4(el, "_createClass");
  function In3(r4, e3) {
    var t4 = typeof Symbol < "u" && r4[Symbol.iterator] || r4["@@iterator"];
    if (!t4) {
      if (Array.isArray(r4) || (t4 = rl(r4)) || e3 && r4 && typeof r4.length == "number") {
        t4 && (r4 = t4);
        var o4 = 0, n3 = /* @__PURE__ */ s4(function() {
        }, "F");
        return { s: n3, n: /* @__PURE__ */ s4(function() {
          return o4 >= r4.length ? { done: true } : { done: false, value: r4[o4++] };
        }, "n"), e: /* @__PURE__ */ s4(function(d2) {
          throw d2;
        }, "e"), f: n3 };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var i3 = true, a4 = false, l2;
    return { s: /* @__PURE__ */ s4(function() {
      t4 = t4.call(r4);
    }, "s"), n: /* @__PURE__ */ s4(function() {
      var d2 = t4.next();
      return i3 = d2.done, d2;
    }, "n"), e: /* @__PURE__ */ s4(function(d2) {
      a4 = true, l2 = d2;
    }, "e"), f: /* @__PURE__ */ s4(function() {
      try {
        !i3 && t4.return != null && t4.return();
      } finally {
        if (a4) throw l2;
      }
    }, "f") };
  }
  s4(In3, "_createForOfIteratorHelper");
  function rl(r4, e3) {
    if (r4) {
      if (typeof r4 == "string") return vn3(r4, e3);
      var t4 = Object.prototype.toString.call(r4).slice(8, -1);
      if (t4 === "Object" && r4.constructor && (t4 = r4.constructor.name), t4 === "Map" || t4 === "Set") return Array.from(r4);
      if (t4 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t4)) return vn3(r4, e3);
    }
  }
  s4(rl, "_unsupportedIterableToArray");
  function vn3(r4, e3) {
    (e3 == null || e3 > r4.length) && (e3 = r4.length);
    for (var t4 = 0, o4 = new Array(e3); t4 < e3; t4++)
      o4[t4] = r4[t4];
    return o4;
  }
  s4(vn3, "_arrayLikeToArray");
  var tl = xn2(), An3 = {
    fg: "#FFF",
    bg: "#000",
    newline: false,
    escapeXML: false,
    stream: false,
    colors: ol()
  };
  function ol() {
    var r4 = {
      0: "#000",
      1: "#A00",
      2: "#0A0",
      3: "#A50",
      4: "#00A",
      5: "#A0A",
      6: "#0AA",
      7: "#AAA",
      8: "#555",
      9: "#F55",
      10: "#5F5",
      11: "#FF5",
      12: "#55F",
      13: "#F5F",
      14: "#5FF",
      15: "#FFF"
    };
    return fr3(0, 5).forEach(function(e3) {
      fr3(0, 5).forEach(function(t4) {
        fr3(0, 5).forEach(function(o4) {
          return nl(e3, t4, o4, r4);
        });
      });
    }), fr3(0, 23).forEach(function(e3) {
      var t4 = e3 + 232, o4 = On3(e3 * 10 + 8);
      r4[t4] = "#" + o4 + o4 + o4;
    }), r4;
  }
  s4(ol, "getDefaultColors");
  function nl(r4, e3, t4, o4) {
    var n3 = 16 + r4 * 36 + e3 * 6 + t4, i3 = r4 > 0 ? r4 * 40 + 55 : 0, a4 = e3 > 0 ? e3 * 40 + 55 : 0, l2 = t4 > 0 ? t4 * 40 + 55 : 0;
    o4[n3] = sl([i3, a4, l2]);
  }
  s4(nl, "setStyleColor");
  function On3(r4) {
    for (var e3 = r4.toString(16); e3.length < 2; )
      e3 = "0" + e3;
    return e3;
  }
  s4(On3, "toHexString");
  function sl(r4) {
    var e3 = [], t4 = In3(r4), o4;
    try {
      for (t4.s(); !(o4 = t4.n()).done; ) {
        var n3 = o4.value;
        e3.push(On3(n3));
      }
    } catch (i3) {
      t4.e(i3);
    } finally {
      t4.f();
    }
    return "#" + e3.join("");
  }
  s4(sl, "toColorHexString");
  function Cn3(r4, e3, t4, o4) {
    var n3;
    return e3 === "text" ? n3 = cl(t4, o4) : e3 === "display" ? n3 = al(r4, t4, o4) : e3 === "xterm256Foreground" ? n3 = hr3(r4, o4.colors[t4]) : e3 === "xterm256Background" ? n3 = mr2(r4, o4.colors[t4]) : e3 === "rgb" && (n3 = il(r4, t4)), n3;
  }
  s4(Cn3, "generateOutput");
  function il(r4, e3) {
    e3 = e3.substring(2).slice(0, -1);
    var t4 = +e3.substr(0, 2), o4 = e3.substring(5).split(";"), n3 = o4.map(function(i3) {
      return ("0" + Number(i3).toString(16)).substr(-2);
    }).join("");
    return yr3(r4, (t4 === 38 ? "color:#" : "background-color:#") + n3);
  }
  s4(il, "handleRgb");
  function al(r4, e3, t4) {
    e3 = parseInt(e3, 10);
    var o4 = {
      "-1": /* @__PURE__ */ s4(function() {
        return "<br/>";
      }, "_"),
      0: /* @__PURE__ */ s4(function() {
        return r4.length && Dn2(r4);
      }, "_"),
      1: /* @__PURE__ */ s4(function() {
        return ne(r4, "b");
      }, "_"),
      3: /* @__PURE__ */ s4(function() {
        return ne(r4, "i");
      }, "_"),
      4: /* @__PURE__ */ s4(function() {
        return ne(r4, "u");
      }, "_"),
      8: /* @__PURE__ */ s4(function() {
        return yr3(r4, "display:none");
      }, "_"),
      9: /* @__PURE__ */ s4(function() {
        return ne(r4, "strike");
      }, "_"),
      22: /* @__PURE__ */ s4(function() {
        return yr3(r4, "font-weight:normal;text-decoration:none;font-style:normal");
      }, "_"),
      23: /* @__PURE__ */ s4(function() {
        return Fn3(r4, "i");
      }, "_"),
      24: /* @__PURE__ */ s4(function() {
        return Fn3(r4, "u");
      }, "_"),
      39: /* @__PURE__ */ s4(function() {
        return hr3(r4, t4.fg);
      }, "_"),
      49: /* @__PURE__ */ s4(function() {
        return mr2(r4, t4.bg);
      }, "_"),
      53: /* @__PURE__ */ s4(function() {
        return yr3(r4, "text-decoration:overline");
      }, "_")
    }, n3;
    return o4[e3] ? n3 = o4[e3]() : 4 < e3 && e3 < 7 ? n3 = ne(r4, "blink") : 29 < e3 && e3 < 38 ? n3 = hr3(r4, t4.colors[e3 - 30]) : 39 < e3 && e3 < 48 ? n3 = mr2(r4, t4.colors[e3 - 40]) : 89 < e3 && e3 < 98 ? n3 = hr3(r4, t4.colors[8 + (e3 - 90)]) : 99 < e3 && e3 < 108 && (n3 = mr2(r4, t4.colors[8 + (e3 - 100)])), n3;
  }
  s4(al, "handleDisplay");
  function Dn2(r4) {
    var e3 = r4.slice(0);
    return r4.length = 0, e3.reverse().map(function(t4) {
      return "</" + t4 + ">";
    }).join("");
  }
  s4(Dn2, "resetStyles");
  function fr3(r4, e3) {
    for (var t4 = [], o4 = r4; o4 <= e3; o4++)
      t4.push(o4);
    return t4;
  }
  s4(fr3, "range");
  function ll(r4) {
    return function(e3) {
      return (r4 === null || e3.category !== r4) && r4 !== "all";
    };
  }
  s4(ll, "notCategory");
  function Pn3(r4) {
    r4 = parseInt(r4, 10);
    var e3 = null;
    return r4 === 0 ? e3 = "all" : r4 === 1 ? e3 = "bold" : 2 < r4 && r4 < 5 ? e3 = "underline" : 4 < r4 && r4 < 7 ? e3 = "blink" : r4 === 8 ? e3 = "hide" : r4 === 9 ? e3 = "strike" : 29 < r4 && r4 < 38 || r4 === 39 || 89 < r4 && r4 < 98 ? e3 = "foreground-color" : (39 < r4 && r4 < 48 || r4 === 49 || 99 < r4 && r4 < 108) && (e3 = "background-color"), e3;
  }
  s4(Pn3, "categoryForCode");
  function cl(r4, e3) {
    return e3.escapeXML ? tl.encodeXML(r4) : r4;
  }
  s4(cl, "pushText");
  function ne(r4, e3, t4) {
    return t4 || (t4 = ""), r4.push(e3), "<".concat(e3).concat(t4 ? ' style="'.concat(t4, '"') : "", ">");
  }
  s4(ne, "pushTag");
  function yr3(r4, e3) {
    return ne(r4, "span", e3);
  }
  s4(yr3, "pushStyle");
  function hr3(r4, e3) {
    return ne(r4, "span", "color:" + e3);
  }
  s4(hr3, "pushForegroundColor");
  function mr2(r4, e3) {
    return ne(r4, "span", "background-color:" + e3);
  }
  s4(mr2, "pushBackgroundColor");
  function Fn3(r4, e3) {
    var t4;
    if (r4.slice(-1)[0] === e3 && (t4 = r4.pop()), t4)
      return "</" + e3 + ">";
  }
  s4(Fn3, "closeTag");
  function dl(r4, e3, t4) {
    var o4 = false, n3 = 3;
    function i3() {
      return "";
    }
    s4(i3, "remove");
    function a4(x6, w5) {
      return t4("xterm256Foreground", w5), "";
    }
    s4(a4, "removeXterm256Foreground");
    function l2(x6, w5) {
      return t4("xterm256Background", w5), "";
    }
    s4(l2, "removeXterm256Background");
    function c3(x6) {
      return e3.newline ? t4("display", -1) : t4("text", x6), "";
    }
    s4(c3, "newline");
    function d2(x6, w5) {
      o4 = true, w5.trim().length === 0 && (w5 = "0"), w5 = w5.trimRight(";").split(";");
      var A4 = In3(w5), O5;
      try {
        for (A4.s(); !(O5 = A4.n()).done; ) {
          var N5 = O5.value;
          t4("display", N5);
        }
      } catch (U6) {
        A4.e(U6);
      } finally {
        A4.f();
      }
      return "";
    }
    s4(d2, "ansiMess");
    function p4(x6) {
      return t4("text", x6), "";
    }
    s4(p4, "realText");
    function u3(x6) {
      return t4("rgb", x6), "";
    }
    s4(u3, "rgb");
    var y4 = [{
      pattern: /^\x08+/,
      sub: i3
    }, {
      pattern: /^\x1b\[[012]?K/,
      sub: i3
    }, {
      pattern: /^\x1b\[\(B/,
      sub: i3
    }, {
      pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/,
      sub: u3
    }, {
      pattern: /^\x1b\[38;5;(\d+)m/,
      sub: a4
    }, {
      pattern: /^\x1b\[48;5;(\d+)m/,
      sub: l2
    }, {
      pattern: /^\n/,
      sub: c3
    }, {
      pattern: /^\r+\n/,
      sub: c3
    }, {
      pattern: /^\r/,
      sub: c3
    }, {
      pattern: /^\x1b\[((?:\d{1,3};?)+|)m/,
      sub: d2
    }, {
      // CSI n J
      // ED - Erase in Display Clears part of the screen.
      // If n is 0 (or missing), clear from cursor to end of screen.
      // If n is 1, clear from cursor to beginning of the screen.
      // If n is 2, clear entire screen (and moves cursor to upper left on DOS ANSI.SYS).
      // If n is 3, clear entire screen and delete all lines saved in the scrollback buffer
      //   (this feature was added for xterm and is supported by other terminal applications).
      pattern: /^\x1b\[\d?J/,
      sub: i3
    }, {
      // CSI n ; m f
      // HVP - Horizontal Vertical Position Same as CUP
      pattern: /^\x1b\[\d{0,3};\d{0,3}f/,
      sub: i3
    }, {
      // catch-all for CSI sequences?
      pattern: /^\x1b\[?[\d;]{0,3}/,
      sub: i3
    }, {
      /**
       * extracts real text - not containing:
       * - `\x1b' - ESC - escape (Ascii 27)
       * - '\x08' - BS - backspace (Ascii 8)
       * - `\n` - Newline - linefeed (LF) (ascii 10)
       * - `\r` - Windows Carriage Return (CR)
       */
      pattern: /^(([^\x1b\x08\r\n])+)/,
      sub: p4
    }];
    function m3(x6, w5) {
      w5 > n3 && o4 || (o4 = false, r4 = r4.replace(x6.pattern, x6.sub));
    }
    s4(m3, "process");
    var g2 = [], S6 = r4, h5 = S6.length;
    e: for (; h5 > 0; ) {
      for (var E3 = 0, R5 = 0, f6 = y4.length; R5 < f6; E3 = ++R5) {
        var b6 = y4[E3];
        if (m3(b6, E3), r4.length !== h5) {
          h5 = r4.length;
          continue e;
        }
      }
      if (r4.length === h5)
        break;
      g2.push(0), h5 = r4.length;
    }
    return g2;
  }
  s4(dl, "tokenize");
  function pl(r4, e3, t4) {
    return e3 !== "text" && (r4 = r4.filter(ll(Pn3(t4))), r4.push({
      token: e3,
      data: t4,
      category: Pn3(t4)
    })), r4;
  }
  s4(pl, "updateStickyStack");
  var ul = /* @__PURE__ */ function() {
    function r4(e3) {
      Za2(this, r4), e3 = e3 || {}, e3.colors && (e3.colors = Object.assign({}, An3.colors, e3.colors)), this.options = Object.assign({}, An3, e3), this.stack = [], this.stickyStack = [];
    }
    return s4(r4, "Filter"), el(r4, [{
      key: "toHtml",
      value: /* @__PURE__ */ s4(function(t4) {
        var o4 = this;
        t4 = typeof t4 == "string" ? [t4] : t4;
        var n3 = this.stack, i3 = this.options, a4 = [];
        return this.stickyStack.forEach(function(l2) {
          var c3 = Cn3(n3, l2.token, l2.data, i3);
          c3 && a4.push(c3);
        }), dl(t4.join(""), i3, function(l2, c3) {
          var d2 = Cn3(n3, l2, c3, i3);
          d2 && a4.push(d2), i3.stream && (o4.stickyStack = pl(o4.stickyStack, l2, c3));
        }), n3.length && a4.push(Dn2(n3)), a4.join("");
      }, "toHtml")
    }]), r4;
  }();
  kn2.exports = ul;
});
var I5 = (() => {
  let r4;
  return typeof window < "u" ? r4 = window : typeof globalThis < "u" ? r4 = globalThis : typeof global < "u" ? r4 = global : typeof self < "u" ? r4 = self : r4 = {}, r4;
})();
function Tr2() {
  let r4 = {
    setHandler: /* @__PURE__ */ s4(() => {
    }, "setHandler"),
    send: /* @__PURE__ */ s4(() => {
    }, "send")
  };
  return new B2({ transport: r4 });
}
s4(Tr2, "mockChannel");
var xr2 = class xr3 {
  constructor() {
    this.getChannel = /* @__PURE__ */ s4(() => {
      if (!this.channel) {
        let e3 = Tr2();
        return this.setChannel(e3), e3;
      }
      return this.channel;
    }, "getChannel");
    this.ready = /* @__PURE__ */ s4(() => this.promise, "ready");
    this.hasChannel = /* @__PURE__ */ s4(() => !!this.channel, "hasChannel");
    this.setChannel = /* @__PURE__ */ s4((e3) => {
      this.channel = e3, this.resolve();
    }, "setChannel");
    this.promise = new Promise((e3) => {
      this.resolve = () => e3(this.getChannel());
    });
  }
};
s4(xr2, "AddonStore");
var Rr2 = xr2;
var Er2 = "__STORYBOOK_ADDONS_PREVIEW";
function Xn2() {
  return I5[Er2] || (I5[Er2] = new Rr2()), I5[Er2];
}
s4(Xn2, "getAddonsStore");
var V5 = Xn2();
function Jn2(r4) {
  return r4;
}
s4(Jn2, "definePreview");
var Pr2 = class Pr3 {
  constructor() {
    this.hookListsMap = void 0;
    this.mountedDecorators = void 0;
    this.prevMountedDecorators = void 0;
    this.currentHooks = void 0;
    this.nextHookIndex = void 0;
    this.currentPhase = void 0;
    this.currentEffects = void 0;
    this.prevEffects = void 0;
    this.currentDecoratorName = void 0;
    this.hasUpdates = void 0;
    this.currentContext = void 0;
    this.renderListener = /* @__PURE__ */ s4((e3) => {
      var _a2;
      e3 === ((_a2 = this.currentContext) == null ? void 0 : _a2.id) && (this.triggerEffects(), this.currentContext = null, this.removeRenderListeners());
    }, "renderListener");
    this.init();
  }
  init() {
    this.hookListsMap = /* @__PURE__ */ new WeakMap(), this.mountedDecorators = /* @__PURE__ */ new Set(), this.prevMountedDecorators = /* @__PURE__ */ new Set(), this.currentHooks = [], this.nextHookIndex = 0, this.currentPhase = "NONE", this.currentEffects = [], this.prevEffects = [], this.currentDecoratorName = null, this.hasUpdates = false, this.currentContext = null;
  }
  clean() {
    this.prevEffects.forEach((e3) => {
      e3.destroy && e3.destroy();
    }), this.init(), this.removeRenderListeners();
  }
  getNextHook() {
    let e3 = this.currentHooks[this.nextHookIndex];
    return this.nextHookIndex += 1, e3;
  }
  triggerEffects() {
    this.prevEffects.forEach((e3) => {
      !this.currentEffects.includes(e3) && e3.destroy && e3.destroy();
    }), this.currentEffects.forEach((e3) => {
      this.prevEffects.includes(e3) || (e3.destroy = e3.create());
    }), this.prevEffects = this.currentEffects, this.currentEffects = [];
  }
  addRenderListeners() {
    this.removeRenderListeners(), V5.getChannel().on(X, this.renderListener);
  }
  removeRenderListeners() {
    V5.getChannel().removeListener(X, this.renderListener);
  }
};
s4(Pr2, "HooksContext");
var se2 = Pr2;
function It(r4) {
  let e3 = /* @__PURE__ */ s4((...t4) => {
    let { hooks: o4 } = typeof t4[0] == "function" ? t4[1] : t4[0], n3 = o4.currentPhase, i3 = o4.currentHooks, a4 = o4.nextHookIndex, l2 = o4.currentDecoratorName;
    o4.currentDecoratorName = r4.name, o4.prevMountedDecorators.has(r4) ? (o4.currentPhase = "UPDATE", o4.currentHooks = o4.hookListsMap.get(r4) || []) : (o4.currentPhase = "MOUNT", o4.currentHooks = [], o4.hookListsMap.set(r4, o4.currentHooks), o4.prevMountedDecorators.add(r4)), o4.nextHookIndex = 0;
    let c3 = I5.STORYBOOK_HOOKS_CONTEXT;
    I5.STORYBOOK_HOOKS_CONTEXT = o4;
    let d2 = r4(...t4);
    if (I5.STORYBOOK_HOOKS_CONTEXT = c3, o4.currentPhase === "UPDATE" && o4.getNextHook() != null)
      throw new Error(
        "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
      );
    return o4.currentPhase = n3, o4.currentHooks = i3, o4.nextHookIndex = a4, o4.currentDecoratorName = l2, d2;
  }, "hookified");
  return e3.originalFn = r4, e3;
}
s4(It, "hookify");
var wr2 = 0;
var ts = 25;
var vr2 = /* @__PURE__ */ s4((r4) => (e3, t4) => {
  let o4 = r4(
    It(e3),
    t4.map((n3) => It(n3))
  );
  return (n3) => {
    var _a2;
    let { hooks: i3 } = n3;
    (_a2 = i3.prevMountedDecorators) != null ? _a2 : i3.prevMountedDecorators = /* @__PURE__ */ new Set(), i3.mountedDecorators = /* @__PURE__ */ new Set([e3, ...t4]), i3.currentContext = n3, i3.hasUpdates = false;
    let a4 = o4(n3);
    for (wr2 = 1; i3.hasUpdates; )
      if (i3.hasUpdates = false, i3.currentEffects = [], a4 = o4(n3), wr2 += 1, wr2 > ts)
        throw new Error(
          "Too many re-renders. Storybook limits the number of renders to prevent an infinite loop."
        );
    return i3.addRenderListeners(), a4;
  };
}, "applyHooks");
var os = /* @__PURE__ */ s4((r4, e3) => r4.length === e3.length && r4.every((t4, o4) => t4 === e3[o4]), "areDepsEqual");
var Ar2 = /* @__PURE__ */ s4(
  () => new Error("Storybook preview hooks can only be called inside decorators and story functions."),
  "invalidHooksError"
);
function Ot2() {
  return I5.STORYBOOK_HOOKS_CONTEXT || null;
}
s4(Ot2, "getHooksContextOrNull");
function Cr2() {
  let r4 = Ot2();
  if (r4 == null)
    throw Ar2();
  return r4;
}
s4(Cr2, "getHooksContextOrThrow");
function ns(r4, e3, t4) {
  let o4 = Cr2();
  if (o4.currentPhase === "MOUNT") {
    t4 != null && !Array.isArray(t4) && s.warn(
      `${r4} received a final argument that is not an array (instead, received ${t4}). When specified, the final argument must be an array.`
    );
    let n3 = { name: r4, deps: t4 };
    return o4.currentHooks.push(n3), e3(n3), n3;
  }
  if (o4.currentPhase === "UPDATE") {
    let n3 = o4.getNextHook();
    if (n3 == null)
      throw new Error("Rendered more hooks than during the previous render.");
    return n3.name !== r4 && s.warn(
      `Storybook has detected a change in the order of Hooks${o4.currentDecoratorName ? ` called by ${o4.currentDecoratorName}` : ""}. This will lead to bugs and errors if not fixed.`
    ), t4 != null && n3.deps == null && s.warn(
      `${r4} received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.`
    ), t4 != null && n3.deps != null && t4.length !== n3.deps.length && s.warn(`The final argument passed to ${r4} changed size between renders. The order and size of this array must remain constant.
Previous: ${n3.deps}
Incoming: ${t4}`), (t4 == null || n3.deps == null || !os(t4, n3.deps)) && (e3(n3), n3.deps = t4), n3;
  }
  throw Ar2();
}
s4(ns, "useHook");
function He2(r4, e3, t4) {
  let { memoizedState: o4 } = ns(
    r4,
    (n3) => {
      n3.memoizedState = e3();
    },
    t4
  );
  return o4;
}
s4(He2, "useMemoLike");
function ss(r4, e3) {
  return He2("useMemo", r4, e3);
}
s4(ss, "useMemo");
function Oe2(r4, e3) {
  return He2("useCallback", () => r4, e3);
}
s4(Oe2, "useCallback");
function Dt2(r4, e3) {
  return He2(r4, () => ({ current: e3 }), []);
}
s4(Dt2, "useRefLike");
function is(r4) {
  return Dt2("useRef", r4);
}
s4(is, "useRef");
function as() {
  let r4 = Ot2();
  if (r4 != null && r4.currentPhase !== "NONE")
    r4.hasUpdates = true;
  else
    try {
      V5.getChannel().emit(L2);
    } catch (e3) {
      s.warn("State updates of Storybook preview hooks work only in browser");
    }
}
s4(as, "triggerUpdate");
function kt2(r4, e3) {
  let t4 = Dt2(
    r4,
    // @ts-expect-error S type should never be function, but there's no way to tell that to TypeScript
    typeof e3 == "function" ? e3() : e3
  ), o4 = /* @__PURE__ */ s4((n3) => {
    t4.current = typeof n3 == "function" ? n3(t4.current) : n3, as();
  }, "setState");
  return [t4.current, o4];
}
s4(kt2, "useStateLike");
function ls(r4) {
  return kt2("useState", r4);
}
s4(ls, "useState");
function cs(r4, e3, t4) {
  let o4 = t4 != null ? () => t4(e3) : e3, [n3, i3] = kt2("useReducer", o4);
  return [n3, /* @__PURE__ */ s4((l2) => i3((c3) => r4(c3, l2)), "dispatch")];
}
s4(cs, "useReducer");
function jt2(r4, e3) {
  let t4 = Cr2(), o4 = He2("useEffect", () => ({ create: r4 }), e3);
  t4.currentEffects.includes(o4) || t4.currentEffects.push(o4);
}
s4(jt2, "useEffect");
function ds(r4, e3 = []) {
  let t4 = V5.getChannel();
  return jt2(() => (Object.entries(r4).forEach(([o4, n3]) => t4.on(o4, n3)), () => {
    Object.entries(r4).forEach(
      ([o4, n3]) => t4.removeListener(o4, n3)
    );
  }), [...Object.keys(r4), ...e3]), Oe2(t4.emit.bind(t4), [t4]);
}
s4(ds, "useChannel");
function We2() {
  let { currentContext: r4 } = Cr2();
  if (r4 == null)
    throw Ar2();
  return r4;
}
s4(We2, "useStoryContext");
function ps(r4, e3) {
  var _a2;
  let { parameters: t4 } = We2();
  if (r4)
    return (_a2 = t4[r4]) != null ? _a2 : e3;
}
s4(ps, "useParameter");
function us() {
  let r4 = V5.getChannel(), { id: e3, args: t4 } = We2(), o4 = Oe2(
    (i3) => r4.emit(z, { storyId: e3, updatedArgs: i3 }),
    [r4, e3]
  ), n3 = Oe2(
    (i3) => r4.emit(W, { storyId: e3, argNames: i3 }),
    [r4, e3]
  );
  return [t4, o4, n3];
}
s4(us, "useArgs");
function fs() {
  let r4 = V5.getChannel(), { globals: e3 } = We2(), t4 = Oe2(
    (o4) => r4.emit(k, { globals: o4 }),
    [r4]
  );
  return [e3, t4];
}
s4(fs, "useGlobals");
function P6(r4) {
  for (var e3 = [], t4 = 1; t4 < arguments.length; t4++)
    e3[t4 - 1] = arguments[t4];
  var o4 = Array.from(typeof r4 == "string" ? [r4] : r4);
  o4[o4.length - 1] = o4[o4.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var n3 = o4.reduce(function(l2, c3) {
    var d2 = c3.match(/\n([\t ]+|(?!\s).)/g);
    return d2 ? l2.concat(d2.map(function(p4) {
      var u3, y4;
      return (y4 = (u3 = p4.match(/[\t ]/g)) === null || u3 === void 0 ? void 0 : u3.length) !== null && y4 !== void 0 ? y4 : 0;
    })) : l2;
  }, []);
  if (n3.length) {
    var i3 = new RegExp(`
[	 ]{` + Math.min.apply(Math, n3) + "}", "g");
    o4 = o4.map(function(l2) {
      return l2.replace(i3, `
`);
    });
  }
  o4[0] = o4[0].replace(/^\r?\n/, "");
  var a4 = o4[0];
  return e3.forEach(function(l2, c3) {
    var d2 = a4.match(/(?:^|\n)( *)$/), p4 = d2 ? d2[1] : "", u3 = l2;
    typeof l2 == "string" && l2.includes(`
`) && (u3 = String(l2).split(`
`).map(function(y4, m3) {
      return m3 === 0 ? y4 : "" + p4 + y4;
    }).join(`
`)), a4 += u3 + o4[c3 + 1];
  }), a4;
}
s4(P6, "dedent");
var Lt2 = P6;
var Fr2 = /* @__PURE__ */ new Map();
var hs = "UNIVERSAL_STORE:";
var q4 = {
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED"
};
var T5 = class T6 {
  constructor(e3, t4) {
    var _a2, _b, _c;
    this.debugging = false;
    this.listeners = /* @__PURE__ */ new Map([["*", /* @__PURE__ */ new Set()]]);
    this.getState = /* @__PURE__ */ s4(() => (this.debug("getState", { state: this.state }), this.state), "getState");
    this.subscribe = /* @__PURE__ */ s4((e4, t5) => {
      let o4 = typeof e4 == "function", n3 = o4 ? "*" : e4, i3 = o4 ? e4 : t5;
      if (this.debug("subscribe", { eventType: n3, listener: i3 }), !i3)
        throw new TypeError(
          `Missing first subscribe argument, or second if first is the event type, when subscribing to a UniversalStore with id '${this.id}'`
        );
      return this.listeners.has(n3) || this.listeners.set(n3, /* @__PURE__ */ new Set()), this.listeners.get(n3).add(i3), () => {
        var _a3;
        this.debug("unsubscribe", { eventType: n3, listener: i3 }), this.listeners.has(n3) && (this.listeners.get(n3).delete(i3), ((_a3 = this.listeners.get(n3)) == null ? void 0 : _a3.size) === 0 && this.listeners.delete(n3));
      };
    }, "subscribe");
    this.send = /* @__PURE__ */ s4((e4) => {
      if (this.debug("send", { event: e4 }), this.status !== T6.Status.READY)
        throw new TypeError(
          P6`Cannot send event before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify(
            {
              event: e4,
              id: this.id,
              actor: this.actor,
              environment: this.environment
            },
            null,
            2
          )}`
        );
      this.emitToListeners(e4, { actor: this.actor }), this.emitToChannel(e4, { actor: this.actor });
    }, "send");
    if (this.debugging = (_a2 = e3.debug) != null ? _a2 : false, !T6.isInternalConstructing)
      throw new TypeError(
        "UniversalStore is not constructable - use UniversalStore.create() instead"
      );
    if (T6.isInternalConstructing = false, this.id = e3.id, this.actorId = Date.now().toString(36) + Math.random().toString(36).substring(2), this.actorType = e3.leader ? T6.ActorType.LEADER : T6.ActorType.FOLLOWER, this.state = e3.initialState, this.channelEventName = `${hs}${this.id}`, this.debug("constructor", {
      options: e3,
      environmentOverrides: t4,
      channelEventName: this.channelEventName
    }), this.actor.type === T6.ActorType.LEADER)
      this.syncing = {
        state: q4.RESOLVED,
        promise: Promise.resolve()
      };
    else {
      let o4, n3, i3 = new Promise((a4, l2) => {
        o4 = /* @__PURE__ */ s4(() => {
          this.syncing.state === q4.PENDING && (this.syncing.state = q4.RESOLVED, a4());
        }, "syncingResolve"), n3 = /* @__PURE__ */ s4((c3) => {
          this.syncing.state === q4.PENDING && (this.syncing.state = q4.REJECTED, l2(c3));
        }, "syncingReject");
      });
      this.syncing = {
        state: q4.PENDING,
        promise: i3,
        resolve: o4,
        reject: n3
      };
    }
    this.getState = this.getState.bind(this), this.setState = this.setState.bind(this), this.subscribe = this.subscribe.bind(this), this.onStateChange = this.onStateChange.bind(this), this.send = this.send.bind(this), this.emitToChannel = this.emitToChannel.bind(this), this.prepareThis = this.prepareThis.bind(this), this.emitToListeners = this.emitToListeners.bind(this), this.handleChannelEvents = this.handleChannelEvents.bind(
      this
    ), this.debug = this.debug.bind(this), this.channel = (_b = t4 == null ? void 0 : t4.channel) != null ? _b : T6.preparation.channel, this.environment = (_c = t4 == null ? void 0 : t4.environment) != null ? _c : T6.preparation.environment, this.channel && this.environment ? this.prepareThis({ channel: this.channel, environment: this.environment }) : T6.preparation.promise.then(this.prepareThis);
  }
  static setupPreparationPromise() {
    let e3, t4, o4 = new Promise(
      (n3, i3) => {
        e3 = /* @__PURE__ */ s4((a4) => {
          n3(a4);
        }, "resolveRef"), t4 = /* @__PURE__ */ s4((...a4) => {
          i3(a4);
        }, "rejectRef");
      }
    );
    T6.preparation = {
      resolve: e3,
      reject: t4,
      promise: o4
    };
  }
  /** The actor object representing the store instance with a unique ID and a type */
  get actor() {
    var _a2;
    return Object.freeze({
      id: this.actorId,
      type: this.actorType,
      environment: (_a2 = this.environment) != null ? _a2 : T6.Environment.UNKNOWN
    });
  }
  /**
   * The current state of the store, that signals both if the store is prepared by Storybook and
   * also - in the case of a follower - if the state has been synced with the leader's state.
   */
  get status() {
    var _a2;
    if (!this.channel || !this.environment)
      return T6.Status.UNPREPARED;
    switch ((_a2 = this.syncing) == null ? void 0 : _a2.state) {
      case q4.PENDING:
      case void 0:
        return T6.Status.SYNCING;
      case q4.REJECTED:
        return T6.Status.ERROR;
      case q4.RESOLVED:
      default:
        return T6.Status.READY;
    }
  }
  /**
   * A promise that resolves when the store is fully ready. A leader will be ready when the store
   * has been prepared by Storybook, which is almost instantly.
   *
   * A follower will be ready when the state has been synced with the leader's state, within a few
   * hundred milliseconds.
   */
  untilReady() {
    var _a2;
    return Promise.all([T6.preparation.promise, (_a2 = this.syncing) == null ? void 0 : _a2.promise]);
  }
  /** Creates a new instance of UniversalStore */
  static create(e3) {
    if (!e3 || typeof (e3 == null ? void 0 : e3.id) != "string")
      throw new TypeError("id is required and must be a string, when creating a UniversalStore");
    e3.debug && console.debug(
      P6`[UniversalStore]
        create`,
      { options: e3 }
    );
    let t4 = Fr2.get(e3.id);
    if (t4)
      return console.warn(P6`UniversalStore with id "${e3.id}" already exists in this environment, re-using existing.
        You should reuse the existing instance instead of trying to create a new one.`), t4;
    T6.isInternalConstructing = true;
    let o4 = new T6(e3);
    return Fr2.set(e3.id, o4), o4;
  }
  /**
   * Used by Storybook to set the channel for all instances of UniversalStore in the given
   * environment.
   *
   * @internal
   */
  static __prepare(e3, t4) {
    T6.preparation.channel = e3, T6.preparation.environment = t4, T6.preparation.resolve({ channel: e3, environment: t4 });
  }
  /**
   * Updates the store's state
   *
   * Either a new state or a state updater function can be passed to the method.
   */
  setState(e3) {
    let t4 = this.state, o4 = typeof e3 == "function" ? e3(t4) : e3;
    if (this.debug("setState", { newState: o4, previousState: t4, updater: e3 }), this.status !== T6.Status.READY)
      throw new TypeError(
        P6`Cannot set state before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify(
          {
            newState: o4,
            id: this.id,
            actor: this.actor,
            environment: this.environment
          },
          null,
          2
        )}`
      );
    this.state = o4;
    let n3 = {
      type: T6.InternalEventType.SET_STATE,
      payload: {
        state: o4,
        previousState: t4
      }
    };
    this.emitToChannel(n3, { actor: this.actor }), this.emitToListeners(n3, { actor: this.actor });
  }
  /**
   * Subscribes to state changes
   *
   * @returns Unsubscribe function
   */
  onStateChange(e3) {
    return this.debug("onStateChange", { listener: e3 }), this.subscribe(
      T6.InternalEventType.SET_STATE,
      ({ payload: t4 }, o4) => {
        e3(t4.state, t4.previousState, o4);
      }
    );
  }
  emitToChannel(e3, t4) {
    var _a2;
    this.debug("emitToChannel", { event: e3, eventInfo: t4, channel: this.channel }), (_a2 = this.channel) == null ? void 0 : _a2.emit(this.channelEventName, {
      event: e3,
      eventInfo: t4
    });
  }
  prepareThis({
    channel: e3,
    environment: t4
  }) {
    this.channel = e3, this.environment = t4, this.debug("prepared", { channel: e3, environment: t4 }), this.channel.on(this.channelEventName, this.handleChannelEvents), this.actor.type === T6.ActorType.LEADER ? this.emitToChannel(
      { type: T6.InternalEventType.LEADER_CREATED },
      { actor: this.actor }
    ) : (this.emitToChannel(
      { type: T6.InternalEventType.FOLLOWER_CREATED },
      { actor: this.actor }
    ), this.emitToChannel(
      { type: T6.InternalEventType.EXISTING_STATE_REQUEST },
      { actor: this.actor }
    ), setTimeout(() => {
      this.syncing.reject(
        new TypeError(
          `No existing state found for follower with id: '${this.id}'. Make sure a leader with the same id exists before creating a follower.`
        )
      );
    }, 1e3));
  }
  emitToListeners(e3, t4) {
    let o4 = this.listeners.get(e3.type), n3 = this.listeners.get("*");
    this.debug("emitToListeners", {
      event: e3,
      eventInfo: t4,
      eventTypeListeners: o4,
      everythingListeners: n3
    }), [...o4 != null ? o4 : [], ...n3 != null ? n3 : []].forEach(
      (i3) => i3(e3, t4)
    );
  }
  handleChannelEvents(e3) {
    var _a2, _b, _c, _d, _e4;
    let { event: t4, eventInfo: o4 } = e3;
    if ([o4.actor.id, (_a2 = o4.forwardingActor) == null ? void 0 : _a2.id].includes(this.actor.id)) {
      this.debug("handleChannelEvents: Ignoring event from self", { channelEvent: e3 });
      return;
    } else if (((_b = this.syncing) == null ? void 0 : _b.state) === q4.PENDING && t4.type !== T6.InternalEventType.EXISTING_STATE_RESPONSE) {
      this.debug("handleChannelEvents: Ignoring event while syncing", { channelEvent: e3 });
      return;
    }
    if (this.debug("handleChannelEvents", { channelEvent: e3 }), this.actor.type === T6.ActorType.LEADER) {
      let n3 = true;
      switch (t4.type) {
        case T6.InternalEventType.EXISTING_STATE_REQUEST:
          n3 = false;
          let i3 = {
            type: T6.InternalEventType.EXISTING_STATE_RESPONSE,
            payload: this.state
          };
          this.debug("handleChannelEvents: responding to existing state request", {
            responseEvent: i3
          }), this.emitToChannel(i3, { actor: this.actor });
          break;
        case T6.InternalEventType.LEADER_CREATED:
          n3 = false, this.syncing.state = q4.REJECTED, this.debug("handleChannelEvents: erroring due to second leader being created", {
            event: t4
          }), console.error(
            P6`Detected multiple UniversalStore leaders created with the same id "${this.id}".
            Only one leader can exists at a time, your stores are now in an invalid state.
            Leaders detected:
            this: ${JSON.stringify(this.actor, null, 2)}
            other: ${JSON.stringify(o4.actor, null, 2)}`
          );
          break;
      }
      n3 && (this.debug("handleChannelEvents: forwarding event", { channelEvent: e3 }), this.emitToChannel(t4, { actor: o4.actor, forwardingActor: this.actor }));
    }
    if (this.actor.type === T6.ActorType.FOLLOWER)
      switch (t4.type) {
        case T6.InternalEventType.EXISTING_STATE_RESPONSE:
          if (this.debug("handleChannelEvents: Setting state from leader's existing state response", {
            event: t4
          }), ((_c = this.syncing) == null ? void 0 : _c.state) !== q4.PENDING)
            break;
          (_e4 = (_d = this.syncing).resolve) == null ? void 0 : _e4.call(_d);
          let n3 = {
            type: T6.InternalEventType.SET_STATE,
            payload: {
              state: t4.payload,
              previousState: this.state
            }
          };
          this.state = t4.payload, this.emitToListeners(n3, o4);
          break;
      }
    switch (t4.type) {
      case T6.InternalEventType.SET_STATE:
        this.debug("handleChannelEvents: Setting state", { event: t4 }), this.state = t4.payload.state;
        break;
    }
    this.emitToListeners(t4, { actor: o4.actor });
  }
  debug(e3, t4) {
    var _a2;
    this.debugging && console.debug(
      P6`[UniversalStore::${this.id}::${(_a2 = this.environment) != null ? _a2 : T6.Environment.UNKNOWN}]
        ${e3}`,
      JSON.stringify(
        {
          data: t4,
          actor: this.actor,
          state: this.state,
          status: this.status
        },
        null,
        2
      )
    );
  }
  /**
   * Used to reset the static fields of the UniversalStore class when cleaning up tests
   *
   * @internal
   */
  static __reset() {
    T6.preparation.reject(new Error("reset")), T6.setupPreparationPromise(), T6.isInternalConstructing = false;
  }
};
s4(T5, "UniversalStore"), /**
* Defines the possible actor types in the store system
*
* @readonly
*/
T5.ActorType = {
  LEADER: "LEADER",
  FOLLOWER: "FOLLOWER"
}, /**
* Defines the possible environments the store can run in
*
* @readonly
*/
T5.Environment = {
  SERVER: "SERVER",
  MANAGER: "MANAGER",
  PREVIEW: "PREVIEW",
  UNKNOWN: "UNKNOWN",
  MOCK: "MOCK"
}, /**
* Internal event types used for store synchronization
*
* @readonly
*/
T5.InternalEventType = {
  EXISTING_STATE_REQUEST: "__EXISTING_STATE_REQUEST",
  EXISTING_STATE_RESPONSE: "__EXISTING_STATE_RESPONSE",
  SET_STATE: "__SET_STATE",
  LEADER_CREATED: "__LEADER_CREATED",
  FOLLOWER_CREATED: "__FOLLOWER_CREATED"
}, T5.Status = {
  UNPREPARED: "UNPREPARED",
  SYNCING: "SYNCING",
  READY: "READY",
  ERROR: "ERROR"
}, // This is used to check if constructor was called from the static factory create()
T5.isInternalConstructing = false, T5.setupPreparationPromise();
var J4 = T5;
function Ir2(r4, e3) {
  let t4 = {}, o4 = Object.entries(r4);
  for (let n3 = 0; n3 < o4.length; n3++) {
    let [i3, a4] = o4[n3];
    e3(a4, i3) || (t4[i3] = a4);
  }
  return t4;
}
s4(Ir2, "omitBy");
function Or2(r4, e3) {
  let t4 = {};
  for (let o4 = 0; o4 < e3.length; o4++) {
    let n3 = e3[o4];
    Object.prototype.hasOwnProperty.call(r4, n3) && (t4[n3] = r4[n3]);
  }
  return t4;
}
s4(Or2, "pick");
function Dr2(r4, e3) {
  let t4 = {}, o4 = Object.entries(r4);
  for (let n3 = 0; n3 < o4.length; n3++) {
    let [i3, a4] = o4[n3];
    e3(a4, i3) && (t4[i3] = a4);
  }
  return t4;
}
s4(Dr2, "pickBy");
function L5(r4) {
  if (typeof r4 != "object" || r4 == null)
    return false;
  if (Object.getPrototypeOf(r4) === null)
    return true;
  if (r4.toString() !== "[object Object]")
    return false;
  let e3 = r4;
  for (; Object.getPrototypeOf(e3) !== null; )
    e3 = Object.getPrototypeOf(e3);
  return Object.getPrototypeOf(r4) === e3;
}
s4(L5, "isPlainObject");
function G4(r4, e3) {
  let t4 = {}, o4 = Object.keys(r4);
  for (let n3 = 0; n3 < o4.length; n3++) {
    let i3 = o4[n3], a4 = r4[i3];
    t4[i3] = e3(a4, i3, r4);
  }
  return t4;
}
s4(G4, "mapValues");
var Nt2 = "[object RegExp]";
var Mt2 = "[object String]";
var _t2 = "[object Number]";
var qt2 = "[object Boolean]";
var kr2 = "[object Arguments]";
var Ut2 = "[object Symbol]";
var Gt2 = "[object Date]";
var Bt2 = "[object Map]";
var zt2 = "[object Set]";
var Vt2 = "[object Array]";
var Ht2 = "[object Function]";
var Wt2 = "[object ArrayBuffer]";
var $e2 = "[object Object]";
var $t2 = "[object Error]";
var Yt = "[object DataView]";
var Kt = "[object Uint8Array]";
var Xt2 = "[object Uint8ClampedArray]";
var Jt2 = "[object Uint16Array]";
var Qt = "[object Uint32Array]";
var Zt2 = "[object BigUint64Array]";
var eo2 = "[object Int8Array]";
var ro2 = "[object Int16Array]";
var to2 = "[object Int32Array]";
var oo2 = "[object BigInt64Array]";
var no2 = "[object Float32Array]";
var so = "[object Float64Array]";
function jr2(r4) {
  return Object.getOwnPropertySymbols(r4).filter((e3) => Object.prototype.propertyIsEnumerable.call(r4, e3));
}
s4(jr2, "getSymbols");
function Lr2(r4) {
  return r4 == null ? r4 === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(r4);
}
s4(Lr2, "getTag");
function De2(r4, e3) {
  if (typeof r4 == typeof e3)
    switch (typeof r4) {
      case "bigint":
      case "string":
      case "boolean":
      case "symbol":
      case "undefined":
        return r4 === e3;
      case "number":
        return r4 === e3 || Object.is(r4, e3);
      case "function":
        return r4 === e3;
      case "object":
        return Y4(r4, e3);
    }
  return Y4(r4, e3);
}
s4(De2, "isEqual");
function Y4(r4, e3, t4) {
  if (Object.is(r4, e3))
    return true;
  let o4 = Lr2(r4), n3 = Lr2(e3);
  if (o4 === kr2 && (o4 = $e2), n3 === kr2 && (n3 = $e2), o4 !== n3)
    return false;
  switch (o4) {
    case Mt2:
      return r4.toString() === e3.toString();
    case _t2: {
      let l2 = r4.valueOf(), c3 = e3.valueOf();
      return l2 === c3 || Number.isNaN(l2) && Number.isNaN(c3);
    }
    case qt2:
    case Gt2:
    case Ut2:
      return Object.is(r4.valueOf(), e3.valueOf());
    case Nt2:
      return r4.source === e3.source && r4.flags === e3.flags;
    case Ht2:
      return r4 === e3;
  }
  t4 = t4 != null ? t4 : /* @__PURE__ */ new Map();
  let i3 = t4.get(r4), a4 = t4.get(e3);
  if (i3 != null && a4 != null)
    return i3 === e3;
  t4.set(r4, e3), t4.set(e3, r4);
  try {
    switch (o4) {
      case Bt2: {
        if (r4.size !== e3.size)
          return false;
        for (let [l2, c3] of r4.entries())
          if (!e3.has(l2) || !Y4(c3, e3.get(l2), t4))
            return false;
        return true;
      }
      case zt2: {
        if (r4.size !== e3.size)
          return false;
        let l2 = Array.from(r4.values()), c3 = Array.from(e3.values());
        for (let d2 = 0; d2 < l2.length; d2++) {
          let p4 = l2[d2], u3 = c3.findIndex((y4) => Y4(p4, y4, t4));
          if (u3 === -1)
            return false;
          c3.splice(u3, 1);
        }
        return true;
      }
      case Vt2:
      case Kt:
      case Xt2:
      case Jt2:
      case Qt:
      case Zt2:
      case eo2:
      case ro2:
      case to2:
      case oo2:
      case no2:
      case so: {
        if (typeof Buffer < "u" && Buffer.isBuffer(r4) !== Buffer.isBuffer(e3) || r4.length !== e3.length)
          return false;
        for (let l2 = 0; l2 < r4.length; l2++)
          if (!Y4(r4[l2], e3[l2], t4))
            return false;
        return true;
      }
      case Wt2:
        return r4.byteLength !== e3.byteLength ? false : Y4(new Uint8Array(r4), new Uint8Array(e3), t4);
      case Yt:
        return r4.byteLength !== e3.byteLength || r4.byteOffset !== e3.byteOffset ? false : Y4(r4.buffer, e3.buffer, t4);
      case $t2:
        return r4.name === e3.name && r4.message === e3.message;
      case $e2: {
        if (!(Y4(r4.constructor, e3.constructor, t4) || L5(r4) && L5(e3)))
          return false;
        let c3 = [...Object.keys(r4), ...jr2(r4)], d2 = [...Object.keys(e3), ...jr2(e3)];
        if (c3.length !== d2.length)
          return false;
        for (let p4 = 0; p4 < c3.length; p4++) {
          let u3 = c3[p4], y4 = r4[u3];
          if (!Object.prototype.hasOwnProperty.call(e3, u3))
            return false;
          let m3 = e3[u3];
          if (!Y4(y4, m3, t4))
            return false;
        }
        return true;
      }
      default:
        return false;
    }
  } finally {
    t4.delete(r4), t4.delete(e3);
  }
}
s4(Y4, "areObjectsEqual");
var Ye2 = class Ye3 extends J4 {
  constructor(e3, t4) {
    J4.isInternalConstructing = true, super(
      __spreadProps(__spreadValues({}, e3), { leader: true }),
      { channel: new B2({}), environment: J4.Environment.MOCK }
    ), J4.isInternalConstructing = false, typeof (t4 == null ? void 0 : t4.fn) == "function" && (this.testUtils = t4, this.getState = t4.fn(this.getState), this.setState = t4.fn(this.setState), this.subscribe = t4.fn(this.subscribe), this.onStateChange = t4.fn(this.onStateChange), this.send = t4.fn(this.send));
  }
  /** Create a mock universal store. This is just an alias for the constructor */
  static create(e3, t4) {
    return new Ye3(e3, t4);
  }
  unsubscribeAll() {
    var _a2, _b;
    if (!this.testUtils)
      throw new Error(
        Lt2`Cannot call unsubscribeAll on a store that does not have testUtils.
        Please provide testUtils as the second argument when creating the store.`
      );
    let e3 = /* @__PURE__ */ s4((t4) => {
      try {
        t4.value();
      } catch (e4) {
      }
    }, "callReturnedUnsubscribeFn");
    (_a2 = this.subscribe.mock) == null ? void 0 : _a2.results.forEach(e3), (_b = this.onStateChange.mock) == null ? void 0 : _b.results.forEach(e3);
  }
};
s4(Ye2, "MockUniversalStore");
var tr2 = he2(_r2(), 1);
var me2 = Symbol("incompatible");
var Ur2 = /* @__PURE__ */ s4((r4, e3) => {
  let t4 = e3.type;
  if (r4 == null || !t4 || e3.mapping)
    return r4;
  switch (t4.name) {
    case "string":
      return String(r4);
    case "enum":
      return r4;
    case "number":
      return Number(r4);
    case "boolean":
      return String(r4) === "true";
    case "array":
      return !t4.value || !Array.isArray(r4) ? me2 : r4.reduce((o4, n3, i3) => {
        let a4 = Ur2(n3, { type: t4.value });
        return a4 !== me2 && (o4[i3] = a4), o4;
      }, new Array(r4.length));
    case "object":
      return typeof r4 == "string" || typeof r4 == "number" ? r4 : !t4.value || typeof r4 != "object" ? me2 : Object.entries(r4).reduce((o4, [n3, i3]) => {
        let a4 = Ur2(i3, { type: t4.value[n3] });
        return a4 === me2 ? o4 : Object.assign(o4, { [n3]: a4 });
      }, {});
    default:
      return me2;
  }
}, "map");
var ao = /* @__PURE__ */ s4((r4, e3) => Object.entries(r4).reduce((t4, [o4, n3]) => {
  if (!e3[o4])
    return t4;
  let i3 = Ur2(n3, e3[o4]);
  return i3 === me2 ? t4 : Object.assign(t4, { [o4]: i3 });
}, {}), "mapArgsToTypes");
var ke2 = /* @__PURE__ */ s4((r4, e3) => Array.isArray(r4) && Array.isArray(e3) ? e3.reduce(
  (t4, o4, n3) => (t4[n3] = ke2(r4[n3], e3[n3]), t4),
  [...r4]
).filter((t4) => t4 !== void 0) : !L5(r4) || !L5(e3) ? e3 : Object.keys(__spreadValues(__spreadValues({}, r4), e3)).reduce((t4, o4) => {
  if (o4 in e3) {
    let n3 = ke2(r4[o4], e3[o4]);
    n3 !== void 0 && (t4[o4] = n3);
  } else
    t4[o4] = r4[o4];
  return t4;
}, {}), "combineArgs");
var lo2 = /* @__PURE__ */ s4((r4, e3) => Object.entries(e3).reduce((t4, [o4, { options: n3 }]) => {
  function i3() {
    return o4 in r4 && (t4[o4] = r4[o4]), t4;
  }
  if (s4(i3, "allowArg"), !n3)
    return i3();
  if (!Array.isArray(n3))
    return n.error(P6`
        Invalid argType: '${o4}.options' should be an array.

        More info: https://storybook.js.org/docs/api/arg-types
      `), i3();
  if (n3.some((u3) => u3 && ["object", "function"].includes(typeof u3)))
    return n.error(P6`
        Invalid argType: '${o4}.options' should only contain primitives. Use a 'mapping' for complex values.

        More info: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
      `), i3();
  let a4 = Array.isArray(r4[o4]), l2 = a4 && r4[o4].findIndex((u3) => !n3.includes(u3)), c3 = a4 && l2 === -1;
  if (r4[o4] === void 0 || n3.includes(r4[o4]) || c3)
    return i3();
  let d2 = a4 ? `${o4}[${l2}]` : o4, p4 = n3.map((u3) => typeof u3 == "string" ? `'${u3}'` : String(u3)).join(", ");
  return n.warn(`Received illegal value for '${d2}'. Supported options: ${p4}`), t4;
}, {}), "validateOptions");
var ie = Symbol("Deeply equal");
var ge2 = /* @__PURE__ */ s4((r4, e3) => {
  if (typeof r4 != typeof e3)
    return e3;
  if (De2(r4, e3))
    return ie;
  if (Array.isArray(r4) && Array.isArray(e3)) {
    let t4 = e3.reduce((o4, n3, i3) => {
      let a4 = ge2(r4[i3], n3);
      return a4 !== ie && (o4[i3] = a4), o4;
    }, new Array(e3.length));
    return e3.length >= r4.length ? t4 : t4.concat(new Array(r4.length - e3.length).fill(void 0));
  }
  return L5(r4) && L5(e3) ? Object.keys(__spreadValues(__spreadValues({}, r4), e3)).reduce((t4, o4) => {
    let n3 = ge2(r4 == null ? void 0 : r4[o4], e3 == null ? void 0 : e3[o4]);
    return n3 === ie ? t4 : Object.assign(t4, { [o4]: n3 });
  }, {}) : e3;
}, "deepDiff");
var Gr2 = "UNTARGETED";
function co2({
  args: r4,
  argTypes: e3
}) {
  let t4 = {};
  return Object.entries(r4).forEach(([o4, n3]) => {
    let { target: i3 = Gr2 } = e3[o4] || {};
    t4[i3] = t4[i3] || {}, t4[i3][o4] = n3;
  }), t4;
}
s4(co2, "groupArgsByTarget");
function Ts(r4) {
  return Object.keys(r4).forEach((e3) => r4[e3] === void 0 && delete r4[e3]), r4;
}
s4(Ts, "deleteUndefined");
var Br2 = class Br3 {
  constructor() {
    this.initialArgsByStoryId = {};
    this.argsByStoryId = {};
  }
  get(e3) {
    if (!(e3 in this.argsByStoryId))
      throw new Error(`No args known for ${e3} -- has it been rendered yet?`);
    return this.argsByStoryId[e3];
  }
  setInitial(e3) {
    if (!this.initialArgsByStoryId[e3.id])
      this.initialArgsByStoryId[e3.id] = e3.initialArgs, this.argsByStoryId[e3.id] = e3.initialArgs;
    else if (this.initialArgsByStoryId[e3.id] !== e3.initialArgs) {
      let t4 = ge2(this.initialArgsByStoryId[e3.id], this.argsByStoryId[e3.id]);
      this.initialArgsByStoryId[e3.id] = e3.initialArgs, this.argsByStoryId[e3.id] = e3.initialArgs, t4 !== ie && this.updateFromDelta(e3, t4);
    }
  }
  updateFromDelta(e3, t4) {
    let o4 = lo2(t4, e3.argTypes);
    this.argsByStoryId[e3.id] = ke2(this.argsByStoryId[e3.id], o4);
  }
  updateFromPersisted(e3, t4) {
    let o4 = ao(t4, e3.argTypes);
    return this.updateFromDelta(e3, o4);
  }
  update(e3, t4) {
    if (!(e3 in this.argsByStoryId))
      throw new Error(`No args known for ${e3} -- has it been rendered yet?`);
    this.argsByStoryId[e3] = Ts(__spreadValues(__spreadValues({}, this.argsByStoryId[e3]), t4));
  }
};
s4(Br2, "ArgsStore");
var Ke2 = Br2;
var Xe2 = /* @__PURE__ */ s4((r4 = {}) => Object.entries(r4).reduce((e3, [t4, { defaultValue: o4 }]) => (typeof o4 < "u" && (e3[t4] = o4), e3), {}), "getValuesFromArgTypes");
var zr2 = class zr3 {
  constructor({
    globals: e3 = {},
    globalTypes: t4 = {}
  }) {
    this.set({ globals: e3, globalTypes: t4 });
  }
  set({ globals: e3 = {}, globalTypes: t4 = {} }) {
    let o4 = this.initialGlobals && ge2(this.initialGlobals, this.globals);
    this.allowedGlobalNames = /* @__PURE__ */ new Set([...Object.keys(e3), ...Object.keys(t4)]);
    let n3 = Xe2(t4);
    this.initialGlobals = __spreadValues(__spreadValues({}, n3), e3), this.globals = this.initialGlobals, o4 && o4 !== ie && this.updateFromPersisted(o4);
  }
  filterAllowedGlobals(e3) {
    return Object.entries(e3).reduce((t4, [o4, n3]) => (this.allowedGlobalNames.has(o4) ? t4[o4] = n3 : s.warn(
      `Attempted to set a global (${o4}) that is not defined in initial globals or globalTypes`
    ), t4), {});
  }
  updateFromPersisted(e3) {
    let t4 = this.filterAllowedGlobals(e3);
    this.globals = __spreadValues(__spreadValues({}, this.globals), t4);
  }
  get() {
    return this.globals;
  }
  update(e3) {
    this.globals = __spreadValues(__spreadValues({}, this.globals), this.filterAllowedGlobals(e3));
  }
};
s4(zr2, "GlobalsStore");
var Je2 = zr2;
var po2 = he2(_r2(), 1);
var xs = (0, po2.default)(1)(
  (r4) => Object.values(r4).reduce(
    (e3, t4) => (e3[t4.importPath] = e3[t4.importPath] || t4, e3),
    {}
  )
);
var Vr2 = class Vr3 {
  constructor({ entries: e3 } = { v: 5, entries: {} }) {
    this.entries = e3;
  }
  entryFromSpecifier(e3) {
    let t4 = Object.values(this.entries);
    if (e3 === "*")
      return t4[0];
    if (typeof e3 == "string")
      return this.entries[e3] ? this.entries[e3] : t4.find((i3) => i3.id.startsWith(e3));
    let { name: o4, title: n3 } = e3;
    return t4.find((i3) => i3.name === o4 && i3.title === n3);
  }
  storyIdToEntry(e3) {
    let t4 = this.entries[e3];
    if (!t4)
      throw new D2({ storyId: e3 });
    return t4;
  }
  importPathToEntry(e3) {
    return xs(this.entries)[e3];
  }
};
s4(Vr2, "StoryIndexStore");
var Qe2 = Vr2;
var ws = /* @__PURE__ */ s4((r4) => typeof r4 == "string" ? { name: r4 } : r4, "normalizeType");
var vs = /* @__PURE__ */ s4((r4) => typeof r4 == "string" ? { type: r4 } : r4, "normalizeControl");
var As = /* @__PURE__ */ s4((r4, e3) => {
  let _a2 = r4, { type: t4, control: o4 } = _a2, n3 = __objRest(_a2, ["type", "control"]), i3 = __spreadValues({
    name: e3
  }, n3);
  return t4 && (i3.type = ws(t4)), o4 ? i3.control = vs(o4) : o4 === false && (i3.control = { disable: true }), i3;
}, "normalizeInputType");
var ae2 = /* @__PURE__ */ s4((r4) => G4(r4, As), "normalizeInputTypes");
var F4 = /* @__PURE__ */ s4((r4) => Array.isArray(r4) ? r4 : r4 ? [r4] : [], "normalizeArrays");
var Os = P6`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;
function Se2(r4, e3, t4) {
  let o4 = e3, n3 = typeof e3 == "function" ? e3 : null, { story: i3 } = o4;
  i3 && (s.debug("deprecated story", i3), m(Os));
  let a4 = re(r4), l2 = typeof o4 != "function" && o4.name || o4.storyName || (i3 == null ? void 0 : i3.name) || a4, c3 = [
    ...F4(o4.decorators),
    ...F4(i3 == null ? void 0 : i3.decorators)
  ], d2 = __spreadValues(__spreadValues({}, i3 == null ? void 0 : i3.parameters), o4.parameters), p4 = __spreadValues(__spreadValues({}, i3 == null ? void 0 : i3.args), o4.args), u3 = __spreadValues(__spreadValues({}, i3 == null ? void 0 : i3.argTypes), o4.argTypes), y4 = [...F4(o4.loaders), ...F4(
    i3 == null ? void 0 : i3.loaders
  )], m3 = [
    ...F4(o4.beforeEach),
    ...F4(i3 == null ? void 0 : i3.beforeEach)
  ], g2 = [
    ...F4(o4.experimental_afterEach),
    ...F4(i3 == null ? void 0 : i3.experimental_afterEach)
  ], { render: S6, play: h5, tags: E3 = [], globals: R5 = {} } = o4, f6 = d2.__id || ee(t4.id, a4);
  return __spreadValues(__spreadValues(__spreadValues({
    moduleExport: e3,
    id: f6,
    name: l2,
    tags: E3,
    decorators: c3,
    parameters: d2,
    args: p4,
    argTypes: ae2(u3),
    loaders: y4,
    beforeEach: m3,
    experimental_afterEach: g2,
    globals: R5
  }, S6 && { render: S6 }), n3 && { userStoryFn: n3 }), h5 && { play: h5 });
}
s4(Se2, "normalizeStory");
function je2(r4, e3 = r4.title, t4) {
  let { id: o4, argTypes: n3 } = r4;
  return __spreadProps(__spreadValues(__spreadProps(__spreadValues({
    id: D3(o4 || e3)
  }, r4), {
    title: e3
  }), n3 && { argTypes: ae2(n3) }), {
    parameters: __spreadValues({
      fileName: t4
    }, r4.parameters)
  });
}
s4(je2, "normalizeComponentAnnotations");
var js = /* @__PURE__ */ s4((r4) => {
  let { globals: e3, globalTypes: t4 } = r4;
  (e3 || t4) && s.error(
    "Global args/argTypes can only be set globally",
    JSON.stringify({
      globals: e3,
      globalTypes: t4
    })
  );
}, "checkGlobals");
var Ls = /* @__PURE__ */ s4((r4) => {
  let { options: e3 } = r4;
  (e3 == null ? void 0 : e3.storySort) && s.error("The storySort option parameter can only be set globally");
}, "checkStorySort");
var Ze2 = /* @__PURE__ */ s4((r4) => {
  r4 && (js(r4), Ls(r4));
}, "checkDisallowedParameters");
function yo(r4, e3, t4) {
  let _a2 = r4, { default: o4, __namedExportsOrder: n3 } = _a2, i3 = __objRest(_a2, ["default", "__namedExportsOrder"]), a4 = Object.values(i3)[0];
  if (K4(a4)) {
    let d2 = je2(a4.meta.input, t4, e3);
    Ze2(d2.parameters);
    let p4 = { meta: d2, stories: {}, moduleExports: r4 };
    return Object.keys(i3).forEach((u3) => {
      if (te2(u3, d2)) {
        let y4 = Se2(u3, i3[u3].input, d2);
        Ze2(y4.parameters), p4.stories[y4.id] = y4;
      }
    }), p4.projectAnnotations = a4.meta.preview.composed, p4;
  }
  let l2 = je2(
    o4,
    t4,
    e3
  );
  Ze2(l2.parameters);
  let c3 = { meta: l2, stories: {}, moduleExports: r4 };
  return Object.keys(i3).forEach((d2) => {
    if (te2(d2, l2)) {
      let p4 = Se2(d2, i3[d2], l2);
      Ze2(p4.parameters), c3.stories[p4.id] = p4;
    }
  }), c3;
}
s4(yo, "processCSFFile");
function mo(r4) {
  return r4 != null && Ns(r4).includes("mount");
}
s4(mo, "mountDestructured");
function Ns(r4) {
  let e3 = r4.toString().match(/[^(]*\(([^)]*)/);
  if (!e3)
    return [];
  let t4 = ho(e3[1]);
  if (!t4.length)
    return [];
  let o4 = t4[0];
  return o4.startsWith("{") && o4.endsWith("}") ? ho(o4.slice(1, -1).replace(/\s/g, "")).map((i3) => i3.replace(/:.*|=.*/g, "")) : [];
}
s4(Ns, "getUsedProps");
function ho(r4) {
  let e3 = [], t4 = [], o4 = 0;
  for (let i3 = 0; i3 < r4.length; i3++)
    if (r4[i3] === "{" || r4[i3] === "[")
      t4.push(r4[i3] === "{" ? "}" : "]");
    else if (r4[i3] === t4[t4.length - 1])
      t4.pop();
    else if (!t4.length && r4[i3] === ",") {
      let a4 = r4.substring(o4, i3).trim();
      a4 && e3.push(a4), o4 = i3 + 1;
    }
  let n3 = r4.substring(o4).trim();
  return n3 && e3.push(n3), e3;
}
s4(ho, "splitByComma");
function go(r4, e3, t4) {
  let o4 = t4(r4);
  return (n3) => e3(o4, n3);
}
s4(go, "decorateStory");
function So(_a2 = {}) {
  var _b = _a2, {
    componentId: r4,
    title: e3,
    kind: t4,
    id: o4,
    name: n3,
    story: i3,
    parameters: a4,
    initialArgs: l2,
    argTypes: c3
  } = _b, d2 = __objRest(_b, [
    "componentId",
    "title",
    "kind",
    "id",
    "name",
    "story",
    "parameters",
    "initialArgs",
    "argTypes"
  ]);
  return d2;
}
s4(So, "sanitizeStoryContextUpdate");
function Hr2(r4, e3) {
  let t4 = {}, o4 = /* @__PURE__ */ s4((i3) => (a4) => {
    if (!t4.value)
      throw new Error("Decorated function called without init");
    return t4.value = __spreadValues(__spreadValues({}, t4.value), So(a4)), i3(t4.value);
  }, "bindWithContext"), n3 = e3.reduce(
    (i3, a4) => go(i3, a4, o4),
    r4
  );
  return (i3) => (t4.value = i3, n3(i3));
}
s4(Hr2, "defaultDecorateStory");
var M3 = /* @__PURE__ */ s4((...r4) => {
  let e3 = {}, t4 = r4.filter(Boolean), o4 = t4.reduce((n3, i3) => (Object.entries(i3).forEach(([a4, l2]) => {
    let c3 = n3[a4];
    Array.isArray(l2) || typeof c3 > "u" ? n3[a4] = l2 : L5(l2) && L5(c3) ? e3[a4] = true : typeof l2 < "u" && (n3[a4] = l2);
  }), n3), {});
  return Object.keys(e3).forEach((n3) => {
    let i3 = t4.filter(Boolean).map((a4) => a4[n3]).filter((a4) => typeof a4 < "u");
    i3.every((a4) => L5(a4)) ? o4[n3] = M3(...i3) : o4[n3] = i3[i3.length - 1];
  }), o4;
}, "combineParameters");
function Le2(r4, e3, t4) {
  var _a2, _b, _c, _d;
  let { moduleExport: o4, id: n3, name: i3 } = r4 || {}, a4 = bo(
    r4,
    e3,
    t4
  ), l2 = /* @__PURE__ */ s4(async (w5) => {
    let A4 = {};
    for (let O5 of [
      ..."__STORYBOOK_TEST_LOADERS__" in I5 && Array.isArray(I5.__STORYBOOK_TEST_LOADERS__) ? [I5.__STORYBOOK_TEST_LOADERS__] : [],
      F4(t4.loaders),
      F4(e3.loaders),
      F4(r4.loaders)
    ]) {
      if (w5.abortSignal.aborted)
        return A4;
      let N5 = await Promise.all(O5.map((U6) => U6(w5)));
      Object.assign(A4, ...N5);
    }
    return A4;
  }, "applyLoaders"), c3 = /* @__PURE__ */ s4(async (w5) => {
    let A4 = new Array();
    for (let O5 of [
      ...F4(t4.beforeEach),
      ...F4(e3.beforeEach),
      ...F4(r4.beforeEach)
    ]) {
      if (w5.abortSignal.aborted)
        return A4;
      let N5 = await O5(w5);
      N5 && A4.push(N5);
    }
    return A4;
  }, "applyBeforeEach"), d2 = /* @__PURE__ */ s4(async (w5) => {
    let A4 = [
      ...F4(t4.experimental_afterEach),
      ...F4(e3.experimental_afterEach),
      ...F4(r4.experimental_afterEach)
    ].reverse();
    for (let O5 of A4) {
      if (w5.abortSignal.aborted)
        return;
      await O5(w5);
    }
  }, "applyAfterEach"), p4 = /* @__PURE__ */ s4((w5) => w5.originalStoryFn(w5.args, w5), "undecoratedStoryFn"), { applyDecorators: u3 = Hr2, runStep: y4 } = t4, m3 = [
    ...F4(r4 == null ? void 0 : r4.decorators),
    ...F4(e3 == null ? void 0 : e3.decorators),
    ...F4(t4 == null ? void 0 : t4.decorators)
  ], g2 = (r4 == null ? void 0 : r4.userStoryFn) || (r4 == null ? void 0 : r4.render) || e3.render || t4.render, S6 = vr2(u3)(p4, m3), h5 = /* @__PURE__ */ s4((w5) => S6(w5), "unboundStoryFn"), E3 = (_a2 = r4 == null ? void 0 : r4.play) != null ? _a2 : e3 == null ? void 0 : e3.play, R5 = mo(E3);
  if (!g2 && !R5)
    throw new q3({ id: n3 });
  let f6 = /* @__PURE__ */ s4((w5) => async () => (await w5.renderToCanvas(), w5.canvas), "defaultMount"), b6 = (_d = (_c = (_b = r4.mount) != null ? _b : e3.mount) != null ? _c : t4.mount) != null ? _d : f6, x6 = t4.testingLibraryRender;
  return __spreadProps(__spreadValues({
    storyGlobals: {}
  }, a4), {
    moduleExport: o4,
    id: n3,
    name: i3,
    story: i3,
    originalStoryFn: g2,
    undecoratedStoryFn: p4,
    unboundStoryFn: h5,
    applyLoaders: l2,
    applyBeforeEach: c3,
    applyAfterEach: d2,
    playFunction: E3,
    runStep: y4,
    mount: b6,
    testingLibraryRender: x6,
    renderToCanvas: t4.renderToCanvas,
    usesMount: R5
  });
}
s4(Le2, "prepareStory");
function Wr2(r4, e3, t4) {
  return __spreadProps(__spreadValues({}, bo(void 0, r4, e3)), {
    moduleExport: t4
  });
}
s4(Wr2, "prepareMeta");
function bo(r4, e3, t4) {
  var _a2, _b, _c, _d;
  let o4 = ["dev", "test"], n3 = ((_a2 = I5.DOCS_OPTIONS) == null ? void 0 : _a2.autodocs) === true ? ["autodocs"] : [], i3 = oe2(
    ...o4,
    ...n3,
    ...(_b = t4.tags) != null ? _b : [],
    ...(_c = e3.tags) != null ? _c : [],
    ...(_d = r4 == null ? void 0 : r4.tags) != null ? _d : []
  ), a4 = M3(
    t4.parameters,
    e3.parameters,
    r4 == null ? void 0 : r4.parameters
  ), { argTypesEnhancers: l2 = [], argsEnhancers: c3 = [] } = t4, d2 = M3(
    t4.argTypes,
    e3.argTypes,
    r4 == null ? void 0 : r4.argTypes
  );
  if (r4) {
    let E3 = (r4 == null ? void 0 : r4.userStoryFn) || (r4 == null ? void 0 : r4.render) || e3.render || t4.render;
    a4.__isArgsStory = E3 && E3.length > 0;
  }
  let p4 = __spreadValues(__spreadValues(__spreadValues({}, t4.args), e3.args), r4 == null ? void 0 : r4.args), u3 = __spreadValues(__spreadValues({}, e3.globals), r4 == null ? void 0 : r4.globals), y4 = {
    componentId: e3.id,
    title: e3.title,
    kind: e3.title,
    // Back compat
    id: (r4 == null ? void 0 : r4.id) || e3.id,
    // if there's no story name, we create a fake one since enhancers expect a name
    name: (r4 == null ? void 0 : r4.name) || "__meta",
    story: (r4 == null ? void 0 : r4.name) || "__meta",
    // Back compat
    component: e3.component,
    subcomponents: e3.subcomponents,
    tags: i3,
    parameters: a4,
    initialArgs: p4,
    argTypes: d2,
    storyGlobals: u3
  };
  y4.argTypes = l2.reduce(
    (E3, R5) => R5(__spreadProps(__spreadValues({}, y4), { argTypes: E3 })),
    y4.argTypes
  );
  let m3 = __spreadValues({}, p4);
  y4.initialArgs = c3.reduce(
    (E3, R5) => __spreadValues(__spreadValues({}, E3), R5(__spreadProps(__spreadValues({}, y4), {
      initialArgs: E3
    }))),
    m3
  );
  let _e4 = y4, { name: g2, story: S6 } = _e4, h5 = __objRest(_e4, ["name", "story"]);
  return h5;
}
s4(bo, "preparePartialAnnotations");
function er2(r4) {
  var _a2;
  let { args: e3 } = r4, t4 = __spreadProps(__spreadValues({}, r4), {
    allArgs: void 0,
    argsByTarget: void 0
  });
  if ((_a2 = I5.FEATURES) == null ? void 0 : _a2.argTypeTargetsV7) {
    let i3 = co2(r4);
    t4 = __spreadProps(__spreadValues({}, r4), {
      allArgs: r4.args,
      argsByTarget: i3,
      args: i3[Gr2] || {}
    });
  }
  let o4 = Object.entries(t4.args).reduce((i3, [a4, l2]) => {
    var _a3;
    if (!((_a3 = t4.argTypes[a4]) == null ? void 0 : _a3.mapping))
      return i3[a4] = l2, i3;
    let c3 = /* @__PURE__ */ s4((d2) => {
      let p4 = t4.argTypes[a4].mapping;
      return p4 && d2 in p4 ? p4[d2] : d2;
    }, "mappingFn");
    return i3[a4] = Array.isArray(l2) ? l2.map(c3) : c3(l2), i3;
  }, {}), n3 = Object.entries(o4).reduce((i3, [a4, l2]) => {
    let c3 = t4.argTypes[a4] || {};
    return z3(c3, o4, t4.globals) && (i3[a4] = l2), i3;
  }, {});
  return __spreadProps(__spreadValues({}, t4), { unmappedArgs: e3, args: n3 });
}
s4(er2, "prepareContext");
var $r2 = /* @__PURE__ */ s4((r4, e3, t4) => {
  let o4 = typeof r4;
  switch (o4) {
    case "boolean":
    case "string":
    case "number":
    case "function":
    case "symbol":
      return { name: o4 };
    default:
      break;
  }
  return r4 ? t4.has(r4) ? (s.warn(P6`
        We've detected a cycle in arg '${e3}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/essentials/controls#fully-custom-args
      `), { name: "other", value: "cyclic object" }) : (t4.add(r4), Array.isArray(r4) ? { name: "array", value: r4.length > 0 ? $r2(r4[0], e3, new Set(
    t4
  )) : { name: "other", value: "unknown" } } : { name: "object", value: G4(r4, (i3) => $r2(i3, e3, new Set(t4))) }) : { name: "object", value: {} };
}, "inferType");
var Yr2 = /* @__PURE__ */ s4((r4) => {
  let { id: e3, argTypes: t4 = {}, initialArgs: o4 = {} } = r4, n3 = G4(o4, (a4, l2) => ({
    name: l2,
    type: $r2(a4, `${e3}.${l2}`, /* @__PURE__ */ new Set())
  })), i3 = G4(t4, (a4, l2) => ({
    name: l2
  }));
  return M3(n3, i3, t4);
}, "inferArgTypes");
Yr2.secondPass = true;
var To = /* @__PURE__ */ s4((r4, e3) => Array.isArray(e3) ? e3.includes(r4) : r4.match(e3), "matches");
var rr2 = /* @__PURE__ */ s4((r4, e3, t4) => !e3 && !t4 ? r4 : r4 && Dr2(r4, (o4, n3) => {
  let i3 = o4.name || n3.toString();
  return !!(!e3 || To(i3, e3)) && (!t4 || !To(i3, t4));
}), "filterArgTypes");
var Bs = /* @__PURE__ */ s4((r4, e3, t4) => {
  let { type: o4, options: n3 } = r4;
  if (o4) {
    if (t4.color && t4.color.test(e3)) {
      let i3 = o4.name;
      if (i3 === "string")
        return { control: { type: "color" } };
      i3 !== "enum" && s.warn(
        `Addon controls: Control of type color only supports string, received "${i3}" instead`
      );
    }
    if (t4.date && t4.date.test(e3))
      return { control: { type: "date" } };
    switch (o4.name) {
      case "array":
        return { control: { type: "object" } };
      case "boolean":
        return { control: { type: "boolean" } };
      case "string":
        return { control: { type: "text" } };
      case "number":
        return { control: { type: "number" } };
      case "enum": {
        let { value: i3 } = o4;
        return { control: { type: (i3 == null ? void 0 : i3.length) <= 5 ? "radio" : "select" }, options: i3 };
      }
      case "function":
      case "symbol":
        return null;
      default:
        return { control: { type: n3 ? "select" : "object" } };
    }
  }
}, "inferControl");
var Ne2 = /* @__PURE__ */ s4((r4) => {
  let {
    argTypes: e3,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    parameters: { __isArgsStory: t4, controls: { include: o4 = null, exclude: n3 = null, matchers: i3 = {} } = {} }
  } = r4;
  if (!t4)
    return e3;
  let a4 = rr2(e3, o4, n3), l2 = G4(a4, (c3, d2) => (c3 == null ? void 0 : c3.type) && Bs(c3, d2.toString(), i3));
  return M3(l2, a4);
}, "inferControls");
Ne2.secondPass = true;
function be2(_a2) {
  var _b = _a2, {
    argTypes: r4,
    globalTypes: e3,
    argTypesEnhancers: t4,
    decorators: o4,
    loaders: n3,
    beforeEach: i3,
    experimental_afterEach: a4,
    globals: l2,
    initialGlobals: c3
  } = _b, d2 = __objRest(_b, [
    "argTypes",
    "globalTypes",
    "argTypesEnhancers",
    "decorators",
    "loaders",
    "beforeEach",
    "experimental_afterEach",
    "globals",
    "initialGlobals"
  ]);
  return l2 && Object.keys(l2).length > 0 && m(P6`
      The preview.js 'globals' field is deprecated and will be removed in Storybook 9.0.
      Please use 'initialGlobals' instead. Learn more:

      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#previewjs-globals-renamed-to-initialglobals
    `), __spreadValues(__spreadProps(__spreadValues(__spreadValues({}, r4 && { argTypes: ae2(r4) }), e3 && { globalTypes: ae2(e3) }), {
    decorators: F4(o4),
    loaders: F4(n3),
    beforeEach: F4(i3),
    experimental_afterEach: F4(a4),
    argTypesEnhancers: [
      ...t4 || [],
      Yr2,
      // inferControls technically should only run if the user is using the controls addon,
      // and so should be added by a preset there. However, as it seems some code relies on controls
      // annotations (in particular the angular implementation's `cleanArgsDecorator`), for backwards
      // compatibility reasons, we will leave this in the store until 7.0
      Ne2
    ],
    initialGlobals: M3(c3, l2)
  }), d2);
}
s4(be2, "normalizeProjectAnnotations");
var Eo = /* @__PURE__ */ s4((r4) => async () => {
  let e3 = [];
  for (let t4 of r4) {
    let o4 = await t4();
    o4 && e3.unshift(o4);
  }
  return async () => {
    for (let t4 of e3)
      await t4();
  };
}, "composeBeforeAllHooks");
function Kr2(r4) {
  return async (e3, t4, o4) => {
    await r4.reduceRight(
      (i3, a4) => async () => a4(e3, i3, o4),
      async () => t4(o4)
    )();
  };
}
s4(Kr2, "composeStepRunners");
function _e2(r4, e3) {
  return r4.map((t4) => {
    var _a2, _b;
    return (_b = (_a2 = t4.default) == null ? void 0 : _a2[e3]) != null ? _b : t4[e3];
  }).filter(Boolean);
}
s4(_e2, "getField");
function Q2(r4, e3, t4 = {}) {
  return _e2(r4, e3).reduce((o4, n3) => {
    let i3 = F4(n3);
    return t4.reverseFileOrder ? [...i3, ...o4] : [...o4, ...i3];
  }, []);
}
s4(Q2, "getArrayField");
function Me2(r4, e3) {
  return Object.assign({}, ..._e2(r4, e3));
}
s4(Me2, "getObjectField");
function Te2(r4, e3) {
  return _e2(r4, e3).pop();
}
s4(Te2, "getSingletonField");
function Ee2(r4) {
  var _a2, _b;
  let e3 = Q2(r4, "argTypesEnhancers"), t4 = _e2(r4, "runStep"), o4 = Q2(r4, "beforeAll");
  return {
    parameters: M3(..._e2(r4, "parameters")),
    decorators: Q2(r4, "decorators", {
      reverseFileOrder: !((_b = (_a2 = I5.FEATURES) == null ? void 0 : _a2.legacyDecoratorFileOrder) != null ? _b : false)
    }),
    args: Me2(r4, "args"),
    argsEnhancers: Q2(r4, "argsEnhancers"),
    argTypes: Me2(r4, "argTypes"),
    argTypesEnhancers: [
      ...e3.filter((n3) => !n3.secondPass),
      ...e3.filter((n3) => n3.secondPass)
    ],
    globals: Me2(r4, "globals"),
    initialGlobals: Me2(r4, "initialGlobals"),
    globalTypes: Me2(r4, "globalTypes"),
    loaders: Q2(r4, "loaders"),
    beforeAll: Eo(o4),
    beforeEach: Q2(r4, "beforeEach"),
    experimental_afterEach: Q2(r4, "experimental_afterEach"),
    render: Te2(r4, "render"),
    renderToCanvas: Te2(r4, "renderToCanvas"),
    renderToDOM: Te2(r4, "renderToDOM"),
    // deprecated
    applyDecorators: Te2(r4, "applyDecorators"),
    runStep: Kr2(t4),
    tags: Q2(r4, "tags"),
    mount: Te2(r4, "mount"),
    testingLibraryRender: Te2(r4, "testingLibraryRender")
  };
}
s4(Ee2, "composeConfigs");
var Xr2 = class Xr3 {
  constructor() {
    this.reports = [];
  }
  async addReport(e3) {
    this.reports.push(e3);
  }
};
s4(Xr2, "ReporterAPI");
var le2 = Xr2;
function Jr2(r4, e3, t4) {
  return K4(r4) ? {
    story: r4.input,
    meta: r4.meta.input,
    preview: r4.meta.preview.composed
  } : { story: r4, meta: e3, preview: t4 };
}
s4(Jr2, "getCsfFactoryAnnotations");
function $s(r4) {
  globalThis.defaultProjectAnnotations = r4;
}
s4($s, "setDefaultProjectAnnotations");
var Ys = "ComposedStory";
var Ks = "Unnamed Story";
function Xs(r4) {
  return r4 ? Ee2([r4]) : {};
}
s4(Xs, "extractAnnotation");
function Js(r4) {
  var _a2, _b;
  let e3 = Array.isArray(r4) ? r4 : [r4];
  return globalThis.globalProjectAnnotations = Ee2([
    (_a2 = globalThis.defaultProjectAnnotations) != null ? _a2 : {},
    Ee2(e3.map(Xs))
  ]), (_b = globalThis.globalProjectAnnotations) != null ? _b : {};
}
s4(Js, "setProjectAnnotations");
var Z2 = [];
function Ro(r4, e3, t4, o4, n3) {
  var _a2, _b, _c;
  if (r4 === void 0)
    throw new Error("Expected a story but received undefined.");
  e3.title = (_a2 = e3.title) != null ? _a2 : Ys;
  let i3 = je2(e3), a4 = n3 || r4.storyName || ((_b = r4.story) == null ? void 0 : _b.name) || r4.name || Ks, l2 = Se2(
    a4,
    r4,
    i3
  ), c3 = be2(
    Ee2([
      (_c = o4 != null ? o4 : globalThis.globalProjectAnnotations) != null ? _c : {},
      t4 != null ? t4 : {}
    ])
  ), d2 = Le2(
    l2,
    i3,
    c3
  ), u3 = __spreadValues(__spreadValues(__spreadValues({}, Xe2(c3.globalTypes)), c3.initialGlobals), d2.storyGlobals), y4 = new le2(), m3 = /* @__PURE__ */ s4(() => {
    let f6 = er2(__spreadProps(__spreadValues({
      hooks: new se2(),
      globals: u3,
      args: __spreadValues({}, d2.initialArgs),
      viewMode: "story",
      reporting: y4,
      loaded: {},
      abortSignal: new AbortController().signal,
      step: /* @__PURE__ */ s4((b6, x6) => d2.runStep(b6, x6, f6), "step"),
      canvasElement: null,
      canvas: {},
      globalTypes: c3.globalTypes
    }, d2), {
      context: null,
      mount: null
    }));
    return f6.parameters.__isPortableStory = true, f6.context = f6, d2.renderToCanvas && (f6.renderToCanvas = async () => {
      var _a3;
      let b6 = await ((_a3 = d2.renderToCanvas) == null ? void 0 : _a3.call(
        d2,
        {
          componentId: d2.componentId,
          title: d2.title,
          id: d2.id,
          name: d2.name,
          tags: d2.tags,
          showMain: /* @__PURE__ */ s4(() => {
          }, "showMain"),
          showError: /* @__PURE__ */ s4((x6) => {
            throw new Error(`${x6.title}
${x6.description}`);
          }, "showError"),
          showException: /* @__PURE__ */ s4((x6) => {
            throw x6;
          }, "showException"),
          forceRemount: true,
          storyContext: f6,
          storyFn: /* @__PURE__ */ s4(() => d2.unboundStoryFn(f6), "storyFn"),
          unboundStoryFn: d2.unboundStoryFn
        },
        f6.canvasElement
      ));
      b6 && Z2.push(b6);
    }), f6.mount = d2.mount(f6), f6;
  }, "initializeContext"), g2, S6 = /* @__PURE__ */ s4(async (f6) => {
    var _a3, _b2;
    let b6 = m3();
    return (_b2 = b6.canvasElement) != null ? _b2 : b6.canvasElement = (_a3 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a3.body, g2 && (b6.loaded = g2.loaded), Object.assign(b6, f6), d2.playFunction(b6);
  }, "play"), h5 = /* @__PURE__ */ s4((f6) => {
    let b6 = m3();
    return Object.assign(b6, f6), ri(d2, b6);
  }, "run"), E3 = d2.playFunction ? S6 : void 0;
  return Object.assign(
    /* @__PURE__ */ s4(function(b6) {
      let x6 = m3();
      return g2 && (x6.loaded = g2.loaded), x6.args = __spreadValues(__spreadValues({}, x6.initialArgs), b6), d2.unboundStoryFn(x6);
    }, "storyFn"),
    {
      id: d2.id,
      storyName: a4,
      load: /* @__PURE__ */ s4(async () => {
        for (let b6 of [...Z2].reverse())
          await b6();
        Z2.length = 0;
        let f6 = m3();
        f6.loaded = await d2.applyLoaders(f6), Z2.push(...(await d2.applyBeforeEach(f6)).filter(Boolean)), g2 = f6;
      }, "load"),
      globals: u3,
      args: d2.initialArgs,
      parameters: d2.parameters,
      argTypes: d2.argTypes,
      play: E3,
      run: h5,
      reporting: y4,
      tags: d2.tags
    }
  );
}
s4(Ro, "composeStory");
var Qs = /* @__PURE__ */ s4((r4, e3, t4, o4) => Ro(r4, e3, t4, {}, o4), "defaultComposeStory");
function Zs(r4, e3, t4 = Qs) {
  let _a2 = r4, { default: o4, __esModule: n3, __namedExportsOrder: i3 } = _a2, a4 = __objRest(_a2, ["default", "__esModule", "__namedExportsOrder"]), l2 = o4;
  return Object.entries(a4).reduce(
    (d2, [p4, u3]) => {
      let { story: y4, meta: m3 } = Jr2(u3);
      return !l2 && m3 && (l2 = m3), te2(p4, l2) ? Object.assign(d2, {
        [p4]: t4(y4, l2, e3, p4)
      }) : d2;
    },
    {}
  );
}
s4(Zs, "composeStories");
function ei(r4) {
  return r4.extend({
    mount: /* @__PURE__ */ s4(async ({ mount: e3, page: t4 }, o4) => {
      await o4(async (n3, ...i3) => {
        if (!("__pw_type" in n3) || "__pw_type" in n3 && n3.__pw_type !== "jsx")
          throw new Error(P6`
              Portable stories in Playwright CT only work when referencing JSX elements.
              Please use JSX format for your components such as:

              instead of:
              await mount(MyComponent, { props: { foo: 'bar' } })

              do:
              await mount(<MyComponent foo="bar"/>)

              More info: https://storybook.js.org/docs/api/portable-stories-playwright
            `);
        await t4.evaluate(async (l2) => {
          var _a2, _b, _c;
          let c3 = await ((_a2 = globalThis.__pwUnwrapObject) == null ? void 0 : _a2.call(globalThis, l2));
          return (_c = (_b = "__pw_type" in c3 ? c3.type : c3) == null ? void 0 : _b.load) == null ? void 0 : _c.call(_b);
        }, n3);
        let a4 = await e3(n3, ...i3);
        return await t4.evaluate(async (l2) => {
          var _a2, _b;
          let c3 = await ((_a2 = globalThis.__pwUnwrapObject) == null ? void 0 : _a2.call(globalThis, l2)), d2 = "__pw_type" in c3 ? c3.type : c3, p4 = document.querySelector("#root");
          return (_b = d2 == null ? void 0 : d2.play) == null ? void 0 : _b.call(d2, { canvasElement: p4 });
        }, n3), a4;
      });
    }, "mount")
  });
}
s4(ei, "createPlaywrightTest");
async function ri(r4, e3) {
  var _a2, _b;
  for (let n3 of [...Z2].reverse())
    await n3();
  if (Z2.length = 0, !e3.canvasElement) {
    let n3 = document.createElement("div");
    (_b = (_a2 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a2.body) == null ? void 0 : _b.appendChild(n3), e3.canvasElement = n3, Z2.push(() => {
      var _a3, _b2, _c, _d;
      ((_b2 = (_a3 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a3.body) == null ? void 0 : _b2.contains(n3)) && ((_d = (_c = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _c.body) == null ? void 0 : _d.removeChild(n3));
    });
  }
  if (e3.loaded = await r4.applyLoaders(e3), e3.abortSignal.aborted)
    return;
  Z2.push(...(await r4.applyBeforeEach(e3)).filter(Boolean));
  let t4 = r4.playFunction, o4 = r4.usesMount;
  o4 || await e3.mount(), !e3.abortSignal.aborted && (t4 && (o4 || (e3.mount = async () => {
    throw new J3({ playFunction: t4.toString() });
  }), await t4(e3)), await r4.applyAfterEach(e3));
}
s4(ri, "runStory");
function wo(r4, e3) {
  return Ir2(Or2(r4, e3), (t4) => t4 === void 0);
}
s4(wo, "picky");
var vo = 1e3;
var ni = 1e4;
var Qr2 = class Qr3 {
  constructor(e3, t4, o4) {
    this.importFn = t4;
    this.getStoriesJsonData = /* @__PURE__ */ s4(() => {
      let e4 = this.getSetStoriesPayload(), t5 = ["fileName", "docsOnly", "framework", "__id", "__isArgsStory"];
      return {
        v: 3,
        stories: G4(e4.stories, (n4) => {
          let { importPath: i4 } = this.storyIndex.entries[n4.id];
          return __spreadProps(__spreadValues({}, wo(n4, ["id", "name", "title"])), {
            importPath: i4,
            // These 3 fields were going to be dropped in v7, but instead we will keep them for the
            // 7.x cycle so that v7 Storybooks can be composed successfully in v6 Storybook.
            // In v8 we will (likely) completely drop support for `extract` and `getStoriesJsonData`
            kind: n4.title,
            story: n4.name,
            parameters: __spreadProps(__spreadValues({}, wo(n4.parameters, t5)), {
              fileName: i4
            })
          });
        })
      };
    }, "getStoriesJsonData");
    this.storyIndex = new Qe2(e3), this.projectAnnotations = be2(o4);
    let { initialGlobals: n3, globalTypes: i3 } = this.projectAnnotations;
    this.args = new Ke2(), this.userGlobals = new Je2({ globals: n3, globalTypes: i3 }), this.hooks = {}, this.cleanupCallbacks = {}, this.processCSFFileWithCache = (0, tr2.default)(vo)(yo), this.prepareMetaWithCache = (0, tr2.default)(vo)(Wr2), this.prepareStoryWithCache = (0, tr2.default)(ni)(Le2);
  }
  setProjectAnnotations(e3) {
    this.projectAnnotations = be2(e3);
    let { initialGlobals: t4, globalTypes: o4 } = e3;
    this.userGlobals.set({ globals: t4, globalTypes: o4 });
  }
  // This means that one of the CSF files has changed.
  // If the `importFn` has changed, we will invalidate both caches.
  // If the `storyIndex` data has changed, we may or may not invalidate the caches, depending
  // on whether we've loaded the relevant files yet.
  async onStoriesChanged({
    importFn: e3,
    storyIndex: t4
  }) {
    e3 && (this.importFn = e3), t4 && (this.storyIndex.entries = t4.entries), this.cachedCSFFiles && await this.cacheAllCSFFiles();
  }
  // Get an entry from the index, waiting on initialization if necessary
  async storyIdToEntry(e3) {
    return this.storyIndex.storyIdToEntry(e3);
  }
  // To load a single CSF file to service a story we need to look up the importPath in the index
  async loadCSFFileByStoryId(e3) {
    let { importPath: t4, title: o4 } = this.storyIndex.storyIdToEntry(e3), n3 = await this.importFn(t4);
    return this.processCSFFileWithCache(n3, t4, o4);
  }
  async loadAllCSFFiles() {
    let e3 = {};
    return Object.entries(this.storyIndex.entries).forEach(([o4, { importPath: n3 }]) => {
      e3[n3] = o4;
    }), (await Promise.all(
      Object.entries(e3).map(async ([o4, n3]) => ({
        importPath: o4,
        csfFile: await this.loadCSFFileByStoryId(n3)
      }))
    )).reduce(
      (o4, { importPath: n3, csfFile: i3 }) => (o4[n3] = i3, o4),
      {}
    );
  }
  async cacheAllCSFFiles() {
    this.cachedCSFFiles = await this.loadAllCSFFiles();
  }
  preparedMetaFromCSFFile({ csfFile: e3 }) {
    let t4 = e3.meta;
    return this.prepareMetaWithCache(
      t4,
      this.projectAnnotations,
      e3.moduleExports.default
    );
  }
  // Load the CSF file for a story and prepare the story from it and the project annotations.
  async loadStory({ storyId: e3 }) {
    let t4 = await this.loadCSFFileByStoryId(e3);
    return this.storyFromCSFFile({ storyId: e3, csfFile: t4 });
  }
  // This function is synchronous for convenience -- often times if you have a CSF file already
  // it is easier not to have to await `loadStory`.
  storyFromCSFFile({
    storyId: e3,
    csfFile: t4
  }) {
    var _a2;
    let o4 = t4.stories[e3];
    if (!o4)
      throw new X3({ storyId: e3 });
    let n3 = t4.meta, i3 = this.prepareStoryWithCache(
      o4,
      n3,
      (_a2 = t4.projectAnnotations) != null ? _a2 : this.projectAnnotations
    );
    return this.args.setInitial(i3), this.hooks[i3.id] = this.hooks[i3.id] || new se2(), i3;
  }
  // If we have a CSF file we can get all the stories from it synchronously
  componentStoriesFromCSFFile({
    csfFile: e3
  }) {
    return Object.keys(this.storyIndex.entries).filter((t4) => !!e3.stories[t4]).map((t4) => this.storyFromCSFFile({ storyId: t4, csfFile: e3 }));
  }
  async loadEntry(e3) {
    let t4 = await this.storyIdToEntry(e3), o4 = t4.type === "docs" ? t4.storiesImports : [], [n3, ...i3] = await Promise.all([
      this.importFn(t4.importPath),
      ...o4.map((a4) => {
        let l2 = this.storyIndex.importPathToEntry(a4);
        return this.loadCSFFileByStoryId(l2.id);
      })
    ]);
    return { entryExports: n3, csfFiles: i3 };
  }
  // A prepared story does not include args, globals or hooks. These are stored in the story store
  // and updated separtely to the (immutable) story.
  getStoryContext(e3, { forceInitialArgs: t4 = false } = {}) {
    let o4 = this.userGlobals.get(), { initialGlobals: n3 } = this.userGlobals, i3 = new le2();
    return er2(__spreadProps(__spreadValues({}, e3), {
      args: t4 ? e3.initialArgs : this.args.get(e3.id),
      initialGlobals: n3,
      globalTypes: this.projectAnnotations.globalTypes,
      userGlobals: o4,
      reporting: i3,
      globals: __spreadValues(__spreadValues({}, o4), e3.storyGlobals),
      hooks: this.hooks[e3.id]
    }));
  }
  addCleanupCallbacks(e3, t4) {
    this.cleanupCallbacks[e3.id] = t4;
  }
  async cleanupStory(e3) {
    this.hooks[e3.id].clean();
    let t4 = this.cleanupCallbacks[e3.id];
    if (t4)
      for (let o4 of [...t4].reverse())
        await o4();
    delete this.cleanupCallbacks[e3.id];
  }
  extract(e3 = { includeDocsOnly: false }) {
    let { cachedCSFFiles: t4 } = this;
    if (!t4)
      throw new L3();
    return Object.entries(this.storyIndex.entries).reduce(
      (o4, [n3, { type: i3, importPath: a4 }]) => {
        if (i3 === "docs")
          return o4;
        let l2 = t4[a4], c3 = this.storyFromCSFFile({ storyId: n3, csfFile: l2 });
        return !e3.includeDocsOnly && c3.parameters.docsOnly || (o4[n3] = Object.entries(c3).reduce(
          (d2, [p4, u3]) => p4 === "moduleExport" || typeof u3 == "function" ? d2 : Array.isArray(u3) ? Object.assign(d2, { [p4]: u3.slice().sort() }) : Object.assign(d2, { [p4]: u3 }),
          {
            //
            args: c3.initialArgs,
            globals: __spreadValues(__spreadValues(__spreadValues({}, this.userGlobals.initialGlobals), this.userGlobals.globals), c3.storyGlobals)
          }
        )), o4;
      },
      {}
    );
  }
  // TODO: Remove in 9.0
  getSetStoriesPayload() {
    let e3 = this.extract({ includeDocsOnly: true }), t4 = Object.values(e3).reduce(
      (o4, { title: n3 }) => (o4[n3] = {}, o4),
      {}
    );
    return {
      v: 2,
      globals: this.userGlobals.get(),
      globalParameters: {},
      kindParameters: t4,
      stories: e3
    };
  }
  raw() {
    return m(
      "StoryStore.raw() is deprecated and will be removed in 9.0, please use extract() instead"
    ), Object.values(this.extract()).map(({ id: e3 }) => this.fromId(e3)).filter(Boolean);
  }
  fromId(e3) {
    if (m(
      "StoryStore.fromId() is deprecated and will be removed in 9.0, please use loadStory() instead"
    ), !this.cachedCSFFiles)
      throw new Error("Cannot call fromId/raw() unless you call cacheAllCSFFiles() first.");
    let t4;
    try {
      ({ importPath: t4 } = this.storyIndex.storyIdToEntry(e3));
    } catch (e4) {
      return null;
    }
    let o4 = this.cachedCSFFiles[t4], n3 = this.storyFromCSFFile({ storyId: e3, csfFile: o4 });
    return __spreadProps(__spreadValues({}, n3), {
      storyFn: /* @__PURE__ */ s4((i3) => {
        let a4 = __spreadProps(__spreadValues({}, this.getStoryContext(n3)), {
          abortSignal: new AbortController().signal,
          canvasElement: null,
          loaded: {},
          step: /* @__PURE__ */ s4((l2, c3) => n3.runStep(l2, c3, a4), "step"),
          context: null,
          mount: null,
          canvas: {},
          viewMode: "story"
        });
        return n3.unboundStoryFn(__spreadValues(__spreadValues({}, a4), i3));
      }, "storyFn")
    });
  }
};
s4(Qr2, "StoryStore");
var Re2 = Qr2;
function Zr2(r4) {
  return r4.startsWith("\\\\?\\") ? r4 : r4.replace(/\\/g, "/");
}
s4(Zr2, "slash");
function Ao(r4) {
  return r4.flatMap((e3) => e3.split("/")).filter(Boolean).join("/");
}
s4(Ao, "pathJoin");
var ee2 = new Error("prepareAborted");
var { AbortController: Do } = globalThis;
function ko(r4) {
  try {
    let { name: e3 = "Error", message: t4 = String(r4), stack: o4 } = r4;
    return { name: e3, message: t4, stack: o4 };
  } catch (e3) {
    return { name: "Error", message: String(r4) };
  }
}
s4(ko, "serializeError");
var et = class et2 {
  constructor(e3, t4, o4, n3, i3, a4, l2 = { autoplay: true, forceInitialArgs: false }, c3) {
    this.channel = e3;
    this.store = t4;
    this.renderToScreen = o4;
    this.callbacks = n3;
    this.id = i3;
    this.viewMode = a4;
    this.renderOptions = l2;
    this.type = "story";
    this.notYetRendered = true;
    this.rerenderEnqueued = false;
    this.disableKeyListeners = false;
    this.teardownRender = /* @__PURE__ */ s4(() => {
    }, "teardownRender");
    this.torndown = false;
    this.abortController = new Do(), c3 && (this.story = c3, this.phase = "preparing");
  }
  async runPhase(e3, t4, o4) {
    this.phase = t4, this.channel.emit(B, { newPhase: this.phase, storyId: this.id }), o4 && (await o4(), this.checkIfAborted(e3));
  }
  checkIfAborted(e3) {
    return e3.aborted ? (this.phase = "aborted", this.channel.emit(B, { newPhase: this.phase, storyId: this.id }), true) : false;
  }
  async prepare() {
    if (await this.runPhase(this.abortController.signal, "preparing", async () => {
      this.story = await this.store.loadStory({ storyId: this.id });
    }), this.abortController.signal.aborted)
      throw await this.store.cleanupStory(this.story), ee2;
  }
  // The two story "renders" are equal and have both loaded the same story
  isEqual(e3) {
    return !!(this.id === e3.id && this.story && this.story === e3.story);
  }
  isPreparing() {
    return ["preparing"].includes(this.phase);
  }
  isPending() {
    return ["loading", "beforeEach", "rendering", "playing", "afterEach"].includes(
      this.phase
    );
  }
  async renderToElement(e3) {
    return this.canvasElement = e3, this.render({ initial: true, forceRemount: true });
  }
  storyContext() {
    if (!this.story)
      throw new Error("Cannot call storyContext before preparing");
    let { forceInitialArgs: e3 } = this.renderOptions;
    return this.store.getStoryContext(this.story, { forceInitialArgs: e3 });
  }
  async render({
    initial: e3 = false,
    forceRemount: t4 = false
  } = {}) {
    var _a2, _b, _c, _d;
    let { canvasElement: o4 } = this;
    if (!this.story)
      throw new Error("cannot render when not prepared");
    let n3 = this.story;
    if (!o4)
      throw new Error("cannot render when canvasElement is unset");
    let {
      id: i3,
      componentId: a4,
      title: l2,
      name: c3,
      tags: d2,
      applyLoaders: p4,
      applyBeforeEach: u3,
      applyAfterEach: y4,
      unboundStoryFn: m3,
      playFunction: g2,
      runStep: S6
    } = n3;
    t4 && !e3 && (this.cancelRender(), this.abortController = new Do());
    let h5 = this.abortController.signal, E3 = false, R5 = n3.usesMount;
    try {
      let f6 = __spreadProps(__spreadValues({}, this.storyContext()), {
        viewMode: this.viewMode,
        abortSignal: h5,
        canvasElement: o4,
        loaded: {},
        step: /* @__PURE__ */ s4((C5, z5) => S6(C5, z5, f6), "step"),
        context: null,
        canvas: {},
        renderToCanvas: /* @__PURE__ */ s4(async () => {
          let C5 = await this.renderToScreen(b6, o4);
          this.teardownRender = C5 || (() => {
          }), E3 = true;
        }, "renderToCanvas"),
        // The story provides (set in a renderer) a mount function that is a higher order function
        // (context) => (...args) => Canvas
        //
        // Before assigning it to the context, we resolve the context dependency,
        // so that a user can just call it as await mount(...args) in their play function.
        mount: /* @__PURE__ */ s4(async (...C5) => {
          var _a3, _b2;
          (_b2 = (_a3 = this.callbacks).showStoryDuringRender) == null ? void 0 : _b2.call(_a3);
          let z5 = null;
          return await this.runPhase(h5, "rendering", async () => {
            z5 = await n3.mount(f6)(...C5);
          }), R5 && await this.runPhase(h5, "playing"), z5;
        }, "mount")
      });
      f6.context = f6;
      let b6 = __spreadProps(__spreadValues({
        componentId: a4,
        title: l2,
        kind: l2,
        id: i3,
        name: c3,
        story: c3,
        tags: d2
      }, this.callbacks), {
        showError: /* @__PURE__ */ s4((C5) => (this.phase = "errored", this.callbacks.showError(C5)), "showError"),
        showException: /* @__PURE__ */ s4((C5) => (this.phase = "errored", this.callbacks.showException(C5)), "showException"),
        forceRemount: t4 || this.notYetRendered,
        storyContext: f6,
        storyFn: /* @__PURE__ */ s4(() => m3(f6), "storyFn"),
        unboundStoryFn: m3
      });
      if (await this.runPhase(h5, "loading", async () => {
        f6.loaded = await p4(f6);
      }), h5.aborted)
        return;
      let x6 = await u3(f6);
      if (this.store.addCleanupCallbacks(n3, x6), this.checkIfAborted(h5) || (!E3 && !R5 && await f6.mount(), this.notYetRendered = false, h5.aborted))
        return;
      let w5 = ((_b = (_a2 = this.story.parameters) == null ? void 0 : _a2.test) == null ? void 0 : _b.dangerouslyIgnoreUnhandledErrors) === true, A4 = /* @__PURE__ */ new Set(), O5 = /* @__PURE__ */ s4((C5) => A4.add("error" in C5 ? C5.error : C5.reason), "onError");
      if (this.renderOptions.autoplay && t4 && g2 && this.phase !== "errored") {
        window.addEventListener("error", O5), window.addEventListener("unhandledrejection", O5), this.disableKeyListeners = true;
        try {
          if (R5 ? await g2(f6) : (f6.mount = async () => {
            throw new J3({ playFunction: g2.toString() });
          }, await this.runPhase(h5, "playing", async () => g2(f6))), !E3)
            throw new z2();
          this.checkIfAborted(h5), !w5 && A4.size > 0 ? await this.runPhase(h5, "errored") : await this.runPhase(h5, "played");
        } catch (C5) {
          if ((_d = (_c = this.callbacks).showStoryDuringRender) == null ? void 0 : _d.call(_c), await this.runPhase(h5, "errored", async () => {
            this.channel.emit(a2, ko(C5));
          }), this.story.parameters.throwPlayFunctionExceptions !== false)
            throw C5;
          console.error(C5);
        }
        if (!w5 && A4.size > 0 && this.channel.emit(
          Y,
          Array.from(A4).map(ko)
        ), this.disableKeyListeners = false, window.removeEventListener("unhandledrejection", O5), window.removeEventListener("error", O5), h5.aborted)
          return;
      }
      await this.runPhase(
        h5,
        "completed",
        async () => this.channel.emit(X, i3)
      ), this.phase !== "errored" && await this.runPhase(h5, "afterEach", async () => {
        await y4(f6);
      });
      let N5 = !w5 && A4.size > 0, U6 = f6.reporting.reports.some(
        (C5) => C5.status === "failed"
      ), ye3 = N5 || U6;
      await this.runPhase(
        h5,
        "finished",
        async () => this.channel.emit(q, {
          storyId: i3,
          status: ye3 ? "error" : "success",
          reporters: f6.reporting.reports
        })
      );
    } catch (f6) {
      this.phase = "errored", this.callbacks.showException(f6), await this.runPhase(
        h5,
        "finished",
        async () => this.channel.emit(q, {
          storyId: i3,
          status: "error",
          reporters: []
        })
      );
    }
    this.rerenderEnqueued && (this.rerenderEnqueued = false, this.render());
  }
  /**
   * Rerender the story. If the story is currently pending (loading/rendering), the rerender will be
   * enqueued, and will be executed after the current render is completed. Rerendering while playing
   * will not be enqueued, and will be executed immediately, to support rendering args changes while
   * playing.
   */
  async rerender() {
    if (this.isPending() && this.phase !== "playing")
      this.rerenderEnqueued = true;
    else
      return this.render();
  }
  async remount() {
    return await this.teardown(), this.render({ forceRemount: true });
  }
  // If the story is torn down (either a new story is rendered or the docs page removes it)
  // we need to consider the fact that the initial render may not be finished
  // (possibly the loaders or the play function are still running). We use the controller
  // as a method to abort them, ASAP, but this is not foolproof as we cannot control what
  // happens inside the user's code.
  cancelRender() {
    var _a2;
    (_a2 = this.abortController) == null ? void 0 : _a2.abort();
  }
  async teardown() {
    this.torndown = true, this.cancelRender(), this.story && await this.store.cleanupStory(this.story);
    for (let e3 = 0; e3 < 3; e3 += 1) {
      if (!this.isPending()) {
        await this.teardownRender();
        return;
      }
      await new Promise((t4) => setTimeout(t4, 0));
    }
    window.location.reload(), await new Promise(() => {
    });
  }
};
s4(et, "StoryRender");
var ce2 = et;
var { fetch: Fi } = I5;
var Ii = "./index.json";
var rt = class rt2 {
  constructor(e3, t4, o4 = V5.getChannel(), n3 = true) {
    this.importFn = e3;
    this.getProjectAnnotations = t4;
    this.channel = o4;
    this.storyRenders = [];
    this.storeInitializationPromise = new Promise((i3, a4) => {
      this.resolveStoreInitializationPromise = i3, this.rejectStoreInitializationPromise = a4;
    }), n3 && this.initialize();
  }
  // Create a proxy object for `__STORYBOOK_STORY_STORE__` and `__STORYBOOK_PREVIEW__.storyStore`
  // That proxies through to the store once ready, and errors beforehand. This means we can set
  // `__STORYBOOK_STORY_STORE__ = __STORYBOOK_PREVIEW__.storyStore` without having to wait, and
  // similarly integrators can access the `storyStore` on the preview at any time, although
  // it is considered deprecated and we will no longer allow access in 9.0
  get storyStore() {
    return new Proxy(
      {},
      {
        get: /* @__PURE__ */ s4((e3, t4) => {
          if (this.storyStoreValue)
            return m("Accessing the Story Store is deprecated and will be removed in 9.0"), this.storyStoreValue[t4];
          throw new U3();
        }, "get")
      }
    );
  }
  // INITIALIZATION
  async initialize() {
    this.setupListeners();
    try {
      let e3 = await this.getProjectAnnotationsOrRenderError();
      await this.runBeforeAllHook(e3), await this.initializeWithProjectAnnotations(e3);
    } catch (e3) {
      this.rejectStoreInitializationPromise(e3);
    }
  }
  ready() {
    return this.storeInitializationPromise;
  }
  setupListeners() {
    this.channel.on(m2, this.onStoryIndexChanged.bind(this)), this.channel.on(k, this.onUpdateGlobals.bind(this)), this.channel.on(z, this.onUpdateArgs.bind(this)), this.channel.on(SE, this.onRequestArgTypesInfo.bind(this)), this.channel.on(W, this.onResetArgs.bind(this)), this.channel.on(L2, this.onForceReRender.bind(this)), this.channel.on(P, this.onForceRemount.bind(this));
  }
  async getProjectAnnotationsOrRenderError() {
    try {
      let e3 = await this.getProjectAnnotations();
      if (this.renderToCanvas = e3.renderToCanvas, !this.renderToCanvas)
        throw new G3();
      return e3;
    } catch (e3) {
      throw this.renderPreviewEntryError("Error reading preview.js:", e3), e3;
    }
  }
  // If initialization gets as far as project annotations, this function runs.
  async initializeWithProjectAnnotations(e3) {
    this.projectAnnotationsBeforeInitialization = e3;
    try {
      let t4 = await this.getStoryIndexFromServer();
      return this.initializeWithStoryIndex(t4);
    } catch (t4) {
      throw this.renderPreviewEntryError("Error loading story index:", t4), t4;
    }
  }
  async runBeforeAllHook(e3) {
    var _a2, _b;
    try {
      await ((_a2 = this.beforeAllCleanup) == null ? void 0 : _a2.call(this)), this.beforeAllCleanup = await ((_b = e3.beforeAll) == null ? void 0 : _b.call(e3));
    } catch (t4) {
      throw this.renderPreviewEntryError("Error in beforeAll hook:", t4), t4;
    }
  }
  async getStoryIndexFromServer() {
    let e3 = await Fi(Ii);
    if (e3.status === 200)
      return e3.json();
    throw new M2({ text: await e3.text() });
  }
  // If initialization gets as far as the story index, this function runs.
  initializeWithStoryIndex(e3) {
    if (!this.projectAnnotationsBeforeInitialization)
      throw new Error("Cannot call initializeWithStoryIndex until project annotations resolve");
    this.storyStoreValue = new Re2(
      e3,
      this.importFn,
      this.projectAnnotationsBeforeInitialization
    ), delete this.projectAnnotationsBeforeInitialization, this.setInitialGlobals(), this.resolveStoreInitializationPromise();
  }
  async setInitialGlobals() {
    this.emitGlobals();
  }
  emitGlobals() {
    if (!this.storyStoreValue)
      throw new Y3({ methodName: "emitGlobals" });
    let e3 = {
      globals: this.storyStoreValue.userGlobals.get() || {},
      globalTypes: this.storyStoreValue.projectAnnotations.globalTypes || {}
    };
    this.channel.emit(u2, e3);
  }
  // EVENT HANDLERS
  // This happens when a config file gets reloaded
  async onGetProjectAnnotationsChanged({
    getProjectAnnotations: e3
  }) {
    delete this.previewEntryError, this.getProjectAnnotations = e3;
    let t4 = await this.getProjectAnnotationsOrRenderError();
    if (await this.runBeforeAllHook(t4), !this.storyStoreValue) {
      await this.initializeWithProjectAnnotations(t4);
      return;
    }
    this.storyStoreValue.setProjectAnnotations(t4), this.emitGlobals();
  }
  async onStoryIndexChanged() {
    if (delete this.previewEntryError, !(!this.storyStoreValue && !this.projectAnnotationsBeforeInitialization))
      try {
        let e3 = await this.getStoryIndexFromServer();
        if (this.projectAnnotationsBeforeInitialization) {
          this.initializeWithStoryIndex(e3);
          return;
        }
        await this.onStoriesChanged({ storyIndex: e3 });
      } catch (e3) {
        throw this.renderPreviewEntryError("Error loading story index:", e3), e3;
      }
  }
  // This happens when a glob gets HMR-ed
  async onStoriesChanged({
    importFn: e3,
    storyIndex: t4
  }) {
    if (!this.storyStoreValue)
      throw new Y3({ methodName: "onStoriesChanged" });
    await this.storyStoreValue.onStoriesChanged({ importFn: e3, storyIndex: t4 });
  }
  async onUpdateGlobals({
    globals: e3,
    currentStory: t4
  }) {
    if (this.storyStoreValue || await this.storeInitializationPromise, !this.storyStoreValue)
      throw new Y3({ methodName: "onUpdateGlobals" });
    if (this.storyStoreValue.userGlobals.update(e3), t4) {
      let { initialGlobals: o4, storyGlobals: n3, userGlobals: i3, globals: a4 } = this.storyStoreValue.getStoryContext(t4);
      this.channel.emit(U, {
        initialGlobals: o4,
        userGlobals: i3,
        storyGlobals: n3,
        globals: a4
      });
    } else {
      let { initialGlobals: o4, globals: n3 } = this.storyStoreValue.userGlobals;
      this.channel.emit(U, {
        initialGlobals: o4,
        userGlobals: n3,
        storyGlobals: {},
        globals: n3
      });
    }
    await Promise.all(this.storyRenders.map((o4) => o4.rerender()));
  }
  async onUpdateArgs({ storyId: e3, updatedArgs: t4 }) {
    if (!this.storyStoreValue)
      throw new Y3({ methodName: "onUpdateArgs" });
    this.storyStoreValue.args.update(e3, t4), await Promise.all(
      this.storyRenders.filter((o4) => o4.id === e3 && !o4.renderOptions.forceInitialArgs).map(
        (o4) => (
          // We only run the play function, with in a force remount.
          // But when mount is destructured, the rendering happens inside of the play function.
          o4.story && o4.story.usesMount ? o4.remount() : o4.rerender()
        )
      )
    ), this.channel.emit(f2, {
      storyId: e3,
      args: this.storyStoreValue.args.get(e3)
    });
  }
  async onRequestArgTypesInfo({ id: e3, payload: t4 }) {
    var _a2;
    try {
      await this.storeInitializationPromise;
      let o4 = await ((_a2 = this.storyStoreValue) == null ? void 0 : _a2.loadStory(t4));
      this.channel.emit(TE, {
        id: e3,
        success: true,
        payload: { argTypes: (o4 == null ? void 0 : o4.argTypes) || {} },
        error: null
      });
    } catch (o4) {
      this.channel.emit(TE, {
        id: e3,
        success: false,
        error: o4 == null ? void 0 : o4.message
      });
    }
  }
  async onResetArgs({ storyId: e3, argNames: t4 }) {
    var _a2;
    if (!this.storyStoreValue)
      throw new Y3({ methodName: "onResetArgs" });
    let n3 = ((_a2 = this.storyRenders.find((l2) => l2.id === e3)) == null ? void 0 : _a2.story) || await this.storyStoreValue.loadStory({ storyId: e3 }), a4 = (t4 || [
      .../* @__PURE__ */ new Set([
        ...Object.keys(n3.initialArgs),
        ...Object.keys(this.storyStoreValue.args.get(e3))
      ])
    ]).reduce((l2, c3) => (l2[c3] = n3.initialArgs[c3], l2), {});
    await this.onUpdateArgs({ storyId: e3, updatedArgs: a4 });
  }
  // ForceReRender does not include a story id, so we simply must
  // re-render all stories in case they are relevant
  async onForceReRender() {
    await Promise.all(this.storyRenders.map((e3) => e3.rerender()));
  }
  async onForceRemount({ storyId: e3 }) {
    await Promise.all(this.storyRenders.filter((t4) => t4.id === e3).map((t4) => t4.remount()));
  }
  // Used by docs to render a story to a given element
  // Note this short-circuits the `prepare()` phase of the StoryRender,
  // main to be consistent with the previous behaviour. In the future,
  // we will change it to go ahead and load the story, which will end up being
  // "instant", although async.
  renderStoryToElement(e3, t4, o4, n3) {
    if (!this.renderToCanvas || !this.storyStoreValue)
      throw new Y3({
        methodName: "renderStoryToElement"
      });
    let i3 = new ce2(
      this.channel,
      this.storyStoreValue,
      this.renderToCanvas,
      o4,
      e3.id,
      "docs",
      n3,
      e3
    );
    return i3.renderToElement(t4), this.storyRenders.push(i3), async () => {
      await this.teardownRender(i3);
    };
  }
  async teardownRender(e3, { viewModeChanged: t4 } = {}) {
    var _a2;
    this.storyRenders = this.storyRenders.filter((o4) => o4 !== e3), await ((_a2 = e3 == null ? void 0 : e3.teardown) == null ? void 0 : _a2.call(e3, { viewModeChanged: t4 }));
  }
  // API
  async loadStory({ storyId: e3 }) {
    if (!this.storyStoreValue)
      throw new Y3({ methodName: "loadStory" });
    return this.storyStoreValue.loadStory({ storyId: e3 });
  }
  getStoryContext(e3, { forceInitialArgs: t4 = false } = {}) {
    if (!this.storyStoreValue)
      throw new Y3({ methodName: "getStoryContext" });
    return this.storyStoreValue.getStoryContext(e3, { forceInitialArgs: t4 });
  }
  async extract(e3) {
    if (!this.storyStoreValue)
      throw new Y3({ methodName: "extract" });
    if (this.previewEntryError)
      throw this.previewEntryError;
    return await this.storyStoreValue.cacheAllCSFFiles(), this.storyStoreValue.extract(e3);
  }
  // UTILITIES
  renderPreviewEntryError(e3, t4) {
    this.previewEntryError = t4, s.error(e3), s.error(t4), this.channel.emit(N, t4);
  }
};
s4(rt, "Preview");
var xe2 = rt;
var Oi = false;
var tt = "Invariant failed";
function or2(r4, e3) {
  if (!r4) {
    if (Oi)
      throw new Error(tt);
    var t4 = typeof e3 == "function" ? e3() : e3, o4 = t4 ? "".concat(tt, ": ").concat(t4) : tt;
    throw new Error(o4);
  }
}
s4(or2, "invariant");
var ot2 = class ot3 {
  constructor(e3, t4, o4, n3) {
    this.channel = e3;
    this.store = t4;
    this.renderStoryToElement = o4;
    this.storyIdByName = /* @__PURE__ */ s4((e4) => {
      let t5 = this.nameToStoryId.get(e4);
      if (t5)
        return t5;
      throw new Error(`No story found with that name: ${e4}`);
    }, "storyIdByName");
    this.componentStories = /* @__PURE__ */ s4(() => this.componentStoriesValue, "componentStories");
    this.componentStoriesFromCSFFile = /* @__PURE__ */ s4((e4) => this.store.componentStoriesFromCSFFile({ csfFile: e4 }), "componentStoriesFromCSFFile");
    this.storyById = /* @__PURE__ */ s4((e4) => {
      if (!e4) {
        if (!this.primaryStory)
          throw new Error(
            "No primary story defined for docs entry. Did you forget to use `<Meta>`?"
          );
        return this.primaryStory;
      }
      let t5 = this.storyIdToCSFFile.get(e4);
      if (!t5)
        throw new Error(`Called \`storyById\` for story that was never loaded: ${e4}`);
      return this.store.storyFromCSFFile({ storyId: e4, csfFile: t5 });
    }, "storyById");
    this.getStoryContext = /* @__PURE__ */ s4((e4) => __spreadProps(__spreadValues({}, this.store.getStoryContext(e4)), {
      loaded: {},
      viewMode: "docs"
    }), "getStoryContext");
    this.loadStory = /* @__PURE__ */ s4((e4) => this.store.loadStory({ storyId: e4 }), "loadStory");
    this.componentStoriesValue = [], this.storyIdToCSFFile = /* @__PURE__ */ new Map(), this.exportToStory = /* @__PURE__ */ new Map(), this.exportsToCSFFile = /* @__PURE__ */ new Map(), this.nameToStoryId = /* @__PURE__ */ new Map(), this.attachedCSFFiles = /* @__PURE__ */ new Set(), n3.forEach((i3, a4) => {
      this.referenceCSFFile(i3);
    });
  }
  // This docs entry references this CSF file and can synchronously load the stories, as well
  // as reference them by module export. If the CSF is part of the "component" stories, they
  // can also be referenced by name and are in the componentStories list.
  referenceCSFFile(e3) {
    this.exportsToCSFFile.set(e3.moduleExports, e3), this.exportsToCSFFile.set(e3.moduleExports.default, e3), this.store.componentStoriesFromCSFFile(
      { csfFile: e3 }
    ).forEach((o4) => {
      let n3 = e3.stories[o4.id];
      this.storyIdToCSFFile.set(n3.id, e3), this.exportToStory.set(n3.moduleExport, o4);
    });
  }
  attachCSFFile(e3) {
    if (!this.exportsToCSFFile.has(e3.moduleExports))
      throw new Error("Cannot attach a CSF file that has not been referenced");
    if (this.attachedCSFFiles.has(e3))
      return;
    this.attachedCSFFiles.add(e3), this.store.componentStoriesFromCSFFile({ csfFile: e3 }).forEach((o4) => {
      this.nameToStoryId.set(o4.name, o4.id), this.componentStoriesValue.push(o4), this.primaryStory || (this.primaryStory = o4);
    });
  }
  referenceMeta(e3, t4) {
    let o4 = this.resolveModuleExport(e3);
    if (o4.type !== "meta")
      throw new Error(
        "<Meta of={} /> must reference a CSF file module export or meta export. Did you mistakenly reference your component instead of your CSF file?"
      );
    t4 && this.attachCSFFile(o4.csfFile);
  }
  get projectAnnotations() {
    let { projectAnnotations: e3 } = this.store;
    if (!e3)
      throw new Error("Can't get projectAnnotations from DocsContext before they are initialized");
    return e3;
  }
  resolveAttachedModuleExportType(e3) {
    if (e3 === "story") {
      if (!this.primaryStory)
        throw new Error(
          "No primary story attached to this docs file, did you forget to use <Meta of={} />?"
        );
      return { type: "story", story: this.primaryStory };
    }
    if (this.attachedCSFFiles.size === 0)
      throw new Error(
        "No CSF file attached to this docs file, did you forget to use <Meta of={} />?"
      );
    let t4 = Array.from(this.attachedCSFFiles)[0];
    if (e3 === "meta")
      return { type: "meta", csfFile: t4 };
    let { component: o4 } = t4.meta;
    if (!o4)
      throw new Error(
        "Attached CSF file does not defined a component, did you forget to export one?"
      );
    return { type: "component", component: o4 };
  }
  resolveModuleExport(e3) {
    let t4 = this.exportsToCSFFile.get(e3);
    if (t4)
      return { type: "meta", csfFile: t4 };
    let o4 = this.exportToStory.get(
      K4(e3) ? e3.input : e3
    );
    return o4 ? { type: "story", story: o4 } : { type: "component", component: e3 };
  }
  resolveOf(e3, t4 = []) {
    let o4;
    if (["component", "meta", "story"].includes(e3)) {
      let n3 = e3;
      o4 = this.resolveAttachedModuleExportType(n3);
    } else
      o4 = this.resolveModuleExport(e3);
    if (t4.length && !t4.includes(o4.type)) {
      let n3 = o4.type === "component" ? "component or unknown" : o4.type;
      throw new Error(P6`Invalid value passed to the 'of' prop. The value was resolved to a '${n3}' type but the only types for this block are: ${t4.join(
        ", "
      )}.
        - Did you pass a component to the 'of' prop when the block only supports a story or a meta?
        - ... or vice versa?
        - Did you pass a story, CSF file or meta to the 'of' prop that is not indexed, ie. is not targeted by the 'stories' globs in the main configuration?`);
    }
    switch (o4.type) {
      case "component":
        return __spreadProps(__spreadValues({}, o4), {
          projectAnnotations: this.projectAnnotations
        });
      case "meta":
        return __spreadProps(__spreadValues({}, o4), {
          preparedMeta: this.store.preparedMetaFromCSFFile({ csfFile: o4.csfFile })
        });
      case "story":
      default:
        return o4;
    }
  }
};
s4(ot2, "DocsContext");
var re2 = ot2;
var nt = class nt2 {
  constructor(e3, t4, o4, n3) {
    this.channel = e3;
    this.store = t4;
    this.entry = o4;
    this.callbacks = n3;
    this.type = "docs";
    this.subtype = "csf";
    this.torndown = false;
    this.disableKeyListeners = false;
    this.preparing = false;
    this.id = o4.id;
  }
  isPreparing() {
    return this.preparing;
  }
  async prepare() {
    this.preparing = true;
    let { entryExports: e3, csfFiles: t4 = [] } = await this.store.loadEntry(this.id);
    if (this.torndown)
      throw ee2;
    let { importPath: o4, title: n3 } = this.entry, i3 = this.store.processCSFFileWithCache(
      e3,
      o4,
      n3
    ), a4 = Object.keys(i3.stories)[0];
    this.story = this.store.storyFromCSFFile({ storyId: a4, csfFile: i3 }), this.csfFiles = [i3, ...t4], this.preparing = false;
  }
  isEqual(e3) {
    return !!(this.id === e3.id && this.story && this.story === e3.story);
  }
  docsContext(e3) {
    if (!this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    let t4 = new re2(
      this.channel,
      this.store,
      e3,
      this.csfFiles
    );
    return this.csfFiles.forEach((o4) => t4.attachCSFFile(o4)), t4;
  }
  async renderToElement(e3, t4) {
    if (!this.story || !this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    let o4 = this.docsContext(t4), { docs: n3 } = this.story.parameters || {};
    if (!n3)
      throw new Error(
        "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed"
      );
    let i3 = await n3.renderer(), { render: a4 } = i3, l2 = /* @__PURE__ */ s4(async () => {
      try {
        await a4(o4, n3, e3), this.channel.emit(I, this.id);
      } catch (c3) {
        this.callbacks.showException(c3);
      }
    }, "renderDocs");
    return this.rerender = async () => l2(), this.teardownRender = async ({ viewModeChanged: c3 }) => {
      !c3 || !e3 || i3.unmount(e3);
    }, l2();
  }
  async teardown({ viewModeChanged: e3 } = {}) {
    var _a2;
    (_a2 = this.teardownRender) == null ? void 0 : _a2.call(this, { viewModeChanged: e3 }), this.torndown = true;
  }
};
s4(nt, "CsfDocsRender");
var qe2 = nt;
var st2 = class st3 {
  constructor(e3, t4, o4, n3) {
    this.channel = e3;
    this.store = t4;
    this.entry = o4;
    this.callbacks = n3;
    this.type = "docs";
    this.subtype = "mdx";
    this.torndown = false;
    this.disableKeyListeners = false;
    this.preparing = false;
    this.id = o4.id;
  }
  isPreparing() {
    return this.preparing;
  }
  async prepare() {
    this.preparing = true;
    let { entryExports: e3, csfFiles: t4 = [] } = await this.store.loadEntry(this.id);
    if (this.torndown)
      throw ee2;
    this.csfFiles = t4, this.exports = e3, this.preparing = false;
  }
  isEqual(e3) {
    return !!(this.id === e3.id && this.exports && this.exports === e3.exports);
  }
  docsContext(e3) {
    if (!this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    return new re2(
      this.channel,
      this.store,
      e3,
      this.csfFiles
    );
  }
  async renderToElement(e3, t4) {
    if (!this.exports || !this.csfFiles || !this.store.projectAnnotations)
      throw new Error("Cannot render docs before preparing");
    let o4 = this.docsContext(t4), { docs: n3 } = this.store.projectAnnotations.parameters || {};
    if (!n3)
      throw new Error(
        "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed"
      );
    let i3 = __spreadProps(__spreadValues({}, n3), { page: this.exports.default }), a4 = await n3.renderer(), { render: l2 } = a4, c3 = /* @__PURE__ */ s4(async () => {
      try {
        await l2(o4, i3, e3), this.channel.emit(I, this.id);
      } catch (d2) {
        this.callbacks.showException(d2);
      }
    }, "renderDocs");
    return this.rerender = async () => c3(), this.teardownRender = async ({ viewModeChanged: d2 } = {}) => {
      !d2 || !e3 || (a4.unmount(e3), this.torndown = true);
    }, c3();
  }
  async teardown({ viewModeChanged: e3 } = {}) {
    var _a2;
    (_a2 = this.teardownRender) == null ? void 0 : _a2.call(this, { viewModeChanged: e3 }), this.torndown = true;
  }
};
s4(st2, "MdxDocsRender");
var Ue2 = st2;
var Ki = globalThis;
function Xi(r4) {
  let e3 = r4.composedPath && r4.composedPath()[0] || r4.target;
  return /input|textarea/i.test(e3.tagName) || e3.getAttribute("contenteditable") !== null;
}
s4(Xi, "focusInInput");
var Go = "attached-mdx";
var Ji = "unattached-mdx";
function Qi({ tags: r4 }) {
  return (r4 == null ? void 0 : r4.includes(Ji)) || (r4 == null ? void 0 : r4.includes(Go));
}
s4(Qi, "isMdxEntry");
function at2(r4) {
  return r4.type === "story";
}
s4(at2, "isStoryRender");
function Zi(r4) {
  return r4.type === "docs";
}
s4(Zi, "isDocsRender");
function ea(r4) {
  return Zi(r4) && r4.subtype === "csf";
}
s4(ea, "isCsfDocsRender");
var lt2 = class lt3 extends xe2 {
  constructor(t4, o4, n3, i3) {
    super(t4, o4, void 0, false);
    this.importFn = t4;
    this.getProjectAnnotations = o4;
    this.selectionStore = n3;
    this.view = i3;
    this.initialize();
  }
  setupListeners() {
    super.setupListeners(), Ki.onkeydown = this.onKeydown.bind(this), this.channel.on(p, this.onSetCurrentStory.bind(this)), this.channel.on(
      n2,
      this.onUpdateQueryParams.bind(this)
    ), this.channel.on(t2, this.onPreloadStories.bind(this));
  }
  async setInitialGlobals() {
    if (!this.storyStoreValue)
      throw new Y3({ methodName: "setInitialGlobals" });
    let { globals: t4 } = this.selectionStore.selectionSpecifier || {};
    t4 && this.storyStoreValue.userGlobals.updateFromPersisted(t4), this.emitGlobals();
  }
  // If initialization gets as far as the story index, this function runs.
  async initializeWithStoryIndex(t4) {
    return await super.initializeWithStoryIndex(t4), this.selectSpecifiedStory();
  }
  // Use the selection specifier to choose a story, then render it
  async selectSpecifiedStory() {
    if (!this.storyStoreValue)
      throw new Y3({
        methodName: "selectSpecifiedStory"
      });
    if (this.selectionStore.selection) {
      await this.renderSelection();
      return;
    }
    if (!this.selectionStore.selectionSpecifier) {
      this.renderMissingStory();
      return;
    }
    let { storySpecifier: t4, args: o4 } = this.selectionStore.selectionSpecifier, n3 = this.storyStoreValue.storyIndex.entryFromSpecifier(t4);
    if (!n3) {
      t4 === "*" ? this.renderStoryLoadingException(t4, new F3()) : this.renderStoryLoadingException(
        t4,
        new K3({ storySpecifier: t4.toString() })
      );
      return;
    }
    let { id: i3, type: a4 } = n3;
    this.selectionStore.setSelection({ storyId: i3, viewMode: a4 }), this.channel.emit(b2, this.selectionStore.selection), this.channel.emit(
      r2,
      this.selectionStore.selection
    ), await this.renderSelection({ persistedArgs: o4 });
  }
  // EVENT HANDLERS
  // This happens when a config file gets reloaded
  async onGetProjectAnnotationsChanged({
    getProjectAnnotations: t4
  }) {
    await super.onGetProjectAnnotationsChanged({ getProjectAnnotations: t4 }), this.selectionStore.selection && this.renderSelection();
  }
  // This happens when a glob gets HMR-ed
  async onStoriesChanged({
    importFn: t4,
    storyIndex: o4
  }) {
    await super.onStoriesChanged({ importFn: t4, storyIndex: o4 }), this.selectionStore.selection ? await this.renderSelection() : await this.selectSpecifiedStory();
  }
  onKeydown(t4) {
    if (!this.storyRenders.find((o4) => o4.disableKeyListeners) && !Xi(t4)) {
      let { altKey: o4, ctrlKey: n3, metaKey: i3, shiftKey: a4, key: l2, code: c3, keyCode: d2 } = t4;
      this.channel.emit(e, {
        event: { altKey: o4, ctrlKey: n3, metaKey: i3, shiftKey: a4, key: l2, code: c3, keyCode: d2 }
      });
    }
  }
  async onSetCurrentStory(t4) {
    this.selectionStore.setSelection(__spreadValues({ viewMode: "story" }, t4)), await this.storeInitializationPromise, this.channel.emit(r2, this.selectionStore.selection), this.renderSelection();
  }
  onUpdateQueryParams(t4) {
    this.selectionStore.setQueryParams(t4);
  }
  async onUpdateGlobals({ globals: t4 }) {
    var _a2, _b;
    let o4 = this.currentRender instanceof ce2 && this.currentRender.story || void 0;
    super.onUpdateGlobals({ globals: t4, currentStory: o4 }), (this.currentRender instanceof Ue2 || this.currentRender instanceof qe2) && await ((_b = (_a2 = this.currentRender).rerender) == null ? void 0 : _b.call(_a2));
  }
  async onUpdateArgs({ storyId: t4, updatedArgs: o4 }) {
    super.onUpdateArgs({ storyId: t4, updatedArgs: o4 });
  }
  async onPreloadStories({ ids: t4 }) {
    await this.storeInitializationPromise, this.storyStoreValue && await Promise.allSettled(t4.map((o4) => {
      var _a2;
      return (_a2 = this.storyStoreValue) == null ? void 0 : _a2.loadEntry(o4);
    }));
  }
  // RENDERING
  // We can either have:
  // - a story selected in "story" viewMode,
  //     in which case we render it to the root element, OR
  // - a story selected in "docs" viewMode,
  //     in which case we render the docsPage for that story
  async renderSelection({ persistedArgs: t4 } = {}) {
    var _a2, _b, _c, _d;
    let { renderToCanvas: o4 } = this;
    if (!this.storyStoreValue || !o4)
      throw new Y3({ methodName: "renderSelection" });
    let { selection: n3 } = this.selectionStore;
    if (!n3)
      throw new Error("Cannot call renderSelection as no selection was made");
    let { storyId: i3 } = n3, a4;
    try {
      a4 = await this.storyStoreValue.storyIdToEntry(i3);
    } catch (m3) {
      this.currentRender && await this.teardownRender(this.currentRender), this.renderStoryLoadingException(i3, m3);
      return;
    }
    let l2 = ((_a2 = this.currentSelection) == null ? void 0 : _a2.storyId) !== i3, c3 = ((_b = this.currentRender) == null ? void 0 : _b.type) !== a4.type;
    a4.type === "story" ? this.view.showPreparingStory({ immediate: c3 }) : this.view.showPreparingDocs({ immediate: c3 }), ((_c = this.currentRender) == null ? void 0 : _c.isPreparing()) && await this.teardownRender(this.currentRender);
    let d2;
    a4.type === "story" ? d2 = new ce2(
      this.channel,
      this.storyStoreValue,
      o4,
      this.mainStoryCallbacks(i3),
      i3,
      "story"
    ) : Qi(a4) ? d2 = new Ue2(
      this.channel,
      this.storyStoreValue,
      a4,
      this.mainStoryCallbacks(i3)
    ) : d2 = new qe2(
      this.channel,
      this.storyStoreValue,
      a4,
      this.mainStoryCallbacks(i3)
    );
    let p4 = this.currentSelection;
    this.currentSelection = n3;
    let u3 = this.currentRender;
    this.currentRender = d2;
    try {
      await d2.prepare();
    } catch (m3) {
      u3 && await this.teardownRender(u3), m3 !== ee2 && this.renderStoryLoadingException(i3, m3);
      return;
    }
    let y4 = !l2 && u3 && !d2.isEqual(u3);
    if (t4 && at2(d2) && (or2(!!d2.story), this.storyStoreValue.args.updateFromPersisted(d2.story, t4)), u3 && !u3.torndown && !l2 && !y4 && !c3) {
      this.currentRender = u3, this.channel.emit(j, i3), this.view.showMain();
      return;
    }
    if (u3 && await this.teardownRender(u3, { viewModeChanged: c3 }), p4 && (l2 || c3) && this.channel.emit(Q, i3), at2(d2)) {
      or2(!!d2.story);
      let {
        parameters: m3,
        initialArgs: g2,
        argTypes: S6,
        unmappedArgs: h5,
        initialGlobals: E3,
        userGlobals: R5,
        storyGlobals: f6,
        globals: b6
      } = this.storyStoreValue.getStoryContext(d2.story);
      this.channel.emit(w, {
        id: i3,
        parameters: m3,
        initialArgs: g2,
        argTypes: S6,
        args: h5
      }), this.channel.emit(U, { userGlobals: R5, storyGlobals: f6, globals: b6, initialGlobals: E3 });
    } else {
      let { parameters: m3 } = this.storyStoreValue.projectAnnotations, { initialGlobals: g2, globals: S6 } = this.storyStoreValue.userGlobals;
      if (this.channel.emit(U, {
        globals: S6,
        initialGlobals: g2,
        storyGlobals: {},
        userGlobals: S6
      }), ea(d2) || ((_d = d2.entry.tags) == null ? void 0 : _d.includes(Go))) {
        if (!d2.csfFiles)
          throw new H3({ storyId: i3 });
        ({ parameters: m3 } = this.storyStoreValue.preparedMetaFromCSFFile({
          csfFile: d2.csfFiles[0]
        }));
      }
      this.channel.emit(D, {
        id: i3,
        parameters: m3
      });
    }
    at2(d2) ? (or2(!!d2.story), this.storyRenders.push(d2), this.currentRender.renderToElement(
      this.view.prepareForStory(d2.story)
    )) : this.currentRender.renderToElement(
      this.view.prepareForDocs(),
      // This argument is used for docs, which is currently only compatible with HTMLElements
      this.renderStoryToElement.bind(this)
    );
  }
  async teardownRender(t4, { viewModeChanged: o4 = false } = {}) {
    var _a2;
    this.storyRenders = this.storyRenders.filter((n3) => n3 !== t4), await ((_a2 = t4 == null ? void 0 : t4.teardown) == null ? void 0 : _a2.call(t4, { viewModeChanged: o4 }));
  }
  // UTILITIES
  mainStoryCallbacks(t4) {
    return {
      showStoryDuringRender: /* @__PURE__ */ s4(() => this.view.showStoryDuringRender(), "showStoryDuringRender"),
      showMain: /* @__PURE__ */ s4(() => this.view.showMain(), "showMain"),
      showError: /* @__PURE__ */ s4((o4) => this.renderError(t4, o4), "showError"),
      showException: /* @__PURE__ */ s4((o4) => this.renderException(t4, o4), "showException")
    };
  }
  renderPreviewEntryError(t4, o4) {
    super.renderPreviewEntryError(t4, o4), this.view.showErrorDisplay(o4);
  }
  renderMissingStory() {
    this.view.showNoPreview(), this.channel.emit(V);
  }
  renderStoryLoadingException(t4, o4) {
    s.error(o4), this.view.showErrorDisplay(o4), this.channel.emit(V, t4);
  }
  // renderException is used if we fail to render the story and it is uncaught by the app layer
  renderException(t4, o4) {
    let { name: n3 = "Error", message: i3 = String(o4), stack: a4 } = o4;
    this.channel.emit(K, { name: n3, message: i3, stack: a4 }), this.channel.emit(B, { newPhase: "errored", storyId: t4 }), this.view.showErrorDisplay(
      o4
    ), s.error(`Error rendering story '${t4}':`), s.error(o4);
  }
  // renderError is used by the various app layers to inform the user they have done something
  // wrong -- for instance returned the wrong thing from a story
  renderError(t4, { title: o4, description: n3 }) {
    s.error(`Error rendering story ${o4}: ${n3}`), this.channel.emit(x, { title: o4, description: n3 }), this.channel.emit(B, { newPhase: "errored", storyId: t4 }), this.view.showErrorDisplay({
      message: o4,
      stack: n3
    });
  }
};
s4(lt2, "PreviewWithSelection");
var we2 = lt2;
var Be2 = he2(cr2(), 1);
var en2 = he2(cr2(), 1);
var Zo = /^[a-zA-Z0-9 _-]*$/;
var rn2 = /^-?[0-9]+(\.[0-9]+)?$/;
var Ca = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i;
var tn2 = /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i;
var ht3 = /* @__PURE__ */ s4((r4 = "", e3) => r4 === null || r4 === "" || !Zo.test(r4) ? false : e3 == null || e3 instanceof Date || typeof e3 == "number" || typeof e3 == "boolean" ? true : typeof e3 == "string" ? Zo.test(e3) || rn2.test(e3) || Ca.test(e3) || tn2.test(e3) : Array.isArray(e3) ? e3.every((t4) => ht3(
  r4,
  t4
)) : L5(e3) ? Object.entries(e3).every(([t4, o4]) => ht3(t4, o4)) : false, "validateArgs");
var Pa = {
  delimiter: ";",
  // we're parsing a single query param
  nesting: true,
  arrayRepeat: true,
  arrayRepeatSyntax: "bracket",
  nestingSyntax: "js",
  // objects are encoded using dot notation
  valueDeserializer(r4) {
    if (r4.startsWith("!")) {
      if (r4 === "!undefined")
        return;
      if (r4 === "!null")
        return null;
      if (r4 === "!true")
        return true;
      if (r4 === "!false")
        return false;
      if (r4.startsWith("!date(") && r4.endsWith(")"))
        return new Date(r4.replaceAll(" ", "+").slice(6, -1));
      if (r4.startsWith("!hex(") && r4.endsWith(")"))
        return `#${r4.slice(5, -1)}`;
      let e3 = r4.slice(1).match(tn2);
      if (e3)
        return r4.startsWith("!rgba") || r4.startsWith("!RGBA") ? `${e3[1]}(${e3[2]}, ${e3[3]}, ${e3[4]}, ${e3[5]})` : r4.startsWith("!hsla") || r4.startsWith(
          "!HSLA"
        ) ? `${e3[1]}(${e3[2]}, ${e3[3]}%, ${e3[4]}%, ${e3[5]})` : r4.startsWith("!rgb") || r4.startsWith("!RGB") ? `${e3[1]}(${e3[2]}, ${e3[3]}, ${e3[4]})` : `${e3[1]}(${e3[2]}, ${e3[3]}%, ${e3[4]}%)`;
    }
    return rn2.test(r4) ? Number(r4) : r4;
  }
};
var mt2 = /* @__PURE__ */ s4((r4) => {
  let e3 = r4.split(";").map((t4) => t4.replace("=", "~").replace(":", "="));
  return Object.entries((0, en2.parse)(e3.join(";"), Pa)).reduce((t4, [o4, n3]) => ht3(o4, n3) ? Object.assign(t4, { [o4]: n3 }) : (n.warn(P6`
      Omitted potentially unsafe URL args.

      More info: https://storybook.js.org/docs/writing-stories/args#setting-args-through-the-url
    `), t4), {});
}, "parseArgsParam");
var { history: on2, document: te3 } = I5;
function Fa(r4) {
  let e3 = (r4 || "").match(/^\/story\/(.+)/);
  if (!e3)
    throw new Error(`Invalid path '${r4}',  must start with '/story/'`);
  return e3[1];
}
s4(Fa, "pathToId");
var nn2 = /* @__PURE__ */ s4(({
  selection: r4,
  extraParams: e3
}) => {
  let t4 = te3 == null ? void 0 : te3.location.search.slice(1), _a2 = (0, Be2.parse)(t4), { path: o4, selectedKind: n3, selectedStory: i3 } = _a2, a4 = __objRest(_a2, ["path", "selectedKind", "selectedStory"]);
  return `?${(0, Be2.stringify)(__spreadValues(__spreadValues(__spreadValues({}, a4), e3), r4 && { id: r4.storyId, viewMode: r4.viewMode }))}`;
}, "getQueryString");
var Ia = /* @__PURE__ */ s4((r4) => {
  if (!r4)
    return;
  let e3 = nn2({ selection: r4 }), { hash: t4 = "" } = te3.location;
  te3.title = r4.storyId, on2.replaceState({}, "", `${te3.location.pathname}${e3}${t4}`);
}, "setPath");
var Oa = /* @__PURE__ */ s4((r4) => r4 != null && typeof r4 == "object" && Array.isArray(r4) === false, "isObject");
var Ge2 = /* @__PURE__ */ s4(
  (r4) => {
    if (r4 !== void 0) {
      if (typeof r4 == "string")
        return r4;
      if (Array.isArray(r4))
        return Ge2(r4[0]);
      if (Oa(r4))
        return Ge2(
          Object.values(r4).filter(Boolean)
        );
    }
  },
  "getFirstString"
);
var Da = /* @__PURE__ */ s4(() => {
  if (typeof te3 < "u") {
    let r4 = te3.location.search.slice(1), e3 = (0, Be2.parse)(r4), t4 = typeof e3.args == "string" ? mt2(e3.args) : void 0, o4 = typeof e3.globals == "string" ? mt2(e3.globals) : void 0, n3 = Ge2(e3.viewMode);
    (typeof n3 != "string" || !n3.match(/docs|story/)) && (n3 = "story");
    let i3 = Ge2(e3.path), a4 = i3 ? Fa(i3) : Ge2(e3.id);
    if (a4)
      return { storySpecifier: a4, args: t4, globals: o4, viewMode: n3 };
  }
  return null;
}, "getSelectionSpecifierFromPath");
var gt2 = class gt3 {
  constructor() {
    this.selectionSpecifier = Da();
  }
  setSelection(e3) {
    this.selection = e3, Ia(this.selection);
  }
  setQueryParams(e3) {
    let t4 = nn2({ extraParams: e3 }), { hash: o4 = "" } = te3.location;
    on2.replaceState({}, "", `${te3.location.pathname}${t4}${o4}`);
  }
};
s4(gt2, "UrlStore");
var ve2 = gt2;
var Mn2 = he2(jn2(), 1);
var _n2 = he2(cr2(), 1);
var { document: j3 } = I5;
var Ln2 = 100;
var qn2 = /* @__PURE__ */ ((i3) => (i3.MAIN = "MAIN", i3.NOPREVIEW = "NOPREVIEW", i3.PREPARING_STORY = "PREPARING_STORY", i3.PREPARING_DOCS = "PREPARING_DOCS", i3.ERROR = "ERROR", i3))(qn2 || {});
var wt3 = {
  PREPARING_STORY: "sb-show-preparing-story",
  PREPARING_DOCS: "sb-show-preparing-docs",
  MAIN: "sb-show-main",
  NOPREVIEW: "sb-show-nopreview",
  ERROR: "sb-show-errordisplay"
};
var vt2 = {
  centered: "sb-main-centered",
  fullscreen: "sb-main-fullscreen",
  padded: "sb-main-padded"
};
var Nn2 = new Mn2.default({
  escapeXML: true
});
var At3 = class At4 {
  constructor() {
    this.testing = false;
    if (typeof j3 < "u") {
      let { __SPECIAL_TEST_PARAMETER__: e3 } = (0, _n2.parse)(j3.location.search.slice(1));
      switch (e3) {
        case "preparing-story": {
          this.showPreparingStory(), this.testing = true;
          break;
        }
        case "preparing-docs": {
          this.showPreparingDocs(), this.testing = true;
          break;
        }
        default:
      }
    }
  }
  // Get ready to render a story, returning the element to render to
  prepareForStory(e3) {
    return this.showStory(), this.applyLayout(e3.parameters.layout), j3.documentElement.scrollTop = 0, j3.documentElement.scrollLeft = 0, this.storyRoot();
  }
  storyRoot() {
    return j3.getElementById("storybook-root");
  }
  prepareForDocs() {
    return this.showMain(), this.showDocs(), this.applyLayout("fullscreen"), j3.documentElement.scrollTop = 0, j3.documentElement.scrollLeft = 0, this.docsRoot();
  }
  docsRoot() {
    return j3.getElementById("storybook-docs");
  }
  applyLayout(e3 = "padded") {
    if (e3 === "none") {
      j3.body.classList.remove(this.currentLayoutClass), this.currentLayoutClass = null;
      return;
    }
    this.checkIfLayoutExists(e3);
    let t4 = vt2[e3];
    j3.body.classList.remove(this.currentLayoutClass), j3.body.classList.add(t4), this.currentLayoutClass = t4;
  }
  checkIfLayoutExists(e3) {
    vt2[e3] || s.warn(
      P6`
          The desired layout: ${e3} is not a valid option.
          The possible options are: ${Object.keys(vt2).join(", ")}, none.
        `
    );
  }
  showMode(e3) {
    clearTimeout(this.preparingTimeout), Object.keys(qn2).forEach((t4) => {
      t4 === e3 ? j3.body.classList.add(wt3[t4]) : j3.body.classList.remove(wt3[t4]);
    });
  }
  showErrorDisplay({ message: e3 = "", stack: t4 = "" }) {
    let o4 = e3, n3 = t4, i3 = e3.split(`
`);
    i3.length > 1 && ([o4] = i3, n3 = i3.slice(1).join(`
`).replace(/^\n/, "")), j3.getElementById("error-message").innerHTML = Nn2.toHtml(o4), j3.getElementById("error-stack").innerHTML = Nn2.toHtml(n3), this.showMode("ERROR");
  }
  showNoPreview() {
    var _a2, _b;
    this.testing || (this.showMode("NOPREVIEW"), (_a2 = this.storyRoot()) == null ? void 0 : _a2.setAttribute("hidden", "true"), (_b = this.docsRoot()) == null ? void 0 : _b.setAttribute("hidden", "true"));
  }
  showPreparingStory({ immediate: e3 = false } = {}) {
    clearTimeout(this.preparingTimeout), e3 ? this.showMode("PREPARING_STORY") : this.preparingTimeout = setTimeout(
      () => this.showMode("PREPARING_STORY"),
      Ln2
    );
  }
  showPreparingDocs({ immediate: e3 = false } = {}) {
    clearTimeout(this.preparingTimeout), e3 ? this.showMode("PREPARING_DOCS") : this.preparingTimeout = setTimeout(() => this.showMode("PREPARING_DOCS"), Ln2);
  }
  showMain() {
    this.showMode("MAIN");
  }
  showDocs() {
    this.storyRoot().setAttribute("hidden", "true"), this.docsRoot().removeAttribute("hidden");
  }
  showStory() {
    this.docsRoot().setAttribute("hidden", "true"), this.storyRoot().removeAttribute("hidden");
  }
  showStoryDuringRender() {
    j3.body.classList.add(wt3.MAIN);
  }
};
s4(At3, "WebView");
var Ae2 = At3;
var Ct2 = class Ct3 extends we2 {
  constructor(t4, o4) {
    super(t4, o4, new ve2(), new Ae2());
    this.importFn = t4;
    this.getProjectAnnotations = o4;
    I5.__STORYBOOK_PREVIEW__ = this;
  }
};
s4(Ct2, "PreviewWeb");
var { document: fe2 } = I5;
var yl = [
  "application/javascript",
  "application/ecmascript",
  "application/x-ecmascript",
  "application/x-javascript",
  "text/ecmascript",
  "text/javascript",
  "text/javascript1.0",
  "text/javascript1.1",
  "text/javascript1.2",
  "text/javascript1.3",
  "text/javascript1.4",
  "text/javascript1.5",
  "text/jscript",
  "text/livescript",
  "text/x-ecmascript",
  "text/x-javascript",
  // Support modern javascript
  "module"
];
var hl = "script";
var Un2 = "scripts-root";
function Sr2() {
  let r4 = fe2.createEvent("Event");
  r4.initEvent("DOMContentLoaded", true, true), fe2.dispatchEvent(r4);
}
s4(Sr2, "simulateDOMContentLoaded");
function ml(r4, e3, t4) {
  let o4 = fe2.createElement("script");
  o4.type = r4.type === "module" ? "module" : "text/javascript", r4.src ? (o4.onload = e3, o4.onerror = e3, o4.src = r4.src) : o4.textContent = r4.innerText, t4 ? t4.appendChild(o4) : fe2.head.appendChild(o4), r4.parentNode.removeChild(r4), r4.src || e3();
}
s4(ml, "insertScript");
function Gn2(r4, e3, t4 = 0) {
  r4[t4](() => {
    t4++, t4 === r4.length ? e3() : Gn2(r4, e3, t4);
  });
}
s4(Gn2, "insertScriptsSequentially");
function Bn2(r4) {
  let e3 = fe2.getElementById(Un2);
  e3 ? e3.innerHTML = "" : (e3 = fe2.createElement("div"), e3.id = Un2, fe2.body.appendChild(e3));
  let t4 = Array.from(r4.querySelectorAll(hl));
  if (t4.length) {
    let o4 = [];
    t4.forEach((n3) => {
      let i3 = n3.getAttribute("type");
      (!i3 || yl.includes(i3)) && o4.push((a4) => ml(n3, a4, e3));
    }), o4.length && Gn2(o4, Sr2, void 0);
  } else
    Sr2();
}
s4(Bn2, "simulatePageLoad");

// node_modules/storybook-dark-mode/dist/esm/constants.js
var DARK_MODE_EVENT_NAME = "DARK_MODE";

// node_modules/storybook-dark-mode/dist/esm/Tool.js
import * as React13 from "react";

// node_modules/@storybook/global/dist/index.mjs
var scope = (() => {
  let win;
  if (typeof window !== "undefined") {
    win = window;
  } else if (typeof globalThis !== "undefined") {
    win = globalThis;
  } else if (typeof global !== "undefined") {
    win = global;
  } else if (typeof self !== "undefined") {
    win = self;
  } else {
    win = {};
  }
  return win;
})();

// node_modules/@storybook/core/dist/theming/index.js
import * as P7 from "react";
import { useContext as Jn3, forwardRef as Kn2 } from "react";
import * as Re3 from "react";
import * as D4 from "react";
import * as J5 from "react";
import "react";
var vn2 = Object.create;
var nr2 = Object.defineProperty;
var yn2 = Object.getOwnPropertyDescriptor;
var xn3 = Object.getOwnPropertyNames;
var wn2 = Object.getPrototypeOf;
var En2 = Object.prototype.hasOwnProperty;
var o3 = (e3, r4) => nr2(e3, "name", { value: r4, configurable: true });
var we3 = /* @__PURE__ */ ((e3) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(e3, {
  get: (r4, t4) => (typeof __require < "u" ? __require : r4)[t4]
}) : e3)(function(e3) {
  if (typeof __require < "u") return __require.apply(this, arguments);
  throw Error('Dynamic require of "' + e3 + '" is not supported');
});
var ze2 = (e3, r4) => () => (r4 || e3((r4 = { exports: {} }).exports, r4), r4.exports);
var Sn2 = (e3, r4, t4, n3) => {
  if (r4 && typeof r4 == "object" || typeof r4 == "function")
    for (let a4 of xn3(r4))
      !En2.call(e3, a4) && a4 !== t4 && nr2(e3, a4, { get: () => r4[a4], enumerable: !(n3 = yn2(r4, a4)) || n3.enumerable });
  return e3;
};
var ar2 = (e3, r4, t4) => (t4 = e3 != null ? vn2(wn2(e3)) : {}, Sn2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  r4 || !e3 || !e3.__esModule ? nr2(t4, "default", { value: e3, enumerable: true }) : t4,
  e3
));
var rt3 = ze2((O5) => {
  "use strict";
  (function() {
    "use strict";
    var e3 = typeof Symbol == "function" && Symbol.for, r4 = e3 ? Symbol.for("react.element") : 60103, t4 = e3 ? Symbol.for("react.portal") : 60106, n3 = e3 ? Symbol.for("react.fragment") : 60107, a4 = e3 ? Symbol.for("react.strict_mode") : 60108, i3 = e3 ? Symbol.for("react.profiler") : 60114, s5 = e3 ? Symbol.for("react.provider") : 60109, u3 = e3 ? Symbol.for("react.context") : 60110, f6 = e3 ? Symbol.for("react.async_mode") : 60111, l2 = e3 ? Symbol.for("react.concurrent_mode") : 60111, c3 = e3 ? Symbol.for("react.forward_ref") : 60112, p4 = e3 ? Symbol.for("react.suspense") : 60113, m3 = e3 ? Symbol.for("react.suspense_list") : 60120, w5 = e3 ? Symbol.for("react.memo") : 60115, b6 = e3 ? Symbol.for("react.lazy") : 60116, d2 = e3 ? Symbol.for("react.block") : 60121, v5 = e3 ? Symbol.for("react.fundamental") : 60117, y4 = e3 ? Symbol.for("react.responder") : 60118, x6 = e3 ? Symbol.for("react.scope") : 60119;
    function A4(g2) {
      return typeof g2 == "string" || typeof g2 == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      g2 === n3 || g2 === l2 || g2 === i3 || g2 === a4 || g2 === p4 || g2 === m3 || typeof g2 == "object" && g2 !== null && (g2.$$typeof === b6 || g2.$$typeof === w5 || g2.$$typeof === s5 || g2.$$typeof === u3 || g2.$$typeof === c3 || g2.$$typeof === v5 || g2.$$typeof === y4 || g2.$$typeof === x6 || g2.$$typeof === d2);
    }
    o3(A4, "isValidElementType");
    function S6(g2) {
      if (typeof g2 == "object" && g2 !== null) {
        var tr3 = g2.$$typeof;
        switch (tr3) {
          case r4:
            var Le3 = g2.type;
            switch (Le3) {
              case f6:
              case l2:
              case n3:
              case i3:
              case a4:
              case p4:
                return Le3;
              default:
                var Lr3 = Le3 && Le3.$$typeof;
                switch (Lr3) {
                  case u3:
                  case c3:
                  case b6:
                  case w5:
                  case s5:
                    return Lr3;
                  default:
                    return tr3;
                }
            }
          case t4:
            return tr3;
        }
      }
    }
    o3(S6, "typeOf");
    var R5 = f6, F5 = l2, T7 = u3, ae3 = s5, oe3 = r4, V6 = c3, G5 = n3, Qe3 = b6, er3 = w5, rr3 = t4, tn3 = i3, nn3 = a4, an3 = p4, Ir3 = false;
    function on3(g2) {
      return Ir3 || (Ir3 = true, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), Pr4(g2) || S6(g2) === f6;
    }
    o3(on3, "isAsyncMode");
    function Pr4(g2) {
      return S6(g2) === l2;
    }
    o3(Pr4, "isConcurrentMode");
    function sn3(g2) {
      return S6(g2) === u3;
    }
    o3(sn3, "isContextConsumer");
    function un2(g2) {
      return S6(g2) === s5;
    }
    o3(un2, "isContextProvider");
    function fn2(g2) {
      return typeof g2 == "object" && g2 !== null && g2.$$typeof === r4;
    }
    o3(fn2, "isElement");
    function cn4(g2) {
      return S6(g2) === c3;
    }
    o3(cn4, "isForwardRef");
    function ln2(g2) {
      return S6(g2) === n3;
    }
    o3(ln2, "isFragment");
    function pn2(g2) {
      return S6(g2) === b6;
    }
    o3(pn2, "isLazy");
    function dn2(g2) {
      return S6(g2) === w5;
    }
    o3(dn2, "isMemo");
    function mn2(g2) {
      return S6(g2) === t4;
    }
    o3(mn2, "isPortal");
    function hn2(g2) {
      return S6(g2) === i3;
    }
    o3(hn2, "isProfiler");
    function gn2(g2) {
      return S6(g2) === a4;
    }
    o3(gn2, "isStrictMode");
    function bn2(g2) {
      return S6(g2) === p4;
    }
    o3(bn2, "isSuspense"), O5.AsyncMode = R5, O5.ConcurrentMode = F5, O5.ContextConsumer = T7, O5.ContextProvider = ae3, O5.Element = oe3, O5.ForwardRef = V6, O5.Fragment = G5, O5.Lazy = Qe3, O5.Memo = er3, O5.Portal = rr3, O5.Profiler = tn3, O5.StrictMode = nn3, O5.Suspense = an3, O5.isAsyncMode = on3, O5.isConcurrentMode = Pr4, O5.isContextConsumer = sn3, O5.isContextProvider = un2, O5.isElement = fn2, O5.isForwardRef = cn4, O5.isFragment = ln2, O5.isLazy = pn2, O5.isMemo = dn2, O5.isPortal = mn2, O5.isProfiler = hn2, O5.isStrictMode = gn2, O5.isSuspense = bn2, O5.isValidElementType = A4, O5.typeOf = S6;
  })();
});
var nt3 = ze2((Vo, tt2) => {
  "use strict";
  tt2.exports = rt3();
});
var pr2 = ze2((Go2, ft2) => {
  "use strict";
  var cr3 = nt3(), Mn3 = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
  }, kn2 = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  }, Nn3 = {
    $$typeof: true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  }, st4 = {
    $$typeof: true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  }, lr2 = {};
  lr2[cr3.ForwardRef] = Nn3;
  lr2[cr3.Memo] = st4;
  function at3(e3) {
    return cr3.isMemo(e3) ? st4 : lr2[e3.$$typeof] || Mn3;
  }
  o3(at3, "getStatics");
  var Bn3 = Object.defineProperty, Dn2 = Object.getOwnPropertyNames, ot4 = Object.getOwnPropertySymbols, $n3 = Object.getOwnPropertyDescriptor, jn3 = Object.getPrototypeOf, it2 = Object.prototype;
  function ut3(e3, r4, t4) {
    if (typeof r4 != "string") {
      if (it2) {
        var n3 = jn3(r4);
        n3 && n3 !== it2 && ut3(e3, n3, t4);
      }
      var a4 = Dn2(r4);
      ot4 && (a4 = a4.concat(ot4(r4)));
      for (var i3 = at3(e3), s5 = at3(r4), u3 = 0; u3 < a4.length; ++u3) {
        var f6 = a4[u3];
        if (!kn2[f6] && !(t4 && t4[f6]) && !(s5 && s5[f6]) && !(i3 && i3[f6])) {
          var l2 = $n3(r4, f6);
          try {
            Bn3(e3, f6, l2);
          } catch (e4) {
          }
        }
      }
    }
    return e3;
  }
  o3(ut3, "hoistNonReactStatics");
  ft2.exports = ut3;
});
var Ht3 = ze2((jt3, Cr3) => {
  (function(e3) {
    if (typeof jt3 == "object" && typeof Cr3 < "u")
      Cr3.exports = e3();
    else if (typeof define == "function" && define.amd)
      define([], e3);
    else {
      var r4;
      typeof window < "u" ? r4 = window : typeof global < "u" ? r4 = global : typeof self < "u" ? r4 = self : r4 = this, r4.memoizerific = e3();
    }
  })(function() {
    var e3, r4, t4;
    return (/* @__PURE__ */ o3(function n3(a4, i3, s5) {
      function u3(c3, p4) {
        if (!i3[c3]) {
          if (!a4[c3]) {
            var m3 = typeof we3 == "function" && we3;
            if (!p4 && m3) return m3(c3, true);
            if (f6) return f6(c3, true);
            var w5 = new Error("Cannot find module '" + c3 + "'");
            throw w5.code = "MODULE_NOT_FOUND", w5;
          }
          var b6 = i3[c3] = { exports: {} };
          a4[c3][0].call(b6.exports, function(d2) {
            var v5 = a4[c3][1][d2];
            return u3(v5 || d2);
          }, b6, b6.exports, n3, a4, i3, s5);
        }
        return i3[c3].exports;
      }
      o3(u3, "s");
      for (var f6 = typeof we3 == "function" && we3, l2 = 0; l2 < s5.length; l2++) u3(s5[l2]);
      return u3;
    }, "e"))({ 1: [function(n3, a4, i3) {
      a4.exports = function(s5) {
        if (typeof Map != "function" || s5) {
          var u3 = n3("./similar");
          return new u3();
        } else
          return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(n3, a4, i3) {
      function s5() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      o3(s5, "Similar"), s5.prototype.get = function(u3) {
        var f6;
        if (this.lastItem && this.isEqual(this.lastItem.key, u3))
          return this.lastItem.val;
        if (f6 = this.indexOf(u3), f6 >= 0)
          return this.lastItem = this.list[f6], this.list[f6].val;
      }, s5.prototype.set = function(u3, f6) {
        var l2;
        return this.lastItem && this.isEqual(this.lastItem.key, u3) ? (this.lastItem.val = f6, this) : (l2 = this.indexOf(u3), l2 >= 0 ? (this.lastItem = this.list[l2], this.list[l2].val = f6, this) : (this.lastItem = { key: u3, val: f6 }, this.list.push(this.lastItem), this.size++, this));
      }, s5.prototype.delete = function(u3) {
        var f6;
        if (this.lastItem && this.isEqual(this.lastItem.key, u3) && (this.lastItem = void 0), f6 = this.indexOf(u3), f6 >= 0)
          return this.size--, this.list.splice(f6, 1)[0];
      }, s5.prototype.has = function(u3) {
        var f6;
        return this.lastItem && this.isEqual(this.lastItem.key, u3) ? true : (f6 = this.indexOf(u3), f6 >= 0 ? (this.lastItem = this.list[f6], true) : false);
      }, s5.prototype.forEach = function(u3, f6) {
        var l2;
        for (l2 = 0; l2 < this.size; l2++)
          u3.call(f6 || this, this.list[l2].val, this.list[l2].key, this);
      }, s5.prototype.indexOf = function(u3) {
        var f6;
        for (f6 = 0; f6 < this.size; f6++)
          if (this.isEqual(this.list[f6].key, u3))
            return f6;
        return -1;
      }, s5.prototype.isEqual = function(u3, f6) {
        return u3 === f6 || u3 !== u3 && f6 !== f6;
      }, a4.exports = s5;
    }, {}], 3: [function(n3, a4, i3) {
      var s5 = n3("map-or-similar");
      a4.exports = function(c3) {
        var p4 = new s5(false), m3 = [];
        return function(w5) {
          var b6 = /* @__PURE__ */ o3(function() {
            var d2 = p4, v5, y4, x6 = arguments.length - 1, A4 = Array(x6 + 1), S6 = true, R5;
            if ((b6.numArgs || b6.numArgs === 0) && b6.numArgs !== x6 + 1)
              throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (R5 = 0; R5 < x6; R5++) {
              if (A4[R5] = {
                cacheItem: d2,
                arg: arguments[R5]
              }, d2.has(arguments[R5])) {
                d2 = d2.get(arguments[R5]);
                continue;
              }
              S6 = false, v5 = new s5(false), d2.set(arguments[R5], v5), d2 = v5;
            }
            return S6 && (d2.has(arguments[x6]) ? y4 = d2.get(arguments[x6]) : S6 = false), S6 || (y4 = w5.apply(null, arguments), d2.set(arguments[x6], y4)), c3 > 0 && (A4[x6] = {
              cacheItem: d2,
              arg: arguments[x6]
            }, S6 ? u3(m3, A4) : m3.push(A4), m3.length > c3 && f6(m3.shift())), b6.wasMemoized = S6, b6.numArgs = x6 + 1, y4;
          }, "memoizerific");
          return b6.limit = c3, b6.wasMemoized = false, b6.cache = p4, b6.lru = m3, b6;
        };
      };
      function u3(c3, p4) {
        var m3 = c3.length, w5 = p4.length, b6, d2, v5;
        for (d2 = 0; d2 < m3; d2++) {
          for (b6 = true, v5 = 0; v5 < w5; v5++)
            if (!l2(c3[d2][v5].arg, p4[v5].arg)) {
              b6 = false;
              break;
            }
          if (b6)
            break;
        }
        c3.push(c3.splice(d2, 1)[0]);
      }
      o3(u3, "moveToMostRecentLru");
      function f6(c3) {
        var p4 = c3.length, m3 = c3[p4 - 1], w5, b6;
        for (m3.cacheItem.delete(m3.arg), b6 = p4 - 2; b6 >= 0 && (m3 = c3[b6], w5 = m3.cacheItem.get(m3.arg), !w5 || !w5.size); b6--)
          m3.cacheItem.delete(m3.arg);
      }
      o3(f6, "removeCachedResult");
      function l2(c3, p4) {
        return c3 === p4 || c3 !== c3 && p4 !== p4;
      }
      o3(l2, "isEqual");
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
});
function N4() {
  return N4 = Object.assign ? Object.assign.bind() : function(e3) {
    for (var r4 = 1; r4 < arguments.length; r4++) {
      var t4 = arguments[r4];
      for (var n3 in t4) ({}).hasOwnProperty.call(t4, n3) && (e3[n3] = t4[n3]);
    }
    return e3;
  }, N4.apply(null, arguments);
}
o3(N4, "_extends");
var Tn2 = false;
function Cn2(e3) {
  if (e3.sheet)
    return e3.sheet;
  for (var r4 = 0; r4 < document.styleSheets.length; r4++)
    if (document.styleSheets[r4].ownerNode === e3)
      return document.styleSheets[r4];
}
o3(Cn2, "sheetForTag");
function On2(e3) {
  var r4 = document.createElement("style");
  return r4.setAttribute("data-emotion", e3.key), e3.nonce !== void 0 && r4.setAttribute("nonce", e3.nonce), r4.appendChild(document.createTextNode(
    ""
  )), r4.setAttribute("data-s", ""), r4;
}
o3(On2, "createStyleElement");
var zr4 = /* @__PURE__ */ function() {
  function e3(t4) {
    var n3 = this;
    this._insertTag = function(a4) {
      var i3;
      n3.tags.length === 0 ? n3.insertionPoint ? i3 = n3.insertionPoint.nextSibling : n3.prepend ? i3 = n3.container.firstChild : i3 = n3.before : i3 = n3.tags[n3.tags.length - 1].nextSibling, n3.container.insertBefore(a4, i3), n3.tags.push(a4);
    }, this.isSpeedy = t4.speedy === void 0 ? !Tn2 : t4.speedy, this.tags = [], this.ctr = 0, this.nonce = t4.nonce, this.key = t4.key, this.container = t4.container, this.prepend = t4.prepend, this.insertionPoint = t4.insertionPoint, this.before = null;
  }
  o3(e3, "StyleSheet");
  var r4 = e3.prototype;
  return r4.hydrate = /* @__PURE__ */ o3(function(n3) {
    n3.forEach(this._insertTag);
  }, "hydrate"), r4.insert = /* @__PURE__ */ o3(function(n3) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(On2(this));
    var a4 = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var i3 = Cn2(a4);
      try {
        i3.insertRule(n3, i3.cssRules.length);
      } catch (e4) {
      }
    } else
      a4.appendChild(document.createTextNode(n3));
    this.ctr++;
  }, "insert"), r4.flush = /* @__PURE__ */ o3(function() {
    this.tags.forEach(function(n3) {
      var a4;
      return (a4 = n3.parentNode) == null ? void 0 : a4.removeChild(n3);
    }), this.tags = [], this.ctr = 0;
  }, "flush"), e3;
}();
var L6 = "-ms-";
var Ee3 = "-moz-";
var C4 = "-webkit-";
var Me3 = "comm";
var ie2 = "rule";
var se3 = "decl";
var Mr2 = "@import";
var ke3 = "@keyframes";
var kr3 = "@layer";
var Nr2 = Math.abs;
var X4 = String.fromCharCode;
var Br4 = Object.assign;
function Dr3(e3, r4) {
  return _5(e3, 0) ^ 45 ? (((r4 << 2 ^ _5(e3, 0)) << 2 ^ _5(e3, 1)) << 2 ^ _5(e3, 2)) << 2 ^ _5(e3, 3) : 0;
}
o3(Dr3, "hash");
function Ne3(e3) {
  return e3.trim();
}
o3(Ne3, "trim");
function or3(e3, r4) {
  return (e3 = r4.exec(e3)) ? e3[0] : e3;
}
o3(or3, "match");
function E2(e3, r4, t4) {
  return e3.replace(r4, t4);
}
o3(E2, "replace");
function Se3(e3, r4) {
  return e3.indexOf(r4);
}
o3(Se3, "indexof");
function _5(e3, r4) {
  return e3.charCodeAt(r4) | 0;
}
o3(_5, "charat");
function Y5(e3, r4, t4) {
  return e3.slice(r4, t4);
}
o3(Y5, "substr");
function z4(e3) {
  return e3.length;
}
o3(z4, "strlen");
function ue2(e3) {
  return e3.length;
}
o3(ue2, "sizeof");
function fe3(e3, r4) {
  return r4.push(e3), e3;
}
o3(fe3, "append");
function ir2(e3, r4) {
  return e3.map(r4).join("");
}
o3(ir2, "combine");
var Be3 = 1;
var ce3 = 1;
var $r3 = 0;
var M4 = 0;
var I6 = 0;
var pe2 = "";
function Te3(e3, r4, t4, n3, a4, i3, s5) {
  return { value: e3, root: r4, parent: t4, type: n3, props: a4, children: i3, line: Be3, column: ce3, length: s5, return: "" };
}
o3(Te3, "node");
function de2(e3, r4) {
  return Br4(Te3("", null, null, "", null, null, 0), e3, { length: -e3.length }, r4);
}
o3(de2, "copy");
function jr3() {
  return I6;
}
o3(jr3, "char");
function Hr3() {
  return I6 = M4 > 0 ? _5(pe2, --M4) : 0, ce3--, I6 === 10 && (ce3 = 1, Be3--), I6;
}
o3(Hr3, "prev");
function k6() {
  return I6 = M4 < $r3 ? _5(pe2, M4++) : 0, ce3++, I6 === 10 && (ce3 = 1, Be3++), I6;
}
o3(k6, "next");
function B3() {
  return _5(pe2, M4);
}
o3(B3, "peek");
function Ce2() {
  return M4;
}
o3(Ce2, "caret");
function me3(e3, r4) {
  return Y5(pe2, e3, r4);
}
o3(me3, "slice");
function le3(e3) {
  switch (e3) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
o3(le3, "token");
function De3(e3) {
  return Be3 = ce3 = 1, $r3 = z4(pe2 = e3), M4 = 0, [];
}
o3(De3, "alloc");
function $e3(e3) {
  return pe2 = "", e3;
}
o3($e3, "dealloc");
function he3(e3) {
  return Ne3(me3(M4 - 1, sr3(e3 === 91 ? e3 + 2 : e3 === 40 ? e3 + 1 : e3)));
}
o3(he3, "delimit");
function Wr3(e3) {
  for (; (I6 = B3()) && I6 < 33; )
    k6();
  return le3(e3) > 2 || le3(I6) > 3 ? "" : " ";
}
o3(Wr3, "whitespace");
function Ur3(e3, r4) {
  for (; --r4 && k6() && !(I6 < 48 || I6 > 102 || I6 > 57 && I6 < 65 || I6 > 70 && I6 < 97); )
    ;
  return me3(e3, Ce2() + (r4 < 6 && B3() == 32 && k6() == 32));
}
o3(Ur3, "escaping");
function sr3(e3) {
  for (; k6(); )
    switch (I6) {
      // ] ) " '
      case e3:
        return M4;
      // " '
      case 34:
      case 39:
        e3 !== 34 && e3 !== 39 && sr3(I6);
        break;
      // (
      case 40:
        e3 === 41 && sr3(e3);
        break;
      // \
      case 92:
        k6();
        break;
    }
  return M4;
}
o3(sr3, "delimiter");
function Vr4(e3, r4) {
  for (; k6() && e3 + I6 !== 57; )
    if (e3 + I6 === 84 && B3() === 47)
      break;
  return "/*" + me3(r4, M4 - 1) + "*" + X4(e3 === 47 ? e3 : k6());
}
o3(Vr4, "commenter");
function Gr3(e3) {
  for (; !le3(B3()); )
    k6();
  return me3(e3, M4);
}
o3(Gr3, "identifier");
function Jr3(e3) {
  return $e3(je3("", null, null, null, [""], e3 = De3(e3), 0, [0], e3));
}
o3(Jr3, "compile");
function je3(e3, r4, t4, n3, a4, i3, s5, u3, f6) {
  for (var l2 = 0, c3 = 0, p4 = s5, m3 = 0, w5 = 0, b6 = 0, d2 = 1, v5 = 1, y4 = 1, x6 = 0, A4 = "", S6 = a4, R5 = i3, F5 = n3, T7 = A4; v5; )
    switch (b6 = x6, x6 = k6()) {
      // (
      case 40:
        if (b6 != 108 && _5(T7, p4 - 1) == 58) {
          Se3(T7 += E2(he3(x6), "&", "&\f"), "&\f") != -1 && (y4 = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        T7 += he3(x6);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        T7 += Wr3(b6);
        break;
      // \
      case 92:
        T7 += Ur3(Ce2() - 1, 7);
        continue;
      // /
      case 47:
        switch (B3()) {
          case 42:
          case 47:
            fe3(Rn2(Vr4(k6(), Ce2()), r4, t4), f6);
            break;
          default:
            T7 += "/";
        }
        break;
      // {
      case 123 * d2:
        u3[l2++] = z4(T7) * y4;
      // } ; \0
      case 125 * d2:
      case 59:
      case 0:
        switch (x6) {
          // \0 }
          case 0:
          case 125:
            v5 = 0;
          // ;
          case 59 + c3:
            y4 == -1 && (T7 = E2(T7, /\f/g, "")), w5 > 0 && z4(T7) - p4 && fe3(
              w5 > 32 ? qr2(T7 + ";", n3, t4, p4 - 1) : qr2(E2(T7, " ", "") + ";", n3, t4, p4 - 2),
              f6
            );
            break;
          // @ ;
          case 59:
            T7 += ";";
          // { rule/at-rule
          default:
            if (fe3(F5 = Yr3(T7, r4, t4, l2, c3, a4, u3, A4, S6 = [], R5 = [], p4), i3), x6 === 123)
              if (c3 === 0)
                je3(T7, r4, F5, F5, S6, i3, p4, u3, R5);
              else
                switch (m3 === 99 && _5(T7, 3) === 110 ? 100 : m3) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    je3(e3, F5, F5, n3 && fe3(Yr3(e3, F5, F5, 0, 0, a4, u3, A4, a4, S6 = [], p4), R5), a4, R5, p4, u3, n3 ? S6 : R5);
                    break;
                  default:
                    je3(T7, F5, F5, F5, [""], R5, 0, u3, R5);
                }
        }
        l2 = c3 = w5 = 0, d2 = y4 = 1, A4 = T7 = "", p4 = s5;
        break;
      // :
      case 58:
        p4 = 1 + z4(T7), w5 = b6;
      default:
        if (d2 < 1) {
          if (x6 == 123)
            --d2;
          else if (x6 == 125 && d2++ == 0 && Hr3() == 125)
            continue;
        }
        switch (T7 += X4(x6), x6 * d2) {
          // &
          case 38:
            y4 = c3 > 0 ? 1 : (T7 += "\f", -1);
            break;
          // ,
          case 44:
            u3[l2++] = (z4(T7) - 1) * y4, y4 = 1;
            break;
          // @
          case 64:
            B3() === 45 && (T7 += he3(k6())), m3 = B3(), c3 = p4 = z4(A4 = T7 += Gr3(Ce2())), x6++;
            break;
          // -
          case 45:
            b6 === 45 && z4(T7) == 2 && (d2 = 0);
        }
    }
  return i3;
}
o3(je3, "parse");
function Yr3(e3, r4, t4, n3, a4, i3, s5, u3, f6, l2, c3) {
  for (var p4 = a4 - 1, m3 = a4 === 0 ? i3 : [""], w5 = ue2(m3), b6 = 0, d2 = 0, v5 = 0; b6 < n3; ++b6)
    for (var y4 = 0, x6 = Y5(e3, p4 + 1, p4 = Nr2(d2 = s5[b6])), A4 = e3; y4 < w5; ++y4)
      (A4 = Ne3(d2 > 0 ? m3[y4] + " " + x6 : E2(x6, /&\f/g, m3[y4]))) && (f6[v5++] = A4);
  return Te3(e3, r4, t4, a4 === 0 ? ie2 : u3, f6, l2, c3);
}
o3(Yr3, "ruleset");
function Rn2(e3, r4, t4) {
  return Te3(e3, r4, t4, Me3, X4(jr3()), Y5(e3, 2, -2), 0);
}
o3(Rn2, "comment");
function qr2(e3, r4, t4, n3) {
  return Te3(e3, r4, t4, se3, Y5(e3, 0, n3), Y5(e3, n3 + 1, -1), n3);
}
o3(qr2, "declaration");
function Z3(e3, r4) {
  for (var t4 = "", n3 = ue2(e3), a4 = 0; a4 < n3; a4++)
    t4 += r4(e3[a4], a4, e3, r4) || "";
  return t4;
}
o3(Z3, "serialize");
function Kr3(e3, r4, t4, n3) {
  switch (e3.type) {
    case kr3:
      if (e3.children.length) break;
    case Mr2:
    case se3:
      return e3.return = e3.return || e3.value;
    case Me3:
      return "";
    case ke3:
      return e3.return = e3.value + "{" + Z3(e3.children, n3) + "}";
    case ie2:
      e3.value = e3.props.join(",");
  }
  return z4(t4 = Z3(e3.children, n3)) ? e3.return = e3.value + "{" + t4 + "}" : "";
}
o3(Kr3, "stringify");
function Xr4(e3) {
  var r4 = ue2(e3);
  return function(t4, n3, a4, i3) {
    for (var s5 = "", u3 = 0; u3 < r4; u3++)
      s5 += e3[u3](t4, n3, a4, i3) || "";
    return s5;
  };
}
o3(Xr4, "middleware");
function Zr3(e3) {
  return function(r4) {
    r4.root || (r4 = r4.return) && e3(r4);
  };
}
o3(Zr3, "rulesheet");
function He3(e3) {
  var r4 = /* @__PURE__ */ Object.create(null);
  return function(t4) {
    return r4[t4] === void 0 && (r4[t4] = e3(t4)), r4[t4];
  };
}
o3(He3, "memoize");
var An2 = /* @__PURE__ */ o3(function(r4, t4, n3) {
  for (var a4 = 0, i3 = 0; a4 = i3, i3 = B3(), a4 === 38 && i3 === 12 && (t4[n3] = 1), !le3(i3); )
    k6();
  return me3(r4, M4);
}, "identifierWithPointTracking");
var Fn2 = /* @__PURE__ */ o3(function(r4, t4) {
  var n3 = -1, a4 = 44;
  do
    switch (le3(a4)) {
      case 0:
        a4 === 38 && B3() === 12 && (t4[n3] = 1), r4[n3] += An2(M4 - 1, t4, n3);
        break;
      case 2:
        r4[n3] += he3(a4);
        break;
      case 4:
        if (a4 === 44) {
          r4[++n3] = B3() === 58 ? "&\f" : "", t4[n3] = r4[n3].length;
          break;
        }
      // fallthrough
      default:
        r4[n3] += X4(a4);
    }
  while (a4 = k6());
  return r4;
}, "toRules");
var _n3 = /* @__PURE__ */ o3(function(r4, t4) {
  return $e3(Fn2(De3(r4), t4));
}, "getRules");
var Qr4 = /* @__PURE__ */ new WeakMap();
var In2 = /* @__PURE__ */ o3(function(r4) {
  if (!(r4.type !== "rule" || !r4.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  r4.length < 1)) {
    for (var t4 = r4.value, n3 = r4.parent, a4 = r4.column === n3.column && r4.line === n3.line; n3.type !== "rule"; )
      if (n3 = n3.parent, !n3) return;
    if (!(r4.props.length === 1 && t4.charCodeAt(0) !== 58 && !Qr4.get(n3)) && !a4) {
      Qr4.set(r4, true);
      for (var i3 = [], s5 = _n3(t4, i3), u3 = n3.props, f6 = 0, l2 = 0; f6 < s5.length; f6++)
        for (var c3 = 0; c3 < u3.length; c3++, l2++)
          r4.props[l2] = i3[f6] ? s5[f6].replace(/&\f/g, u3[c3]) : u3[c3] + " " + s5[f6];
    }
  }
}, "compat");
var Pn2 = /* @__PURE__ */ o3(function(r4) {
  if (r4.type === "decl") {
    var t4 = r4.value;
    t4.charCodeAt(0) === 108 && // charcode for b
    t4.charCodeAt(2) === 98 && (r4.return = "", r4.value = "");
  }
}, "removeLabel");
function et3(e3, r4) {
  switch (Dr3(e3, r4)) {
    // color-adjust
    case 5103:
      return C4 + "print-" + e3 + e3;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return C4 + e3 + e3;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return C4 + e3 + Ee3 + e3 + L6 + e3 + e3;
    // flex, flex-direction
    case 6828:
    case 4268:
      return C4 + e3 + L6 + e3 + e3;
    // order
    case 6165:
      return C4 + e3 + L6 + "flex-" + e3 + e3;
    // align-items
    case 5187:
      return C4 + e3 + E2(e3, /(\w+).+(:[^]+)/, C4 + "box-$1$2" + L6 + "flex-$1$2") + e3;
    // align-self
    case 5443:
      return C4 + e3 + L6 + "flex-item-" + E2(e3, /flex-|-self/, "") + e3;
    // align-content
    case 4675:
      return C4 + e3 + L6 + "flex-line-pack" + E2(e3, /align-content|flex-|-self/, "") + e3;
    // flex-shrink
    case 5548:
      return C4 + e3 + L6 + E2(e3, "shrink", "negative") + e3;
    // flex-basis
    case 5292:
      return C4 + e3 + L6 + E2(e3, "basis", "preferred-size") + e3;
    // flex-grow
    case 6060:
      return C4 + "box-" + E2(e3, "-grow", "") + C4 + e3 + L6 + E2(e3, "grow", "positive") + e3;
    // transition
    case 4554:
      return C4 + E2(e3, /([^-])(transform)/g, "$1" + C4 + "$2") + e3;
    // cursor
    case 6187:
      return E2(E2(E2(e3, /(zoom-|grab)/, C4 + "$1"), /(image-set)/, C4 + "$1"), e3, "") + e3;
    // background, background-image
    case 5495:
    case 3959:
      return E2(e3, /(image-set\([^]*)/, C4 + "$1$`$1");
    // justify-content
    case 4968:
      return E2(E2(e3, /(.+:)(flex-)?(.*)/, C4 + "box-pack:$3" + L6 + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + C4 + e3 + e3;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return E2(e3, /(.+)-inline(.+)/, C4 + "$1$2") + e3;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (z4(e3) - 1 - r4 > 6) switch (_5(e3, r4 + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (_5(e3, r4 + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return E2(e3, /(.+:)(.+)-([^]+)/, "$1" + C4 + "$2-$3$1" + Ee3 + (_5(e3, r4 + 3) == 108 ? "$3" : "$2-$3")) + e3;
        // (s)tretch
        case 115:
          return ~Se3(e3, "stretch") ? et3(E2(e3, "stretch", "fill-available"), r4) + e3 : e3;
      }
      break;
    // position: sticky
    case 4949:
      if (_5(e3, r4 + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (_5(e3, z4(e3) - 3 - (~Se3(e3, "!important") && 10))) {
        // stic(k)y
        case 107:
          return E2(e3, ":", ":" + C4) + e3;
        // (inline-)?fl(e)x
        case 101:
          return E2(e3, /(.+:)([^;!]+)(;|!.+)?/, "$1" + C4 + (_5(e3, 14) === 45 ? "inline-" : "") + "box$3$1" + C4 + "$2$3$1" + L6 + "$2box$3") + e3;
      }
      break;
    // writing-mode
    case 5936:
      switch (_5(e3, r4 + 11)) {
        // vertical-l(r)
        case 114:
          return C4 + e3 + L6 + E2(e3, /[svh]\w+-[tblr]{2}/, "tb") + e3;
        // vertical-r(l)
        case 108:
          return C4 + e3 + L6 + E2(e3, /[svh]\w+-[tblr]{2}/, "tb-rl") + e3;
        // horizontal(-)tb
        case 45:
          return C4 + e3 + L6 + E2(e3, /[svh]\w+-[tblr]{2}/, "lr") + e3;
      }
      return C4 + e3 + L6 + e3 + e3;
  }
  return e3;
}
o3(et3, "prefix");
var Ln3 = /* @__PURE__ */ o3(function(r4, t4, n3, a4) {
  if (r4.length > -1 && !r4.return) switch (r4.type) {
    case se3:
      r4.return = et3(r4.value, r4.length);
      break;
    case ke3:
      return Z3([de2(r4, {
        value: E2(r4.value, "@", "@" + C4)
      })], a4);
    case ie2:
      if (r4.length) return ir2(r4.props, function(i3) {
        switch (or3(i3, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return Z3([de2(r4, {
              props: [E2(i3, /:(read-\w+)/, ":" + Ee3 + "$1")]
            })], a4);
          // :placeholder
          case "::placeholder":
            return Z3([de2(r4, {
              props: [E2(i3, /:(plac\w+)/, ":" + C4 + "input-$1")]
            }), de2(r4, {
              props: [E2(i3, /:(plac\w+)/, ":" + Ee3 + "$1")]
            }), de2(r4, {
              props: [E2(i3, /:(plac\w+)/, L6 + "input-$1")]
            })], a4);
        }
        return "";
      });
  }
}, "prefixer");
var zn3 = [Ln3];
var fr2 = /* @__PURE__ */ o3(function(r4) {
  var t4 = r4.key;
  if (t4 === "css") {
    var n3 = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(n3, function(d2) {
      var v5 = d2.getAttribute("data-emotion");
      v5.indexOf(" ") !== -1 && (document.head.appendChild(d2), d2.setAttribute("data-s", ""));
    });
  }
  var a4 = r4.stylisPlugins || zn3, i3 = {}, s5, u3 = [];
  s5 = r4.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + t4 + ' "]'),
    function(d2) {
      for (var v5 = d2.getAttribute("data-emotion").split(" "), y4 = 1; y4 < v5.length; y4++)
        i3[v5[y4]] = true;
      u3.push(d2);
    }
  );
  var f6, l2 = [In2, Pn2];
  {
    var c3, p4 = [Kr3, Zr3(function(d2) {
      c3.insert(d2);
    })], m3 = Xr4(l2.concat(a4, p4)), w5 = /* @__PURE__ */ o3(function(v5) {
      return Z3(Jr3(v5), m3);
    }, "stylis");
    f6 = /* @__PURE__ */ o3(function(v5, y4, x6, A4) {
      c3 = x6, w5(v5 ? v5 + "{" + y4.styles + "}" : y4.styles), A4 && (b6.inserted[y4.name] = true);
    }, "insert");
  }
  var b6 = {
    key: t4,
    sheet: new zr4({
      key: t4,
      container: s5,
      nonce: r4.nonce,
      speedy: r4.speedy,
      prepend: r4.prepend,
      insertionPoint: r4.insertionPoint
    }),
    nonce: r4.nonce,
    inserted: i3,
    registered: {},
    insert: f6
  };
  return b6.sheet.hydrate(u3), b6;
}, "createCache");
var ct2 = ar2(pr2());
var lt4 = /* @__PURE__ */ o3(function(e3, r4) {
  return (0, ct2.default)(e3, r4);
}, "hoistNonReactStatics");
var Hn3 = true;
function ge3(e3, r4, t4) {
  var n3 = "";
  return t4.split(" ").forEach(function(a4) {
    e3[a4] !== void 0 ? r4.push(e3[a4] + ";") : a4 && (n3 += a4 + " ");
  }), n3;
}
o3(ge3, "getRegisteredStyles");
var Q3 = /* @__PURE__ */ o3(function(r4, t4, n3) {
  var a4 = r4.key + "-" + t4.name;
  (n3 === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  Hn3 === false) && r4.registered[a4] === void 0 && (r4.registered[a4] = t4.styles);
}, "registerStyles");
var ee3 = /* @__PURE__ */ o3(function(r4, t4, n3) {
  Q3(r4, t4, n3);
  var a4 = r4.key + "-" + t4.name;
  if (r4.inserted[t4.name] === void 0) {
    var i3 = t4;
    do
      r4.insert(t4 === i3 ? "." + a4 : "", i3, r4.sheet, true), i3 = i3.next;
    while (i3 !== void 0);
  }
}, "insertStyles");
function pt(e3) {
  for (var r4 = 0, t4, n3 = 0, a4 = e3.length; a4 >= 4; ++n3, a4 -= 4)
    t4 = e3.charCodeAt(n3) & 255 | (e3.charCodeAt(++n3) & 255) << 8 | (e3.charCodeAt(++n3) & 255) << 16 | (e3.charCodeAt(++n3) & 255) << 24, t4 = /* Math.imul(k, m): */
    (t4 & 65535) * 1540483477 + ((t4 >>> 16) * 59797 << 16), t4 ^= /* k >>> r: */
    t4 >>> 24, r4 = /* Math.imul(k, m): */
    (t4 & 65535) * 1540483477 + ((t4 >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (r4 & 65535) * 1540483477 + ((r4 >>> 16) * 59797 << 16);
  switch (a4) {
    case 3:
      r4 ^= (e3.charCodeAt(n3 + 2) & 255) << 16;
    case 2:
      r4 ^= (e3.charCodeAt(n3 + 1) & 255) << 8;
    case 1:
      r4 ^= e3.charCodeAt(n3) & 255, r4 = /* Math.imul(h, m): */
      (r4 & 65535) * 1540483477 + ((r4 >>> 16) * 59797 << 16);
  }
  return r4 ^= r4 >>> 13, r4 = /* Math.imul(h, m): */
  (r4 & 65535) * 1540483477 + ((r4 >>> 16) * 59797 << 16), ((r4 ^ r4 >>> 15) >>> 0).toString(36);
}
o3(pt, "murmur2");
var dt3 = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var Wn3 = false;
var Un3 = /[A-Z]|^ms/g;
var Vn3 = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var bt3 = /* @__PURE__ */ o3(function(r4) {
  return r4.charCodeAt(1) === 45;
}, "isCustomProperty");
var mt3 = /* @__PURE__ */ o3(function(r4) {
  return r4 != null && typeof r4 != "boolean";
}, "isProcessableValue");
var dr2 = /* @__PURE__ */ He3(function(e3) {
  return bt3(e3) ? e3 : e3.replace(Un3, "-$&").toLowerCase();
});
var ht4 = /* @__PURE__ */ o3(function(r4, t4) {
  switch (r4) {
    case "animation":
    case "animationName":
      if (typeof t4 == "string")
        return t4.replace(Vn3, function(n3, a4, i3) {
          return H5 = {
            name: a4,
            styles: i3,
            next: H5
          }, a4;
        });
  }
  return dt3[r4] !== 1 && !bt3(r4) && typeof t4 == "number" && t4 !== 0 ? t4 + "px" : t4;
}, "processStyleValue");
var Gn3 = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function Oe3(e3, r4, t4) {
  if (t4 == null)
    return "";
  var n3 = t4;
  if (n3.__emotion_styles !== void 0)
    return n3;
  switch (typeof t4) {
    case "boolean":
      return "";
    case "object": {
      var a4 = t4;
      if (a4.anim === 1)
        return H5 = {
          name: a4.name,
          styles: a4.styles,
          next: H5
        }, a4.name;
      var i3 = t4;
      if (i3.styles !== void 0) {
        var s5 = i3.next;
        if (s5 !== void 0)
          for (; s5 !== void 0; )
            H5 = {
              name: s5.name,
              styles: s5.styles,
              next: H5
            }, s5 = s5.next;
        var u3 = i3.styles + ";";
        return u3;
      }
      return Yn3(e3, r4, t4);
    }
    case "function": {
      if (e3 !== void 0) {
        var f6 = H5, l2 = t4(e3);
        return H5 = f6, Oe3(e3, r4, l2);
      }
      break;
    }
  }
  var c3 = t4;
  if (r4 == null)
    return c3;
  var p4 = r4[c3];
  return p4 !== void 0 ? p4 : c3;
}
o3(Oe3, "handleInterpolation");
function Yn3(e3, r4, t4) {
  var n3 = "";
  if (Array.isArray(t4))
    for (var a4 = 0; a4 < t4.length; a4++)
      n3 += Oe3(e3, r4, t4[a4]) + ";";
  else
    for (var i3 in t4) {
      var s5 = t4[i3];
      if (typeof s5 != "object") {
        var u3 = s5;
        r4 != null && r4[u3] !== void 0 ? n3 += i3 + "{" + r4[u3] + "}" : mt3(u3) && (n3 += dr2(i3) + ":" + ht4(i3, u3) + ";");
      } else {
        if (i3 === "NO_COMPONENT_SELECTOR" && Wn3)
          throw new Error(Gn3);
        if (Array.isArray(s5) && typeof s5[0] == "string" && (r4 == null || r4[s5[0]] === void 0))
          for (var f6 = 0; f6 < s5.length; f6++)
            mt3(s5[f6]) && (n3 += dr2(i3) + ":" + ht4(i3, s5[f6]) + ";");
        else {
          var l2 = Oe3(e3, r4, s5);
          switch (i3) {
            case "animation":
            case "animationName": {
              n3 += dr2(i3) + ":" + l2 + ";";
              break;
            }
            default:
              n3 += i3 + "{" + l2 + "}";
          }
        }
      }
    }
  return n3;
}
o3(Yn3, "createStringFromObject");
var gt4 = /label:\s*([^\s;{]+)\s*(;|$)/g;
var H5;
function q5(e3, r4, t4) {
  if (e3.length === 1 && typeof e3[0] == "object" && e3[0] !== null && e3[0].styles !== void 0)
    return e3[0];
  var n3 = true, a4 = "";
  H5 = void 0;
  var i3 = e3[0];
  if (i3 == null || i3.raw === void 0)
    n3 = false, a4 += Oe3(t4, r4, i3);
  else {
    var s5 = i3;
    a4 += s5[0];
  }
  for (var u3 = 1; u3 < e3.length; u3++)
    if (a4 += Oe3(t4, r4, e3[u3]), n3) {
      var f6 = i3;
      a4 += f6[u3];
    }
  gt4.lastIndex = 0;
  for (var l2 = "", c3; (c3 = gt4.exec(a4)) !== null; )
    l2 += "-" + c3[1];
  var p4 = pt(a4) + l2;
  return {
    name: p4,
    styles: a4,
    next: H5
  };
}
o3(q5, "serializeStyles");
var qn3 = /* @__PURE__ */ o3(function(r4) {
  return r4();
}, "syncFallback");
var vt3 = Re3.useInsertionEffect ? Re3.useInsertionEffect : false;
var be3 = vt3 || qn3;
var We3 = false;
var yt = /* @__PURE__ */ P7.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ fr2({
    key: "css"
  }) : null
);
var xt3 = yt.Provider;
var re3 = /* @__PURE__ */ o3(function(r4) {
  return /* @__PURE__ */ Kn2(function(t4, n3) {
    var a4 = Jn3(yt);
    return r4(t4, a4, n3);
  });
}, "withEmotionCache");
var $6 = /* @__PURE__ */ P7.createContext({});
function St3(e3) {
  var r4 = e3.displayName || e3.name || "Component", t4 = /* @__PURE__ */ P7.forwardRef(/* @__PURE__ */ o3(function(a4, i3) {
    var s5 = P7.useContext($6);
    return /* @__PURE__ */ P7.createElement(e3, N4({
      theme: s5,
      ref: i3
    }, a4));
  }, "render"));
  return t4.displayName = "WithTheme(" + r4 + ")", lt4(t4, e3);
}
o3(St3, "withTheme");
var Ue3 = {}.hasOwnProperty;
var hr2 = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var Tt2 = /* @__PURE__ */ o3(function(r4, t4) {
  var n3 = {};
  for (var a4 in t4)
    Ue3.call(t4, a4) && (n3[a4] = t4[a4]);
  return n3[hr2] = r4, n3;
}, "createEmotionProps");
var Qn2 = /* @__PURE__ */ o3(function(r4) {
  var t4 = r4.cache, n3 = r4.serialized, a4 = r4.isStringTag;
  return Q3(t4, n3, a4), be3(function() {
    return ee3(t4, n3, a4);
  }), null;
}, "Insertion");
var ea2 = /* @__PURE__ */ re3(function(e3, r4, t4) {
  var n3 = e3.css;
  typeof n3 == "string" && r4.registered[n3] !== void 0 && (n3 = r4.registered[n3]);
  var a4 = e3[hr2], i3 = [n3], s5 = "";
  typeof e3.className == "string" ? s5 = ge3(r4.registered, i3, e3.className) : e3.className != null && (s5 = e3.className + " ");
  var u3 = q5(i3, void 0, P7.useContext($6));
  s5 += r4.key + "-" + u3.name;
  var f6 = {};
  for (var l2 in e3)
    Ue3.call(e3, l2) && l2 !== "css" && l2 !== hr2 && !We3 && (f6[l2] = e3[l2]);
  return f6.className = s5, t4 && (f6.ref = t4), /* @__PURE__ */ P7.createElement(P7.Fragment, null, /* @__PURE__ */ P7.createElement(Qn2, {
    cache: r4,
    serialized: u3,
    isStringTag: typeof a4 == "string"
  }), /* @__PURE__ */ P7.createElement(a4, f6));
});
var Ct4 = ea2;
var Oi2 = ar2(pr2());
var gr2 = /* @__PURE__ */ o3(function(r4, t4) {
  var n3 = arguments;
  if (t4 == null || !Ue3.call(t4, "css"))
    return D4.createElement.apply(void 0, n3);
  var a4 = n3.length, i3 = new Array(a4);
  i3[0] = Ct4, i3[1] = Tt2(r4, t4);
  for (var s5 = 2; s5 < a4; s5++)
    i3[s5] = n3[s5];
  return D4.createElement.apply(null, i3);
}, "jsx");
(function(e3) {
  var r4;
  r4 || (r4 = e3.JSX || (e3.JSX = {}));
})(gr2 || (gr2 = {}));
function Ae3() {
  for (var e3 = arguments.length, r4 = new Array(e3), t4 = 0; t4 < e3; t4++)
    r4[t4] = arguments[t4];
  return q5(r4);
}
o3(Ae3, "css");
function ve3() {
  var e3 = Ae3.apply(void 0, arguments), r4 = "animation-" + e3.name;
  return {
    name: r4,
    styles: "@keyframes " + r4 + "{" + e3.styles + "}",
    anim: 1,
    toString: /* @__PURE__ */ o3(function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }, "toString")
  };
}
o3(ve3, "keyframes");
function na(e3, r4, t4) {
  var n3 = [], a4 = ge3(e3, n3, t4);
  return n3.length < 2 ? t4 : a4 + r4(n3);
}
o3(na, "merge");
var ia = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var br3 = /* @__PURE__ */ He3(
  function(e3) {
    return ia.test(e3) || e3.charCodeAt(0) === 111 && e3.charCodeAt(1) === 110 && e3.charCodeAt(2) < 91;
  }
  /* Z+1 */
);
var sa = false;
var ua = br3;
var fa = /* @__PURE__ */ o3(function(r4) {
  return r4 !== "theme";
}, "testOmitPropsOnComponent");
var Ot3 = /* @__PURE__ */ o3(function(r4) {
  return typeof r4 == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  r4.charCodeAt(0) > 96 ? ua : fa;
}, "getDefaultShouldForwardProp");
var Rt2 = /* @__PURE__ */ o3(function(r4, t4, n3) {
  var a4;
  if (t4) {
    var i3 = t4.shouldForwardProp;
    a4 = r4.__emotion_forwardProp && i3 ? function(s5) {
      return r4.__emotion_forwardProp(s5) && i3(s5);
    } : i3;
  }
  return typeof a4 != "function" && n3 && (a4 = r4.__emotion_forwardProp), a4;
}, "composeShouldForwardProps");
var ca = /* @__PURE__ */ o3(function(r4) {
  var t4 = r4.cache, n3 = r4.serialized, a4 = r4.isStringTag;
  return Q3(t4, n3, a4), be3(function() {
    return ee3(t4, n3, a4);
  }), null;
}, "Insertion");
var At5 = /* @__PURE__ */ o3(function e2(r4, t4) {
  var n3 = r4.__emotion_real === r4, a4 = n3 && r4.__emotion_base || r4, i3, s5;
  t4 !== void 0 && (i3 = t4.label, s5 = t4.target);
  var u3 = Rt2(r4, t4, n3), f6 = u3 || Ot3(a4), l2 = !f6("as");
  return function() {
    var c3 = arguments, p4 = n3 && r4.__emotion_styles !== void 0 ? r4.__emotion_styles.slice(0) : [];
    if (i3 !== void 0 && p4.push("label:" + i3 + ";"), c3[0] == null || c3[0].raw === void 0)
      p4.push.apply(p4, c3);
    else {
      var m3 = c3[0];
      p4.push(m3[0]);
      for (var w5 = c3.length, b6 = 1; b6 < w5; b6++)
        p4.push(c3[b6], m3[b6]);
    }
    var d2 = re3(function(v5, y4, x6) {
      var A4 = l2 && v5.as || a4, S6 = "", R5 = [], F5 = v5;
      if (v5.theme == null) {
        F5 = {};
        for (var T7 in v5)
          F5[T7] = v5[T7];
        F5.theme = J5.useContext($6);
      }
      typeof v5.className == "string" ? S6 = ge3(y4.registered, R5, v5.className) : v5.className != null && (S6 = v5.className + " ");
      var ae3 = q5(p4.concat(R5), y4.registered, F5);
      S6 += y4.key + "-" + ae3.name, s5 !== void 0 && (S6 += " " + s5);
      var oe3 = l2 && u3 === void 0 ? Ot3(A4) : f6, V6 = {};
      for (var G5 in v5)
        l2 && G5 === "as" || oe3(G5) && (V6[G5] = v5[G5]);
      return V6.className = S6, x6 && (V6.ref = x6), /* @__PURE__ */ J5.createElement(J5.Fragment, null, /* @__PURE__ */ J5.createElement(ca, {
        cache: y4,
        serialized: ae3,
        isStringTag: typeof A4 == "string"
      }), /* @__PURE__ */ J5.createElement(A4, V6));
    });
    return d2.displayName = i3 !== void 0 ? i3 : "Styled(" + (typeof a4 == "string" ? a4 : a4.displayName || a4.name || "Component") + ")", d2.defaultProps = r4.defaultProps, d2.__emotion_real = d2, d2.__emotion_base = a4, d2.__emotion_styles = p4, d2.__emotion_forwardProp = u3, Object.defineProperty(
      d2,
      "toString",
      {
        value: /* @__PURE__ */ o3(function() {
          return s5 === void 0 && sa ? "NO_COMPONENT_SELECTOR" : "." + s5;
        }, "value")
      }
    ), d2.withComponent = function(v5, y4) {
      var x6 = e2(v5, N4({}, t4, y4, {
        shouldForwardProp: Rt2(d2, y4, true)
      }));
      return x6.apply(void 0, p4);
    }, d2;
  };
}, "createStyled");
var la = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var vr3 = At5.bind(null);
la.forEach(function(e3) {
  vr3[e3] = vr3(e3);
});
function Ft2(e3) {
  if (e3 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e3;
}
o3(Ft2, "_assertThisInitialized");
function K5(e3, r4) {
  return K5 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t4, n3) {
    return t4.__proto__ = n3, t4;
  }, K5(e3, r4);
}
o3(K5, "_setPrototypeOf");
function _t3(e3, r4) {
  e3.prototype = Object.create(r4.prototype), e3.prototype.constructor = e3, K5(e3, r4);
}
o3(_t3, "_inheritsLoose");
function Ve2(e3) {
  return Ve2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r4) {
    return r4.__proto__ || Object.getPrototypeOf(r4);
  }, Ve2(e3);
}
o3(Ve2, "_getPrototypeOf");
function It2(e3) {
  try {
    return Function.toString.call(e3).indexOf("[native code]") !== -1;
  } catch (e4) {
    return typeof e3 == "function";
  }
}
o3(It2, "_isNativeFunction");
function yr2() {
  try {
    var e3 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (e4) {
  }
  return (yr2 = /* @__PURE__ */ o3(function() {
    return !!e3;
  }, "_isNativeReflectConstruct"))();
}
o3(yr2, "_isNativeReflectConstruct");
function Pt2(e3, r4, t4) {
  if (yr2()) return Reflect.construct.apply(null, arguments);
  var n3 = [null];
  n3.push.apply(n3, r4);
  var a4 = new (e3.bind.apply(e3, n3))();
  return t4 && K5(a4, t4.prototype), a4;
}
o3(Pt2, "_construct");
function Ge3(e3) {
  var r4 = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Ge3 = /* @__PURE__ */ o3(function(n3) {
    if (n3 === null || !It2(n3)) return n3;
    if (typeof n3 != "function") throw new TypeError("Super expression must either be null or a function");
    if (r4 !== void 0) {
      if (r4.has(n3)) return r4.get(n3);
      r4.set(n3, a4);
    }
    function a4() {
      return Pt2(n3, arguments, Ve2(this).constructor);
    }
    return o3(a4, "Wrapper"), a4.prototype = Object.create(n3.prototype, {
      constructor: {
        value: a4,
        enumerable: false,
        writable: true,
        configurable: true
      }
    }), K5(a4, n3);
  }, "_wrapNativeSuper"), Ge3(e3);
}
o3(Ge3, "_wrapNativeSuper");
var pa = {
  1: `Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).

`,
  2: `Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).

`,
  3: `Passed an incorrect argument to a color function, please pass a string representation of a color.

`,
  4: `Couldn't generate valid rgb string from %s, it returned %s.

`,
  5: `Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.

`,
  6: `Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).

`,
  7: `Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).

`,
  8: `Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.

`,
  9: `Please provide a number of steps to the modularScale helper.

`,
  10: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
  11: `Invalid value passed as base to modularScale, expected number or em string but got "%s"

`,
  12: `Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.

`,
  13: `Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.

`,
  14: `Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.

`,
  15: `Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.

`,
  16: `You must provide a template to this method.

`,
  17: `You passed an unsupported selector state to this method.

`,
  18: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
  19: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
  20: `expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
  21: "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  22: "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  23: `fontFace expects a name of a font-family.

`,
  24: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
  25: `fontFace expects localFonts to be an array.

`,
  26: `fontFace expects fileFormats to be an array.

`,
  27: `radialGradient requries at least 2 color-stops to properly render.

`,
  28: `Please supply a filename to retinaImage() as the first argument.

`,
  29: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
  30: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  31: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation

`,
  32: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])
To pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')

`,
  33: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation

`,
  34: `borderRadius expects a radius value as a string or number as the second argument.

`,
  35: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
  36: `Property must be a string value.

`,
  37: `Syntax Error at %s.

`,
  38: `Formula contains a function that needs parentheses at %s.

`,
  39: `Formula is missing closing parenthesis at %s.

`,
  40: `Formula has too many closing parentheses at %s.

`,
  41: `All values in a formula must have the same unit or be unitless.

`,
  42: `Please provide a number of steps to the modularScale helper.

`,
  43: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
  44: `Invalid value passed as base to modularScale, expected number or em/rem string but got %s.

`,
  45: `Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.

`,
  46: `Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.

`,
  47: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
  48: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
  49: `Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
  50: `Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.

`,
  51: `Expects the first argument object to have the properties prop, fromSize, and toSize.

`,
  52: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
  53: `fontFace expects localFonts to be an array.

`,
  54: `fontFace expects fileFormats to be an array.

`,
  55: `fontFace expects a name of a font-family.

`,
  56: `linearGradient requries at least 2 color-stops to properly render.

`,
  57: `radialGradient requries at least 2 color-stops to properly render.

`,
  58: `Please supply a filename to retinaImage() as the first argument.

`,
  59: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
  60: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  61: `Property must be a string value.

`,
  62: `borderRadius expects a radius value as a string or number as the second argument.

`,
  63: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
  64: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.

`,
  65: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').

`,
  66: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.

`,
  67: `You must provide a template to this method.

`,
  68: `You passed an unsupported selector state to this method.

`,
  69: `Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.

`,
  70: `Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.

`,
  71: `Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.

`,
  72: `Passed invalid base value %s to %s(), please pass a value like "12px" or 12.

`,
  73: `Please provide a valid CSS variable.

`,
  74: `CSS variable not found and no default was provided.

`,
  75: `important requires a valid style object, got a %s instead.

`,
  76: `fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.

`,
  77: `remToPx expects a value in "rem" but you provided it in "%s".

`,
  78: `base must be set in "px" or "%" but you set it in "%s".
`
};
function da() {
  for (var e3 = arguments.length, r4 = new Array(e3), t4 = 0; t4 < e3; t4++)
    r4[t4] = arguments[t4];
  var n3 = r4[0], a4 = [], i3;
  for (i3 = 1; i3 < r4.length; i3 += 1)
    a4.push(r4[i3]);
  return a4.forEach(function(s5) {
    n3 = n3.replace(/%[a-z]/, s5);
  }), n3;
}
o3(da, "format");
var W6 = /* @__PURE__ */ function(e3) {
  _t3(r4, e3);
  function r4(t4) {
    for (var n3, a4 = arguments.length, i3 = new Array(a4 > 1 ? a4 - 1 : 0), s5 = 1; s5 < a4; s5++)
      i3[s5 - 1] = arguments[s5];
    return n3 = e3.call(this, da.apply(void 0, [pa[t4]].concat(i3))) || this, Ft2(n3);
  }
  return o3(r4, "PolishedError"), r4;
}(/* @__PURE__ */ Ge3(Error));
function xr4(e3) {
  return Math.round(e3 * 255);
}
o3(xr4, "colorToInt");
function ma(e3, r4, t4) {
  return xr4(e3) + "," + xr4(r4) + "," + xr4(t4);
}
o3(ma, "convertToInt");
function Fe3(e3, r4, t4, n3) {
  if (n3 === void 0 && (n3 = ma), r4 === 0)
    return n3(t4, t4, t4);
  var a4 = (e3 % 360 + 360) % 360 / 60, i3 = (1 - Math.abs(2 * t4 - 1)) * r4, s5 = i3 * (1 - Math.abs(a4 % 2 - 1)), u3 = 0, f6 = 0, l2 = 0;
  a4 >= 0 && a4 < 1 ? (u3 = i3, f6 = s5) : a4 >= 1 && a4 < 2 ? (u3 = s5, f6 = i3) : a4 >= 2 && a4 < 3 ? (f6 = i3, l2 = s5) : a4 >= 3 && a4 < 4 ? (f6 = s5, l2 = i3) : a4 >= 4 && a4 < 5 ? (u3 = s5, l2 = i3) : a4 >= 5 && a4 < 6 && (u3 = i3, l2 = s5);
  var c3 = t4 - i3 / 2, p4 = u3 + c3, m3 = f6 + c3, w5 = l2 + c3;
  return n3(p4, m3, w5);
}
o3(Fe3, "hslToRgb");
var Lt3 = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "00ffff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "0000ff",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "00ffff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "ff00ff",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "639",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
function ha(e3) {
  if (typeof e3 != "string") return e3;
  var r4 = e3.toLowerCase();
  return Lt3[r4] ? "#" + Lt3[r4] : e3;
}
o3(ha, "nameToHex");
var ga = /^#[a-fA-F0-9]{6}$/;
var ba = /^#[a-fA-F0-9]{8}$/;
var va = /^#[a-fA-F0-9]{3}$/;
var ya = /^#[a-fA-F0-9]{4}$/;
var wr3 = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i;
var xa = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
var wa = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i;
var Ea = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
function qe3(e3) {
  if (typeof e3 != "string")
    throw new W6(3);
  var r4 = ha(e3);
  if (r4.match(ga))
    return {
      red: parseInt("" + r4[1] + r4[2], 16),
      green: parseInt("" + r4[3] + r4[4], 16),
      blue: parseInt("" + r4[5] + r4[6], 16)
    };
  if (r4.match(ba)) {
    var t4 = parseFloat((parseInt("" + r4[7] + r4[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + r4[1] + r4[2], 16),
      green: parseInt("" + r4[3] + r4[4], 16),
      blue: parseInt("" + r4[5] + r4[6], 16),
      alpha: t4
    };
  }
  if (r4.match(va))
    return {
      red: parseInt("" + r4[1] + r4[1], 16),
      green: parseInt("" + r4[2] + r4[2], 16),
      blue: parseInt("" + r4[3] + r4[3], 16)
    };
  if (r4.match(ya)) {
    var n3 = parseFloat((parseInt("" + r4[4] + r4[4], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + r4[1] + r4[1], 16),
      green: parseInt("" + r4[2] + r4[2], 16),
      blue: parseInt("" + r4[3] + r4[3], 16),
      alpha: n3
    };
  }
  var a4 = wr3.exec(r4);
  if (a4)
    return {
      red: parseInt("" + a4[1], 10),
      green: parseInt("" + a4[2], 10),
      blue: parseInt("" + a4[3], 10)
    };
  var i3 = xa.exec(r4.substring(0, 50));
  if (i3)
    return {
      red: parseInt("" + i3[1], 10),
      green: parseInt("" + i3[2], 10),
      blue: parseInt("" + i3[3], 10),
      alpha: parseFloat("" + i3[4]) > 1 ? parseFloat("" + i3[4]) / 100 : parseFloat("" + i3[4])
    };
  var s5 = wa.exec(r4);
  if (s5) {
    var u3 = parseInt("" + s5[1], 10), f6 = parseInt("" + s5[2], 10) / 100, l2 = parseInt("" + s5[3], 10) / 100, c3 = "rgb(" + Fe3(u3, f6, l2) + ")", p4 = wr3.exec(c3);
    if (!p4)
      throw new W6(4, r4, c3);
    return {
      red: parseInt("" + p4[1], 10),
      green: parseInt("" + p4[2], 10),
      blue: parseInt("" + p4[3], 10)
    };
  }
  var m3 = Ea.exec(r4.substring(0, 50));
  if (m3) {
    var w5 = parseInt("" + m3[1], 10), b6 = parseInt("" + m3[2], 10) / 100, d2 = parseInt("" + m3[3], 10) / 100, v5 = "rgb(" + Fe3(w5, b6, d2) + ")", y4 = wr3.exec(v5);
    if (!y4)
      throw new W6(4, r4, v5);
    return {
      red: parseInt("" + y4[1], 10),
      green: parseInt("" + y4[2], 10),
      blue: parseInt("" + y4[3], 10),
      alpha: parseFloat("" + m3[4]) > 1 ? parseFloat("" + m3[4]) / 100 : parseFloat("" + m3[4])
    };
  }
  throw new W6(5);
}
o3(qe3, "parseToRgb");
function Sa(e3) {
  var r4 = e3.red / 255, t4 = e3.green / 255, n3 = e3.blue / 255, a4 = Math.max(r4, t4, n3), i3 = Math.min(r4, t4, n3), s5 = (a4 + i3) / 2;
  if (a4 === i3)
    return e3.alpha !== void 0 ? {
      hue: 0,
      saturation: 0,
      lightness: s5,
      alpha: e3.alpha
    } : {
      hue: 0,
      saturation: 0,
      lightness: s5
    };
  var u3, f6 = a4 - i3, l2 = s5 > 0.5 ? f6 / (2 - a4 - i3) : f6 / (a4 + i3);
  switch (a4) {
    case r4:
      u3 = (t4 - n3) / f6 + (t4 < n3 ? 6 : 0);
      break;
    case t4:
      u3 = (n3 - r4) / f6 + 2;
      break;
    default:
      u3 = (r4 - t4) / f6 + 4;
      break;
  }
  return u3 *= 60, e3.alpha !== void 0 ? {
    hue: u3,
    saturation: l2,
    lightness: s5,
    alpha: e3.alpha
  } : {
    hue: u3,
    saturation: l2,
    lightness: s5
  };
}
o3(Sa, "rgbToHsl");
function zt3(e3) {
  return Sa(qe3(e3));
}
o3(zt3, "parseToHsl");
var Ta = /* @__PURE__ */ o3(function(r4) {
  return r4.length === 7 && r4[1] === r4[2] && r4[3] === r4[4] && r4[5] === r4[6] ? "#" + r4[1] + r4[3] + r4[5] : r4;
}, "reduceHexValue");
var Sr3 = Ta;
function te4(e3) {
  var r4 = e3.toString(16);
  return r4.length === 1 ? "0" + r4 : r4;
}
o3(te4, "numberToHex");
function Er3(e3) {
  return te4(Math.round(e3 * 255));
}
o3(Er3, "colorToHex");
function Ca2(e3, r4, t4) {
  return Sr3("#" + Er3(e3) + Er3(r4) + Er3(t4));
}
o3(Ca2, "convertToHex");
function Ye4(e3, r4, t4) {
  return Fe3(e3, r4, t4, Ca2);
}
o3(Ye4, "hslToHex");
function Oa2(e3, r4, t4) {
  if (typeof e3 == "number" && typeof r4 == "number" && typeof t4 == "number")
    return Ye4(e3, r4, t4);
  if (typeof e3 == "object" && r4 === void 0 && t4 === void 0)
    return Ye4(e3.hue, e3.saturation, e3.lightness);
  throw new W6(1);
}
o3(Oa2, "hsl");
function Ra(e3, r4, t4, n3) {
  if (typeof e3 == "number" && typeof r4 == "number" && typeof t4 == "number" && typeof n3 == "number")
    return n3 >= 1 ? Ye4(e3, r4, t4) : "rgba(" + Fe3(e3, r4, t4) + "," + n3 + ")";
  if (typeof e3 == "object" && r4 === void 0 && t4 === void 0 && n3 === void 0)
    return e3.alpha >= 1 ? Ye4(e3.hue, e3.saturation, e3.lightness) : "rgba(" + Fe3(e3.hue, e3.saturation, e3.lightness) + "," + e3.alpha + ")";
  throw new W6(2);
}
o3(Ra, "hsla");
function Tr3(e3, r4, t4) {
  if (typeof e3 == "number" && typeof r4 == "number" && typeof t4 == "number")
    return Sr3("#" + te4(e3) + te4(r4) + te4(t4));
  if (typeof e3 == "object" && r4 === void 0 && t4 === void 0)
    return Sr3("#" + te4(e3.red) + te4(e3.green) + te4(e3.blue));
  throw new W6(6);
}
o3(Tr3, "rgb");
function ye2(e3, r4, t4, n3) {
  if (typeof e3 == "string" && typeof r4 == "number") {
    var a4 = qe3(e3);
    return "rgba(" + a4.red + "," + a4.green + "," + a4.blue + "," + r4 + ")";
  } else {
    if (typeof e3 == "number" && typeof r4 == "number" && typeof t4 == "number" && typeof n3 == "number")
      return n3 >= 1 ? Tr3(e3, r4, t4) : "rgba(" + e3 + "," + r4 + "," + t4 + "," + n3 + ")";
    if (typeof e3 == "object" && r4 === void 0 && t4 === void 0 && n3 === void 0)
      return e3.alpha >= 1 ? Tr3(e3.red, e3.green, e3.blue) : "rgba(" + e3.red + "," + e3.green + "," + e3.blue + "," + e3.alpha + ")";
  }
  throw new W6(7);
}
o3(ye2, "rgba");
var Aa = /* @__PURE__ */ o3(function(r4) {
  return typeof r4.red == "number" && typeof r4.green == "number" && typeof r4.blue == "number" && (typeof r4.alpha != "number" || typeof r4.alpha > "u");
}, "isRgb");
var Fa2 = /* @__PURE__ */ o3(function(r4) {
  return typeof r4.red == "number" && typeof r4.green == "number" && typeof r4.blue == "number" && typeof r4.alpha == "number";
}, "isRgba");
var _a = /* @__PURE__ */ o3(function(r4) {
  return typeof r4.hue == "number" && typeof r4.saturation == "number" && typeof r4.lightness == "number" && (typeof r4.alpha != "number" || typeof r4.alpha > "u");
}, "isHsl");
var Ia2 = /* @__PURE__ */ o3(function(r4) {
  return typeof r4.hue == "number" && typeof r4.saturation == "number" && typeof r4.lightness == "number" && typeof r4.alpha == "number";
}, "isHsla");
function Mt3(e3) {
  if (typeof e3 != "object") throw new W6(8);
  if (Fa2(e3)) return ye2(e3);
  if (Aa(e3)) return Tr3(e3);
  if (Ia2(e3)) return Ra(e3);
  if (_a(e3)) return Oa2(e3);
  throw new W6(8);
}
o3(Mt3, "toColorString");
function kt3(e3, r4, t4) {
  return /* @__PURE__ */ o3(function() {
    var a4 = t4.concat(Array.prototype.slice.call(arguments));
    return a4.length >= r4 ? e3.apply(this, a4) : kt3(e3, r4, a4);
  }, "fn");
}
o3(kt3, "curried");
function Je3(e3) {
  return kt3(e3, e3.length, []);
}
o3(Je3, "curry");
function Ke3(e3, r4, t4) {
  return Math.max(e3, Math.min(r4, t4));
}
o3(Ke3, "guard");
function Pa2(e3, r4) {
  if (r4 === "transparent") return r4;
  var t4 = zt3(r4);
  return Mt3(N4({}, t4, {
    lightness: Ke3(0, 1, t4.lightness - parseFloat(e3))
  }));
}
o3(Pa2, "darken");
var La = /* @__PURE__ */ Je3(Pa2);
var Nt3 = La;
function za(e3, r4) {
  if (r4 === "transparent") return r4;
  var t4 = zt3(r4);
  return Mt3(N4({}, t4, {
    lightness: Ke3(0, 1, t4.lightness + parseFloat(e3))
  }));
}
o3(za, "lighten");
var Ma = /* @__PURE__ */ Je3(za);
var Bt3 = Ma;
function ka(e3, r4) {
  if (r4 === "transparent") return r4;
  var t4 = qe3(r4), n3 = typeof t4.alpha == "number" ? t4.alpha : 1, a4 = N4({}, t4, {
    alpha: Ke3(0, 1, (n3 * 100 + parseFloat(e3) * 100) / 100)
  });
  return ye2(a4);
}
o3(ka, "opacify");
function Ba(e3, r4) {
  if (r4 === "transparent") return r4;
  var t4 = qe3(r4), n3 = typeof t4.alpha == "number" ? t4.alpha : 1, a4 = N4({}, t4, {
    alpha: Ke3(0, 1, +(n3 * 100 - parseFloat(e3) * 100).toFixed(2) / 100)
  });
  return ye2(a4);
}
o3(Ba, "transparentize");
var Da2 = /* @__PURE__ */ Je3(Ba);
var $t3 = Da2;
var h4 = {
  // Official color palette
  primary: "#FF4785",
  // coral
  secondary: "#029CFD",
  // ocean
  tertiary: "#FAFBFC",
  ancillary: "#22a699",
  // Complimentary
  orange: "#FC521F",
  gold: "#FFAE00",
  green: "#66BF3C",
  seafoam: "#37D5D3",
  purple: "#6F2CAC",
  ultraviolet: "#2A0481",
  // Monochrome
  lightest: "#FFFFFF",
  lighter: "#F7FAFC",
  light: "#EEF3F6",
  mediumlight: "#ECF4F9",
  medium: "#D9E8F2",
  mediumdark: "#73828C",
  dark: "#5C6870",
  darker: "#454E54",
  darkest: "#2E3438",
  // For borders
  border: "hsla(203, 50%, 30%, 0.15)",
  // Status
  positive: "#66BF3C",
  negative: "#FF4400",
  warning: "#E69D00",
  critical: "#FFFFFF",
  // Text
  defaultText: "#2E3438",
  inverseText: "#FFFFFF",
  positiveText: "#448028",
  negativeText: "#D43900",
  warningText: "#A15C20"
};
var U5 = {
  app: "#F6F9FC",
  bar: h4.lightest,
  content: h4.lightest,
  preview: h4.lightest,
  gridCellSize: 10,
  hoverable: $t3(0.9, h4.secondary),
  // hover state for items in a list
  // Notification, error, and warning backgrounds
  positive: "#E1FFD4",
  negative: "#FEDED2",
  warning: "#FFF5CF",
  critical: "#FF4400"
};
var j4 = {
  fonts: {
    base: [
      '"Nunito Sans"',
      "-apple-system",
      '".SFNSText-Regular"',
      '"San Francisco"',
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Helvetica",
      "Arial",
      "sans-serif"
    ].join(", "),
    mono: [
      "ui-monospace",
      "Menlo",
      "Monaco",
      '"Roboto Mono"',
      '"Oxygen Mono"',
      '"Ubuntu Monospace"',
      '"Source Code Pro"',
      '"Droid Sans Mono"',
      '"Courier New"',
      "monospace"
    ].join(", ")
  },
  weight: {
    regular: 400,
    bold: 700
  },
  size: {
    s1: 12,
    s2: 14,
    s3: 16,
    m1: 20,
    m2: 24,
    m3: 28,
    l1: 32,
    l2: 40,
    l3: 48,
    code: 90
  }
};
var Or3 = ar2(Ht3(), 1);
var Wt3 = (0, Or3.default)(1)(
  ({ typography: e3 }) => ({
    body: {
      fontFamily: e3.fonts.base,
      fontSize: e3.size.s3,
      margin: 0,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
      WebkitOverflowScrolling: "touch"
    },
    "*": {
      boxSizing: "border-box"
    },
    "h1, h2, h3, h4, h5, h6": {
      fontWeight: e3.weight.regular,
      margin: 0,
      padding: 0
    },
    "button, input, textarea, select": {
      fontFamily: "inherit",
      fontSize: "inherit",
      boxSizing: "border-box"
    },
    sub: {
      fontSize: "0.8em",
      bottom: "-0.2em"
    },
    sup: {
      fontSize: "0.8em",
      top: "-0.2em"
    },
    "b, strong": {
      fontWeight: e3.weight.bold
    },
    hr: {
      border: "none",
      borderTop: "1px solid silver",
      clear: "both",
      marginBottom: "1.25rem"
    },
    code: {
      fontFamily: e3.fonts.mono,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      display: "inline-block",
      paddingLeft: 2,
      paddingRight: 2,
      verticalAlign: "baseline",
      color: "inherit"
    },
    pre: {
      fontFamily: e3.fonts.mono,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: "18px",
      padding: "11px 1rem",
      whiteSpace: "pre-wrap",
      color: "inherit",
      borderRadius: 3,
      margin: "1rem 0"
    }
  })
);
var $a = (0, Or3.default)(1)(({
  color: e3,
  background: r4,
  typography: t4
}) => {
  let n3 = Wt3({ typography: t4 });
  return __spreadProps(__spreadValues({}, n3), {
    body: __spreadProps(__spreadValues({}, n3.body), {
      color: e3.defaultText,
      background: r4.app,
      overflow: "hidden"
    }),
    hr: __spreadProps(__spreadValues({}, n3.hr), {
      borderTop: `1px solid ${e3.border}`
    })
  });
});
var ja = {
  base: "dark",
  // Storybook-specific color palette
  colorPrimary: "#FF4785",
  // coral
  colorSecondary: "#029CFD",
  // ocean
  // UI
  appBg: "#222425",
  appContentBg: "#1B1C1D",
  appPreviewBg: h4.lightest,
  appBorderColor: "rgba(255,255,255,.1)",
  appBorderRadius: 4,
  // Fonts
  fontBase: j4.fonts.base,
  fontCode: j4.fonts.mono,
  // Text colors
  textColor: "#C9CDCF",
  textInverseColor: "#222425",
  textMutedColor: "#798186",
  // Toolbar default and active colors
  barTextColor: h4.mediumdark,
  barHoverColor: h4.secondary,
  barSelectedColor: h4.secondary,
  barBg: "#292C2E",
  // Form colors
  buttonBg: "#222425",
  buttonBorder: "rgba(255,255,255,.1)",
  booleanBg: "#222425",
  booleanSelectedBg: "#2E3438",
  inputBg: "#1B1C1D",
  inputBorder: "rgba(255,255,255,.1)",
  inputTextColor: h4.lightest,
  inputBorderRadius: 4
};
var Ut3 = ja;
var Ha = {
  base: "light",
  // Storybook-specific color palette
  colorPrimary: "#FF4785",
  // coral
  colorSecondary: "#029CFD",
  // ocean
  // UI
  appBg: U5.app,
  appContentBg: h4.lightest,
  appPreviewBg: h4.lightest,
  appBorderColor: h4.border,
  appBorderRadius: 4,
  // Fonts
  fontBase: j4.fonts.base,
  fontCode: j4.fonts.mono,
  // Text colors
  textColor: h4.darkest,
  textInverseColor: h4.lightest,
  textMutedColor: h4.dark,
  // Toolbar default and active colors
  barTextColor: h4.mediumdark,
  barHoverColor: h4.secondary,
  barSelectedColor: h4.secondary,
  barBg: h4.lightest,
  // Form colors
  buttonBg: U5.app,
  buttonBorder: h4.medium,
  booleanBg: h4.mediumlight,
  booleanSelectedBg: h4.lightest,
  inputBg: h4.lightest,
  inputBorder: h4.border,
  inputTextColor: h4.darkest,
  inputBorderRadius: 4
};
var xe3 = Ha;
var Vt3 = (() => {
  let e3;
  return typeof window < "u" ? e3 = window : typeof globalThis < "u" ? e3 = globalThis : typeof global < "u" ? e3 = global : typeof self < "u" ? e3 = self : e3 = {}, e3;
})();
var { window: Rr3 } = Vt3;
var Ua = /* @__PURE__ */ o3((e3) => typeof e3 != "string" ? (s.warn(
  `Color passed to theme object should be a string. Instead ${e3}(${typeof e3}) was passed.`
), false) : true, "isColorString");
var Va = /* @__PURE__ */ o3((e3) => !/(gradient|var|calc)/.test(e3), "isValidColorForPolished");
var Ga = /* @__PURE__ */ o3(
  (e3, r4) => e3 === "darken" ? ye2(`${Nt3(1, r4)}`, 0.95) : e3 === "lighten" ? ye2(`${Bt3(1, r4)}`, 0.95) : r4,
  "applyPolished"
);
var Yt2 = /* @__PURE__ */ o3(
  (e3) => (r4) => {
    if (!Ua(r4) || !Va(r4))
      return r4;
    try {
      return Ga(e3, r4);
    } catch (e4) {
      return r4;
    }
  },
  "colorFactory"
);
var Ya = Yt2("lighten");
var qa = Yt2("darken");
var Xe3 = /* @__PURE__ */ o3(() => !Rr3 || !Rr3.matchMedia ? "light" : Rr3.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", "getPreferredColorScheme");
var _e3 = {
  light: xe3,
  dark: Ut3,
  normal: xe3
};
var Ar3 = Xe3();
var Ja = ve3`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;
var Jt3 = ve3`
  0%, 100% { opacity: 1; }
  50% { opacity: .4; }
`;
var Ka = ve3`
  0% { transform: translateY(1px); }
  25% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(1px); }
`;
var Xa = ve3`
  0%, 100% { transform:translate3d(0,0,0); }
  12.5%, 62.5% { transform:translate3d(-4px,0,0); }
  37.5%, 87.5% {  transform: translate3d(4px,0,0);  }
`;
var Za = Ae3`
  animation: ${Jt3} 1.5s ease-in-out infinite;
  color: transparent;
  cursor: progress;
`;
var Qa = Ae3`
  transition: all 150ms ease-out;
  transform: translate3d(0, 0, 0);

  &:hover {
    transform: translate3d(0, -2px, 0);
  }

  &:active {
    transform: translate3d(0, 0, 0);
  }
`;
function rn3(e3) {
  for (var r4 = [], t4 = 1; t4 < arguments.length; t4++)
    r4[t4 - 1] = arguments[t4];
  var n3 = Array.from(typeof e3 == "string" ? [e3] : e3);
  n3[n3.length - 1] = n3[n3.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var a4 = n3.reduce(function(u3, f6) {
    var l2 = f6.match(/\n([\t ]+|(?!\s).)/g);
    return l2 ? u3.concat(l2.map(function(c3) {
      var p4, m3;
      return (m3 = (p4 = c3.match(/[\t ]/g)) === null || p4 === void 0 ? void 0 : p4.length) !== null && m3 !== void 0 ? m3 : 0;
    })) : u3;
  }, []);
  if (a4.length) {
    var i3 = new RegExp(`
[	 ]{` + Math.min.apply(Math, a4) + "}", "g");
    n3 = n3.map(function(u3) {
      return u3.replace(i3, `
`);
    });
  }
  n3[0] = n3[0].replace(/^\r?\n/, "");
  var s5 = n3[0];
  return r4.forEach(function(u3, f6) {
    var l2 = s5.match(/(?:^|\n)( *)$/), c3 = l2 ? l2[1] : "", p4 = u3;
    typeof u3 == "string" && u3.includes(`
`) && (p4 = String(u3).split(`
`).map(function(m3, w5) {
      return w5 === 0 ? m3 : "" + c3 + m3;
    }).join(`
`)), s5 += p4 + n3[f6 + 1];
  }), s5;
}
o3(rn3, "dedent");

// node_modules/storybook-dark-mode/dist/esm/Tool.js
var import_fast_deep_equal = __toESM(require_fast_deep_equal());
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
var _window$matchMedia;
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source2 = null != arguments[i3] ? arguments[i3] : {};
    i3 % 2 ? ownKeys(Object(source2), true).forEach(function(key2) {
      _defineProperty(target, key2, source2[key2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2)) : ownKeys(Object(source2)).forEach(function(key2) {
      Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source2, key2));
    });
  }
  return target;
}
function _defineProperty(obj, key2, value2) {
  key2 = _toPropertyKey(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, { value: value2, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key2] = value2;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key2 = _toPrimitive(arg, "string");
  return _typeof(key2) === "symbol" ? key2 : String(key2);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o4, minLen) {
  if (!o4) return;
  if (typeof o4 === "string") return _arrayLikeToArray(o4, minLen);
  var n3 = Object.prototype.toString.call(o4).slice(8, -1);
  if (n3 === "Object" && o4.constructor) n3 = o4.constructor.name;
  if (n3 === "Map" || n3 === "Set") return Array.from(o4);
  if (n3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3)) return _arrayLikeToArray(o4, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++) {
    arr2[i3] = arr[i3];
  }
  return arr2;
}
var _ref = scope;
var document2 = _ref.document;
var window2 = _ref.window;
var STORAGE_KEY = "sb-addon-themes-3";
var prefersDark = (_window$matchMedia = window2.matchMedia) === null || _window$matchMedia === void 0 ? void 0 : _window$matchMedia.call(window2, "(prefers-color-scheme: dark)");
var defaultParams = {
  classTarget: "body",
  dark: _e3.dark,
  darkClass: ["dark"],
  light: _e3.light,
  lightClass: ["light"],
  stylePreview: false,
  userHasExplicitlySetTheTheme: false
};
var updateStore = function updateStore2(newStore) {
  window2.localStorage.setItem(STORAGE_KEY, JSON.stringify(newStore));
};
var toggleDarkClass = function toggleDarkClass2(el, _ref2) {
  var current = _ref2.current, _ref2$darkClass = _ref2.darkClass, darkClass = _ref2$darkClass === void 0 ? defaultParams.darkClass : _ref2$darkClass, _ref2$lightClass = _ref2.lightClass, lightClass = _ref2$lightClass === void 0 ? defaultParams.lightClass : _ref2$lightClass;
  if (current === "dark") {
    var _el$classList, _el$classList2;
    (_el$classList = el.classList).remove.apply(_el$classList, _toConsumableArray(arrayify(lightClass)));
    (_el$classList2 = el.classList).add.apply(_el$classList2, _toConsumableArray(arrayify(darkClass)));
  } else {
    var _el$classList3, _el$classList4;
    (_el$classList3 = el.classList).remove.apply(_el$classList3, _toConsumableArray(arrayify(darkClass)));
    (_el$classList4 = el.classList).add.apply(_el$classList4, _toConsumableArray(arrayify(lightClass)));
  }
};
var arrayify = function arrayify2(classes) {
  var arr = [];
  return arr.concat(classes).map(function(item) {
    return item;
  });
};
var updateManager = function updateManager2(store3) {
  var manager = document2.querySelector(store3.classTarget);
  if (!manager) {
    return;
  }
  toggleDarkClass(manager, store3);
};
var store = function store2() {
  var userTheme = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var storedItem = window2.localStorage.getItem(STORAGE_KEY);
  if (typeof storedItem === "string") {
    var stored = JSON.parse(storedItem);
    if (userTheme) {
      if (userTheme.dark && !(0, import_fast_deep_equal.default)(stored.dark, userTheme.dark)) {
        stored.dark = userTheme.dark;
        updateStore(stored);
      }
      if (userTheme.light && !(0, import_fast_deep_equal.default)(stored.light, userTheme.light)) {
        stored.light = userTheme.light;
        updateStore(stored);
      }
    }
    return stored;
  }
  return _objectSpread(_objectSpread({}, defaultParams), userTheme);
};
updateManager(store());

// node_modules/storybook-dark-mode/dist/esm/index.js
function _slicedToArray(arr, i3) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i3) || _unsupportedIterableToArray2(arr, i3) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(o4, minLen) {
  if (!o4) return;
  if (typeof o4 === "string") return _arrayLikeToArray2(o4, minLen);
  var n3 = Object.prototype.toString.call(o4).slice(8, -1);
  if (n3 === "Object" && o4.constructor) n3 = o4.constructor.name;
  if (n3 === "Map" || n3 === "Set") return Array.from(o4);
  if (n3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3)) return _arrayLikeToArray2(o4, minLen);
}
function _arrayLikeToArray2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++) {
    arr2[i3] = arr[i3];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i3) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e4, _x, _r3, _arr = [], _n4 = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i3) {
        if (Object(_i) !== _i) return;
        _n4 = false;
      } else for (; !(_n4 = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i3); _n4 = true) {
        ;
      }
    } catch (err) {
      _d = true, _e4 = err;
    } finally {
      try {
        if (!_n4 && null != _i["return"] && (_r3 = _i["return"](), Object(_r3) !== _r3)) return;
      } finally {
        if (_d) throw _e4;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function useDarkMode() {
  var _useState = ls(store().current === "dark"), _useState2 = _slicedToArray(_useState, 2), isDark = _useState2[0], setIsDark = _useState2[1];
  jt2(function() {
    var chan = V5.getChannel();
    chan.on(DARK_MODE_EVENT_NAME, setIsDark);
    return function() {
      return chan.off(DARK_MODE_EVENT_NAME, setIsDark);
    };
  }, []);
  return isDark;
}

// components/theme-provider/theme-wrapper.tsx
var ThemeWrapper = ({
  children,
  customTheme
}) => {
  const isDarkMode = useDarkMode();
  return /* @__PURE__ */ React14.createElement(
    ThemeProvider,
    {
      initialTssTheme: __spreadValues(__spreadValues({}, isDarkMode ? {
        colors: {
          background: "#121314",
          foreground: "#f8fafc",
          muted: "#1e293b",
          mutedForeground: "#94a3b8",
          border: "#334155"
        }
      } : {}), customTheme || {})
    },
    /* @__PURE__ */ React14.createElement("div", { className: isDarkMode ? "dark" : "" }, children)
  );
};
export {
  DataGrid,
  FilterMenu,
  Pagination,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  ThemeProvider,
  ThemeSwitcher,
  ThemeWrapper,
  cn,
  darkTheme,
  lightTheme,
  makeStyles,
  mergeStyles,
  useColumnResize,
  useGridPersistence,
  useStyles,
  useTailwindTheme,
  useTheme,
  useTssStyles,
  useTssTheme
};
