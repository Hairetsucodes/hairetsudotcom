import { useState } from "react";
import {
  Folder,
  FileText,
  Home,
  ArrowLeft,
  FolderPlus,
  FilePlus,
  Trash2,
  RefreshCw,
  Edit,
} from "lucide-react";
import { useFileSystem, FileSystemNode } from "../FileSystemContext";
import { TextEditorApp } from "../TextEditor/TextEditorApp";

interface FileManagerProps {
  createWindow?: (
    title: string,
    component: React.ComponentType,
    size?: { width: number; height: number }
  ) => void;
}

export function FileManagerApp({ createWindow }: FileManagerProps = {}) {
  const [currentPath, setCurrentPath] = useState("/home/user");
  const {
    getCurrentDirectory,
    createFile,
    createDirectory,
    deleteFile,
    deleteDirectory,
    formatFileSize,
  } = useFileSystem();

  const currentDir = getCurrentDirectory(currentPath);
  const files = currentDir?.children ? Object.values(currentDir.children) : [];

  const navigateToPath = (path: string) => {
    const targetDir = getCurrentDirectory(path);
    if (targetDir && targetDir.type === "directory") {
      setCurrentPath(path);
    }
  };

  const navigateUp = () => {
    const pathParts = currentPath.split("/").filter(Boolean);
    if (pathParts.length > 0) {
      pathParts.pop();
      const newPath = pathParts.length > 0 ? "/" + pathParts.join("/") : "/";
      navigateToPath(newPath);
    }
  };

  const navigateHome = () => {
    navigateToPath("/home/user");
  };

  const handleDoubleClick = (file: FileSystemNode) => {
    if (file.type === "directory") {
      const newPath =
        currentPath === "/" ? `/${file.name}` : `${currentPath}/${file.name}`;
      navigateToPath(newPath);
    } else if (file.type === "file" && createWindow) {
      // Open text files in the text editor
      const isTextFile = file.name.match(
        /\.(txt|md|js|ts|jsx|tsx|json|xml|html|css|sh|py|java|cpp|c|h|readme|log|conf|config|ini)$/i
      );

      if (isTextFile) {
        const EditorWithFile = () => (
          <TextEditorApp
            initialFile={{ path: currentPath, filename: file.name }}
          />
        );
        createWindow(`${file.name} - Text Editor`, EditorWithFile, {
          width: 900,
          height: 700,
        });
      } else {
        alert(`Cannot open ${file.name}: File type not supported for editing`);
      }
    }
  };

  const handleOpenInEditor = (file: FileSystemNode) => {
    if (file.type === "file" && createWindow) {
      const EditorWithFile = () => (
        <TextEditorApp
          initialFile={{ path: currentPath, filename: file.name }}
        />
      );
      createWindow(`${file.name} - Text Editor`, EditorWithFile, {
        width: 900,
        height: 700,
      });
    }
  };

  const handleCreateFolder = () => {
    const folderName = prompt("Enter folder name:");
    if (folderName && folderName.trim()) {
      createDirectory(currentPath, folderName.trim());
    }
  };

  const handleCreateFile = () => {
    const fileName = prompt("Enter file name:");
    if (fileName && fileName.trim()) {
      createFile(currentPath, fileName.trim(), "");
    }
  };

  const handleDelete = (fileName: string, fileType: "file" | "directory") => {
    const confirmed = confirm(`Are you sure you want to delete "${fileName}"?`);
    if (confirmed) {
      if (fileType === "file") {
        deleteFile(currentPath, fileName);
      } else {
        deleteDirectory(currentPath, fileName);
      }
    }
  };

  const formatPath = (path: string) => {
    if (path === "/") return "Root";
    if (path === "/home/user") return "Home";
    return path;
  };

  const isTextFile = (filename: string) => {
    return filename.match(
      /\.(txt|md|js|ts|jsx|tsx|json|xml|html|css|sh|py|java|cpp|c|h|readme|log|conf|config|ini)$/i
    );
  };

  return (
    <div
      className="h-full flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, var(--window-bg), var(--taskbar-hover))",
        color: "var(--taskbar-text)",
      }}
    >
      {/* Header */}
      <div
        className="p-4 border-b flex items-center justify-between"
        style={{
          borderColor: "var(--window-border)",
          backgroundColor: "var(--taskbar-bg)",
        }}
      >
        <div className="flex items-center gap-2">
          <Folder size={20} style={{ color: "var(--color-blue-400)" }} />
          <span className="font-semibold">File Manager</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateFolder}
            className="p-2 rounded-lg transition-colors hover:opacity-80"
            style={{ backgroundColor: "var(--taskbar-hover)" }}
            title="New Folder"
          >
            <FolderPlus size={16} style={{ color: "var(--color-green-400)" }} />
          </button>
          <button
            onClick={handleCreateFile}
            className="p-2 rounded-lg transition-colors hover:opacity-80"
            style={{ backgroundColor: "var(--taskbar-hover)" }}
            title="New File"
          >
            <FilePlus size={16} style={{ color: "var(--color-blue-400)" }} />
          </button>
          <button
            onClick={() => setCurrentPath(currentPath)}
            className="p-2 rounded-lg transition-colors hover:opacity-80"
            style={{ backgroundColor: "var(--taskbar-hover)" }}
            title="Refresh"
          >
            <RefreshCw size={16} style={{ color: "var(--taskbar-text)" }} />
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <div
        className="p-3 border-b flex items-center gap-2"
        style={{
          borderColor: "var(--window-border)",
          backgroundColor: "var(--taskbar-hover)",
        }}
      >
        <button
          onClick={navigateUp}
          disabled={currentPath === "/"}
          className="p-2 rounded-lg transition-colors hover:opacity-80 disabled:opacity-50"
          style={{ backgroundColor: "var(--window-bg)" }}
          title="Go Up"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={navigateHome}
          className="p-2 rounded-lg transition-colors hover:opacity-80"
          style={{ backgroundColor: "var(--window-bg)" }}
          title="Home"
        >
          <Home size={16} />
        </button>
        <div
          className="flex-1 px-3 py-2 rounded-lg text-sm font-mono"
          style={{ backgroundColor: "var(--window-bg)" }}
        >
          📁 {formatPath(currentPath)}
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 p-4 overflow-auto">
        {files.length === 0 ? (
          <div className="text-center py-12">
            <Folder size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold mb-2">Empty Directory</p>
            <p className="opacity-70">
              This folder is empty. Create some files or folders to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-2">
            {/* Header */}
            <div
              className="grid grid-cols-12 gap-4 text-xs font-semibold border-b pb-2"
              style={{ borderColor: "var(--window-border)", opacity: 0.7 }}
            >
              <div className="col-span-1"></div>
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-2">Actions</div>
            </div>

            {/* Files and Folders */}
            {files.map((file, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] group"
                style={{ backgroundColor: "var(--window-bg)" }}
                onDoubleClick={() => handleDoubleClick(file)}
                title={
                  file.type === "directory"
                    ? "Double-click to open folder"
                    : isTextFile(file.name)
                    ? "Double-click to edit in Text Editor"
                    : "Double-click to view"
                }
              >
                <div className="col-span-1 flex items-center">
                  <div
                    className="p-2 rounded-lg transition-colors"
                    style={{ backgroundColor: "var(--taskbar-hover)" }}
                  >
                    {file.type === "directory" ? (
                      <Folder
                        size={18}
                        style={{ color: "var(--color-blue-400)" }}
                      />
                    ) : (
                      <FileText
                        size={18}
                        style={{
                          color: isTextFile(file.name)
                            ? "var(--color-green-400)"
                            : "var(--taskbar-text)",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="col-span-5 flex items-center">
                  <span className="font-medium">{file.name}</span>
                  {file.type === "directory" && (
                    <span className="ml-1 opacity-50">/</span>
                  )}
                  {file.type === "file" && isTextFile(file.name) && (
                    <span
                      className="ml-2 text-xs px-1 rounded"
                      style={{
                        backgroundColor: "var(--color-green-600)",
                        color: "white",
                      }}
                    >
                      editable
                    </span>
                  )}
                </div>
                <div className="col-span-2 flex items-center text-sm opacity-70">
                  {file.type === "file" ? formatFileSize(file.size || 0) : "-"}
                </div>
                <div className="col-span-2 flex items-center text-sm opacity-70">
                  {file.modified
                    ? new Date(file.modified).toLocaleDateString()
                    : "-"}
                </div>
                <div className="col-span-2 flex items-center gap-1">
                  {file.type === "file" && isTextFile(file.name) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenInEditor(file);
                      }}
                      className="p-1 rounded transition-colors hover:opacity-80 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: "var(--color-green-600)" }}
                      title="Edit in Text Editor"
                    >
                      <Edit size={14} style={{ color: "white" }} />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file.name, file.type);
                    }}
                    className="p-1 rounded transition-colors hover:opacity-80 opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: "var(--color-red-500)" }}
                    title="Delete"
                  >
                    <Trash2 size={14} style={{ color: "white" }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div
        className="p-2 border-t text-xs"
        style={{
          borderColor: "var(--window-border)",
          backgroundColor: "var(--taskbar-bg)",
          opacity: 0.8,
        }}
      >
        <div className="flex items-center justify-between">
          <span>{files.length} items</span>
          <span>
            {files.filter((f) => f.type === "directory").length} folders,{" "}
            {files.filter((f) => f.type === "file").length} files
            {createWindow ? " | Double-click text files to edit" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
