"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface PlanFeature {
  text: string;
}

interface Plan {
  name: string;
  price: string;
  period?: string;
  tagline: string;
  features: PlanFeature[];
  cta: string;
  ctaStyle: string;
  highlighted?: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    name: "FREE",
    price: "$0",
    period: "/ month",
    tagline: "For existing Elite Drafting clients",
    features: [
      { text: "Project management & CRM" },
      { text: "Client portal access" },
      { text: "Team & workload dashboard" },
      { text: "Basic quoting tools" },
      { text: "Field communication" },
    ],
    cta: "Start Free",
    ctaStyle:
      "border border-[rgba(0,229,200,0.30)] text-teal hover:bg-[rgba(0,229,200,0.06)] transition-colors",
  },
  {
    name: "PRO",
    price: "Contact",
    tagline: "For contractors ready to automate",
    features: [
      { text: "Everything in Free" },
      { text: "AI takeoff engine" },
      { text: "Automated submittal packages" },
      { text: "Priority turnaround (24–48 hr)" },
      { text: "Dedicated account manager" },
      { text: "API access" },
    ],
    cta: "Book a Demo",
    ctaStyle: "bg-teal text-navy hover:bg-teal-dim transition-colors font-[500]",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    tagline: "For high-volume glazing operations",
    features: [
      { text: "Everything in Pro" },
      { text: "Custom AI model training on your data" },
      { text: "Shop drawings SLA" },
      { text: "Engineering stamps included" },
      { text: "Custom hardware database" },
      { text: "Volume discounts" },
    ],
    cta: "Contact Sales",
    ctaStyle:
      "border border-[rgba(0,229,200,0.30)] text-teal hover:bg-[rgba(0,229,200,0.06)] transition-colors",
  },
];

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" ref={ref} className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase mb-4">
            // PRICING
          </p>
          <h2 className="font-bebas text-[clamp(40px,5vw,72px)] text-white-off leading-tight mb-4">
            Simple Pricing. Start Free.
          </h2>
          <p className="font-dm font-[300] text-white-dim text-[18px]">
            If you&apos;re already an Elite Drafting client, the platform is included.
            No extra cost.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`relative bg-navy3 rounded-lg p-8 border transition-all duration-300 ${
                plan.highlighted
                  ? "border-teal shadow-[0_0_60px_rgba(0,229,200,0.10)] md:-mt-4 md:pb-12"
                  : "border-[rgba(0,229,200,0.10)]"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="font-mono text-[10px] tracking-[2px] uppercase text-navy bg-teal px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p className="font-bebas text-[14px] tracking-[4px] text-white-dim mb-1">
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-2">
                <span className="font-bebas text-[52px] text-white-off leading-none">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="font-dm text-[14px] text-white-dim mb-2">
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Tagline */}
              <p className="font-dm font-[300] text-white-dim text-[13px] mb-8 pb-6 border-b border-[rgba(0,229,200,0.10)]">
                {plan.tagline}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-3">
                    <span className="text-teal text-[14px] mt-[1px] shrink-0">✓</span>
                    <span className="font-dm font-[300] text-white-dim text-[14px]">
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#cta"
                className={`block text-center font-dm text-sm tracking-wider py-3 px-6 rounded-sm cursor-pointer ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* ROI note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-dm font-[300] text-white-dim text-[13px] text-center mt-10 max-w-2xl mx-auto leading-relaxed"
        >
          <span className="font-[500] text-white-off">Enterprise pricing available:</span>{" "}
          We calculate your 5-year manual labor cost savings and charge 20% of that as your
          annual contract. Clear ROI before you sign.
        </motion.p>
      </div>
    </section>
  );
}
