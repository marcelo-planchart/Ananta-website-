"use client";

import { useRef, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ScanSearch, FileText, Stamp, Package, LayoutDashboard, GitBranch,
} from "lucide-react";

interface Service {
  title: string;
  desc: string;
  tag: string;
  tagStyle: string;
  Icon: React.ElementType;
  featured?: boolean;
}

const services: Service[] = [
  {
    title: "AI TAKEOFF ENGINE",
    desc: "Vision AI reads your architectural drawings and extracts every glass panel, frame spec, and hardware dimension. Blueprint to quantities in minutes.",
    tag: "Live",
    tagStyle: "text-teal border-[rgba(0,229,200,0.30)] bg-[rgba(0,229,200,0.06)]",
    Icon: ScanSearch,
  },
  {
    title: "SHOP DRAWINGS",
    desc: "Expert-reviewed, AI-assisted shop drawings by our licensed drafting team. Faster than any outsourced service. More accurate than DIY.",
    tag: "Core Service",
    tagStyle: "text-white-dim border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)]",
    Icon: FileText,
  },
  {
    title: "ENGINEERING STAMPS",
    desc: "California-licensed engineering stamps on every project. The legal certification your GC requires — and the chokepoint no competitor owns.",
    tag: "Exclusive",
    tagStyle: "text-teal border-[rgba(0,229,200,0.30)] bg-[rgba(0,229,200,0.06)]",
    Icon: Stamp,
    featured: true,
  },
  {
    title: "SUBMITTAL PACKAGES",
    desc: "Automated submittal assembly from our manufacturer database. Product data, installation instructions, color cards — compiled instantly.",
    tag: "Coming Soon",
    tagStyle: "text-white-dim border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)]",
    Icon: Package,
  },
  {
    title: "CLIENT PORTAL",
    desc: "Payment-gated document delivery. Every drawing, revision, and stamp through your secure portal. No Dropbox. No email threads.",
    tag: "Beta",
    tagStyle: "text-white-dim border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)]",
    Icon: LayoutDashboard,
  },
  {
    title: "PROJECT MANAGEMENT",
    desc: "Full project pipeline from quote to field. CRM, workload tracking, field communication, and team management — all in one place.",
    tag: "Beta",
    tagStyle: "text-white-dim border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)]",
    Icon: GitBranch,
  },
];

function TiltCard({ children, className, featured }: { children: React.ReactNode; className?: string; featured?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 150, damping: 25 });
  const springY = useSpring(rawY, { stiffness: 150, damping: 25 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, z: 20 }}
      transition={{ scale: { duration: 0.3 } }}
      className={`relative rounded-xl cursor-default ${className}`}
    >
      {/* Gradient border for featured */}
      {featured && (
        <div
          className="absolute inset-[-1px] rounded-xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(0,229,200,0.5), rgba(0,229,200,0.05), rgba(0,229,200,0.35), rgba(0,229,200,0.05))",
            padding: "1px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" ref={ref} className="section-pad bg-navy relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,229,200,0.03) 0%, transparent 65%)" }}
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
            <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase">
              Our Services
            </p>
          </div>
          <h2 className="font-bebas text-[clamp(44px,5.5vw,80px)] text-white-off leading-[0.95] mb-6 max-w-[700px]">
            Everything Your Glass Business Needs.{" "}
            <span className="text-gradient-teal">In One Platform.</span>
          </h2>
          <p className="font-dm font-[300] text-white-dim text-[18px] max-w-[520px] leading-relaxed">
            Built by glazing industry insiders. Powered by AI trained on 13 years of real projects.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ perspective: "1000px" }}>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard featured={s.featured}>
                <div className={`h-full glass p-7 rounded-xl group transition-all duration-300 hover:border-[rgba(0,229,200,0.25)] ${
                  s.featured
                    ? "bg-[rgba(0,229,200,0.04)] shadow-[0_0_60px_rgba(0,229,200,0.06)] border-transparent"
                    : ""
                }`}>
                  {/* Hover shimmer */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(0,229,200,0.04) 0%, transparent 60%)" }}
                  />

                  {/* Icon */}
                  <div className={`relative w-11 h-11 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 border ${
                    s.featured
                      ? "border-[rgba(0,229,200,0.35)] bg-[rgba(0,229,200,0.08)]"
                      : "border-[rgba(0,229,200,0.15)] bg-[rgba(0,229,200,0.04)] group-hover:border-teal group-hover:bg-[rgba(0,229,200,0.08)]"
                  }`}>
                    <s.Icon className="w-5 h-5 text-teal" strokeWidth={1.5} />
                  </div>

                  {/* Tag */}
                  <span className={`inline-block font-mono text-[10px] tracking-[2px] uppercase border px-2.5 py-[3px] rounded-full mb-5 ${s.tagStyle}`}>
                    {s.tag}
                  </span>

                  {/* Title */}
                  <h3 className={`font-bebas text-[21px] tracking-wider mb-3 transition-colors duration-200 ${
                    s.featured ? "text-teal" : "text-white-off group-hover:text-teal"
                  }`}>
                    {s.title}
                  </h3>

                  {/* Desc */}
                  <p className="font-dm font-[300] text-white-dim text-[14px] leading-[1.7]">
                    {s.desc}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
