import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export default function HeroSection({
  isMobile,
  isTablet,
  isDesktop,
}: HeroSectionProps) {
  return (
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
                With over 20 years in the industry, my journey began in hacking
                and exploiting web vulnerabilities and APIs. This foundation
                evolved into full stack development, and now encompassing
                Machine Learning and AI.
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
                  isMobile ? "w-48 h-48" : isTablet ? "w-48 h-48" : "w-64 h-64"
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
        </div>
      </div>
    </section>
  );
}
