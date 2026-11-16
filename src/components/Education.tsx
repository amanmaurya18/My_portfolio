"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, CheckCircle2, Calendar, MapPin, Building } from "lucide-react";

export default function Education() {
  const focusAreas = [
    { title: "Data Structures & Algorithms", desc: "Advanced Graph traversal, Trees, Dynamic Programming, and algorithmic time-complexity optimization." },
    { title: "Database Management Systems", desc: "Relational SQL architecture, Normalization, ACID transactions, and query optimization." },
    { title: "Software Engineering & Architecture", desc: "Software engineering lifecycle, modular architecture, system integration, and scalable web design." },
    { title: "Systems & Architecture", desc: "Object-Oriented Programming in C++ / Python, Computer Organization & Architecture (COA)." },
  ];

  return (
    <section id="education" className="relative w-full bg-[#161616] py-12 xs:py-16 sm:py-20 px-3 xs:px-6 sm:px-12 md:px-16 z-20 font-sans">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-[#710014]/10 rounded-full blur-[120px] sm:blur-[140px]" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs font-sans uppercase tracking-widest text-[#710014] font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-[#710014]" />
            <span className="font-tempting text-sm xs:text-base normal-case text-[#F2F1ED] mr-1">academic</span>
            <span>Foundations</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-[#F2F1ED] tracking-tight uppercase mb-2 sm:mb-3">
            Education &amp; <br />
            <span className="text-[#710014]">
              Milestones
            </span>
          </h2>
          <p className="text-[11px] xs:text-xs sm:text-sm text-[#F2F1ED]/70 font-light leading-relaxed">
            Formal computer science training ground bridging theoretical mathematics and algorithms with autonomous software engineering.
          </p>
        </div>

        {/* Main Academic Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-4 xs:p-6 sm:p-8 bg-[#161616] border border-[#F2F1ED]/10 backdrop-blur-2xl shadow-xl relative overflow-hidden"
        >
          {/* Top subtle crimson accent border */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#710014] to-transparent" />

          {/* Primary Degree Banner */}
          <div className="mb-6 pb-6 border-b border-[#F2F1ED]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#710014]/20 border border-[#710014]/40 text-[10px] xs:text-[11px] font-sans text-[#F2F1ED] font-semibold mb-2">
                <span>Undergraduate Degree Program</span>
              </div>
              <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-[#F2F1ED] mb-1">
                Bachelor of Technology (B.Tech) in Computer Science &amp; Engineering
              </h3>
              <div className="flex flex-wrap items-center gap-2 xs:gap-3 text-xs text-[#F2F1ED]/70 font-sans mt-1">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-[#710014]" />
                  <span>PSIT Kanpur</span>
                </span>
                <span className="text-[#F2F1ED]/20">&bull;</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#710014]" />
                  <span>Kanpur, UP</span>
                </span>
                <span className="text-[#F2F1ED]/20">&bull;</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#710014]" />
                  <span>2024 &ndash; 2028</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-center px-3 py-1.5 rounded-xl bg-[#161616] border border-[#F2F1ED]/10 text-xs font-sans text-[#F2F1ED]/80">
              <span className="w-2 h-2 rounded-full bg-[#710014] animate-pulse" />
              <span>Affiliated to AKTU</span>
            </div>
          </div>

          {/* Focus Areas & Curriculum Matrix */}
          <div>
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-[#F2F1ED]/60 mb-3 xs:mb-4 font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-[#710014]" />
              <span>Core Academic Focus Areas &amp; Rigor</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4">
              {focusAreas.map((area) => (
                <div
                  key={area.title}
                  className="p-3 xs:p-3.5 sm:p-4 rounded-xl bg-[#161616] border border-[#F2F1ED]/10 hover:border-[#710014]/60 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#710014] shrink-0" />
                    <h4 className="text-xs xs:text-sm font-bold text-[#F2F1ED]">
                      {area.title}
                    </h4>
                  </div>
                  <p className="text-[11px] xs:text-xs text-[#F2F1ED]/70 leading-relaxed font-light pl-5">
                    {area.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Terminal Footnote */}
          <div className="mt-6 pt-4 border-t border-[#F2F1ED]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-[10px] xs:text-[11px] font-sans text-[#F2F1ED]/60">
            <span>INSTITUTION ID: PSIT-KANPUR // AFFILIATION: AKTU</span>
            <span className="text-[#710014] font-bold">STATUS: ACTIVE UNDERGRADUATE RESEARCHER</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
