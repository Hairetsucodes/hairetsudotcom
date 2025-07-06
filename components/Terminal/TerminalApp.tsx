import { useState, useRef, useEffect } from "react";
import { useFileSystem } from "../FileSystemContext";
import { TextEditorApp } from "../TextEditor/TextEditorApp";

interface NanoState {
  isOpen: boolean;
  filename: string;
  content: string;
  isNew: boolean;
}

interface TerminalProps {
  createWindow?: (
    title: string,
    component: React.ComponentType,
    size?: { width: number; height: number }
  ) => void;
}

export function TerminalApp({ createWindow }: TerminalProps = {}) {
  const [history, setHistory] = useState<string[]>([
    "Welcome to Linux Terminal Emulator v1.0",
    "Type 'help' for available commands",
    "",
  ]);
  const [currentPath, setCurrentPath] = useState("/home/user");
  const [inputValue, setInputValue] = useState("");
  const [nanoState, setNanoState] = useState<NanoState>({
    isOpen: false,
    filename: "",
    content: "",
    isNew: false,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const nanoRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTabbing, setIsTabbing] = useState(false);

  // Use the shared file system context
  const {
    getCurrentDirectory,
    createFile,
    createDirectory,
    updateFileContent,
    deleteFile,
    deleteDirectory,
  } = useFileSystem();

  const openNano = (filename: string) => {
    const currentDir = getCurrentDirectory(currentPath);
    let content = "";
    let isNew = true;

    if (currentDir && currentDir.children && currentDir.children[filename]) {
      content = currentDir.children[filename].content || "";
      isNew = false;
    }

    setNanoState({
      isOpen: true,
      filename,
      content,
      isNew,
    });
  };

  const saveNanoFile = () => {
    if (nanoState.isNew) {
      createFile(currentPath, nanoState.filename, nanoState.content);
      setHistory((prev) => [
        ...prev,
        `Created and saved file: ${nanoState.filename}`,
        "",
      ]);
    } else {
      updateFileContent(currentPath, nanoState.filename, nanoState.content);
      setHistory((prev) => [...prev, `Saved file: ${nanoState.filename}`, ""]);
    }

    setNanoState({
      isOpen: false,
      filename: "",
      content: "",
      isNew: false,
    });
  };

  const closeNano = () => {
    setNanoState({
      isOpen: false,
      filename: "",
      content: "",
      isNew: false,
    });
    setHistory((prev) => [...prev, "Nano editor closed", ""]);
  };

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    const [cmd, ...args] = trimmedCommand.split(" ");
    const prompt = `user@linux:${currentPath}$ ${trimmedCommand}`;

    setHistory((prev) => [...prev, prompt]);

    switch (cmd.toLowerCase()) {
      case "help":
        setHistory((prev) => [
          ...prev,
          "Available commands:",
          "  ls [path]     - List directory contents",
          "  cd <path>     - Change directory",
          "  pwd           - Print working directory",
          "  cat <file>    - Display file contents",
          "  echo <text>   - Display text",
          "  clear         - Clear terminal",
          "  date          - Show current date",
          "  whoami        - Show current user",
          "  uname         - Show system information",
          "  mkdir <name>  - Create directory",
          "  touch <name>  - Create empty file",
          "  nano <file>   - Edit file with nano editor",
          "  editor <file> - Open file in Text Editor window",
          "  gedit <file>  - Open file in Text Editor window (alias)",
          "  bash <script> - Execute shell script",
          "  ./<script>    - Execute shell script (if executable)",
          "  chmod +x <file> - Make file executable",
          "  rm <file>     - Remove file",
          "  rmdir <dir>   - Remove directory",
          "",
        ]);
        break;

      case "ls":
        const lsDir = getCurrentDirectory(currentPath);
        if (lsDir && lsDir.children) {
          const items = Object.values(lsDir.children).map((item) => {
            const itemName = item.name || "unnamed";
            if (item.type === "directory") {
              return `${itemName}/`;
            } else {
              // Show executable files with * suffix
              const isExecutable = itemName.endsWith(".sh");
              return isExecutable ? `${itemName}*` : itemName;
            }
          });
          setHistory((prev) => [...prev, items.join("  "), ""]);
        } else {
          setHistory((prev) => [...prev, "ls: cannot access directory", ""]);
        }
        break;

      case "bash":
      case "sh":
        if (!args[0]) {
          setHistory((prev) => [...prev, `${cmd}: missing script name`, ""]);
        } else {
          executeShellScript(args[0]);
        }
        break;

      case "chmod":
        if (args[0] === "+x" && args[1]) {
          const filename = args[1];
          const currentDir = getCurrentDirectory(currentPath);
          if (
            currentDir &&
            currentDir.children &&
            currentDir.children[filename]
          ) {
            // Mark file as executable in the file system
            setHistory((prev) => [
              ...prev,
              `chmod: '${filename}' is now executable`,
              "",
            ]);
            // Note: In a real implementation, we'd update file permissions
          } else {
            setHistory((prev) => [
              ...prev,
              `chmod: cannot access '${filename}': No such file`,
              "",
            ]);
          }
        } else {
          setHistory((prev) => [
            ...prev,
            "chmod: usage: chmod +x <filename>",
            "",
          ]);
        }
        break;

      // Handle ./script.sh execution
      default:
        if (cmd.startsWith("./")) {
          const scriptName = cmd.substring(2);
          executeShellScript(scriptName);
        } else {
          setHistory((prev) => [...prev, `${cmd}: command not found`, ""]);
        }
        break;

      case "pwd":
        setHistory((prev) => [...prev, currentPath, ""]);
        break;

      case "cd":
        if (!args[0] || args[0] === "~") {
          setCurrentPath("/home/user");
        } else if (args[0] === "..") {
          const pathParts = currentPath.split("/").filter(Boolean);
          if (pathParts.length > 0) {
            pathParts.pop();
            setCurrentPath(
              pathParts.length > 0 ? "/" + pathParts.join("/") : "/"
            );
          }
        } else if (args[0] === "/") {
          setCurrentPath("/");
        } else {
          const newPath = args[0].startsWith("/")
            ? args[0]
            : `${currentPath}/${args[0]}`;
          const normalizedPath =
            newPath.replace(/\/+/g, "/").replace(/\/$/, "") || "/";

          // Check if path exists
          const targetDir = getCurrentDirectory(normalizedPath);
          if (targetDir && targetDir.type === "directory") {
            setCurrentPath(normalizedPath === "" ? "/" : normalizedPath);
          } else {
            setHistory((prev) => [
              ...prev,
              `cd: ${args[0]}: No such file or directory`,
              "",
            ]);
          }
        }
        break;

      case "cat":
        if (!args[0]) {
          setHistory((prev) => [...prev, "cat: missing file operand", ""]);
        } else {
          const currentDir = getCurrentDirectory(currentPath);
          if (
            currentDir &&
            currentDir.children &&
            currentDir.children[args[0]]
          ) {
            const file = currentDir.children[args[0]];
            if (file.type === "file" && file.content) {
              setHistory((prev) => [...prev, file.content || "", ""]);
            } else {
              setHistory((prev) => [
                ...prev,
                `cat: ${args[0]}: Is a directory`,
                "",
              ]);
            }
          } else {
            setHistory((prev) => [
              ...prev,
              `cat: ${args[0]}: No such file or directory`,
              "",
            ]);
          }
        }
        break;

      case "echo":
        setHistory((prev) => [...prev, args.join(" "), ""]);
        break;

      case "clear":
        setHistory([]);
        break;

      case "date":
        setHistory((prev) => [...prev, new Date().toString(), ""]);
        break;

      case "whoami":
        setHistory((prev) => [...prev, "user", ""]);
        break;

      case "uname":
        setHistory((prev) => [
          ...prev,
          "Linux hairetsucom 5.4.0 #1 SMP x86_64 GNU/Linux",
          "",
        ]);
        break;

      case "mkdir":
        if (!args[0]) {
          setHistory((prev) => [...prev, "mkdir: missing operand", ""]);
        } else {
          const currentDir = getCurrentDirectory(currentPath);
          if (
            currentDir &&
            currentDir.children &&
            currentDir.children[args[0]]
          ) {
            setHistory((prev) => [
              ...prev,
              `mkdir: cannot create directory '${args[0]}': File exists`,
              "",
            ]);
          } else {
            const success = createDirectory(currentPath, args[0]);
            if (success) {
              setHistory((prev) => [
                ...prev,
                `Directory '${args[0]}' created`,
                "",
              ]);
            } else {
              setHistory((prev) => [
                ...prev,
                `mkdir: cannot create directory '${args[0]}'`,
                "",
              ]);
            }
          }
        }
        break;

      case "touch":
        if (!args[0]) {
          setHistory((prev) => [...prev, "touch: missing file operand", ""]);
        } else {
          const currentDir = getCurrentDirectory(currentPath);
          if (
            currentDir &&
            currentDir.children &&
            currentDir.children[args[0]]
          ) {
            setHistory((prev) => [
              ...prev,
              `File '${args[0]}' already exists`,
              "",
            ]);
          } else {
            const success = createFile(currentPath, args[0], "");
            if (success) {
              setHistory((prev) => [...prev, `File '${args[0]}' created`, ""]);
            } else {
              setHistory((prev) => [
                ...prev,
                `touch: cannot create file '${args[0]}'`,
                "",
              ]);
            }
          }
        }
        break;

      case "nano":
        if (!args[0]) {
          setHistory((prev) => [...prev, "nano: missing filename", ""]);
        } else {
          setHistory((prev) => [
            ...prev,
            `Opening nano editor for: ${args[0]}`,
            "",
          ]);
          openNano(args[0]);
        }
        break;

      case "editor":
      case "gedit":
        if (!args[0]) {
          setHistory((prev) => [...prev, `${cmd}: missing filename`, ""]);
        } else if (!createWindow) {
          setHistory((prev) => [
            ...prev,
            `${cmd}: Text Editor window creation not available`,
            "",
          ]);
        } else {
          const currentDir = getCurrentDirectory(currentPath);
          const filename = args[0];

          // Check if file exists or create it
          let fileExists = false;
          if (
            currentDir &&
            currentDir.children &&
            currentDir.children[filename]
          ) {
            fileExists = true;
          }

          if (!fileExists) {
            // Ask user if they want to create a new file
            const shouldCreate = confirm(
              `File '${filename}' does not exist. Create it?`
            );
            if (shouldCreate) {
              createFile(currentPath, filename, "");
            } else {
              setHistory((prev) => [
                ...prev,
                `${cmd}: operation cancelled`,
                "",
              ]);
              break;
            }
          }

          // Open in text editor
          const EditorWithFile = () => (
            <TextEditorApp initialFile={{ path: currentPath, filename }} />
          );

          createWindow(`${filename} - Text Editor`, EditorWithFile, {
            width: 900,
            height: 700,
          });

          setHistory((prev) => [
            ...prev,
            `Opening '${filename}' in Text Editor...`,
            "",
          ]);
        }
        break;

      case "rm":
        if (!args[0]) {
          setHistory((prev) => [...prev, "rm: missing operand", ""]);
        } else {
          const currentDir = getCurrentDirectory(currentPath);
          if (
            currentDir &&
            currentDir.children &&
            currentDir.children[args[0]]
          ) {
            const success = deleteFile(currentPath, args[0]);
            if (success) {
              setHistory((prev) => [...prev, `File '${args[0]}' removed`, ""]);
            } else {
              setHistory((prev) => [
                ...prev,
                `rm: cannot remove file '${args[0]}'`,
                "",
              ]);
            }
          } else {
            setHistory((prev) => [
              ...prev,
              `rm: cannot remove '${args[0]}': No such file or directory`,
              "",
            ]);
          }
        }
        break;

      case "rmdir":
        if (!args[0]) {
          setHistory((prev) => [...prev, "rmdir: missing operand", ""]);
        } else {
          const currentDir = getCurrentDirectory(currentPath);
          if (
            currentDir &&
            currentDir.children &&
            currentDir.children[args[0]]
          ) {
            const success = deleteDirectory(currentPath, args[0]);
            if (success) {
              setHistory((prev) => [
                ...prev,
                `Directory '${args[0]}' removed`,
                "",
              ]);
            } else {
              setHistory((prev) => [
                ...prev,
                `rmdir: cannot remove directory '${args[0]}'`,
                "",
              ]);
            }
          } else {
            setHistory((prev) => [
              ...prev,
              `rmdir: cannot remove '${args[0]}': No such file or directory`,
              "",
            ]);
          }
        }
        break;
    }
  };

  const executeShellScript = (scriptName: string) => {
    const currentDir = getCurrentDirectory(currentPath);
    if (
      !currentDir ||
      !currentDir.children ||
      !currentDir.children[scriptName]
    ) {
      setHistory((prev) => [
        ...prev,
        `bash: ${scriptName}: No such file or directory`,
        "",
      ]);
      return;
    }

    const script = currentDir.children[scriptName];
    if (script.type !== "file") {
      setHistory((prev) => [
        ...prev,
        `bash: ${scriptName}: Is a directory`,
        "",
      ]);
      return;
    }

    if (!script.content) {
      setHistory((prev) => [
        ...prev,
        `bash: ${scriptName}: Permission denied or empty file`,
        "",
      ]);
      return;
    }

    setHistory((prev) => [...prev, `Executing ${scriptName}...`, ""]);

    // Parse and execute the shell script
    const lines = script.content
      .split("\n")
      .filter((line) => line.trim() && !line.trim().startsWith("#"));

    lines.forEach((line, index) => {
      setTimeout(() => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith("echo ")) {
          const echoText = trimmedLine.substring(5).replace(/['"]/g, "");
          setHistory((prev) => [...prev, echoText]);
        } else if (trimmedLine === "pwd") {
          setHistory((prev) => [...prev, currentPath]);
        } else if (trimmedLine === "whoami") {
          setHistory((prev) => [...prev, "user"]);
        } else if (trimmedLine === "date") {
          setHistory((prev) => [...prev, new Date().toString()]);
        } else if (trimmedLine.startsWith("ls")) {
          const lsDir = getCurrentDirectory(currentPath);
          if (lsDir && lsDir.children) {
            const items = Object.values(lsDir.children).map((item) => {
              const itemName = item.name || "unnamed";
              return item.type === "directory" ? `${itemName}/` : itemName;
            });
            setHistory((prev) => [...prev, items.join("  ")]);
          }
        } else if (trimmedLine.startsWith("mkdir ")) {
          const dirName = trimmedLine.substring(6);
          createDirectory(currentPath, dirName);
          setHistory((prev) => [...prev, `Directory '${dirName}' created`]);
        } else if (trimmedLine.startsWith("touch ")) {
          const fileName = trimmedLine.substring(6);
          createFile(currentPath, fileName, "");
          setHistory((prev) => [...prev, `File '${fileName}' created`]);
        } else if (trimmedLine === "uname") {
          setHistory((prev) => [...prev, "Linux"]);
        } else if (trimmedLine.startsWith("sleep ")) {
          const seconds = parseInt(trimmedLine.substring(6));
          setHistory((prev) => [...prev, `Sleeping for ${seconds} seconds...`]);
          // Note: Real sleep would pause execution, here we just show the message
        } else if (trimmedLine) {
          // Try to execute as a command
          setHistory((prev) => [
            ...prev,
            `${trimmedLine}: command not found in script`,
          ]);
        }

        // Add completion message after last command
        if (index === lines.length - 1) {
          setTimeout(() => {
            setHistory((prev) => [
              ...prev,
              `Script ${scriptName} completed.`,
              "",
            ]);
          }, 100);
        }
      }, index * 200); // Stagger execution to simulate real script timing
    });

    if (lines.length === 0) {
      setHistory((prev) => [
        ...prev,
        `Script ${scriptName} completed (no commands executed).`,
        "",
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue.trim()) {
        // Add to command history
        setCommandHistory((prev) => [...prev, inputValue.trim()]);
        setHistoryIndex(-1);
        executeCommand(inputValue);
      }
      setInputValue("");
      setIsTabbing(false);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputValue("");
        } else {
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const completions = getAutoCompletions(inputValue);

      if (completions.length === 1) {
        // Single completion - complete it
        const parts = inputValue.split(" ");
        parts[parts.length - 1] = completions[0];
        setInputValue(parts.join(" "));
        setIsTabbing(false);
      } else if (completions.length > 1) {
        // Multiple completions - show them
        if (!isTabbing) {
          setIsTabbing(true);
          // Show first tab - find common prefix
          const commonPrefix = completions.reduce((prefix, completion) => {
            let i = 0;
            while (
              i < prefix.length &&
              i < completion.length &&
              prefix[i] === completion[i]
            ) {
              i++;
            }
            return prefix.substring(0, i);
          });

          if (commonPrefix.length > inputValue.split(" ").pop()!.length) {
            const parts = inputValue.split(" ");
            parts[parts.length - 1] = commonPrefix;
            setInputValue(parts.join(" "));
          }
        } else {
          // Show all completions
          const prompt = `user@linux:${currentPath}$ ${inputValue}`;
          setHistory((prev) => [...prev, prompt, completions.join("  "), ""]);
          setIsTabbing(false);
        }
      }
    } else {
      setIsTabbing(false);
    }
  };

  const handleNanoKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "o") {
      e.preventDefault();
      saveNanoFile();
    } else if (e.ctrlKey && e.key === "x") {
      e.preventDefault();
      closeNano();
    }
  };

  // Auto-scroll to bottom and focus input
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
    if (inputRef.current && !nanoState.isOpen) {
      inputRef.current.focus();
    }
    if (nanoRef.current && nanoState.isOpen) {
      nanoRef.current.focus();
    }
  }, [history, nanoState.isOpen]);

  const availableCommands = [
    "help",
    "ls",
    "cd",
    "pwd",
    "cat",
    "echo",
    "clear",
    "date",
    "whoami",
    "uname",
    "mkdir",
    "touch",
    "nano",
    "editor",
    "gedit",
    "bash",
    "sh",
    "chmod",
    "rm",
    "rmdir",
  ];

  const getAutoCompletions = (input: string) => {
    const parts = input.split(" ");
    const lastPart = parts[parts.length - 1];

    if (parts.length === 1) {
      // Complete command names
      return availableCommands.filter((cmd) => cmd.startsWith(lastPart));
    } else {
      // Complete file/directory names
      const currentDir = getCurrentDirectory(currentPath);
      if (currentDir && currentDir.children) {
        const files = Object.keys(currentDir.children).filter((name) =>
          name.startsWith(lastPart)
        );
        return files;
      }
    }
    return [];
  };

  if (nanoState.isOpen) {
    return (
      <div
        className="h-full font-mono text-sm flex flex-col"
        style={{
          background:
            "linear-gradient(135deg, var(--window-bg), var(--taskbar-hover))",
          color: "var(--color-emerald-400)",
        }}
      >
        <div
          className="p-2 text-xs border-b"
          style={{
            color: "var(--taskbar-text)",
            borderColor: "var(--window-border)",
            backgroundColor: "var(--taskbar-bg)",
          }}
        >
          GNU nano 4.8 - {nanoState.filename}{" "}
          {nanoState.isNew ? "(New File)" : "(Modified)"}
        </div>

        <textarea
          ref={nanoRef}
          value={nanoState.content}
          onChange={(e) =>
            setNanoState((prev) => ({ ...prev, content: e.target.value }))
          }
          onKeyDown={handleNanoKeyDown}
          className="flex-1 p-2 bg-transparent outline-none resize-none"
          style={{
            color: "var(--color-emerald-400)",
            backgroundColor: "var(--taskbar-hover)",
          }}
          placeholder="Enter your text here..."
        />

        <div
          className="p-2 text-xs border-t"
          style={{
            color: "var(--taskbar-text)",
            borderColor: "var(--window-border)",
            backgroundColor: "var(--taskbar-bg)",
          }}
        >
          ^O Write Out ^X Exit ^G Get Help ^J Justify ^W Where Is ^K Cut Text ^U
          Paste Text
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full font-mono text-sm flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, var(--window-bg), var(--taskbar-hover))",
        color: "var(--color-emerald-400)",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        className="p-4 font-semibold border-b"
        style={{
          color: "var(--taskbar-text)",
          borderColor: "var(--window-border)",
        }}
      >
        🖥️ Linux Terminal Emulator
      </div>

      <div
        ref={historyRef}
        className="flex-1 p-4 overflow-y-auto"
        style={{
          backgroundColor: "var(--taskbar-hover)",
        }}
      >
        <div className="space-y-1">
          {history.map((line, index) => (
            <div key={index} className="leading-relaxed whitespace-pre-wrap">
              {line.includes("user@linux:") ? (
                <span style={{ color: "var(--color-blue-400)" }}>{line}</span>
              ) : (
                <span style={{ color: "var(--taskbar-text)" }}>{line}</span>
              )}
            </div>
          ))}

          <div className="flex items-center">
            <span
              className="font-medium mr-2"
              style={{ color: "var(--color-blue-400)" }}
            >
              user@linux:{currentPath}$
            </span>
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none"
              style={{ color: "var(--color-emerald-400)" }}
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
