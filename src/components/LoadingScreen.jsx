import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = [
  "Initializing Bajiji Borah's Portfolio...",
  "Loading skills [Java, React, ASP.NET Core, Spring Boot]...",
  "Connecting to Zigama CSS experience...",
  "Compiling projects... 100%",
  "Ready.",
];

const MS_PER_CHAR = 12;
const MIN_LINE_MS = 200;
const LINE_PAUSE_MS = 110;
const END_HOLD_MS = 300;

/** Highlight "100%" and "Ready." in emerald as they finish typing. */
function renderLine(text) {
  const parts = text.split(/(100%|Ready\.)/g);
  return parts.map((part, i) =>
    part === "100%" || part === "Ready." ? (
      <span key={i} className="text-emerald font-semibold">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function LoadingScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [done, setDone] = useState(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    const wait = (ms) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    // Reveals one line's characters against a fixed time budget (not a
    // per-character delay), so total duration stays bounded even if
    // individual renders are slow — it just shows fewer intermediate frames.
    const typeLine = (line) =>
      new Promise((resolve) => {
        const duration = Math.max(MIN_LINE_MS, line.length * MS_PER_CHAR);
        const start = performance.now();

        function tick(now) {
          if (cancelledRef.current) return resolve();
          const elapsed = now - start;
          const chars = Math.min(line.length, Math.ceil((elapsed / duration) * line.length));
          setCurrentText(line.slice(0, chars));
          if (chars >= line.length) {
            resolve();
          } else {
            requestAnimationFrame(tick);
          }
        }
        requestAnimationFrame(tick);
      });

    async function typeAll() {
      for (const line of LINES) {
        await typeLine(line);
        if (cancelledRef.current) return;
        await wait(LINE_PAUSE_MS);
        if (cancelledRef.current) return;
        setVisibleLines((prev) => [...prev, line]);
        setCurrentText("");
      }
      await wait(END_HOLD_MS);
      if (!cancelledRef.current) setDone(true);
    }

    typeAll();
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-dark px-6"
        >
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="w-full max-w-xl font-mono text-sm sm:text-base text-body-dark"
          >
            <div className="mb-3 flex items-center gap-2 text-muted">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-emerald/70" />
              <span className="ml-2 text-xs tracking-wide">bajiji@portfolio: ~</span>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-5 min-h-[190px] shadow-2xl shadow-black/40">
              {visibleLines.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  <span className="text-emerald">{"> "}</span>
                  {renderLine(line)}
                </div>
              ))}
              {currentText && (
                <div className="leading-relaxed">
                  <span className="text-emerald">{"> "}</span>
                  {renderLine(currentText)}
                  <span className="inline-block w-[0.55ch] h-[1em] align-middle bg-emerald ml-0.5 animate-pulse" />
                </div>
              )}
              {!currentText && visibleLines.length < LINES.length && (
                <div className="leading-relaxed">
                  <span className="text-emerald">{"> "}</span>
                  <span className="inline-block w-[0.55ch] h-[1em] align-middle bg-emerald animate-pulse" />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
