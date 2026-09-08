import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin fixed Emerald bar at the very top of the page, fills as the visitor scrolls.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 origin-left bg-emerald z-[60]"
    />
  );
}
