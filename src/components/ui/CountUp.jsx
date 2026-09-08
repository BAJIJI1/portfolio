import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * Animates from 0 to `value` when scrolled into view.
 */
export default function CountUp({ value, suffix = "", duration = 1.6, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    motionValue.set(isInView ? value : 0);
  }, [isInView, value, motionValue]);

  const displayRef = useRef(null);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = Math.round(latest).toString() + suffix;
      }
    });
    return unsubscribe;
  }, [spring, suffix]);

  return (
    <motion.span ref={ref} className={className}>
      <span ref={displayRef}>0{suffix}</span>
    </motion.span>
  );
}
