import logo from "@/assets/logo-transparent.png";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-background/95 border-t border-foreground/[0.08] pt-16 pb-8 px-[5%]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <div>
          <a href="#home" className="flex items-center gap-2 no-underline mb-4">
            <img src={logo} alt="Zaderi Technologies" className="h-10 w-auto" />
          </a>
          <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-[240px]">
            Smart retail solutions for modern businesses. Built in Uganda, trusted across East Africa.
          </p>
        </div>

        <div>
          <h5 className="font-display text-xs font-bold uppercase tracking-[0.1em] text-foreground mb-5">Company</h5>
          <ul className="list-none flex flex-col gap-2.5">
            {["About Us", "Why Zaderi", "Testimonials", "Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(/ /g, "")}`} className="text-muted-foreground text-sm font-light no-underline hover:text-foreground transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-display text-xs font-bold uppercase tracking-[0.1em] text-foreground mb-5">Solutions</h5>
          <ul className="list-none flex flex-col gap-2.5">
            {["POS Systems", "Retail Management", "Inventory Control", "Analytics"].map((l) => (
              <li key={l}>
                <a href="#services" className="text-muted-foreground text-sm font-light no-underline hover:text-foreground transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-display text-xs font-bold uppercase tracking-[0.1em] text-foreground mb-5">Support</h5>
          <ul className="list-none flex flex-col gap-2.5">
            <li><a href="#demo" className="text-muted-foreground text-sm font-light no-underline hover:text-foreground transition-colors">Request Demo</a></li>
            <li><a href="mailto:sales@zaderitechnologies.com" className="text-muted-foreground text-sm font-light no-underline hover:text-foreground transition-colors">Email Support</a></li>
            <li><a href="https://wa.me/256771919582" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm font-light no-underline hover:text-foreground transition-colors">WhatsApp Chat</a></li>
            <li><a href="tel:+256771919582" className="text-muted-foreground text-sm font-light no-underline hover:text-foreground transition-colors">Call Us</a></li>
            <li><a href="https://retail.zaderitechnologies.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm font-light no-underline hover:text-foreground transition-colors">Retail System Login</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-6 border-t border-foreground/[0.08] flex justify-between items-center flex-wrap gap-3">
        <p className="text-muted-foreground text-xs">© 2026 Zaderi Technologies Ltd. All rights reserved.</p>
        <div className="flex gap-2">
          <span className="bg-electric/10 border border-electric/20 text-electric text-[0.7rem] font-semibold px-2.5 py-1 rounded-full tracking-wide">SSL Secured</span>
          <span className="bg-electric/10 border border-electric/20 text-electric text-[0.7rem] font-semibold px-2.5 py-1 rounded-full tracking-wide">Made in Uganda 🇺🇬</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
