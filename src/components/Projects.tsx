"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { PROJECTS, Project } from "@/data/projects";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Active project index for mobile interactive showcase
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);

  const projectCount = PROJECTS.length;

  // Track scroll progress within the sticky track (Desktop)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth physics spring for 3D turntable motion on desktop
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.8,
    restDelta: 0.001,
  });

  // Calculate current active project index on desktop based on progress
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const idx = Math.min(
        projectCount - 1,
        Math.max(0, Math.round(latest * (projectCount - 1)))
      );
      setActiveIdx(idx);
    });
  }, [smoothProgress, projectCount]);

  // Desktop 3D Turntable geometry
  const radius = 350;
  const angleStep = 52;
  const yStep = 24;
  const totalAngle = (projectCount - 1) * angleStep;
  const totalY = (projectCount - 1) * yStep;

  const turntableRotateY = useTransform(smoothProgress, [0, 1], [0, -totalAngle]);
  const turntableTranslateY = useTransform(smoothProgress, [0, 1], [0, -totalY]);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        setMobileActiveIdx((prev) => Math.min(projectCount - 1, prev + 1));
      } else {
        setMobileActiveIdx((prev) => Math.max(0, prev - 1));
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Programmatic jump for desktop 3D turntable
  const jumpToProjectDesktop = (targetIndex: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const containerHeight = container.offsetHeight - window.innerHeight;
    const targetScrollY = containerTop + (targetIndex / (projectCount - 1)) * containerHeight;
    window.scrollTo({
      top: Math.max(0, targetScrollY),
      behavior: "smooth",
    });
  };

  const currentMobileProject = PROJECTS[mobileActiveIdx];

  return (
    <section id="projects" className="relative w-full bg-[#161616] text-[#F2F1ED] z-20 font-sans">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/4 left-5 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#710014]/15 rounded-full blur-[120px] sm:blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-5 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#710014]/10 rounded-full blur-[120px] sm:blur-[140px]" />

      {/* ============================================================ */}
      {/* 1. MOBILE VIEW (< md): Sleek, Zero-Empty-Space Showcase       */}
      {/* ============================================================ */}
      <div className="block md:hidden py-12 xs:py-16 px-3 xs:px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#710014]/20 border border-[#710014]/40 text-[10px] xs:text-[11px] font-sans uppercase tracking-widest text-[#F2F1ED] mb-2 shadow-[0_0_12px_rgba(113,0,20,0.3)]">
              <Sparkles className="w-3 h-3 text-[#710014]" />
              <span className="font-tempting text-xs xs:text-sm normal-case mr-1 text-[#F2F1ED]">selected</span>
              <span>Works &bull; 0{mobileActiveIdx + 1}/0{projectCount}</span>
            </div>

            <h2 className="text-2xl xs:text-3xl font-black text-[#F2F1ED] tracking-tight uppercase mb-1">
              My <span className="text-[#710014]">Projects</span>
            </h2>
            <p className="text-[11px] xs:text-xs text-[#F2F1ED]/70 font-light">
              Swipe or tap below to explore engineered case studies.
            </p>
          </div>

          {/* Project Quick Tabs */}
          <div className="grid grid-cols-4 gap-1.5 mb-4">
            {PROJECTS.map((p, i) => {
              const isActive = mobileActiveIdx === i;
              return (
                <button
                  key={p.id}
                  onClick={() => setMobileActiveIdx(i)}
                  className={`py-1.5 px-1 rounded-xl text-center border transition-all text-xs font-sans ${
                    isActive
                      ? "bg-[#710014] border-[#710014] text-[#F2F1ED] font-bold shadow-[0_0_12px_rgba(113,0,20,0.5)]"
                      : "bg-[#161616] border-[#F2F1ED]/10 text-[#F2F1ED]/60 hover:text-[#F2F1ED]"
                  }`}
                >
                  <span className="block text-[9px] uppercase tracking-wider font-mono">
                    0{i + 1}
                  </span>
                  <span className="block text-[10px] font-semibold truncate">
                    {p.title.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Mobile Project Card with Touch Swipe */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="touch-pan-y relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMobileProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="relative rounded-2xl p-4 xs:p-5 bg-[#161616] border border-[#710014]/60 shadow-[0_0_25px_rgba(113,0,20,0.25)] flex flex-col justify-between overflow-hidden"
              >
                {/* Background Ambient Glow */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-50 rounded-2xl"
                  style={{ background: currentMobileProject.gradient }}
                />

                {/* Top Meta Bar */}
                <div className="relative z-10 flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans text-[11px] font-bold text-[#710014]">
                      /0{mobileActiveIdx + 1}
                    </span>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#F2F1ED]/70 truncate max-w-[170px]">
                      {currentMobileProject.category}
                    </span>
                  </div>
                  <span className="font-sans text-[9px] text-[#F2F1ED]/70 px-2 py-0.5 rounded-full border border-[#F2F1ED]/10 bg-[#161616]">
                    {currentMobileProject.year}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="relative z-10 mb-3">
                  <h3 className="text-lg xs:text-xl font-bold text-[#F2F1ED] mb-0.5">
                    {currentMobileProject.title}
                  </h3>
                  <p className="text-[11px] font-sans uppercase tracking-wider text-[#710014] font-semibold mb-2">
                    {currentMobileProject.subtitle}
                  </p>
                  <p className="text-xs text-[#F2F1ED]/80 leading-relaxed font-light">
                    {currentMobileProject.description}
                  </p>
                </div>

                {/* Verified Telemetry Box */}
                <div className="relative z-10 rounded-xl p-2.5 bg-[#161616]/90 border border-[#F2F1ED]/10 flex flex-col gap-1.5 mb-3">
                  <div className="grid grid-cols-3 gap-1 text-center">
                    {currentMobileProject.metrics.map((metric) => (
                      <div key={metric.label} className="flex flex-col">
                        <span className="text-[8px] font-sans uppercase tracking-wider text-[#F2F1ED]/50 truncate">
                          {metric.label}
                        </span>
                        <span className="text-[10px] xs:text-[11px] font-sans font-bold text-[#F2F1ED] truncate">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-[#F2F1ED]/10 text-[9px] font-sans text-[#F2F1ED]/60">
                    <span className="truncate max-w-[150px]">Role: {currentMobileProject.role}</span>
                    <span className="text-[#710014] flex items-center gap-1 shrink-0 font-semibold">
                      <CheckCircle2 className="w-2.5 h-2.5 text-[#710014]" /> Verified
                    </span>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="relative z-10 flex flex-wrap gap-1 mb-4">
                  {currentMobileProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[9px] xs:text-[10px] font-sans text-[#F2F1ED]/80 bg-[#161616] border border-[#F2F1ED]/10 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="relative z-10 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2 pt-3 border-t border-[#F2F1ED]/10">
                  <button
                    onClick={() => setSelectedProject(currentMobileProject)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#710014] hover:bg-[#8c0019] text-[#F2F1ED] font-semibold text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    <span>Architectural Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center justify-center gap-2">
                    {currentMobileProject.githubUrl && (
                      <a
                        href={currentMobileProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 xs:flex-initial p-2 rounded-xl bg-[#161616] hover:bg-[#710014]/20 border border-[#F2F1ED]/15 text-[#F2F1ED]/90 hover:text-[#F2F1ED] transition-all flex items-center justify-center gap-1.5 text-xs font-sans"
                        aria-label="View Source on GitHub"
                      >
                        <GithubIcon className="w-3.5 h-3.5 text-[#F2F1ED]" />
                        <span className="xs:hidden">Code</span>
                      </a>
                    )}
                    {currentMobileProject.liveUrl && (
                      <a
                        href={currentMobileProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 xs:flex-initial p-2 rounded-xl bg-[#161616] hover:bg-[#710014]/20 border border-[#F2F1ED]/15 text-[#F2F1ED]/90 hover:text-[#F2F1ED] transition-all flex items-center justify-center gap-1.5 text-xs font-sans"
                        aria-label="Visit Live Project"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#710014]" />
                        <span className="xs:hidden">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Bottom Navigation & Controls */}
          <div className="flex items-center justify-between mt-4 px-1">
            <button
              onClick={() => setMobileActiveIdx((prev) => Math.max(0, prev - 1))}
              disabled={mobileActiveIdx === 0}
              className="p-2 rounded-xl bg-[#161616] border border-[#F2F1ED]/10 text-[#F2F1ED]/80 hover:text-[#F2F1ED] disabled:opacity-30 disabled:pointer-events-none transition-all"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setMobileActiveIdx(i)}
                  aria-label={`Jump to ${p.title}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    mobileActiveIdx === i
                      ? "w-7 bg-[#710014] shadow-[0_0_8px_rgba(113,0,20,0.8)]"
                      : "w-2 bg-[#F2F1ED]/20 hover:bg-[#F2F1ED]/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setMobileActiveIdx((prev) => Math.min(projectCount - 1, prev + 1))}
              disabled={mobileActiveIdx === projectCount - 1}
              className="p-2 rounded-xl bg-[#161616] border border-[#F2F1ED]/10 text-[#F2F1ED]/80 hover:text-[#F2F1ED] disabled:opacity-30 disabled:pointer-events-none transition-all"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. DESKTOP VIEW (md+): Interactive 3D Spiral Turntable        */}
      {/* ============================================================ */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full min-h-[300vh]"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-8 md:px-12 pt-20 pb-6">
          {/* Top Header */}
          <div className="relative z-30 max-w-6xl w-full mx-auto flex items-end justify-between gap-3 pt-1">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#710014]/20 border border-[#710014]/40 text-xs font-sans uppercase tracking-widest text-[#F2F1ED] mb-1.5 shadow-[0_0_12px_rgba(113,0,20,0.3)]">
                <Sparkles className="w-3 h-3 text-[#710014]" />
                <span className="font-tempting text-sm normal-case mr-1 text-[#F2F1ED]">selected</span>
                <span>Works &bull; 3D Spiral</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-black text-[#F2F1ED] tracking-tight uppercase">
                My <span className="text-[#710014]">Projects</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-[#161616]/80 border border-[#F2F1ED]/10 px-3 py-1 rounded-full text-xs font-sans text-[#F2F1ED]/70 backdrop-blur-md">
              <Layers className="w-3.5 h-3.5 text-[#710014] shrink-0" />
              <span>Scroll down to rotate 3D spiral</span>
            </div>
          </div>

          {/* 3D Spiral Arena Container */}
          <div
            className="relative z-20 flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-auto"
            style={{
              perspective: "1150px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            <motion.div
              className="relative flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                rotateY: turntableRotateY,
                y: turntableTranslateY,
              }}
            >
              {PROJECTS.map((project, idx) => {
                const indexStr = String(idx + 1).padStart(2, "0");
                const cardAngle = idx * angleStep;
                const cardY = idx * yStep;
                const isActive = activeIdx === idx;
                const distFromActive = Math.abs(activeIdx - idx);

                return (
                  <div
                    key={project.id}
                    className="absolute transition-all duration-300"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) translateY(${cardY}px)`,
                      zIndex: isActive ? 40 : Math.max(1, 20 - distFromActive),
                    }}
                    onClick={() => {
                      if (!isActive) {
                        jumpToProjectDesktop(idx);
                      } else {
                        setSelectedProject(project);
                      }
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, z: 20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{
                        height: "320px",
                        opacity: isActive ? 1 : Math.max(0.35, 0.9 - distFromActive * 0.25),
                        filter: isActive ? "none" : `blur(${Math.min(2.5, distFromActive * 1.2)}px)`,
                      }}
                      className={`relative w-[340px] lg:w-[360px] rounded-xl p-4 bg-[#161616]/95 border backdrop-blur-2xl transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden select-none cursor-pointer ${
                        isActive
                          ? "border-[#710014] shadow-[0_0_35px_rgba(113,0,20,0.4)] ring-1 ring-[#710014]/60"
                          : "border-[#F2F1ED]/10 hover:border-[#710014]/50 hover:opacity-100"
                      }`}
                    >
                      {/* Gradient */}
                      <div
                        className="pointer-events-none absolute -inset-px opacity-60 rounded-xl"
                        style={{ background: project.gradient }}
                      />

                      {/* Top Bar */}
                      <div className="relative z-10 flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-sans text-xs font-bold text-[#710014]">
                            /{indexStr}
                          </span>
                          <span className="text-[10px] font-sans uppercase tracking-wider text-[#F2F1ED]/60 truncate max-w-[170px]">
                            {project.category}
                          </span>
                        </div>
                        <span className="font-sans text-[9px] text-[#F2F1ED]/70 px-2 py-0.5 rounded-full border border-[#F2F1ED]/10 bg-[#161616]">
                          {project.year}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="relative z-10 mb-1">
                        <h3 className="text-base font-bold text-[#F2F1ED] mb-0.5 line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-[11px] font-sans uppercase tracking-wider text-[#710014] font-semibold mb-1 line-clamp-1">
                          {project.subtitle}
                        </p>
                        <p className="text-[11px] text-[#F2F1ED]/80 leading-snug font-light line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Verified Telemetry Box */}
                      <div className="relative z-10 rounded-lg p-2 bg-[#161616] border border-[#F2F1ED]/10 flex flex-col gap-1 my-0.5">
                        <div className="grid grid-cols-3 gap-1 text-center">
                          {project.metrics.map((metric) => (
                            <div key={metric.label} className="flex flex-col">
                              <span className="text-[8px] font-sans uppercase tracking-wider text-[#F2F1ED]/50 truncate">
                                {metric.label}
                              </span>
                              <span className="text-[10px] font-sans font-bold text-[#F2F1ED] truncate">
                                {metric.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-[#F2F1ED]/10 text-[9px] font-sans text-[#F2F1ED]/60">
                          <span className="truncate max-w-[130px]">Role: {project.role}</span>
                          <span className="text-[#710014] flex items-center gap-1 shrink-0 font-semibold">
                            <CheckCircle2 className="w-2.5 h-2.5 text-[#710014]" /> Verified
                          </span>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="relative z-10 flex flex-wrap gap-1 mb-1">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-1.5 py-0.5 text-[9px] font-sans text-[#F2F1ED]/80 bg-[#161616] border border-[#F2F1ED]/10 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Footer */}
                      <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-[#F2F1ED]/10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#F2F1ED] hover:text-[#710014] transition-colors"
                        >
                          <span>Architectural Specs</span>
                          <ArrowUpRight className="w-3 h-3 text-[#710014]" />
                        </button>

                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 rounded-lg bg-[#161616] hover:bg-[#710014]/20 border border-[#F2F1ED]/10 hover:border-[#710014] text-[#F2F1ED]/80 hover:text-[#F2F1ED] transition-all"
                              aria-label="View Source on GitHub"
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 rounded-lg bg-[#161616] hover:bg-[#710014]/20 border border-[#F2F1ED]/10 hover:border-[#710014] text-[#F2F1ED]/80 hover:text-[#F2F1ED] transition-all"
                              aria-label="Visit Live Project"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom HUD */}
          <div className="relative z-30 max-w-6xl w-full mx-auto flex items-center justify-between gap-2.5 pt-1">
            <div className="flex items-center gap-2.5 bg-[#161616]/90 backdrop-blur-xl border border-[#F2F1ED]/10 px-3.5 py-1.5 rounded-xl shadow-lg">
              <span className="font-sans text-xs text-[#710014] font-bold">
                {String(activeIdx + 1).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}
              </span>
              <span className="w-px h-3 bg-[#F2F1ED]/20" />
              <span className="text-xs font-semibold text-[#F2F1ED] truncate max-w-[220px]">
                {PROJECTS[activeIdx]?.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => jumpToProjectDesktop(Math.max(0, activeIdx - 1))}
                disabled={activeIdx === 0}
                aria-label="Previous Project"
                className="p-1.5 rounded-lg bg-[#161616] hover:bg-[#710014]/20 border border-[#F2F1ED]/10 text-[#F2F1ED]/80 hover:text-[#F2F1ED] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#161616] border border-[#F2F1ED]/10 backdrop-blur-md">
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => jumpToProjectDesktop(i)}
                    aria-label={`Jump to project ${p.title}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIdx === i
                        ? "w-6 bg-[#710014] shadow-[0_0_8px_rgba(113,0,20,0.8)]"
                        : "w-1.5 bg-[#F2F1ED]/20 hover:bg-[#F2F1ED]/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => jumpToProjectDesktop(Math.min(projectCount - 1, activeIdx + 1))}
                disabled={activeIdx === projectCount - 1}
                aria-label="Next Project"
                className="p-1.5 rounded-lg bg-[#161616] hover:bg-[#710014]/20 border border-[#F2F1ED]/10 text-[#F2F1ED]/80 hover:text-[#F2F1ED] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. CASE STUDY DETAIL MODAL (Shared Across Mobile & Desktop)   */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#161616]/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
              className="relative w-full max-w-2xl rounded-2xl bg-[#161616] border border-[#F2F1ED]/20 p-4 xs:p-5 sm:p-7 shadow-2xl max-h-[88vh] max-h-[88dvh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-full bg-[#161616] hover:bg-[#710014]/30 text-[#F2F1ED]/70 hover:text-[#F2F1ED] transition-colors border border-[#F2F1ED]/10 z-10"
                aria-label="Close Case Study"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-4 pr-8">
                <div className="inline-flex items-center gap-2 text-[10px] xs:text-[11px] font-sans uppercase tracking-widest text-[#710014] font-bold mb-1.5">
                  <span>{selectedProject.category}</span>
                  <span className="text-[#F2F1ED]/30">&bull;</span>
                  <span>{selectedProject.year}</span>
                </div>
                <h3 className="text-xl xs:text-2xl sm:text-3xl font-black text-[#F2F1ED] mb-1">
                  {selectedProject.title}
                </h3>
                <p className="text-[11px] xs:text-xs font-sans text-[#F2F1ED]/60 uppercase tracking-wider">
                  {selectedProject.subtitle}
                </p>
              </div>

              <div className="mb-4 xs:mb-5">
                <h4 className="text-[10px] xs:text-[11px] font-sans uppercase tracking-wider text-[#710014] font-semibold mb-1.5">
                  Architectural Summary
                </h4>
                <p className="text-xs xs:text-sm text-[#F2F1ED]/80 leading-relaxed font-light">
                  {selectedProject.description}
                </p>
              </div>

              <div className="mb-4 xs:mb-5">
                <h4 className="text-[10px] xs:text-[11px] font-sans uppercase tracking-wider text-[#710014] font-semibold mb-2">
                  Core Engineering Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedProject.deliverables.map((item) => (
                    <div
                      key={item}
                      className="p-2 xs:p-2.5 rounded-lg bg-[#161616] border border-[#F2F1ED]/10 flex items-center gap-2 text-[11px] xs:text-xs font-sans text-[#F2F1ED]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#710014] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4 xs:mb-5">
                <h4 className="text-[10px] xs:text-[11px] font-sans uppercase tracking-wider text-[#710014] font-semibold mb-2">
                  Verified Performance Telemetry
                </h4>
                <div className="grid grid-cols-3 gap-1.5 xs:gap-3 p-2.5 xs:p-3 rounded-xl bg-[#161616] border border-[#F2F1ED]/10">
                  {selectedProject.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-sm xs:text-lg sm:text-xl font-bold font-sans text-[#F2F1ED] truncate">{m.value}</div>
                      <div className="text-[8px] xs:text-[10px] font-sans text-[#F2F1ED]/50 uppercase mt-0.5 truncate">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <h4 className="text-[10px] xs:text-[11px] font-sans uppercase tracking-wider text-[#710014] font-semibold mb-2">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1 xs:gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 xs:px-2.5 py-0.5 xs:py-1 text-[11px] xs:text-xs font-sans text-[#F2F1ED] bg-[#161616] border border-[#F2F1ED]/15 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-4 sm:pt-6 border-t border-[#F2F1ED]/10">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#710014] hover:bg-[#8c0019] text-[#F2F1ED] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#710014]/30 text-center"
                  >
                    <span>Visit Live Experience</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#161616] hover:bg-[#710014]/20 text-[#F2F1ED] font-semibold text-xs uppercase tracking-wider transition-all duration-300 border border-[#F2F1ED]/15 text-center"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
