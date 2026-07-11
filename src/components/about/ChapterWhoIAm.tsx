"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function ChapterWhoIAm() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "12%"]);

  return (
    <section
      id="who-i-am"
      ref={ref}
      className="chapter-section flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)", minHeight: "100svh" }}
    >
      <motion.div
        className="relative z-10 w-full px-4 sm:px-10 lg:px-16 py-20 flex flex-col justify-center"
        style={{ y }}
      >
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[11px] tracking-[0.55em] uppercase mb-8"
          style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
        >
          Chapter 01 — Who I Am
        </motion.p>

        {/* Giant name */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="chapter-title leading-[0.88]"
            style={{
              fontSize: "clamp(3.5rem, 14vw, 14rem)",
              color: "var(--text-primary)",
            }}
          >
            This is
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="chapter-title leading-[0.88]"
            style={{
              fontSize: "clamp(3.5rem, 14vw, 14rem)",
              color: "var(--accent)",
            }}
          >
            Tharun R
          </motion.h1>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px w-full max-w-xs mb-10 origin-left"
          style={{ background: "var(--border)" }}
        />

        {/* Body + Stats side by side */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex-1 max-w-xl"
          >
            <p
              className="body-copy text-lg sm:text-xl leading-relaxed mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Information Technology undergraduate at Karpagam College of Engineering. Driven by a passion for building digital products and understanding how they can be secured against real-world threats.
            </p>
            <p
              className="body-copy text-base leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              I create scalable full-stack applications, explore cybersecurity challenges, and enjoy turning complex ideas into secure, reliable, and impactful solutions.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-row lg:flex-col gap-10 lg:gap-8 shrink-0"
          >
            {[
              { value: "7.3", label: "CGPA" },
              { value: "10+", label: "Projects" },
              { value: "2023-27", label: "B.Tech IT" },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span
                  className="chapter-title"
                  style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--accent)" }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[10px] tracking-[0.35em] uppercase"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 flex items-center gap-4"
        >
          <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
          <span
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
          >
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
