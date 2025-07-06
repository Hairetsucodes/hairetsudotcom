import React from "react";

interface AboutSectionProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function AboutSection({
  isMobile,
  isTablet,
}: AboutSectionProps) {
  return (
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
            With over 20 years in the industry, my journey began in hacking and
            exploiting web vulnerabilities and APIs. This foundation in
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
            This expertise evolved into full stack development, where I&apos;ve
            built everything from high-traffic fraud detection systems to
            comprehensive job search platforms. I&apos;m passionate about
            creating solutions that not only work well but can scale to handle
            millions of requests.
          </p>
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{
              color: "var(--taskbar-text)",
              opacity: 0.8,
            }}
          >
            Today, I&apos;m focused on Machine Learning and AI, building tools
            like Notate that help researchers and analysts work more efficiently
            while maintaining privacy and data control. Every project is an
            opportunity to solve real problems with innovative technology.
          </p>
        </div>
      </div>
    </section>
  );
}
