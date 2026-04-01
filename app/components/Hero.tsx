"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const stats = [
  { value: "600+",    label: "Glass Contractors" },
  { value: "10+ hrs", label: "Saved / Project" },
  { value: "13 YRS",  label: "Industry Experience" },
  { value: "100%",    label: "Expert-Reviewed" },
];

export default function Hero() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      {/* Full-bleed background photo */}
      <div className="absolute inset-0">
        <Image
          src="https://elitedraftingdesign.com/img/About-us/About1.jpg"
          alt="Elite Drafting team working on glass shop drawings"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay — heavier at bottom so text pops */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(10,20,30,0.52) 0%, rgba(10,20,30,0.72) 55%, rgba(10,20,30,0.88) 100%)" }}
        />
      </div>

      {/* Nav spacer */}
      <div className="h-20" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16 pt-20 text-center flex flex-col items-center">

        {/* Eyebrow */}
        <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 mb-6">
          <span className="inline-block w-5 h-[2px] bg-teal rounded-full" />
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase">
            Built by Elite Drafting · 13 Years · 600+ Clients
          </p>
          <span className="inline-block w-5 h-[2px] bg-teal rounded-full" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-bebas text-[clamp(52px,8vw,110px)] leading-[0.93] text-white mb-6"
        >
          The Intelligence Layer
          <br />
          for the{" "}
          <span className="text-gradient-teal">Glass Industry</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.35)}
          className="font-sans font-[300] text-[18px] text-white/80 leading-[1.7] max-w-[560px] mb-10"
        >
          AI-powered takeoff, shop drawings, and engineering stamps —
          delivered by California&apos;s most trusted glazing service.
        </motion.p>

        {/* Upload CTA */}
        <motion.div {...fadeUp(0.48)} className="flex flex-col sm:flex-row gap-3 items-center mb-14 w-full max-w-lg">
          <input ref={inputRef} type="file" accept=".pdf,.dwg,.dxf" multiple className="hidden" aria-label="Upload project files" />
          <button
            onClick={() => inputRef.current?.click()}
            className="group w-full sm:flex-1 flex items-center justify-center gap-2.5 font-sans font-[600] text-[15px] bg-teal text-white px-8 py-4 rounded-xl hover:bg-teal-dark transition-all duration-300 shadow-[0_4px_24px_rgba(0,196,173,0.45)] hover:shadow-[0_6px_32px_rgba(0,196,173,0.60)] cursor-pointer"
          >
            <Upload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
            Upload Project Files for Takeoff
          </button>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto font-sans font-[400] text-[15px] border border-white/30 text-white px-7 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-center backdrop-blur-sm whitespace-nowrap"
          >
            See How It Works →
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.62)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden w-full max-w-2xl backdrop-blur-sm"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-black/20 px-6 py-5 text-center">
              <p className="font-bebas text-[30px] text-teal leading-none mb-1">{s.value}</p>
              <p className="font-mono text-[10px] text-white/60 uppercase tracking-[2px]">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="relative z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#FFFFFF" />
        </svg>
      </div>
    </section>
  );
}
