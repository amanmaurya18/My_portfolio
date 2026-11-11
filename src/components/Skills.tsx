"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Binary,
  Palette,
  Sparkles,
  Compass,
  Flame,
} from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Full-Stack Web Engineering",
      tag: "Modern Web",
      icon: Code2,
      color: "text-[#710014]",
      accentBg: "bg-[#710014]/20",
      border: "border-[#710014]/30",
      hoverBorder: "hover:border-[#710014]",
      description:
        "Architecting responsive, type-safe web applications with fluid animations, server-side rendering, and robust REST APIs.",
      skills: [
        "React",
        "Next.js 14 (App Router)",
        "Tailwind CSS",
        "TypeScript",
        "JavaScript (ES6+)",
        "REST APIs",
        "Vercel Deployment",
        "WordPress",
      ],
      colSpan: "lg:col-span-2",
    },
    {
      title: "Core Computer Science & Systems",
      tag: "Foundational CS",
      icon: Binary,
      color: "text-[#710014]",
      accentBg: "bg-[#710014]/20",
      border: "border-[#710014]/30",
      hoverBorder: "hover:border-[#710014]",
      description:
        "Rigorous algorithmic problem solving, relational database management, and structured object-oriented programming.",
      skills: [
        "C",
        "C++",
        "Data Structures & Algorithms (DSA)",
        "DBMS (SQL)",
        "Object-Oriented Programming (OOP)",
        "Computer Organization & Architecture (COA)",
      ],
      colSpan: "lg:col-span-1",
    },
    {
      title: "Creative & Media Direction",
      tag: "Visual Design",
      icon: Palette,
      color: "text-[#710014]",
      accentBg: "bg-[#710014]/20",
      border: "border-[#710014]/30",
      hoverBorder: "hover:border-[#710014]",
      description:
        "Crafting high-impact visual storytelling through cinematic video production, digital imaging, and brand aesthetics.",
      skills: [
        "Video Editing",
        "Photo Editing",
        "Graphic Design",
        "Cinematic Color Grading",
      ],
      colSpan: "lg:col-span-1",
    },
  ];

  return (
    <section id="skills" className="relative w-full bg-[#161616] py-16 sm:py-20 px-6 sm:px-12 md:px-16 z-20 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#710014] font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-[#710014]" />
            <span className="font-tempting text-base normal-case text-[#F2F1ED] mr-1">technical</span>
            <span>Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F2F1ED] tracking-tight uppercase mb-3">
            Specialized <br />
            <span className="text-[#710014]">
              Capabilities &amp; Stack
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#F2F1ED]/70 font-light leading-relaxed">
            From low-level C++ algorithms and relational database management to full-stack Next.js production web engineering.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative rounded-2xl p-5 sm:p-6 bg-[#161616] border border-[#F2F1ED]/10 ${category.hoverBorder} transition-all duration-500 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-2xl ${category.colSpan}`}
              >
                {/* Background Ambient Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#710014]/10 group-hover:bg-[#710014]/20 blur-3xl transition-all duration-700" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${category.accentBg} border border-[#F2F1ED]/10 group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-[#161616] border border-[#F2F1ED]/10 text-[#F2F1ED]/70">
                        {category.tag}
                      </span>
                      <span className="text-xs font-sans uppercase tracking-widest text-[#710014] font-bold">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#F2F1ED] mb-1.5 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F2F1ED]/70 leading-relaxed font-light mb-4">
                    {category.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#F2F1ED]/10">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] font-sans text-[#F2F1ED] bg-[#161616] border border-[#F2F1ED]/10 rounded-lg hover:border-[#710014] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy Callout Strip */}
        <div className="mt-8 sm:mt-10 rounded-2xl p-4 sm:p-6 bg-[#161616] border border-[#F2F1ED]/10 backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#710014]/20 text-[#710014] border border-[#710014]/30 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#F2F1ED] mb-1">
                Engineering Discipline &amp; Core Computer Science
              </h4>
              <p className="text-xs text-[#F2F1ED]/70 leading-relaxed max-w-2xl font-light">
                Rigorous computer science fundamentals and algorithmic problem solving honed at PSIT Kanpur, engineered into high-performance web systems.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#710014]/20 border border-[#710014]/40 text-[11px] font-sans text-[#F2F1ED] shrink-0 self-start lg:self-center font-bold">
            <Flame className="w-3.5 h-3.5 text-[#710014]" />
            <span>High Performance Stack</span>
          </div>
        </div>
      </div>
    </section>
  );
}
