import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { HiOutlineChevronDown } from "react-icons/hi";
import { experience } from "../data/profile";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

function ProjectAccordion({ project, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <Reveal delay={0.08 * index}>
      <div className="rounded-xl border border-navy/10 dark:border-white/10 bg-bg-light dark:bg-bg-dark-alt overflow-hidden">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <div>
            <h4 className="font-display font-semibold text-lg text-navy dark:text-white">
              {project.name}
            </h4>
            <p className="text-sm text-muted mt-0.5">{project.subtitle}</p>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-emerald shrink-0"
          >
            <HiOutlineChevronDown size={20} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <ul className="space-y-2">
                  {project.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-body-light dark:text-body-dark leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                {project.tech && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-navy/5 dark:bg-white/10 px-3 py-1 text-xs font-mono text-navy dark:text-body-dark"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function Experience() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: false, amount: 0.3 });

  return (
    <section id="experience" className="py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've put it into practice"
        />

        <Reveal delay={0.1}>
          <div ref={lineRef} className="mt-12 mb-8 flex items-stretch gap-5">
            <motion.div
              initial={false}
              animate={{ scaleY: lineInView ? 1 : 0 }}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              style={{ transformOrigin: "top" }}
              className="w-1 shrink-0 rounded-full bg-emerald shadow-[0_0_14px_3px_rgba(16,185,129,0.65)]"
            />
            <div className="flex-1 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-display font-bold text-xl text-navy dark:text-white">
                  {experience.role} — {experience.company}
                </h3>
                <p className="text-sm text-muted mt-1">{experience.location}</p>
              </div>
              <span className="font-mono text-sm text-emerald">{experience.period}</span>
            </div>
          </div>
        </Reveal>

        <div className="space-y-4">
          {experience.projects.map((project, i) => (
            <ProjectAccordion key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
