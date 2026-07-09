"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "DEVFOLIO AI",
    category: "AI Platform",
    description:
      "AI-Powered Developer Portfolio & Resume Generator — a full-stack AI platform using React, Spring Boot, MongoDB, GitHub OAuth, and Google Gemini AI to automatically generate developer portfolios and resumes from GitHub repositories. Reduces manual profile-building effort by 70%.",
    tech: ["React", "Spring Boot", "MongoDB", "GitHub OAuth", "Google Gemini AI"],
    year: "2026",
    github: "https://github.com/tharunprinz",
  },
  {
    id: "02",
    title: "GITPEN-AI",
    category: "Security Tool",
    description:
      "AI-Powered GitHub Repository Analyzer — an AI-powered GitHub security scanner using React, Node.js, MongoDB, Gemini AI, and Groq API. Reduces manual code review effort by 60% with security scoring, AI-based file analysis, and caching that improves scan speed by 40%.",
    tech: ["React", "Node.js", "MongoDB", "Gemini AI", "Groq API"],
    year: "2025",
    github: "https://github.com/tharunprinz",
  },
  {
    id: "03",
    title: "Snack Box",
    category: "Web Application",
    description:
      "Smart food ordering platform with billing, QR payments, and admin analytics. Modern food ordering website built with React & Vite featuring menu management, shopping cart, QR code payments, bill printing, sales reports, and responsive design.",
    tech: ["React", "Vite", "QR Payments", "Admin Analytics"],
    year: "2025",
    github: "https://github.com/tharunprinz/Snacks-Box",
  },
];

function IntroPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="w-screen h-screen flex flex-col justify-center px-8 sm:px-16 lg:px-32 shrink-0"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-[11px] tracking-[0.55em] uppercase mb-8"
        style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
      >
        Selected Work
      </motion.p>

      <div className="overflow-hidden mb-1">
        <motion.h2
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="chapter-title leading-[0.88]"
          style={{ fontSize: "clamp(3.5rem, 14vw, 14rem)", color: "var(--text-primary)" }}
        >
          Selected
        </motion.h2>
      </div>
      <div className="overflow-hidden mb-10">
        <motion.h2
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="chapter-title leading-[0.88]"
          style={{ fontSize: "clamp(3.5rem, 14vw, 14rem)", color: "var(--accent)" }}
        >
          Work.
        </motion.h2>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="h-px w-32 origin-left mb-8"
        style={{ background: "var(--border)" }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-[11px] tracking-[0.3em] uppercase"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
      >
        Scroll to explore →
      </motion.p>
    </div>
  );
}

function ProjectPanel({ project }: { project: Project }) {
  return (
    <div className="w-[88vw] sm:w-[72vw] md:w-[58vw] lg:w-[50vw] h-screen flex items-center shrink-0 py-8">
      <div
        className="w-full p-8 sm:p-10 border flex flex-col justify-start overflow-y-auto"
        style={{
          borderColor: "var(--border)",
          maxHeight: "84vh",
        }}
      >
        {/* Top meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
          >
            {project.id}
          </span>
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
          >
            {project.year}
          </span>
          <span
            className="text-[10px] tracking-[0.3em] uppercase px-3 py-1 border"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Title — smaller clamp so long tech stacks don't push it out */}
        <h3
          className="chapter-title mb-5"
          style={{ fontSize: "clamp(1.8rem, 4vw, 4.5rem)", color: "var(--text-primary)", lineHeight: 0.92 }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="body-copy text-sm sm:text-base leading-relaxed mb-7 max-w-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Tech stack — wraps cleanly */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={project.github ?? "https://github.com/tharunprinz"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] tracking-[0.2em] uppercase cursor-pointer transition-opacity duration-200 hover:opacity-60"
          style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-86%"]);

  return (
    <section ref={targetRef} id="projects" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex h-full gap-8 md:gap-12">
          <IntroPanel />
          {projects.map((project) => (
            <ProjectPanel key={project.id} project={project} />
          ))}
          <div className="w-[8vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
