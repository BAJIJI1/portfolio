import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const RING_PATH = "M235,0 L235,95 A170,170 0 1 1 165,405 L165,500";

const TEXT =
  "Every system starts as an idea and ends as a responsibility. I build with that in mind — not just to ship something that works, but something people can trust long after I've moved on to the next problem.";
const SIGNATURE = "— Bajiji Borah";

const MS_PER_CHAR_TYPE = 28;
const MS_PER_CHAR_ERASE = 12;
const HOLD_MS = 5000;
const PAUSE_MS = 500;

export default function TypewriterQuoteCard() {
  const [display, setDisplay] = useState("");
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Types/erases against a fixed time budget (via requestAnimationFrame),
    // not a per-character setTimeout — so total duration stays bounded even
    // under render pressure, regardless of device speed.
    const animateText = (from, to, msPerChar) =>
      new Promise((resolve) => {
        const length = Math.abs(to - from);
        const duration = Math.max(200, length * msPerChar);
        const start = performance.now();

        function tick(now) {
          if (cancelledRef.current) return resolve();
          const elapsed = now - start;
          const progress = Math.min(1, elapsed / duration);
          const count = Math.round(from + (to - from) * progress);
          setDisplay(TEXT.slice(0, count));
          if (progress >= 1) resolve();
          else requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });

    async function loop() {
      while (!cancelledRef.current) {
        await animateText(0, TEXT.length, MS_PER_CHAR_TYPE);
        if (cancelledRef.current) return;
        await wait(HOLD_MS);
        if (cancelledRef.current) return;
        await animateText(TEXT.length, 0, MS_PER_CHAR_ERASE);
        if (cancelledRef.current) return;
        await wait(PAUSE_MS);
      }
    }

    loop();
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const isComplete = display.length === TEXT.length;

  return (
    <div className="relative aspect-[4/5] w-full">
      {/* Broken ring — a circle that unwinds into two straight tails at the top and bottom */}
      <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" fill="none">
        {/* Dim base line */}
        <path
          d={RING_PATH}
          stroke="var(--color-emerald)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.25}
        />
        {/* Traveling light that runs the length of the ring */}
        <motion.path
          d={RING_PATH}
          pathLength={1}
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.09 1"
          style={{
            filter:
              "drop-shadow(0 0 4px var(--color-emerald)) drop-shadow(0 0 10px var(--color-emerald)) drop-shadow(0 0 18px var(--color-emerald))",
          }}
          animate={{ strokeDashoffset: [0, -1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <FaQuoteLeft className="absolute text-emerald" style={{ top: "17%", left: "15%" }} size={16} />
      <FaQuoteRight className="absolute text-emerald" style={{ bottom: "26%", right: "15%" }} size={16} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-16 sm:px-[4.5rem] text-center">
        <p className="font-display font-bold dark:font-normal text-[11px] sm:text-xs leading-relaxed text-black dark:text-white">
          {display}
          <span className="inline-block w-[0.4ch] h-[0.9em] align-middle bg-emerald ml-0.5 animate-pulse" />
        </p>
        <p
          className="mt-3 font-mono text-[10px] sm:text-[11px] text-emerald transition-opacity duration-500"
          style={{ opacity: isComplete ? 1 : 0 }}
        >
          {SIGNATURE}
        </p>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-display font-bold text-sm text-navy/50 dark:text-white/50">
        Bajiji<span className="text-emerald">.</span>
      </div>
    </div>
  );
}
