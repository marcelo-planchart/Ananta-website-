"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  { q: "How is Ananta different from general AI takeoff tools?", a: "We are built exclusively for the glass and glazing industry. Our AI was trained on 13 years of real glazing projects — it identifies glazing system types, aluminum profiles, and hardware sets that general tools miss." },
  { q: "Do I need to change how I submit plans?",                a: "No. Upload PDF, DWG, or scanned drawings. Most contractors are running on day one without any workflow changes." },
  { q: "How fast do I get my shop drawings back?",               a: "Standard projects: 24–48 hours. Complex curtain wall or structural glass: 3–5 business days. We always communicate timelines upfront." },
  { q: "What is the engineering stamp and why does it matter?",   a: "A California-licensed structural engineering stamp is legally required on shop drawings submitted to general contractors and building departments. We hold that license." },
  { q: "Is the AI output reviewed by a human?",                  a: "Always. Every AI takeoff is reviewed by a senior glazing specialist before delivery — what we call the Human Gate." },
  { q: "Can I get a demo before committing?",                    a: "Yes. Book a 20-minute demo and we'll run your actual drawings through the AI live so you see results on your own project." },
  { q: "Is my project data secure?",                             a: "All data is encrypted at rest. Your drawings and project history are never shared or used to train models for competitors." },
  { q: "What if I'm already using GlassManager or QuickBooks?",  a: "We integrate with both. Your client list migrates in under a day, and most contractors are fully onboarded within a week." },
];

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="section-pad bg-canvas">
      <div className="max-w-3xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">FAQ</p>
          <h2 className="font-display font-bold text-[clamp(36px,4vw,56px)] leading-[1.05] text-ink tracking-tight">
            Common Questions
          </h2>
        </motion.div>

        <div className="space-y-1.5">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className={`rounded-lg border transition-all duration-300 ${
                  isOpen ? "border-teal/25 bg-canvas shadow-sm" : "border-stroke bg-canvas hover:border-stroke-strong"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group"
                >
                  <span className={`font-sans font-[600] text-[14px] pr-6 transition-colors duration-200 ${isOpen ? "text-teal" : "text-ink group-hover:text-teal"}`}>
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className={`shrink-0 w-6 h-6 rounded-md border flex items-center justify-center transition-all duration-200 ${
                      isOpen
                        ? "border-teal bg-teal-bg text-teal"
                        : "border-stroke text-ink-dim group-hover:border-teal group-hover:text-teal"
                    }`}
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
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-ink-dim text-[14px] leading-[1.8] px-6 pb-6">{item.a}</p>
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
