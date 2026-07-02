import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import Logo from "../assets/Logo.png";
import Button from "./ui/Button.jsx";

const NAV_LINKS = [
  { label: "Bosh sahifa", href: "#hero" },
  { label: "Biz haqimizda", href: "#about" },
  { label: "Xizmatlar", href: "#services" },
  { label: "Video", href: "#video" },
  { label: "Yangiliklar", href: "#news" },
  { label: "Savol berish", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-strong shadow-glass"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Sifat Innovatsion Texnologiya logotipi"
            className="h-11 w-11 rounded-xl object-contain"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-[15px] font-extrabold tracking-tight text-ink">
              Sifat Innovatsion
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-600">
              Texnologiya
            </span>
          </span>
        </a>

        {/* Center links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative rounded-full px-4 py-2 text-sm font-semibold text-ink/80 transition-colors hover:text-brand-700"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-brand-600 to-accent-cyan transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href="tel:+998998660271"
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink/80 transition-colors hover:text-brand-700 xl:flex"
          >
            <Phone className="h-4 w-4 text-secondary-500" />
            +998 99 866 02 71
          </a>
          <Button as="a" href="#faq" size="sm" className="hidden sm:inline-flex">
            Bog'lanish
          </Button>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white/70 text-ink backdrop-blur transition-colors hover:bg-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-[68px] z-40 bg-ink/20 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-3 top-[68px] z-50 origin-top rounded-2xl glass-strong p-4 shadow-lift lg:hidden"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                className="flex flex-col gap-1"
              >
                {NAV_LINKS.map((link) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-base font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-3 flex flex-col gap-3 border-t border-black/10 pt-4">
                <a
                  href="tel:+998998660271"
                  className="flex items-center gap-2 px-4 text-sm font-semibold text-ink-soft"
                >
                  <Phone className="h-4 w-4 text-secondary-500" />
                  +998 99 866 02 71
                </a>
                <Button
                  as="a"
                  href="#faq"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  Bog'lanish
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
