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
        canvas:   "#FAFAF8",
        canvas2:  "#F2F0EB",
        canvas3:  "#E6E3DC",
        ink:      "#111111",
        "ink-mid":"#3A3A38",
        "ink-dim":"#737068",
        teal:        "#0A7B68",
        "teal-dark": "#065C4E",
        "teal-dim":  "#0F9A82",
        "teal-bg":   "#EDF5F3",
        stroke:        "rgba(17,17,17,0.08)",
        "stroke-strong":"rgba(17,17,17,0.15)",
      },
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        sans:    ["'Instrument Sans'", "sans-serif"],
        mono:    ["'DM Mono'", "monospace"],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        float:   "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
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
