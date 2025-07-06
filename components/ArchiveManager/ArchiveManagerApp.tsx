import { useState } from "react";
import {
  Archive,
  FileText,
  Folder,
  Download,
  Info,
  FolderOpen,
  Package,
} from "lucide-react";
import { useFileSystem } from "../FileSystemContext";

interface ArchiveFile {
  id: number;
  name: string;
  type: "file" | "directory";
  size: string;
  compressed: string;
  ratio: string;
  originalContent?: string;
}

export function ArchiveManagerApp() {
  const [currentArchive, setCurrentArchive] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [archiveContents, setArchiveContents] = useState<ArchiveFile[]>([]);
  const [sourcePath, setSourcePath] = useState("/home/user");

  const { getCurrentDirectory, createFile, formatFileSize } = useFileSystem();

  const currentDir = getCurrentDirectory(sourcePath);
  const sourceFiles = currentDir?.children
    ? Object.values(currentDir.children)
    : [];

  const createArchiveFromPath = () => {
    const archiveName = prompt("Enter archive name (without extension):");
    if (!archiveName) return;

    const archiveFileName = `${archiveName.trim()}.zip`;
    setCurrentArchive(archiveFileName);

    // Convert file system files to archive format
    const archiveFiles: ArchiveFile[] = sourceFiles.map((file, index) => {
      const originalSize = file.type === "file" ? file.size || 0 : 0;
      const compressedSize = Math.floor(
        originalSize * (0.3 + Math.random() * 0.4)
      ); // Simulate compression
      const ratio =
        originalSize > 0
          ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
          : 0;

      return {
        id: index + 1,
        name: file.name,
        type: file.type,
        size: file.type === "file" ? formatFileSize(originalSize) : "-",
        compressed: file.type === "file" ? formatFileSize(compressedSize) : "-",
        ratio: file.type === "file" ? `${ratio}%` : "-",
        originalContent: file.content,
      };
    });

    setArchiveContents(archiveFiles);
    setSelectedFiles([]);
  };

  const extractSelectedFiles = () => {
    if (selectedFiles.length === 0 || !currentArchive) return;

    const extractPath = prompt(
      "Enter extraction path:",
      "/home/user/extracted"
    );
    if (!extractPath) return;

    selectedFiles.forEach((fileId) => {
      const archiveFile = archiveContents.find((f) => f.id === fileId);
      if (archiveFile && archiveFile.type === "file") {
        const fileName = `extracted_${archiveFile.name}`;
        const content =
          archiveFile.originalContent ||
          `Content of ${archiveFile.name} from ${currentArchive}`;
        createFile(extractPath, fileName, content);
      }
    });

    alert(`Extracted ${selectedFiles.length} files to ${extractPath}`);
    setSelectedFiles([]);
  };

  const simulateArchiveOpen = () => {
    const sampleArchive = "sample-project.zip";
    setCurrentArchive(sampleArchive);

    const sampleContents: ArchiveFile[] = [
      {
        id: 1,
        name: "src/",
        type: "directory",
        size: "-",
        compressed: "-",
        ratio: "-",
      },
      {
        id: 2,
        name: "package.json",
        type: "file",
        size: "2.1 KB",
        compressed: "1.3 KB",
        ratio: "38%",
        originalContent:
          '{\n  "name": "sample-project",\n  "version": "1.0.0"\n}',
      },
      {
        id: 3,
        name: "README.md",
        type: "file",
        size: "1.5 KB",
        compressed: "890 B",
        ratio: "41%",
        originalContent:
          "# Sample Project\n\nThis is a sample project extracted from an archive.",
      },
      {
        id: 4,
        name: "main.js",
        type: "file",
        size: "15.2 KB",
        compressed: "4.8 KB",
        ratio: "68%",
        originalContent: "console.log('Hello from extracted main.js');",
      },
    ];

    setArchiveContents(sampleContents);
    setSelectedFiles([]);
  };

  const toggleFileSelection = (fileId: number) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const selectAll = () => {
    setSelectedFiles(archiveContents.map((file) => file.id));
  };

  const clearSelection = () => {
    setSelectedFiles([]);
  };

  const closeArchive = () => {
    setCurrentArchive(null);
    setArchiveContents([]);
    setSelectedFiles([]);
  };

  return (
    <div
      className="h-full text-slate-200 flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, var(--window-bg), var(--taskbar-hover))",
        color: "var(--taskbar-text)",
      }}
    >
      {/* Header */}
      <div
        className="p-4 border-b"
        style={{
          borderColor: "var(--window-border)",
          backgroundColor: "var(--taskbar-bg)",
        }}
      >
        <div className="flex items-center gap-2">
          <Archive size={24} style={{ color: "var(--color-orange-400)" }} />
          <span className="text-lg font-semibold">Archive Manager</span>
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="p-4 border-b"
        style={{
          borderColor: "var(--window-border)",
          backgroundColor: "var(--taskbar-hover)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={createArchiveFromPath}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm"
              style={{ backgroundColor: "var(--color-green-600)" }}
            >
              <Package size={16} />
              Create from {sourcePath}
            </button>
            <button
              onClick={simulateArchiveOpen}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm"
              style={{ backgroundColor: "var(--color-blue-600)" }}
            >
              <FolderOpen size={16} />
              Open Sample Archive
            </button>
            <button
              onClick={extractSelectedFiles}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm disabled:opacity-50"
              style={{ backgroundColor: "var(--color-purple-600)" }}
              disabled={selectedFiles.length === 0 || !currentArchive}
            >
              <Download size={16} />
              Extract Selected
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sourcePath}
              onChange={(e) => setSourcePath(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm"
              style={{
                backgroundColor: "var(--window-bg)",
                color: "var(--taskbar-text)",
                border: `1px solid var(--window-border)`,
              }}
            >
              <option value="/home/user">Home Directory</option>
              <option value="/home/user/Documents">Documents</option>
              <option value="/home/user/Downloads">Downloads</option>
              <option value="/etc">System Config</option>
              <option value="/">Root</option>
            </select>
            {currentArchive && (
              <button
                onClick={closeArchive}
                className="px-3 py-2 rounded-lg text-sm transition-colors"
                style={{ backgroundColor: "var(--color-red-600)" }}
              >
                Close Archive
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Source Files Preview */}
      {!currentArchive && (
        <div
          className="p-4 border-b"
          style={{
            borderColor: "var(--window-border)",
            backgroundColor: "var(--window-bg)",
          }}
        >
          <h3 className="font-semibold mb-2">Source Directory: {sourcePath}</h3>
          <div className="flex flex-wrap gap-2">
            {sourceFiles.slice(0, 8).map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm"
                style={{ backgroundColor: "var(--taskbar-hover)" }}
              >
                {file.type === "directory" ? (
                  <Folder
                    size={14}
                    style={{ color: "var(--color-blue-400)" }}
                  />
                ) : (
                  <FileText
                    size={14}
                    style={{ color: "var(--taskbar-text)" }}
                  />
                )}
                <span>{file.name}</span>
              </div>
            ))}
            {sourceFiles.length > 8 && (
              <div className="px-3 py-1 text-sm opacity-70">
                +{sourceFiles.length - 8} more...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Archive Info */}
      {currentArchive && (
        <div
          className="p-4 border-b"
          style={{
            borderColor: "var(--window-border)",
            backgroundColor: "var(--window-bg)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{currentArchive}</h3>
              <p className="text-sm opacity-70">
                {archiveContents.length} items • Compression: ZIP • Created from{" "}
                {sourcePath}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {selectedFiles.length > 0 && (
                <>
                  <button
                    onClick={selectAll}
                    className="text-sm hover:opacity-80"
                    style={{ color: "var(--color-blue-400)" }}
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearSelection}
                    className="text-sm hover:opacity-80"
                    style={{ color: "var(--taskbar-text)" }}
                  >
                    Clear
                  </button>
                </>
              )}
              <button
                className="p-2 rounded-lg transition-colors"
                style={{ backgroundColor: "var(--taskbar-hover)" }}
              >
                <Info size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File List */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {currentArchive ? (
            <div>
              <div className="mb-4 text-sm opacity-70">
                {selectedFiles.length > 0 &&
                  `${selectedFiles.length} items selected`}
              </div>

              <div className="space-y-1">
                {/* Header */}
                <div
                  className="grid grid-cols-12 gap-4 text-xs font-semibold border-b pb-2"
                  style={{ borderColor: "var(--window-border)", opacity: 0.7 }}
                >
                  <div className="col-span-1"></div>
                  <div className="col-span-5">Name</div>
                  <div className="col-span-2">Original Size</div>
                  <div className="col-span-2">Compressed</div>
                  <div className="col-span-2">Ratio</div>
                </div>

                {/* File rows */}
                {archiveContents.map((file) => (
                  <div
                    key={file.id}
                    className={`grid grid-cols-12 gap-4 text-sm py-2 rounded transition-colors cursor-pointer ${
                      selectedFiles.includes(file.id)
                        ? "opacity-100"
                        : "hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor: selectedFiles.includes(file.id)
                        ? "var(--color-blue-600)"
                        : "var(--window-bg)",
                    }}
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    <div className="col-span-1 flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => toggleFileSelection(file.id)}
                        className="rounded"
                      />
                    </div>
                    <div className="col-span-5 flex items-center gap-2">
                      {file.type === "directory" ? (
                        <Folder
                          size={16}
                          style={{ color: "var(--color-blue-400)" }}
                        />
                      ) : (
                        <FileText
                          size={16}
                          style={{ color: "var(--taskbar-text)" }}
                        />
                      )}
                      <span className="font-medium">{file.name}</span>
                    </div>
                    <div className="col-span-2">{file.size}</div>
                    <div className="col-span-2">{file.compressed}</div>
                    <div className="col-span-2">
                      {file.ratio !== "-" && (
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            parseInt(file.ratio) > 50
                              ? "text-green-400"
                              : "text-orange-400"
                          }`}
                          style={{
                            backgroundColor:
                              parseInt(file.ratio) > 50
                                ? "var(--color-green-600)"
                                : "var(--color-orange-600)",
                          }}
                        >
                          {file.ratio}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Archive size={64} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Archive Open</h3>
              <p className="opacity-70 mb-4">
                Create an archive from the current directory or open an existing
                one.
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={createArchiveFromPath}
                  className="px-4 py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: "var(--color-green-600)" }}
                >
                  Create Archive
                </button>
                <button
                  onClick={simulateArchiveOpen}
                  className="px-4 py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: "var(--color-blue-600)" }}
                >
                  Open Sample
                </button>
              </div>
            </div>
          )}
        </div>
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
          <span>
            {currentArchive
              ? `Archive: ${currentArchive}`
              : `Ready - ${sourceFiles.length} files in source`}
          </span>
          <span>Supported formats: ZIP, TAR, 7Z, RAR</span>
        </div>
      </div>
    </div>
  );
}
