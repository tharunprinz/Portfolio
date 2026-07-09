"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Shared editorial hobby section template
   ───────────────────────────────────────────────────────────── */
interface HobbyProps {
  id: string;
  label: string;
  line1: string;
  line2: string;
  accentLine: 1 | 2;
  body1: string;
  body2?: string;
  bg?: string;
  extra?: React.ReactNode;
}

/*
  Performance notes:
  - viewport margin "-200px" → animations start loading 200px before
    the section scrolls into view, eliminating the "pop-in" lag.
  - All animations use only `opacity` + `transform` (y / scaleX) —
    compositor-only properties that never trigger layout or paint.
  - `will-change` is applied via CSS on .chapter-section .overflow-hidden
    so the browser pre-allocates GPU layers.
*/

function HobbySection({
  id,
  label,
  line1,
  line2,
  accentLine,
  body1,
  body2,
  bg = "var(--bg-primary)",
  extra,
}: HobbyProps) {
  return (
    <section
      id={id}
      className="chapter-section flex-col justify-center overflow-hidden"
      style={{ background: bg, minHeight: "100svh" }}
    >
      <div className="relative z-10 w-full px-4 sm:px-10 lg:px-16 py-20 flex flex-col justify-center">

        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-200px 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[11px] tracking-[0.55em] uppercase mb-8"
          style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
        >
          {label}
        </motion.p>

        {/* Line 1 */}
        <div className="overflow-hidden mb-1">
          <motion.h2
            initial={{ y: "101%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-180px 0px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="chapter-title leading-[0.88]"
            style={{
              fontSize: "clamp(2.5rem, 9vw, 9rem)",
              color: accentLine === 1 ? "var(--accent)" : "var(--text-primary)",
              willChange: "transform",
            }}
          >
            {line1}
          </motion.h2>
        </div>

        {/* Line 2 */}
        <div className="overflow-hidden mb-12">
          <motion.h2
            initial={{ y: "101%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-180px 0px" }}
            transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="chapter-title leading-[0.88]"
            style={{
              fontSize: "clamp(2.5rem, 9vw, 9rem)",
              color: accentLine === 2 ? "var(--accent)" : "var(--text-primary)",
              willChange: "transform",
            }}
          >
            {line2}
          </motion.h2>
        </div>

        {/* Rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-180px 0px" }}
          transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
          className="h-px w-full max-w-xs mb-10 origin-left"
          style={{ background: "var(--border)", willChange: "transform" }}
        />

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-180px 0px" }}
          transition={{ duration: 0.55, delay: 0.26, ease: "easeOut" }}
          className="body-copy text-lg sm:text-xl max-w-2xl mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {body1}
        </motion.p>

        {body2 && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-180px 0px" }}
            transition={{ duration: 0.55, delay: 0.34, ease: "easeOut" }}
            className="body-copy text-base max-w-xl"
            style={{ color: "var(--text-muted)" }}
          >
            {body2}
          </motion.p>
        )}

        {extra && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-180px 0px" }}
            transition={{ duration: 0.55, delay: 0.42, ease: "easeOut" }}
            className="mt-10"
          >
            {extra}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Individual hobby exports
   ───────────────────────────────────────────────────────────── */

export function HobbyRubiksCube() {
  return (
    <HobbySection
      id="rubiks-cube-solver"
      label="Hobby — Rubik's Cube Solver"
      line1="I don't just solve cubes."
      line2="I solve patterns."
      accentLine={2}
      bg="var(--bg-surface)"
      body1="What looks like a scrambled puzzle is really a sequence of decisions waiting to be understood. Learning algorithms, recognizing patterns, and optimizing moves taught me that every complex problem can be broken into smaller, manageable steps."
      body2="The best part isn't finishing the cube—it's watching chaos turn into order one move at a time."
    />
  );
}

export function HobbyTroubleshooting() {
  // Terminal-style extra
  const lines = [
    "$ npm run build",
    "> Error: Module not found",
    "$ check imports",
    "$ verify environment variables",
    "$ rebuild project",
    "> ✓ Build completed successfully",
  ];
  return (
    <HobbySection
      id="troubleshooting"
      label="Hobby — Troubleshooting"
      line1="If it's broken,"
      line2="I want to know why."
      accentLine={2}
      bg="var(--bg-primary)"
      body1="Whether it's a software bug, a network issue, or a system behaving unexpectedly, I enjoy digging into the root cause. Troubleshooting has taught me patience, attention to detail, and the importance of asking the right questions before jumping to solutions."
      body2="Finding the actual cause of a problem is often more rewarding than solving the problem itself."
      extra={
        <div
          className="border px-6 py-5 max-w-lg font-mono text-xs sm:text-sm leading-loose"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          {lines.map((l, i) => (
            <p key={i} style={{ color: l.startsWith(">") ? "var(--accent)" : "var(--text-muted)" }}>
              {l}
            </p>
          ))}
        </div>
      }
    />
  );
}

export function HobbyContentCreator() {
  return (
    <HobbySection
      id="infotainment-content-creator"
      label="Hobby — Infotainment Content Creator"
      line1="Technology becomes powerful"
      line2="when people understand it."
      accentLine={2}
      bg="var(--bg-surface)"
      body1="I enjoy creating content that makes technology, cybersecurity, and digital trends easier to understand. Breaking down complex topics into engaging, digestible stories is a challenge that combines creativity with technical knowledge."
      body2="The goal isn't just to inform—it's to make people curious enough to learn more."
    />
  );
}

export function HobbyDancer() {
  return (
    <HobbySection
      id="dancer"
      label="Hobby — Dancer"
      line1="Movement is another"
      line2="form of expression."
      accentLine={2}
      bg="var(--bg-primary)"
      body1="Dance taught me discipline, confidence, and consistency. Every routine starts with repetition, refinement, and countless small improvements—the same mindset that applies to coding and problem-solving."
      body2="There's something satisfying about turning practice into performance and ideas into motion."
    />
  );
}

export function HobbyVideoEditor() {
  return (
    <HobbySection
      id="video-editor"
      label="Hobby — Video Editor"
      line1="Every frame"
      line2="tells a story."
      accentLine={2}
      bg="var(--bg-surface)"
      body1="Video editing is where creativity meets precision. From pacing and transitions to sound design and visual flow, I enjoy shaping raw footage into content that captures attention and communicates a message effectively."
      body2="Much like software development, great editing often goes unnoticed—it simply feels seamless."
    />
  );
}

export function HobbyPhilosophy() {
  return (
    <section
      id="philosophy"
      className="chapter-section flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)", minHeight: "100svh" }}
    >
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 py-20 flex flex-col justify-center">

        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-200px 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[11px] tracking-[0.55em] uppercase mb-12"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
        >
          Philosophy — The through-line
        </motion.p>

        {/* Giant statement */}
        <div className="overflow-hidden mb-2">
          <motion.h2
            initial={{ y: "101%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-180px 0px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="chapter-title leading-[0.88]"
            style={{ fontSize: "clamp(2rem, 8vw, 8rem)", color: "var(--text-primary)", willChange: "transform" }}
          >
            Relentless by Nature.
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-2">
          <motion.h2
            initial={{ y: "101%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-180px 0px" }}
            transition={{ duration: 0.85, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="chapter-title leading-[0.88]"
            style={{ fontSize: "clamp(2rem, 8vw, 8rem)", color: "var(--text-primary)", willChange: "transform" }}
          >
            Driven by Challenge.
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-14">
          <motion.h2
            initial={{ y: "101%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-180px 0px" }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="chapter-title leading-[0.88]"
            style={{ fontSize: "clamp(2rem, 8vw, 8rem)", color: "var(--accent)", willChange: "transform" }}
          >
            Focused on Excellence.
          </motion.h2>
        </div>

        {/* Rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-180px 0px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="h-px w-full max-w-xs mb-10 origin-left"
          style={{ background: "var(--border)", willChange: "transform" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-180px 0px" }}
          transition={{ duration: 0.5, delay: 0.38, ease: "easeOut" }}
          className="body-copy text-lg max-w-xl mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Not a slogan. Just a mindset.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-180px 0px" }}
          transition={{ duration: 0.5, delay: 0.44, ease: "easeOut" }}
          className="body-copy text-base max-w-xl mb-2"
          style={{ color: "var(--text-muted)" }}
        >
          I enjoy solving difficult problems, learning new technologies, and turning ideas into reality.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-180px 0px" }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="body-copy text-base max-w-xl mb-2"
          style={{ color: "var(--text-muted)" }}
        >
          I don&apos;t settle for what&apos;s comfortable. I keep moving forward.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-180px 0px" }}
          transition={{ duration: 0.5, delay: 0.56, ease: "easeOut" }}
          className="body-copy text-base max-w-xl mb-14"
          style={{ color: "var(--text-muted)" }}
        >
          Because the next challenge is where the real growth happens.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-180px 0px" }}
          transition={{ duration: 0.5, delay: 0.62, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 text-[11px] tracking-[0.35em] uppercase font-medium transition-opacity duration-200 hover:opacity-80"
            style={{ background: "var(--accent)", color: "#fff", fontFamily: "var(--font-body)" }}
          >
            Let&apos;s work together
          </a>
          <a
            href="#hero-sequence"
            className="inline-flex items-center justify-center px-8 py-3 border text-[11px] tracking-[0.35em] uppercase transition-opacity duration-200 hover:opacity-60"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
          >
            Back to top
          </a>
        </motion.div>
      </div>
    </section>
  );
}
