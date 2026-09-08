import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineMenu, HiOutlineX, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { navLinks } from "../data/profile";

export default function Navbar({ isDark, setIsDark, onLogoClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-navy/10 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <a
          href="#top"
          onClick={onLogoClick}
          className="font-display font-bold text-lg text-navy dark:text-white tracking-tight"
        >
          Bajiji<span className="text-emerald">.</span>
        </a>

        <div className="hidden lg:flex justify-center">
          <ul className="flex items-center gap-1 rounded-full border border-navy/10 dark:border-white/10 bg-navy/5 dark:bg-white/5 px-2 py-1.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-full px-3.5 py-1.5 text-sm font-medium text-body-light dark:text-body-dark hover:bg-bg-light dark:hover:bg-white/10 hover:text-emerald transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => setIsDark((d) => !d)}
            aria-label="Toggle dark mode"
            className="inline-flex p-2 rounded-full text-navy dark:text-body-dark hover:bg-navy/5 dark:hover:bg-white/10 transition-colors"
          >
            {isDark ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden p-2 text-navy dark:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiOutlineX size={30} /> : <HiOutlineMenu size={30} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-bg-light dark:bg-bg-dark border-b border-navy/10 dark:border-white/10"
          >
            <ul className="flex flex-col px-5 py-3">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-navy/5 dark:border-white/5 last:border-0"
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-3 py-3.5 text-lg font-semibold text-navy dark:text-white hover:text-emerald transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald scale-0 group-hover:scale-100 transition-transform" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
