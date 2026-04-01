"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Upload, ScanSearch, ShieldCheck, FileCheck, PenTool, Award } from "lucide-react";
import Image from "next/image";

const steps = [
  { num: "01", title: "Upload Your Drawings",       body: "PDF, DWG, or scanned — our system accepts every format. No setup required.", Icon: Upload,       status: "Upload Complete",   metric: "Any format" },
  { num: "02", title: "AI Reads the Blueprint",      body: "Our vision model identifies every glass panel, frame type, and hardware spec automatically.",       Icon: ScanSearch,   status: "AI Processing",    metric: "~3 min avg" },
  { num: "03", title: "Expert Review Gate",          body: "A senior glazing specialist reviews every AI output before delivery. 13 years of domain expertise. Every time.", badge: "Our Moat", Icon: ShieldCheck, status: "Human Gate Active", metric: "100% reviewed" },
  { num: "04", title: "Quote & Approval",            body: "Takeoff data flows into our quoting engine. Review and approve in your client portal.",            Icon: FileCheck,    status: "Quote Ready",      metric: "Portal delivery" },
  { num: "05", title: "Shop Drawings Delivered",     body: "Expert-drafted shop drawings delivered through your payment-gated portal in 24–48 hours.",         Icon: PenTool,      status: "Drawings Ready",   metric: "24–48 hr" },
  { num: "06", title: "Licensed Engineering Stamp",  body: "Every drawing receives a California-licensed engineering stamp. Legally certified. Done.",          Icon: Award,        status: "Stamped & Certified", metric: "CA Licensed" },
];

// Images to cycle on right panel
const panelImages = [
  "https://elitedraftingdesign.com/img/About-us/About1.jpg",
  "https://elitedraftingdesign.com/img/About-us/About2.jpg",
  "https://elitedraftingdesign.com/img/About-us/About3.jpg",
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" ref={ref} className="section-pad bg-canvas">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-16"
        >
          <p className="font-mono text-teal-dark text-[11px] tracking-[4px] uppercase mb-3 font-[500]">// HOW IT WORKS</p>
          <h2 className="font-bebas text-[clamp(40px,5vw,72px)] text-ink leading-[0.95] mb-4">
            Blueprint to Stamp in <span className="text-gradient-teal">6 Steps</span>
          </h2>
          <p className="font-sans font-[300] text-ink-dim text-[17px]">Upload your drawings. We handle everything else.</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_460px] gap-14 items-start">
          {/* Accordion */}
          <div>
            {steps.map((step, i) => {
              const isOpen = active === i;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="border-b border-stroke cursor-pointer group"
                  onClick={() => setActive(i)}
                  role="button" tabIndex={0} aria-expanded={isOpen}
                  onKeyDown={(e) => e.key === "Enter" && setActive(i)}
                >
                  <div className="flex items-start gap-4 py-5">
                    <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-mono transition-all duration-300 ${isOpen ? "bg-teal text-white shadow-md" : "border border-stroke-strong text-ink-dim group-hover:border-teal group-hover:text-teal-dark"}`}>
                      {step.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-sans font-[500] text-[15px] transition-colors duration-200 ${isOpen ? "text-ink" : "text-ink-dim group-hover:text-ink"}`}>
                          {step.title}
                        </h3>
                        <motion.span animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.25 }}
                          className="text-teal text-[16px] ml-4 shrink-0">›</motion.span>
                      </div>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div key="body"
                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
                            className="overflow-hidden"
                          >
                            <p className="font-sans font-[300] text-ink-dim text-[14px] leading-[1.7] mt-3 pr-4">{step.body}</p>
                            {step.badge && (
                              <span className="inline-block mt-3 font-mono text-[10px] tracking-[2px] uppercase text-teal-dark bg-teal-bg border border-teal/30 px-3 py-1 rounded-full">
                                {step.badge}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: photo + card */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="relative rounded-2xl overflow-hidden card-shadow"
              >
                <Image
                  src={panelImages[active % panelImages.length]}
                  alt={`Step ${steps[active].num} — ${steps[active].title}`}
                  width={460} height={320}
                  className="w-full h-[280px] object-cover"
                />
                <div className="p-5 bg-white border-t border-stroke">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 text-teal inline-flex items-center justify-center">●</span>
                      <span className="font-sans font-[500] text-[14px] text-ink">{steps[active].title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-teal-dark bg-teal-bg px-2.5 py-1 rounded-full">
                      {steps[active].status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                    <span className="font-mono text-[11px] text-ink-dim">{steps[active].metric}</span>
                  </div>
                  {/* Progress */}
                  <div className="mt-4 h-1 bg-canvas3 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-teal rounded-full"
                      animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: [0.22,1,0.36,1] as [number,number,number,number] }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Dots */}
            <div className="flex justify-center gap-2">
              {steps.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Step ${i + 1}`}
                  className={`cursor-pointer h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-teal" : "w-3 bg-canvas3 hover:bg-teal/40"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
