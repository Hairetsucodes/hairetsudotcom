import React from "react";
import { Mail } from "lucide-react";

interface ContactSectionProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function ContactSection({
  isMobile,
  isTablet,
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      className={`${
        isMobile ? "px-4 py-8" : isTablet ? "px-6 py-12" : "px-8 py-16"
      }`}
      style={{
        borderTop: `1px solid var(--window-border)`,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`${
            isMobile
              ? "text-xl mb-4 text-center"
              : isTablet
              ? "text-2xl mb-5 text-center"
              : "text-3xl mb-6 text-left"
          } font-light`}
          style={{ color: "var(--taskbar-text)" }}
        >
          Let&apos;s work together
        </h2>
        <div className={`max-w-2xl ${isMobile ? "mb-6" : "mb-8"}`}>
          <p
            className={`${
              isMobile ? "text-sm text-center" : "text-base text-left"
            } leading-relaxed`}
            style={{
              color: "var(--taskbar-text)",
              opacity: 0.8,
            }}
          >
            Ready to bring your vision to life? I&apos;d love to hear about your
            project and explore how I can help.
          </p>
        </div>

        <div
          className={`flex ${
            isMobile || isTablet
              ? "flex-col gap-3 justify-center"
              : "flex-row gap-4 justify-start"
          }`}
        >
          <a
            href="mailto:hairetsu@hairetsu.com"
            className={`flex items-center justify-center gap-3 ${
              isMobile ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"
            } font-medium transition-all duration-300 hover:scale-105`}
            style={{
              backgroundColor: "var(--color-purple-600)",
              color: "white",
              textDecoration: "none",
              minWidth: "0",
              whiteSpace: "nowrap",
            }}
          >
            <Mail size={isMobile ? 14 : 16} />
            hairetsu@hairetsu.com
          </a>
        </div>
      </div>
    </section>
  );
}
