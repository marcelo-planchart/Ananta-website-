export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="inline-block mb-4">
              <span className="font-display font-bold text-[20px] tracking-tight text-white">
                Ananta
              </span>
            </a>
            <p className="font-sans text-white/30 text-[13px] leading-relaxed mb-6 max-w-[200px]">
              The Intelligence Layer for the Glass Industry
            </p>
            <div className="flex gap-5">
              <a href="#" aria-label="LinkedIn" className="font-mono text-[10px] text-white/20 hover:text-teal transition-colors tracking-[2px] uppercase">
                LinkedIn
              </a>
              <a href="#" aria-label="Twitter/X" className="font-mono text-[10px] text-white/20 hover:text-teal transition-colors tracking-[2px] uppercase">
                X
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-[10px] text-white/20 tracking-[3px] uppercase mb-5">Services</h4>
            <ul className="space-y-2.5">
              {["AI Takeoff", "Shop Drawings", "Engineering Stamps", "Submittal Packages", "Client Portal", "Project Management"].map((item) => (
                <li key={item}>
                  <a href="#services" className="font-sans text-white/35 hover:text-white/70 text-[13px] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[10px] text-white/20 tracking-[3px] uppercase mb-5">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us",     href: "#about" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Pricing",      href: "#pricing" },
                { label: "Investors",    href: "mailto:investor@ananta.ai" },
                { label: "Contact",      href: "#cta" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="font-sans text-white/35 hover:text-white/70 text-[13px] transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-mono text-[10px] text-white/20 tracking-[3px] uppercase mb-5">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="font-sans text-white/35 hover:text-white/70 text-[13px] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="font-sans text-white/35 hover:text-white/70 text-[13px] transition-colors">Terms of Use</a></li>
              <li><a href="mailto:hello@ananta.ai" className="font-sans text-white/35 hover:text-teal text-[13px] transition-colors">hello@ananta.ai</a></li>
              <li><a href="mailto:investor@ananta.ai" className="font-sans text-white/35 hover:text-teal text-[13px] transition-colors">investor@ananta.ai</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-mono text-[10px] text-white/15 tracking-[1px]">
            &copy; {currentYear} Ananta Technologies
          </p>
          <p className="font-mono text-[10px] text-white/15 tracking-[1px]">
            Powered by <span className="text-teal/60">Elite Drafting &amp; Design</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
