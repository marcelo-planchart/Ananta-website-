"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload, ArrowDown } from "lucide-react";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function Hero() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Full-bleed photo */}
      <div className="absolute inset-0">
        <Image
          src="https://elitedraftingdesign.com/img/About-us/About1.jpg"
          alt="Elite Drafting team working on glass shop drawings"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(175deg, rgba(6,10,14,0.72) 0%, rgba(6,10,14,0.48) 35%, rgba(6,10,14,0.82) 70%, rgba(6,10,14,0.96) 100%)",
          }}
        />
      </div>

      {/* Content — vertically centred */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-8 w-full pt-24 pb-32">
        {/* Eyebrow */}
        <motion.div {...fade(0.15)} className="flex items-center gap-3 mb-10">
          <div className="h-px w-12 bg-teal" />
          <p className="font-mono text-teal text-[11px] tracking-[5px] uppercase">
            Elite Drafting — Since 2011
          </p>
        </motion.div>

        {/* Headline — stacked, different weights */}
        <div className="mb-10">
          <motion.h1
            {...fade(0.25)}
            className="font-display font-bold text-[clamp(48px,7vw,100px)] leading-[0.98] tracking-[-0.02em] text-white"
          >
            The Intelligence
          </motion.h1>
          <motion.h1
            {...fade(0.32)}
            className="font-display font-bold text-[clamp(48px,7vw,100px)] leading-[0.98] tracking-[-0.02em] text-white"
          >
            Layer <span className="text-teal">for Glass</span>
          </motion.h1>
        </div>

        {/* Sub + CTA in a row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:gap-16">
          <motion.p
            {...fade(0.45)}
            className="font-sans font-[400] text-[17px] text-white/60 leading-[1.75] max-w-md mb-8 lg:mb-0"
          >
            AI-powered takeoff, shop drawings, and engineering stamps — delivered
            by California&apos;s most trusted glazing service.
          </motion.p>

          <motion.div {...fade(0.55)} className="flex flex-col sm:flex-row gap-3">
            <input ref={inputRef} type="file" accept=".pdf,.dwg,.dxf" multiple className="hidden" aria-label="Upload project files" />
            <button
              onClick={() => inputRef.current?.click()}
              className="group flex items-center justify-center gap-2.5 font-sans font-[600] text-[14px] tracking-wide bg-teal text-white px-8 py-4 rounded-md hover:bg-teal-dim transition-all duration-300 cursor-pointer shadow-[0_4px_32px_rgba(10,123,104,0.40)]"
            >
              <Upload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
              Upload Project Files
            </button>
            <a
              href="#how-it-works"
              className="flex items-center justify-center font-sans font-[500] text-[14px] border border-white/15 text-white/60 px-7 py-4 rounded-md hover:border-white/30 hover:text-white/90 transition-all duration-300 backdrop-blur-sm"
            >
              How It Works →
            </a>
          </motion.div>
        </div>
      </div>

      {/* Stats strip at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="relative z-10 border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { val: "600+",    lbl: "Contractors" },
              { val: "10+ hrs", lbl: "Saved / Project" },
              { val: "13 yrs",  lbl: "Experience" },
              { val: "100%",    lbl: "Expert-Reviewed" },
            ].map((s, i) => (
              <div
                key={s.lbl}
                className={`py-6 px-6 ${i > 0 ? "border-l border-white/[0.06]" : ""}`}
              >
                <p className="font-display font-bold text-[clamp(24px,2.5vw,36px)] text-teal leading-none mb-1 tracking-tight">{s.val}</p>
                <p className="font-mono text-[10px] text-white/35 uppercase tracking-[3px]">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#services" aria-label="Scroll to content">
          <ArrowDown className="w-4 h-4 text-white/25 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
