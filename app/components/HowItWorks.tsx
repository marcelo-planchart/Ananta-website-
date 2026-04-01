"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Upload, ScanSearch, ShieldCheck, FileCheck, PenTool, Award } from "lucide-react";

interface Step {
  num: string;
  title: string;
  body: string;
  badge?: string;
  Icon: React.ElementType;
  status: string;
  metric: string;
  color: string;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Upload Your Architectural Drawings",
    body: "Send us your project plans in any format — PDF, DWG, or scanned drawings. Our system accepts everything.",
    Icon: Upload,
    status: "Upload Complete",
    metric: "Any Format Accepted",
    color: "rgba(0,229,200,0.8)",
  },
  {
    num: "02",
    title: "AI Reads Your Blueprint",
    body: "Our vision-language model identifies every glass panel, frame type, hardware spec, and dimension automatically. No manual counting.",
    Icon: ScanSearch,
    status: "AI Processing",
    metric: "~3 min avg",
    color: "rgba(0,229,200,0.8)",
  },
  {
    num: "03",
    title: "Expert Review Gate",
    body: "A senior glazing specialist reviews and corrects every AI output before it reaches you. This is where our 13 years of domain expertise lives — and where your data becomes our proprietary training moat.",
    badge: "Proprietary Data Flywheel",
    Icon: ShieldCheck,
    status: "Human Gate Active",
    metric: "100% Reviewed",
    color: "rgba(0,229,200,1)",
  },
  {
    num: "04",
    title: "Quote & Approval",
    body: "Validated takeoff data flows into our quoting engine. You review, approve, and authorize — all inside your client portal. No email chains.",
    Icon: FileCheck,
    status: "Quote Ready",
    metric: "Client Portal",
    color: "rgba(0,229,200,0.8)",
  },
  {
    num: "05",
    title: "Shop Drawings Delivered",
    body: "AI-assisted shop drawings produced by our expert drafters, reviewed for accuracy, and delivered through your payment-gated portal.",
    Icon: PenTool,
    status: "Drawings Ready",
    metric: "24–48 hr turnaround",
    color: "rgba(0,229,200,0.8)",
  },
  {
    num: "06",
    title: "Licensed Engineering Stamp",
    body: "Every final drawing receives a California-licensed engineering stamp — the legal certification your project requires. Delivered. Certified. Done.",
    Icon: Award,
    status: "Stamped & Certified",
    metric: "CA Licensed",
    color: "rgba(0,229,200,0.8)",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const current = steps[activeStep];

  return (
    <section id="how-it-works" ref={ref} className="section-pad bg-navy2 relative overflow-hidden">
      {/* Background orb */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle at 100% 0%, rgba(0,229,200,0.08) 0%, transparent 60%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-teal" />
            <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase">How It Works</p>
          </div>
          <h2 className="font-bebas text-[clamp(44px,5.5vw,80px)] leading-[0.95] text-white-off mb-5">
            From Blueprint to Stamp
            <br />
            <span className="text-gradient-teal">in 6 Steps</span>
          </h2>
          <p className="font-dm font-[300] text-white-dim text-[18px]">
            Upload your drawings. We handle everything else.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_480px] gap-16 items-start">
          {/* Left: Steps */}
          <div>
            {steps.map((step, i) => {
              const isOpen = activeStep === i;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-[rgba(0,229,200,0.07)] cursor-pointer group"
                  onClick={() => setActiveStep(i)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => e.key === "Enter" && setActiveStep(i)}
                >
                  <div className="flex items-start gap-5 py-6">
                    {/* Number */}
                    <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-mono text-[11px] transition-all duration-400 ${
                      isOpen
                        ? "bg-teal text-navy shadow-[0_0_20px_rgba(0,229,200,0.5)]"
                        : "border border-[rgba(0,229,200,0.20)] text-white-dim group-hover:border-teal group-hover:text-teal"
                    }`}>
                      {step.num}
                    </div>

                    <div className="flex-1 min-w-0 pb-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-dm font-[500] text-[16px] transition-colors duration-200 leading-snug ${
                          isOpen ? "text-white-off" : "text-white-dim group-hover:text-white-off"
                        }`}>
                          {step.title}
                        </h3>
                        <motion.span
                          animate={{ rotate: isOpen ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-4 text-teal text-[16px] shrink-0"
                          aria-hidden
                        >
                          ›
                        </motion.span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="body"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="font-dm font-[300] text-white-dim text-[15px] leading-[1.7] mt-3 pr-6">
                              {step.body}
                            </p>
                            {step.badge && (
                              <div className="mt-4">
                                <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[2px] uppercase text-teal bg-[rgba(0,229,200,0.08)] border border-[rgba(0,229,200,0.25)] px-3 py-1.5 rounded-full">
                                  <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                                  {step.badge}
                                </span>
                              </div>
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

          {/* Right: Preview card — glassmorphism */}
          <div className="lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-8 shadow-[0_24px_80px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,229,200,0.10)]"
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_rgba(0,229,200,0.8)]" style={{ animation: "pulse 2s infinite" }} />
                    <span className="font-mono text-[11px] text-white-dim tracking-[3px] uppercase">
                      Step {current.num} / 06
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-teal bg-[rgba(0,229,200,0.10)] border border-[rgba(0,229,200,0.20)] px-3 py-1 rounded-full">
                    {current.status}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl border border-[rgba(0,229,200,0.20)] bg-[rgba(0,229,200,0.04)] flex items-center justify-center mb-8 shadow-[inset_0_0_30px_rgba(0,229,200,0.04)]">
                  <current.Icon className="w-9 h-9 text-teal" strokeWidth={1.25} />
                </div>

                {/* Title */}
                <h4 className="font-bebas text-[32px] text-white-off mb-2 leading-tight">
                  {current.title}
                </h4>

                {/* Metric bar */}
                <div className="mt-8 pt-6 border-t border-[rgba(0,229,200,0.08)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                    <span className="font-mono text-[12px] text-teal tracking-[2px]">
                      {current.metric}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-white-dim">
                    {activeStep + 1} of {steps.length}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-[2px] bg-[rgba(0,229,200,0.10)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-teal rounded-full"
                    animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                {/* Step dots */}
                <div className="flex gap-1.5 mt-5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      aria-label={`Step ${i + 1}`}
                      className={`cursor-pointer transition-all duration-300 rounded-full ${
                        i === activeStep
                          ? "w-6 h-1.5 bg-teal shadow-[0_0_8px_rgba(0,229,200,0.6)]"
                          : "w-3 h-1.5 bg-[rgba(0,229,200,0.20)] hover:bg-[rgba(0,229,200,0.40)]"
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
