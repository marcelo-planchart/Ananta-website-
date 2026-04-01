"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period?: string;
  tagline: string;
  features: string[];
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
      "Project management & CRM",
      "Client portal access",
      "Team & workload dashboard",
      "Basic quoting tools",
      "Field communication",
    ],
    cta: "Start Free",
    ctaStyle:
      "border border-[rgba(0,229,200,0.25)] text-teal hover:bg-[rgba(0,229,200,0.06)] hover:border-teal transition-all duration-300",
  },
  {
    name: "PRO",
    price: "Contact",
    tagline: "For contractors ready to automate",
    features: [
      "Everything in Free",
      "AI takeoff engine",
      "Automated submittal packages",
      "Priority turnaround (24–48 hr)",
      "Dedicated account manager",
      "API access",
    ],
    cta: "Book a Demo",
    ctaStyle:
      "bg-teal text-navy hover:bg-teal-dim transition-all duration-300 shadow-[0_0_30px_rgba(0,229,200,0.25)] hover:shadow-[0_0_50px_rgba(0,229,200,0.40)] font-[500]",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    tagline: "For high-volume glazing operations",
    features: [
      "Everything in Pro",
      "Custom AI model training",
      "Shop drawings SLA",
      "Engineering stamps included",
      "Custom hardware database",
      "Volume discounts",
    ],
    cta: "Contact Sales",
    ctaStyle:
      "border border-[rgba(0,229,200,0.25)] text-teal hover:bg-[rgba(0,229,200,0.06)] hover:border-teal transition-all duration-300",
  },
];

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" ref={ref} className="section-pad bg-navy2 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-teal" />
            <p className="font-mono text-teal text-[11px] tracking-[4px] uppercase">Pricing</p>
            <div className="h-[1px] w-8 bg-teal" />
          </div>
          <h2 className="font-bebas text-[clamp(44px,5.5vw,80px)] leading-[0.95] text-white-off mb-5">
            Simple Pricing.{" "}
            <span className="text-gradient-teal">Start Free.</span>
          </h2>
          <p className="font-dm font-[300] text-white-dim text-[18px] max-w-lg mx-auto">
            If you&apos;re already an Elite Drafting client, the platform is included. No extra cost.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`relative glass rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "border-[rgba(0,229,200,0.35)] shadow-[0_0_80px_rgba(0,229,200,0.08)] md:-mt-6 md:pb-14"
                  : "hover:border-[rgba(0,229,200,0.18)]"
              }`}
            >
              {/* Highlighted glow */}
              {plan.highlighted && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,229,200,0.05) 0%, transparent 60%)" }}
                />
              )}

              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="font-mono text-[10px] tracking-[2px] uppercase text-navy bg-teal px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,229,200,0.4)]">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p className="font-bebas text-[12px] tracking-[5px] text-white-dim mb-2">{plan.name}</p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-2">
                <span className={`font-bebas text-[56px] leading-none ${plan.highlighted ? "text-gradient-teal" : "text-white-off"}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="font-dm text-[14px] text-white-dim mb-3">{plan.period}</span>
                )}
              </div>

              {/* Tagline */}
              <p className="font-dm font-[300] text-white-dim text-[13px] mb-8 pb-7 border-b border-[rgba(0,229,200,0.08)]">
                {plan.tagline}
              </p>

              {/* Features */}
              <ul className="space-y-3.5 mb-10">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className={`shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                      plan.highlighted
                        ? "bg-teal text-navy"
                        : "border border-[rgba(0,229,200,0.30)] text-teal"
                    }`}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className="font-dm font-[300] text-white-dim text-[14px] leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#cta"
                className={`block text-center font-dm text-[14px] tracking-wide py-3.5 px-6 rounded-xl cursor-pointer ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* ROI note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-block glass rounded-xl px-8 py-5 max-w-2xl">
            <p className="font-dm font-[300] text-white-dim text-[13px] leading-relaxed">
              <span className="font-[500] text-white-off">Enterprise pricing available:</span>{" "}
              We calculate your 5-year manual labor cost savings and charge 20% of that as your annual
              contract. Clear ROI before you sign.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
