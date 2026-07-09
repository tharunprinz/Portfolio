import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import ChapterNav from "@/components/about/ChapterNav";
import AboutChapters from "@/components/about/AboutChapters";
import HobbiesChapters from "@/components/hobbies/HobbiesChapters";

export default function Home() {
  return (
    <main className="relative">
      {/* Sticky chapter progress nav — tracks all About & Hobbies sections */}
      <ChapterNav />

      {/* Hero — scroll-driven animation sequence */}
      <Navbar />
      <ScrollyCanvas />

      {/* Projects */}
      <Projects />

      {/* ── About Chapters ──────────────────────────────
          Chapter 01: Who I Am
          Chapter 02: What Drives Me
          Chapter 03: Skills & Tools
          Chapter 04: Timeline
          Chapter 05: Beyond the Screen
      ─────────────────────────────────────────────── */}
      <AboutChapters />

      {/* ── Hobbies Separator ──────────────────────── */}
      <div
        className="flex items-center justify-center py-12 border-t border-b"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
      >
        <p
          className="text-[10px] tracking-[1em] uppercase"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
        >
          Hobbies
        </p>
      </div>

      {/* ── Hobbies Chapters ────────────────────────────
          Rubik's Cube Solver · Troubleshooting · Content Creator
          Dancer · Video Editor · Philosophy
      ─────────────────────────────────────────────── */}
      <HobbiesChapters />

      {/* Footer / Contact CTA */}
      <Footer />
    </main>
  );
}

