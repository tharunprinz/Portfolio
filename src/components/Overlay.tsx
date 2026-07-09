"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ──────────────────────────────────────────────
   Section Data
   ────────────────────────────────────────────── */
interface OverlaySection {
  id: string;
  title: string;
  subtitle?: string;
  align: "center" | "left" | "right";
  scrollStart: number; // 0–1 range within the parent
  scrollEnd: number;
}

const sections: OverlaySection[] = [
  {
    id: "hero",
    title: "Tharun R.",
    subtitle: "Aspiring Software Engineer",
    align: "center",
    scrollStart: 0.0,
    scrollEnd: 0.22,
  },
  {
    id: "vision",
    title: "Building scalable,\nimpactful apps.",
    align: "left",
    scrollStart: 0.26,
    scrollEnd: 0.46,
  },
  {
    id: "bridge",
    title: "Full-stack from\nidea to deploy.",
    align: "right",
    scrollStart: 0.54,
    scrollEnd: 0.74,
  },
  {
    id: "cta",
    title: "Scroll to explore.",
    align: "center",
    scrollStart: 0.82,
    scrollEnd: 0.98,
  },
];

/* ──────────────────────────────────────────────
   Alignment helpers
   ────────────────────────────────────────────── */
function getAlignClasses(align: OverlaySection["align"]): string {
  switch (align) {
    case "center":
      return "items-center justify-center text-center";
    case "left":
      return "items-start justify-center text-left px-8 sm:px-16 lg:px-24";
    case "right":
      return "items-end justify-center text-right px-8 sm:px-16 lg:px-24";
  }
}

/* ──────────────────────────────────────────────
   Individual Overlay Section
   ────────────────────────────────────────────── */
function OverlaySection({
  section,
  containerRef,
}: {
  section: OverlaySection;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollStart, scrollEnd } = section;
  const fadeInStart = scrollStart;
  const fadeInEnd = scrollStart + (scrollEnd - scrollStart) * 0.3;
  const fadeOutStart = scrollEnd - (scrollEnd - scrollStart) * 0.3;
  const fadeOutEnd = scrollEnd;

  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [60, 0, 0, -40]
  );

  // Subtle parallax scale
  const scale = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0.95, 1, 1, 1.02]
  );

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col ${getAlignClasses(section.align)} pointer-events-none`}
      style={{ opacity, y, scale }}
    >
      {section.id === "hero" ? (
        /* ── Hero: Special treatment ────────── */
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <motion.p
            className="text-[10px] sm:text-xs tracking-[0.5em] uppercase font-light"
            style={{
              color: "var(--text-secondary)",
              letterSpacing: "0.5em",
            }}
          >
            Portfolio 2026
          </motion.p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight" style={{ color: "var(--text-primary)" }}>
            <span style={{ color: "var(--accent)" }}>Tharun R</span>
            <span style={{ color: "var(--text-primary)" }}>.</span>
          </h1>
          {section.subtitle && (
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-[0.3em] uppercase mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {section.subtitle}
            </p>
          )}
          {/* Scroll indicator */}
          <motion.div
            className="mt-10 sm:mt-16 flex flex-col items-center gap-3"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-white/30 to-white/50" />
            <p className="text-[9px] tracking-[0.4em] uppercase text-white/20 font-light">
              Scroll
            </p>
          </motion.div>
        </div>
      ) : section.id === "cta" ? (
        /* ── CTA: Minimal ──────────────────── */
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <p
            className="text-sm sm:text-base tracking-[0.3em] uppercase font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            {section.title}
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-5 h-5 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>
      ) : (
        /* ── Regular sections ────────────────── */
        <div className="max-w-2xl">
          <div
            className="w-10 h-[1px] mb-6"
            style={{
              background:
                "linear-gradient(90deg, var(--accent-warm), transparent)",
              marginLeft: section.align === "right" ? "auto" : undefined,
            }}
          />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight whitespace-pre-line">
            {section.title}
          </h2>
        </div>
      )}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Overlay Container
   ────────────────────────────────────────────── */
export default function Overlay({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="w-full h-full relative">
      {sections.map((section) => (
        <OverlaySection
          key={section.id}
          section={section}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}
