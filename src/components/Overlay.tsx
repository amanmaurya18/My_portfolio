"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: Hero (0% - 24% scroll, Left aligned)
  const opacity1 = useTransform(scrollYProgress, [0, 0.16, 0.24], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.24], [0, -35]);

  // Section 2: "Engineering High-Performance Web" (22% - 54% scroll, Left aligned)
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.32, 0.46, 0.54], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.32, 0.46, 0.54], [35, 0, 0, -35]);

  // Section 3: "Grounded in Core CS" (50% - 82% scroll, Right aligned)
  const opacity3 = useTransform(scrollYProgress, [0.50, 0.60, 0.74, 0.82], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.50, 0.60, 0.74, 0.82], [35, 0, 0, -35]);

  // Section 4: Gateway to Projects (80% - 100% scroll)
  const opacity4 = useTransform(scrollYProgress, [0.80, 0.90, 1], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.80, 0.90, 1], [30, 0, -8]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 select-none font-sans overflow-hidden">

      {/* SECTION 1: 0% - 24% Scroll - Hero (Left Aligned) */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-y-0 left-3 right-3 xs:left-4 xs:right-4 sm:right-auto sm:left-10 md:left-16 flex flex-col justify-center items-start max-w-lg text-left pointer-events-none"
      >
        <div className="p-4 xs:p-5 sm:p-7 rounded-2xl bg-[#161616]/90 backdrop-blur-xl border border-[#F2F1ED]/10 shadow-2xl flex flex-col items-start text-left w-full">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-2.5 xs:px-3 py-1 rounded-full bg-[#161616] border border-[#F2F1ED]/15 backdrop-blur-md mb-2.5 sm:mb-3 shadow-xl max-w-full">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#710014] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#710014]"></span>
            </span>
            <span className="text-[10px] xs:text-[11px] font-sans text-[#F2F1ED]/80 truncate">
              B.Tech CSE @ PSIT Kanpur &bull; Kanpur, India
            </span>
          </div>

          {/* Script Sub-flourish & Main Headline */}
          <span className="font-tempting text-xl xs:text-2xl sm:text-3xl text-[#710014] leading-none mb-1">
            portfolio of
          </span>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#F2F1ED] uppercase leading-[0.96] mb-2 drop-shadow-2xl font-sans">
            Aman Maurya<span className="text-[#710014]">.</span>
          </h1>

          <p className="text-[11px] xs:text-xs sm:text-sm font-sans uppercase tracking-widest text-[#710014] font-bold mb-2">
            Developer &amp; Systems Engineer
          </p>

          <p className="text-[11px] xs:text-xs sm:text-sm text-[#F2F1ED]/80 font-light leading-relaxed mb-3.5 sm:mb-4 drop-shadow-md">
            Architecting high-performance full-stack web applications, algorithmic software, and modern systems with precision and craft.
          </p>

          {/* Core Skill Tags */}
          <div className="flex flex-wrap items-center justify-start gap-1 xs:gap-1.5 text-[10px] xs:text-[11px] font-sans">
            <span className="px-2 xs:px-2.5 py-0.5 rounded-md bg-[#710014]/20 border border-[#710014]/50 text-[#F2F1ED] font-medium">
              Next.js
            </span>
            <span className="px-2 xs:px-2.5 py-0.5 rounded-md bg-[#F2F1ED]/5 border border-[#F2F1ED]/10 text-[#F2F1ED]/90">
              TypeScript
            </span>
            <span className="px-2 xs:px-2.5 py-0.5 rounded-md bg-[#F2F1ED]/5 border border-[#F2F1ED]/10 text-[#F2F1ED]/90">
              Python
            </span>
            <span className="px-2 xs:px-2.5 py-0.5 rounded-md bg-[#F2F1ED]/5 border border-[#F2F1ED]/10 text-[#F2F1ED]/90">
              C++
            </span>
            <span className="px-2 xs:px-2.5 py-0.5 rounded-md bg-[#710014]/20 border border-[#710014]/50 text-[#F2F1ED] font-medium">
              DSA
            </span>
          </div>
        </div>
      </motion.div>

      {/* Scroll Callout - Pinned to bottom */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute bottom-4 xs:bottom-6 sm:bottom-8 inset-x-0 flex flex-col items-center justify-center gap-1.5 text-[#F2F1ED]/60 text-[10px] xs:text-[11px] font-sans uppercase pointer-events-none"
      >
        <span className="tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-6 sm:h-7 rounded-full border border-[#F2F1ED]/25 flex items-start justify-center p-0.5"
        >
          <div className="w-1 h-1.5 bg-[#710014] rounded-full" />
        </motion.div>
      </motion.div>

      {/* SECTION 2: 22% - 54% Scroll - Left Aligned */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-y-0 left-3 right-3 xs:left-4 xs:right-4 sm:right-auto sm:left-10 md:left-16 flex flex-col justify-center items-start max-w-lg text-left pointer-events-none"
      >
        <div className="p-4 xs:p-5 sm:p-7 rounded-2xl bg-[#161616]/90 border border-[#F2F1ED]/10 backdrop-blur-xl shadow-2xl w-full">
          <span className="font-tempting text-xl xs:text-2xl sm:text-3xl text-[#710014] leading-none mb-1 block">
            modern craft
          </span>

          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#F2F1ED] mb-2 sm:mb-2.5 leading-tight uppercase font-sans">
            Engineering High-Performance <br />
            <span className="text-[#710014]">
              Web &amp; Architectures.
            </span>
          </h2>

          <p className="text-[11px] xs:text-xs sm:text-sm text-[#F2F1ED]/80 font-light leading-relaxed mb-3.5 sm:mb-4">
            Specializing in modern, type-safe Next.js architectures, scalable component libraries, and robust full-stack software development.
          </p>

          <div className="grid grid-cols-2 gap-1.5 xs:gap-2 pt-3 border-t border-[#F2F1ED]/10 text-[10px] xs:text-[11px] font-sans">
            <div className="flex items-center gap-1.5 text-[#F2F1ED]/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#710014] shrink-0" />
              <span className="truncate">Next.js 14 App Router</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#F2F1ED]/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#710014] shrink-0" />
              <span className="truncate">Type-Safe TypeScript</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#F2F1ED]/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#710014] shrink-0" />
              <span className="truncate">REST &amp; API Systems</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#F2F1ED]/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#710014] shrink-0" />
              <span className="truncate">Sub-Second Latency</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SECTION 3: 50% - 82% Scroll - Right Aligned */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-y-0 left-3 right-3 xs:left-4 xs:right-4 sm:left-auto sm:right-10 md:right-16 flex flex-col justify-center items-end max-w-lg text-right ml-auto pointer-events-none"
      >
        <div className="p-4 xs:p-5 sm:p-7 rounded-2xl bg-[#161616]/90 border border-[#F2F1ED]/10 backdrop-blur-xl shadow-2xl w-full">
          <span className="font-tempting text-xl xs:text-2xl sm:text-3xl text-[#710014] leading-none mb-1 block">
            algorithmic foundations
          </span>

          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#F2F1ED] mb-2 sm:mb-2.5 leading-tight uppercase font-sans">
            Grounded in Core <br />
            <span className="text-[#710014]">
              Computer Science.
            </span>
          </h2>

          <p className="text-[11px] xs:text-xs sm:text-sm text-[#F2F1ED]/80 font-light leading-relaxed mb-3.5 sm:mb-4">
            Strong foundation in Data Structures, Algorithms, DBMS, and OOP with C/C++ and Python, transforming algorithmic logic into production software.
          </p>

          <div className="flex flex-col gap-1.5 pt-3 border-t border-[#F2F1ED]/10 text-[10px] xs:text-[11px] font-sans">
            <div className="flex items-center justify-end gap-2 text-[#F2F1ED]/90">
              <span className="text-[#F2F1ED]/60">Data Structures:</span>
              <span className="text-[#710014] font-bold">Graphs, Trees &amp; DP</span>
            </div>
            <div className="flex items-center justify-end gap-2 text-[#F2F1ED]/90">
              <span className="text-[#F2F1ED]/60">Core Languages:</span>
              <span className="text-[#710014] font-bold">C, C++, Python, SQL</span>
            </div>
            <div className="flex items-center justify-end gap-2 text-[#F2F1ED]/90">
              <span className="text-[#F2F1ED]/60">Engineering Focus:</span>
              <span className="text-[#710014] font-bold">Algorithmic Efficiency</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SECTION 4: 80% - 100% Scroll - Gateway to Work Grid */}
      <motion.div
        style={{ opacity: opacity4, y: y4 }}
        className="absolute inset-x-0 bottom-8 xs:bottom-10 sm:bottom-16 md:bottom-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
      >
        <div className="max-w-md mx-auto flex flex-col items-center">
          <button
            onClick={() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="pointer-events-auto btn-primary mb-3 text-xs !py-2 !px-4"
          >
            <span>Explore Selected Works</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-1.5 text-[#F2F1ED]/60 text-[10px] xs:text-xs font-sans uppercase tracking-widest"
          >
            <span>Scroll for projects</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#710014]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
