import { useState, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Home,
  Globe,
  Lock,
  Star,
  Menu,
  Plus,
  X,
} from "lucide-react";
import HairetsuCom from "../HairetsuWebSite/HairetsuCom";

interface BrowserAppProps {
  initialUrl?: string;
}

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

export function BrowserApp({
  initialUrl = "https://hairetsu.com",
}: BrowserAppProps) {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "1", title: "Hairetsu", url: initialUrl, favicon: "🌟" },
  ]);
  const [activeTabId, setActiveTabId] = useState("1");
  const [urlInput, setUrlInput] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    let url = urlInput.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    setIsLoading(true);
    updateActiveTab({ url, title: "Loading..." });

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      updateActiveTab({ title: new URL(url).hostname });
    }, 1000);
  };

  const updateActiveTab = (updates: Partial<Tab>) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === activeTabId ? { ...tab, ...updates } : tab))
    );
  };

  const createNewTab = () => {
    const newId = (tabs.length + 1).toString();
    const newTab: Tab = {
      id: newId,
      title: "New Tab",
      url: "https://hairetsu.com",
      favicon: "🌟",
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
    setUrlInput("https://hairetsu.com");
  };

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) return; // Don't close the last tab

    setTabs((prev) => prev.filter((tab) => tab.id !== tabId));
    if (activeTabId === tabId) {
      const remainingTabs = tabs.filter((tab) => tab.id !== tabId);
      setActiveTabId(remainingTabs[0]?.id || "1");
    }
  };

  const goHome = () => {
    setUrlInput("https://hairetsu.com");
    updateActiveTab({
      url: "https://hairetsu.com",
      title: "Hairetsu",
      favicon: "🌟",
    });
  };

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (iframeRef.current) {
        iframeRef.current.src = iframeRef.current.src;
      }
    }, 500);
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--window-bg), var(--taskbar-hover))",
        color: "var(--taskbar-text)",
        minWidth: "0",
        minHeight: "0",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      {/* Tab Bar */}
      <div
        className="flex items-center border-b flex-shrink-0"
        style={{
          backgroundColor: "var(--taskbar-bg)",
          borderColor: "var(--window-border)",
          height: "auto",
        }}
      >
        <div className="flex-1 flex items-center overflow-hidden">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 max-w-32 sm:max-w-48 cursor-pointer transition-colors ${
                activeTabId === tab.id ? "bg-opacity-100" : "bg-opacity-50"
              }`}
              style={{
                backgroundColor:
                  activeTabId === tab.id
                    ? "var(--window-bg)"
                    : "var(--taskbar-hover)",
                borderRight: `1px solid var(--window-border)`,
                minWidth: "0",
              }}
              onClick={() => setActiveTabId(tab.id)}
            >
              <span className="text-xs sm:text-sm">{tab.favicon || "🌐"}</span>
              <span className="text-xs sm:text-sm truncate flex-1">
                {tab.title}
              </span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  className="p-1 hover:bg-red-500 hover:text-white rounded"
                >
                  <X size={10} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={createNewTab}
          className="p-2 hover:opacity-80 transition-opacity"
          style={{ color: "var(--taskbar-text)" }}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Navigation Bar */}
      <div
        className="flex items-center gap-1 sm:gap-2 p-2 sm:p-3 border-b flex-shrink-0"
        style={{
          backgroundColor: "var(--taskbar-bg)",
          borderColor: "var(--window-border)",
          height: "auto",
          minWidth: "0",
        }}
      >
        <div className="flex items-center gap-1">
          <button
            className="p-1 sm:p-2 rounded hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "var(--taskbar-hover)" }}
            title="Back"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            className="p-1 sm:p-2 rounded hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "var(--taskbar-hover)" }}
            title="Forward"
          >
            <ArrowRight size={14} />
          </button>
          <button
            onClick={refresh}
            className="p-1 sm:p-2 rounded hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "var(--taskbar-hover)" }}
            title="Refresh"
          >
            <RotateCcw size={14} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={goHome}
            className="p-1 sm:p-2 rounded hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "var(--taskbar-hover)" }}
            title="Home"
          >
            <Home size={14} />
          </button>
        </div>

        {/* URL Bar */}
        <form onSubmit={handleUrlSubmit} className="flex-1 min-w-0">
          <div
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg"
            style={{ backgroundColor: "var(--window-bg)", minWidth: "0" }}
          >
            <Lock size={12} style={{ color: "var(--color-green-500)" }} />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 bg-transparent text-xs sm:text-sm focus:outline-none min-w-0"
              style={{ color: "var(--taskbar-text)" }}
              placeholder="Enter URL..."
            />
            <Globe
              size={12}
              style={{ color: "var(--taskbar-text)", opacity: 0.5 }}
            />
          </div>
        </form>

        <div className="flex items-center gap-1">
          <button
            className="p-1 sm:p-2 rounded hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "var(--taskbar-hover)" }}
            title="Bookmark"
          >
            <Star size={14} />
          </button>
          <button
            className="p-1 sm:p-2 rounded hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "var(--taskbar-hover)" }}
            title="Menu"
          >
            <Menu size={14} />
          </button>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative overflow-hidden">
        {activeTab && (
          <>
            {activeTab.url === "https://hairetsu.com" ? (
              <div
                className="w-full h-full overflow-auto"
                style={{
                  minWidth: "0",
                  width: "100%",
                  height: "100%",
                }}
              >
                <HairetsuCom />
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={activeTab.url}
                className="w-full h-full border-0 block"
                title={activeTab.title}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <RotateCcw
                size={20}
                className="animate-spin"
                style={{ color: "var(--color-blue-500)" }}
              />
              <span style={{ color: "var(--color-gray-600)" }}>Loading...</span>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div
        className="px-2 sm:px-4 py-1 sm:py-2 text-xs border-t flex-shrink-0"
        style={{
          backgroundColor: "var(--taskbar-bg)",
          borderColor: "var(--window-border)",
          opacity: 0.8,
          height: "auto",
          minWidth: "0",
        }}
      >
        <div className="flex items-center justify-between min-w-0">
          <span className="truncate flex-1 pr-2">
            {activeTab ? `${activeTab.title} - ${activeTab.url}` : "Ready"}
          </span>
          <div className="hidden sm:flex items-center gap-4">
            <span>🔒 Secure</span>
            <span>✨ Hairetsu Browser</span>
          </div>
        </div>
      </div>
    </div>
  );
}
