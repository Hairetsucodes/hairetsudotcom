import React from "react";

interface FooterProps {
  isMobile: boolean;
}

export default function Footer({ isMobile }: FooterProps) {
  return (
    <footer
      className={`${isMobile ? "px-4 py-4" : "px-8 py-6"}`}
      style={{
        borderTop: `1px solid var(--window-border)`,
      }}
    >
      <div
        className={`flex ${
          isMobile ? "flex-col gap-4" : "flex-row gap-0"
        } justify-between items-center`}
      >
        <p
          className={`${
            isMobile ? "text-xs text-center" : "text-sm text-left"
          }`}
          style={{
            color: "var(--taskbar-text)",
            opacity: 0.5,
          }}
        >
          © 2025 Hairetsu.com
        </p>
        <div className={`flex items-center ${isMobile ? "gap-4" : "gap-6"}`}>
          <a
            href="https://www.instagram.com/hairetsu/"
            className={`${isMobile ? "text-xs" : "text-sm"} transition-colors`}
            style={{
              color: "var(--taskbar-text)",
              opacity: 0.5,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.color = "var(--color-purple-400)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.5";
              e.currentTarget.style.color = "var(--taskbar-text)";
            }}
          >
            ↗ Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
