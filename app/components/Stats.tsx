"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

const stats = [
  { end: 10000, suffix: "+",     label: "AI Takeoffs Processed",       sub: "and growing" },
  { end: 10,    suffix: "+ hrs", label: "Saved Per Project",            sub: "on average" },
  { end: 100,   suffix: "%",     label: "Expert-Reviewed Deliveries",   sub: "before delivery" },
  { end: 600,   suffix: "+",     label: "Licensed Contractors Served",  sub: "in California" },
];

function CountUp({ end, suffix, started }: { end: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let t0: number | null = null;
    const dur = 2000;
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
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-ink overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-2 divide-x-0 lg:divide-y-0 lg:divide-x divide-white/[0.06]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="px-10 py-16 text-center"
            >
              <p className="font-display font-light text-[clamp(56px,6vw,88px)] text-white leading-none mb-3 tracking-tight">
                <CountUp end={s.end} suffix={s.suffix} started={inView} />
              </p>
              <p className="font-sans font-[500] text-white/70 text-[13px] mb-1 tracking-wide">{s.label}</p>
              <p className="font-mono text-[10px] text-teal uppercase tracking-[3px]">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
