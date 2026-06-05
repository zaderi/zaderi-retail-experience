import { useTheme } from "@/context/ThemeContext";
import logoTransparent from "@/assets/logo-transparent.png";
import logoWhite from "@/assets/logo-white.jpeg";

const Footer = () => {
  const { theme } = useTheme();
  const logo = theme === "light" ? logoWhite : logoTransparent;

  return (
    <footer className="relative z-10 bg-background border-t border-foreground/[0.06] pt-14 pb-8 px-[5%]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <div>
          <a href="#home" className="flex items-center gap-2 no-underline mb-4">
            <img src={logo} alt="Zaderi Technologies" className="h-16 w-auto" />
          </a>
          <p className="text-muted-foreground text-sm font-normal leading-relaxed max-w-[240px]">
            Smart business solutions and AI automation for modern businesses. Built in Uganda, trusted across East Africa.
          </p>
        </div>

        <div>
          <h5 className="font-display text-xs font-bold uppercase tracking-[0.1em] text-foreground mb-4">Company</h5>
          <ul className="list-none flex flex-col gap-2">
            {["About Us", "Why Zaderi", "Testimonials", "Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(/ /g, "")}`} className="text-muted-foreground text-sm no-underline hover:text-foreground transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-display text-xs font-bold uppercase tracking-[0.1em] text-foreground mb-4">Solutions</h5>
          <ul className="list-none flex flex-col gap-2">
            {["Retail Management", "AI Chatbots", "Automation"].map((l) => (
              <li key={l}>
                <a href="#services" className="text-muted-foreground text-sm no-underline hover:text-foreground transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-display text-xs font-bold uppercase tracking-[0.1em] text-foreground mb-4">Support</h5>
          <ul className="list-none flex flex-col gap-2">
            <li><a href="#demo" className="text-muted-foreground text-sm no-underline hover:text-foreground transition-colors">Request Demo</a></li>
            <li><a href="mailto:sales@zaderitechnologies.com" className="text-muted-foreground text-sm no-underline hover:text-foreground transition-colors">Email Support</a></li>
            <li><a href="https://wa.me/256771919582" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm no-underline hover:text-foreground transition-colors">WhatsApp Chat</a></li>
            <li><a href="tel:+256771919582" className="text-muted-foreground text-sm no-underline hover:text-foreground transition-colors">Call Us</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-6 border-t border-foreground/[0.06] flex justify-center items-center flex-wrap gap-3">
        <p className="text-muted-foreground text-xs">© 2026 Zaderi Technologies Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
