import React from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  isMobile: boolean;
  isDesktop: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Navigation({
  isMobile,
  isDesktop,
  menuOpen,
  setMenuOpen,
}: NavigationProps) {
  return (
    <>
      {/* Navigation */}
      <nav
        className={`flex items-center justify-between ${
          isMobile ? "p-3" : "py-2 px-8"
        }`}
        style={{
          borderBottom: `1px solid var(--window-border)`,
        }}
      >
        <div
          className={`${isMobile ? "text-base" : "text-lg"} font-medium`}
          style={{ color: "var(--taskbar-text)" }}
        >
          hairetsu.com
        </div>

        {/* Desktop Menu */}
        {isDesktop && (
          <div className="flex items-center space-x-8">
            <a
              href="#about"
              className="text-sm transition-colors"
              style={{ color: "var(--taskbar-text)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-purple-400)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--taskbar-text)";
              }}
            >
              About Me
            </a>
            <a
              href="#portfolio"
              className="text-sm transition-colors"
              style={{ color: "var(--taskbar-text)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-purple-400)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--taskbar-text)";
              }}
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="text-sm transition-colors"
              style={{ color: "var(--taskbar-text)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-purple-400)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--taskbar-text)";
              }}
            >
              Contact
            </a>
          </div>
        )}

        {/* Mobile Menu Button */}
        {!isDesktop && (
          <button
            className="p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "var(--taskbar-text)" }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      {menuOpen && !isDesktop && (
        <div
          className="border-b"
          style={{
            backgroundColor: "var(--taskbar-hover)",
            borderColor: "var(--window-border)",
          }}
        >
          <div
            className={`flex flex-col space-y-4 ${isMobile ? "p-4" : "p-6"}`}
          >
            <a
              href="#about"
              className="text-sm"
              onClick={() => setMenuOpen(false)}
            >
              About Me
            </a>
            <a
              href="#portfolio"
              className="text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </>
  );
}
