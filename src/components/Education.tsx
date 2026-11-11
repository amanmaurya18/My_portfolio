"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, CheckCircle2 } from "lucide-react";

export default function Education() {
  const focusAreas = [
    { title: "Data Structures & Algorithms", desc: "Advanced Graph traversal, Trees, Dynamic Programming, and algorithmic time-complexity optimization." },
    { title: "Database Management Systems", desc: "Relational SQL architecture, Normalization, ACID transactions, and query optimization." },
    { title: "Software Engineering & Architecture", desc: "Software engineering lifecycle, modular architecture, system integration, and scalable web design." },
    { title: "Systems & Architecture", desc: "Object-Oriented Programming in C++ / Python, Computer Organization & Architecture (COA)." },
  ];

  return (
    <section id="education" className="relative w-full bg-[#161616] py-16 sm:py-20 px-6 sm:px-12 md:px-16 z-20 font-sans">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#710014]/10 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#710014] font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-[#710014]" />
            <span className="font-tempting text-base normal-case text-[#F2F1ED] mr-1">academic</span>
            <span>Foundations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F2F1ED] tracking-tight uppercase mb-3">
            Education &amp; <br />
            <span className="text-[#710014]">
              Milestones
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#F2F1ED]/70 font-light leading-relaxed">
            Formal computer science training ground bridging theoretical mathematics and algorithms with autonomous software engineering.
          </p>
        </div>

        {/* Main Academic Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-5 sm:p-8 bg-[#161616] border border-[#F2F1ED]/10 backdrop-blur-2xl shadow-xl relative overflow-hidden"
        >
          {/* Top subtle crimson accent border */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#710014] to-transparent" />

          {/* Focus Areas & Curriculum Matrix */}
          <div>
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-[#F2F1ED]/60 mb-4 font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-[#710014]" />
              <span>Core Academic Focus Areas &amp; Rigor</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {focusAreas.map((area) => (
                <div
                  key={area.title}
                  className="p-3.5 sm:p-4 rounded-xl bg-[#161616] border border-[#F2F1ED]/10 hover:border-[#710014]/60 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#710014] shrink-0" />
                    <h4 className="text-xs sm:text-sm font-bold text-[#F2F1ED]">
                      {area.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#F2F1ED]/70 leading-relaxed font-light pl-5">
                    {area.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Terminal Footnote */}
          <div className="mt-6 pt-4 border-t border-[#F2F1ED]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-sans text-[#F2F1ED]/60">
            <span>INSTITUTION ID: PSIT-KANPUR // AFFILIATION: AKTU</span>
            <span className="text-[#710014] font-bold">STATUS: ACTIVE UNDERGRADUATE RESEARCHER</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
