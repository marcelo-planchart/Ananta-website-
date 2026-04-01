"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload } from "lucide-react";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section id="cta" ref={ref} className="relative py-32 overflow-hidden bg-ink">
      {/* Subtle teal radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 55% at 50% 30%, rgba(13,107,90,0.10) 0%, transparent 65%)" }}
      />
      {/* Top line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(13,107,90,0.5) 40%, rgba(13,107,90,0.5) 60%, transparent)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-teal text-[11px] tracking-[5px] uppercase mb-6"
        >
          Upload &amp; Begin
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light text-[clamp(44px,6vw,88px)] leading-[0.95] text-white mb-4"
        >
          Ready to stop doing
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic font-semibold text-[clamp(44px,6vw,88px)] leading-[0.95] text-teal mb-10"
        >
          takeoffs by hand?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.28 }}
          className="font-sans font-[300] text-white/55 text-[17px] leading-[1.7] mb-12 max-w-lg mx-auto"
        >
          Join 600+ California glazing contractors. Upload your drawings and
          get your first AI takeoff delivered in 24 hours.
        </motion.p>

        {/* Upload CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.38 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10"
        >
          <input ref={inputRef} type="file" accept=".pdf,.dwg,.dxf" multiple className="hidden" aria-label="Upload project files" />
          <button
            onClick={() => inputRef.current?.click()}
            className="group flex items-center gap-2.5 font-sans font-[500] text-[14px] tracking-wide bg-teal text-white px-9 py-4 rounded-lg hover:bg-teal-dim transition-all duration-300 cursor-pointer shadow-[0_4px_28px_rgba(13,107,90,0.45)] hover:shadow-[0_6px_36px_rgba(13,107,90,0.60)]"
          >
            <Upload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
            Upload Project Files for Takeoff
          </button>
          <a
            href="#how-it-works"
            className="font-sans font-[400] text-[14px] text-white/50 hover:text-white/80 transition-colors py-4 px-4"
          >
            See how it works →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-8 mb-6"
        >
          <a href="mailto:investor@ananta.ai" className="font-mono text-[11px] text-white/30 hover:text-teal transition-colors tracking-[2px]">
            investor@ananta.ai
          </a>
          <span className="hidden sm:block w-px h-3 bg-white/10" />
          <a href="mailto:hello@ananta.ai" className="font-mono text-[11px] text-white/30 hover:text-teal transition-colors tracking-[2px]">
            hello@ananta.ai
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-mono text-[10px] text-white/20 tracking-[3px] uppercase"
        >
          No credit card · No commitment · First project free
        </motion.p>
      </div>
    </section>
  );
}
