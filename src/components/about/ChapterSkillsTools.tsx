"use client";

import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  { category: "Languages",               skills: ["Java", "Python", "C++", "JavaScript", "HTML", "CSS"] },
  { category: "Frontend & UI",           skills: ["React", "Framer Motion", "HTML", "CSS", "JavaScript"] },
  { category: "Backend",                 skills: ["Node.js", "Express.js", "Spring Boot"] },
  { category: "Databases",               skills: ["MongoDB", "MySQL"] },
  { category: "Tools & Platforms",       skills: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Postman"] },
  { category: "Cloud & OS",              skills: ["Microsoft Azure", "Linux"] },
];

const ALL_SKILLS = SKILL_CATEGORIES.flatMap((c) => c.skills);
const MARQUEE    = [...ALL_SKILLS, ...ALL_SKILLS];

export default function ChapterSkillsTools() {
  return (
    <section
      id="skills-tools"
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
          Chapter 03 — Skills &amp; Tools
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
            The stack
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
            I live in.
          </motion.h2>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="h-px w-full max-w-xs mb-14 origin-left"
          style={{ background: "var(--border)" }}
        />

        {/* Category grid */}
        <div
          className="w-full border-t mb-0"
          style={{ borderColor: "var(--border)" }}
        >
          {SKILL_CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: ci * 0.08 }}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-16 py-5 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="text-[10px] tracking-[0.4em] uppercase shrink-0 w-36 pt-0.5"
                style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
              >
                {cat.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] tracking-[0.15em] uppercase px-3 py-1.5 border"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee ticker — full width, below content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full overflow-hidden py-5 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex w-max gap-10 animate-ticker">
          {MARQUEE.map((item, i) => (
            <span
              key={i}
              className="text-2xl sm:text-3xl font-light shrink-0 whitespace-nowrap"
              style={{
                color: i % 6 === 0 ? "var(--accent)" : "var(--text-muted)",
                fontFamily: "var(--font-display)",
              }}
            >
              {item}<span className="mx-5 opacity-20">·</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
