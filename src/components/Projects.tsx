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
  const [windowWidth, setWindowWidth] = useState(1200);

  // Track window dimensions for responsive 3D spiral radius and layout
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const projectCount = PROJECTS.length;

  // Track scroll progress within the sticky track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth physics spring for 3D turntable motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    mass: 0.8,
    restDelta: 0.001,
  });

  // Calculate current active project index based on progress
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

  // Scaled down spiral geometry so entire component fits comfortably in any viewport
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  
  const radius = isMobile ? 210 : isTablet ? 290 : 360;
  const angleStep = isMobile ? 48 : 52;
  const yStep = isMobile ? 20 : 28;
  const totalAngle = (projectCount - 1) * angleStep;
  const totalY = (projectCount - 1) * yStep;

  // Turntable transforms driven by scroll
  const turntableRotateY = useTransform(smoothProgress, [0, 1], [0, -totalAngle]);
  const turntableTranslateY = useTransform(smoothProgress, [0, 1], [0, -totalY]);

  // Programmatic jump to project index
  const jumpToProject = (targetIndex: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight - window.innerHeight;
    const targetScrollY = containerTop + (targetIndex / (projectCount - 1)) * containerHeight;
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-[#161616] text-[#F2F1ED] z-20 min-h-[340vh] font-sans"
    >
      {/* Ambient background glows with Crimson Red */}
      <div className="pointer-events-none fixed top-1/4 left-10 w-[450px] h-[450px] bg-[#710014]/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none fixed bottom-1/4 right-10 w-[450px] h-[450px] bg-[#710014]/10 rounded-full blur-[140px]" />

      {/* Sticky 3D Viewport: Fits cleanly within screen height */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 md:px-12 pt-16 pb-4 sm:pb-6">
        
        {/* Top Header */}
        <div className="relative z-30 max-w-6xl w-full mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-2">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#710014]/20 border border-[#710014]/40 text-[11px] font-sans uppercase tracking-widest text-[#F2F1ED] mb-1.5 shadow-[0_0_12px_rgba(113,0,20,0.3)]">
              <Sparkles className="w-3 h-3 text-[#710014]" />
              <span className="font-tempting text-sm normal-case mr-1 text-[#F2F1ED]">selected</span>
              <span>Works &bull; 3D Spiral</span>
            </div>

            <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-[#F2F1ED] tracking-tight uppercase">
              My{" "}
              <span className="text-[#710014]">
                Projects
              </span>
            </h2>
          </div>

          {/* Quick HUD Guide */}
          <div className="flex items-center gap-2 bg-[#161616]/80 border border-[#F2F1ED]/10 px-3 py-1 rounded-full text-xs font-sans text-[#F2F1ED]/70 backdrop-blur-md self-start sm:self-end">
            <Layers className="w-3.5 h-3.5 text-[#710014] shrink-0" />
            <span className="text-[11px]">Scroll down to rotate 3D spiral</span>
          </div>
        </div>

        {/* 3D Spiral Arena Container */}
        <div
          className="relative z-20 flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-auto"
          style={{
            perspective: isMobile ? "850px" : "1150px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* Central Rotating Rig */}
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
                      jumpToProject(idx);
                    } else {
                      setSelectedProject(project);
                    }
                  }}
                >
                  {/* The Project Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, z: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      height: isMobile ? "295px" : "315px",
                      opacity: isActive ? 1 : Math.max(0.4, 0.9 - distFromActive * 0.25),
                      filter: isActive ? "none" : `blur(${Math.min(2.5, distFromActive * 1.2)}px)`,
                    }}
                    className={`relative w-[260px] sm:w-[300px] md:w-[330px] lg:w-[350px] rounded-xl p-3.5 sm:p-4 bg-[#161616]/95 border backdrop-blur-2xl transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden select-none cursor-pointer ${
                      isActive
                        ? "border-[#710014] shadow-[0_0_35px_rgba(113,0,20,0.4)] ring-1 ring-[#710014]/60"
                        : "border-[#F2F1ED]/10 hover:border-[#710014]/50 hover:opacity-100"
                    }`}
                  >
                    {/* Atmospheric Project Gradient Glow */}
                    <div
                      className="pointer-events-none absolute -inset-px opacity-60 group-hover:opacity-100 transition-opacity duration-700 rounded-xl"
                      style={{ background: project.gradient }}
                    />

                    {/* Top Bar: Index, Category, Year */}
                    <div className="relative z-10 flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans text-[11px] font-bold text-[#710014]">
                          /{indexStr}
                        </span>
                        <span className="text-[10px] font-sans uppercase tracking-wider text-[#F2F1ED]/60 truncate max-w-[150px]">
                          {project.category}
                        </span>
                      </div>
                      <span className="font-sans text-[9px] text-[#F2F1ED]/70 px-2 py-0.5 rounded-full border border-[#F2F1ED]/10 bg-[#161616]">
                        {project.year}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="relative z-10 mb-1">
                      <h3 className="text-sm sm:text-base font-bold text-[#F2F1ED] group-hover:text-[#F2F1ED] transition-colors duration-300 mb-0.5 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] font-sans uppercase tracking-wider text-[#710014] font-semibold mb-1 line-clamp-1">
                        {project.subtitle}
                      </p>
                      <p className="text-[11px] text-[#F2F1ED]/80 leading-snug font-light line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Verified Telemetry Box */}
                    <div className="relative z-10 rounded-lg p-2 bg-[#161616] border border-[#F2F1ED]/10 flex flex-col gap-1 my-0.5">
                      <div className="grid grid-cols-3 gap-1 text-center sm:text-left">
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

                    {/* Tech Stack Pills */}
                    <div className="relative z-10 flex flex-wrap gap-1 mb-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 text-[9px] font-sans text-[#F2F1ED]/80 bg-[#161616] border border-[#F2F1ED]/10 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-1 py-0.5 text-[8px] font-sans text-[#F2F1ED]/50 bg-[#161616] border border-[#F2F1ED]/10 rounded">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
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

        {/* Bottom Floating Spiral Navigation HUD */}
        <div className="relative z-30 max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1">
          {/* Current Focus Pill */}
          <div className="flex items-center gap-2.5 bg-[#161616]/90 backdrop-blur-xl border border-[#F2F1ED]/10 px-3.5 py-1.5 rounded-xl shadow-lg">
            <span className="font-sans text-xs text-[#710014] font-bold">
              {String(activeIdx + 1).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}
            </span>
            <span className="w-px h-3 bg-[#F2F1ED]/20" />
            <span className="text-xs font-semibold text-[#F2F1ED] truncate max-w-[150px] sm:max-w-[220px]">
              {PROJECTS[activeIdx]?.title}
            </span>
          </div>

          {/* Interactive Steps / Jump Controls */}
          <div className="flex items-center gap-2">
            {/* Prev Arrow */}
            <button
              onClick={() => jumpToProject(Math.max(0, activeIdx - 1))}
              disabled={activeIdx === 0}
              aria-label="Previous Project in Spiral"
              className="p-1.5 rounded-lg bg-[#161616] hover:bg-[#710014]/20 border border-[#F2F1ED]/10 text-[#F2F1ED]/80 hover:text-[#F2F1ED] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Jump Dots */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#161616] border border-[#F2F1ED]/10 backdrop-blur-md">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => jumpToProject(i)}
                  aria-label={`Jump to project ${p.title}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIdx === i
                      ? "w-6 bg-[#710014] shadow-[0_0_8px_rgba(113,0,20,0.8)]"
                      : "w-1.5 bg-[#F2F1ED]/20 hover:bg-[#F2F1ED]/40"
                  }`}
                />
              ))}
            </div>

            {/* Next Arrow */}
            <button
              onClick={() => jumpToProject(Math.min(projectCount - 1, activeIdx + 1))}
              disabled={activeIdx === projectCount - 1}
              aria-label="Next Project in Spiral"
              className="p-1.5 rounded-lg bg-[#161616] hover:bg-[#710014]/20 border border-[#F2F1ED]/10 text-[#F2F1ED]/80 hover:text-[#F2F1ED] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#161616]/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
              className="relative w-full max-w-2xl rounded-2xl bg-[#161616] border border-[#F2F1ED]/20 p-5 sm:p-7 shadow-2xl max-h-[88vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-[#161616] hover:bg-[#710014]/30 text-[#F2F1ED]/70 hover:text-[#F2F1ED] transition-colors border border-[#F2F1ED]/10"
                aria-label="Close Case Study"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-widest text-[#710014] font-bold mb-1.5">
                  <span>{selectedProject.category}</span>
                  <span className="text-[#F2F1ED]/30">&bull;</span>
                  <span>{selectedProject.year}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#F2F1ED] mb-1">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-sans text-[#F2F1ED]/60 uppercase tracking-wider">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Description */}
              <div className="mb-5">
                <h4 className="text-[11px] font-sans uppercase tracking-wider text-[#710014] font-semibold mb-1.5">
                  Architectural Summary
                </h4>
                <p className="text-sm text-[#F2F1ED]/80 leading-relaxed font-light">
                  {selectedProject.description}
                </p>
              </div>

              {/* Deliverables */}
              <div className="mb-5">
                <h4 className="text-[11px] font-sans uppercase tracking-wider text-[#710014] font-semibold mb-2">
                  Core Engineering Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedProject.deliverables.map((item) => (
                    <div
                      key={item}
                      className="p-2.5 rounded-lg bg-[#161616] border border-[#F2F1ED]/10 flex items-center gap-2 text-xs font-sans text-[#F2F1ED]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#710014] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Telemetry Metrics */}
              <div className="mb-5">
                <h4 className="text-[11px] font-sans uppercase tracking-wider text-[#710014] font-semibold mb-2">
                  Verified Performance Telemetry
                </h4>
                <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-[#161616] border border-[#F2F1ED]/10">
                  {selectedProject.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-xl font-bold font-sans text-[#F2F1ED]">{m.value}</div>
                      <div className="text-[10px] font-sans text-[#F2F1ED]/50 uppercase mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-5">
                <h4 className="text-[11px] font-sans uppercase tracking-wider text-[#710014] font-semibold mb-2">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-sans text-[#F2F1ED] bg-[#161616] border border-[#F2F1ED]/15 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* External CTAs */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#F2F1ED]/10">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#710014] hover:bg-[#8c0019] text-[#F2F1ED] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#710014]/30"
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#161616] hover:bg-[#710014]/20 text-[#F2F1ED] font-semibold text-xs uppercase tracking-wider transition-all duration-300 border border-[#F2F1ED]/15"
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
