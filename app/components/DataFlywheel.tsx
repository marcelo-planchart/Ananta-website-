"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const moatPoints = [
  { title: "Behavioral Correction Data",   body: "Every expert fix becomes a labeled training pair — impossible to replicate without years of trust.", metric: "Grows every project" },
  { title: "Embedded in the Workflow",     body: "Contractors can't leave without losing project history, drawings, and stamps. Switching costs compound.", metric: "Deep lock-in" },
  { title: "Engineering Authority",        body: "We hold the California engineering license every project requires. It took 13 years to build.",        metric: "13 years to earn" },
  { title: "Technical Databases",          body: "Thousands of aluminum profile and hardware SKUs enabling automated submittal generation.",             metric: "Industry-exclusive" },
];

export default function DataFlywheel() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="section-pad bg-canvas2">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">The Moat</p>
          <h2 className="font-display font-semibold text-[clamp(40px,4.5vw,68px)] text-ink leading-[1.0] mb-4">
            The data flywheel{" "}
            <em className="italic text-gradient-teal">nobody can buy</em>
          </h2>
          <p className="font-sans font-[300] text-ink-dim text-[17px] leading-relaxed">Every project makes us harder to compete with.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden card-shadow">
              <Image
                src="https://elitedraftingdesign.com/img/About-us/About2.jpg"
                alt="Elite Drafting team — 13 years of glazing expertise"
                width={600} height={440}
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-canvas rounded-xl px-6 py-4 card-shadow border border-stroke">
              <p className="font-display italic font-semibold text-[32px] text-teal leading-none">13 yrs</p>
              <p className="font-sans font-[400] text-[12px] text-ink-dim mt-0.5">Domain expertise</p>
            </div>
            <div className="absolute -top-4 -left-4 w-28 h-28 bg-teal-bg rounded-2xl -z-10" />
          </motion.div>

          {/* Moat points */}
          <div className="space-y-3">
            {moatPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="bg-canvas rounded-xl p-6 border border-stroke hover:border-teal/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-teal" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <h4 className="font-sans font-[500] text-ink text-[15px]">{point.title}</h4>
                      <span className="font-mono text-[10px] text-teal bg-teal-bg px-2.5 py-1 rounded-full border border-teal/20">
                        {point.metric}
                      </span>
                    </div>
                    <p className="font-sans font-[300] text-ink-dim text-[14px] leading-[1.7]">{point.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
