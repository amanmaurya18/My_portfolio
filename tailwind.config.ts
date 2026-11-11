import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#161616",
        foreground: "#F2F1ED",
        obsidian: {
          DEFAULT: "#161616",
          dark: "#0f0f0f",
          card: "#1c1c1c",
          surface: "rgba(22, 22, 22, 0.85)",
        },
        pearl: {
          DEFAULT: "#F2F1ED",
          muted: "rgba(242, 241, 237, 0.7)",
          faint: "rgba(242, 241, 237, 0.4)",
          border: "rgba(242, 241, 237, 0.12)",
        },
        crimson: {
          DEFAULT: "#710014",
          hover: "#8c0019",
          active: "#55000f",
          glow: "rgba(113, 0, 20, 0.45)",
          border: "rgba(113, 0, 20, 0.35)",
        },
      },
      fontFamily: {
        sans: ["var(--font-switzer)", "sans-serif"],
        switzer: ["var(--font-switzer)", "sans-serif"],
        tempting: ["var(--font-tempting)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
