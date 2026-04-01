"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatItem {
  value: string;
  numericEnd: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "10,000+", numericEnd: 10000, suffix: "+", label: "AI Takeoffs Processed" },
  { value: "10+ hrs", numericEnd: 10, suffix: "+ hrs", label: "Saved Per Project on Average" },
  { value: "100%", numericEnd: 100, suffix: "%", label: "Expert-Reviewed Before Delivery" },
  { value: "5 Days", numericEnd: 5, suffix: " Days", label: "To Platform Alpha Launch" },
];

function CountUp({ end, suffix, started }: { end: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const duration = 1800;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [started, end]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="stats"
      className="bg-navy2 border-y border-[rgba(0,229,200,0.10)] py-16"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <p className="font-bebas text-[64px] text-teal leading-none mb-2">
              <CountUp end={s.numericEnd} suffix={s.suffix} started={isInView} />
            </p>
            <p className="font-mono text-[11px] text-white-dim uppercase tracking-[2px]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
