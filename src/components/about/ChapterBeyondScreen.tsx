"use client";

import { motion } from "framer-motion";

const HOBBIES = [
  "Rubik's Cube Solver", "Troubleshooting", "Infotainment Content Creator", "Dancer", "Video Editor"
];

function getHobbyId(hobby: string) {
  return hobby.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-").replace(/\//g, "-");
}

export default function ChapterBeyondScreen() {
  return (
    <section
      id="beyond-screen"
      className="chapter-section flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)", minHeight: "100svh" }}
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
          Chapter 05 — Beyond the Screen
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
            Code is only
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="chapter-title leading-[0.88]"
            style={{ fontSize: "clamp(3rem, 11vw, 11rem)", color: "var(--accent)" }}
          >
            part of the story.
          </motion.h2>
        </div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="body-copy text-lg sm:text-xl max-w-2xl mb-16"
          style={{ color: "var(--text-secondary)" }}
        >
          When the IDE is closed, you&apos;ll find me solving Rubik&apos;s Cubes, creating content, editing videos, dancing, and breaking down complex ideas into something people can actually enjoy. These hobbies sharpen the same skills I use as a developer — creativity, problem-solving, and continuous improvement.
        </motion.p>

        {/* Hobby grid — text only, hover orange */}
        <div
          className="grid grid-cols-2 sm:grid-cols-5 border-l border-t w-full"
          style={{ borderColor: "var(--border)" }}
        >
          {HOBBIES.map((hobby, i) => (
            <motion.a
              key={hobby}
              href={`#${getHobbyId(hobby)}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ color: "var(--accent)" }}
              className="border-r border-b py-8 px-6 flex items-center justify-start transition-colors duration-200 cursor-pointer group"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="text-[10px] tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-sm tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {hobby}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#rubiks-cube-solver"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 self-start flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase transition-opacity duration-200 hover:opacity-60"
          style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
        >
          Explore hobbies
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}
