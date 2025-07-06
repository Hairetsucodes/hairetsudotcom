import { DesktopIcon } from "./types";

export function DesktopIconComponent({
  icon,
  onDoubleClick,
}: {
  icon: DesktopIcon;
  onDoubleClick: () => void;
}) {
  const IconComponent = icon.icon;
  return (
    <div
      className="flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer group w-24 transition-all duration-200 hover:scale-105"
      style={{
        backgroundColor: "var(--desktop-overlay-start)",
        backdropFilter: "blur(8px)",
      }}
      onDoubleClick={onDoubleClick}
    >
      <div
        className="p-3 rounded-xl transition-all duration-200 shadow-lg backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(135deg, var(--taskbar-hover), var(--window-bg))",
          border: "1px solid var(--window-border)",
          color: "var(--taskbar-text)",
        }}
      >
        <IconComponent size={32} className="text-inherit" />
      </div>
      <span
        className="text-xs text-center leading-tight px-2 py-1 rounded-lg font-medium transition-all duration-200 group-hover:scale-105"
        style={{
          color: "var(--taskbar-text)",
          backgroundColor: "var(--taskbar-hover)",
        }}
      >
        {icon.label}
      </span>
    </div>
  );
}
