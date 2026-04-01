"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScanSearch, FileText, Stamp, Package, LayoutDashboard, GitBranch } from "lucide-react";

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
    <section id="services" ref={ref} className="section-pad bg-canvas">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">Our Services</p>
          <h2 className="font-display font-semibold text-[clamp(40px,4.5vw,68px)] text-ink leading-[1.0] mb-4">
            Everything Your Glass Business{" "}
            <em className="italic text-gradient-teal">Needs</em>
          </h2>
          <p className="font-sans font-[300] text-ink-dim text-[17px] leading-relaxed">
            Built by glazing insiders. Trained on 13 years of real projects.
          </p>
        </motion.div>

        <div>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-start gap-8 py-8 border-b border-stroke cursor-default hover:bg-canvas2/60 -mx-4 px-4 rounded-xl transition-colors duration-300"
            >
              <span className="font-display font-light text-[clamp(32px,3.5vw,48px)] text-ink/15 leading-none w-[3.5ch] shrink-0 group-hover:text-teal/30 transition-colors duration-300 pt-0.5">
                {s.num}
              </span>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-sans font-[500] text-[clamp(16px,1.5vw,19px)] text-ink group-hover:text-teal transition-colors duration-200 leading-snug">
                    {s.title}
                  </h3>
                  <span className="shrink-0 font-mono text-[10px] tracking-[2px] uppercase text-ink-dim bg-canvas2 border border-stroke px-2.5 py-1 rounded-full mt-0.5">
                    {s.tag}
                  </span>
                </div>
                <p className="font-sans font-[300] text-ink-dim text-[15px] leading-[1.7] max-w-xl">{s.desc}</p>
              </div>
              <div className="shrink-0 w-10 h-10 rounded-xl bg-canvas2 border border-stroke flex items-center justify-center text-ink-dim group-hover:bg-teal-bg group-hover:border-teal/30 group-hover:text-teal transition-all duration-300 mt-0.5">
                <s.Icon className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
