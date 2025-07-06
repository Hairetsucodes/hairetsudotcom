import { useRef } from "react";
import { X, Minimize2, Maximize2, Move } from "lucide-react";
import { Window } from "./types";

export function WindowComponent({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onUpdatePosition,
  onUpdateSize,
}: {
  window: Window;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onUpdatePosition?: (
    windowId: string,
    position: { x: number; y: number }
  ) => void;
  onUpdateSize?: (
    windowId: string,
    size: { width: number; height: number }
  ) => void;
}) {
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent dragging if clicking on buttons or specific elements
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.tagName === "BUTTON" ||
      target.classList.contains("resize-handle")
    ) {
      return;
    }

    if (!window.isMaximized && windowRef.current) {
      e.preventDefault();

      const rect = windowRef.current.getBoundingClientRect();
      const startDragOffset = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      onFocus();

      const handleMouseMove = (e: MouseEvent) => {
        if (windowRef.current) {
          const newX = e.clientX - startDragOffset.x;
          const newY = e.clientY - startDragOffset.y;

          // Keep window within screen bounds
          const maxX = globalThis.innerWidth - window.size.width;
          const maxY = globalThis.innerHeight - window.size.height;

          const boundedX = Math.max(0, Math.min(newX, maxX));
          const boundedY = Math.max(0, Math.min(newY, maxY));

          windowRef.current.style.left = `${boundedX}px`;
          windowRef.current.style.top = `${boundedY}px`;
        }
      };

      const handleMouseUp = () => {
        // Update the window position in state when dragging ends
        if (windowRef.current && onUpdatePosition) {
          const rect = windowRef.current.getBoundingClientRect();
          onUpdatePosition(window.id, { x: rect.left, y: rect.top });
        }

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  const handleResize = (e: React.MouseEvent, direction: string) => {
    if (window.isMaximized) return;

    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = window.size.width;
    const startHeight = window.size.height;
    const startPosX = window.position.x;
    const startPosY = window.position.y;

    const minWidth = 250;
    const minHeight = 150;

    const handleMouseMove = (e: MouseEvent) => {
      if (!windowRef.current) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newPosX = startPosX;
      let newPosY = startPosY;

      // Handle different resize directions
      if (direction.includes("right")) {
        newWidth = Math.max(minWidth, startWidth + deltaX);
      }
      if (direction.includes("left")) {
        newWidth = Math.max(minWidth, startWidth - deltaX);
        newPosX = startPosX + (startWidth - newWidth);
      }
      if (direction.includes("bottom")) {
        newHeight = Math.max(minHeight, startHeight + deltaY);
      }
      if (direction.includes("top")) {
        newHeight = Math.max(minHeight, startHeight - deltaY);
        newPosY = startPosY + (startHeight - newHeight);
      }

      // Keep window within screen bounds
      const maxX = globalThis.innerWidth - newWidth;
      const maxY = globalThis.innerHeight - newHeight;
      newPosX = Math.max(0, Math.min(newPosX, maxX));
      newPosY = Math.max(0, Math.min(newPosY, maxY));

      // Apply changes to DOM immediately for smooth resizing
      windowRef.current.style.width = `${newWidth}px`;
      windowRef.current.style.height = `${newHeight}px`;
      windowRef.current.style.left = `${newPosX}px`;
      windowRef.current.style.top = `${newPosY}px`;
    };

    const handleMouseUp = () => {
      // Update the window size and position in state when resizing ends
      if (windowRef.current && onUpdateSize && onUpdatePosition) {
        const rect = windowRef.current.getBoundingClientRect();
        onUpdateSize(window.id, { width: rect.width, height: rect.height });
        onUpdatePosition(window.id, { x: rect.left, y: rect.top });
      }

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  if (window.isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className="absolute shadow-2xl rounded-xl overflow-hidden backdrop-blur-sm"
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.isMaximized ? "100vw" : window.size.width,
        height: window.isMaximized ? "100vh" : window.size.height,
        zIndex: window.zIndex,
        backgroundColor: "var(--window-bg)",
        border: "1px solid var(--window-border)",
      }}
      onClick={onFocus}
    >
      {/* Resize Handles */}
      {!window.isMaximized && (
        <>
          {/* Corner handles */}
          <div
            className="resize-handle absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
            onMouseDown={(e) => handleResize(e, "top-left")}
            style={{ zIndex: 10 }}
          />
          <div
            className="resize-handle absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
            onMouseDown={(e) => handleResize(e, "top-right")}
            style={{ zIndex: 10 }}
          />
          <div
            className="resize-handle absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
            onMouseDown={(e) => handleResize(e, "bottom-left")}
            style={{ zIndex: 10 }}
          />
          <div
            className="resize-handle absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            onMouseDown={(e) => handleResize(e, "bottom-right")}
            style={{ zIndex: 10 }}
          />

          {/* Edge handles */}
          <div
            className="resize-handle absolute top-0 left-3 right-3 h-1 cursor-n-resize"
            onMouseDown={(e) => handleResize(e, "top")}
            style={{ zIndex: 10 }}
          />
          <div
            className="resize-handle absolute bottom-0 left-3 right-3 h-1 cursor-s-resize"
            onMouseDown={(e) => handleResize(e, "bottom")}
            style={{ zIndex: 10 }}
          />
          <div
            className="resize-handle absolute left-0 top-3 bottom-3 w-1 cursor-w-resize"
            onMouseDown={(e) => handleResize(e, "left")}
            style={{ zIndex: 10 }}
          />
          <div
            className="resize-handle absolute right-0 top-3 bottom-3 w-1 cursor-e-resize"
            onMouseDown={(e) => handleResize(e, "right")}
            style={{ zIndex: 10 }}
          />
        </>
      )}

      {/* Title Bar */}
      <div
        className="h-10 px-4 flex items-center justify-between cursor-move select-none"
        style={{
          background:
            "linear-gradient(135deg, var(--taskbar-bg), var(--window-bg))",
          borderBottom: "1px solid var(--window-border)",
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Move size={16} style={{ color: "var(--taskbar-text)" }} />
          <span
            className="text-sm font-medium"
            style={{ color: "var(--taskbar-text)" }}
          >
            {window.title}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="w-[1rem] h-[1rem] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
            style={{
              backgroundColor: "var(--color-amber-500)",
              opacity: 0.8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
          >
            <Minimize2 size={12} style={{ color: "var(--color-amber-900)" }} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="w-[1rem] h-[1rem] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
            style={{
              backgroundColor: "var(--color-emerald-500)",
              opacity: 0.8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
          >
            <Maximize2
              size={12}
              style={{ color: "var(--color-emerald-900)" }}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-[1rem] h-[1rem] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
            style={{
              backgroundColor: "var(--color-red-500)",
              opacity: 0.8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
          >
            <X size={12} style={{ color: "var(--color-red-900)" }} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div
        className="overflow-auto"
        style={{
          height: `calc(100% - 40px)`, // Subtract title bar height (40px)
        }}
      >
        <window.component />
      </div>
    </div>
  );
}
