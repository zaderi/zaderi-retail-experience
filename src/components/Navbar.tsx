import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-transparent.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[70px] transition-all duration-300 border-b border-foreground/[0.08] ${
          scrolled ? "bg-background/95 backdrop-blur-xl" : "bg-background/85 backdrop-blur-lg"
        }`}
      >
        <a href="#home" className="flex items-center gap-2 no-underline">
          <img src={logo} alt="Zaderi Technologies" className="h-10 w-auto" />
        </a>

        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-soft text-sm font-normal tracking-wide hover:text-foreground transition-colors no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#demo"
              className="gradient-primary text-foreground px-5 py-2 rounded-full text-sm font-medium no-underline hover:-translate-y-0.5 transition-transform"
            >
              Request Demo
            </a>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1 p-1 bg-transparent border-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X className="text-foreground w-6 h-6" /> : <Menu className="text-foreground w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-[70px] left-0 right-0 bg-background/97 backdrop-blur-xl border-b border-foreground/[0.08] z-40 flex flex-col gap-1 p-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-soft text-base py-3 border-b border-foreground/[0.08] no-underline hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#demo"
            onClick={() => setIsOpen(false)}
            className="gradient-primary text-foreground text-center py-3 rounded-xl mt-2 no-underline font-medium"
          >
            Request Demo
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
