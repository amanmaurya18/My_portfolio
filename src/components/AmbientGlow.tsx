"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function AmbientGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useSpring(0, { stiffness: 140, damping: 22 });
  const mouseY = useSpring(0, { stiffness: 140, damping: 22 });
  const scale = useSpring(1, { stiffness: 180, damping: 20 });

  useEffect(() => {
    // Only enable on pointer-capable devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if target is an interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("[role='button']") ||
          target.closest("input") ||
          target.closest("textarea"))
      ) {
        setIsHovered(true);
        scale.set(1.35);
      } else {
        setIsHovered(false);
        scale.set(1);
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      scale.set(1.5);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
      scale.set(isHovered ? 1.35 : 1);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, scale, isHovered]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-30 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] transition-opacity duration-300"
      style={{
        x: mouseX,
        y: mouseY,
        scale: scale,
        opacity: isClicked ? 0.6 : isHovered ? 0.48 : 0.32,
        background: isHovered
          ? "radial-gradient(circle, rgba(113, 0, 20, 0.5) 0%, rgba(242, 241, 237, 0.08) 55%, transparent 70%)"
          : "radial-gradient(circle, rgba(113, 0, 20, 0.32) 0%, rgba(242, 241, 237, 0.04) 50%, transparent 70%)",
      }}
    />
  );
}
