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

  return (
    <>
      {/* Dark Mode Navbar */}
      {theme === "dark" && (
        <nav
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[72px] transition-all duration-300 border-b ${
            scrolled
              ? "backdrop-blur-xl border-foreground/[0.08] shadow-[0_1px_20px_rgba(0,0,0,0.12)]"
              : "backdrop-blur-xl border-foreground/[0.04]"
          }`}
          style={{
            background: scrolled
              ? "linear-gradient(90deg, hsla(0,100%,100%,0.15) 0%, hsla(213,60%,35%,0.9) 100%)"
              : "linear-gradient(90deg, hsla(0,100%,100%,0.1) 0%, hsla(213,60%,30%,0.8) 100%)"
          }}
        >
          <a href="#home" className="flex items-center gap-2 no-underline">
            <img src={logoWhite} alt="Zaderi Technologies" className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity" />
          </a>

          <div className="hidden lg:flex items-center gap-7">
            <ul className="flex items-center gap-7 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/80 text-[0.82rem] font-medium hover:text-white transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass-card hover:bg-white/[0.1] transition-all"
              aria-label="Toggle theme"
            >
              <Sun className="w-4 h-4 text-white" />
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
              className="p-2 rounded-lg hover:bg-white/[0.1] transition-all"
              aria-label="Toggle theme"
            >
              <Sun className="w-4 h-4 text-white" />
            </button>
            <button
              className="p-1 bg-transparent border-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
            </button>
          </div>
        </nav>
      )}

      {/* Light Mode Navbar */}
      {theme === "light" && (
        <nav
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[72px] transition-all duration-300 border-b ${
            scrolled
              ? "backdrop-blur-xl border-foreground/[0.12] shadow-[0_1px_20px_rgba(0,0,0,0.08)]"
              : "backdrop-blur-xl border-foreground/[0.08]"
          }`}
          style={{
            background: scrolled
              ? "linear-gradient(90deg, hsla(0,0%,100%,0.95) 0%, hsla(0,0%,98%,0.92) 50%, hsla(0,0%,100%,0.95) 100%)"
              : "linear-gradient(90deg, hsla(0,0%,100%,0.85) 0%, hsla(0,0%,98%,0.82) 50%, hsla(0,0%,100%,0.85) 100%)"
          }}
        >
          <a href="#home" className="flex items-center gap-2 no-underline">
            <img src={logoTransparent} alt="Zaderi Technologies" className="h-16 w-auto" />
          </a>

          <div className="hidden lg:flex items-center gap-7">
            <ul className="flex items-center gap-7 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-foreground/75 text-[0.82rem] font-medium hover:text-foreground transition-colors no-underline"
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
              <Moon className="w-4 h-4 text-foreground" />
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
              className="p-2 rounded-lg hover:bg-foreground/[0.06] transition-all"
              aria-label="Toggle theme"
            >
              <Moon className="w-4 h-4 text-foreground" />
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
      )}

      {/* Dark Mode Mobile Menu */}
      {theme === "dark" && isOpen && (
        <div className="lg:hidden fixed top-[72px] left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-foreground/[0.06] z-40 flex flex-col gap-1 p-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white/80 text-base py-3 border-b border-foreground/[0.06] no-underline hover:text-white transition-colors"
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

      {/* Light Mode Mobile Menu */}
      {theme === "light" && isOpen && (
        <div className="lg:hidden fixed top-[72px] left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-foreground/[0.12] z-40 flex flex-col gap-1 p-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-foreground/75 text-base py-3 border-b border-foreground/[0.12] no-underline hover:text-foreground transition-colors"
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
