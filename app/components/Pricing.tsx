"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    tagline: "For existing Elite Drafting clients",
    features: ["Project management & CRM", "Client portal access", "Team & workload dashboard", "Basic quoting tools", "Field communication"],
    cta: "Start Free",
    dark: false,
  },
  {
    name: "Pro",
    price: "Contact",
    period: undefined,
    tagline: "For contractors ready to automate",
    features: ["Everything in Free", "AI takeoff engine", "Automated submittal packages", "Priority turnaround (24–48 hr)", "Dedicated account manager", "API access"],
    cta: "Book a Demo",
    dark: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: undefined,
    tagline: "For high-volume glazing operations",
    features: ["Everything in Pro", "Custom AI model training", "Shop drawings SLA", "Engineering stamps included", "Custom hardware database", "Volume discounts"],
    cta: "Contact Sales",
    dark: false,
  },
];

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" ref={ref} className="section-pad bg-canvas2">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">Pricing</p>
          <h2 className="font-display font-bold text-[clamp(36px,4.5vw,64px)] text-ink leading-[1.02] tracking-tight mb-4">
            Simple pricing.<br />
            <span className="text-teal">Start free.</span>
          </h2>
          <p className="font-sans text-ink-dim text-[16px]">
            Already an Elite Drafting client? The platform is included at no extra cost.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-xl p-8 border transition-all duration-300 ${
                plan.dark
                  ? "bg-ink border-transparent md:-mt-4 md:pb-12 shadow-[0_16px_56px_rgba(17,17,17,0.20)]"
                  : "bg-canvas border-stroke card-shadow hover:border-stroke-strong"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="font-mono text-[9px] tracking-[2px] uppercase text-white bg-teal px-3.5 py-1 rounded-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <p className={`font-display font-bold text-[20px] tracking-tight mb-1 ${plan.dark ? "text-white" : "text-ink"}`}>
                {plan.name}
              </p>
              <div className="flex items-end gap-1 mb-2">
                <span className={`font-display font-bold text-[48px] leading-none tracking-tight ${plan.dark ? "text-teal" : "text-ink"}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={`font-sans text-[13px] mb-2 ${plan.dark ? "text-white/40" : "text-ink-dim"}`}>
                    {plan.period}
                  </span>
                )}
              </div>
              <p className={`font-sans text-[13px] mb-7 pb-6 border-b ${plan.dark ? "text-white/40 border-white/[0.08]" : "text-ink-dim border-stroke"}`}>
                {plan.tagline}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className={`shrink-0 mt-0.5 w-4 h-4 rounded-sm flex items-center justify-center ${plan.dark ? "bg-teal text-white" : "border border-teal/30 text-teal"}`}>
                      <Check size={9} strokeWidth={3} />
                    </div>
                    <span className={`font-sans text-[13px] leading-snug ${plan.dark ? "text-white/60" : "text-ink-dim"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`block text-center font-sans font-[600] text-[13px] py-3 px-6 rounded-md transition-all duration-200 cursor-pointer ${
                  plan.dark
                    ? "bg-teal text-white hover:bg-teal-dim"
                    : "border border-stroke-strong text-ink hover:border-teal hover:text-teal"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-sans text-ink-dim text-[13px] leading-relaxed max-w-md mx-auto text-center mt-10"
        >
          <span className="font-[600] text-ink">Enterprise pricing:</span>{" "}
          We calculate your 5-year cost savings and charge 20% as your annual contract.
        </motion.p>
      </div>
    </section>
  );
}
