"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, Send, MapPin, Sparkles } from "lucide-react";
import { GithubIcon, InstagramIcon } from "@/components/Icons";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "18amanmaurya@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative w-full bg-[#161616] py-16 sm:py-20 px-6 sm:px-12 md:px-16 z-20 overflow-hidden font-sans">
      {/* Ambient background glows with Crimson Red */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#710014]/15 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute top-10 right-1/4 w-72 h-72 bg-[#710014]/10 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="rounded-2xl p-6 sm:p-10 md:p-12 bg-[#161616] border border-[#F2F1ED]/10 backdrop-blur-2xl shadow-xl relative overflow-hidden">
          {/* Subtle top crimson light bar */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#710014] to-transparent" />

          {/* Section Code & Availability Pill */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#710014]/20 border border-[#710014]/40 text-[11px] font-sans uppercase tracking-widest text-[#F2F1ED] font-bold">
              <Sparkles className="w-3 h-3 text-[#710014]" />
              <span className="font-tempting text-base normal-case mr-1">connect</span>
              <span>&bull; Inquiries</span>
            </div>
          </div>

          {/* Availability & Location Pill */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-[#F2F1ED]/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#710014] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#710014]"></span>
              </span>
              <span className="text-[11px] font-sans text-[#F2F1ED]/80">
                Open for Opportunities &bull; Engineering Internships &bull; Collaborations
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161616] border border-[#F2F1ED]/10 text-[11px] font-sans text-[#F2F1ED]/60">
              <MapPin className="w-3 h-3 text-[#710014]" />
              <span>Kanpur, UP, India</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#F2F1ED] tracking-tight uppercase leading-[0.98] mb-4">
            Let&apos;s build <br />
            <span className="text-[#710014]">
              exceptional software.
            </span>
          </h2>

          <p className="max-w-xl text-xs sm:text-sm text-[#F2F1ED]/80 font-light leading-relaxed mb-8">
            Whether you&apos;re looking to collaborate on high-performance full-stack Next.js platforms, algorithmic software systems, or discuss software engineering internships—reach out anytime.
          </p>

          {/* Interactive Email Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-lg mb-8">
            <div className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#161616] border border-[#F2F1ED]/15 font-sans text-xs sm:text-sm text-[#F2F1ED] overflow-hidden">
              <div className="flex items-center gap-2.5 truncate">
                <Mail className="w-4 h-4 text-[#710014] shrink-0" />
                <span className="truncate">{email}</span>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="btn-primary shrink-0 !py-2 !px-4"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#F2F1ED]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#F2F1ED]" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Social Links & Direct Mail */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#F2F1ED]/10">
            <a
              href={`mailto:${email}?subject=Collaboration%20Inquiry%20-%20Aman%20Maurya`}
              className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-[#F2F1ED] hover:text-[#710014] transition-colors font-semibold"
            >
              <Send className="w-3.5 h-3.5 text-[#710014]" />
              <span>Launch Mail Client &rarr;</span>
            </a>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/amanmaurya18"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#161616] hover:bg-[#710014]/20 border border-[#F2F1ED]/10 text-[#F2F1ED]/80 hover:text-[#F2F1ED] transition-all flex items-center gap-2 text-xs font-sans"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4 text-[#F2F1ED]" />
                <span className="hidden sm:inline">amanmaurya18</span>
              </a>

              <a
                href="https://instagram.com/aman18_m"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#161616] hover:bg-[#710014]/20 border border-[#F2F1ED]/10 text-[#F2F1ED]/80 hover:text-[#F2F1ED] transition-all flex items-center gap-2 text-xs font-sans"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4 text-[#F2F1ED]" />
                <span className="hidden sm:inline">@aman18_m</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
