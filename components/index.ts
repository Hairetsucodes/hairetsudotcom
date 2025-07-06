// Re-export all components
export { DesktopIconComponent } from "./DesktopIcon";
export { WindowComponent } from "./Window";
export { StartMenu } from "./StartMenu";
export {
  ContextMenu,
  getDesktopContextMenu,
  getFileContextMenu,
} from "./ContextMenu";
export { FileManagerApp } from "./FileManager/FileManagerApp";
export { TerminalApp } from "./Terminal/TerminalApp";
export { CalculatorApp } from "./Calculator/CalculatorApp";
export { TextEditorApp } from "./TextEditor/TextEditorApp";
export { SettingsApp } from "./Settings/SettingsApp";
export { SystemMonitorApp } from "./SystemMonitor/SystemMonitorApp";
export { ImageViewerApp } from "./ImageViewer/ImageViewerApp";
export { MusicPlayerApp } from "./MusicPlayer/MusicPlayerApp";
export { VideoPlayerApp } from "./VideoPlayer/VideoPlayerApp";
export { NetworkManagerApp } from "./NetworkManager/NetworkManagerApp";
export { ArchiveManagerApp } from "./ArchiveManager/ArchiveManagerApp";
export { BrowserApp } from "./Browser/BrowserApp";
export { FileSystemProvider } from "./FileSystemContext";

// Re-export types
export type { Window, DesktopIcon } from "./types";
