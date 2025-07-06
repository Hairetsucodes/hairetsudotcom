import React, { useState, useEffect, useRef } from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import PortfolioSection from "./PortfolioSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

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
      <Navigation
        isMobile={isMobile}
        isDesktop={isDesktop}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <HeroSection
        isMobile={isMobile}
        isTablet={isTablet}
        isDesktop={isDesktop}
      />

      <PortfolioSection isMobile={isMobile} isTablet={isTablet} />

      <AboutSection isMobile={isMobile} isTablet={isTablet} />

      <ContactSection isMobile={isMobile} isTablet={isTablet} />

      <Footer isMobile={isMobile} />
    </div>
  );
}
