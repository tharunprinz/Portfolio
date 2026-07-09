"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ChapterMeta {
  id: string;
  label: string;
  accent: string;
}

const CHAPTERS: ChapterMeta[] = [
  { id: "who-i-am",                     label: "Who I Am",                    accent: "#e8734a" },
  { id: "what-drives-me",               label: "What Drives Me",              accent: "#e8734a" },
  { id: "skills-tools",                 label: "Skills & Tools",              accent: "#e8734a" },
  { id: "beyond-screen",                label: "Beyond the Screen",           accent: "#e8734a" },
  { id: "rubiks-cube-solver",           label: "Rubik's Cube Solver",         accent: "#e8734a" },
  { id: "troubleshooting",              label: "Troubleshooting",             accent: "#e8734a" },
  { id: "infotainment-content-creator", label: "Content Creator",             accent: "#e8734a" },
  { id: "dancer",                       label: "Dancer",                      accent: "#e8734a" },
  { id: "video-editor",                 label: "Video Editor",                accent: "#e8734a" },
  { id: "philosophy",                   label: "Eager to Master",             accent: "#e8734a" },
];

export default function ChapterNav() {
  const [active, setActive] = useState<string>(CHAPTERS[0].id);
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-10% 0px -10% 0px" }
    );

    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const activeChapter = CHAPTERS.find((c) => c.id === active);
  const accentColor = activeChapter?.accent ?? "#e8734a";

  return (
    <>
      {/* ── Back to top ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed top-6 left-6 z-[200]"
      >
        <a
          href="#hero-sequence"
          className="flex items-center gap-2 text-white/40 hover:text-white/90 transition-colors duration-300 text-xs tracking-[0.2em] uppercase font-light"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Top
        </a>
      </motion.div>

      {/* ── Vertical chapter progress dots ─────────── */}
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[200] flex flex-col items-end gap-3"
        aria-label="Chapter navigation"
      >
        {CHAPTERS.map((chapter) => {
          const isActive = chapter.id === active;
          return (
            <div key={chapter.id} className="flex items-center gap-3">
              {/* Label — appears on hover */}
              <AnimatePresence>
                {hovered && (
                  <motion.a
                    href={`#${chapter.id}`}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: isActive ? 1 : 0.35, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.25 }}
                    className="text-[10px] tracking-[0.15em] uppercase font-light text-right whitespace-nowrap"
                    style={{
                      color: isActive ? accentColor : "rgba(240,236,228,0.35)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {chapter.label}
                  </motion.a>
                )}
              </AnimatePresence>

              {/* Dot */}
              <motion.a
                href={`#${chapter.id}`}
                aria-label={`Jump to ${chapter.label}`}
                animate={{
                  width: isActive ? 24 : scrolled ? 5 : 6,
                  height: isActive ? 6 : 5,
                  backgroundColor: isActive ? accentColor : "rgba(240,236,228,0.2)",
                  borderRadius: isActive ? 3 : "50%",
                }}
                transition={{ duration: 0.3 }}
                className="block"
                style={{ willChange: "width, background-color" }}
              />
            </div>
          );
        })}
      </motion.nav>

      {/* ── Mobile bottom progress bar ──────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[200] h-[2px] bg-white/5">
        <motion.div
          className="h-full origin-left"
          style={{ backgroundColor: accentColor }}
          animate={{
            scaleX:
              (CHAPTERS.findIndex((c) => c.id === active) + 1) /
              CHAPTERS.length,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </>
  );
}
