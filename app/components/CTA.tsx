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
    <section id="cta" ref={ref} className="relative py-32 overflow-hidden bg-navy">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,229,200,0.07) 0%, transparent 65%)",
          }}
        />
        {/* Top-left orb */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,229,200,0.06) 0%, transparent 65%)", filter: "blur(40px)" }}
        />
        {/* Bottom-right orb */}
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -right-20 bottom-0 w-[600px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,100,200,0.05) 0%, transparent 65%)", filter: "blur(60px)" }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-50" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,200,0.5) 30%, rgba(0,229,200,0.5) 70%, transparent)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-teal" />
          <p className="font-mono text-teal text-[11px] tracking-[5px] uppercase">Get Started</p>
          <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-teal" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-bebas text-cta-hl leading-[0.93] mb-8"
        >
          <span className="text-gradient-white">Ready to Stop Doing</span>
          <br />
          <span className="text-gradient-white">Takeoffs </span>
          <span className="text-gradient-teal">by Hand?</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-dm font-[300] text-white-dim text-[18px] leading-[1.7] mb-12 max-w-xl mx-auto"
        >
          Join 600+ California glazing contractors who trust Elite Drafting.
          Now powered by AI.
        </motion.p>

        {/* Email form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-10"
        >
          {submitted ? (
            <div className="flex-1 glass rounded-xl py-4 px-6 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal" />
              <p className="font-dm font-[400] text-teal text-[15px]">
                You&apos;re on the list — we&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white-dim" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full glass rounded-xl pl-11 pr-5 py-4 font-dm text-[14px] text-white-off placeholder:text-white-dim focus:outline-none focus:border-teal transition-colors"
                  aria-label="Email address"
                />
              </div>
              <button
                type="submit"
                className="group font-dm font-[500] text-[14px] tracking-wide bg-teal text-navy px-8 py-4 rounded-xl hover:bg-teal-dim transition-all duration-300 shadow-[0_0_40px_rgba(0,229,200,0.30)] hover:shadow-[0_0_60px_rgba(0,229,200,0.50)] flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
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
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-6"
        >
          <a href="mailto:investor@ananta.ai"
            className="group flex items-center gap-2 font-mono text-[12px] text-white-dim hover:text-teal transition-colors tracking-[1px]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white-dim group-hover:bg-teal transition-colors" />
            For investors: investor@ananta.ai
          </a>
          <span className="hidden sm:block text-white-dim opacity-20">|</span>
          <a href="mailto:hello@ananta.ai"
            className="group flex items-center gap-2 font-mono text-[12px] text-white-dim hover:text-teal transition-colors tracking-[1px]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white-dim group-hover:bg-teal transition-colors" />
            For contractors: hello@ananta.ai
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="font-mono text-[11px] text-white-dim opacity-50 tracking-[3px] uppercase"
        >
          No credit card · No commitment · First project free
        </motion.p>
      </div>
    </section>
  );
}
