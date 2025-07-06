import { createContext, useContext, useState, ReactNode } from "react";

export interface FileSystemNode {
  name: string;
  type: "file" | "directory";
  content?: string;
  size?: number;
  modified?: Date;
  children?: Record<string, FileSystemNode>;
}

interface FileSystemContextType {
  fileSystem: FileSystemNode;
  setFileSystem: (fs: FileSystemNode) => void;
  getCurrentDirectory: (path: string) => FileSystemNode | null;
  createFile: (path: string, filename: string, content?: string) => boolean;
  createDirectory: (path: string, dirname: string) => boolean;
  updateFileContent: (
    path: string,
    filename: string,
    content: string
  ) => boolean;
  deleteFile: (path: string, filename: string) => boolean;
  deleteDirectory: (path: string, dirname: string) => boolean;
  getFileSize: (content?: string) => number;
  formatFileSize: (bytes: number) => string;
}

const FileSystemContext = createContext<FileSystemContextType | undefined>(
  undefined
);

export const useFileSystem = () => {
  const context = useContext(FileSystemContext);
  if (!context) {
    throw new Error("useFileSystem must be used within a FileSystemProvider");
  }
  return context;
};

export function FileSystemProvider({ children }: { children: ReactNode }) {
  const [fileSystem, setFileSystem] = useState<FileSystemNode>({
    name: "/",
    type: "directory",
    children: {
      home: {
        name: "home",
        type: "directory",
        children: {
          user: {
            name: "user",
            type: "directory",
            children: {
              Documents: { name: "Documents", type: "directory", children: {} },
              Downloads: { name: "Downloads", type: "directory", children: {} },
              Pictures: { name: "Pictures", type: "directory", children: {} },
              Videos: { name: "Videos", type: "directory", children: {} },
              "readme.txt": {
                name: "readme.txt",
                type: "file",
                content:
                  "Welcome to your home directory!\nThis is a sample file created by the system.\n\nYou can edit this file using the nano editor in the terminal.\nTry: nano readme.txt",
                size: 145,
                modified: new Date(),
              },
              "script.sh": {
                name: "script.sh",
                type: "file",
                content:
                  "#!/bin/bash\necho 'Hello from hairetsucom desktop!'\necho 'Running system checks...'\npwd\nwhoami\ndate\necho 'Creating test files...'\ntouch test1.txt\ntouch test2.txt\necho 'Listing directory contents:'\nls\necho 'Script execution completed successfully!'",
                size: 208,
                modified: new Date(),
              },
            },
          },
        },
      },
      etc: {
        name: "etc",
        type: "directory",
        children: {
          hosts: {
            name: "hosts",
            type: "file",
            content:
              "127.0.0.1 localhost\n::1 localhost\n127.0.0.1 hairetsucom.local",
            size: 58,
            modified: new Date(),
          },
        },
      },
      usr: { name: "usr", type: "directory", children: {} },
      var: { name: "var", type: "directory", children: {} },
      tmp: { name: "tmp", type: "directory", children: {} },
    },
  });

  const getCurrentDirectory = (path: string): FileSystemNode | null => {
    const pathParts = path.split("/").filter(Boolean);
    let current = fileSystem;

    for (const part of pathParts) {
      if (current.children && current.children[part]) {
        current = current.children[part];
      } else {
        return null;
      }
    }

    return current;
  };

  const getFileSize = (content?: string): number => {
    if (!content) return 0;
    return new Blob([content]).size;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i)) + " " + sizes[i];
  };

  const createFile = (
    path: string,
    filename: string,
    content: string = ""
  ): boolean => {
    const currentDir = getCurrentDirectory(path);
    if (!currentDir || !currentDir.children) return false;

    setFileSystem((prevFS) => {
      const newFS = JSON.parse(JSON.stringify(prevFS)); // Deep clone
      const pathParts = path.split("/").filter(Boolean);
      let current = newFS;

      for (const part of pathParts) {
        if (current.children && current.children[part]) {
          current = current.children[part];
        }
      }

      if (current.children) {
        current.children[filename] = {
          name: filename,
          type: "file",
          content: content,
          size: getFileSize(content),
          modified: new Date(),
        };
      }

      return newFS;
    });

    return true;
  };

  const createDirectory = (path: string, dirname: string): boolean => {
    const currentDir = getCurrentDirectory(path);
    if (!currentDir || !currentDir.children) return false;

    setFileSystem((prevFS) => {
      const newFS = JSON.parse(JSON.stringify(prevFS)); // Deep clone
      const pathParts = path.split("/").filter(Boolean);
      let current = newFS;

      for (const part of pathParts) {
        if (current.children && current.children[part]) {
          current = current.children[part];
        }
      }

      if (current.children) {
        current.children[dirname] = {
          name: dirname,
          type: "directory",
          children: {},
          modified: new Date(),
        };
      }

      return newFS;
    });

    return true;
  };

  const updateFileContent = (
    path: string,
    filename: string,
    content: string
  ): boolean => {
    setFileSystem((prevFS) => {
      const newFS = JSON.parse(JSON.stringify(prevFS)); // Deep clone
      const pathParts = path.split("/").filter(Boolean);
      let current = newFS;

      for (const part of pathParts) {
        if (current.children && current.children[part]) {
          current = current.children[part];
        }
      }

      if (current.children && current.children[filename]) {
        current.children[filename].content = content;
        current.children[filename].size = getFileSize(content);
        current.children[filename].modified = new Date();
      }

      return newFS;
    });

    return true;
  };

  const deleteFile = (path: string, filename: string): boolean => {
    setFileSystem((prevFS) => {
      const newFS = JSON.parse(JSON.stringify(prevFS)); // Deep clone
      const pathParts = path.split("/").filter(Boolean);
      let current = newFS;

      for (const part of pathParts) {
        if (current.children && current.children[part]) {
          current = current.children[part];
        }
      }

      if (current.children && current.children[filename]) {
        delete current.children[filename];
      }

      return newFS;
    });

    return true;
  };

  const deleteDirectory = (path: string, dirname: string): boolean => {
    setFileSystem((prevFS) => {
      const newFS = JSON.parse(JSON.stringify(prevFS)); // Deep clone
      const pathParts = path.split("/").filter(Boolean);
      let current = newFS;

      for (const part of pathParts) {
        if (current.children && current.children[part]) {
          current = current.children[part];
        }
      }

      if (current.children && current.children[dirname]) {
        delete current.children[dirname];
      }

      return newFS;
    });

    return true;
  };

  const value: FileSystemContextType = {
    fileSystem,
    setFileSystem,
    getCurrentDirectory,
    createFile,
    createDirectory,
    updateFileContent,
    deleteFile,
    deleteDirectory,
    getFileSize,
    formatFileSize,
  };

  return (
    <FileSystemContext.Provider value={value}>
      {children}
    </FileSystemContext.Provider>
  );
}
