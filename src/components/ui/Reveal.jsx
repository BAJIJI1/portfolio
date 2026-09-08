import { motion } from "framer-motion";

/**
 * Fade + slide-up wrapper for scroll-triggered section/element reveals.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  once = true,
  amount = 0.2,
  as: Component = motion.div,
}) {
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
