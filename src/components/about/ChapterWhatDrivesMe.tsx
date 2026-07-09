"use client";

import { motion } from "framer-motion";

const VALUES = [
  { num: "01", title: "Build with Purpose",  body: "Create solutions that are practical, scalable, and built to make an impact." },
  { num: "02", title: "Learn Beyond the Surface", body: "Go deeper than tutorials—understand how systems work and why they work that way." },
  { num: "03", title: "Security-First Mindset",         body: "Strong applications aren't just functional; they're designed with reliability and security in mind." },
  { num: "04", title: "Growth Never Stops",           body: "Every project, challenge, and mistake is an opportunity to learn something new and become better." },
];

export default function ChapterWhatDrivesMe() {
  return (
    <section
      id="what-drives-me"
      className="chapter-section flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg-surface)", minHeight: "100svh" }}
    >
      <div className="relative z-10 w-full px-4 sm:px-10 lg:px-16 py-20 flex flex-col justify-center">

        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[11px] tracking-[0.55em] uppercase mb-8"
          style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
        >
          Chapter 02 — What Drives Me
        </motion.p>

        {/* Giant heading */}
        <div className="overflow-hidden mb-2">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="chapter-title leading-[0.88]"
            style={{ fontSize: "clamp(3rem, 11vw, 11rem)", color: "var(--text-primary)" }}
          >
            Curiosity
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="chapter-title leading-[0.88]"
            style={{ fontSize: "clamp(3rem, 11vw, 11rem)", color: "var(--accent)" }}
          >
            fuels everything.
          </motion.h2>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="h-px w-full max-w-xs mb-12 origin-left"
          style={{ background: "var(--border)" }}
        />

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="body-copy text-lg sm:text-xl max-w-2xl mb-16"
          style={{ color: "var(--text-secondary)" }}
        >
          I believe the best growth happens outside the comfort zone. Whether it&apos;s a new technology, a security challenge, or a complex problem, I&apos;m always eager to explore, learn, and improve.
        </motion.p>

        {/* Values — horizontal rule list */}
        <div
          className="w-full border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 * i }}
              className="flex items-start gap-8 py-6 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="text-[10px] tracking-[0.35em] uppercase pt-1 w-8 shrink-0"
                style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
              >
                {v.num}
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-12 flex-1">
                <h3
                  className="text-base sm:text-lg font-semibold shrink-0"
                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
                >
                  {v.title}
                </h3>
                <p
                  className="body-copy text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {v.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
