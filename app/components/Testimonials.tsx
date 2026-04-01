"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Elite has handled our shop drawings for years. They know our projects before we explain them. The AI just made everything faster.",
    name: "Glazing Contractor",
    role: "Los Angeles, CA",
    initials: "GC",
  },
  {
    quote: "The engineering stamps come back faster than any other firm we've used. Accuracy means fewer revision cycles — which is everything.",
    name: "Project Manager",
    role: "Commercial Glazing",
    initials: "PM",
  },
  {
    quote: "Getting our submittals assembled used to take a full day. Now it's part of the delivery. Hours back every week.",
    name: "Estimator",
    role: "Commercial Glazing Sub",
    initials: "ES",
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
    <section id="testimonials" ref={ref} className="section-pad bg-ink overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(13,107,90,0.08) 0%, transparent 70%)" }}
      />
      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">What Contractors Say</p>
          <h2 className="font-display font-semibold text-[clamp(32px,4vw,56px)] text-white leading-[1.0]">
            600+ California glazing contractors<br />
            <em className="italic font-light text-teal">trust Elite Drafting</em>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="font-display leading-none text-teal/20 select-none mb-[-28px]"
            style={{ fontSize: "clamp(80px,10vw,130px)" }}
          >
            &ldquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display italic font-light text-[clamp(20px,2.6vw,32px)] text-white/90 leading-[1.6] max-w-3xl mx-auto mb-10">
                {t.quote}
              </p>
              <div className="flex items-center justify-center gap-3 mb-12">
                <div className="w-9 h-9 rounded-full bg-teal/15 border border-teal/25 flex items-center justify-center">
                  <span className="font-mono text-[11px] text-teal">{t.initials}</span>
                </div>
                <div className="text-left">
                  <p className="font-sans font-[500] text-white/80 text-[13px]">{t.name}</p>
                  <p className="font-mono text-[10px] text-white/35 tracking-[1px]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-5">
            <button
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/35 hover:text-white/80 hover:border-white/25 transition-colors cursor-pointer"
            >
              <ChevronLeft size={15} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`cursor-pointer h-[3px] rounded-full transition-all duration-500 ${i === current ? "w-10 bg-teal" : "w-5 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
              aria-label="Next"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/35 hover:text-white/80 hover:border-white/25 transition-colors cursor-pointer"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </motion.div>

        <p className="font-mono text-[10px] text-white/15 text-center mt-10 tracking-[2px] uppercase">
          Placeholder quotes — to be replaced with real client testimonials
        </p>
      </div>
    </section>
  );
}
