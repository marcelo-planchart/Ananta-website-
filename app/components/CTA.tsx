"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="cta" ref={ref} className="py-24 bg-navy2 relative overflow-hidden">
      {/* Top teal gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal to-transparent opacity-60" />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,229,200,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-bebas text-cta-hl leading-[0.95] mb-6"
        >
          Ready to Stop Doing
          <br />
          Takeoffs{" "}
          <span className="text-teal">by Hand?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-dm font-[300] text-white-dim text-[18px] mb-10 leading-relaxed"
        >
          Join 600+ California glazing contractors who trust Elite Drafting.
          Now powered by AI.
        </motion.p>

        {/* Email form */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-8"
        >
          {submitted ? (
            <div className="flex-1 text-center">
              <p className="font-dm font-[500] text-teal text-[16px]">
                ✓ You&apos;re on the list — we&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-navy3 border border-[rgba(0,229,200,0.20)] rounded-sm px-5 py-3 font-dm text-[14px] text-white-off placeholder:text-white-dim focus:outline-none focus:border-teal transition-colors"
              />
              <button
                type="submit"
                className="font-dm font-[500] text-sm tracking-wider bg-teal text-navy px-8 py-3 rounded-sm hover:bg-teal-dim transition-colors whitespace-nowrap"
              >
                Get Your First Takeoff
              </button>
            </>
          )}
        </motion.form>

        {/* Contact options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row justify-center gap-6 mb-6"
        >
          <a
            href="mailto:investor@ananta.ai"
            className="font-mono text-[12px] text-white-dim hover:text-teal transition-colors tracking-[1px]"
          >
            For investors: investor@ananta.ai
          </a>
          <span className="hidden sm:inline text-white-dim opacity-30">|</span>
          <a
            href="mailto:hello@ananta.ai"
            className="font-mono text-[12px] text-white-dim hover:text-teal transition-colors tracking-[1px]"
          >
            For contractors: hello@ananta.ai
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="font-mono text-[11px] text-white-dim opacity-60 tracking-[2px]"
        >
          No credit card. No commitment. First project free.
        </motion.p>
      </div>
    </section>
  );
}
