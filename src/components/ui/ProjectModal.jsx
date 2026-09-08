import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineExternalLink,
  HiOutlineX,
} from "react-icons/hi";
import { FiGithub } from "react-icons/fi";

const SWIPE_THRESHOLD = 60;

export default function ProjectModal({ project, onClose }) {
  const [[index, direction], setIndexState] = useState([0, 0]);

  useEffect(() => {
    setIndexState([0, 0]);
  }, [project]);

  useEffect(() => {
    if (!project) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    }
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, onClose]);

  function paginate(step) {
    if (!project) return;
    const len = project.images.length;
    setIndexState(([prev]) => [(prev + step + len) % len, step]);
  }

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] sm:h-[78vh] overflow-y-auto sm:overflow-hidden rounded-2xl border border-navy/10 dark:border-white/10 bg-bg-light dark:bg-bg-dark-alt shadow-2xl grid sm:grid-cols-[1.6fr_1fr]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <HiOutlineX size={20} />
            </button>

            {/* Left — screenshot carousel, fixed height, independent of the right panel */}
            <div className="relative h-64 sm:h-full shrink-0 flex items-center justify-center overflow-hidden bg-navy/5 dark:bg-white/5">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={index}
                  src={project.images[index]}
                  alt={`${project.name} screenshot ${index + 1}`}
                  custom={direction}
                  initial={{ x: direction >= 0 ? 60 : -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction >= 0 ? -60 : 60, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  drag={project.images.length > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
                    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
                  }}
                  onError={(e) => {
                    e.currentTarget.style.visibility = "hidden";
                  }}
                  className="max-h-full max-w-full object-contain cursor-grab active:cursor-grabbing select-none"
                  draggable={false}
                />
              </AnimatePresence>

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={() => paginate(-1)}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                  >
                    <HiOutlineChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                  >
                    <HiOutlineChevronRight size={20} />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndexState([i, i > index ? 1 : -1])}
                        aria-label={`Go to screenshot ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === index ? "w-5 bg-emerald" : "w-1.5 bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right — compact, fixed, never scrolls */}
            <div className="sm:h-full flex flex-col justify-start sm:justify-center overflow-hidden p-6 sm:p-7">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.categories.map((c) => (
                  <span
                    key={c}
                    className="text-[11px] font-mono uppercase tracking-wide text-emerald bg-emerald/10 rounded-full px-2 py-0.5"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-navy dark:text-white">
                {project.name}
              </h3>
              <p className="text-sm text-emerald font-medium mt-1 line-clamp-2">{project.tagline}</p>
              <p className="mt-3 text-sm text-body-light dark:text-body-dark leading-relaxed line-clamp-4">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5 overflow-hidden max-h-16">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-navy/5 dark:bg-white/10 px-2 py-1 text-[11px] font-mono text-navy dark:text-body-dark"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-4 pt-4 border-t border-navy/10 dark:border-white/10">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy dark:text-white hover:text-emerald transition-colors"
                >
                  <FiGithub size={16} /> Code
                </a>
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald hover:text-emerald-dark transition-colors"
                    title={project.liveDemoPlaceholder ? "Placeholder link — will be replaced once deployed" : undefined}
                  >
                    <HiOutlineExternalLink size={16} /> Live Demo
                    {project.liveDemoPlaceholder && (
                      <span className="text-[10px] font-normal text-muted">(placeholder)</span>
                    )}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
