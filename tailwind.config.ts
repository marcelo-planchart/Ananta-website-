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
        // Warm parchment surfaces
        canvas:   "#F7F4EF",
        canvas2:  "#EDEAD3",
        canvas3:  "#E1DCD2",
        // Text
        ink:      "#0D0C0A",
        "ink-dim":"#7A776E",
        // Deep forest teal — sophisticated, AA-contrast on cream
        teal:        "#0D6B5A",
        "teal-dark": "#094F41",
        "teal-dim":  "#147A67",
        "teal-bg":   "#EAF2EF",
        // Warm borders
        stroke:        "rgba(13,12,10,0.09)",
        "stroke-strong":"rgba(13,12,10,0.16)",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        sans:    ["'Outfit'", "sans-serif"],
        mono:    ["'DM Mono'", "monospace"],
      },
      animation: {
        marquee:      "marquee 36s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float:        "float 6s ease-in-out infinite",
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
