"use client";

const items =
  "AI TAKEOFF ◆ SHOP DRAWINGS ◆ ENGINEERING STAMPS ◆ SUBMITTAL PACKAGES ◆ PROJECT MANAGEMENT ◆ CLIENT PORTAL ◆ MATERIALS MARKETPLACE ◆ DATA FLYWHEEL ◆ ";

export default function TrustBar() {
  const repeated = items.repeat(4);

  return (
    <div>
      {/* Marquee bar */}
      <div className="bg-teal overflow-hidden py-3 relative">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="font-bebas text-navy text-[14px] tracking-[3px] pr-8">
            {repeated}
          </span>
          <span
            className="font-bebas text-navy text-[14px] tracking-[3px] pr-8"
            aria-hidden
          >
            {repeated}
          </span>
        </div>
      </div>

      {/* Sub-label */}
      <div className="bg-navy2 py-2 flex justify-center border-b border-[rgba(0,229,200,0.10)]">
        <p className="font-mono text-[11px] text-white-dim tracking-[3px] uppercase">
          Trusted by 600+ licensed California glazing contractors
        </p>
      </div>
    </div>
  );
}
