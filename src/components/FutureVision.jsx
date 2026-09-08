import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { futureVision } from "../data/profile";
import Reveal from "./ui/Reveal";

export default function FutureVision() {
  const ref = useRef(null);
  // Observed on a plain wrapper, not the clipped <motion.p> itself — a
  // clip-path'd element can report near-zero intersection area to
  // IntersectionObserver, which would block its own reveal from ever firing.
  const isInView = useInView(ref, { once: false, amount: 0.15 });

  return (
    <section id="vision" className="relative py-10 sm:py-14 overflow-hidden bg-navy dark:bg-bg-dark">
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 80, -40, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-8rem] left-[10%] h-[26rem] w-[26rem] rounded-full bg-emerald/20 blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -60, 30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-6rem] right-[10%] h-[24rem] w-[24rem] rounded-full bg-emerald/10 blur-[130px]"
        />
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <span className="inline-block font-mono text-sm text-emerald font-medium mb-8">
            Future Vision
          </span>
        </Reveal>

        <div ref={ref} className="flex items-center gap-5 sm:gap-8">
          <motion.div
            initial={false}
            animate={{ scaleY: isInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: "top" }}
            className="h-56 sm:h-64 lg:h-72 w-1 shrink-0 rounded-full bg-emerald shadow-[0_0_14px_3px_rgba(16,185,129,0.65)]"
          />
          <motion.p
            initial={false}
            animate={
              isInView
                ? { clipPath: "inset(0 0% 0 0)", opacity: 1 }
                : { clipPath: "inset(0 100% 0 0)", opacity: 0.4 }
            }
            transition={{
              clipPath: { duration: 1.3, delay: 1.1, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.4, delay: 1.1 },
            }}
            className="font-vision font-normal text-base sm:text-lg lg:text-xl leading-relaxed text-white text-left"
          >
            {futureVision}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
