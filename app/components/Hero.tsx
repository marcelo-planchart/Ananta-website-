"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const stats = [
  { value: "600+",    label: "Glass Contractors" },
  { value: "10+ hrs", label: "Saved / Project" },
  { value: "13 yrs",  label: "Industry Experience" },
  { value: "100%",    label: "Expert-Reviewed" },
];

export default function Hero() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Full-bleed background photo */}
      <div className="absolute inset-0">
        <Image
          src="https://elitedraftingdesign.com/img/About-us/About1.jpg"
          alt="Elite Drafting team working on glass shop drawings"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Multi-stop overlay — dark base, lighter at centre for photo visibility */}
        <div className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(8,14,18,0.65) 0%, rgba(8,14,18,0.45) 40%, rgba(8,14,18,0.78) 75%, rgba(8,14,18,0.94) 100%)"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 pb-0 pt-32 w-full">

        {/* Eyebrow */}
        <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-teal" />
          <p className="font-mono text-teal text-[11px] tracking-[5px] uppercase">
            Elite Drafting — 13 Years — 600+ Clients
          </p>
        </motion.div>

        {/* Headline — editorial serif mix */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-display font-light text-[clamp(52px,7.5vw,108px)] leading-[0.92] text-white mb-2"
        >
          The Intelligence Layer
        </motion.h1>
        <motion.h1
          {...fadeUp(0.3)}
          className="font-display italic font-semibold text-[clamp(52px,7.5vw,108px)] leading-[0.92] text-teal mb-8"
        >
          for the Glass Industry
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.45)}
          className="font-sans font-[300] text-[18px] text-white/70 leading-[1.7] max-w-[520px] mb-10"
        >
          AI-powered takeoff, shop drawings, and engineering stamps —
          delivered by California&apos;s most trusted glazing service.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.55)} className="flex flex-col sm:flex-row gap-3 mb-0">
          <input ref={inputRef} type="file" accept=".pdf,.dwg,.dxf" multiple className="hidden" aria-label="Upload project files" />
          <button
            onClick={() => inputRef.current?.click()}
            className="group flex items-center justify-center gap-2.5 font-sans font-[500] text-[14px] tracking-wide bg-teal text-white px-8 py-4 rounded-lg hover:bg-teal-dim transition-all duration-300 cursor-pointer shadow-[0_4px_24px_rgba(13,107,90,0.50)]"
          >
            <Upload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
            Upload Project Files for Takeoff
          </button>
          <a
            href="#how-it-works"
            className="flex items-center justify-center font-sans font-[400] text-[14px] border border-white/20 text-white/80 px-7 py-4 rounded-lg hover:border-white/50 hover:text-white transition-all duration-300 backdrop-blur-sm"
          >
            See How It Works →
          </a>
        </motion.div>
      </div>

      {/* Stats strip — sits at very bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 mt-16 border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-7 px-6 text-center ${i > 0 ? "border-l border-white/10" : ""}`}
              >
                <p className="font-display font-semibold italic text-[clamp(28px,3vw,40px)] text-teal leading-none mb-1.5">{s.value}</p>
                <p className="font-mono text-[10px] text-white/45 uppercase tracking-[3px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Wave into next section */}
      <div className="relative z-10">
        <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 64L1440 64L1440 22C1200 64 960 0 720 22C480 44 240 0 0 22L0 64Z" fill="#F7F4EF" />
        </svg>
      </div>
    </section>
  );
}
