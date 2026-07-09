"use client";

import { useRef, useState, useEffect } from "react";
import type { ReactNode, MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  animate,
  type Variants,
  type MotionProps,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
type Stat =
  | { type: "text"; value: string; label: string }
  | { type: "number"; value: number; decimals?: number; suffix?: string; label: string };

const stats: Stat[] = [
  { type: "text", value: "B.Tech IT", label: "Karpagam College" },
  { type: "number", value: 7.09, decimals: 2, label: "CGPA (2023-2027)" },
  { type: "number", value: 2, suffix: "+", label: "Key Projects" },
  { type: "number", value: 1, label: "Azure Certification" },
];

const skills = [
  "React.js / Node.js",
  "Java / Spring Boot",
  "JavaScript ES6+",
  "MongoDB / MySQL",
  "HTML5 / CSS3",
  "Python / C++",
  "Microsoft Azure",
  "Git / GitHub",
];

/* ──────────────────────────────────────────────
   Animated Counter — counts up from 0 when triggered
   ────────────────────────────────────────────── */
function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  active,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [active, value, prefersReducedMotion]);

  return (
    <span className="tabular-nums">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ──────────────────────────────────────────────
   TiltCard — cursor spotlight + optional 3D tilt
   ────────────────────────────────────────────── */
function TiltCard({
  children,
  className = "",
  tilt = 0,
  glowColor = "255,255,255",
  ...motionProps
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  glowColor?: string;
} & MotionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 22, mass: 0.5 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 22, mass: 0.5 });

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlightBg = useMotionTemplate`radial-gradient(420px circle at ${mouseX}% ${mouseY}%, rgba(${glowColor},0.08), transparent 75%)`;

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mouseX.set(px * 100);
    mouseY.set(py * 100);
    if (tilt > 0) {
      rawRotateY.set((px - 0.5) * tilt);
      rawRotateX.set((0.5 - py) * tilt);
    }
  }

  function handleMouseLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
    mouseX.set(50);
    mouseY.set(50);
  }

  const cardStyle =
    tilt > 0 && !prefersReducedMotion
      ? { rotateX, rotateY, transformPerspective: 900, willChange: "transform" as const }
      : undefined;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className={`relative group ${className}`}
      {...motionProps}
    >
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{ background: spotlightBg }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   About Section
   ────────────────────────────────────────────── */
export default function About() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const certRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Parallax transforms
  const { scrollYProgress: certScroll } = useScroll({ target: certRef, offset: ["start end", "end start"] });
  const certY = useTransform(certScroll, [0, 1], prefersReducedMotion ? [0, 0] : [-40, 40]);
  const blobY = useTransform(certScroll, [0, 1], prefersReducedMotion ? [0, 0] : [100, -100]);

  const { scrollYProgress: statsScroll } = useScroll({ target: statsRef, offset: ["start end", "end start"] });
  const statsY = useTransform(statsScroll, [0, 1], prefersReducedMotion ? [0, 0] : [-20, 20]);

  const { scrollYProgress: techScroll } = useScroll({ target: techRef, offset: ["start end", "end start"] });
  const techY = useTransform(techScroll, [0, 1], prefersReducedMotion ? [0, 0] : [-30, 30]);

  // Entrance variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative w-full flex flex-col">
      {/* ── ABOUT SECTION ── */}
      <section id="about" className="relative min-h-screen flex items-center justify-center py-16 lg:py-24 sm:py-32 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-50"
          style={{ background: "radial-gradient(circle, rgba(26, 42, 74, 0.15), transparent 70%)" }}
        />
        <Container className="relative w-full flex flex-col items-center">
          {/* ── Header ──────────────────────────── */}
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="mb-16 sm:mb-24 flex flex-col items-center text-center mx-auto max-w-4xl relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none -z-10"
            />
            <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase font-light text-white/30 mb-4 sm:mb-6">
              About
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95]">
              <span className="text-gradient">Crafting</span>{" "}
              <span className="text-white/90">the future</span>
              <br className="hidden sm:block" />
              <span className="text-white/90"> of the web.</span>
            </h2>
          </motion.div>

          {/* ── Bio Block ────────────────────────────── */}
          <TiltCard
            tilt={0}
            glowColor="255,255,255"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="glass-card !rounded-3xl p-10 sm:p-16 md:p-24 flex flex-col items-center justify-center text-center overflow-hidden max-w-5xl mx-auto w-full gap-8"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none" />

            <motion.p variants={itemVariants} className="text-lg sm:text-xl md:text-3xl font-light leading-relaxed text-white/70 max-w-4xl">
              I&apos;m an aspiring Software Engineer with hands-on experience in full-stack application development using Java, Spring Boot, React.js, Node.js, MongoDB, and MySQL.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-white/40 max-w-4xl">
              Skilled in building RESTful APIs, integrating third-party services, and developing scalable web applications. Passionate about problem-solving, software engineering, and creating impactful technology solutions.
            </motion.p>
          </TiltCard>
        </Container>
      </section>

      {/* ── STATS & CERTS SECTION ── */}
      <section className="relative min-h-screen flex items-center justify-center py-16 lg:py-24 sm:py-32 overflow-hidden">
        <Container className="relative w-full flex flex-col items-center">
          {/* ── Certifications + Stats Row ────────────────────────────── */}
          <div className="flex flex-col lg:flex-row gap-12 sm:gap-10 lg:gap-16 lg:gap-12 w-full items-stretch justify-center max-w-7xl mx-auto">
            {/* Certifications Card Container */}
            <motion.div
              ref={certRef}
              style={{ y: certY }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative w-full lg:w-1/3 shrink-0"
            >
              <motion.div
                style={{ y: blobY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[var(--accent-coral)]/20 rounded-full blur-[80px] pointer-events-none -z-10"
              />

              <TiltCard
                tilt={6}
                glowColor="251,146,60"
                variants={itemVariants}
                className="glass-card !rounded-3xl p-10 sm:p-14 lg:p-16 h-full flex flex-col items-center justify-center text-center overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[var(--accent-coral)]/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl pointer-events-none" />

                <h3 className="text-sm tracking-[0.3em] uppercase font-light text-white/30 mb-10 flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 text-[var(--accent-warm)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Certifications
                </h3>
                <ul className="flex flex-col items-center gap-6">
                  {["Azure AZ-900 (Microsoft)", "AI Mastery (Udemy)", "Salesforce Agentblazer", "Bugcrowd Hall of Fame"].map((cert) => (
                    <li
                      key={cert}
                      className="text-base sm:text-lg font-light leading-relaxed text-white/70 flex items-center justify-center gap-3 text-center group-hover:text-white/90 transition-colors duration-300"
                    >
                      <span className="text-[var(--accent-warm)] text-xs">●</span> {cert}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>

            {/* Stats Row Container */}
            <motion.div
              ref={statsRef}
              style={{ y: statsY }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
            >
              {stats.map((stat) => (
                <TiltCard
                  key={stat.label}
                  tilt={8}
                  glowColor={stat.type === "number" ? "251,146,60" : "255,255,255"}
                  variants={itemVariants}
                  className="glass-card !rounded-3xl p-10 sm:p-12 flex flex-col items-center justify-center text-center h-full"
                >
                  <p className="text-4xl sm:text-5xl md:text-6xl font-black text-gradient mb-4 group-hover:scale-110 transition-transform duration-500">
                    {stat.type === "number" ? (
                      <AnimatedCounter value={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix ?? ""} active={isStatsInView} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light text-white/40">
                    {stat.label}
                  </p>
                </TiltCard>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── SKILLS SECTION ── */}
      <section id="skills" className="relative min-h-screen flex items-center justify-center py-16 lg:py-24 sm:py-32 overflow-hidden w-full">
        <div className="relative w-full flex flex-col items-center">
          {/* ── Tech Strip ────────────────────────────── */}
          <TiltCard
            tilt={0}
            glowColor="251,146,60"
            style={{ y: techY }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="glass-card !rounded-none border-x-0 py-20 sm:py-28 md:py-36 overflow-hidden w-full flex flex-col items-center"
          >
            <div ref={techRef} className="absolute inset-0 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[800px] bg-[var(--accent-warm)]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[150px] pointer-events-none" />

            <motion.h3 variants={itemVariants} className="text-base sm:text-lg tracking-[0.5em] uppercase font-light text-white/30 mb-16 sm:mb-20 text-center">
              Core Technologies
            </motion.h3>

            <motion.div
              variants={itemVariants}
              className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            >
              <div className="flex w-max gap-8 sm:gap-12 animate-marquee">
                {[...skills, ...skills].map((skill, i) => (
                  <div
                    key={`${skill}-${i}`}
                    className="shrink-0 px-10 py-5 sm:px-14 sm:py-7 lg:px-20 lg:py-10 rounded-full border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 text-2xl sm:text-3xl lg:text-5xl font-light text-white/60 hover:text-white cursor-default hover:-translate-y-2 text-center"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>

            <style jsx>{`
              @keyframes marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 32s linear infinite;
              }
              .animate-marquee:hover {
                animation-play-state: paused;
              }
              @media (prefers-reduced-motion: reduce) {
                .animate-marquee {
                  animation: none;
                }
              }
            `}</style>
          </TiltCard>
        </div>
      </section>
    </div>
  );
}