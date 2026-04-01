"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "FREE", price: "$0", period: "/ month",
    tagline: "For existing Elite Drafting clients",
    features: ["Project management & CRM", "Client portal access", "Team & workload dashboard", "Basic quoting tools", "Field communication"],
    cta: "Start Free",
    ctaClass: "border-2 border-stroke text-ink hover:border-teal hover:text-teal-dark transition-all duration-200",
    highlighted: false, badge: null,
  },
  {
    name: "PRO", price: "Contact", period: undefined,
    tagline: "For contractors ready to automate",
    features: ["Everything in Free", "AI takeoff engine", "Automated submittal packages", "Priority turnaround (24–48 hr)", "Dedicated account manager", "API access"],
    cta: "Book a Demo",
    ctaClass: "bg-teal text-white hover:bg-teal-dim transition-all duration-200 shadow-md hover:shadow-lg font-[500]",
    highlighted: true, badge: "Most Popular",
  },
  {
    name: "ENTERPRISE", price: "Custom", period: undefined,
    tagline: "For high-volume glazing operations",
    features: ["Everything in Pro", "Custom AI model training", "Shop drawings SLA", "Engineering stamps included", "Custom hardware database", "Volume discounts"],
    cta: "Contact Sales",
    ctaClass: "border-2 border-stroke text-ink hover:border-teal hover:text-teal-dark transition-all duration-200",
    highlighted: false, badge: null,
  },
];

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" ref={ref} className="section-pad bg-canvas">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <p className="font-mono text-teal-dark text-[11px] tracking-[4px] uppercase mb-3 font-[500]">// PRICING</p>
          <h2 className="font-bebas text-[clamp(40px,5vw,72px)] text-ink leading-[0.95] mb-4">
            Simple Pricing. <span className="text-gradient-teal">Start Free.</span>
          </h2>
          <p className="font-sans font-[300] text-ink-dim text-[17px]">
            Already an Elite Drafting client? The platform is included at no extra cost.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative bg-canvas rounded-2xl p-8 border transition-all duration-300 ${
                plan.highlighted
                  ? "border-teal shadow-[0_0_0_1px_rgba(0,196,173,0.3),0_16px_48px_rgba(0,196,173,0.10)] md:-mt-4 md:pb-12"
                  : "border-stroke card-shadow hover:border-teal/30"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="font-mono text-[10px] tracking-[2px] uppercase text-white bg-teal px-4 py-1.5 rounded-full shadow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}
              <p className="font-mono text-[11px] tracking-[4px] text-ink-dim uppercase mb-2">{plan.name}</p>
              <div className="flex items-end gap-1 mb-2">
                <span className={`font-bebas text-[52px] leading-none ${plan.highlighted ? "text-teal" : "text-ink"}`}>{plan.price}</span>
                {plan.period && <span className="font-sans text-[13px] text-ink-dim mb-2">{plan.period}</span>}
              </div>
              <p className="font-sans font-[300] text-ink-dim text-[13px] mb-7 pb-6 border-b border-stroke">{plan.tagline}</p>
              <ul className="space-y-3.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className={`shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${plan.highlighted ? "bg-teal text-white" : "border border-teal/40 text-teal"}`}>
                      <Check size={9} strokeWidth={3} />
                    </div>
                    <span className="font-sans font-[300] text-ink-dim text-[14px]">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#cta" className={`block text-center font-sans text-[14px] py-3.5 px-6 rounded-xl cursor-pointer ${plan.ctaClass}`}>{plan.cta}</a>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.4 }} className="mt-10 text-center">
          <div className="inline-block bg-canvas2 rounded-xl px-8 py-5 border border-stroke max-w-2xl">
            <p className="font-sans font-[300] text-ink-dim text-[13px] leading-relaxed">
              <span className="font-[500] text-ink">Enterprise pricing:</span>{" "}
              We calculate your 5-year manual labor cost savings and charge 20% as your annual contract. Clear ROI before you sign.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
