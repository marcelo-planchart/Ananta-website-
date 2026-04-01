"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

const stats = [
  { value: "600+",    label: "Glass Contractors" },
  { value: "10+ hrs", label: "Saved / Project" },
  { value: "13 YRS",  label: "Industry Experience" },
  { value: "100%",    label: "Expert-Reviewed" },
];

export default function Hero() {
  return (
    <section id="hero" className="relative bg-canvas pt-24 pb-0 overflow-hidden">
      {/* Subtle top teal tint */}
      <div className="absolute top-0 left-0 right-0 h-[400px] pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(0,196,173,0.04) 0%, transparent 100%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div className="py-12">
            {/* Eyebrow */}
            <motion.div {...fadeUp(0.15)} className="flex items-center gap-2 mb-6">
              <span className="inline-block w-6 h-[2px] bg-teal rounded-full" />
              <p className="font-mono text-teal-dark text-[11px] tracking-[4px] uppercase font-[500]">
                Built by Elite Drafting · 13 Years · 600+ Clients
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1 {...fadeUp(0.25)} className="font-bebas text-hero leading-[0.95] text-ink mb-6">
              The Intelligence Layer
              <br />
              for the{" "}
              <span className="text-gradient-teal">Glass Industry</span>
            </motion.h1>

            {/* Sub */}
            <motion.p {...fadeUp(0.4)} className="font-sans font-[300] text-[18px] text-ink-dim leading-[1.7] max-w-[480px] mb-10">
              AI-powered takeoff, shop drawings, and engineering stamps —
              delivered by California&apos;s most trusted glazing service.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row gap-3 mb-14">
              <a href="#cta"
                className="font-sans font-[500] text-[15px] bg-teal text-white px-8 py-4 rounded-xl hover:bg-teal-dim transition-all duration-300 shadow-md hover:shadow-lg text-center">
                Get Your First AI Takeoff
              </a>
              <a href="#how-it-works"
                className="font-sans font-[400] text-[15px] border-2 border-stroke text-ink px-8 py-4 rounded-xl hover:border-teal hover:text-teal-dark transition-all duration-300 text-center">
                See How It Works →
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeUp(0.65)} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-bebas text-[34px] text-teal-dark leading-none mb-1">{s.value}</p>
                  <p className="font-mono text-[10px] text-ink-dim uppercase tracking-[2px]">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — real photo */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden card-shadow">
              <Image
                src="https://elitedraftingdesign.com/img/About-us/About1.jpg"
                alt="Elite Drafting team working on glass shop drawings"
                width={680}
                height={520}
                className="w-full h-[520px] object-cover"
                priority
              />
              {/* Badge overlay */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4 card-shadow">
                <p className="font-bebas text-[28px] text-teal leading-none">13 Years</p>
                <p className="font-sans text-[12px] text-ink-dim font-[500] mt-0.5">Trusted in California</p>
              </div>
            </div>
            {/* Teal accent shape */}
            <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-teal-bg rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="mt-16">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#F8FAFC" />
        </svg>
      </div>
    </section>
  );
}
