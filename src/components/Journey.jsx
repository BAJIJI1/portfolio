import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { journeyMilestones, journeyStory } from "../data/profile";
import Reveal from "./ui/Reveal";
import HoverTypewriterText from "./ui/HoverTypewriterText";

function TimelineCard({ item, index, isLeft, dotRef, scrollYProgress, frac }) {
  // Hidden until the growing tip's scroll progress reaches this node's
  // position, then fades/slides in right as the tip arrives.
  const start = Math.max(0, frac - 0.08);
  const opacity = useTransform(scrollYProgress, [start, frac], [0, 1]);
  const y = useTransform(scrollYProgress, [start, frac], [24, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className={`relative sm:flex sm:items-center sm:gap-10 ${
        index > 0 ? "sm:mt-14" : ""
      } ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}
    >
      <div
        ref={dotRef}
        className="absolute left-4 sm:left-1/2 top-1.5 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-emerald ring-4 ring-emerald/20 z-10"
      />
      <div className="hidden sm:block sm:w-1/2" />
      <div className="pl-12 sm:pl-0 sm:w-1/2">
        <motion.div
          whileHover={{ y: -4 }}
          className={`rounded-xl border border-navy/10 dark:border-white/10 bg-bg-light dark:bg-bg-dark-alt p-5 shadow-sm hover:shadow-lg hover:border-emerald/40 transition-all ${
            isLeft ? "sm:mr-6" : "sm:ml-6"
          }`}
        >
          <span className="font-mono text-xs text-emerald font-semibold">{item.year}</span>
          <h3 className="mt-1 font-display font-semibold text-lg text-navy dark:text-white">
            {item.title}
          </h3>
          <p className="text-sm text-muted mt-0.5">{item.place}</p>
          <p className="mt-2 text-sm text-body-light dark:text-body-dark leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  const timelineRef = useRef(null);
  const dotRefs = useRef([]);
  // Even spread as a fallback until the real DOM positions are measured.
  const [fractions, setFractions] = useState(
    journeyMilestones.map((_, i) => i / Math.max(1, journeyMilestones.length - 1))
  );

  // Trunk grows in step with how far the timeline has scrolled through the
  // viewport — not a one-shot reveal, but tied directly to scroll position.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const tipTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    function measure() {
      const container = timelineRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      if (containerRect.height === 0) return;
      const next = dotRefs.current.map((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const relTop = rect.top + rect.height / 2 - containerRect.top;
        return Math.min(1, Math.max(0, relTop / containerRect.height));
      });
      setFractions(next);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="journey" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="inline-block font-mono text-sm text-emerald font-medium mb-3">
            My Journey
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-navy dark:text-white">
            From curiosity to <span className="text-emerald">production systems</span>
          </h2>
          <HoverTypewriterText text={journeyStory} className="mt-4 text-black dark:text-white max-w-2xl" />
        </Reveal>

        <div ref={timelineRef} className="relative mt-16">
          {/* Faint full-length track */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-navy/10 dark:bg-white/10 sm:-translate-x-1/2" />

          {/* Trunk — grows downward as the section scrolls through view */}
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-navy/60 via-emerald to-emerald/60 dark:from-white/60 dark:via-emerald dark:to-emerald/60 sm:-translate-x-1/2"
          />

          {/* Glowing growth tip */}
          <motion.div
            style={{ top: tipTop }}
            className="absolute left-4 sm:left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald shadow-[0_0_12px_4px_rgba(16,185,129,0.7)]"
          />

          <div className="space-y-10 sm:space-y-0">
            {journeyMilestones.map((item, i) => (
              <TimelineCard
                key={item.title}
                item={item}
                index={i}
                isLeft={i % 2 === 0}
                dotRef={(el) => (dotRefs.current[i] = el)}
                scrollYProgress={scrollYProgress}
                frac={fractions[i] ?? i / Math.max(1, journeyMilestones.length - 1)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
