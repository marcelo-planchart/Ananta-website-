"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Service {
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
  icon: string;
  featured?: boolean;
}

const services: Service[] = [
  {
    title: "AI TAKEOFF ENGINE",
    desc: "Vision AI reads your architectural drawings and extracts every glass panel, frame spec, and hardware dimension. Blueprint to quantities in minutes.",
    tag: "Live",
    tagColor: "text-teal bg-[rgba(0,229,200,0.10)] border-[rgba(0,229,200,0.25)]",
    icon: "⬡",
  },
  {
    title: "SHOP DRAWINGS",
    desc: "Expert-reviewed, AI-assisted shop drawings produced by our licensed drafting team. Faster than any outsourced service. More accurate than DIY.",
    tag: "Core Service",
    tagColor: "text-white-dim bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.10)]",
    icon: "▦",
  },
  {
    title: "ENGINEERING STAMPS",
    desc: "California-licensed engineering stamps on every project. The legal certification your GC requires — and the chokepoint no competitor owns.",
    tag: "Exclusive",
    tagColor: "text-teal bg-[rgba(0,229,200,0.10)] border-[rgba(0,229,200,0.25)]",
    icon: "◉",
    featured: true,
  },
  {
    title: "SUBMITTAL PACKAGES",
    desc: "Automated submittal assembly from our manufacturer database. Product data, installation instructions, color cards — compiled instantly. No hunting.",
    tag: "Coming Soon",
    tagColor: "text-white-dim bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.10)]",
    icon: "◈",
  },
  {
    title: "CLIENT PORTAL",
    desc: "Payment-gated document delivery. Every drawing, revision, and stamp delivered through your secure portal. No Dropbox. No email threads.",
    tag: "Beta",
    tagColor: "text-white-dim bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.10)]",
    icon: "⊞",
  },
  {
    title: "PROJECT MANAGEMENT",
    desc: "Full project pipeline from quote to field. CRM, workload tracking, field communication, and team management — all in one place.",
    tag: "Beta",
    tagColor: "text-white-dim bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.10)]",
    icon: "⇌",
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">
            // OUR SERVICES
          </p>
          <h2 className="font-bebas text-[clamp(40px,5vw,72px)] text-white-off leading-tight mb-4">
            Everything Your Glass Business Needs.
            <br />
            In One Platform.
          </h2>
          <p className="font-dm font-[300] text-white-dim text-[18px] max-w-[560px]">
            Built by glazing industry insiders. Powered by AI trained on 13
            years of real projects.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative bg-navy3 rounded-lg p-7 border transition-all duration-300 cursor-default group ${
                s.featured
                  ? "border-teal shadow-[0_0_40px_rgba(0,229,200,0.08)]"
                  : "border-[rgba(0,229,200,0.10)] hover:border-teal hover:shadow-[0_0_30px_rgba(0,229,200,0.06)]"
              }`}
            >
              {s.featured && (
                <div className="absolute inset-0 rounded-lg bg-[rgba(0,229,200,0.03)] pointer-events-none" />
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-lg border border-[rgba(0,229,200,0.20)] flex items-center justify-center mb-5 group-hover:border-teal transition-colors">
                <span className="text-teal text-xl">{s.icon}</span>
              </div>

              {/* Tag */}
              <span
                className={`inline-block font-mono text-[10px] tracking-[2px] uppercase border px-2 py-[3px] rounded-full mb-4 ${s.tagColor}`}
              >
                {s.tag}
              </span>

              {/* Title */}
              <h3 className="font-bebas text-[22px] text-white-off tracking-wider mb-3">
                {s.title}
              </h3>

              {/* Desc */}
              <p className="font-dm font-[300] text-white-dim text-[14px] leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
