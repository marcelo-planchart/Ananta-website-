"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const moatPoints = [
  {
    title: "Behavioral Correction Data",
    body: "Every expert fix becomes a labeled training pair. After thousands of projects, this dataset is impossible to replicate without years of operations inside a trust relationship.",
    metric: "Grows with every project",
  },
  {
    title: "Embedded in the Workflow",
    body: "Contractors can't leave without losing access to their entire project history, drawings, and stamps. Switching costs compound with every project.",
    metric: "Deep lock-in",
  },
  {
    title: "Engineering Authority",
    body: "We hold the California engineering license every project legally requires. This cannot be rushed, replicated, or bought. It took 13 years to build.",
    metric: "13 years to earn",
  },
  {
    title: "Technical Databases",
    body: "Thousands of aluminum profile and hardware SKUs from dozens of manufacturers — enabling automated submittal generation that takes years to compile.",
    metric: "Industry-exclusive",
  },
];

const nodes = [
  { label: "AI Takeoff", angle: 270 },
  { label: "Expert Correction", angle: 0 },
  { label: "Training Data", angle: 90 },
  { label: "Better Model", angle: 180 },
];

function FlywheelSVG() {
  const R = 110;
  const cx = 160;
  const cy = 160;

  return (
    <div className="flex items-center justify-center select-none">
      <div className="relative">
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,229,200,0.06) 40%, transparent 70%)",
          }}
        />
        <svg width="320" height="320" viewBox="0 0 320 320" className="overflow-visible">
          {/* Outer ring — slow spin */}
          <g style={{ transformOrigin: "160px 160px", animation: "spin 20s linear infinite" }}>
            <circle
              cx={cx} cy={cy} r={R + 20}
              fill="none"
              stroke="rgba(0,229,200,0.06)"
              strokeWidth="1"
              strokeDasharray="3 6"
            />
          </g>

          {/* Main arc — counter spin */}
          <g style={{ transformOrigin: "160px 160px", animation: "spin 14s linear infinite reverse" }}>
            <circle
              cx={cx} cy={cy} r={R}
              fill="none"
              stroke="rgba(0,229,200,0.25)"
              strokeWidth="1.5"
              strokeDasharray="10 6"
            />
          </g>

          {/* Inner ring — spin */}
          <g style={{ transformOrigin: "160px 160px", animation: "spin 8s linear infinite" }}>
            <circle
              cx={cx} cy={cy} r={40}
              fill="none"
              stroke="rgba(0,229,200,0.08)"
              strokeWidth="1"
              strokeDasharray="4 5"
            />
          </g>

          {/* Center filled */}
          <circle cx={cx} cy={cy} r={32} fill="rgba(0,229,200,0.05)" />
          <circle cx={cx} cy={cy} r={32} fill="none" stroke="rgba(0,229,200,0.20)" strokeWidth="1" />

          {/* Center text */}
          <text x={cx} y={cy - 6} fill="#00E5C8" fontSize="13" fontFamily="'Bebas Neue', sans-serif"
            textAnchor="middle" letterSpacing="3">DATA</text>
          <text x={cx} y={cy + 12} fill="#00E5C8" fontSize="13" fontFamily="'Bebas Neue', sans-serif"
            textAnchor="middle" letterSpacing="3">MOAT</text>

          {/* Spoke lines */}
          {nodes.map((node) => {
            const x = cx + R * Math.cos((node.angle * Math.PI) / 180);
            const y = cy + R * Math.sin((node.angle * Math.PI) / 180);
            return (
              <line key={node.label}
                x1={cx} y1={cy} x2={x} y2={y}
                stroke="rgba(0,229,200,0.06)"
                strokeWidth="1"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const x = cx + R * Math.cos((node.angle * Math.PI) / 180);
            const y = cy + R * Math.sin((node.angle * Math.PI) / 180);
            const labelPad = 28;
            const lx = node.angle === 0 ? x + labelPad : node.angle === 180 ? x - labelPad : x;
            const ly = node.angle === 270 ? y - labelPad : node.angle === 90 ? y + labelPad + 6 : y + 5;
            const anchor = node.angle === 0 ? "start" : node.angle === 180 ? "end" : "middle";

            return (
              <g key={node.label}>
                {/* Pulse glow */}
                <circle cx={x} cy={y} r="14" fill="rgba(0,229,200,0.06)"
                  style={{ animation: "pulse-glow 2.5s ease-in-out infinite", transformOrigin: `${x}px ${y}px`, animationDelay: `${nodes.indexOf(node) * 0.6}s` }}
                />
                {/* Dot */}
                <circle cx={x} cy={y} r="5" fill="#00E5C8"
                  style={{ filter: "drop-shadow(0 0 6px rgba(0,229,200,0.8))" }}
                />
                {/* Label */}
                <text x={lx} y={ly} fill="#8FA3B1" fontSize="10"
                  fontFamily="'DM Mono', monospace" textAnchor={anchor} letterSpacing="1.5">
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.8); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

export default function DataFlywheel() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="section-pad bg-navy relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 0% 50%, rgba(0,229,200,0.05) 0%, transparent 65%)" }}
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
            <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase">The Moat</p>
          </div>
          <h2 className="font-bebas text-[clamp(44px,5.5vw,80px)] leading-[0.95] text-white-off mb-5">
            The Data Flywheel{" "}
            <span className="text-gradient-teal">Nobody Can Buy</span>
          </h2>
          <p className="font-dm font-[300] text-white-dim text-[18px]">
            Every project makes us harder to compete with.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Flywheel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <FlywheelSVG />
          </motion.div>

          {/* Moat points */}
          <div className="space-y-6">
            {moatPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 32 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-xl p-6 group hover:border-[rgba(0,229,200,0.20)] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,229,200,0.7)]" />
                  <div>
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <h4 className="font-dm font-[500] text-white-off text-[15px]">
                        {point.title}
                      </h4>
                      <span className="font-mono text-[10px] text-teal tracking-[1px] bg-[rgba(0,229,200,0.08)] px-2 py-0.5 rounded-full">
                        {point.metric}
                      </span>
                    </div>
                    <p className="font-dm font-[300] text-white-dim text-[14px] leading-[1.7]">
                      {point.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
