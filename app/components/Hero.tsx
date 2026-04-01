"use client";

import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const stats = [
  { value: "600+", label: "Licensed Glass Contractors" },
  { value: "10+ hrs", label: "Saved Per Project" },
  { value: "13 YRS", label: "Industry Experience" },
  { value: "$0", label: "Cold Outreach Needed" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-navy"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Top-right teal glow */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 100% 0%, rgba(0,229,200,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16 w-full">
        {/* Eyebrow */}
        <motion.p
          {...fadeUp(0.2)}
          className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-8"
        >
          // Built by Elite Drafting · 13 Years · 600+ Clients
        </motion.p>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.4)}
          className="font-bebas text-hero leading-[0.92] tracking-tight mb-6 max-w-[820px]"
        >
          The Intelligence Layer
          <br />
          for the{" "}
          <span className="text-teal">Glass Industry</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.6)}
          className="font-dm font-[300] text-[20px] text-white-dim leading-relaxed max-w-[560px] mb-12"
        >
          AI-powered takeoff, shop drawings, engineering stamps, and submittal
          packages — delivered by the most trusted name in California glazing.
          Done-for-you. Certified.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.8)}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#cta"
            className="font-dm font-[500] text-sm tracking-wider bg-teal text-navy px-10 py-4 rounded-sm hover:bg-teal-dim transition-colors text-center"
          >
            Get Your First AI Takeoff
          </a>
          <a
            href="#how-it-works"
            className="font-dm font-[400] text-sm tracking-wider border border-teal text-teal px-10 py-4 rounded-sm hover:bg-[rgba(0,229,200,0.06)] transition-colors text-center"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(1.0)}
          className="mt-16 pt-10 border-t border-[rgba(0,229,200,0.15)] grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-bebas text-[42px] text-teal leading-none mb-1">
                {s.value}
              </p>
              <p className="font-mono text-[11px] text-white-dim uppercase tracking-[2px]">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
