"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload } from "lucide-react";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section id="cta" ref={ref} className="relative py-32 overflow-hidden bg-ink grain">
      {/* Gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(10,123,104,0.09) 0%, transparent 65%)" }}
      />
      {/* Top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(10,123,104,0.45) 40%, rgba(10,123,104,0.45) 60%, transparent)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-teal text-[11px] tracking-[5px] uppercase mb-8"
        >
          Get Started
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(40px,5.5vw,80px)] leading-[1.0] tracking-tight text-white mb-6"
        >
          Ready to stop doing<br />
          takeoffs <span className="text-teal">by hand?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-white/45 text-[16px] leading-[1.75] mb-12 max-w-md mx-auto"
        >
          Upload your drawings and get your first AI takeoff delivered in 24 hours. No commitment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-14"
        >
          <input ref={inputRef} type="file" accept=".pdf,.dwg,.dxf" multiple className="hidden" aria-label="Upload project files" />
          <button
            onClick={() => inputRef.current?.click()}
            className="group flex items-center gap-2.5 font-sans font-[600] text-[14px] tracking-wide bg-teal text-white px-9 py-4 rounded-md hover:bg-teal-dim transition-all duration-300 cursor-pointer shadow-[0_4px_32px_rgba(10,123,104,0.40)]"
          >
            <Upload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
            Upload Project Files
          </button>
          <a
            href="#how-it-works"
            className="font-sans font-[500] text-[14px] text-white/40 hover:text-white/70 transition-colors py-4 px-4"
          >
            How it works →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex justify-center items-center gap-8 mb-5"
        >
          <a href="mailto:investor@ananta.ai" className="font-mono text-[10px] text-white/25 hover:text-teal transition-colors tracking-[2px]">
            investor@ananta.ai
          </a>
          <span className="w-px h-3 bg-white/8" />
          <a href="mailto:hello@ananta.ai" className="font-mono text-[10px] text-white/25 hover:text-teal transition-colors tracking-[2px]">
            hello@ananta.ai
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="font-mono text-[10px] text-white/15 tracking-[3px] uppercase"
        >
          No credit card · No commitment · First project free
        </motion.p>
      </div>
    </section>
  );
}
