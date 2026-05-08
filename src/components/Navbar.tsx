import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import logoTransparent from "@/assets/logo-transparent.png";
import logoWhite from "@/assets/logo-white.jpeg";

const navLinks = [
  { label: "Solutions", href: "#services" },
  { label: "AI", href: "#ai-automation" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = theme === "light";
  const logo = isLight ? logoTransparent : logoWhite;

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled
            ? "top-3 w-[min(96%,1100px)] rounded-full border shadow-[0_10px_40px_-15px_rgba(0,0,0,0.4)]"
            : "top-0 w-full border-b"
        }`}
        style={{
          background: scrolled
            ? isLight
              ? "hsla(0,0%,100%,0.85)"
              : "hsla(222,47%,8%,0.7)"
            : isLight
            ? "hsla(0,0%,100%,0.7)"
            : "hsla(222,47%,6%,0.6)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderColor: isLight ? "hsla(222,47%,11%,0.08)" : "hsla(0,0%,100%,0.06)",
        }}
      >
        <div className={`flex items-center justify-between h-[60px] ${scrolled ? "px-5" : "px-[5%]"}`}>
          <a href="#home" className="flex items-center gap-2 no-underline">
            <div className="w-9 h-9 rounded-full border border-foreground/20 bg-foreground/[0.05] flex items-center justify-center flex-shrink-0">
              <img src={logo} alt="Zaderi Technologies" className="h-6 w-auto" />
            </div>
            <span className="font-display font-bold text-foreground text-[0.95rem] hidden sm:inline">Zaderi</span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-foreground/70 text-[0.82rem] font-medium hover:text-foreground transition-colors no-underline px-3 py-2 rounded-md"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-foreground/[0.06] transition-all"
              aria-label="Toggle theme"
            >
              {isLight ? <Moon className="w-4 h-4 text-foreground" /> : <Sun className="w-4 h-4 text-foreground" />}
            </button>
            <a
              href="#demo"
              className="gradient-primary text-primary-foreground px-4 py-2 rounded-full text-[0.8rem] font-semibold no-underline hover:shadow-glow transition-all inline-flex items-center gap-1.5"
            >
              Get demo
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <button onClick={toggleTheme} className="p-2 rounded-full" aria-label="Toggle theme">
              {isLight ? <Moon className="w-4 h-4 text-foreground" /> : <Sun className="w-4 h-4 text-foreground" />}
            </button>
            <button
              className="p-2 bg-transparent border-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X className="text-foreground w-5 h-5" /> : <Menu className="text-foreground w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="lg:hidden fixed top-[64px] left-3 right-3 rounded-2xl border z-40 flex flex-col gap-1 p-4 shadow-2xl"
          style={{
            background: isLight ? "hsla(0,0%,100%,0.98)" : "hsla(222,47%,8%,0.98)",
            backdropFilter: "blur(18px)",
            borderColor: isLight ? "hsla(222,47%,11%,0.08)" : "hsla(0,0%,100%,0.06)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-foreground/80 text-[0.95rem] py-2.5 px-3 rounded-lg hover:bg-foreground/[0.04] no-underline transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#demo"
            onClick={() => setIsOpen(false)}
            className="gradient-primary text-primary-foreground text-center py-3 rounded-lg mt-2 no-underline font-semibold text-sm"
          >
            Request demo
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
