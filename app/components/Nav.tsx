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
  const [scrolled,      setScrolled]     = useState(false);
  const [menuOpen,      setMenuOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#F7F4EF]/96 backdrop-blur-md border-b border-stroke shadow-[0_1px_24px_rgba(13,12,10,0.06)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between">
          {/* Wordmark */}
          <a href="#" className="group">
            <span className="font-display italic font-semibold text-[26px] leading-none tracking-wide text-ink group-hover:text-teal transition-colors duration-300">
              Ananta<span className="text-teal not-italic">.</span>
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
                    className={`font-sans text-[13px] font-[400] px-4 py-2 rounded-lg tracking-wide transition-all duration-200 ${
                      active
                        ? "text-teal font-[500]"
                        : "text-ink-dim hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="font-sans text-[13px] text-ink-dim hover:text-ink transition-colors px-3 py-2">
              Log In
            </a>
            <a
              href="#cta"
              className="font-sans text-[13px] font-[500] bg-ink text-canvas px-5 py-2.5 rounded-lg hover:bg-teal transition-all duration-300 tracking-wide"
            >
              Book a Demo
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-ink hover:text-teal transition-colors cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
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
            className="fixed inset-0 z-30 bg-canvas pt-[72px] px-8 flex flex-col"
          >
            <ul className="flex flex-col mt-6">
              {links.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between font-display font-semibold text-[28px] text-ink hover:text-teal transition-colors py-5 border-b border-stroke"
                  >
                    {link.label}
                    <span className="text-teal text-[24px] font-light">→</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 mt-8">
              <a href="#cta" onClick={() => setMenuOpen(false)}
                className="font-sans font-[500] bg-ink text-canvas text-center py-4 rounded-xl tracking-wide">
                Book a Demo
              </a>
              <a href="#" className="font-sans text-ink-dim text-center py-2 text-[14px]">Log In</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
