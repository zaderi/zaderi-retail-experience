import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import logoTransparent from "@/assets/logo-transparent.png";
import logoWhite from "@/assets/logo-white.jpeg";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Solutions", href: "#services" },
  { label: "AI & Automation", href: "#ai-automation" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Always use white-background logo for navbar (better visibility on gradient)
  const logo = logoWhite;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[72px] transition-all duration-300 border-b ${
          scrolled
            ? "backdrop-blur-xl border-foreground/[0.08] shadow-[0_1px_20px_rgba(0,0,0,0.12)]"
            : "backdrop-blur-xl border-foreground/[0.04]"
        }`}
        style={{
          background: scrolled
            ? "linear-gradient(90deg, hsla(213,50%,25%,0.95) 0%, hsla(213,60%,35%,0.9) 50%, hsla(213,50%,25%,0.95) 100%)"
            : "linear-gradient(90deg, hsla(213,50%,20%,0.85) 0%, hsla(213,60%,30%,0.8) 50%, hsla(213,50%,20%,0.85) 100%)"
        }}
      >
        <a href="#home" className="flex items-center gap-2 no-underline">
          <img src={logo} alt="Zaderi Technologies" className="h-16 w-auto" />
        </a>

        <div className="hidden lg:flex items-center gap-7">
          <ul className="flex items-center gap-7 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-foreground/80 text-[0.82rem] font-medium hover:text-foreground transition-colors no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg glass-card hover:bg-foreground/[0.06] transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-foreground" /> : <Moon className="w-4 h-4 text-foreground" />}
          </button>
          <a
            href="#demo"
            className="gradient-primary text-primary-foreground px-5 py-2.5 rounded-lg text-[0.82rem] font-semibold no-underline hover:shadow-glow transition-all"
          >
            Request Demo
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg glass-card"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-foreground" /> : <Moon className="w-4 h-4 text-foreground" />}
          </button>
          <button
            className="p-1 bg-transparent border-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="text-foreground w-6 h-6" /> : <Menu className="text-foreground w-6 h-6" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden fixed top-[72px] left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-foreground/[0.06] z-40 flex flex-col gap-1 p-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-soft text-base py-3 border-b border-foreground/[0.06] no-underline hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#demo"
            onClick={() => setIsOpen(false)}
            className="gradient-primary text-primary-foreground text-center py-3 rounded-lg mt-3 no-underline font-semibold"
          >
            Request Demo
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
