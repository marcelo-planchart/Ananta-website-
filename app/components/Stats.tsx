"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

const stats = [
  { end: 10000, suffix: "+",     label: "AI Takeoffs\nProcessed",       sub: "and growing" },
  { end: 10,    suffix: "+ hrs", label: "Saved Per\nProject",           sub: "on average" },
  { end: 100,   suffix: "%",     label: "Expert-Reviewed\nDeliveries",  sub: "before delivery" },
  { end: 600,   suffix: "+",     label: "Licensed Contractors\nServed", sub: "in California" },
];

function CountUp({ end, suffix, started }: { end: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let t0: number | null = null;
    const dur = 2200;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end]);
  return <>{end >= 1000 ? count.toLocaleString() : count}{suffix}</>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-ink relative grain overflow-hidden">
      {/* Subtle teal gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(10,123,104,0.06) 0%, transparent 60%)" }}
      />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`px-8 py-20 text-center ${i > 0 ? "border-l border-white/[0.05]" : ""}`}
            >
              <p className="font-display font-bold text-[clamp(48px,5.5vw,80px)] text-white leading-none mb-4 tracking-tight">
                <CountUp end={s.end} suffix={s.suffix} started={inView} />
              </p>
              <p className="font-sans font-[500] text-white/50 text-[12px] tracking-wide whitespace-pre-line leading-snug mb-1.5">
                {s.label}
              </p>
              <p className="font-mono text-[10px] text-teal uppercase tracking-[3px]">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
