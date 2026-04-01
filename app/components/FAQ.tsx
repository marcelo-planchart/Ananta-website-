"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How is Ananta different from general AI takeoff tools?",
    a: "We are built exclusively for the glass and glazing industry. General tools can read blueprints — they can't identify glazing system types, aluminum profiles, or hardware sets. We can, because our AI was trained on 13 years of real glazing projects.",
  },
  {
    q: "Do I need to change how I submit plans?",
    a: "No. Upload PDF, DWG, or scanned drawings. Our system handles every format. Most contractors are running on day one without any workflow changes.",
  },
  {
    q: "How fast do I get my shop drawings back?",
    a: "Standard projects: 24–48 hours. Complex curtain wall or structural glass: 3–5 business days. We always communicate timelines upfront.",
  },
  {
    q: "What is the engineering stamp and why does it matter?",
    a: "A California-licensed structural engineering stamp is legally required on shop drawings submitted to general contractors and building departments. We hold that license. No competitor does.",
  },
  {
    q: "Is the AI output reviewed by a human?",
    a: "Always. Every AI takeoff is reviewed and corrected by a senior glazing specialist before delivery. We call it the Human Gate — it's what separates a tool from a trusted service.",
  },
  {
    q: "Can I get a demo before committing?",
    a: "Yes. Book a 20-minute demo and we'll run your actual drawings through the AI live. You'll see results on your own project.",
  },
  {
    q: "Is my project data secure?",
    a: "Yes. All data is stored with encryption at rest. Your drawings, corrections, and project history are never shared or used to train models for competitors.",
  },
  {
    q: "What if I'm already using GlassManager or QuickBooks?",
    a: "We integrate with both. Your client list migrates in under a day. Most contractors are fully onboarded within a week.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="section-pad bg-navy relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-teal" />
            <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase">FAQ</p>
            <div className="h-[1px] w-8 bg-teal" />
          </div>
          <h2 className="font-bebas text-[clamp(44px,5.5vw,72px)] leading-[0.95] text-white-off">
            Everything You{" "}
            <span className="text-gradient-teal">Need to Know</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`glass rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-[rgba(0,229,200,0.25)]" : "hover:border-[rgba(0,229,200,0.15)]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group"
                >
                  <span className={`font-dm font-[400] text-[15px] pr-6 transition-colors duration-200 ${
                    isOpen ? "text-teal" : "text-white-off group-hover:text-teal"
                  }`}>
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 w-6 h-6 rounded-full border border-[rgba(0,229,200,0.25)] flex items-center justify-center text-teal group-hover:border-teal group-hover:bg-[rgba(0,229,200,0.06)] transition-all duration-200"
                  >
                    <Plus size={12} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-dm font-[300] text-white-dim text-[14px] leading-[1.75] px-6 pb-6">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
