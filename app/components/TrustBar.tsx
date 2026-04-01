"use client";

const items =
  "AI TAKEOFF  ◆  SHOP DRAWINGS  ◆  ENGINEERING STAMPS  ◆  SUBMITTAL PACKAGES  ◆  PROJECT MANAGEMENT  ◆  CLIENT PORTAL  ◆  MATERIALS MARKETPLACE  ◆  DATA FLYWHEEL  ◆  ";

export default function TrustBar() {
  const repeated = items.repeat(3);

  return (
    <div className="relative overflow-hidden">
      {/* Gradient edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #050D1A, transparent)" }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, #050D1A, transparent)" }}
      />

      {/* Marquee */}
      <div className="bg-teal py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="font-bebas text-navy text-[13px] tracking-[3px] inline-block">
            {repeated}
          </span>
          <span className="font-bebas text-navy text-[13px] tracking-[3px] inline-block" aria-hidden>
            {repeated}
          </span>
        </div>
      </div>

      {/* Trust label */}
      <div className="py-2.5 flex justify-center border-b border-[rgba(0,229,200,0.08)] bg-[rgba(10,22,40,0.6)]">
        <p className="font-mono text-[10px] text-white-dim tracking-[4px] uppercase">
          Trusted by 600+ licensed California glazing contractors
        </p>
      </div>
    </div>
  );
}
