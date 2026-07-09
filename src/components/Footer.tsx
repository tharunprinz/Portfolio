"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import ShaderBackground from "@/components/ui/shader-background";

const SOCIALS = [
  {
    label: "GitHub",
    handle: "@tharunprinz",
    href: "https://github.com/tharunprinz",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "tharun021",
    href: "https://linkedin.com/in/tharun021",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    handle: "@thxrun21",
    href: "https://www.instagram.com/thxrun21/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    handle: "@tharunr21",
    href: "https://www.youtube.com/@tharunr21",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Email",
    handle: "tharunr2121",
    href: "mailto:tharunr2121@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      {/* ── CTA Section ────────────────────────── */}
      <section
        id="contact"
        className="relative overflow-hidden"
        style={{ background: "var(--bg-primary)", minHeight: "100svh" }}
      >
        {/* Shader background at reduced opacity */}
        <ShaderBackground className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30" />

        {/* Orange top border line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--accent)" }} />

        <div ref={ref} className="relative z-10 w-full h-full flex flex-col justify-between min-h-[100svh] px-4 sm:px-10 lg:px-16 py-20">

          {/* Top row — label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.55em] uppercase"
            style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
          >
            Get in Touch
          </motion.p>

          {/* Giant CTA heading */}
          <div className="flex flex-col justify-center flex-1 py-12">
            <div className="overflow-hidden mb-1">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="chapter-title leading-[0.86]"
                style={{ fontSize: "clamp(2.5rem, 10vw, 10rem)", color: "var(--text-primary)" }}
              >
                Have an Idea?
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-12">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="chapter-title leading-[0.80]"
                style={{ fontSize: "clamp(2.5rem, 10vw, 10rem)", color: "var(--accent)" }}
              >
                Let&apos;s Make It Real
              </motion.h2>
            </div>

            {/* Email link */}
            <motion.a
              href="mailto:tharunr2121@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="group inline-flex items-center gap-4 self-start"
            >
              <span
                className="relative text-lg sm:text-xl md:text-2xl font-light transition-opacity duration-300 group-hover:opacity-60"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
              >
                tharunr2121@gmail.com
                <span
                  className="absolute -bottom-1 left-0 w-full h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: "var(--accent)" }}
                />
              </span>
              <svg
                className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ color: "var(--accent)" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.a>
          </div>

          {/* Bottom row — socials + copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10 border-t pt-10"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Social grid */}
            <div className="flex flex-wrap gap-8">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.65 + i * 0.06 }}
                  className="flex flex-col gap-2 group transition-opacity duration-200 hover:opacity-60"
                >
                  <span style={{ color: "var(--text-muted)" }} className="group-hover:text-[var(--accent)] transition-colors duration-200">
                    {s.icon}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.25em] uppercase"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="text-[9px] tracking-wide"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)", opacity: 0.5 }}
                  >
                    {s.handle}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Copyright + name */}
            <div className="flex flex-col items-start sm:items-end gap-1">
              <span
                className="chapter-title text-sm tracking-tight"
                style={{ color: "var(--text-muted)", opacity: 0.3 }}
              >
                THARUN R
              </span>
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)", opacity: 0.4 }}
              >
                © 2026 — All Rights Reserved
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
