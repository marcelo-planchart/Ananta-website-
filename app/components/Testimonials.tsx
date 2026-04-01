"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Elite has handled our shop drawings for years. They know our projects before we explain them. The AI just made everything faster.",
    name: "Glazing Contractor",
    role: "Los Angeles, CA",
  },
  {
    quote: "The engineering stamps come back faster than any other firm we've used. Accuracy means fewer revision cycles — which is everything.",
    name: "Project Manager",
    role: "Commercial Glazing",
  },
  {
    quote: "Getting our submittals assembled used to take a full day. Now it's part of the delivery. Hours back every week.",
    name: "Estimator",
    role: "Commercial Glazing Sub",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const t = testimonials[current];

  return (
    <section id="testimonials" ref={ref} className="bg-ink relative grain overflow-hidden">
      {/* Radial teal wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(10,123,104,0.07) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto px-8 py-28 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">Testimonials</p>
          <h2 className="font-display font-bold text-[clamp(30px,3.5vw,52px)] text-white leading-[1.05] tracking-tight">
            600+ California contractors<br />
            <span className="text-teal font-[500]">trust Elite Drafting</span>
          </h2>
        </motion.div>

        {/* Quote stage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Big decorative open-quote */}
          <div className="font-display font-bold text-teal/15 leading-none select-none mb-[-20px]" style={{ fontSize: "clamp(72px,8vw,120px)" }}>
            &ldquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-sans italic font-[400] text-[clamp(18px,2.2vw,28px)] text-white/85 leading-[1.65] max-w-3xl mx-auto mb-10">
                {t.quote}
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-6 bg-teal/40" />
                <p className="font-sans font-[600] text-white/65 text-[13px]">{t.name}</p>
                <span className="text-white/20">·</span>
                <p className="font-mono text-[11px] text-white/30 tracking-[1px]">{t.role}</p>
                <div className="h-px w-6 bg-teal/40" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-14">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`cursor-pointer rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-8 h-[3px] bg-teal"
                    : "w-4 h-[3px] bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
