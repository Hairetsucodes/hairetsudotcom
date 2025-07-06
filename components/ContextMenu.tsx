import React from "react";
import {
  FolderPlus,
  FileText,
  RefreshCw,
  Settings,
  Terminal,
  Folder,
  Copy,
  Scissors,
  Clipboard,
  Trash2,
  Info,
  Monitor,
  Calculator,
  Globe,
} from "lucide-react";
import { FileManagerApp } from "./FileManager/FileManagerApp";
import { TerminalApp } from "./Terminal/TerminalApp";
import { BrowserApp } from "./Browser/BrowserApp";
import { CalculatorApp } from "./Calculator/CalculatorApp";

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
  divider?: boolean;
  disabled?: boolean;
  separator?: boolean;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  position: { x: number; y: number };
  onClose: () => void;
}

export function ContextMenu({ items, position, onClose }: ContextMenuProps) {
  React.useEffect(() => {
    const handleClickOutside = () => onClose();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed z-[1000] min-w-48 rounded-lg shadow-2xl backdrop-blur-sm border"
      style={{
        left: position.x,
        top: position.y,
        backgroundColor: "var(--window-bg)",
        borderColor: "var(--window-border)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-2">
        {items.map((item, index) => (
          <div key={index}>
            {item.separator && (
              <div
                className="h-px my-1 mx-2"
                style={{ backgroundColor: "var(--window-border)" }}
              />
            )}
            <button
              onClick={() => {
                if (!item.disabled) {
                  item.action();
                  onClose();
                }
              }}
              disabled={item.disabled}
              className="w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:opacity-80 transition-opacity"
              style={{ color: "var(--taskbar-text)" }}
            >
              {item.icon && (
                <item.icon
                  size={16}
                  className={
                    item.disabled ? "text-slate-500" : "text-slate-400"
                  }
                />
              )}
              {item.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Predefined context menu configurations
export function getDesktopContextMenu(
  createWindow: (
    title: string,
    component: React.ComponentType,
    size?: { width: number; height: number }
  ) => void,
  SettingsApp: React.ComponentType
): ContextMenuItem[] {
  return [
    {
      id: "new-folder",
      label: "New Folder",
      icon: FolderPlus,
      action: () => alert("New folder created!"),
    },
    {
      id: "new-file",
      label: "New Document",
      icon: FileText,
      action: () => alert("New document created!"),
    },
    {
      id: "divider-1",
      label: "",
      action: () => {},
      divider: true,
    },
    {
      id: "open-terminal",
      label: "Open Terminal Here",
      icon: Terminal,
      action: () => {
        const TerminalWithWindow = () => (
          <TerminalApp createWindow={createWindow} />
        );
        createWindow("Terminal", TerminalWithWindow, {
          width: 700,
          height: 550,
        });
      },
    },
    {
      id: "open-files",
      label: "Open File Manager",
      icon: Folder,
      action: () => {
        const FileManagerWithWindow = () => (
          <FileManagerApp createWindow={createWindow} />
        );
        createWindow("File Manager", FileManagerWithWindow, {
          width: 900,
          height: 700,
        });
      },
    },
    {
      id: "open-browser",
      label: "Open Browser",
      icon: Globe,
      action: () => {
        createWindow("Browser", BrowserApp, { width: 1200, height: 800 });
      },
    },
    {
      id: "calculator",
      label: "Calculator",
      icon: Calculator,
      action: () => {
        createWindow("Calculator", CalculatorApp, { width: 300, height: 500 });
      },
    },
    {
      id: "divider-2",
      label: "",
      action: () => {},
      divider: true,
    },
    {
      id: "refresh",
      label: "Refresh Desktop",
      icon: RefreshCw,
      action: () => window.location.reload(),
      separator: true,
    },
    {
      id: "display-settings",
      label: "Display Settings",
      icon: Monitor,
      action: () => {
        createWindow("Display Settings", SettingsApp, {
          width: 600,
          height: 500,
        });
      },
    },
    {
      id: "settings",
      label: "Desktop Settings",
      icon: Settings,
      action: () =>
        createWindow("Settings", SettingsApp, { width: 600, height: 550 }),
    },
  ];
}

export const getFileContextMenu = (fileName: string): ContextMenuItem[] => [
  {
    id: "open",
    label: "Open",
    icon: FileText,
    action: () => alert(`Opening ${fileName}`),
  },
  {
    id: "divider-1",
    label: "",
    action: () => {},
    divider: true,
  },
  {
    id: "copy",
    label: "Copy",
    icon: Copy,
    action: () => alert(`Copied ${fileName}`),
  },
  {
    id: "cut",
    label: "Cut",
    icon: Scissors,
    action: () => alert(`Cut ${fileName}`),
  },
  {
    id: "paste",
    label: "Paste",
    icon: Clipboard,
    action: () => alert("Pasted file"),
    disabled: true, // Would be enabled based on clipboard state
  },
  {
    id: "divider-2",
    label: "",
    action: () => {},
    divider: true,
  },
  {
    id: "delete",
    label: "Move to Trash",
    icon: Trash2,
    action: () => alert(`Deleted ${fileName}`),
  },
  {
    id: "properties",
    label: "Properties",
    icon: Info,
    action: () => alert(`Properties of ${fileName}`),
  },
];
