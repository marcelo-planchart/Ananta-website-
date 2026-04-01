"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface Step {
  num: string;
  title: string;
  body: string;
  badge?: string;
  icon: string;
  status: string;
  metric: string;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Upload Your Architectural Drawings",
    body: "Send us your project plans in any format — PDF, DWG, or scanned drawings. Our system accepts everything.",
    icon: "↑",
    status: "Upload Complete",
    metric: "Any Format Accepted",
  },
  {
    num: "02",
    title: "AI Reads Your Blueprint",
    body: "Our vision-language model identifies every glass panel, frame type, hardware spec, and dimension automatically. No manual counting.",
    icon: "⬡",
    status: "AI Processing",
    metric: "~3 min avg",
  },
  {
    num: "03",
    title: "Expert Review Gate",
    body: "A senior glazing specialist reviews and corrects every AI output before it reaches you. This is where our 13 years of domain expertise lives — and where your data becomes our proprietary training moat.",
    badge: "Proprietary Data Flywheel",
    icon: "✓",
    status: "Human Gate Active",
    metric: "100% Reviewed",
  },
  {
    num: "04",
    title: "Quote & Approval",
    body: "Validated takeoff data flows into our quoting engine. You review, approve, and authorize — all inside your client portal. No email chains.",
    icon: "◈",
    status: "Quote Ready",
    metric: "Client Portal",
  },
  {
    num: "05",
    title: "Shop Drawings Delivered",
    body: "AI-assisted shop drawings produced by our expert drafters, reviewed for accuracy, and delivered through your payment-gated portal.",
    icon: "▦",
    status: "Drawings Ready",
    metric: "24–48 hr turnaround",
  },
  {
    num: "06",
    title: "Licensed Engineering Stamp",
    body: "Every final drawing receives a California-licensed engineering stamp — the legal certification your project requires. Delivered. Certified. Done.",
    icon: "◉",
    status: "Stamped & Certified",
    metric: "CA Licensed",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const current = steps[activeStep];

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-24 bg-navy"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">
            // HOW IT WORKS
          </p>
          <h2 className="font-bebas text-[clamp(40px,5vw,72px)] text-white-off leading-tight mb-4">
            From Blueprint to Stamp in 6 Steps
          </h2>
          <p className="font-dm font-[300] text-white-dim text-[18px]">
            Upload your drawings. We handle everything else.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_440px] gap-12 items-start">
          {/* Left: Accordion */}
          <div className="space-y-0">
            {steps.map((step, i) => {
              const isOpen = activeStep === i;
              return (
                <div
                  key={step.num}
                  className={`border-b border-[rgba(0,229,200,0.10)] cursor-pointer group`}
                  onClick={() => setActiveStep(i)}
                >
                  <div className="flex items-start gap-5 py-5">
                    {/* Number circle */}
                    <div
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-mono text-[11px] tracking-wider transition-all duration-300 ${
                        isOpen
                          ? "bg-teal text-navy"
                          : "border border-[rgba(0,229,200,0.25)] text-white-dim group-hover:border-teal group-hover:text-teal"
                      }`}
                    >
                      {step.num}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-dm font-[500] text-[16px] transition-colors duration-300 ${
                            isOpen ? "text-white-off" : "text-white-dim group-hover:text-white-off"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <span
                          className={`ml-4 text-teal text-[14px] transition-transform duration-300 ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        >
                          ›
                        </span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="font-dm font-[300] text-white-dim text-[15px] leading-relaxed mt-3 pr-4">
                              {step.body}
                            </p>
                            {step.badge && (
                              <span className="inline-block mt-3 font-mono text-[10px] tracking-[2px] uppercase text-teal bg-[rgba(0,229,200,0.10)] border border-[rgba(0,229,200,0.25)] px-3 py-1 rounded-full">
                                {step.badge}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Step preview card */}
          <div className="md:sticky md:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="bg-navy3 border border-[rgba(0,229,200,0.20)] rounded-lg p-8 shadow-[0_0_40px_rgba(0,229,200,0.04)]"
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[11px] text-white-dim tracking-[3px] uppercase">
                    Step {current.num}
                  </span>
                  <span className="font-mono text-[10px] text-teal bg-[rgba(0,229,200,0.10)] px-3 py-1 rounded-full">
                    {current.status}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl border border-[rgba(0,229,200,0.25)] flex items-center justify-center mb-6">
                  <span className="text-teal text-2xl">{current.icon}</span>
                </div>

                {/* Title */}
                <h4 className="font-bebas text-[28px] text-white-off mb-3 leading-tight">
                  {current.title}
                </h4>

                {/* Metric */}
                <div className="flex items-center gap-2 mt-6 pt-6 border-t border-[rgba(0,229,200,0.10)]">
                  <div className="w-2 h-2 rounded-full bg-teal animate-pulse-glow" />
                  <span className="font-mono text-[12px] text-teal tracking-[2px]">
                    {current.metric}
                  </span>
                </div>

                {/* Step progress dots */}
                <div className="flex gap-2 mt-6">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === activeStep ? "w-8 bg-teal" : "w-4 bg-[rgba(0,229,200,0.20)]"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
