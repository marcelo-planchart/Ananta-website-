"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const moatPoints = [
  { title: "Behavioral Correction Data",  body: "Every expert fix becomes a labeled training pair — impossible to replicate without years of trust.", metric: "Grows every project" },
  { title: "Embedded in the Workflow",    body: "Contractors can't leave without losing project history, drawings, and stamps. Switching costs compound.", metric: "Deep lock-in" },
  { title: "Engineering Authority",       body: "We hold the California engineering license every project requires. 13 years to build.",               metric: "13 years to earn" },
  { title: "Technical Databases",         body: "Thousands of aluminum profile and hardware SKUs enabling automated submittal generation.",            metric: "Industry-exclusive" },
];

export default function DataFlywheel() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="section-pad bg-canvas">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">The Moat</p>
          <h2 className="font-display font-bold text-[clamp(36px,4.5vw,64px)] text-ink leading-[1.02] tracking-tight mb-4">
            The data flywheel<br /><span className="text-teal">nobody can buy</span>
          </h2>
          <p className="font-sans text-ink-dim text-[16px] leading-relaxed">Every project makes us harder to compete with.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden card-shadow">
              <Image
                src="https://elitedraftingdesign.com/img/About-us/About2.jpg"
                alt="Elite Drafting team — 13 years of glazing expertise"
                width={600}
                height={440}
                className="w-full h-[380px] object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-5 -right-5 bg-canvas rounded-lg px-6 py-4 card-shadow border border-stroke">
              <p className="font-display font-bold text-[28px] text-teal leading-none tracking-tight">13 yrs</p>
              <p className="font-sans font-[500] text-[11px] text-ink-dim mt-0.5 tracking-wide">Domain expertise</p>
            </div>
            {/* Accent block */}
            <div className="absolute -top-3 -left-3 w-24 h-24 bg-teal-bg rounded-lg -z-10" />
          </motion.div>

          {/* Moat points */}
          <div className="space-y-3">
            {moatPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="bg-canvas2 rounded-lg p-6 border border-stroke hover:border-teal/25 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-teal" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                      <h4 className="font-sans font-[600] text-ink text-[14px]">{point.title}</h4>
                      <span className="font-mono text-[9px] text-teal bg-teal-bg px-2 py-0.5 rounded-sm border border-teal/15 tracking-[1px]">
                        {point.metric}
                      </span>
                    </div>
                    <p className="font-sans text-ink-dim text-[13px] leading-[1.75]">{point.body}</p>
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
