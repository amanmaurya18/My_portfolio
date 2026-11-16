"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, FileText, Send } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("experience");

  const navItems = [
    { id: "experience", label: "Story", code: "01" },
    { id: "projects", label: "Projects", code: "02" },
    { id: "skills", label: "Arsenal", code: "03" },
    { id: "education", label: "Education", code: "04" },
    { id: "contact", label: "Contact", code: "05" },
  ];

  useEffect(() => {
    const sections = ["experience", "projects", "skills", "education", "contact"];
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const scrollPosition = window.scrollY + 220;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-3 xs:px-4 sm:px-6 py-2 sm:py-2.5 transition-all duration-300 pointer-events-none ${
        scrolled
          ? "backdrop-blur-md bg-[#161616]/90 border-b border-[#F2F1ED]/10 shadow-lg shadow-black/40"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand / Logo with Tempting + Switzer pairing */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="pointer-events-auto group flex items-center gap-2 xs:gap-3 px-2.5 xs:px-3.5 py-1.5 rounded-full bg-[#161616]/85 backdrop-blur-xl border border-[#F2F1ED]/10 hover:border-[#710014]/60 transition-all shadow-xl shrink-0"
        >
          <div className="relative flex h-2 xs:h-2.5 w-2 xs:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#710014] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 xs:h-2.5 w-2 xs:w-2.5 bg-[#710014]"></span>
          </div>
          <div className="flex items-baseline gap-1 xs:gap-1.5">
            <span className="font-tempting text-base xs:text-lg sm:text-xl text-[#F2F1ED] font-normal lowercase leading-none">
              aman
            </span>
            <span className="font-sans text-[11px] xs:text-xs sm:text-sm font-black tracking-wider text-[#F2F1ED] group-hover:text-[#F2F1ED] transition-colors uppercase">
              MAURYA<span className="text-[#710014]">.</span>
            </span>
          </div>
          <span className="hidden md:inline-block text-[10px] font-sans tracking-wider text-[#F2F1ED]/50 border-l border-[#F2F1ED]/10 pl-2.5 uppercase">
            PSIT CSE &apos;28
          </span>
        </button>

        {/* Center Nav Links with Scroll Spy Highlight (Desktop) */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#161616]/85 backdrop-blur-xl border border-[#F2F1ED]/10 shadow-xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1 text-xs font-sans uppercase tracking-wider transition-all duration-300 rounded-full ${
                  isActive
                    ? "text-[#F2F1ED] font-bold bg-[#710014] border border-[#710014] shadow-[0_0_15px_rgba(113,0,20,0.45)]"
                    : "text-[#F2F1ED]/60 hover:text-[#F2F1ED] hover:bg-[#F2F1ED]/5 border border-transparent"
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Resume & Let's Connect */}
        <div className="pointer-events-auto flex items-center gap-1.5 xs:gap-2 shrink-0">
          <a
            href="mailto:18amanmaurya@gmail.com?subject=Resume%20Request%20-%20Aman%20Maurya"
            className="hidden sm:inline-flex btn-secondary !py-1.5 !px-3.5 group text-xs"
            title="Request / Inquire Resume"
          >
            <FileText className="w-3.5 h-3.5 text-[#F2F1ED]/70 group-hover:text-[#F2F1ED] group-hover:scale-110 transition-transform" />
            <span>Resume</span>
          </a>

          <button
            onClick={() => scrollToSection("contact")}
            className="hidden sm:inline-flex btn-primary !py-1.5 !px-4 group text-xs"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Button with accessible touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-[#161616]/90 backdrop-blur-xl border border-[#F2F1ED]/15 text-[#F2F1ED]/90 hover:text-[#F2F1ED] active:scale-95 transition-all"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4 xs:w-5 xs:h-5" /> : <Menu className="w-4 h-4 xs:w-5 xs:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto md:hidden mt-2 w-full max-w-md mx-auto p-3.5 xs:p-4 rounded-2xl bg-[#161616]/95 backdrop-blur-2xl border border-[#F2F1ED]/15 shadow-2xl flex flex-col gap-1.5 font-sans text-xs uppercase tracking-wider"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`p-2.5 text-left rounded-xl flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-[#710014] text-[#F2F1ED] font-bold border border-[#710014]"
                        : "hover:bg-[#F2F1ED]/5 text-[#F2F1ED]/70 hover:text-[#F2F1ED]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] opacity-40 font-mono">{item.code}</span>
                      <span>{item.label}</span>
                    </span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#F2F1ED]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 mt-1 border-t border-[#F2F1ED]/10 flex flex-col gap-2">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full p-2.5 rounded-xl bg-[#710014] hover:bg-[#8c0019] text-[#F2F1ED] font-bold text-center flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Let&apos;s Connect</span>
              </button>

              <a
                href="mailto:18amanmaurya@gmail.com?subject=Resume%20Request%20-%20Aman%20Maurya"
                className="w-full p-2.5 text-center rounded-xl bg-[#161616] hover:bg-[#F2F1ED]/5 border border-[#F2F1ED]/15 text-[#F2F1ED]/90 font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#710014]" />
                <span>Request Resume / CV</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
