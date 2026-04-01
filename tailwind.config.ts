import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode surfaces
        canvas:   "#FFFFFF",
        canvas2:  "#F8FAFC",
        canvas3:  "#F1F5F9",
        // Text
        ink:      "#0F172A",
        "ink-dim":"#64748B",
        // Teal scale (kept from brand)
        teal:     "#00C4AD",   // AA-contrast on white for large text/buttons
        "teal-dark": "#007A6E", // AA-contrast for small text on white
        "teal-dim":  "#009688",
        "teal-bg":   "#E6FBF9", // very light teal for card tints
        // Borders
        stroke:   "rgba(15,23,42,0.08)",
        "stroke-strong": "rgba(15,23,42,0.14)",
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
        sans:  ["'Inter'", "sans-serif"],
        mono:  ["'DM Mono'", "monospace"],
      },
      animation: {
        marquee:      "marquee 30s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "spin-slow":  "spin 20s linear infinite",
        "float":      "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%":      { transform: "scale(1.4)", opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
