"use client";

import { motion } from "framer-motion";
import { AnimatedNavigationTabs } from "@/components/ui/animated-navigation-tabs";

/* ──────────────────────────────────────────────
   Nav Items for AnimatedNavigationTabs
   ────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 1, tile: "About", href: "#who-i-am" },
  { id: 2, tile: "Projects", href: "#projects" },
  { id: 3, tile: "Skills", href: "#skills-tools" },
  { id: 4, tile: "Resume", href: "/Tharun.pdf", download: true },
  { id: 5, tile: "Contact", href: "#contact" },
];

/* ──────────────────────────────────────────────
   Navbar
   ────────────────────────────────────────────── */
export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[100]"
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "1080px", padding: "16px 12px 0" }}
      >
        <div className="flex items-center justify-between px-2 py-2">
          {/* Logo — left */}
          <a
            href="#hero-sequence"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group relative flex items-center gap-2 shrink-0"
          >
            <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-white/90">
              Tharun R
            </span>
          </a>

          {/* Nav — pushed to the far right on desktop */}
          <div className="hidden md:flex items-center ml-auto">
            <AnimatedNavigationTabs items={NAV_ITEMS} />
          </div>

          {/* Mobile — scrollable nav links, right-aligned */}
          <div className="flex md:hidden items-center gap-3 overflow-x-auto no-scrollbar ml-auto">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                download={item.download ? true : undefined}
                className="text-[11px] tracking-[0.15em] uppercase font-medium text-white/40 hover:text-primary transition-colors duration-300 whitespace-nowrap"
              >
                {item.tile}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}