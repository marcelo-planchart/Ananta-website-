"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";


const results = [
  { metric: "10+ hrs",   label: "Saved per project" },
  { metric: "100%",      label: "Expert-reviewed output" },
  { metric: "Same-day",  label: "Standard drawings" },
  { metric: "$100K+",    label: "Avg annual value per client" },
];

const testimonials = [
  { quote: "Elite has handled our shop drawings for years. They know our projects before we explain them. The AI just made everything faster.", name: "Glazing Contractor", role: "Los Angeles, CA", initials: "GC" },
  { quote: "The engineering stamps come back faster than any other firm we've used. Accuracy means fewer revision cycles — which is everything.", name: "Project Manager", role: "Commercial Glazing", initials: "PM" },
  { quote: "Getting our submittals assembled used to take a full day. Now it's part of the delivery. Hours back every week.", name: "Estimator", role: "Commercial Glazing Sub", initials: "ES" },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="testimonials" ref={ref} className="section-pad bg-canvas2">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <p className="font-mono text-teal-dark text-[11px] tracking-[4px] uppercase mb-3 font-[500]">// WHAT CONTRACTORS SAY</p>
          <h2 className="font-bebas text-[clamp(40px,5vw,72px)] text-ink leading-[0.95] mb-4">
            600+ California Glazing Contractors<br />
            <span className="text-gradient-teal">Trust Elite Drafting</span>
          </h2>
        </motion.div>

        {/* Result cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {results.map((r, i) => (
            <motion.div key={r.label}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-canvas rounded-xl p-6 text-center border border-stroke card-shadow"
            >
              <p className="font-bebas text-[48px] text-teal leading-none mb-1">{r.metric}</p>
              <p className="font-mono text-[10px] text-ink-dim uppercase tracking-[2px]">{r.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials — desktop 3-up */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }}>
          <div className="hidden lg:grid lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className={`bg-canvas rounded-2xl p-7 border transition-all duration-300 card-shadow ${i === current ? "border-teal" : "border-stroke hover:border-teal/30"}`}>
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 fill-teal" viewBox="0 0 20 20" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-sans font-[300] text-ink text-[15px] leading-[1.75] mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-5 border-t border-stroke">
                  <div className="w-9 h-9 rounded-full bg-teal-bg border border-teal/30 flex items-center justify-center">
                    <span className="font-mono text-[11px] text-teal-dark font-[500]">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-sans font-[500] text-ink text-[13px]">{t.name}</p>
                    <p className="font-mono text-[10px] text-ink-dim tracking-[1px]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="lg:hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <AnimatePresence mode="wait">
              <motion.div key={current}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-canvas rounded-2xl p-7 border border-stroke card-shadow"
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 fill-teal" viewBox="0 0 20 20" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-sans font-[300] text-ink text-[16px] leading-[1.75] mb-6 italic">&ldquo;{testimonials[current].quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-5 border-t border-stroke">
                  <div className="w-9 h-9 rounded-full bg-teal-bg border border-teal/30 flex items-center justify-center">
                    <span className="font-mono text-[11px] text-teal-dark">{testimonials[current].initials}</span>
                  </div>
                  <div>
                    <p className="font-sans font-[500] text-ink text-[13px]">{testimonials[current].name}</p>
                    <p className="font-mono text-[10px] text-ink-dim">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center justify-between mt-5">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} aria-label={`Testimonial ${i + 1}`}
                    className={`cursor-pointer h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-teal" : "w-3 bg-canvas3"}`} />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)} aria-label="Previous"
                  className="w-9 h-9 rounded-lg border border-stroke flex items-center justify-center text-ink-dim hover:text-teal-dark hover:border-teal/30 transition-colors cursor-pointer">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setCurrent((c) => (c + 1) % testimonials.length)} aria-label="Next"
                  className="w-9 h-9 rounded-lg border border-stroke flex items-center justify-center text-ink-dim hover:text-teal-dark hover:border-teal/30 transition-colors cursor-pointer">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        <p className="font-mono text-[10px] text-ink-dim text-center mt-8 opacity-50">* Placeholder quotes — Silvia to replace with real client testimonials</p>
      </div>
    </section>
  );
}
