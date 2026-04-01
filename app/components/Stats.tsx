"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatItem {
  numericEnd: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const stats: StatItem[] = [
  { numericEnd: 10000, suffix: "+", label: "AI Takeoffs Processed", sublabel: "And counting" },
  { numericEnd: 10, suffix: "+ hrs", label: "Saved Per Project", sublabel: "On average" },
  { numericEnd: 100, suffix: "%", label: "Expert-Reviewed", sublabel: "Before delivery" },
  { numericEnd: 5, suffix: " Days", label: "To Alpha Launch", sublabel: "Platform release" },
];

function CountUp({ end, suffix, started }: { end: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const duration = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end]);

  const display = end >= 1000 ? count.toLocaleString() : count;
  return <>{display}{suffix}</>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="stats" className="relative py-0 bg-navy overflow-hidden">
      {/* Full-bleed divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[rgba(0,229,200,0.25)] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16 justify-center">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-teal" />
          <p className="font-mono text-[11px] text-white-dim tracking-[4px] uppercase">
            By the numbers
          </p>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-teal" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`relative flex flex-col items-center text-center px-8 py-10 group ${
                i < stats.length - 1 ? "lg:border-r border-[rgba(0,229,200,0.08)]" : ""
              } ${i === 0 || i === 2 ? "border-b border-[rgba(0,229,200,0.08)] lg:border-b-0" : ""}`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-[rgba(0,229,200,0.02)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

              {/* Number */}
              <div className="font-bebas text-[72px] lg:text-[80px] leading-none mb-3 text-gradient-teal relative z-10">
                <CountUp end={s.numericEnd} suffix={s.suffix} started={isInView} />
              </div>

              {/* Label */}
              <p className="font-dm font-[500] text-white-off text-[15px] mb-1 relative z-10">
                {s.label}
              </p>
              <p className="font-mono text-[11px] text-white-dim uppercase tracking-[2px] relative z-10">
                {s.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[rgba(0,229,200,0.25)] to-transparent" />
    </section>
  );
}
