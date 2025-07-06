import { useState, useEffect, useRef } from "react";
import { Save, FileText, FolderOpen, FileX, AlertCircle } from "lucide-react";
import { useFileSystem } from "../FileSystemContext";

interface TextEditorProps {
  initialFile?: { path: string; filename: string };
}

export function TextEditorApp({ initialFile }: TextEditorProps = {}) {
  const [content, setContent] = useState("");
  const [currentFile, setCurrentFile] = useState<{
    path: string;
    filename: string;
  } | null>(initialFile || null);
  const [isModified, setIsModified] = useState(false);
  const [showOpenDialog, setShowOpenDialog] = useState(false);
  const [browsePath, setBrowsePath] = useState("/home/user");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { getCurrentDirectory, updateFileContent, createFile, formatFileSize } =
    useFileSystem();

  // Load file content when a file is selected
  useEffect(() => {
    if (currentFile) {
      const dir = getCurrentDirectory(currentFile.path);
      if (dir && dir.children && dir.children[currentFile.filename]) {
        const file = dir.children[currentFile.filename];
        if (file.type === "file") {
          setContent(file.content || "");
          setIsModified(false);
        }
      }
    } else {
      setContent(
        "# Welcome to Text Editor\n\nCreate a new file or open an existing one to start editing..."
      );
      setIsModified(false);
    }
  }, [currentFile, getCurrentDirectory]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setIsModified(true);
  };

  const saveFile = () => {
    if (!currentFile) {
      // Save as new file
      const filename = prompt("Enter filename:");
      if (!filename) return;

      const path = "/home/user"; // Default save location
      const success = createFile(path, filename, content);
      if (success) {
        setCurrentFile({ path, filename });
        setIsModified(false);
        alert(`File saved as ${filename}`);
      } else {
        alert("Failed to save file");
      }
    } else {
      // Save existing file
      const success = updateFileContent(
        currentFile.path,
        currentFile.filename,
        content
      );
      if (success) {
        setIsModified(false);
        alert("File saved successfully");
      } else {
        alert("Failed to save file");
      }
    }
  };

  const openFile = (path: string, filename: string) => {
    if (isModified) {
      const save = confirm(
        "You have unsaved changes. Do you want to save before opening another file?"
      );
      if (save) {
        saveFile();
      }
    }
    setCurrentFile({ path, filename });
    setShowOpenDialog(false);
  };

  const newFile = () => {
    if (isModified) {
      const save = confirm(
        "You have unsaved changes. Do you want to save before creating a new file?"
      );
      if (save) {
        saveFile();
      }
    }
    setCurrentFile(null);
    setContent("");
    setIsModified(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      saveFile();
    } else if (e.ctrlKey && e.key === "o") {
      e.preventDefault();
      setShowOpenDialog(true);
    } else if (e.ctrlKey && e.key === "n") {
      e.preventDefault();
      newFile();
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTabPress();
    }
  };

  const handleTabPress = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const tabSize = "  "; // 2 spaces for tab

    // Insert tab at cursor position
    const newContent =
      content.substring(0, start) + tabSize + content.substring(end);

    setContent(newContent);
    setIsModified(true);

    // Set cursor position after the tab
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + tabSize.length;
      textarea.focus();
    }, 0);
  };

  const currentDir = getCurrentDirectory(browsePath);
  const files = currentDir?.children
    ? Object.values(currentDir.children).filter((f) => f.type === "file")
    : [];

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
          <FileText size={20} style={{ color: "var(--color-blue-400)" }} />
          <span className="font-semibold">Text Editor</span>
          {currentFile && (
            <span className="text-sm opacity-70">
              - {currentFile.filename}
              {isModified && (
                <span style={{ color: "var(--color-orange-400)" }}> *</span>
              )}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={newFile}
            className="p-2 rounded-lg transition-colors hover:opacity-80"
            style={{ backgroundColor: "var(--taskbar-hover)" }}
            title="New File (Ctrl+N)"
          >
            <FileX size={16} style={{ color: "var(--color-green-400)" }} />
          </button>
          <button
            onClick={() => setShowOpenDialog(true)}
            className="p-2 rounded-lg transition-colors hover:opacity-80"
            style={{ backgroundColor: "var(--taskbar-hover)" }}
            title="Open File (Ctrl+O)"
          >
            <FolderOpen size={16} style={{ color: "var(--color-blue-400)" }} />
          </button>
          <button
            onClick={saveFile}
            className="p-2 rounded-lg transition-colors hover:opacity-80"
            style={{
              backgroundColor: isModified
                ? "var(--color-orange-600)"
                : "var(--taskbar-hover)",
            }}
            title="Save File (Ctrl+S)"
          >
            <Save size={16} style={{ color: "white" }} />
          </button>
        </div>
      </div>

      {/* File Info Bar */}
      {currentFile && (
        <div
          className="px-4 py-2 text-sm border-b"
          style={{
            borderColor: "var(--window-border)",
            backgroundColor: "var(--window-bg)",
            opacity: 0.8,
          }}
        >
          <span>
            📁 {currentFile.path}/{currentFile.filename}
          </span>
          <span className="ml-4">
            📊 {content.length} characters, {content.split("\n").length} lines
          </span>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 p-4 overflow-hidden">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-full p-4 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
          style={{
            backgroundColor: "var(--taskbar-hover)",
            color: "var(--taskbar-text)",
            border: `1px solid var(--window-border)`,
          }}
          placeholder={
            currentFile
              ? "Start editing..."
              : "Create a new file or open an existing one..."
          }
          autoFocus
        />
      </div>

      {/* Status Bar */}
      <div
        className="p-2 border-t text-xs flex items-center justify-between"
        style={{
          borderColor: "var(--window-border)",
          backgroundColor: "var(--taskbar-bg)",
          opacity: 0.8,
        }}
      >
        <div className="flex items-center gap-4">
          <span>
            {currentFile ? `Editing: ${currentFile.filename}` : "No file open"}
          </span>
          {isModified && (
            <span
              className="flex items-center gap-1"
              style={{ color: "var(--color-orange-400)" }}
            >
              <AlertCircle size={12} />
              Modified
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span>Ctrl+S Save | Ctrl+O Open | Ctrl+N New | Tab Indent</span>
        </div>
      </div>

      {/* Open File Dialog */}
      {showOpenDialog && (
        <div
          className="absolute inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setShowOpenDialog(false)}
        >
          <div
            className="w-96 max-h-96 rounded-lg p-4 overflow-hidden flex flex-col"
            style={{
              backgroundColor: "var(--window-bg)",
              border: `1px solid var(--window-border)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Open File</h3>
              <button
                onClick={() => setShowOpenDialog(false)}
                className="p-1 rounded hover:opacity-80"
                style={{ backgroundColor: "var(--taskbar-hover)" }}
              >
                ✕
              </button>
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={browsePath}
                onChange={(e) => setBrowsePath(e.target.value)}
                className="w-full p-2 rounded text-sm"
                style={{
                  backgroundColor: "var(--taskbar-hover)",
                  border: `1px solid var(--window-border)`,
                  color: "var(--taskbar-text)",
                }}
                placeholder="Enter path..."
              />
            </div>

            <div className="flex-1 overflow-auto">
              {files.length === 0 ? (
                <p className="text-center py-4 opacity-70">
                  No text files found in this directory
                </p>
              ) : (
                <div className="space-y-1">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded cursor-pointer hover:opacity-80"
                      style={{ backgroundColor: "var(--taskbar-hover)" }}
                      onClick={() => openFile(browsePath, file.name)}
                    >
                      <div className="flex items-center gap-2">
                        <FileText
                          size={14}
                          style={{ color: "var(--color-blue-400)" }}
                        />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <span className="text-xs opacity-70">
                        {formatFileSize(file.size || 0)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
