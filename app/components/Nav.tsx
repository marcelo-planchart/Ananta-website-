"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Resources", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["services", "how-it-works", "pricing", "testimonials", "faq"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <>
      {/* Top teal bar */}
      <div className="fixed top-0 left-0 right-0 h-[4px] bg-teal z-50" />

      <header
        className={`fixed top-[4px] left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(5,13,26,0.92)] backdrop-blur-[20px] border-b border-[rgba(0,229,200,0.10)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-0 group">
            <span className="font-bebas text-[22px] tracking-wider text-white-off group-hover:text-white transition-colors">
              ANANTA
            </span>
            <span className="font-bebas text-[22px] text-teal">.</span>
          </a>

          {/* Center Links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`font-dm text-sm font-[400] tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-teal"
                        : "text-white-dim hover:text-white-off"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="font-dm text-sm font-[400] text-white-dim hover:text-white-off transition-colors px-4 py-2 border border-[rgba(0,229,200,0.20)] rounded-sm hover:border-teal"
            >
              Log In
            </a>
            <a
              href="#cta"
              className="font-dm text-sm font-[500] tracking-wider bg-teal text-navy px-5 py-2 rounded-sm hover:bg-teal-dim transition-colors"
            >
              Book a Demo
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-[2px] bg-white-off transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-[2px] bg-white-off transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[2px] bg-white-off transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-navy pt-20 flex flex-col"
          >
            <ul className="flex flex-col items-center gap-8 mt-12">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-bebas text-3xl tracking-widest text-white-off hover:text-teal transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-center gap-4 mt-12">
              <a
                href="#cta"
                onClick={() => setMenuOpen(false)}
                className="font-dm font-[500] tracking-wider bg-teal text-navy px-10 py-3 rounded-sm hover:bg-teal-dim transition-colors"
              >
                Book a Demo
              </a>
              <a href="#" className="font-dm text-white-dim hover:text-white-off transition-colors">
                Log In
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
