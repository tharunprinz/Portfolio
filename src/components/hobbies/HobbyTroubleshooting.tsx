"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LOG_LINES = [
  { delay: 0,    text: "> System diagnostics initiated...", color: "#F59E0B" },
  { delay: 0.4,  text: "> Scanning hardware components...  [OK]", color: "#22C55E" },
  { delay: 0.8,  text: "> Memory integrity check...         [OK]", color: "#22C55E" },
  { delay: 1.2,  text: "> Network interface...              [WARN]", color: "#F59E0B" },
  { delay: 1.6,  text: "> Driver conflict detected: usb_hid.ko", color: "#EF4444" },
  { delay: 2.0,  text: "> Cross-referencing kernel logs...", color: "#F59E0B" },
  { delay: 2.4,  text: "> Root cause: IRQ conflict on USB3", color: "#F59E0B" },
  { delay: 2.8,  text: "> Applying fix: irqbalance --hintpolicy=exact", color: "#60A5FA" },
  { delay: 3.2,  text: "> Reloading driver module...        [OK]", color: "#22C55E" },
  { delay: 3.6,  text: "> All systems nominal.", color: "#22C55E" },
  { delay: 4.0,  text: "> Give me an error code,", color: "#F59E0B" },
  { delay: 4.4,  text: "> I'll give you a fix._", color: "#F59E0B" },
];

function TerminalLine({ line, started }: { line: typeof LOG_LINES[0]; started: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setVisible(true), line.delay * 1000);
    return () => clearTimeout(t);
  }, [started, line.delay]);

  if (!visible) return null;

  return (
    <motion.p
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="text-sm font-mono"
      style={{ color: line.color, fontFamily: "monospace" }}
    >
      {line.text}
    </motion.p>
  );
}

export default function HobbyTroubleshooting() {
  const [started, setStarted] = useState(false);

  return (
    <section
      id="troubleshooting"
      className="chapter-section flex-col justify-center"
      style={{ background: "#0D0A00" }}
    >
      {/* Amber ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 40%, rgba(245,158,11,0.08) 0%, transparent 60%)",
        }}
      />


      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 lg:py-24 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        {/* Left: narrative */}
        <div className="flex-1 max-w-xl flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-xs tracking-[0.5em] uppercase mb-8"
            style={{ color: "var(--chapter-amber)", fontFamily: "var(--font-body)" }}
          >
            Hobby — Troubleshooting
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="chapter-title text-4xl sm:text-5xl md:text-7xl mb-10"
            style={{ color: "var(--text-primary)" }}
          >
            Give me an{" "}
            <span className="text-gradient-amber">error</span>
            {" "}code.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="body-copy text-lg mb-6" style={{ color: "rgba(240,236,228,0.65)" }}>
              Most people see an error and google the exact message. I see an error 
              and start reading the stack trace — because the real problem is never 
              where it first appears.
            </p>
            <p className="body-copy text-lg" style={{ color: "rgba(240,236,228,0.4)" }}>
              I&apos;ve debugged everything from kernel panics to mysteriously silent 
              API failures. Each one is a puzzle, and I genuinely can&apos;t leave a 
              puzzle unsolved.
            </p>
          </motion.div>
        </div>

        {/* Right: terminal window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onViewportEnter={() => setStarted(true)}
          className="flex-1 max-w-lg w-full"
        >
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "rgba(245,158,11,0.2)", background: "#0a0800" }}
          >
            {/* Terminal chrome */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: "rgba(245,158,11,0.15)" }}
            >
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs font-mono" style={{ color: "rgba(245,158,11,0.5)" }}>
                tharunprinz@debug ~ bash
              </span>
            </div>
            {/* Log lines */}
            <div className="p-6 space-y-2 min-h-[320px]">
              {LOG_LINES.map((line, i) => (
                <TerminalLine key={i} line={line} started={started} />
              ))}
              {started && (
                <p className="text-sm font-mono cursor-blink text-transparent select-none" aria-hidden>
                  _
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
