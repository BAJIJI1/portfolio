import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiOutlineGlobeAlt, HiOutlineLocationMarker } from "react-icons/hi";
import { profile, profileSummary, stats } from "../data/profile";
import Reveal from "./ui/Reveal";
import CountUp from "./ui/CountUp";
import { StaggerContainer, StaggerItem } from "./ui/Stagger";
import ScanRevealPhoto from "./ui/ScanRevealPhoto";

export default function About() {
  const textRef = useRef(null);
  // Observed on a plain wrapper, not the clipped <motion.p> itself — a
  // clip-path'd element can report near-zero intersection area to
  // IntersectionObserver, which would block its own reveal from ever firing.
  const textInView = useInView(textRef, { once: false, amount: 0.3 });

  return (
    <section id="about" className="py-24 sm:py-28 bg-bg-light-alt dark:bg-bg-dark-alt">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-14 items-center">
        <Reveal>
          <ScanRevealPhoto src={profile.photo} alt={profile.name} />
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <span className="inline-block font-mono text-sm text-emerald font-medium mb-3">
              About Me
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy dark:text-white mb-6">
              Building secure, real-world software
            </h2>
            <div ref={textRef}>
              <motion.p
                initial={false}
                animate={
                  textInView
                    ? { clipPath: "inset(0 0% 0 0)", opacity: 1 }
                    : { clipPath: "inset(0 100% 0 0)", opacity: 0.4 }
                }
                transition={{
                  clipPath: { duration: 1.4, ease: [0.65, 0, 0.35, 1] },
                  opacity: { duration: 0.4 },
                }}
                className="text-body-light dark:text-body-dark leading-relaxed text-base sm:text-lg"
              >
                {profileSummary}
              </motion.p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <HiOutlineLocationMarker className="text-emerald" /> {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <HiOutlineGlobeAlt className="text-emerald" />
                {profile.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
              </span>
            </div>
          </Reveal>

          <StaggerContainer className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="font-display font-bold text-3xl text-navy dark:text-white">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted leading-snug">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
