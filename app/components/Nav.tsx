"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Services",     href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing",      href: "#pricing" },
  { label: "About",        href: "#about" },
  { label: "FAQ",          href: "#faq" },
];

export default function Nav() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]        = useState(false);
  const [activeSection,  setActiveSection]   = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["services", "how-it-works", "pricing", "about", "faq"];
    const obs = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, []);

  return (
    <>
      {/* Top teal accent bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-teal z-50" />

      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-[3px] left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(15,23,42,0.08)]"
            : "bg-white/80 backdrop-blur-sm border-b border-stroke"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-bebas text-[20px] tracking-widest text-ink group-hover:text-teal-dark transition-colors">
              ANANTA<span className="text-teal">.</span>
            </span>
          </a>

          {/* Centre links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const id = link.href.replace("#", "");
              const active = activeSection === id;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`font-sans text-[14px] px-4 py-2 rounded-lg transition-all duration-200 ${
                      active
                        ? "text-teal-dark font-[500] bg-teal-bg"
                        : "text-ink-dim hover:text-ink hover:bg-canvas2"
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
            <a href="#" className="font-sans text-[14px] text-ink-dim hover:text-ink transition-colors px-4 py-2">
              Log In
            </a>
            <a
              href="#cta"
              className="font-sans text-[14px] font-[500] bg-teal text-white px-5 py-2.5 rounded-lg hover:bg-teal-dim transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Book a Demo
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-ink hover:text-teal transition-colors cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-white pt-20 px-6 flex flex-col"
          >
            <ul className="flex flex-col gap-1 mt-4">
              {links.map((link, i) => (
                <motion.li key={link.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between font-sans font-[500] text-[18px] text-ink hover:text-teal-dark transition-colors py-4 border-b border-stroke"
                  >
                    {link.label}
                    <span className="text-teal text-[18px]">›</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 mt-8">
              <a href="#cta" onClick={() => setMenuOpen(false)}
                className="font-sans font-[500] bg-teal text-white text-center py-4 rounded-xl shadow-md">
                Book a Demo
              </a>
              <a href="#" className="font-sans text-ink-dim text-center py-2">Log In</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
