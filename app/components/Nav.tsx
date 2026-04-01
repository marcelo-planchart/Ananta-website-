"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["services", "how-it-works", "pricing", "about", "faq"];
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
      {/* Top teal line */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50"
        style={{ background: "linear-gradient(90deg, transparent, #00E5C8 30%, #00E5C8 70%, transparent)" }}
      />

      {/* Floating nav */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-[3px] left-0 right-0 z-40 flex justify-center px-4 pt-4 pointer-events-none`}
      >
        <nav
          className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between px-5 h-14 rounded-xl transition-all duration-500 ${
            scrolled
              ? "glass-strong shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,229,200,0.08)]"
              : "bg-[rgba(5,13,26,0.4)] backdrop-blur-[12px] border border-[rgba(0,229,200,0.08)]"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center group shrink-0">
            <span className="font-bebas text-[20px] tracking-widest text-white-off group-hover:text-white transition-colors">
              ANANTA
            </span>
            <span className="font-bebas text-[20px] text-teal">.</span>
          </a>

          {/* Center links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`relative font-dm text-[13px] px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-teal bg-[rgba(0,229,200,0.06)]"
                        : "text-white-dim hover:text-white-off hover:bg-[rgba(255,255,255,0.04)]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a
              href="#"
              className="font-dm text-[13px] text-white-dim hover:text-white-off transition-colors px-4 py-2"
            >
              Log In
            </a>
            <a
              href="#cta"
              className="font-dm text-[13px] font-[500] tracking-wide bg-teal text-navy px-5 py-2 rounded-lg hover:bg-teal-dim transition-all duration-200 shadow-[0_0_20px_rgba(0,229,200,0.25)] hover:shadow-[0_0_30px_rgba(0,229,200,0.4)]"
            >
              Book a Demo
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white-off hover:text-teal transition-colors cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[rgba(5,13,26,0.92)] pt-24 flex flex-col px-6"
          >
            <ul className="flex flex-col gap-2 mt-8">
              {links.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between font-bebas text-[28px] tracking-widest text-white-off hover:text-teal transition-colors py-3 border-b border-[rgba(0,229,200,0.08)]"
                  >
                    {link.label}
                    <span className="text-teal text-[16px]">›</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 mt-10">
              <a
                href="#cta"
                onClick={() => setMenuOpen(false)}
                className="font-dm font-[500] tracking-wider bg-teal text-navy text-center py-4 rounded-xl shadow-[0_0_30px_rgba(0,229,200,0.3)]"
              >
                Book a Demo
              </a>
              <a href="#" className="font-dm text-white-dim text-center hover:text-white-off transition-colors py-2">
                Log In
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
