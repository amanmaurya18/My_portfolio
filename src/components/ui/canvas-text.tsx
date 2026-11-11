"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface CanvasTextProps {
  text: string;
  className?: string;
  backgroundClassName?: string;
  colors?: string[];
  animationDuration?: number;
  lineWidth?: number;
  lineGap?: number;
  curveIntensity?: number;
  overlay?: boolean;
}

function resolveColor(color: string): string {
  if (typeof window === "undefined") return color;
  if (color.startsWith("var(")) {
    const varName = color.slice(4, -1).trim();
    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    return resolved || color;
  }
  return color;
}

export function CanvasText({
  text,
  className = "",
  backgroundClassName = "bg-[#161616]",
  colors = ["#710014", "#8c0019", "#F2F1ED", "#710014", "#a3001d"],
  animationDuration = 5,
  lineWidth = 1.6,
  lineGap = 8,
  curveIntensity = 60,
  overlay = false,
}: CanvasTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const [bgColor, setBgColor] = useState("#161616");
  const [resolvedColors, setResolvedColors] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [font, setFont] = useState("");

  const updateColors = useCallback(() => {
    if (bgRef.current) {
      const computed = window.getComputedStyle(bgRef.current);
      if (computed.backgroundColor && computed.backgroundColor !== "rgba(0, 0, 0, 0)") {
        setBgColor(computed.backgroundColor);
      }
    }
    const resolved = colors.map(resolveColor);
    setResolvedColors(resolved);
  }, [colors]);

  useEffect(() => {
    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [updateColors]);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    const updateDimensions = () => {
      const rect = textEl.getBoundingClientRect();
      const computed = window.getComputedStyle(textEl);
      setDimensions({
        width: Math.ceil(rect.width) || 400,
        height: Math.ceil(rect.height) || 120,
      });
      setFont(
        `${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`,
      );
    };

    updateDimensions();

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updateDimensions);
    }

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(textEl);

    return () => resizeObserver.disconnect();
  }, [text, className]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      !canvas ||
      resolvedColors.length === 0 ||
      dimensions.width === 0 ||
      dimensions.height === 0 ||
      !font
    )
      return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const { width, height } = dimensions;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));

    const numLines = Math.floor(height / lineGap) + 12;
    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;
      const phase = (elapsed / animationDuration) * Math.PI * 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // 1. Draw text stencil
      ctx.globalCompositeOperation = "source-over";
      ctx.font = font;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillStyle = "#000000";
      ctx.fillText(text, 0, height / 2);

      // 2. Fill background color constrained inside text
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // 3. Draw curved animated lines constrained on top of text
      ctx.globalCompositeOperation = "source-atop";
      for (let i = 0; i < numLines; i++) {
        const y = i * lineGap;

        const curve1 = Math.sin(phase + i * 0.15) * curveIntensity;
        const curve2 = Math.sin(phase + 0.5 + i * 0.15) * curveIntensity * 0.6;

        const colorIndex = i % resolvedColors.length;
        ctx.strokeStyle = resolvedColors[colorIndex];
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(
          width * 0.33,
          y + curve1,
          width * 0.66,
          y + curve2,
          width,
          y,
        );
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [
    text,
    font,
    bgColor,
    resolvedColors,
    animationDuration,
    lineWidth,
    lineGap,
    curveIntensity,
    dimensions,
  ]);

  return (
    <span
      className={cn(
        "relative inline-block align-middle select-none",
        overlay && "absolute inset-0",
        className,
      )}
    >
      <span
        ref={bgRef}
        className={cn(
          "pointer-events-none absolute h-0 w-0 opacity-0",
          backgroundClassName,
        )}
        aria-hidden="true"
      />
      {/* Hidden layout sizer keeping exact typography flow and text layout */}
      <span ref={textRef} className="invisible inline-block whitespace-nowrap" aria-hidden="true">
        {text}
      </span>
      {/* Rendered animated canvas text */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0"
        style={{
          width: dimensions.width || "auto",
          height: dimensions.height || "auto",
        }}
        aria-label={text}
        role="img"
      />
    </span>
  );
}

export default CanvasText;
