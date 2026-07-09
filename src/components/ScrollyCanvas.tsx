"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Overlay from "./Overlay";

/* ──────────────────────────────────────────────
   Config
   ────────────────────────────────────────────── */
const TOTAL_FRAMES = 47; // frame1.png + 46 numbered frames

function getFramePath(index: number): string {
  if (index === 0) return "/sequence/frame1.png";
  const padded = String(index - 1).padStart(2, "0");
  return `/sequence/frame_${padded}_delay-0.066s.png`;
}

/* ──────────────────────────────────────────────
   ScrollyCanvas
   ────────────────────────────────────────────── */
export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef<number>(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  /* ── Scroll tracking ───────────────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  /* ── Draw frame on canvas (cover-fit) ──────── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;

    // Set internal resolution to match display * devicePixelRatio
    if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
      ctx.scale(dpr, dpr);
    }

    // Cover-fit calculation
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayW / displayH;

    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (canvasAspect > imgAspect) {
      drawW = displayW;
      drawH = displayW / imgAspect;
      drawX = 0;
      drawY = (displayH - drawH) / 2;
    } else {
      drawH = displayH;
      drawW = displayH * imgAspect;
      drawX = (displayW - drawW) / 2;
      drawY = 0;
    }

    ctx.clearRect(0, 0, displayW, displayH);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  /* ── Preload all frames ────────────────────── */
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
          drawFrame(0);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [drawFrame]);

  /* ── Listen to scroll → draw ───────────────── */
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.min(Math.round(latest), TOTAL_FRAMES - 1);
    if (index !== currentFrameRef.current) {
      currentFrameRef.current = index;
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => drawFrame(index));
    }
  });

  /* ── Handle resize ─────────────────────────── */
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  return (
    <section
      ref={containerRef}
      id="hero-sequence"
      className="relative w-full"
      style={{ height: "500vh" }}
    >
      {/* ── Sticky viewport ─────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading screen */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#0a0a12]">
            <div className="relative w-48 h-[2px] rounded-full overflow-hidden bg-white/[0.05]">
              <div
                className="loader-bar absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 font-light">
              Loading Experience — {loadProgress}%
            </p>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}
        />



        {/* Text overlays */}
        <div className="absolute inset-0 z-10">
          <Overlay containerRef={containerRef} />
        </div>
      </div>
    </section>
  );
}
