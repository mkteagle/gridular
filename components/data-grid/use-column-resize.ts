import { useState, useCallback } from "react";

export const useColumnResize = (enableColumnResize: boolean) => {
  const [columnResizeState, setColumnResizeState] = useState({});
  const [isResizing, setIsResizing] = useState(false);

  const handleColumnResizeStart = useCallback(
    (columnId: string, startWidth: number, e: MouseEvent) => {
      if (!enableColumnResize) return;

      setIsResizing(true);
      const startX = e.clientX;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const newWidth = Math.max(50, startWidth + deltaX);

        setColumnResizeState((prev) => ({
          ...prev,
          [columnId]: newWidth,
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
    handleColumnResizeStart,
  };
};
