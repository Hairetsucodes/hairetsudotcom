import React, { useState, useEffect, useRef } from "react";
import { Mail, Menu, X } from "lucide-react";
import Image from "next/image";

export default function HairetsuCom() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1024);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };

    // Initial measurement with a slight delay to ensure DOM is ready
    const timer = setTimeout(() => {
      updateWidth();
    }, 100);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setContainerWidth(width);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, []);

  // Container-based responsive breakpoints
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 768;
  const isDesktop = containerWidth >= 768;

  return (
    <div
      ref={containerRef}
      className="min-h-screen overflow-auto font-light"
      style={{
        background: "var(--window-bg)",
        color: "var(--taskbar-text)",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        maxWidth: "100%",
        overflowX: "hidden",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
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

      {/* Hero Section */}
      <section
        className={`${
          isMobile ? "px-4 py-8" : isTablet ? "px-6 py-12" : "px-8 py-16"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`grid ${isDesktop ? "grid-cols-2" : "grid-cols-1"} ${
              isMobile ? "gap-6" : isTablet ? "gap-8" : "gap-12"
            } items-center`}
          >
            {/* Text Content */}
            <div
              className={`${
                isMobile ? "order-2" : isDesktop ? "order-1" : "order-2"
              } ${isMobile || isTablet ? "text-center" : "text-left"}`}
            >
              <p
                className={`${
                  isMobile ? "text-xs mb-4" : "text-sm mb-6"
                } tracking-wide`}
                style={{
                  color: "var(--taskbar-text)",
                  opacity: 0.6,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Washington DC
              </p>

              <h1
                className={`${
                  isMobile
                    ? "text-3xl mb-4"
                    : isTablet
                    ? "text-4xl mb-5"
                    : "text-6xl mb-6"
                } font-light leading-tight`}
              >
                <span
                  className="font-medium"
                  style={{ color: "var(--color-purple-400)" }}
                >
                  Thomas Whidden
                </span>
              </h1>

              <div className={isMobile ? "mb-6" : "mb-8"}>
                <p
                  className={`${
                    isMobile
                      ? "text-lg mb-3"
                      : isTablet
                      ? "text-xl mb-4"
                      : "text-2xl mb-4"
                  } font-light leading-relaxed`}
                  style={{
                    color: "var(--taskbar-text)",
                    opacity: 0.8,
                  }}
                >
                  ML Engineer / Full Stack Developer / Web Security
                </p>
                <p
                  className={`${
                    isMobile ? "text-sm" : "text-base"
                  } font-light leading-relaxed`}
                  style={{
                    color: "var(--taskbar-text)",
                    opacity: 0.7,
                  }}
                >
                  With over 20 years in the industry, my journey began in
                  hacking and exploiting web vulnerabilities and APIs. This
                  foundation evolved into full stack development, and now
                  encompassing Machine Learning and AI.
                </p>
              </div>

              <div
                className={`flex ${
                  isMobile
                    ? "flex-col gap-3 justify-center"
                    : isTablet
                    ? "flex-row gap-4 justify-center"
                    : "flex-row gap-4 justify-start"
                }`}
              >
                <button
                  className={`group flex items-center justify-center gap-3 ${
                    isMobile ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"
                  } font-medium transition-all duration-300 hover:scale-105`}
                  style={{
                    backgroundColor: "var(--color-purple-600)",
                    color: "white",
                    border: "none",
                    minWidth: "0",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                    flex: "1 1 auto",
                  }}
                  onClick={() =>
                    document
                      .getElementById("portfolio")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  → View My Projects
                </button>
                <button
                  className={`flex items-center justify-center gap-3 ${
                    isMobile ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"
                  } font-medium transition-all duration-300 hover:scale-105`}
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--taskbar-text)",
                    border: `1px solid var(--window-border)`,
                    minWidth: "0",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                    flex: "1 1 auto",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--taskbar-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  → Contact Me
                </button>
              </div>
            </div>

            {/* Profile Image */}
            <div
              className={`${
                isMobile ? "order-1" : isDesktop ? "order-2" : "order-1"
              } flex justify-center`}
            >
              <div className="relative">
                <Image
                  src="/image3.jpeg"
                  alt="Thomas Whidden"
                  className={`${
                    isMobile
                      ? "w-48 h-48"
                      : isTablet
                      ? "w-48 h-48"
                      : "w-64 h-64"
                  } rounded-full border-2 border-gray-200 object-cover shadow-lg`}
                  width={128}
                  height={128}
                  style={{
                    filter: "grayscale(20%)",
                    transition: "all 0.3s ease",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = "grayscale(0%)";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "grayscale(20%)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>
            </div>

            {/* Hairetsu.com */}
          </div>
        </div>
      </section>
      {/* Portfolio */}
      <section
        id="portfolio"
        className={`${
          isMobile ? "px-4 py-8" : isTablet ? "px-6 py-12" : "px-8 py-16"
        }`}
        style={{
          borderTop: `1px solid var(--window-border)`,
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
              isMobile
                ? "grid-cols-1"
                : isTablet
                ? "grid-cols-2"
                : "grid-cols-3"
            } ${isMobile ? "gap-4" : "gap-6"}`}
          >
            {/* Notate */}
            <div
              className="p-4 sm:p-6 rounded-lg border"
              style={{
                backgroundColor: "var(--taskbar-hover)",
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
                    color: "var(--color-purple-400)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-purple-300)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-purple-400)";
                  }}
                >
                  Notate
                </a>
                <a
                  href="https://notate.hairetsu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 rounded transition-colors"
                  style={{
                    backgroundColor: "var(--color-purple-600)",
                    color: "white",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-purple-700)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-purple-600)";
                  }}
                >
                  →
                </a>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
                style={{
                  color: "var(--taskbar-text)",
                  opacity: 0.8,
                }}
              >
                A powerful cross-platform AI research assistant built for
                privacy and performance. Analyze documents, webpages, and videos
                while keeping your data under your control.
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-purple-600)",
                    color: "white",
                  }}
                >
                  Python
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-blue-600)",
                    color: "white",
                  }}
                >
                  TypeScript
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-pink-600)",
                    color: "white",
                  }}
                >
                  Electron
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-green-600)",
                    color: "white",
                  }}
                >
                  SQLite
                </span>
              </div>
            </div>

            {/* Decipher */}
            <div
              className="p-4 sm:p-6 rounded-lg border relative"
              style={{
                backgroundColor: "var(--taskbar-hover)",
                borderColor: "var(--window-border)",
              }}
            >
              <div className="absolute top-2 left-0 right-0 flex justify-center">
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: "var(--taskbar-text)",
                    color: "var(--window-bg)",
                    fontSize: "0.6rem",
                    opacity: 0.7,
                  }}
                >
                  Under Development
                </span>
              </div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <a
                  href="https://decipher.hairetsu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg font-medium transition-colors hover:underline"
                  style={{
                    color: "var(--color-blue-400)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-blue-300)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-blue-400)";
                  }}
                >
                  Decipher
                </a>
                <a
                  href="https://decipher.hairetsu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 rounded transition-colors"
                  style={{
                    backgroundColor: "var(--color-blue-600)",
                    color: "white",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-blue-700)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-blue-600)";
                  }}
                >
                  →
                </a>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
                style={{
                  color: "var(--taskbar-text)",
                  opacity: 0.8,
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
                    backgroundColor: "var(--color-purple-600)",
                    color: "white",
                  }}
                >
                  Python
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-blue-600)",
                    color: "white",
                  }}
                >
                  Next.js
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-pink-600)",
                    color: "white",
                  }}
                >
                  Elixir
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-green-600)",
                    color: "white",
                  }}
                >
                  MySQL
                </span>
              </div>
            </div>

            {/* Hiring.fm */}
            <div
              className="p-4 sm:p-6 rounded-lg border"
              style={{
                backgroundColor: "var(--taskbar-hover)",
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
                    color: "var(--color-pink-400)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-pink-300)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-pink-400)";
                  }}
                >
                  Hiring.fm
                </a>
                <a
                  href="https://hiring.fm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 rounded transition-colors"
                  style={{
                    backgroundColor: "var(--color-pink-600)",
                    color: "white",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-pink-700)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-pink-600)";
                  }}
                >
                  →
                </a>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
                style={{
                  color: "var(--taskbar-text)",
                  opacity: 0.8,
                }}
              >
                A comprehensive job search platform connecting job seekers with
                employers. Features 5.4M+ opportunities, user profiles, and
                resume tools to streamline career journeys.
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-blue-600)",
                    color: "white",
                  }}
                >
                  Next.js
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-green-600)",
                    color: "white",
                  }}
                >
                  MySQL
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-purple-600)",
                    color: "white",
                  }}
                >
                  Python
                </span>
              </div>
            </div>

            {/* Not T3 Chat */}
            <div
              className="p-4 sm:p-6 rounded-lg border"
              style={{
                backgroundColor: "var(--taskbar-hover)",
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
                    color: "var(--color-green-400)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-green-300)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-green-400)";
                  }}
                >
                  Not T3 Chat
                </a>
                <a
                  href="https://github.com/Hairetsucodes/NOT-T3-Chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 rounded transition-colors"
                  style={{
                    backgroundColor: "var(--color-green-600)",
                    color: "white",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-green-700)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-green-600)";
                  }}
                >
                  →
                </a>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
                style={{
                  color: "var(--taskbar-text)",
                  opacity: 0.8,
                }}
              >
                An open-source T3.Chat clone built for their cloneathon.
                Features multiple AI providers, conversation branching, and
                retry functionality with a modern Next.js 15 architecture.
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-blue-600)",
                    color: "white",
                  }}
                >
                  Next.js 15
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-blue-600)",
                    color: "white",
                  }}
                >
                  TypeScript
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-purple-600)",
                    color: "white",
                  }}
                >
                  Prisma
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-green-600)",
                    color: "white",
                  }}
                >
                  Multiple AI
                </span>
              </div>
            </div>
            <div
              className="p-4 sm:p-6 rounded-lg border"
              style={{
                backgroundColor: "var(--taskbar-hover)",
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
                    color: "var(--color-slate-400)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-slate-300)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-slate-400)";
                  }}
                >
                  Hairetsu.com
                </a>
                <a
                  href="https://github.com/Hairetsucodes/hairetsudotcom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 rounded transition-colors"
                  style={{
                    backgroundColor: "var(--color-slate-600)",
                    color: "white",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-slate-700)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-slate-600)";
                  }}
                >
                  →
                </a>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
                style={{
                  color: "var(--taskbar-text)",
                  opacity: 0.8,
                }}
              >
                A fully open-source web portfolio showcasing projects and
                skills. Built with modern React patterns, responsive design, and
                a unique desktop-style interface for an engaging user
                experience.
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-blue-600)",
                    color: "white",
                  }}
                >
                  Next.js
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-blue-600)",
                    color: "white",
                  }}
                >
                  TypeScript
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-purple-600)",
                    color: "white",
                  }}
                >
                  React
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-green-600)",
                    color: "white",
                  }}
                >
                  Open Source
                </span>
              </div>
            </div>
            {/* Vocals.dev */}
            <div
              className="p-4 sm:p-6 rounded-lg border relative"
              style={{
                backgroundColor: "var(--taskbar-hover)",
                borderColor: "var(--window-border)",
              }}
            >
              <div className="absolute top-2 left-0 right-0 flex justify-center">
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: "var(--taskbar-text)",
                    color: "var(--window-bg)",
                    fontSize: "0.6rem",
                    opacity: 0.7,
                  }}
                >
                  Under Development
                </span>
              </div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <a
                  href="https://www.vocals.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg font-medium transition-colors hover:underline"
                  style={{
                    color: "var(--color-orange-400)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-orange-300)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-orange-400)";
                  }}
                >
                  Vocals.dev
                </a>
                <a
                  href="https://www.vocals.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 rounded transition-colors"
                  style={{
                    backgroundColor: "var(--color-orange-600)",
                    color: "white",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-orange-700)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-orange-600)";
                  }}
                >
                  →
                </a>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
                style={{
                  color: "var(--taskbar-text)",
                  opacity: 0.8,
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
                    backgroundColor: "var(--color-orange-600)",
                    color: "white",
                  }}
                >
                  Voice AI
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-blue-600)",
                    color: "white",
                  }}
                >
                  SDK
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-purple-600)",
                    color: "white",
                  }}
                >
                  Speech-to-Text
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--color-green-600)",
                    color: "white",
                  }}
                >
                  Text-to-Speech
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
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
            About Me
          </h2>
          <div className="max-w-3xl">
            <p
              className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4"
              style={{
                color: "var(--taskbar-text)",
                opacity: 0.8,
              }}
            >
              With over 20 years in the industry, my journey began in hacking
              and exploiting web vulnerabilities and APIs. This foundation in
              cybersecurity gave me a unique perspective on building robust,
              secure systems from the ground up.
            </p>
            <p
              className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4"
              style={{
                color: "var(--taskbar-text)",
                opacity: 0.8,
              }}
            >
              This expertise evolved into full stack development, where
              I&apos;ve built everything from high-traffic fraud detection
              systems to comprehensive job search platforms. I&apos;m passionate
              about creating solutions that not only work well but can scale to
              handle millions of requests.
            </p>
            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{
                color: "var(--taskbar-text)",
                opacity: 0.8,
              }}
            >
              Today, I&apos;m focused on Machine Learning and AI, building tools
              like Notate that help researchers and analysts work more
              efficiently while maintaining privacy and data control. Every
              project is an opportunity to solve real problems with innovative
              technology.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
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
              Ready to bring your vision to life? I&apos;d love to hear about
              your project and explore how I can help.
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

      {/* Footer */}
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
              className={`${
                isMobile ? "text-xs" : "text-sm"
              } transition-colors`}
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
    </div>
  );
}
