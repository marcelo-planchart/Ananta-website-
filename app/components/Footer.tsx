export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-canvas2 border-t border-stroke">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Col 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-0 mb-3">
              <span className="font-bebas text-[20px] tracking-wider text-ink">ANANTA</span>
              <span className="font-bebas text-[20px] text-teal">.</span>
            </div>
            <p className="font-sans text-ink-dim text-[13px] leading-relaxed mb-6 max-w-[200px]">
              The Intelligence Layer for the Glass Industry
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="LinkedIn"
                className="font-mono text-[11px] text-ink-dim hover:text-teal-dark transition-colors tracking-[1px]"
              >
                LinkedIn
              </a>
              <a
                href="#"
                aria-label="Twitter/X"
                className="font-mono text-[11px] text-ink-dim hover:text-teal-dark transition-colors tracking-[1px]"
              >
                X/Twitter
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-mono text-[11px] text-ink tracking-[3px] uppercase mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "AI Takeoff",
                "Shop Drawings",
                "Engineering Stamps",
                "Submittal Packages",
                "Client Portal",
                "Project Management",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="font-sans text-ink-dim hover:text-ink text-[13px] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="font-mono text-[11px] text-ink tracking-[3px] uppercase mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "#about" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
                { label: "Investors", href: "mailto:investor@ananta.ai" },
                { label: "Contact", href: "#cta" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-sans text-ink-dim hover:text-ink text-[13px] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal + Contact */}
          <div>
            <h4 className="font-mono text-[11px] text-ink tracking-[3px] uppercase mb-5">
              Legal & Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-sans text-ink-dim hover:text-ink text-[13px] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-sans text-ink-dim hover:text-ink text-[13px] transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="mailto:hello@ananta.ai" className="font-sans text-ink-dim hover:text-teal-dark text-[13px] transition-colors">
                  hello@ananta.ai
                </a>
              </li>
              <li>
                <a href="mailto:investor@ananta.ai" className="font-sans text-ink-dim hover:text-teal-dark text-[13px] transition-colors">
                  investor@ananta.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stroke pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[11px] text-ink-dim tracking-[1px]">
            © {currentYear} Ananta Technologies. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-ink-dim tracking-[1px] text-center md:text-right">
            Powered by{" "}
            <span className="text-teal-dark font-medium">Elite Drafting & Design</span> —
            California&apos;s #1 Glass Shop Drawing Service
          </p>
        </div>
      </div>
    </footer>
  );
}
