"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#161616] border-t border-[#F2F1ED]/10 py-8 xs:py-10 sm:py-12 px-3 xs:px-6 sm:px-12 md:px-16 z-20 font-sans text-xs text-[#F2F1ED]/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
        {/* Left: Brand & Local Time */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 xs:gap-4">
          <div className="flex items-baseline gap-1">
            <span className="font-tempting text-base text-[#F2F1ED] font-normal lowercase">aman</span>
            <span className="text-[#F2F1ED] font-black uppercase tracking-wider text-[11px] xs:text-xs">
              MAURYA &bull; 2026
            </span>
          </div>
          <span className="hidden sm:inline text-[#F2F1ED]/20">|</span>
          <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#710014] animate-pulse shrink-0" />
            <span>KANPUR (IST): {time || "00:00:00"} UTC+5:30</span>
          </div>
        </div>

        {/* Center: Institution & Focus */}
        <div className="text-[#F2F1ED]/60 text-center text-[10px] xs:text-xs">
          <span>B.Tech CSE &bull; PSIT Kanpur (2024–2028) &bull; Built with Next.js 14 &amp; Canvas</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3.5 xs:px-4 py-2 rounded-full bg-[#161616] hover:bg-[#710014]/20 border border-[#F2F1ED]/10 hover:border-[#710014] text-[#F2F1ED]/80 hover:text-[#F2F1ED] transition-all uppercase tracking-widest text-[10px] xs:text-[11px]"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#710014]" />
        </button>
      </div>
    </footer>
  );
}
