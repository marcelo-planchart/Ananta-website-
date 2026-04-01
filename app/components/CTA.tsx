"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section id="cta" ref={ref} className="relative py-28 overflow-hidden bg-canvas">
      {/* Subtle teal glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[2px] pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #00C4AD 40%, #00C4AD 60%, transparent)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-5"
        >
          Get Started
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="font-bebas text-[clamp(44px,6vw,80px)] leading-[0.93] text-ink mb-6"
        >
          Ready to Stop Doing{" "}
          <span className="text-gradient-teal">Takeoffs by Hand?</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-ink-dim text-[17px] leading-[1.7] mb-10 max-w-xl mx-auto"
        >
          Join 600+ California glazing contractors who trust Elite Drafting.
          Now powered by AI.
        </motion.p>

        {/* Email form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-8"
        >
          {submitted ? (
            <div className="flex-1 rounded-xl py-4 px-6 flex items-center justify-center gap-2 bg-teal-bg border border-teal/30">
              <span className="w-2 h-2 rounded-full bg-teal" />
              <p className="font-sans font-medium text-teal-dark text-[15px]">
                You&apos;re on the list — we&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-dim" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-xl border border-stroke pl-11 pr-5 py-4 font-sans text-[14px] text-ink placeholder:text-ink-dim focus:outline-none focus:border-teal transition-colors bg-canvas"
                  aria-label="Email address"
                />
              </div>
              <button
                type="submit"
                className="group font-sans font-semibold text-[14px] tracking-wide bg-teal text-white px-8 py-4 rounded-xl hover:bg-teal-dark transition-all duration-300 shadow-[0_4px_20px_rgba(0,196,173,0.35)] hover:shadow-[0_4px_28px_rgba(0,196,173,0.50)] flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                Get Your First Takeoff
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </>
          )}
        </motion.form>

        {/* Contact options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-5"
        >
          <a href="mailto:investor@ananta.ai"
            className="font-mono text-[12px] text-ink-dim hover:text-teal-dark transition-colors tracking-[1px]"
          >
            investor@ananta.ai
          </a>
          <span className="hidden sm:block text-stroke-strong">|</span>
          <a href="mailto:hello@ananta.ai"
            className="font-mono text-[12px] text-ink-dim hover:text-teal-dark transition-colors tracking-[1px]"
          >
            hello@ananta.ai
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-mono text-[11px] text-ink-dim opacity-60 tracking-[3px] uppercase"
        >
          No credit card · No commitment · First project free
        </motion.p>
      </div>
    </section>
  );
}
