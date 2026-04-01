"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScanSearch, FileText, Stamp, Package, LayoutDashboard, GitBranch, ArrowUpRight } from "lucide-react";

const services = [
  { num: "01", title: "AI Takeoff Engine",    desc: "Vision AI extracts every glass panel, frame spec, and dimension from your architectural drawings in minutes.", tag: "Live",         Icon: ScanSearch },
  { num: "02", title: "Shop Drawings",        desc: "Expert-reviewed, AI-assisted shop drawings by our licensed drafting team. Faster and more accurate.",          tag: "Core Service", Icon: FileText },
  { num: "03", title: "Engineering Stamps",   desc: "California-licensed engineering stamps on every project — the legal certification your GC requires.",           tag: "Exclusive",    Icon: Stamp },
  { num: "04", title: "Submittal Packages",   desc: "Automated assembly from our manufacturer database — product data, installation instructions, color cards.",     tag: "Coming Soon",  Icon: Package },
  { num: "05", title: "Client Portal",        desc: "Payment-gated document delivery. Every drawing, revision, and stamp in one secure portal.",                    tag: "Beta",         Icon: LayoutDashboard },
  { num: "06", title: "Project Management",   desc: "Full pipeline from quote to field — CRM, workload tracking, and team communication in one place.",              tag: "Beta",         Icon: GitBranch },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" ref={ref} className="section-pad bg-canvas2">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div className="max-w-xl">
            <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">Services</p>
            <h2 className="font-display font-bold text-[clamp(36px,4.5vw,64px)] text-ink leading-[1.02] tracking-tight">
              Everything Your Glass<br />Business Needs
            </h2>
          </div>
          <p className="font-sans text-ink-dim text-[15px] leading-relaxed max-w-sm lg:pb-2">
            Built by glazing insiders. AI trained on 13 years of real California projects.
          </p>
        </motion.div>

        {/* Numbered list */}
        <div className="border-t border-stroke">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-6 lg:gap-10 py-7 border-b border-stroke cursor-default"
            >
              {/* Number */}
              <span className="font-display font-bold text-[clamp(28px,3vw,44px)] text-ink/10 leading-none w-[3ch] shrink-0 group-hover:text-teal/25 transition-colors duration-400 pt-0.5 tracking-tight">
                {s.num}
              </span>

              {/* Content */}
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <h3 className="font-display font-bold text-[clamp(17px,1.6vw,22px)] text-ink group-hover:text-teal transition-colors duration-300 tracking-tight">
                    {s.title}
                  </h3>
                  <span className="font-mono text-[9px] tracking-[2px] uppercase text-ink-dim/70 border border-stroke px-2 py-0.5 rounded-sm shrink-0">
                    {s.tag}
                  </span>
                </div>
                <p className="font-sans text-ink-dim text-[14px] leading-[1.7] max-w-lg">{s.desc}</p>
              </div>

              {/* Icon / arrow */}
              <div className="shrink-0 w-10 h-10 rounded-md bg-canvas border border-stroke flex items-center justify-center text-ink-dim/40 group-hover:bg-teal group-hover:border-teal group-hover:text-white transition-all duration-300 mt-1">
                <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
