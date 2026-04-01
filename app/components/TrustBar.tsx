"use client";

const items = "AI TAKEOFF  ·  SHOP DRAWINGS  ·  ENGINEERING STAMPS  ·  SUBMITTAL PACKAGES  ·  PROJECT MANAGEMENT  ·  CLIENT PORTAL  ·  MATERIALS MARKETPLACE  ·  DATA FLYWHEEL  ·  ";

export default function TrustBar() {
  const repeated = items.repeat(3);
  return (
    <div className="bg-canvas2 border-y border-stroke overflow-hidden relative">
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #F2F0EB, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, #F2F0EB, transparent)" }}
      />
      <div className="py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="font-mono text-[10px] tracking-[4px] text-ink-dim/60 inline-block">{repeated}</span>
          <span className="font-mono text-[10px] tracking-[4px] text-ink-dim/60 inline-block" aria-hidden>{repeated}</span>
        </div>
      </div>
    </div>
  );
}
