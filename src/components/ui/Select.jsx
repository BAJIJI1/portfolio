import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineCheck, HiOutlineChevronDown } from "react-icons/hi";

export default function Select({ id, value, onChange, options, className = "" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full flex items-center justify-between gap-2 rounded-lg border bg-bg-light dark:bg-bg-dark px-4 py-2.5 text-sm text-body-light dark:text-body-dark transition-all ${
          open ? "border-emerald ring-2 ring-emerald/50" : "border-navy/15 dark:border-white/15"
        }`}
      >
        <span>{value}</span>
        <HiOutlineChevronDown
          size={16}
          className={`text-muted shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-lg border border-navy/10 dark:border-white/10 bg-bg-light dark:bg-bg-dark-alt shadow-xl py-1"
          >
            {options.map((opt) => {
              const selected = opt === value;
              return (
                <li key={opt} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-left transition-colors ${
                      selected
                        ? "bg-emerald/10 text-emerald font-medium"
                        : "text-body-light dark:text-body-dark hover:bg-navy/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {opt}
                    {selected && <HiOutlineCheck size={16} className="text-emerald shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
