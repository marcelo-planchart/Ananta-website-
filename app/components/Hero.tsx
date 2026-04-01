"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const stats = [
  { value: "600+", label: "Glass Contractors" },
  { value: "10+ hrs", label: "Saved / Project" },
  { value: "13 YRS", label: "Domain Expertise" },
  { value: "$0", label: "Cold Outreach" },
];

function ParallaxOrb({
  mouseX,
  mouseY,
  strength,
  className,
  style,
}: {
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
  strength: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const x = useTransform(mouseX, (v) => v * strength);
  const y = useTransform(mouseY, (v) => v * strength);
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ x, y, ...style }}
    />
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 60, damping: 30 });
  const mouseY = useSpring(rawMouseY, { stiffness: 60, damping: 30 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      rawMouseX.set((e.clientX / w - 0.5) * 40);
      rawMouseY.set((e.clientY / h - 0.5) * 40);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawMouseX, rawMouseY]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 32 },
    animate: mounted ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-navy noise-overlay"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none z-0" />

      {/* Ambient orbs — parallax */}
      <ParallaxOrb
        mouseX={mouseX}
        mouseY={mouseY}
        strength={0.6}
        className="orb orb-teal w-[700px] h-[700px] top-[-200px] right-[-150px] opacity-70"
      />
      <ParallaxOrb
        mouseX={mouseX}
        mouseY={mouseY}
        strength={-0.4}
        className="orb orb-navy w-[600px] h-[600px] bottom-[-100px] left-[-200px] opacity-80"
      />
      <ParallaxOrb
        mouseX={mouseX}
        mouseY={mouseY}
        strength={0.3}
        className="orb orb-teal w-[300px] h-[300px] top-[40%] left-[20%] opacity-20"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20 w-full">
        {/* Eyebrow */}
        <motion.div {...fadeUp(0.15)} className="flex items-center gap-3 mb-10">
          <div className="h-[1px] w-8 bg-teal" />
          <p className="font-mono text-teal text-[11px] tracking-[5px] uppercase">
            Built by Elite Drafting · 13 Years · 600+ Clients
          </p>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.3)}
          className="font-bebas text-hero leading-[0.90] tracking-tight mb-8 max-w-[900px]"
        >
          <span className="block text-gradient-white">The Intelligence Layer</span>
          <span className="block">for the{" "}
            <span className="text-gradient-teal">Glass Industry</span>
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.45)}
          className="font-dm font-[300] text-[19px] text-white-dim leading-[1.7] max-w-[540px] mb-14"
        >
          AI-powered takeoff, shop drawings, engineering stamps, and submittal
          packages — delivered by the most trusted name in California glazing.{" "}
          <span className="text-white-off font-[400]">Done-for-you. Certified.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.6)} className="flex flex-col sm:flex-row gap-4 mb-20">
          <a
            href="#cta"
            className="group relative font-dm font-[500] text-[14px] tracking-[0.08em] bg-teal text-navy px-10 py-4 rounded-xl hover:bg-teal-dim transition-all duration-300 shadow-[0_0_40px_rgba(0,229,200,0.30)] hover:shadow-[0_0_60px_rgba(0,229,200,0.50)] text-center overflow-hidden"
          >
            <span className="relative z-10">Get Your First AI Takeoff</span>
          </a>
          <a
            href="#how-it-works"
            className="font-dm font-[400] text-[14px] tracking-[0.08em] border border-[rgba(0,229,200,0.30)] text-teal px-10 py-4 rounded-xl hover:bg-[rgba(0,229,200,0.06)] hover:border-teal transition-all duration-300 text-center"
          >
            See How It Works →
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.75)}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[rgba(0,229,200,0.10)] rounded-xl overflow-hidden"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-8 py-6 bg-[rgba(10,22,40,0.5)] backdrop-blur-sm ${
                i < 3 ? "border-r border-[rgba(0,229,200,0.08)]" : ""
              } ${i < 2 ? "border-b border-[rgba(0,229,200,0.08)] md:border-b-0" : ""}`}
            >
              <p className="font-bebas text-[38px] text-gradient-teal leading-none mb-1">
                {s.value}
              </p>
              <p className="font-mono text-[10px] text-white-dim uppercase tracking-[3px]">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent pointer-events-none z-10" />
    </section>
  );
}
