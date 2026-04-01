"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScanSearch, FileText, Stamp, Package, LayoutDashboard, GitBranch } from "lucide-react";

const services = [
  { title: "AI Takeoff Engine",      desc: "Vision AI extracts every glass panel, frame spec, and dimension from your architectural drawings in minutes.",          tag: "Live",         tagClass: "text-teal-dark bg-teal-bg border-teal/30",       Icon: ScanSearch,      featured: false },
  { title: "Shop Drawings",          desc: "Expert-reviewed, AI-assisted shop drawings by our licensed drafting team. Faster than outsourced. More accurate.",       tag: "Core Service", tagClass: "text-ink-dim bg-canvas3 border-stroke",          Icon: FileText,        featured: false },
  { title: "Engineering Stamps",     desc: "California-licensed engineering stamps on every project. The legal certification your GC requires.",                     tag: "Exclusive",    tagClass: "text-teal-dark bg-teal-bg border-teal/30",       Icon: Stamp,           featured: true  },
  { title: "Submittal Packages",     desc: "Automated assembly from our manufacturer database — product data, installation instructions, and color cards compiled.", tag: "Coming Soon",  tagClass: "text-ink-dim bg-canvas3 border-stroke",          Icon: Package,         featured: false },
  { title: "Client Portal",          desc: "Payment-gated document delivery. Every drawing, revision, and stamp in one secure portal.",                              tag: "Beta",         tagClass: "text-ink-dim bg-canvas3 border-stroke",          Icon: LayoutDashboard, featured: false },
  { title: "Project Management",     desc: "Full pipeline from quote to field — CRM, workload tracking, and team communication in one place.",                       tag: "Beta",         tagClass: "text-ink-dim bg-canvas3 border-stroke",          Icon: GitBranch,       featured: false },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" ref={ref} className="section-pad bg-canvas2">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-16"
        >
          <p className="font-mono text-teal-dark text-[11px] tracking-[4px] uppercase mb-3 font-[500]">// OUR SERVICES</p>
          <h2 className="font-bebas text-[clamp(40px,5vw,72px)] text-ink leading-[0.95] mb-4">
            Everything Your Glass Business Needs.<br />
            <span className="text-gradient-teal">In One Platform.</span>
          </h2>
          <p className="font-sans font-[300] text-ink-dim text-[17px] max-w-[500px]">
            Built by glazing industry insiders. AI trained on 13 years of real projects.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
              whileHover={{ y: -4 }}
              className={`bg-canvas rounded-2xl p-7 border transition-all duration-300 cursor-default group ${
                s.featured
                  ? "border-teal shadow-[0_0_0_1px_rgba(0,196,173,0.3),0_8px_32px_rgba(0,196,173,0.12)]"
                  : "border-stroke card-shadow hover:border-teal/40 hover:card-shadow-hover"
              }`}
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-200 ${
                s.featured ? "bg-teal text-white" : "bg-canvas2 text-teal group-hover:bg-teal-bg"
              }`}>
                <s.Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>

              {/* Tag */}
              <span className={`inline-block font-mono text-[10px] tracking-[2px] uppercase border px-2.5 py-[3px] rounded-full mb-4 ${s.tagClass}`}>
                {s.tag}
              </span>

              {/* Title */}
              <h3 className={`font-sans font-[600] text-[16px] mb-3 ${s.featured ? "text-teal-dark" : "text-ink group-hover:text-teal-dark"} transition-colors`}>
                {s.title}
              </h3>

              {/* Desc */}
              <p className="font-sans font-[300] text-ink-dim text-[14px] leading-[1.7]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
