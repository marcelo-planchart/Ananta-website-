"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const results = [
  { metric: "10+ hrs", label: "Saved per project" },
  { metric: "100%", label: "Expert-reviewed output" },
  { metric: "Same-day", label: "Standard drawing turnaround" },
  { metric: "$100K+", label: "Avg annual value per client" },
];

const testimonials = [
  {
    quote: "Elite has handled our shop drawings for years. They know our projects before we explain them. The AI just made everything faster.",
    name: "Glazing Contractor",
    role: "Los Angeles, CA",
    company: "Commercial Glass Contractor",
    initials: "GC",
  },
  {
    quote: "The engineering stamps come back faster than any other firm we've used. The accuracy means fewer revision cycles — which is everything in this business.",
    name: "Project Manager",
    role: "California Glass Contractor",
    company: "Commercial Glazing",
    initials: "PM",
  },
  {
    quote: "Getting our submittals assembled used to take a full day. Now it's part of the delivery. That's hours back every single week.",
    name: "Estimator",
    role: "Commercial Glazing Sub",
    company: "California Glazing",
    initials: "ES",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section id="testimonials" ref={ref} className="section-pad bg-navy2 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-teal" />
            <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase">
              What Contractors Say
            </p>
          </div>
          <h2 className="font-bebas text-[clamp(44px,5.5vw,80px)] leading-[0.95] text-white-off mb-5">
            600+ California Glazing Contractors
            <br />
            <span className="text-gradient-teal">Trust Elite Drafting</span>
          </h2>
          <p className="font-dm font-[300] text-white-dim text-[18px]">
            Built on 13 years of real relationships. Now powered by AI.
          </p>
        </motion.div>

        {/* Result cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.09 }}
              className="glass rounded-xl p-6 text-center group hover:border-[rgba(0,229,200,0.25)] transition-all duration-300"
            >
              <p className="font-bebas text-[52px] text-gradient-teal leading-none mb-2">
                {r.metric}
              </p>
              <p className="font-mono text-[10px] text-white-dim uppercase tracking-[2px]">
                {r.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Desktop: 3-up */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`glass rounded-2xl p-8 flex flex-col justify-between transition-all duration-400 ${
                  i === current
                    ? "border-[rgba(0,229,200,0.25)] shadow-[0_0_40px_rgba(0,229,200,0.06)]"
                    : "hover:border-[rgba(0,229,200,0.15)]"
                }`}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 fill-teal" viewBox="0 0 20 20" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-dm font-[300] text-white-off text-[15px] leading-[1.75] mb-8 flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-[rgba(0,229,200,0.08)]">
                  <div className="w-9 h-9 rounded-full bg-[rgba(0,229,200,0.12)] border border-[rgba(0,229,200,0.20)] flex items-center justify-center">
                    <span className="font-mono text-[11px] text-teal font-[500]">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-dm font-[500] text-white-off text-[13px]">{t.name}</p>
                    <p className="font-mono text-[10px] text-white-dim tracking-[1px] mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: carousel */}
          <div
            className="lg:hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="glass rounded-2xl p-8"
                >
                  <div className="flex gap-0.5 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 fill-teal" viewBox="0 0 20 20" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-dm font-[300] text-white-off text-[16px] leading-[1.75] mb-8 italic">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-5 border-t border-[rgba(0,229,200,0.08)]">
                    <div className="w-9 h-9 rounded-full bg-[rgba(0,229,200,0.12)] border border-[rgba(0,229,200,0.20)] flex items-center justify-center">
                      <span className="font-mono text-[11px] text-teal">{testimonials[current].initials}</span>
                    </div>
                    <div>
                      <p className="font-dm font-[500] text-white-off text-[13px]">{testimonials[current].name}</p>
                      <p className="font-mono text-[10px] text-white-dim tracking-[1px]">{testimonials[current].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} aria-label={`Testimonial ${i + 1}`}
                    className={`cursor-pointer h-1 rounded-full transition-all duration-300 ${
                      i === current ? "w-8 bg-teal" : "w-3 bg-[rgba(0,229,200,0.20)]"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prev} aria-label="Previous" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white-dim hover:text-teal transition-colors cursor-pointer">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={next} aria-label="Next" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white-dim hover:text-teal transition-colors cursor-pointer">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="font-mono text-[10px] text-white-dim text-center mt-8 opacity-40 tracking-[1px]">
          * Placeholder quotes — Silvia to replace with real client testimonials
        </p>
      </div>
    </section>
  );
}
