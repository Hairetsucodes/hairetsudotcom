import { ModeToggle } from "./ThemeToggle";

export function SettingsApp() {
  return (
    <div
      className="p-6 h-full"
      style={{
        backgroundColor: "var(--window-bg)",
        color: "var(--taskbar-text)",
      }}
    >
      <div
        className="mb-6 pb-4"
        style={{
          borderBottom: "1px solid var(--window-border)",
        }}
      >
        <div className="text-xl font-semibold flex items-center gap-2">
          ⚙️ System Settings
        </div>
      </div>
      <div className="space-y-6">
        <div
          className="rounded-xl p-6 backdrop-blur-sm"
          style={{
            backgroundColor: "var(--taskbar-hover)",
            border: "1px solid var(--window-border)",
          }}
        >
          <h3 className="font-semibold mb-4 text-lg">Display</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <ModeToggle />
              <span className="group-hover:opacity-80 transition-opacity">
                Dark theme
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded focus:ring-2"
                style={{
                  backgroundColor: "var(--taskbar-hover)",
                  borderColor: "var(--window-border)",
                  color: "var(--button-start)",
                }}
              />
              <span className="group-hover:opacity-80 transition-opacity">
                Show desktop icons
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 rounded focus:ring-2"
                style={{
                  backgroundColor: "var(--taskbar-hover)",
                  borderColor: "var(--window-border)",
                  color: "var(--button-start)",
                }}
              />
              <span className="group-hover:opacity-80 transition-opacity">
                Show taskbar labels
              </span>
            </label>
          </div>
        </div>
        <div
          className="rounded-xl p-6 backdrop-blur-sm"
          style={{
            backgroundColor: "var(--taskbar-hover)",
            border: "1px solid var(--window-border)",
          }}
        >
          <h3 className="font-semibold mb-4 text-lg">System</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span style={{ color: "var(--muted-foreground)" }}>Version:</span>
              <span className="font-medium">Linux Desktop 1.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: "var(--muted-foreground)" }}>Memory:</span>
              <span className="font-medium">8.0 GB</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: "var(--muted-foreground)" }}>
                Processor:
              </span>
              <span className="font-medium">Web Browser CPU</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
