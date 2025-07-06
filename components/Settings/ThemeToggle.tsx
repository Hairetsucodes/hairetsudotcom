"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <input
      type="checkbox"
      checked={isDark}
      onChange={toggleTheme}
      className="w-5 h-5 rounded focus:ring-2"
      style={{
        backgroundColor: "var(--taskbar-hover)",
        borderColor: "var(--window-border)",
        color: "var(--button-start)",
      }}
    />
  );
}
