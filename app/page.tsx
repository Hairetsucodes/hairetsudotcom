"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Folder,
  Terminal,
  Calculator,
  FileText,
  Menu,
  Volume2,
  Wifi,
  Battery,
  Globe,
} from "lucide-react";

// Components and Types
import { DesktopIconComponent } from "../components/DesktopIcon";
import { WindowComponent } from "../components/Window";
import { StartMenu } from "../components/StartMenu";
import { ContextMenu, getDesktopContextMenu } from "../components/ContextMenu";
import { FileManagerApp } from "../components/FileManager/FileManagerApp";
import { TerminalApp } from "../components/Terminal/TerminalApp";
import { CalculatorApp } from "../components/Calculator/CalculatorApp";
import { TextEditorApp } from "../components/TextEditor/TextEditorApp";
import { BrowserApp } from "../components/Browser/BrowserApp";
import { SettingsApp } from "../components/Settings/SettingsApp";
import { SystemMonitorApp } from "../components/SystemMonitor/SystemMonitorApp";
import { ImageViewerApp } from "../components/ImageViewer/ImageViewerApp";
import { MusicPlayerApp } from "../components/MusicPlayer/MusicPlayerApp";
import { VideoPlayerApp } from "../components/VideoPlayer/VideoPlayerApp";
import { NetworkManagerApp } from "../components/NetworkManager/NetworkManagerApp";
import { ArchiveManagerApp } from "../components/ArchiveManager/ArchiveManagerApp";
import { FileSystemProvider } from "../components/FileSystemContext";
import HairetsuCom from "../components/HairetsuWebSite/HairetsuCom";
import type { Window, DesktopIcon } from "../components/types";

function LinuxDesktopContent() {
  const [windows, setWindows] = useState<Window[]>([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [time, setTime] = useState(new Date());
  const [highestZIndex, setHighestZIndex] = useState(100);
  const [browserClosed, setBrowserClosed] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    position: { x: number; y: number };
  }>({ show: false, position: { x: 0, y: 0 } });

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Open browser by default when desktop loads (only once)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!browserClosed) {
        const newWindow: Window = {
          id: "browser-default",
          title: "Browser - Hairetsu",
          component: BrowserApp,
          isMinimized: false,
          isMaximized: false,
          position: { x: 60, y: 50 },
          size: { width: 1000, height: 800 },
          zIndex: 101,
        };
        setWindows([newWindow]);
        setHighestZIndex(102);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array - only run once on mount

  const createWindow = useCallback(
    (
      title: string,
      component: React.ComponentType,
      size?: { width: number; height: number }
    ) => {
      const defaultSize = { width: 800, height: 600 };
      const newWindow: Window = {
        id: Date.now().toString(),
        title,
        component,
        isMinimized: false,
        isMaximized: false,
        position: {
          x: 100 + Math.random() * 200,
          y: 100 + Math.random() * 200,
        },
        size: size || defaultSize,
        zIndex: highestZIndex + 1,
      };

      setWindows((prev) => [...prev, newWindow]);
      setHighestZIndex((prev) => prev + 1);
    },
    [highestZIndex]
  );

  const closeWindow = useCallback((windowId: string) => {
    // Track if the default browser is being closed
    if (windowId === "browser-default") {
      setBrowserClosed(true);
    }
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId
          ? {
              ...w,
              isMaximized: !w.isMaximized,
              position: w.isMaximized ? w.position : { x: 0, y: 0 },
              size: w.isMaximized
                ? w.size
                : { width: window.innerWidth, height: window.innerHeight - 48 },
            }
          : w
      )
    );
  }, []);

  const focusWindow = useCallback(
    (windowId: string) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === windowId
            ? { ...w, zIndex: highestZIndex + 1, isMinimized: false }
            : w
        )
      );
      setHighestZIndex((prev) => prev + 1);
    },
    [highestZIndex]
  );

  const updateWindowPosition = useCallback(
    (windowId: string, position: { x: number; y: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, position } : w))
      );
    },
    []
  );

  const updateWindowSize = useCallback(
    (windowId: string, size: { width: number; height: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, size } : w))
      );
    },
    []
  );

  // Desktop icons
  const desktopIcons: DesktopIcon[] = [
    {
      id: "file-manager",
      label: "File Manager",
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
      id: "terminal",
      label: "Terminal",
      icon: Terminal,
      action: () => {
        const TerminalWithWindow = () => (
          <TerminalApp createWindow={createWindow} />
        );
        createWindow("Terminal", TerminalWithWindow, {
          width: 900,
          height: 700,
        });
      },
    },
    {
      id: "calculator",
      label: "Calculator",
      icon: Calculator,
      action: () =>
        createWindow("Calculator", CalculatorApp, { width: 300, height: 500 }),
    },
    {
      id: "text-editor",
      label: "Text Editor",
      icon: FileText,
      action: () =>
        createWindow("Text Editor", TextEditorApp, { width: 800, height: 650 }),
    },
    {
      id: "browser",
      label: "Browser",
      icon: Globe,
      action: () =>
        createWindow("Browser", BrowserApp, { width: 1000, height: 800 }),
    },
  ];

  const handleDesktopRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      position: { x: e.clientX, y: e.clientY },
    });
    setShowStartMenu(false);
  };

  const closeContextMenu = () => {
    setContextMenu({ show: false, position: { x: 0, y: 0 } });
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, var(--desktop-bg-start), var(--desktop-bg-mid), var(--desktop-bg-end))`,
      }}
      onContextMenu={handleDesktopRightClick}
      onClick={closeContextMenu}
    >
      {/* Desktop Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, var(--desktop-overlay-start), var(--desktop-overlay-mid), var(--desktop-overlay-end))`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23ffffff' stroke-width='0.5' stroke-opacity='0.05'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='120' height='120' fill='url(%23grid)' /%3E%3C/svg%3E")`,
        }}
      />
      {/* Floating orbs for ambiance */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: "var(--orb-1)" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ backgroundColor: "var(--orb-2)" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full blur-3xl animate-pulse delay-500"
          style={{ backgroundColor: "var(--orb-3)" }}
        ></div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-6 left-6 grid gap-6">
        {desktopIcons.map((icon) => (
          <DesktopIconComponent
            key={icon.id}
            icon={icon}
            onDoubleClick={icon.action}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <WindowComponent
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onUpdatePosition={updateWindowPosition}
          onUpdateSize={updateWindowSize}
        />
      ))}

      {/* Taskbar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 backdrop-blur-sm flex items-center justify-between px-4 shadow-2xl"
        style={{
          background: "var(--taskbar-bg)",
          borderTop: `1px solid var(--taskbar-border)`,
        }}
      >
        {/* Start Menu */}
        <div className="relative">
          <button
            onClick={() => setShowStartMenu(!showStartMenu)}
            className="h-9 px-4 text-white rounded-lg flex items-center gap-2 text-sm font-medium shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            style={{
              background: `linear-gradient(135deg, var(--button-start), var(--button-end))`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `linear-gradient(135deg, var(--button-hover-start), var(--button-hover-end))`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `linear-gradient(135deg, var(--button-start), var(--button-end))`;
            }}
          >
            <Menu size={16} />
            Start
          </button>

          {showStartMenu && (
            <StartMenu
              onClose={() => setShowStartMenu(false)}
              createWindow={createWindow}
              CalculatorApp={CalculatorApp}
              TextEditorApp={TextEditorApp}
              BrowserApp={BrowserApp}
              SettingsApp={SettingsApp}
              SystemMonitorApp={SystemMonitorApp}
              ImageViewerApp={ImageViewerApp}
              MusicPlayerApp={MusicPlayerApp}
              VideoPlayerApp={VideoPlayerApp}
              NetworkManagerApp={NetworkManagerApp}
              ArchiveManagerApp={ArchiveManagerApp}
            />
          )}
        </div>

        {/* Active Windows */}
        <div className="flex gap-2">
          {windows
            .filter((w) => !w.isMinimized)
            .map((window) => (
              <button
                key={window.id}
                onClick={() => focusWindow(window.id)}
                className="px-4 py-2 text-sm rounded-lg max-w-40 truncate transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                style={{
                  backgroundColor: "var(--taskbar-hover)",
                  color: "var(--taskbar-text)",
                  border: `1px solid var(--taskbar-border)`,
                }}
              >
                {window.title}
              </button>
            ))}
        </div>

        {/* System Tray */}
        <div
          className="flex items-center gap-4"
          style={{ color: "var(--taskbar-text)" }}
        >
          <div className="flex items-center gap-3">
            <Volume2
              size={18}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
            <Wifi
              size={18}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
            <Battery
              size={18}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          </div>
          <div
            className="text-sm font-medium px-3 py-1 rounded-lg"
            style={{
              backgroundColor: "var(--taskbar-hover)",
            }}
          >
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu.show && (
        <ContextMenu
          items={getDesktopContextMenu(createWindow, SettingsApp)}
          position={contextMenu.position}
          onClose={closeContextMenu}
        />
      )}
    </div>
  );
}

export default function LinuxDesktop() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const mobileKeywords =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileKeywords.test(userAgent);
      const isSmallScreen = window.innerWidth < 768;

      setIsMobile(isMobileDevice || isSmallScreen);
      setIsLoading(false);
    };

    checkMobile();

    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 768;
      const userAgent = navigator.userAgent;
      const mobileKeywords =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileKeywords.test(userAgent);

      setIsMobile(isMobileDevice || isSmallScreen);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Show portfolio website directly on mobile
  if (isMobile) {
    return (
      <div className="h-screen w-screen overflow-auto">
        <HairetsuCom />
      </div>
    );
  }

  // Show desktop OS interface on desktop
  return (
    <FileSystemProvider>
      <LinuxDesktopContent />
    </FileSystemProvider>
  );
}
