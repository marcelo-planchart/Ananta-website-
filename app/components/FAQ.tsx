"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="py-24 bg-navy">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">
            // FAQ
          </p>
          <h2 className="font-bebas text-[clamp(40px,5vw,64px)] text-white-off leading-tight">
            Everything You Need to Know
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-0">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="border-b border-[rgba(0,229,200,0.10)]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span
                    className={`font-dm font-[400] text-[15px] pr-8 transition-colors duration-200 ${
                      isOpen ? "text-teal" : "text-white-off group-hover:text-teal"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 text-teal text-[18px] transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-dm font-[300] text-white-dim text-[14px] leading-relaxed pb-5">
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
