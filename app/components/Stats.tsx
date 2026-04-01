"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { end: 10000, suffix: "+",    label: "AI Takeoffs Processed",       sub: "and growing" },
  { end: 10,    suffix: "+ hrs", label: "Saved Per Project",           sub: "on average" },
  { end: 100,   suffix: "%",    label: "Expert-Reviewed Deliveries",  sub: "before delivery" },
  { end: 600,   suffix: "+",    label: "Licensed Contractors Served", sub: "in California" },
];

function CountUp({ end, suffix, started }: { end: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let t0: number | null = null;
    const dur = 1800;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end]);
  return <>{end >= 1000 ? count.toLocaleString() : count}{suffix}</>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-canvas2 py-16 border-b border-stroke">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y-2 divide-x-0 lg:divide-y-0 lg:divide-x-2 divide-stroke">
        {stats.map((s) => (
          <div key={s.label} className="text-center px-8 py-8">
            <p className="font-bebas text-[60px] text-teal leading-none mb-1">
              <CountUp end={s.end} suffix={s.suffix} started={inView} />
            </p>
            <p className="font-sans font-[500] text-ink text-[14px] mb-0.5">{s.label}</p>
            <p className="font-mono text-[10px] text-ink-dim uppercase tracking-[2px]">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
