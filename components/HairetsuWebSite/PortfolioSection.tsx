import React from "react";

interface PortfolioSectionProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function PortfolioSection({
  isMobile,
  isTablet,
}: PortfolioSectionProps) {
  return (
    <section
      id="portfolio"
      className={`${
        isMobile ? "px-4 py-8" : isTablet ? "px-6 py-12" : "px-8 py-16"
      } border-t`}
      style={{
        borderColor: "var(--window-border)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`${
            isMobile
              ? "text-xl mb-6 text-center"
              : isTablet
              ? "text-2xl mb-7 text-center"
              : "text-3xl mb-8 text-left"
          } font-light`}
          style={{ color: "var(--taskbar-text)" }}
        >
          Featured Projects
        </h2>
        <div
          className={`grid ${
            isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-3"
          } ${isMobile ? "gap-4" : "gap-6"}`}
        >
          {/* Notate */}
          <div
            className="p-4 sm:p-6 rounded-lg border transition-all duration-200 hover:shadow-sm"
            style={{
              backgroundColor: "var(--window-bg)",
              borderColor: "var(--window-border)",
            }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <a
                href="https://notate.hairetsu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-medium transition-colors hover:underline"
                style={{
                  color: "var(--taskbar-text)",
                }}
              >
                Notate
              </a>
              <a
                href="https://notate.hairetsu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-2 py-1 rounded transition-all duration-200 hover:opacity-70"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.7,
                }}
              >
                →
              </a>
            </div>
            <p
              className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
              style={{
                color: "var(--taskbar-text)",
                opacity: 0.7,
              }}
            >
              A powerful cross-platform AI research assistant built for privacy
              and performance. Analyze documents, webpages, and videos while
              keeping your data under your control.
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                Python
              </span>
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                TypeScript
              </span>
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                Electron
              </span>
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                SQLite
              </span>
            </div>
          </div>

          {/* Decipher */}

          {/* Hiring.fm */}
          <div
            className="p-4 sm:p-6 rounded-lg border transition-all duration-200 hover:shadow-sm"
            style={{
              backgroundColor: "var(--window-bg)",
              borderColor: "var(--window-border)",
            }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <a
                href="https://hiring.fm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-medium transition-colors hover:underline"
                style={{
                  color: "var(--taskbar-text)",
                }}
              >
                Hiring.fm
              </a>
              <a
                href="https://hiring.fm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-2 py-1 rounded transition-all duration-200 hover:opacity-70"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.7,
                }}
              >
                →
              </a>
            </div>
            <p
              className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
              style={{
                color: "var(--taskbar-text)",
                opacity: 0.7,
              }}
            >
              A comprehensive job search platform connecting job seekers with
              employers. Features 5.4M+ opportunities, user profiles, and resume
              tools to streamline career journeys.
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                Next.js
              </span>
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                MySQL
              </span>
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                Python
              </span>
            </div>
          </div>

          {/* Not T3 Chat */}
          <div
            className="p-4 sm:p-6 rounded-lg border transition-all duration-200 hover:shadow-sm"
            style={{
              backgroundColor: "var(--window-bg)",
              borderColor: "var(--window-border)",
            }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <a
                href="https://github.com/Hairetsucodes/NOT-T3-Chat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-medium transition-colors hover:underline"
                style={{
                  color: "var(--taskbar-text)",
                }}
              >
                Not T3 Chat
              </a>
              <a
                href="https://github.com/Hairetsucodes/NOT-T3-Chat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-2 py-1 rounded transition-all duration-200 hover:opacity-70"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.7,
                }}
              >
                →
              </a>
            </div>
            <p
              className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
              style={{
                color: "var(--taskbar-text)",
                opacity: 0.7,
              }}
            >
              An open-source T3.Chat clone built for their cloneathon. Features
              multiple AI providers, conversation branching, and retry
              functionality with a modern Next.js 15 architecture.
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                Next.js 15
              </span>
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                TypeScript
              </span>
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                Prisma
              </span>
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                Multiple AI
              </span>
            </div>
          </div>

          {/* Hairetsu.com */}
          <div
            className="p-4 sm:p-6 rounded-lg border transition-all duration-200 hover:shadow-sm"
            style={{
              backgroundColor: "var(--window-bg)",
              borderColor: "var(--window-border)",
            }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <a
                href="https://github.com/Hairetsucodes/hairetsudotcom"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-medium transition-colors hover:underline"
                style={{
                  color: "var(--taskbar-text)",
                }}
              >
                Hairetsu.com
              </a>
              <a
                href="https://github.com/Hairetsucodes/hairetsudotcom"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-2 py-1 rounded transition-all duration-200 hover:opacity-70"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.7,
                }}
              >
                →
              </a>
            </div>
            <p
              className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
              style={{
                color: "var(--taskbar-text)",
                opacity: 0.7,
              }}
            >
              A fully open-source web portfolio showcasing projects and skills.
              Built with modern React patterns, responsive design, and a unique
              desktop-style interface for an engaging user experience.
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                Next.js
              </span>
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                TypeScript
              </span>
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                React
              </span>
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "var(--taskbar-text)",
                  color: "var(--window-bg)",
                  opacity: 0.8,
                }}
              >
                Open Source
              </span>
            </div>
          </div>

          {/* Vocals.dev */}
          <div
            className="p-4 sm:p-6 rounded-lg border relative transition-all duration-200 hover:shadow-sm"
            style={{
              backgroundColor: "var(--window-bg)",
              borderColor: "var(--window-border)",
            }}
          >
            <div className="absolute top-3 left-0 right-0 flex justify-center">
              <span
                className="text-xs px-3 py-1 rounded-full border backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(255, 165, 0, 0.15)",
                  borderColor: "rgba(255, 165, 0, 0.3)",
                  color: "var(--taskbar-text)",
                  fontSize: "0.65rem",
                  fontWeight: "500",
                  opacity: 0.9,
                }}
              >
                Under Development
              </span>
            </div>
            <div className="pt-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <a
                  href="https://www.vocals.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg font-medium transition-colors hover:underline"
                  style={{
                    color: "var(--taskbar-text)",
                  }}
                >
                  Vocals.dev
                </a>
                <a
                  href="https://www.vocals.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 rounded transition-all duration-200 hover:opacity-70"
                  style={{
                    backgroundColor: "var(--taskbar-text)",
                    color: "var(--window-bg)",
                    opacity: 0.7,
                  }}
                >
                  →
                </a>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
                style={{
                  color: "var(--taskbar-text)",
                  opacity: 0.7,
                }}
              >
                Voice AI platform for developers. Build custom voice chatbots
                and interactive applications in minutes with SDK kits and
                developer-focused tools. Currently in closed beta.
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--taskbar-text)",
                    color: "var(--window-bg)",
                    opacity: 0.8,
                  }}
                >
                  Voice AI
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--taskbar-text)",
                    color: "var(--window-bg)",
                    opacity: 0.8,
                  }}
                >
                  SDK
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--taskbar-text)",
                    color: "var(--window-bg)",
                    opacity: 0.8,
                  }}
                >
                  Speech-to-Text
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--taskbar-text)",
                    color: "var(--window-bg)",
                    opacity: 0.8,
                  }}
                >
                  Text-to-Speech
                </span>
              </div>
            </div>
          </div>
          <div
            className="p-4 sm:p-6 rounded-lg border relative transition-all duration-200 hover:shadow-sm"
            style={{
              backgroundColor: "var(--window-bg)",
              borderColor: "var(--window-border)",
            }}
          >
            <div className="absolute top-3 left-0 right-0 flex justify-center">
              <span
                className="text-xs px-3 py-1 rounded-full border backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(255, 165, 0, 0.15)",
                  borderColor: "rgba(255, 165, 0, 0.3)",
                  color: "var(--taskbar-text)",
                  fontSize: "0.65rem",
                  fontWeight: "500",
                  opacity: 0.9,
                }}
              >
                Under Development
              </span>
            </div>
            <div className="pt-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <a
                  href="https://decipher.hairetsu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg font-medium transition-colors hover:underline"
                  style={{
                    color: "var(--taskbar-text)",
                  }}
                >
                  Decipher
                </a>
                <a
                  href="https://decipher.hairetsu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 rounded transition-all duration-200 hover:opacity-70"
                  style={{
                    backgroundColor: "var(--taskbar-text)",
                    color: "var(--window-bg)",
                    opacity: 0.7,
                  }}
                >
                  →
                </a>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
                style={{
                  color: "var(--taskbar-text)",
                  opacity: 0.7,
                }}
              >
                A robust server-side tool protecting high-traffic applications
                from fraud and spam. Features real-time monitoring and custom ML
                models, handling millions of daily requests.
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--taskbar-text)",
                    color: "var(--window-bg)",
                    opacity: 0.8,
                  }}
                >
                  Python
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--taskbar-text)",
                    color: "var(--window-bg)",
                    opacity: 0.8,
                  }}
                >
                  Next.js
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--taskbar-text)",
                    color: "var(--window-bg)",
                    opacity: 0.8,
                  }}
                >
                  Elixir
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--taskbar-text)",
                    color: "var(--window-bg)",
                    opacity: 0.8,
                  }}
                >
                  MySQL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
