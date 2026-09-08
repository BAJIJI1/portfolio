import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const MS_PER_CHAR = 12;

/**
 * Retypes the text from scratch every time it scrolls into view, using a
 * time-budgeted requestAnimationFrame loop (bounded duration regardless of
 * device speed), same pattern as LoadingScreen/TypewriterQuoteCard.
 */
export default function HoverTypewriterText({ text, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [display, setDisplay] = useState("");
  const cancelledRef = useRef(false);
  const animatingRef = useRef(false);

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  useEffect(() => {
    if (!isInView || animatingRef.current) return;
    animatingRef.current = true;
    cancelledRef.current = false;

    const duration = Math.max(200, text.length * MS_PER_CHAR);
    const start = performance.now();
    setDisplay("");

    function tick(now) {
      if (cancelledRef.current) return;
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const count = Math.round(text.length * progress);
      setDisplay(text.slice(0, count));
      if (progress >= 1) {
        animatingRef.current = false;
      } else {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }, [isInView, text]);

  const isTyping = display.length < text.length;

  return (
    <p ref={ref} className={className}>
      {display}
      {isTyping && (
        <span className="inline-block w-[0.4ch] h-[0.9em] align-middle bg-emerald ml-0.5 animate-pulse" />
      )}
    </p>
  );
}
