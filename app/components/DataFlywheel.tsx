"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const moatPoints = [
  {
    title: "Behavioral Correction Data",
    body: "Every expert fix Silvia makes becomes a labeled training pair. After thousands of projects, this dataset is impossible to replicate without years of operations inside a trust relationship.",
  },
  {
    title: "Embedded in the Workflow",
    body: "Contractors can't leave without losing access to their entire project history, drawings, and stamps. Switching costs compound with every project.",
  },
  {
    title: "Engineering Authority",
    body: "We hold the California engineering license every project legally requires. This cannot be rushed. It took 13 years to build.",
  },
  {
    title: "Technical Databases",
    body: "Thousands of aluminum profile and hardware SKUs from dozens of manufacturers — enabling automated submittal generation that takes years to compile.",
  },
];

const nodes = [
  { label: "AI Takeoff", angle: 270 },
  { label: "Expert Correction", angle: 0 },
  { label: "Training Data", angle: 90 },
  { label: "Better Model", angle: 180 },
];

function FlywheelDiagram() {
  const radius = 110;
  const cx = 160;
  const cy = 160;

  return (
    <div className="flex items-center justify-center">
      <svg
        width="320"
        height="320"
        viewBox="0 0 320 320"
        className="overflow-visible"
      >
        {/* Dashed circle arc — rotates */}
        <g
          style={{
            transformOrigin: "160px 160px",
            animation: "spin 20s linear infinite",
          }}
        >
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="rgba(0,229,200,0.3)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
          />
        </g>

        {/* Static connecting lines */}
        {nodes.map((node, i) => {
          const next = nodes[(i + 1) % nodes.length];
          const ax = cx + radius * Math.cos((node.angle * Math.PI) / 180);
          const ay = cy + radius * Math.sin((node.angle * Math.PI) / 180);
          const bx = cx + radius * Math.cos((next.angle * Math.PI) / 180);
          const by = cy + radius * Math.sin((next.angle * Math.PI) / 180);
          return (
            <line
              key={i}
              x1={ax}
              y1={ay}
              x2={bx}
              y2={by}
              stroke="rgba(0,229,200,0.12)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Node dots and labels */}
        {nodes.map((node) => {
          const x = cx + radius * Math.cos((node.angle * Math.PI) / 180);
          const y = cy + radius * Math.sin((node.angle * Math.PI) / 180);

          // Label positioning
          const labelOffsetX = node.angle === 0 ? 18 : node.angle === 180 ? -18 : 0;
          const labelOffsetY = node.angle === 270 ? -18 : node.angle === 90 ? 18 : 0;
          const textAnchor =
            node.angle === 0 ? "start" : node.angle === 180 ? "end" : "middle";

          return (
            <g key={node.label}>
              {/* Glow ring */}
              <circle
                cx={x}
                cy={y}
                r="12"
                fill="rgba(0,229,200,0.08)"
                style={{
                  animation: "pulse-glow 2s ease-in-out infinite",
                  transformOrigin: `${x}px ${y}px`,
                }}
              />
              {/* Dot */}
              <circle cx={x} cy={y} r="6" fill="#00E5C8" />
              {/* Label */}
              <text
                x={x + labelOffsetX}
                y={y + labelOffsetY + (node.angle === 90 ? 14 : node.angle === 270 ? -8 : 4)}
                fill="#8FA3B1"
                fontSize="10"
                fontFamily="DM Mono, monospace"
                textAnchor={textAnchor}
                letterSpacing="1"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Center text */}
        <text
          x={cx}
          y={cy - 8}
          fill="#00E5C8"
          fontSize="16"
          fontFamily="Bebas Neue, sans-serif"
          textAnchor="middle"
          letterSpacing="3"
        >
          DATA
        </text>
        <text
          x={cx}
          y={cy + 12}
          fill="#00E5C8"
          fontSize="16"
          fontFamily="Bebas Neue, sans-serif"
          textAnchor="middle"
          letterSpacing="3"
        >
          MOAT
        </text>
      </svg>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default function DataFlywheel() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-24 bg-navy2">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">
            // THE MOAT
          </p>
          <h2 className="font-bebas text-[clamp(40px,5vw,72px)] text-white-off leading-tight mb-4">
            The Data Flywheel Nobody Can Buy
          </h2>
          <p className="font-dm font-[300] text-white-dim text-[18px]">
            Every project makes us harder to compete with.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Flywheel SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FlywheelDiagram />
          </motion.div>

          {/* Right: Moat points */}
          <div className="space-y-8">
            {moatPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.15 }}
                className="flex gap-4"
              >
                <div className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_rgba(0,229,200,0.6)] animate-pulse-glow" />
                <div>
                  <h4 className="font-dm font-[500] text-white-off text-[16px] mb-2">
                    {point.title}
                  </h4>
                  <p className="font-dm font-[300] text-white-dim text-[14px] leading-relaxed">
                    {point.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
