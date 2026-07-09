import type { Metadata } from "next";
import ChapterNav from "@/components/about/ChapterNav";
import AboutChapters from "@/components/about/AboutChapters";
import HobbiesChapters from "@/components/hobbies/HobbiesChapters";

export const metadata: Metadata = {
  title: "About — Tharun R",
  description:
    "The full story of Tharun R — who he is, what drives him, his skills, and all his hobbies from Rubik's cube solving to video editing.",
  openGraph: {
    title: "About — Tharun R",
    description: "Get to know Tharun R beyond the resume.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Sticky chapter progress nav */}
      <ChapterNav />

      {/* About chapters: Who I Am → What Drives Me → Skills → Timeline → Beyond the Screen */}
      <AboutChapters />

      {/* Separator — "Hobbies" label */}
      <div
        className="relative flex items-center justify-center py-16 overflow-hidden"
        style={{ background: "var(--bg-surface)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(232,115,74,0.04), transparent 70%)",
          }}
        />
        <p
          className="text-xs tracking-[1em] uppercase z-10"
          style={{
            color: "rgba(240,236,228,0.2)",
            fontFamily: "var(--font-body)",
          }}
        >
          Hobbies
        </p>
      </div>

      {/* Hobbies chapters: 9 sub-chapters */}
      <HobbiesChapters />
    </main>
  );
}
