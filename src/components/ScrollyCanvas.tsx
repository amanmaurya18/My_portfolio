"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { SEQUENCE_FRAMES, TOTAL_FRAMES } from "@/data/sequenceFrames";
import Overlay from "@/components/Overlay";

interface ScrollyCanvasProps {
  children?: React.ReactNode;
  onProgressChange?: (progress: number) => void;
}

export default function ScrollyCanvas({ children, onProgressChange }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameIndexRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  // Framer Motion useScroll mapped to the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Draw frame with object-fit: cover and high-DPI handling
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Search outwards from frameIndex for nearest loaded frame
    let activeImg: HTMLImageElement | null = imagesRef.current[frameIndex] || null;

    if (!activeImg || !activeImg.complete || activeImg.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[frameIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          activeImg = prev;
          break;
        }
        const next = imagesRef.current[frameIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          activeImg = next;
          break;
        }
      }
    }

    if (!activeImg || !activeImg.complete || activeImg.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    // Adjust canvas buffer size for Retina crispness
    const targetWidth = Math.floor(displayWidth * dpr);
    const targetHeight = Math.floor(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Object-fit: cover calculation
    const imgWidth = activeImg.naturalWidth;
    const imgHeight = activeImg.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = displayWidth / displayHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgRatio;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgRatio;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      activeImg,
      Math.round(offsetX),
      Math.round(offsetY),
      Math.round(drawWidth),
      Math.round(drawHeight)
    );
    ctx.restore();
  }, []);

  // Preload all sequence images once on mount
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    SEQUENCE_FRAMES.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (isCancelled) return;
        loadedImages[idx] = img;
        imagesRef.current = loadedImages;
        setLoadedCount((prev) => prev + 1);

        if (idx === 0) {
          requestAnimationFrame(() => {
            drawFrame(0);
          });
        } else if (idx === currentFrameIndexRef.current) {
          requestAnimationFrame(() => {
            drawFrame(idx);
          });
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        setLoadedCount((prev) => prev + 1);
      };
    });

    imagesRef.current = loadedImages;

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Handle window resize & initial mount render
  useEffect(() => {
    const handleResize = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        drawFrame(currentFrameIndexRef.current);
      });
    };

    window.addEventListener("resize", handleResize);
    // Draw initial frame once mounted
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Listen to scroll progress and scrub frames
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!hasScrolled && progress > 0.01) {
      setHasScrolled(true);
    }

    if (onProgressChange) {
      onProgressChange(progress);
    }

    const targetIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
    );

    if (targetIndex !== currentFrameIndexRef.current) {
      currentFrameIndexRef.current = targetIndex;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        drawFrame(targetIndex);
      });
    }
  });

  // Calculate preloading percentage
  const loadPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);
  const isFullyLoaded = loadedCount >= TOTAL_FRAMES;

  return (
    <div
      ref={containerRef}
      id="experience"
      className="relative h-[320vh] w-full bg-[#161616]"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#161616]">
        {/* Canvas element */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full block select-none pointer-events-none"
        />

        {/* Cinematic Vignette & Ambient Color Grading Overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(22, 22, 22, 0.45) 75%, rgba(22, 22, 22, 0.9) 100%)",
          }}
        />

        {/* Ambient Top & Bottom Seamless Blending Gradient */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#161616] via-[#161616]/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#161616] via-[#161616]/80 to-transparent" />

        {/* Parallax Content Overlay & Children */}
        <Overlay scrollYProgress={scrollYProgress} />
        {children}

        {/* Subtle Ambient Experience Indicator */}
        <div className="pointer-events-none absolute bottom-8 left-8 hidden sm:flex items-center gap-2 text-xs font-sans text-[#F2F1ED]/50 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#710014]" />
          <span>Interactive Experience</span>
        </div>

        {/* Subtle Preloader Progress */}
        <AnimatePresence>
          {!isFullyLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="pointer-events-none absolute bottom-0 left-0 right-0 z-40 p-3 bg-gradient-to-t from-[#161616] to-transparent"
            >
              <div className="max-w-xs mx-auto flex flex-col items-center gap-1.5">
                <div className="flex justify-between w-full text-[10px] uppercase font-sans tracking-widest text-[#F2F1ED]/70">
                  <span>Preloading Stream</span>
                  <span className="text-[#710014] font-bold">{loadPercentage}%</span>
                </div>
                <div className="w-full h-1 bg-[#161616] rounded-full overflow-hidden border border-[#F2F1ED]/10">
                  <motion.div
                    className="h-full bg-[#710014] rounded-full"
                    style={{ width: `${loadPercentage}%` }}
                    transition={{ ease: "easeOut", duration: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
