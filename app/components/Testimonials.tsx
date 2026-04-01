"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const results = [
  { metric: "10+ hrs", label: "saved per project" },
  { metric: "100%", label: "expert-reviewed output" },
  { metric: "Same-day", label: "turnaround on standard drawings" },
  { metric: "$100K+", label: "avg annual value per contractor" },
];

const testimonials = [
  {
    quote:
      "Elite has handled our shop drawings for years. They know our projects before we explain them. The AI just made everything faster.",
    name: "Glazing Contractor",
    role: "Los Angeles, CA",
    company: "Commercial Glass Contractor",
  },
  {
    quote:
      "The engineering stamps come back faster than any other firm we've used. And the accuracy means fewer revision cycles.",
    name: "Project Manager",
    role: "California Glass Contractor",
    company: "Commercial Glazing",
  },
  {
    quote:
      "Getting our submittals assembled used to take a full day. Now it's part of the delivery.",
    name: "Estimator",
    role: "Commercial Glazing Sub",
    company: "California Glazing",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-teal text-[14px]">★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" ref={ref} className="py-24 bg-navy2">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">
            // WHAT CONTRACTORS SAY
          </p>
          <h2 className="font-bebas text-[clamp(40px,5vw,72px)] text-white-off leading-tight mb-4">
            600+ California Glazing Contractors
            <br />
            Trust Elite Drafting
          </h2>
          <p className="font-dm font-[300] text-white-dim text-[18px]">
            Built on 13 years of real relationships. Now powered by AI.
          </p>
        </motion.div>

        {/* Result metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-navy3 border border-[rgba(0,229,200,0.10)] rounded-lg p-6 text-center"
            >
              <p className="font-bebas text-[48px] text-teal leading-none mb-2">
                {r.metric}
              </p>
              <p className="font-mono text-[11px] text-white-dim uppercase tracking-[2px]">
                {r.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial carousel */}
        <div className="relative">
          {/* Desktop: show all 3 */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                className="bg-navy3 border border-[rgba(0,229,200,0.10)] rounded-lg p-7 hover:border-[rgba(0,229,200,0.25)] transition-colors"
              >
                <Stars />
                <p className="font-dm font-[300] text-white-off text-[15px] leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-[rgba(0,229,200,0.10)] pt-4">
                  <p className="font-dm font-[500] text-white-off text-[13px]">{t.name}</p>
                  <p className="font-mono text-[11px] text-white-dim tracking-[1px] mt-1">
                    {t.role} · {t.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: single card carousel */}
          <div className="md:hidden">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-navy3 border border-[rgba(0,229,200,0.10)] rounded-lg p-7"
            >
              <Stars />
              <p className="font-dm font-[300] text-white-off text-[15px] leading-relaxed mb-6 italic">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <div className="border-t border-[rgba(0,229,200,0.10)] pt-4">
                <p className="font-dm font-[500] text-white-off text-[13px]">
                  {testimonials[current].name}
                </p>
                <p className="font-mono text-[11px] text-white-dim tracking-[1px] mt-1">
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-teal" : "w-4 bg-[rgba(0,229,200,0.20)]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Placeholder note */}
        <p className="font-mono text-[10px] text-white-dim text-center mt-8 tracking-[1px] opacity-50">
          * Placeholder quotes — Silvia to replace with real client testimonials
        </p>
      </div>
    </section>
  );
}
